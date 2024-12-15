<template>
    <div class="articles">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="articles && articles.length" class="cardall">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <img :src="article.cover_image_url" :alt="article.title" class="cover-image">
          <div class="article-info">
            <h2 class="title">{{ article.title }}</h2>
            
            <p class="published-at">{{ new Date(article.published_at).toLocaleDateString() }}</p>
            <p class="summary">{{ article.summary }}</p>
            <div class="tags">
              
              <el-tag v-for="tag in article.tags" :key="tag" type="info" effect="plain" size="small">{{ tag }}</el-tag>
            </div>
			<RouterLink :to="'/Blog/'+article.id" class="read-more">Read more</RouterLink>
            <!-- <a :href="article.article_url" target="_blank" class="read-more">Read more</a> -->
          </div>
        </div>
      </div>
      <el-pagination layout="prev, pager, next" :total="total" :current-page.sync="currentPage" @current-change="handlePageChange"/>
    </div>
    
</template>
  
<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';


// 定义响应式变量
const total = ref(50);

const currentPage = ref(1);
const loading = ref(false);
const error = ref(null);
const articles=ref({})
const defaultArticles = {'page1':[
  {
    id: 1,
    title: "Understanding CSS Flexbox",
    author: { name: "John Doe", profile_url: "https://example.com/authors/john-doe" },
    published_at: "2024-05-01T10:00:00Z",
    summary: "Learn the basics and advanced techniques of CSS Flexbox for building responsive web layouts.",
    tags: ["CSS", "Flexbox", "Web Development"],
    cover_image_url: "https://example.com/images/css-flexbox.png",
    article_url: "https://example.com/articles/understanding-css-flexbox"
  },
  {
    id: 2,
    title: "A Guide to Modern JavaScript",
    author: { name: "Jane Smith", profile_url: "https://example.com/authors/jane-smith" },
    published_at: "2024-04-15T08:30:00Z",
    summary: "An in-depth guide to modern JavaScript features and best practices for building robust web applications.",
    tags: ["JavaScript", "ES6", "Programming"],
    cover_image_url: "https://example.com/images/modern-js.png",
    article_url: "https://example.com/articles/guide-to-modern-javascript"
  },
  {
    id: 3,
    title: "Introduction to Python for Data Science",
    author: { name: "Alice Johnson", profile_url: "https://example.com/authors/alice-johnson" },
    published_at: "2024-03-20T12:00:00Z",
    summary: "Start your data science journey with Python. Learn the fundamentals and explore popular libraries like Pandas and NumPy.",
    tags: ["Python", "Data Science", "Machine Learning"],
    cover_image_url: "https://example.com/images/python-data-science.png",
    article_url: "https://example.com/articles/python-for-data-science"
  }
],
'page2':[
  {
    id: 1,
    title: "UndersadadadaFlexbox",
    author: { name: "John Doe", profile_url: "https://example.com/authors/john-doe" },
    published_at: "2024-05-01T10:00:00Z",
    summary: "Learn the basics and advanced techniques of CSS Flexbox for building responsive web layouts.",
    tags: ["CSS", "Flexbox", "Web Development"],
    cover_image_url: "https://example.com/images/css-flexbox.png",
    article_url: "https://example.com/articles/understanding-css-flexbox"
  },
  {
    id: 2,
    title: "A Guide to Modern JavaScript",
    author: { name: "Jane Smith", profile_url: "https://example.com/authors/jane-smith" },
    published_at: "2024-04-15T08:30:00Z",
    summary: "An in-depth guide to modern JavaScript features and best practices for building robust web applications.",
    tags: ["JavaScript", "ES6", "Programming"],
    cover_image_url: "https://example.com/images/modern-js.png",
    article_url: "https://example.com/articles/guide-to-modern-javascript"
  },
  {
    id: 3,
    title: "Introduction to Python for Data Science",
    author: { name: "Alice Johnson", profile_url: "https://example.com/authors/alice-johnson" },
    published_at: "2024-03-20T12:00:00Z",
    summary: "Start your data science journey with Python. Learn the fundamentals and explore popular libraries like Pandas and NumPy.",
    tags: ["Python", "Data Science", "Machine Learning"],
    cover_image_url: "https://example.com/images/python-data-science.png",
    article_url: "https://example.com/articles/python-for-data-science"
  }
],
};

const articlesCache ={};

const fetchData = async (page) => {
  loading.value = true;
  error.value = "";
  try {
	if (!articlesCache.value[`page${page}`]) {
		const response = await axios.get('https://api.example.com/articles?pagenum='+page);
		
		articlesCache.value[`page${page}`] = response.value;
	}
  } catch (err) {
    console.error('Failed to fetch data from backend, using default data.', err);
    articlesCache.value = defaultArticles;
	
    total.value = 100;
    error.value = 'Failed to load articles. Displaying default articles.';
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page) => {
	currentPage.value = page;
	fetchData(page)
	articles.value = articlesCache.value[`page${page}`]
	console.log(page);
};



onMounted(() => {
  fetchData(1);
  console.log(articlesCache.value);
  articles.value=articlesCache.value[`page1`]
});
</script>
  
<style scoped>
  .articles {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 50px;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }
  .loading, .error {
    text-align: center;
    width: 100%;
	color: #979797;
  }
  .cardall{
    display: flex;
    width: 1100px;
    flex-wrap: wrap;
    
    justify-content: space-between;
  }
  .article-card {
    display: flex;
    flex-direction: row;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    width: 500px;
    height: 250px;
    margin: 10px 20px;
  }
  .cover-image {
    width: 40%;
    object-fit: cover;
  }
  .article-info {
    width: 60%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .article-info p{
    font-size: 15px;
  }
  .title {
    font-size: 18px;
    margin: 0 0 10px;
  }
  .author, .published-at, .summary, .tags, .read-more {
    margin: 0 0 10px;
  }
  .tag {
    background-color: #eee;
    border-radius: 4px;
    padding: 2px 6px;
    margin-right: 5px;
  }

  .summary{
    overflow: hidden;            /* 隐藏溢出的文本 */
    text-overflow: ellipsis;     /* 使用省略号替代溢出的文本 */
    display: -webkit-box;        /* 兼容 WebKit 浏览器 */
    -webkit-line-clamp: 3;       /* 限制显示的行数 */
    -webkit-box-orient: vertical; /* 使块元素成为纵向布局 */
    width: 100%;
  }

  .tags>span{
    margin: 3px 3px;
  }
  .read-more {
    color: #007BFF;
    text-decoration: none;
  }
  .read-more:hover {
    text-decoration: underline;
  }


</style>
  