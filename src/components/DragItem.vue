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
  mounted() {
    this.$parent.childDom.push(this.$el)
  },

  methods: {
    onStart() {
      this.startDrag = true
      this.$parent.fromNode = this.$el
    },
    
    onEnter() {
      this.$parent.toNode = this.$el
      let { fromNode, toNode } = this.$parent._data
      this.$parent.$el.insertBefore(fromNode, this.isPreNode(fromNode,toNode)?toNode:toNode.nextSibling)

    },

    onEnd() {
      this.startDrag = false
      let { list, childDom } = this.$parent
      let newChildDom = [...this.$parent.$el.children]
      
      let newList = []
      for(let i = 0; i < list.length; i++) {
        for(let j = 0; j < list.length; j++) {
          if(childDom[i] == newChildDom[j]) {
            newList[j] = list[i]
          }
        }
      }
      this.$parent.newList = newList
    },

    isPreNode(from, to) {
      while(from.previousSibling !== null) {
        if(from.previousSibling === to) {
          return true
        }
        from = from.previousSibling
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.drag {
  opacity: 1;
  &.start {
    opacity: 0.5;
    padding: 0 10px;
    zoom: 1.1;
    box-shadow: 0px 0px 7px 1px #8eb7e0;
    border: 1px solid #2d83da;
  }
}
</style>>