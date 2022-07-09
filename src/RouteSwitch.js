import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./Components/App";
import NotFound from "./Components/NotFound";
import Layout from "./Components/Layout";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh1ZF8xmncKPwXKLr7PYiSFzCw1E_uj_8",
  authDomain: "susasearch.firebaseapp.com",
  projectId: "susasearch",
  storageBucket: "susasearch.appspot.com",
  messagingSenderId: "365548367524",
  appId: "1:365548367524:web:30260bf42b508050070031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

const RouteSwitch = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<App />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;