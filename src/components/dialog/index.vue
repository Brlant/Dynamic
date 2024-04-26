<template>
  <div class="dialogContent">
    <div class="infoClose" @click="closeInfo()">关闭</div>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive, computed, watch, watchEffect} from "vue";


const propsData = defineProps({
  element: Object,
})
const emit = defineEmits(['closeDialog'])

const closeInfo = ()=>{
  emit('closeDialog')
}



watch(() => propsData.element, (newVal) => {

}, {immediate: true, deep: true},)



</script>

<style scoped>

.dialogContent {
  width: 65%;
  height: 25%;
  position: absolute;
  padding-bottom: 10px;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  color: white;
  /*pointer-events: none;*/
}
.infoClose {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: red;
}

</style>
