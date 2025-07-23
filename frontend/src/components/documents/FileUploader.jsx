import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fileUploadService } from '../../services/upload/FileUploadService';
import { addNotification } from '../../store/slices/notificationSlice';
import './FileUploader.css';

const FileUploader = ({ onUploadSuccess, allowedTypes = [], maxSize = 5 }) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const validateFile = (file) => {
    // Check file size (in MB)
    if (file.size > maxSize * 1024 * 1024) {
      throw new Error(`File size should not exceed ${maxSize}MB`);
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      throw new Error(`File type not supported. Allowed types: ${allowedTypes.join(', ')}`);
    }

    return true;
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await handleFiles(files);
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFiles(files);
    }
  };

  const handleFiles = async (files) => {
    try {
      setUploading(true);
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file
        validateFile(file);

        // Upload file
        const result = await fileUploadService.uploadFile(file, 'document');
        
        dispatch(addNotification({
          type: 'success',
          message: `File ${file.name} uploaded successfully`
        }));

        onUploadSuccess && onUploadSuccess(result);
      }
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.message
      }));
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="file-uploader">
      <div
        className={`upload-area ${dragging ? 'dragging' : ''}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          style={{ display: 'none' }}
          accept={allowedTypes.join(',')}
        />
        
        {uploading ? (
          <div className="upload-progress">
            <div 
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
            <span>{progress}%</span>
          </div>
        ) : (
          <>
            <i className="fas fa-cloud-upload-alt"></i>
            <p>Drag & Drop files here or click to select</p>
            <span className="file-info">
              Maximum file size: {maxSize}MB
              {allowedTypes.length > 0 && (
                <>
                  <br />
                  Allowed types: {allowedTypes.join(', ')}
                </>
              )}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader; 