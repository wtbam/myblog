<script setup>
import { ref } from 'vue';
// import {button} from 'element-plus'
import { ElMessage } from 'element-plus'
const isbright=ref(true)
const isopenpan=ref(false)

const props = defineProps(['show'])


const isLogin = ref(true)
const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref(' ')

const closeModal = () => {
   isopenpan.value=false
}

const toggleMode = () => {
  isLogin.value = !isLogin.value
}

const login = () => {
  if (username.value === 'admin' && password.value === 'password') {
    
    closeModal()
  } else {
    ElMessage.error('Oops, this is a error message.')
  }
}

const register = () => {
  // Add your registration logic here
  errorMessage.value = 'Registration not implemented'
}

</script>

<template>
	<header>
		<div class="loginbut"><el-button key="login" type="" @click="isopenpan=true">login | register</el-button></div>
		<div class="modal-overlay" @click.self="closeModal" v-if="isopenpan">
			<div class="modal">
			<div class="modal-header">
				<h3>{{ isLogin ? 'Login' : 'Register' }}</h3>
				
				<el-button @click="closeModal()">X</el-button>
			</div>
			<form >
				<div class="form-group">
				<label for="username">Username</label>
				<input type="text" id="username" v-model="username" required />
				</div>
				<div class="form-group" v-show="!isLogin">
				<label for="email">Email</label>
				<input type="email" id="email" v-model="email" required />
				</div>
				<div class="form-group">
				<label for="password">Password</label>
				<input type="password" id="password" v-model="password" required />
				</div>
				<el-button key="login" type="submit" @click.prevent="isLogin ? login() : register()">{{ isLogin ? 'Login' : 'Register' }}</el-button>
				
			</form>
			<!-- <p v-if="errorMessage" class="err">{{ errorMessage }}</p> -->
			<p @click="toggleMode">
				{{ isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login' }}
			</p>
			</div>
		</div>
		<div class="headd">
			<h1>My blog</h1>
		</div>
		<div :class="{bright:isbright,dark:!isbright}" class="navbar">
			<ul class="lists">
				<li><RouterLink to="/" exact>Home</RouterLink></li>
				<li><RouterLink to="/Skill">Skill</RouterLink></li>
				<li><RouterLink to="/Blog">Blog</RouterLink></li>
				<!-- <li><a href="/Shop">Shop</a></li> -->
				<li><RouterLink to="/Music">Music</RouterLink></li>
				<li><RouterLink to="/Contact">Contact</RouterLink></li>
			</ul>	
		</div>
	</header>
	<main>
		<RouterView />
	</main>
	<footer>
		<div :class="{bright:isbright,dark:!isbright}" class="footbar">
			<div class="toof">
				<div class="footcontent">
					<el-icon :size="40"><OfficeBuilding /></el-icon>
					<el-icon :size="40"><Watermelon /></el-icon>

				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped>
main{
	display: flex;
	justify-content: center;
	flex-direction: column;
    
    align-items: center;
}
/* bright or dark */
.bright{

}

.dark{
	color: aliceblue;
	background-color: #1a1a1a;
}



/* 导航栏样式 */

.lists{
	
	height: 50px;
	
	display: flex; /* 启用flexbox布局 */
    justify-content: center; /* 水平居中对齐 */
}
.lists li{
	padding: 10px;
	box-sizing: border-box;

	text-align: center;
	float: left;
	list-style: none;
	margin: 4px 10px;
	text-decoration: none;
	font-size: large;
	width: 140px;
	height: 50px;
	line-height: 40px;
	
}

.lists li a:not(.activebar) {
        
	color: #747474;
	text-decoration: none;
}

.lists li:hover{
	border-top: 4px solid rgb(26,26,26);
	margin-top: 0px;
	color: #1a1a1a;
}


.navbar{
	margin-bottom: 50px;
}
.activebar{
	color: #0f0f0f;
	text-decoration: none;
}


/* footbar */
.toof{
	
	height: 200px;
	background-color: #ffffff;
	/* background-color: #ebebeb; */
}

.footbar{
	background-color: #ffffff;
	position: relative;
	bottom: 0px;
	border-top: 1px solid rgb(192, 192, 192);
	height: 100px;
	margin-top: 90px;
	display: flex;
	justify-content: center;
	height: fit-content;
	z-index: -1;
}
.footcontent{
	margin-top: 30px;
}

/* loginpan */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h3 {
  margin: 0;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  width: 20px;
  color: #0f0f0f;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}





.modal-overlay p {
	margin-top: 20px;
  color: rgb(199, 199, 199);
  font-size: small;
  height: 20px;
}



.modal-overlay p:hover {
  cursor: pointer;
  color: rgb(52, 52, 52);
}
.loginbut {
	display: flex;
	justify-content: right;
	padding: 0px 28px;
}


</style>
