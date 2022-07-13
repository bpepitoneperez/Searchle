import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: "http://localhost:3001/api"
//   baseURL: "https://searchle.herokuapp.com/api",
});

export default instance;