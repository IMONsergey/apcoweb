import { LocaleText } from '../../i18n/LocaleText';
import { useLocale } from '../../i18n/context';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { useMotion } from '../../hooks/useMotion';
import { Icon } from './Icon';
type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};
/** Native dialog retains focus containment during both opening and closing transitions. */
export function Modal({ open, onClose, title, children, className = '' }: Props) {
  const { t } = useLocale();
  const ref = useRef<HTMLDialogElement>(null);
  const session = useRef<{ trigger: HTMLElement | null; overflow: string } | null>(null);
  const animation = useRef<Animation | null>(null);
  const contentAnimations = useRef<Animation[]>([]);
  const titleId = useId();
  const { reduced } = useMotion();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const interrupted = animation.current?.playState === 'running';
    const previousStyle = getComputedStyle(dialog);
    const previousFrame = {
      opacity: previousStyle.opacity,
      transform: previousStyle.transform,
      clipPath: previousStyle.clipPath,
    };
    animation.current?.cancel();
    contentAnimations.current.forEach((item) => item.cancel());
    contentAnimations.current = [];
    const navigation = dialog.classList.contains('mobile-navigation');
    const release = () => {
      dialog.close();
      delete dialog.dataset.modalPhase;
      const previous = session.current;
      session.current = null;
      if (!previous) return;
      document.body.style.overflow = previous.overflow;
      requestAnimationFrame(() => {
        if (previous.trigger?.isConnected && !document.querySelector('dialog[open]'))
          previous.trigger.focus({ preventScroll: true });
      });
    };
    if (open) {
      if (!dialog.open) {
        session.current = {
          trigger: document.activeElement instanceof HTMLElement ? document.activeElement : null,
          overflow: document.body.style.overflow,
        };
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
      // Reopening during the closing phase does not call showModal again. Restore its focus.
      if (!dialog.contains(document.activeElement))
        dialog
          .querySelector<HTMLButtonElement>('.modal__header button')
          ?.focus({ preventScroll: true });
      dialog.dataset.modalPhase = 'opening';
      if (!reduced) {
        animation.current = dialog.animate(
          navigation
            ? [
                interrupted
                  ? previousFrame
                  : {
                      opacity: 0,
                      transform: 'translateX(28px)',
                      clipPath: 'inset(0 0 0 12% round 20px 0 0 20px)',
                    },
                { opacity: 1, transform: 'translateX(0)', clipPath: 'inset(0 0 0 0% round 0px)' },
              ]
            : [
                { opacity: 0, transform: 'translateY(8px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
          { duration: navigation ? 380 : 220, easing: 'cubic-bezier(.16,1,.3,1)' },
        );
        if (navigation) {
          contentAnimations.current = [...dialog.querySelectorAll<HTMLElement>('nav > *')].map(
            (item, index) =>
              item.animate(
                [
                  { opacity: 0, transform: 'translateX(12px)' },
                  { opacity: 1, transform: 'translateX(0)' },
                ],
                {
                  duration: 300,
                  delay: 55 + Math.min(index, 5) * 24,
                  easing: 'cubic-bezier(.16,1,.3,1)',
                  fill: 'backwards',
                },
              ),
          );
        }
      }
    } else if (dialog.open) {
      dialog.dataset.modalPhase = 'closing';
      if (reduced) release();
      else {
        const closeAnimation = dialog.animate(
          [
            interrupted ? previousFrame : { opacity: 1, transform: 'translate(0)' },
            { opacity: 0, transform: navigation ? 'translateX(18px)' : 'translateY(5px)' },
          ],
          { duration: navigation ? 190 : 160, easing: 'ease-out' },
        );
        animation.current = closeAnimation;
        closeAnimation.onfinish = () => {
          if (animation.current === closeAnimation) release();
        };
      }
    }
    return () => contentAnimations.current.forEach((item) => item.cancel());
  }, [open, reduced]);
  useEffect(() => {
    const dialog = ref.current;
    return () => {
      animation.current?.cancel();
      contentAnimations.current.forEach((item) => item.cancel());
      if (dialog?.open) dialog.close();
      if (session.current) document.body.style.overflow = session.current.overflow;
      session.current = null;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom
        )
          onClose();
      }}
    >
      <div className="modal__header">
        <h2 id={titleId}>
          <LocaleText>{title}</LocaleText>
        </h2>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label={t('Close dialog')}
          autoFocus
        >
          <Icon name="close" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
