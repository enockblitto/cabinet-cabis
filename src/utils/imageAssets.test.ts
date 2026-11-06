import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { assetUrl } from './assets';

const collectWebpFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectWebpFiles(path) : entry.name.endsWith('.webp') ? [path] : [];
  });

const collectSourceFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(path);
    return /\.(?:ts|tsx)$/.test(entry.name) && !entry.name.endsWith('.test.ts') ? [path] : [];
  });

describe('published WebP assets', () => {
  it('uses the WebP format for every .webp file', () => {
    const imageDirectory = join(process.cwd(), 'public', 'images');
    const files = collectWebpFiles(imageDirectory);

    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const header = readFileSync(file).subarray(0, 12);
      expect(header.subarray(0, 4).toString('ascii'), file).toBe('RIFF');
      expect(header.subarray(8, 12).toString('ascii'), file).toBe('WEBP');
    }
  });

  it('resolves every referenced public image and video', () => {
    const sourceFiles = collectSourceFiles(join(process.cwd(), 'src'));
    const assetReference = /assetUrl\(['"]\/(images|videos)\/([^'"]+)['"]\)/g;
    const missing: string[] = [];

    for (const sourceFile of sourceFiles) {
      const source = readFileSync(sourceFile, 'utf8');
      for (const match of source.matchAll(assetReference)) {
        const relativePath = join(match[1], ...match[2].split('/'));
        if (!existsSync(join(process.cwd(), 'public', relativePath))) {
          missing.push(`${sourceFile}: /${relativePath}`);
        }
      }
    }

    expect(missing).toEqual([]);
  });

  it('prefixes public assets with the configured Vite base path', () => {
    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    expect(assetUrl('/images/logo-header.webp')).toBe(`${baseUrl}images/logo-header.webp`);
  });
});
