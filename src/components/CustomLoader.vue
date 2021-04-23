<template>
  <b-icon icon="three-dots" animation="cylon" font-scale="4"
    :hidden='showLoader === false'></b-icon>
</template>

<style scoped>
  .b-icon {
    width: 100%;
  }
</style>

<script>
export default {
  name: 'CustomLoader',
  props: {
    showLoader: Boolean,
  },
};
</script>
