import axios from 'axios'

const api = axios.create({
  baseURL: "https://backendleadershiphub-2.onrender.com",
  withCredentials: true, // ✅ send cookies with requests
});

export default api;
