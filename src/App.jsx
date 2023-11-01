import Homepage from "./Components/Homepage";
import Detailpage from "./Components/Detailpage";
import { Routes, Route } from "react-router";
import { useState,useEffect } from "react";
const App = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Add or remove the scroll event listener based on component lifecycle

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/details" element={<Detailpage />} /> */}
      {hasScrolled && <Route path="/details" element={<Detailpage />} />}
      {/* {!hasScrolled && <Route path="*" element={<Navigate to="/" replace />} />} */}
      {/* <Route path="*" element={<Navigate to="/" replace= "true"/>} /> */}
    </Routes>
  );
};

export default App;
