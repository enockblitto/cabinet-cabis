export interface ProjectItem {
  id: string;
  title: string;
  category: 'batiment' | 'vrd_routes' | 'energie_hydro' | 'eau_assainissement' | 'telecom';
  categoryLabel: string;
  location?: string;
  client?: string;
  role?: string;
  year?: string;
  image: string;
  description: string;
  scope: string[];
}

export function filterProjects(
  projects: ProjectItem[],
  selectedCategory: string,
  searchQuery: string
): ProjectItem[] {
  const query = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;

    const matchesSearch =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      (project.location && project.location.toLowerCase().includes(query)) ||
      (project.client && project.client.toLowerCase().includes(query)) ||
      project.categoryLabel.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\s+/g, ' ').trim();
}
