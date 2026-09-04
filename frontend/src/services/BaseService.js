import axios from 'axios'

const api = axios.create()

api.interceptors.response.use(
    response => response,
    error => {
        console.log("1 - interceptor executou")
        console.log("2 - status:", error.response?.status)

        if (error.response?.status === 401) {
            console.log("3 - entrei no IF")
            console.log("4 - URL atual:", window.location.href)

            window.location.href = "/auth"

            console.log("5 - tentei redirecionar")
        }

        return Promise.reject(error)
    }
)

export default api