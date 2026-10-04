import { useEffect, useState, type RefObject } from 'react';
import { useMediaQuery } from './useMediaQuery';

const isEditing = (element: Element | null) =>
  element instanceof HTMLElement &&
  (element.isContentEditable || element.matches(
    'textarea, select, input:not([type="radio"]):not([type="checkbox"]):not([type="button"]):not([type="submit"])',
  ));

/** Contextual and non-modal: no scroll lock or automatic focus. */
export function useBillingDock(
  rangeRef: RefObject<HTMLDivElement | null>,
  dockRef: RefObject<HTMLElement | null>,
) {
  const compact = useMediaQuery('(max-width: 1199px)');
  const [inRange, setInRange] = useState(false);
  const [obstructed, setObstructed] = useState(false);
  const visible = compact && inRange && !obstructed;

  useEffect(() => {
    const range = rangeRef.current;
    if (!compact || !range) return;
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    const viewport = window.visualViewport;
    const checkObstructions = () => {
      frame = 0;
      setObstructed(
        document.hidden || !!document.querySelector('dialog[open]') ||
        isEditing(document.activeElement) || (viewport?.scale ?? 1) > 1.1,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(checkObstructions);
    };
    const observeRange = () => {
      observer?.disconnect();
      const bottomInset = Math.max(80, Math.round(window.innerHeight * 0.2));
      const box = range.getBoundingClientRect();
      setInRange(box.top < window.innerHeight - bottomInset && box.bottom > 24);
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        setInRange(entry.isIntersecting && entry.intersectionRect.height > 0);
      }, { rootMargin: `-24px 0px -${bottomInset}px 0px`, threshold: 0 });
      observer.observe(range);
      schedule();
    };
    // Removing a focused editable node does not emit focusout in every browser.
    const mutations = new MutationObserver(schedule);
    mutations.observe(document.body, {
      subtree: true, childList: true, attributes: true, attributeFilter: ['open'],
    });
    observeRange();
    window.addEventListener('resize', observeRange);
    window.addEventListener('pageshow', observeRange);
    document.addEventListener('visibilitychange', schedule);
    document.addEventListener('focusin', schedule);
    document.addEventListener('focusout', schedule);
    viewport?.addEventListener('resize', schedule);
    return () => {
      observer?.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', observeRange);
      window.removeEventListener('pageshow', observeRange);
      document.removeEventListener('visibilitychange', schedule);
      document.removeEventListener('focusin', schedule);
      document.removeEventListener('focusout', schedule);
      viewport?.removeEventListener('resize', schedule);
    };
  }, [compact, rangeRef]);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock || !compact) return;
    const resize = new ResizeObserver(() => {
      const bottom = parseFloat(getComputedStyle(dock).bottom) || 12;
      document.documentElement.style.setProperty(
        '--billing-dock-space', `${Math.ceil(dock.offsetHeight + bottom + 16)}px`,
      );
    });
    resize.observe(dock);
    return () => {
      resize.disconnect();
      document.documentElement.style.removeProperty('--billing-dock-space');
    };
  }, [compact, dockRef]);

  useEffect(() => {
    const dock = dockRef.current;
    const html = document.documentElement;
    if (visible) html.dataset.billingDock = 'visible';
    else {
      delete html.dataset.billingDock;
      const active = document.activeElement;
      if (active instanceof HTMLElement && dock?.contains(active)) {
        active.blur();
        if (!compact) document.querySelector<HTMLElement>(
          '.billing--desktop input:checked',
        )?.focus({ preventScroll: true });
      }
    }
    let frame = 0;
    const keepFocusVisible = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const active = document.activeElement;
        if (!visible || !dock || !(active instanceof HTMLElement) ||
          dock.contains(active) || !rangeRef.current?.contains(active)) return;
        const rect = active.getBoundingClientRect();
        const safeBottom = dock.getBoundingClientRect().top - 16;
        if (rect.bottom > safeBottom && rect.top < window.innerHeight) {
          window.scrollBy({ top: rect.bottom - safeBottom, behavior: 'instant' });
        }
      });
    };
    if (visible) {
      document.addEventListener('focusin', keepFocusVisible);
      keepFocusVisible();
    }
    return () => {
      document.removeEventListener('focusin', keepFocusVisible);
      cancelAnimationFrame(frame);
      delete html.dataset.billingDock;
    };
  }, [visible, compact, dockRef, rangeRef]);
  return visible;
}
