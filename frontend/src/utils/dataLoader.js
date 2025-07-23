const API_URL = import.meta.env.VITE_API_URL;

export const loadLegalData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/legal-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error loading legal data:', error);
    // Return fallback data
    return {
      general: {
        greeting: "Hello! I'm your legal assistant. How can I help you today?",
        farewell: "Thank you for using our service!"
      }
    };
  }
};

// Default legal knowledge base
export const legalKnowledgeBase = {
  general: {},
  criminal: {},
  civil: {},
  corporate: {},
  family: {}
};

export const updateKnowledgeBase = (newData) => {
  if (!newData || typeof newData !== 'object') {
    return false;
  }

  try {
    Object.entries(newData).forEach(([category, data]) => {
      if (legalKnowledgeBase[category]) {
        legalKnowledgeBase[category] = {
          ...legalKnowledgeBase[category],
          ...data
        };
      } else {
        legalKnowledgeBase[category] = data;
      }
    });
    return true;
  } catch (error) {
    console.error('Error updating knowledge base:', error);
    return false;
  }
};