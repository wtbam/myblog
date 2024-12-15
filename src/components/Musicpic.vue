<template>
    <div class="ttop">
        <h2>歌曲名称：<slot name="name">Song's name</slot></h2>
        <p><slot name="p">people</slot></p>
        <img :src="imgsrc" alt="music" />
    </div>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    imgsrc: String,
});

</script>

<style scoped>
.ttop{
    height: 410px;
    width: 400px;
}
img{
    width: 100%;
    height: 82%;
    
}

</style>