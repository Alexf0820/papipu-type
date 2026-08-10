/** X (Twitter) intent URL — same pattern as Papipu Maker. */
export function buildXShareUrl(text: string, url?: string): string {
  const params = new URLSearchParams({ text });
  if (url) {
    params.set("url", url);
  }
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}
