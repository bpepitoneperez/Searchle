import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./Components/App";
import NotFound from "./Components/NotFound";
import Layout from "./Components/Layout";

const RouteSwitch = () => {
  return (
    <HashRouter >
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<App />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;