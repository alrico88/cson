<template lang="pug">
.alert.alert-danger.mb-0
  h5.fw-bold #[icon(name="bi:exclamation-triangle")] Errors found
  .vstack.gap-2.max-height
    div(v-for="item of error") {{ item }}
</template>

<script setup lang="ts">
const props = defineProps<{
  error: string[];
}>();
</script>

<style lang="scss" scoped>
.max-height {
  max-height: 200px;
  overflow-y: auto;
}
</style>
