<script setup lang="ts">
/**
 * BMW M tricolour stripe pinned to the top of every page. Three thin
 * bars in the canonical order: light blue (sky), dark blue (M violet
 * historically), red. Same visual signature an M car carries on its
 * kidney grille and side skirts.
 */
</script>

<template>
  <div class="m-stripe" aria-hidden="true">
    <div class="m-stripe__band m-stripe__band--light"></div>
    <div class="m-stripe__band m-stripe__band--dark"></div>
    <div class="m-stripe__band m-stripe__band--red"></div>
  </div>
</template>

<style scoped>
.m-stripe {
  display: flex;
  height: 3px;
  width: 100%;
}
.m-stripe__band {
  flex: 1;
}
.m-stripe__band--light {
  background: var(--m-light);
}
.m-stripe__band--dark {
  background: var(--m-dark);
}
.m-stripe__band--red {
  background: var(--m-red);
}
</style>
