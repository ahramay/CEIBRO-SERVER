import axios from 'axios'

// export const SERVER_URL = "https://shielded-plateau-81277.herokuapp.com";
// export const SERVER_URL = 'https://backend.ceibro.ee'

export const SERVER_URL = "http://localhost:3000";

export const baseURL = `${SERVER_URL}/v1`

const API = axios.create({
  baseURL,
})

// API.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response.data.code === 401
//       && !originalRequest._retry
//     ) {
//       try {
//         let res = await refreshAccessToken();
//         if (res.status === 200 || res.status === 201) {
//           localStorage.setItem("idToken", res.data.idToken);
//           localStorage.setItem("refreshToken", res.data.refreshToken);

//           originalRequest.headers[
//             "Authorization"
//           ] = `Bearer ${res.data.idToken}`;
//           return axios(originalRequest);
//         } else {
//           localStorage.clear();

//           return Promise.reject(error);
//         }
//       } catch (error) {
//         return Promise.reject(error);
//       }

//     }
//       localStorage.clear();
//       window.location.href = window.location.href;
//     return Promise.reject(error);
//   }
// );

// const refreshAccessToken = async () => {
//   const refreshToken = localStorage.getItem("auth");
//   const headers = {
//     "Content-Type": "application/form-x-encoded",
//     "Access-Control-Allow-Origin": "*"
//   };
//   const data = {
//     refreshToken
//   };

//   const response = await API.post(
//     `/auth/refresh`,
//     data,
//     headers
//   );
//   return response;
// };

export default API
