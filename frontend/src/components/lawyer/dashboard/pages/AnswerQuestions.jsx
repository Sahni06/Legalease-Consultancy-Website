import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../utils/api';
import './AnswerQuestions.css';

const AnswerQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, [selectedCategory]);

  const fetchQuestions = async () => {
    try {
      const url = selectedCategory === 'all' 
        ? `${API_URL}/lawyer/questions` 
        : `${API_URL}/lawyer/questions?category=${selectedCategory}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (questionId, answer) => {
    try {
      const response = await fetch(`${API_URL}/lawyer/answer-question/${questionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        },
        body: JSON.stringify({ answer })
      });

      const data = await response.json();
      if (data.success) {
        fetchQuestions(); // Refresh questions list
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="answer-questions-container">
      <h2>Answer Legal Questions</h2>
      
      <div className="filter-section">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {/* Add category options */}
        </select>
      </div>

      <div className="questions-list">
        {questions.map(question => (
          <div key={question._id} className="question-card">
            <div className="question-header">
              <span className="category">{question.category}</span>
              <span className="date">
                {new Date(question.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="question-text">{question.question}</p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const answer = e.target.answer.value;
                handleAnswer(question._id, answer);
                e.target.reset();
              }}
            >
              <textarea 
                name="answer"
                placeholder="Type your answer..."
                rows="3"
                required
              />
              <button type="submit">Submit Answer</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerQuestions;
