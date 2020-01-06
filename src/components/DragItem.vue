<template>
  <div class="drag" :class="{'start': startDrag}"
    @dragstart.stop="onStart"
    @dragenter.stop="onEnter"
    @dragend.stop="onEnd"
    draggable="true"
    >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'DragItem',
  data() {
    return {
      startDrag: false
    }
  },    
  created() {
  },

  methods: {
    onStart() {
      this.startDrag = true

      this.$parent._data.fromNode = this.$el
    },
    
    onEnter() {
      this.$parent._data.toNode = this.$el

      let parent = this.$parent
      let fromNode = parent._data.fromNode
      let toNode = parent._data.toNode
      
      parent.$el.insertBefore(fromNode, toNode.nextSibling)
    },

    onEnd() {
      this.startDrag = false
    }
  }
}
</script>

<style lang="scss" scoped>
.drag {
  opacity: 1;
  &.start {
    opacity: 0.2;
  }
}
</style>>