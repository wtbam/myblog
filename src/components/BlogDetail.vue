<template>
  <div class="articletitle">
      <el-button plain @click="$router.back()"><el-icon><ArrowLeft /></el-icon>Go back</el-button>
      <h1>page +{{ props.id }}</h1>

  </div>
  <div class="article">
      <div class="leftarticle">
          
            <v-md-preview :text="content" height="400px"></v-md-preview>
          
          <el-skeleton :rows="15" animated v-if="error"/>
      </div>
      <div class="rightarticle">
        <el-affix :offset="60">
          <el-anchor :offset="70">
            <el-anchor-link :href="`#${item.uuid}`" v-for="(item, index) in hElements" :key="index">
              {{ item.text }}
            </el-anchor-link>
              
          </el-anchor>
        </el-affix>
      </div>

  </div>


</template>

<style scoped>

.article{
    display: flex;
    justify-content: center;
    width: 100%;
    
    padding-top: 40px;
    
}

.leftarticle{
    width: 60%;
    min-height: 700px;
}

.rightarticle{
    width: 20%;
    margin-left: 30px;
    padding-top: 20px;
}

.articletitle{
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
}

.articletitle h1{
    width: 70%;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(211, 211, 211);
}

.el-anchor__link{
  text-align: left;
}
.el-anchor{
  text-align: left;
}

.markdown-body{
  text-align: left;
}


.markdown-body a {
  color: rgb(57, 108, 212);
  text-decoration: none;
  font-weight: 500;
  font-size: 999px;
}

.markdown-body table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}
</style>



<script setup>
import axios from 'axios';
import { onMounted ,ref,reactive} from 'vue';
// import { marked } from 'marked';
import { ElMessage } from 'element-plus'
// import 'highlight.js/styles/base16/darcula.css'
import { computed } from 'vue'



const content=ref('')


const props = defineProps(['id'])
const contentRef = ref(null);
const data = ref(null);
const error = ref(true);

const fallbackMarkdown = `
## CSDN-markdown编辑器 使用示例

本Markdown编辑器使用[StackEdit][6]修改而来，用它写博客，将会带来全新的体验哦：

- **Markdown和扩展Markdown简洁的语法**
- **代码块高亮**
- **图片链接和图片上传**
- ***LaTex*数学公式**
- **UML序列图和流程图**

-
- **离线写博客**
- **导入导出Markdown文件**
- **丰富的快捷键**

-------------------
## 快捷键



## Markdown及扩展

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank"> [ 维基百科 ]

使用简单的符号标识不同的标题，将某些文字标记为**粗体**或者*斜体*，创建一个[链接](http://www.csdn.net)等，详细语法参考帮助？。

本编辑器支持 **Markdown Extra** , 　扩展了很多好用的功能。具体请参考[Github][2].  

### 表格

**Markdown　Extra**　表格语法：

项目     | 价格
-------- | ---
Computer | $1600
Phone    | $12
Pipe     | $1

可以使用冒号来定义对齐方式：
css'''hgvgbhnjmk'''
''' python
hgjvbkn

'''

`;

const fetchData = async () => {
  try {
    const response = await axios.get(`https://api.example.com/data/${props.id}`);
    data.value = response.data;
    error.value=false;
    // contentRef.value.innerHTML = marked(data.value);
    // contentRef.value=marked(data.value)
    content.value=data.value
  } catch (err) {
    // console.log(err);
    // contentRef.value.innerHTML = marked(fallbackMarkdown);
    // contentRef.value=marked(fallbackMarkdown)
    content.value=fallbackMarkdown
    open4()
  }
  getCatalog();
};

const hElements = ref([]);

const lang = ref('en'); // 假设有一个语言选择，默认是 'en'

const anchorLocale = {
  en: 'heading-',
  cn: '标题-'
  // 可以根据需要添加更多语言
};

const locale = computed(() => anchorLocale[lang.value]);
const getText = (arr) => {
  let result = null;
  if (!arr.length) return;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].children && arr[i].children.length) {
      result = getText(Array.from(arr[i].children));
    } else {
      result = arr[i].innerHTML;
    }
  }
  return result;
};


const getCatalog = () => {
  const h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  // const elements = contentRef.value.querySelectorAll(h.join(', '));
  const elements = document.querySelector('.v-md-editor-preview').querySelectorAll(h.join(', '));
  let hElementsArray = [];
  elements.forEach((key, index) => {
    let text;
    if (key.children && key.children.length) {
      text = getText(Array.from(key.children));
    } else {
      text = key.innerHTML;
    }
    const uuid = `${locale.value}${index + 1}`;
    key.id = uuid; // 设置锚点ID
    hElementsArray.push({
      hLevel: parseInt(key.localName[1]),
      text,
      id: key.localName,
      uuid: key.id,
    });
  });
  hElements.value = hElementsArray;
  console.log('hElements:', hElements.value);
  if (hElementsArray.length==0) {
    
    setTimeout(() => {
        getCatalog()
      }, 600);
  }
};


onMounted(()=>{
    fetchData()
    
})

// watch([data, error], () => {
//   if (contentRef.value) {
//     if (error.value) {
//       contentRef.value.innerHTML = marked(fallbackMarkdown);
//     } else if (data.value) {
//       contentRef.value = `<pre>${JSON.stringify(data.value, null, 2)}</pre>`;
//     }
//   }
// });


const open4 = () => {
  ElMessage({
    message: 'Oops, this is a error occured.',
    type: 'error',
    plain: true,
  })
}
</script>