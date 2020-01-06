<template>
  <div class="leaves">
      <img src="../assets/leaves1.png" id="leaves1"/>
      <img src="../assets/leaves1.png" id="leaves2"/>
      <img src="../assets/leaves1.png" id="leaves3"/>
      <img src="../assets/leaves1.png" id="leaves4"/>
      <img src="../assets/leaves1.png" id="leaves5"/>
      <img src="../assets/leaves1.png" id="leaves6"/>
      <img src="../assets/leaves1.png" id="leaves7"/>
  </div>
</template>

<script>
export default {
  name: 'Leaves',
}
</script>

<style lang="scss" scoped>
img {
  height: 60px;
  width: 60px;
  position: absolute;
}

#leaves1 { top: -10%;left: 5%;animation: lev 5s infinite 3s linear; }
#leaves2 { top: -10%;left: 20%;animation: lev 5s infinite 1s linear; }
#leaves3 { top: -10%;left: 35%;animation: lev 5s infinite 4s linear; }
#leaves4 { top: -10%;left: 50%;animation: lev 5s infinite 0s linear; }
#leaves5 { top: -10%;left: 65%;animation: lev 5s infinite 5s linear; }
#leaves6 { top: -10%;left: 80%;animation: lev 5s infinite 2s linear; }
#leaves7 { top: -10%;left: 95%;animation: lev 5s infinite 1s linear; }

@keyframes lev{
  0% { top: 0%; transform: rotate(-60deg); }
  100% { top: 100%; transform: rotate(60deg); }
}
</style>