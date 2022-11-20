import axios from "axios";


const apiURLs:any = {
  development: "http://localhost:8080",
  production: "",
};

const api:any = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });


api.interceptors.request.use((config:any) => {
  const loggedInUserJSON = localStorage.getItem("loggedInUser"); 
  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""'); 


  if (parseLoggedInUser.token) {
    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }

  return config;
});

export { api };