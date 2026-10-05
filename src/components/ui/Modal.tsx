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
  const titleId = useId();
  const { reduced } = useMotion();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    animation.current?.cancel();
    const release = () => {
      dialog.close();
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
      if (!reduced)
        animation.current = dialog.animate(
          [
            { opacity: 0, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 220, easing: 'cubic-bezier(.22,.61,.36,1)' },
        );
    } else if (dialog.open) {
      if (reduced) release();
      else {
        const closeAnimation = dialog.animate(
          [
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(5px)' },
          ],
          { duration: 160, easing: 'ease-out' },
        );
        animation.current = closeAnimation;
        closeAnimation.onfinish = () => {
          if (animation.current === closeAnimation) release();
        };
      }
    }
    return () => animation.current?.cancel();
  }, [open, reduced]);
  useEffect(() => {
    const dialog = ref.current;
    return () => {
      animation.current?.cancel();
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
