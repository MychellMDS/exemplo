import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // Altere conforme sua porta do backend
})

export default api
