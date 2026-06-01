import { createContentLoader } from "vitepress";

export interface NewsPost {
  url: string;
  frontmatter: {
    date: string;
    title: string;
    image?: string;
    tags?: string[];
  };
  excerpt: string;
}

export default createContentLoader("news/posts/*.md", {
  excerpt: "---",
  transform(raw): NewsPost[] {
    return raw
      .sort(
        (a, b) =>
          +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date),
      )
      .map((p) => ({
        url: p.url,
        frontmatter: p.frontmatter as NewsPost["frontmatter"],
        excerpt: p.excerpt ?? "",
      }));
  },
});

export declare const data: NewsPost[];
