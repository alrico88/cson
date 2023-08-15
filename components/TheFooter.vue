<template lang="pug">
footer.bg-sky.py-3
  .container.text-center
    .row
      .col
        ul.list-inline.mb-0
          li.list-inline-item #[icon(name="bi:person")] Created by #[nuxt-link(to="https://alrico.es" v-bind="linkAttrs") Alberto Rico]
          li.list-inline-item #[icon(name="bi:github")] Code on #[nuxt-link(:to="repoLink" v-bind="linkAttrs") Github]
          li.list-inline-item
            button.btn.btn-link.p-0(
              v-if="$pwa?.needRefresh"
              @click="$pwa?.updateServiceWorker()"
            ) #[icon(name="bi:repeat")] Update available
</template>

<script setup>
const repoLink = "https://github.com/alrico88/cson";

const linkAttrs = {
  target: "_blank",
};

const { $pwa } = useNuxtApp();
</script>
