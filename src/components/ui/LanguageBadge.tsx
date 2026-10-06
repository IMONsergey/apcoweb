import { useId, useRef, type KeyboardEvent } from 'react';
import { Icon } from './Icon';

const languages = [
  { value: 'en', label: 'English', disabled: false },
  { value: 'ru', label: 'Русский', disabled: true },
  { value: 'zh', label: '中文', disabled: true },
] as const;

type LanguageCode = (typeof languages)[number]['value'];

function focusInPlace(node?: HTMLElement) {
  if (!node) return;
  const position = { left: scrollX, top: scrollY };
  node.focus({ preventScroll: true });
  window.scrollTo({ ...position, behavior: 'instant' });
}

function LanguageFlag({ locale }: { locale: LanguageCode }) {
  const clip = useId();
  return (
    <svg
      className="language-flag"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={'url(#' + clip + ')'}>
        {locale === 'en' ? (
          <>
            <path fill="#012169" d="M0 0h24v24H0z" />
            <path stroke="#fff" strokeWidth="5" d="m0 0 24 24M24 0 0 24" />
            <path stroke="#c8102e" strokeWidth="2" d="m0 0 24 24M24 0 0 24" />
            <path stroke="#fff" strokeWidth="8" d="M12 0v24M0 12h24" />
            <path stroke="#c8102e" strokeWidth="4.5" d="M12 0v24M0 12h24" />
          </>
        ) : locale === 'ru' ? (
          <>
            <path fill="#fff" d="M0 0h24v8H0z" />
           ���q�^