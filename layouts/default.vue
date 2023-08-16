<template lang="pug">
.container-lg
  .row.min-vh-100.align-items-center
    .col
      .row.text-center.justify-content-center.py-3
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
      .row.py-3
        .col
          .card
            .card-body
              slot
      the-footer
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
