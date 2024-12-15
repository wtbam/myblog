<template>
  <div class="lyrics-container">
    <slot name="cover"></slot>
    <div class="lyrics" :style="{ transform: `translateY(${(trans)*40-currentIndex * 40}px)` }">
      <div v-for="(line, index) in lyrics" :key="index" :class="{ active: index === currentIndex }">
        {{ line }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  lyrics: string[];
  currentIndex: number;
  trans:number;
}>();

watch(() => props.currentIndex, () => {
  // Handle any additional logic when currentIndex changes
});
</script>
  
  <style scoped>
  .lyrics-container {
    margin-top: 30px;
    overflow: hidden;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  
  .lyrics {
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
  }


  .lyrics div {
    font-size: 18px;
    color: rgb(74, 74, 74);
    line-height: 40px;
    text-align: center;
  }
  
  .lyrics div.active {
    font-size: 25px;
    color: rgb(29, 29, 29);
    font-weight: bold;
  }
  </style>
  