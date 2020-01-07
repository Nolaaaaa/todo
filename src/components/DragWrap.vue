<template>
  <div class="drag-wrap">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'DragWrap',
  props: ['list'],
  data() {
    return {
      fromNode: '',
      toNode: '',
      childDom: [],  // 原始DOM
      newList: ''
    }
  },

  watch: {
    newList(newVal, oldVal) {
      if(newVal) {
        this.getNewList()
      }
    }
  },

  methods: {
    getNewList() {
      this.$emit('newList', this.newList)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>>