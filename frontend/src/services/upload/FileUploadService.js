class FileUploadService {
  async uploadFile(file, type) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await fetch('/api/lawyer/documents/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Error uploading file');
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await fetch(`/api/lawyer/documents/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lawyer_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Error deleting file');
    }
  }
}

export const fileUploadService = new FileUploadService(); 