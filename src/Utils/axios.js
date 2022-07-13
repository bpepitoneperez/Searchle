import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: "https://searchle-api.herokuapp.com/api"
});

export default instance;