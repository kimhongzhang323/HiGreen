// Environment variables configuration
// Create a .env file in the project root with your API keys
// Example: GEMINI_API_KEY=your_api_key_here

// For Expo projects, environment variables are accessed via process.env
// Make sure to add your API keys to .env file (which is gitignored)

export const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

// Validate that required environment variables are set
if (!GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. Please add EXPO_PUBLIC_GEMINI_API_KEY to your .env file.');
}
