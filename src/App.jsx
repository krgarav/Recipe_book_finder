import Homepage from "./Components/Homepage";
import Detailpage from "./Components/Detailpage";
import { Routes, Route } from "react-router";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/details" element={<Detailpage />} />
      {/* <Route path="*" element={<Navigate to="/" replace= "true"/>} /> */}
    </Routes>
  );
};

export default App;
