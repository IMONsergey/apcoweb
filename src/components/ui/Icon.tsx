import type { SVGProps } from 'react';
export type IconName =
  | 'arrow'
  | 'down'
  | 'chevron'
  | 'search'
  | 'plus'
  | 'minus'
  | 'close'
  | 'menu'
  | 'previous'
  | 'external'
  | 'focus'
  | 'pause'
  | 'play';
const paths: Record<IconName, string> = {
  arrow: 'M3 8h10M8 3l5 5-5 5',
  down: 'M8 3v10M3 8l5 5 5-5',
  chevron: 'M4 6l4 4 4-4',
  search: 'm11.4 11.4 3.2 3.2M12.5 7A5.5 5.5 0 1 1 1.5 7a5.5 5.5 0 0 1 11 0',
  plus: 'M3 8h10M8 3v10',
  minus: 'M3 8h10',
  close: 'm4 4 8 8M12 4l-8 8',
  menu: 'M2 4h12M2 8h12M2 12h12',
  previous: 'M13 8H3M8 3 3 8l5 5',
  external: 'M4 12 12 4M4 4h8v8',
  focus: 'M1 5V1h4m6 0h4v4m0 6v4h-4m-6 0H1v-4',
  pause: 'M5 3v10M11 3v10',
  play: 'm5 3 8 5-8 5Z',
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
