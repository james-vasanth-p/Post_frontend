export const environment = {
  production: true, // Indicates the app is in production mode
  apiBaseUrl: 'https://post-backend-qepi.onrender.com/api', // Secure backend API URL for production
  enableDebug: false, // Disable debug information for security
  contentSecurityPolicy:
    "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;",
};
