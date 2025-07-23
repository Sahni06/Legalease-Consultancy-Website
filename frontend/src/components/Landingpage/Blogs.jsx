import React, { useState, useEffect } from 'react';
import { legalBlogs } from '../../data/blogs';
import styles from './Blogs.module.css';

const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('blogs');

  useEffect(() => {
    if (activeTab === 'news') {
      fetchLegalNews();
    }
  }, [activeTab]);

  const fetchLegalNews = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_NEWS_API_URL}?q=legal+law&apiKey=${import.meta.env.VITE_NEWS_API_KEY}&language=en&pageSize=6`
      );
      const data = await response.json();
      
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <section id="blogs-section" className={styles.blogsSection}>
      <div className={styles.container}>
        <h2>Legal Insights & Updates</h2>
        
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'blogs' ? styles.active : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            Expert Blogs
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'news' ? styles.active : ''}`}
            onClick={() => setActiveTab('news')}
          >
            Legal News
          </button>
        </div>

        <div className={styles.blogGrid}>
          {activeTab === 'blogs' ? (
            legalBlogs.map((blog) => (
              <div key={blog.id} className={styles.blogCard}>
                <img src={blog.image} alt={blog.title} />
                <div className={styles.blogContent}>
                  <h3>{blog.title}</h3>
                  <p>{blog.summary}</p>
                  <div className={styles.blogMeta}>
                    <span>{blog.author}</span>
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            articles.map((article, index) => (
              <div key={index} className={styles.blogCard}>
                <img src={article.urlToImage || '/placeholder-news.jpg'} alt={article.title} />
                <div className={styles.blogContent}>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className={styles.blogMeta}>
                    <span>{article.source.name}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                    Read Full Article
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
