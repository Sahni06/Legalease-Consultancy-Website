import React, { useState, useEffect } from 'react';
import styles from './BlogPage.module.css';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_NEWS_API_URL}?q=legal+law&apiKey=${import.meta.env.VITE_NEWS_API_KEY}&language=en&pageSize=12`
      );
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.blogPage}>
      <h1>Legal News & Insights</h1>
      {loading ? (
        <div className={styles.loading}>Loading articles...</div>
      ) : (
        <div className={styles.articlesGrid}>
          {articles.map((article, index) => (
            <div key={index} className={styles.articleCard}>
              <img 
                src={article.urlToImage || '/placeholder-news.jpg'} 
                alt={article.title}
                onError={(e) => e.target.src = '/placeholder-news.jpg'}
              />
              <div className={styles.articleContent}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <div className={styles.articleMeta}>
                  <span>{article.source.name}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.readMore}
                >
                  Read Full Article
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
