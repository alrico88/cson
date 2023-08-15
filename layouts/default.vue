<template lang="pug">
.d-flex.vh-100.flex-column.w-100.flex-shrink-0
  .bg-sky
    .container.text-center
      .row.justify-content-center.py-3
        .col-md-6
          h1.fw-bold
            nuxt-link.link-unstyled(to="/") CSON
          .lead Convert between CSV and JSON privately
      .row.pb-3
        .col
          nav.nav.nav-pills.justify-content-center
            nuxt-link.nav-link(
              v-for="nav of navigation",
              :key="nav.link",
              :to="nav.link",
              exact-active-class="active"
            ) {{ nav.text }}
  .py-4
    slot
  the-footer.mt-auto
</template>

<script setup lang="ts">
const navigation = [
  {
    link: "/json-to-csv",
    text: "JSON to CSV",
  },
  {
    link: "/csv-to-json",
    text: "CSV to JSON",
  },
];

const { $pwa } = useNuxtApp();

watch(
  () => $pwa.offlineReady,
  () => {
    console.log("ready to work offline");
  },
);
</script>
