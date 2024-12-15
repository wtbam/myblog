<template>
    <div class="exp">
        <ThreeD />
    </div>

    <div class="revel">
        <h1>scan my skill</h1>
        <div class="hover-area"  ref="container" @mousemove="updateHoverPosition" @mouseleave="resetHoverPosition" :style="hoverStyle">
            
            <div class=""><h1>建模</h1></div>
            <div class=""><h1>编程</h1></div>
            <div class=""><h1>绘画</h1></div>
            <div class=""><h1>设计</h1></div>

        </div>
    </div>

   
</template>

<style scoped>
.exp{
    width: min-content;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.revel{
    
    width: 100%;
    min-height: min-content;
}

.revel h1{
    
}
.black{
    height: 500px;
    background-color: #1b1b1b;
    width: 100%;
}
.hover-area {
  position: relative;
  background-color: white;
  color: rgb(255, 255, 255);
  padding: 20px;
  transition: color 0.3s ease;
  overflow: hidden;
  height: 100%;
  display: flex;
  height: 500px;
  /* margin: -50px 0px;
  z-index: 6; */
}
.hover-area div{
    width: 25%;
    height: 100%;
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: none;
    
}

.hover-area::before {
  content: '';
  position: absolute;
  top: var(--hover-y, -200px);
  left: var(--hover-x, -200px);
  width: 280px; /* 圆的直径 */
  height: 280px; /* 圆的直径 */
  border-radius: 50%;
  background-color: rgb(36, 36, 36);
  transition: transform 0.4s ease, opacity 0.1s ease;
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none;
  z-index: 1;
}

.hover-area:hover::before {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.hover-area span {
  position: relative;
  z-index: 2;
}
</style>

<script setup>
import { ref ,computed} from 'vue';
import ThreeD from './ThreeD.vue';
const isHovered = ref(false);
const hoverX = ref(-1);
const hoverY = ref(-1);
const container = ref(null);

const updateHoverPosition = (event) => {
    const rect = container.value.getBoundingClientRect();
  hoverX.value = event.clientX - rect.left;
  hoverY.value = event.clientY - rect.top;
};

const resetHoverPosition = () => {
  hoverX.value = -1;
  hoverY.value = -1;
};

const hoverStyle = computed(() => {
  if (hoverX.value === -1 && hoverY.value === -1) {
    return {};
  }
  return {
    '--hover-x': `${hoverX.value}px`,
    '--hover-y': `${hoverY.value}px`,
    '--hover-scale': '1'
  };
});
setInterval(() => {
  hoverStyle.value['--hover-scale'] = Math.random() * 0.5 + 0.5;
}, 1000);
</script>