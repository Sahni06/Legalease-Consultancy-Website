import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './BlogManager.css';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    title: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft'
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/lawyer/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = currentBlog.id ? 'PUT' : 'POST';
      const url = currentBlog.id 
        ? `/api/lawyer/blogs/${currentBlog.id}`
        : '/api/lawyer/blogs';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentBlog)
      });

      fetchBlogs();
      setShowEditor(false);
      setCurrentBlog({
        title: '',
        content: '',
        category: '',
        tags: [],
        status: 'draft'
      });
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  return (
    <div className="blog-manager">
      <div className="blog-header">
        <h2>Blog Management</h2>
        <button onClick={() => setShowEditor(true)}>
          <i className="fas fa-plus"></i> New Blog Post
        </button>
      </div>

      {showEditor ? (
        <div className="blog-editor">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Blog Title"
              value={currentBlog.title}
              onChange={(e) => setCurrentBlog({
                ...currentBlog,
                title: e.target.value
              })}
            />

            <ReactQuill
              value={currentBlog.content}
              onChange={(content) => setCurrentBlog({
                ...currentBlog,
                content
              })}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}],
                  ['link', 'image'],
                  ['clean']
                ]
              }}
            />

            <select
              value={currentBlog.category}
              onChange={(e) => setCurrentBlog({
                ...currentBlog,
                category: e.target.value
              })}
            >
              <option value="">Select Category</option>
              <option value="legal-advice">Legal Advice</option>
              <option value="case-studies">Case Studies</option>
              <option value="law-updates">Law Updates</option>
            </select>

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={currentBlog.tags.join(', ')}
              onChange={(e) => setCurrentBlog({
                ...currentBlog,
                tags: e.target.value.split(',').map(tag => tag.trim())
              })}
            />

            <select
              value={currentBlog.status}
              onChange={(e) => setCurrentBlog({
                ...currentBlog,
                status: e.target.value
              })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <div className="editor-actions">
              <button type="button" onClick={() => setShowEditor(false)}>
                Cancel
              </button>
              <button type="submit">
                {currentBlog.id ? 'Update' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="blog-list">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <div className="blog-info">
                <h3>{blog.title}</h3>
                <p>{blog.content.substring(0, 150)}...</p>
                <div className="blog-meta">
                  <span className={`status ${blog.status}`}>
                    {blog.status}
                  </span>
                  <span className="date">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="blog-actions">
                <button onClick={() => {
                  setCurrentBlog(blog);
                  setShowEditor(true);
                }}>
                  <i className="fas fa-edit"></i>
                </button>
                <button onClick={async () => {
                  if (window.confirm('Delete this blog post?')) {
                    await fetch(`/api/lawyer/blogs/${blog.id}`, {
                      method: 'DELETE'
                    });
                    fetchBlogs();
                  }
                }}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManager; 