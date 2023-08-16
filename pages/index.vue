<template lang="pug">
.text-center.p-3
  p With CSON you can convert from CSV to JSON or from JSON to CSV free, fast, and privately. It even works offline!
  p.lead.fw-bold.mb-0 Please select a conversion in the menu above
</template>

<script setup lang="ts">
useHead({
  meta: [
    {
      name: "description",
      content:
        "Progressive Web App to convert between CSV and JSON formats with privacy and ease of use in mind",
    },
    {
      name: "keywords",
      content: ["csv", "json", "convert"],
    },
  ],
});
</script>
