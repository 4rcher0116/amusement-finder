// Ensure environment variable exists and provide fallback
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:5130';

// Type guard to prevent undefined
if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is required');
}

// Export any other environment variables here