<template>
    <div class="top">
        <Musicpic :imgsrc="currentSong.cover">
            <template #name>{{ currentSong.name }}</template>
            <template #p>{{people}}</template>
        </Musicpic>
        <div class="audio-player">
          <audio ref="audioTag" :src="currentSong.url" @timeupdate="updateProgress"></audio>
          <div class="controls">
            <button @click="play">Play</button>
            <button @click="pause">Pause</button>
            <button @click="nextSong">Next Song</button>
            <button @click="preSong">previous Song</button>
          </div>
          <div class="progress-container" @mousedown="startDrag" @mousemove="dragging" @mouseup="stopDrag" @mouseleave="stopDrag">
            <div class="progress" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="time">
            {{ currentTime }} / {{ duration }}
          </div>
          <ScrollLyrics :lyrics="lyrics" :currentIndex="currentLyricIndex" :trans="Math.floor(trans/2)"/>
        </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
import { ref, onMounted } from 'vue';
import ScrollLyrics from './Scrolllyric.vue';
import Musicpic from './Musicpic.vue';
import { parseLRC } from '../utils/parseLRC';

interface Song {
  name: string;
  url: string;
  cover: string;
  lyrics: string;
}

const audioTag = ref<null | HTMLAudioElement>(null);
const songs: Song[] = [
  { name: '悬溺', url: '/music/aa.mp3', cover: '/music/aa.jpg', lyrics: '/music/aa.lrc' },
  { name: '反方向的', url: '/music/bb.FLAC', cover: '/music/bb.jpg', lyrics: '/music/bb.lrc' },
];

// const lyrics = ref<string[]>([
//   "Line 1 of the song",
//   "Line 2 of the song",
//   "Line 3 of the song",
//   "Line 4 of the song",
//   "Line 5 of the song"
// ]);

const lyrics = ref<string[]>([]);
const parsedLyrics = ref<{ time: number; text: string }[]>([]);
let currentSongIndex = 0;
const currentSong = ref(songs[currentSongIndex]);
const progress = ref(0);
const currentTime = ref('0:00');
const duration = ref('0:00');
const currentLyricIndex = ref(0);
const people = ref('');
const trans = ref(0);
let isDragging = false;

const play = () => {
  if (audioTag.value) {
    audioTag.value.play();
  }
};

const pause = () => {
  if (audioTag.value) {
    audioTag.value.pause();
  }
};

const nextSong = () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  currentSong.value = songs[currentSongIndex];
  if (audioTag.value) {
    audioTag.value.src = currentSong.value.url;
    audioTag.value.play();
  }
  loadLyrics(currentSong.value.lyrics)
};

const preSong = () => {
  currentSongIndex = (currentSongIndex -1) % songs.length;
  currentSong.value = songs[currentSongIndex];
  if (audioTag.value) {
    audioTag.value.src = currentSong.value.url;
    audioTag.value.play();
  }
  loadLyrics(currentSong.value.lyrics)
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const updateProgress = () => {
  if (audioTag.value && !isDragging) {
    progress.value = (audioTag.value.currentTime / audioTag.value.duration) * 100;
    currentTime.value = formatTime(audioTag.value.currentTime);
    duration.value = formatTime(audioTag.value.duration);

    // Update currentLyricIndex based on the currentTime
    const currentTimeInSeconds = audioTag.value.currentTime;
    currentLyricIndex.value = parsedLyrics.value.findIndex(
      (lyric, index) => lyric.time <= currentTimeInSeconds && (index === parsedLyrics.value.length - 1 || parsedLyrics.value[index + 1].time > currentTimeInSeconds)
    );
    // currentLyricIndex.value =currentLyricIndex.value;
    // console.log(currentLyricIndex.value);
    
  }
};

const startDrag = (event: MouseEvent) => {
  isDragging = true;
  updateProgressWithEvent(event);
};

const dragging = (event: MouseEvent) => {
  if (isDragging) {
    updateProgressWithEvent(event);
  }
};

const stopDrag = (event: MouseEvent) => {
  if (isDragging) {
    updateProgressWithEvent(event);
    isDragging = false;
    if (audioTag.value) {
      audioTag.value.currentTime = (progress.value / 100) * audioTag.value.duration;
    }
  }
};

const updateProgressWithEvent = (event: MouseEvent) => {
  if (audioTag.value) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    progress.value = (offsetX / rect.width) * 100;
    currentTime.value = formatTime((progress.value / 100) * audioTag.value.duration);
  }
};

const loadLyrics = async (lyricsPath: string) => {
  const response = await fetch(lyricsPath);
  const lrc = await response.text();
  parsedLyrics.value = parseLRC(lrc);
  console.log(parsedLyrics.value);
  lyrics.value = parsedLyrics.value.map((lyric) => lyric.text);
  trans.value=parsedLyrics.value.length;
};

onMounted(() => {
  if (audioTag.value) {
    audioTag.value.addEventListener('loadedmetadata', () => {
      duration.value = formatTime(audioTag.value!.duration);
    });
  }
  loadLyrics(currentSong.value.lyrics); // Load lyrics for the initial songss
});
</script>

  
  <style scoped>
  .audio-player {
    min-width: 380px;
    margin: 0 auto;
    text-align: center;
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    padding: 20px;
    border-radius: 5px;
    
  }
  
  .controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .progress-container {
    position: relative;
    width: 100%;
    height: 10px;
    background: #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  
  .progress {
    height: 100%;
    background: #007bff;
    width: 0;
    transition: width 0.1s;
  }
  
  .time {
    font-size: 12px;
    color: #666;
  }

  .top{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  </style>
  