import { describe, expect, it } from 'vitest';
import { filterProjects, formatPhoneNumber, type ProjectItem } from './filterProjects';

const projects: ProjectItem[] = [
  {
    id: 'bridge',
    title: 'Pont de Cocody',
    category: 'vrd_routes',
    categoryLabel: 'Routes',
    location: 'Abidjan',
    client: 'Ville de Cocody',
    description: 'Réhabilitation du pont',
    scope: [],
    image: '/images/projets/proj_1.webp',
  },
  {
    id: 'tower',
    title: 'Tour résidentielle',
    category: 'batiment',
    categoryLabel: 'Bâtiment',
    location: 'Yamoussoukro',
    description: 'Étude de structure',
    scope: [],
    image: '/images/projets/proj_2.webp',
  },
];

describe('filterProjects', () => {
  it('returns all projects when no filters are selected', () => {
    expect(filterProjects(projects, 'all', '')).toEqual(projects);
  });

  it('filters by category and case-insensitive text across project details', () => {
    expect(filterProjects(projects, 'vrd_routes', '  COCODY ')).toEqual([projects[0]]);
    expect(filterProjects(projects, 'all', 'étude de structure')).toEqual([projects[1]]);
  });

  it('returns no results when category and query do not match the same project', () => {
    expect(filterProjects(projects, 'batiment', 'cocody')).toEqual([]);
  });
});

describe('formatPhoneNumber', () => {
  it('collapses whitespace and trims the number', () => {
    expect(formatPhoneNumber('  +225   07  07 31 35 30  ')).toBe('+225 07 07 31 35 30');
  });
});
