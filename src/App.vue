<template>
    <div id="app">
        <Sign />
        <Todo />
    </div>
</template>
<script>
import Todo from './components/Todo'
import Sign from './components/Sign'
export default {
    name: 'App',
    components: {
      Todo,
      Sign,
    },
}
</script>
<style>
#app{
}
</style>


