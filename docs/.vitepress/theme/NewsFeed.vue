<script setup lang="ts">
import { data as posts } from "../../news/data/news.data";

function formatDate(raw: string): string {
  const d = new Date(raw);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
</script>

<template>
  <div class="news-feed">
    <article v-for="post in posts" :key="post.url" class="news-entry">
      <time :datetime="post.frontmatter.date" class="news-date">
        {{ formatDate(post.frontmatter.date) }}
      </time>

      <h2 class="news-title">
        <a :href="post.url">{{ post.frontmatter.title }}</a>
      </h2>

      <div v-if="post.frontmatter.tags?.length" class="news-tags">
        <span v-for="tag in post.frontmatter.tags" :key="tag" class="news-tag">
          {{ tag }}
        </span>
      </div>

      <div class="news-excerpt" v-html="post.excerpt" />
    </article>
  </div>
</template>

<style scoped>
.news-feed {
  max-width: 720px;
  margin: 0 auto;
}

.news-entry {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.news-entry:last-child {
  border-bottom: none;
}

.news-date {
  display: block;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.25rem;
}

.news-title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  line-height: 1.4;
}

.news-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.news-title a:hover {
  color: var(--vp-c-brand-1);
}

.news-tags {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.news-tag {
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.news-excerpt :deep(p) {
  margin: 0.5rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.news-excerpt :deep(a) {
  color: var(--vp-c-brand-1);
}

.news-excerpt :deep(code) {
  font-size: 0.85em;
  padding: 0.15em 0.35em;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
}

.news-excerpt :deep(pre) {
  margin: 0.75rem 0;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  overflow-x: auto;
}
</style>
