const env = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
  MODE: import.meta.env.VITE_MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD
};

// Validate required environment variables
const validateEnv = () => {
  const required = ['API_URL'];
  const missing = required.filter(key => !env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Make sure they are defined in your .env file.'
    );
  }
};

// Run validation
validateEnv();

export default env; 