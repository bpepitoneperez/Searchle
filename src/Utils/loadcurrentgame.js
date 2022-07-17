import axios from "./axios";

const defaultGame = 1

export const getCurrentGame = () => {
    if (process.env.NODE_ENV === 'production')
    {
      // GET request using axios inside useEffect React hook
      axios.get('/games/latest')
      .then(function (response) {
        // handle success
        return response.data;
      })
      .catch(function (error) {
        // handle error
        console.log('Get game latest',error);
      })
      .then(function () {
        // always executed
      });
    }
    else
    {
      return defaultGame;
    }
}