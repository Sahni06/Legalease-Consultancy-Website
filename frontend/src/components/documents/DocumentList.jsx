import React, { useState, useEffect } from 'react';
import { fileUploadService } from '../../services/upload/FileUploadService';
import FileUploader from './FileUploader';
import './DocumentList.css';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/lawyer/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await fileUploadService.deleteFile(documentId);
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  return (
    <div className="document-manager">
      <h2>Documents</h2>
      
      <FileUploader
        onUploadSuccess={(document) => {
          setDocuments(prev => [document, ...prev]);
        }}
        allowedTypes={['application/pdf', 'image/jpeg', 'image/png']}
        maxSize={5}
      />

      <div className="document-list">
        {loading ? (
          <div className="loading">Loading documents...</div>
        ) : documents.length > 0 ? (
          documents.map(document => (
            <div key={document.id} className="document-item">
              <div className="document-icon">
                <i className={`fas fa-${getFileIcon(document.type)}`}></i>
              </div>
              <div className="document-info">
                <h4>{document.name}</h4>
                <span>{formatFileSize(document.size)}</span>
              </div>
              <div className="document-actions">
                <button
                  onClick={() => window.open(document.url, '_blank')}
                  title="View"
                >
                  <i className="fas fa-eye"></i>
                </button>
                <button
                  onClick={() => handleDelete(document.id)}
                  title="Delete"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-documents">
            No documents uploaded yet
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
const getFileIcon = (type) => {
  switch (type) {
    case 'application/pdf':
      return 'file-pdf';
    case 'image/jpeg':
    case 'image/png':
      return 'file-image';
    default:
      return 'file';
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default DocumentList; 