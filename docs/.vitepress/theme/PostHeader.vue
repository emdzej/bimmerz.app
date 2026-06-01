<script setup lang="ts">
import { useData } from "vitepress";

const { frontmatter } = useData();

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
  <div class="post-header">
    <div class="post-meta">
      <time v-if="frontmatter.date" :datetime="frontmatter.date">
        {{ formatDate(frontmatter.date) }}
      </time>
      <span v-for="tag in frontmatter.tags ?? []" :key="tag" class="post-tag">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.post-header {
  margin-bottom: 1rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-meta time {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.post-tag {
  font-size: 0.75rem;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
</style>
