import { getCollection, getEntry } from 'astro:content';

export async function getSiteSettings() {
  const entry = await getEntry('site', 'settings');
  if (!entry) {
    throw new Error('Missing site settings: src/content/site/settings.yaml');
  }
  return entry.data;
}

export async function getPublishedSeries() {
  const all = await getCollection('series');
  return all
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getWorksForSeries(seriesId: string) {
  const all = await getCollection('works');
  return all
    .filter((entry) => {
      const seriesSlug = entry.id.includes('/')
        ? entry.id.split('/')[0]
        : entry.id.split('\\')[0];
      return seriesSlug === seriesId;
    })
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getExhibitions() {
  const all = await getCollection('exhibitions');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export function seriesSlugFromWorkId(workId: string): string {
  return workId.includes('/') ? workId.split('/')[0]! : workId.split('\\')[0]!;
}
