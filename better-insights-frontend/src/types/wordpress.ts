export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, any>;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details?: {
        width: number;
        height: number;
        sizes?: Record<string, any>;
        [key: string]: any;
      };
      [key: string]: any;
    }>;
    author?: Array<{
      id: number;
      name: string;
      url: string;
      description: string;
      avatar_urls?: Record<string, string>;
      [key: string]: any;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
      [key: string]: any;
    }>>;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface WPPage extends WPPost {}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  [key: string]: any;
}

export interface WPTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  [key: string]: any;
}

export interface WPCaseStudy {
  id: number;
  date: string;
  modified?: string;
  slug: string;
  status: string;
  type: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  meta?: Record<string, any>;
  _embedded?: any;
  [key: string]: any;
}

export interface WPSearchResult {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
}
