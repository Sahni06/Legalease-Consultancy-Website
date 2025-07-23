import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../utils/api';
import './AskLawyer.css';

const AskLawyer = () => {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [myQuestions, setMyQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Family Law',
    'Criminal Law',
    'Civil Law',
    'Corporate Law',
    'Property Law',
    'Immigration Law'
  ];

  useEffect(() => {
    fetchMyQuestions();
  }, []);

  const fetchMyQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/user/my-questions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setMyQuestions(data.questions);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/user/ask-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user_token')}`
        },
        body: JSON.stringify({ question, category })
      });

      const data = await response.json();
      
      if (data.success) {
        setQuestion('');
        setCategory('');
        fetchMyQuestions(); // Refresh questions list
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ask-lawyer-container">
      <div className="question-form">
        <h2>Ask a Legal Question</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Your Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your legal question here..."
              rows="5"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Question'}
          </button>
        </form>
      </div>

      <div className="my-questions">
        <h3>My Questions</h3>
        {myQuestions.map(q => (
          <div key={q._id} className="question-card">
            <div className="question-header">
              <span className="category">{q.category}</span>
              <span className={`status ${q.status}`}>{q.status}</span>
            </div>
            <p className="question-text">{q.question}</p>
            {q.answers.length > 0 && (
              <div className="answers">
                <h4>Answers:</h4>
                {q.answers.map(answer => (
                  <div key={answer._id} className="answer">
                    <p className="answer-text">{answer.content}</p>
                    <div className="answer-meta">
                      <span>By: {answer.lawyer.fullName}</span>
                      <span>
                        {new Date(answer.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AskLawyer;
