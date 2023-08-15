<template lang="pug">
.alert.alert-danger.mb-0
  .vstack.gap-2
    h5.fw-bold #[icon(name="bi:exclamation-triangle")] Errors found
    div(v-for="item of error") {{ item }}
</template>

<script setup lang="ts">
const props = defineProps<{
  error: string[];
}>();
</script>

<style lang="scss" scoped></style>
