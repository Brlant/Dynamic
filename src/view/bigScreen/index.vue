<template>
    <div class="bigScreen">
        <div class="header">
            <div class="title">动态地理场景</div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.bigScreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
}
.header {
  width: 19.2rem;
  height: 1rem;
  background-image: url('../../assets/bg/bg_top.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  font-size: 0.3rem;
  margin-top: -0.3rem;
}
.title{
  margin-top:0.35rem;
  color: #1F6FF5;
}
</style>
