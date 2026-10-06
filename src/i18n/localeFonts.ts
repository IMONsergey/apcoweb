let fontWork: Promise<unknown> | undefined;

export function warmLocaleFonts() {
  return (fontWork ??= Promise.all([
    ...[400, 500, 600].map((weight) =>
      document.fonts.load(weight + ' 20px "Instrument Sans"', 'English'),
    ),
    ...[400, 500].map((weight) =>
      document.fonts.load(weight + ' 14px "IBM Plex Mono"', 'English'),
    ),
  ]).catch(() => undefined));
}
