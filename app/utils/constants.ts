export const BLOG_CATEGORIES = [
  'Updates',
  'Forex Trading',
  'Analysis',
  'Trading Strategies',
  'Risk Management',
  'Financial Markets',
  'Cryptocurrency',
  'Economic Indicators',
  'Other'
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];
