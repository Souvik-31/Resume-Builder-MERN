export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";


export const API_PATHS = {
    AUTH: {
        SIGNUP: `${BASE_URL}/auth/signup`,
        LOGIN: `${BASE_URL}/auth/login`,
        GET_PROFILE: `${BASE_URL}/auth/profile`
    },
    RESUME: {
        CREATE: `${BASE_URL}/resume`,
        GET_ALL: `${BASE_URL}/resume`,
        GET_BY_ID: (id) => `${BASE_URL}/resume/${id}`,
        UPDATE: (id) => `${BASE_URL}/resume/${id}`,
        DELETE: (id) => `${BASE_URL}/resume/${id}`,
        UPLOAD_IMAGES: (id) => `${BASE_URL}/resume/${id}/uploadImages`
    },
    image: {
        UPLOAD: `${BASE_URL}/upload-image`
    }
}