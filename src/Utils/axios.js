import axios from "axios";

let instance = {}

// Set config defaults when creating the instance
if (process.env.NODE_ENV === 'production')
{
    console.log('prod')
    instance = axios.create({
        baseURL: "https://searchle-api.herokuapp.com/api"
    });
}
else
{
    console.log('dev')
    instance = axios.create({
        baseURL: "http://localhost:3001/api"
    });
}

export default instance;