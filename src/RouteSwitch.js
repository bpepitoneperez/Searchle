import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./Components/App";
import NotFound from "./Components/NotFound";
import Layout from "./Components/Layout";

const RouteSwitch = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<App />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;