import axios from "./axios";

const defaultImage = {
    _id:"62ce2c5060d9fbfcd8e3a0ef",
    title:"Dreamcast Explosion",
    author:"Pierre Roussel",
    authorUrl:"https://www.etsy.com/shop/Angerinet",
    imgUrl:"/imgs/pierre-roussel-dreamcast-web.jpg",
    characters:["62ce2c4f60d9fbfcd8e3a0e1","62ce2c4f60d9fbfcd8e3a0e2","62ce2c4f60d9fbfcd8e3a0e3","62ce2c4f60d9fbfcd8e3a0e4","62ce2c4f60d9fbfcd8e3a0e0"],
    __v:0
  }

export const getCurrentImage = () => {
    if (process.env.NODE_ENV === 'production')
    {

      // GET request using axios inside useEffect React hook
      axios.get('/images/latest')
      .then(function (response) {
        // handle success
        return response.data
      })
      .catch(function (error) {
        // handle error
        console.log('Get image latest',error);
      })
      .then(function () {
        // always executed
      });
    }
    else
    {
      return defaultImage
    }
}



// useEffect(() => {
  //   if (process.env.NODE_ENV === 'production')
  //   {
  //     // GET request using axios inside useEffect React hook
  //     axios.get('/games/latest')
  //     .then(function (response) {
  //       // handle success
  //       setCurrentGame(response.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log('Get game latest',error);
  //     })
  //     .then(function () {
  //       // always executed
  //     });

  //     // GET request using axios inside useEffect React hook
  //     axios.get('/images/latest')
  //     .then(function (response) {
  //       // handle success
  //       setImage(response.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log('Get image latest',error);
  //     })
  //     .then(function () {
  //       // always executed
  //     });

  //     axios.get('/characters/latest')
  //     .then(function (response) {
  //       // handle success
  //       setCharacter(response.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log('Get character latest',error);
  //     })
  //     .then(function () {
  //       // always executed
  //     });
  //   }
  //   else
  //   {
  //     setDefaultImage();
  //   }
    
  // // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }, [])

  // const setDefaultImage = () => {
  //   setImage(
  //     {
  //       _id:"62ce2c5060d9fbfcd8e3a0ef",
  //       title:"Dreamcast Explosion",
  //       author:"Pierre Roussel",
  //       authorUrl:"https://www.etsy.com/shop/Angerinet",
  //       imgUrl:"/imgs/pierre-roussel-dreamcast-web.jpg",
  //       characters:["62ce2c4f60d9fbfcd8e3a0e1","62ce2c4f60d9fbfcd8e3a0e2","62ce2c4f60d9fbfcd8e3a0e3","62ce2c4f60d9fbfcd8e3a0e4","62ce2c4f60d9fbfcd8e3a0e0"],
  //       __v:0
  //     }
  //     );
    
  //     setCharacter(
  //     {
  //       _id:"62ce2c4f60d9fbfcd8e3a0e0",
  //         name:"Mew",
  //         source:"Jet Set Radio",
  //         xPos:66,
  //         yPos:73,
  //         charUrl:"/chars/mew-jsr.png",
  //         __v:0
  //     }
  //     );
  // }