import axios from "axios";

const api = axios.create({
    baseURL: `https://api-gestao-estoque.vercel.app`
})

export default api