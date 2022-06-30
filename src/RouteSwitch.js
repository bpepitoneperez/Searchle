import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";
import Layout from "./Layout";
import Contact from "./Contact"
import Leaderboard from "./Leaderboard"

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<App />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;