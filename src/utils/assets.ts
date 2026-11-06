export function assetUrl(path: string): string {
  const relativePath = path.replace(/^\/+/, '');
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${baseUrl}${relativePath}`;
}
