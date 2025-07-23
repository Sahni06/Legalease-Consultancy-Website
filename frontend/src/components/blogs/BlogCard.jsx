import React from 'react';
import styles from './BlogCard.module.css';

const BlogCard = ({ title, summary, date, image, author }) => {
  return (
    <div className={styles.blogCard}>
      <img src={image} alt={title} className={styles.blogImage} />
      <div className={styles.blogContent}>
        <h3>{title}</h3>
        <p>{summary}</p>
        <div className={styles.blogMeta}>
          <span>{author}</span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
