import React, { useState, useEffect } from 'react';
import './LawyerDocuments.css';

const LawyerDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lawyer/documents`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }

      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading documents...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="documents-container">
      <div className="documents-header">
        <h2>My Documents</h2>
        <button className="upload-btn">Upload New Document</button>
      </div>

      {documents.length === 0 ? (
        <div className="no-documents">
          <p>No documents found. Upload your first document to get started.</p>
        </div>
      ) : (
        <div className="documents-grid">
          {documents.map(doc => (
            <div key={doc._id} className="document-card">
              <div className="document-icon">
                {doc.fileType === 'pdf' ? '📄' : '📝'}
              </div>
              <div className="document-info">
                <h3>{doc.title}</h3>
                <p>{new Date(doc.createdAt).toLocaleDateString()}</p>
                <span className="document-category">{doc.category}</span>
              </div>
              <div className="document-actions">
                <button className="view-btn">View</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LawyerDocuments;