<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)

const hmsg=ref("Hello?")
const hmsgs=ref("早上好")

</script>

<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<div class="left">
			<div class="upper" @click="hmsgs==='早上好'?hmsgs='晚上好':hmsgs='早上好'"><h1 >{{ hmsg }} “{{hmsgs  }}”</h1></div>
			<div class="downer"><h2>I'm xx</h2><p>a programer from cantoon</p></div>
		</div>
		<div class="right">
			<div class="pic"></div>
		</div>
	</div>


</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.card{
	display: flex;
	justify-content: center;
	height: fit-content;
	flex-wrap: nowrap;
	flex-direction: row;
	border-radius: 5px;
	overflow: hidden;
}
.left{
	width: 700px;
	background-color: #f9e5e5;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;

	display: flex;
	flex-direction: column;
	padding: 10px 30px;

}

.left .upper{
	height: 300px;
	border-bottom: 1px solid gold;
}

.left .upper h1{
	line-height: 80px;
	font-size: 70px;
	background: linear-gradient(90deg, #f84619, rgb(226, 254, 123));
    -webkit-background-clip: text;
	background-clip: text;
    color: transparent;
	text-align: left;
}

.pic{
	background-image: url("../assets/pp.jpg");
	width: 300px;
	height: 600px;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}

.left .downer{
	color: rgb(205, 70, 36);
	text-align: left;
}
</style>
