import type { ImgHTMLAttributes } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  asset: string;
  responsive?: boolean;
};

/** Art-directed light/dark files; never recolor a rendered illustration with CSS. */
export function ThemedArtwork({ asset, responsive = false, ...props }: Props) {
  const { theme } = useTheme();
  const stem = asset.replace(/\.webp$/, '') + (theme === 'dark' ? '-dark' : '');
  const base = import.meta.env.BASE_URL + 'assets/' + stem;
  return (
    <img
      {...props}
      key={theme}
      data-artwork-theme={theme}
      src={base + '.webp'}
      {...(responsive ? { srcSet: `${base}-600.webp 600w, ${base}.webp 1200w` } : {})}
    />
  );
}
