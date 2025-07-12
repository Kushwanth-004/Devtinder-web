// export const BASE_URL = "/api";
// export const BASE_URL = "http://localhost:8888";

// export const BASE_URL = "https://devtinder-backend-pa1s.onrender.com"

// constant.js
export const BASE_URL = import.meta.env.PROD
  ? "https://devtinder-backend-pa1s.onrender.com"
  : "http://localhost:8888";
