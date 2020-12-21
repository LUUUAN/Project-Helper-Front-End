const DEBUG = process.env.NODE_ENV === "development";
const BACKEND_BASE = DEBUG ? `http://localhost:8080` : `https://projectHelper`;
export default BACKEND_BASE;
