import axios from "./axios";

const defaultCharacter = {
    _id:"62ce2c4f60d9fbfcd8e3a0e0",
      name:"Mew",
      source:"Jet Set Radio",
      xPos:66,
      yPos:73,
      charUrl:"/chars/mew-jsr.png",
      __v:0
  }

export const getCurrentCharacter = () => {
    if (process.env.NODE_ENV === 'production')
    {
      axios.get('/characters/latest')
      .then(function (response) {
        // handle success
        return response.data;
      })
      .catch(function (error) {
        // handle error
        console.log('Get character latest',error);
      })
      .then(function () {
        // always executed
      });
    }
    else
    {
      return defaultCharacter;
    }
}