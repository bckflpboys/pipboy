export const BLOG_CATEGORIES = [
  'Technology',
  'Data',
  'Programming',
  'Web Development',
  'AI & Machine Learning',
  'DevOps',
  'Security',
  'Career',
  'Other'
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];
