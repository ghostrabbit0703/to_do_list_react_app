export const API_ENDPOINTS ={
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  CATEGORIES: {
    GET_ALL: '/categories',
    GET_BY_ID: (id) => `/categories/${id}`,
    CREATE: '/categories',
    UPDATE: (id) => `/categories/${id}`,
    DELETE: (id) => `/categories/${id}`,
  },

  TAGS: {
    GET_ALL: '/tags',
    GET_BY_ID: (id) => `/tags/${id}`,
    CREATE: '/tags',
    UPDATE: (id) => `/tags/${id}`,
    DELETE: (id) => `/tags/${id}`,
  },

  TASKS:{
    GET_ALL: '/tasks',
    GET_BY_ID: (id) => `/tasks/${id}`,
    CREATE: '/tasks',
    UPDATE: (id) => `/tasks/${id}`,
    DELETE: (id) => `/tasks/${id}`, 
  }
}
export default API_ENDPOINTS;