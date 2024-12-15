import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// import './ceylon.css'
// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
//use router
import { createWebHistory, createRouter } from 'vue-router'
// import HomeView from './components/HelloWorld.vue'
// import ContactView from './components/Contact.vue'
// import BlogView from './components/Blog.vue'
// import SkillView from './components/Skill.vue'
//dynamic import 
const HomeView = () => import('./components/HelloWorld.vue')
const ContactView = () => import('./components/Contact.vue')
const BlogView = () => import('./components/Blog.vue')
const BlogsView = () => import('./components/Blogs.vue')
const MusicView = () => import('./components/Music.vue')
const SkillView = () => import('./components/Skill.vue')
const BlogDetailView =() => import('./components/BlogDetail.vue')

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: HomeView },
  { path: '/Contact', component: ContactView },
  { path: '/Blog', component: BlogsView ,children:[{path:'/Blog/:id', component:BlogDetailView, props:true},{path:'',component:BlogView,props:true}]},
  { path: '/Skill', component: SkillView },
  {path:'/Music', component: MusicView},
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass:'activebar',
  routes,
})

//use element and icon
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(ElementPlus).use(VMdPreview).mount('#app')
