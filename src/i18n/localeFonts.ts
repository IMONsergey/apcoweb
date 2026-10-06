let fontWork: Promise<unknown> | undefined;

/** Load the language-switch fonts without rendering or measuring alternate copy. */
export function warmLocaleFonts() {
  return (fontWork ??= Promise.all([
    ...[400, 500, 600].flatMap((weight) => [
      document.fonts.load(weight + ' 20px "Instrument Sans"', 'English'),
      document.fonts.load(weight + ' 20px "Inter"', 'Русский English'),
    ]),
    ...[400, 500].map((weight) =>
      document.fonts.load(weight + ' 14px "IBM Plex Mono"', 'Русский English'),
    ),
  ]).catch(() => undefined));
}
