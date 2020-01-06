<template>
  <div class="drag-wrap">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'DragWrap',
  data() {
    return {
      fromNode: '',
      toNode: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>>