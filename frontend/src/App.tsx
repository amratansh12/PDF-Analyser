import { useEffect } from "react";
import InputBar from "./components/input-bar";
import Navbar from "./components/navbar";
import Result from "./components/result";

const App = () => {
  useEffect(() => {
    if (
      localStorage.getItem("document") &&
      localStorage.getItem("document") !== null
    ) {
      localStorage.removeItem("document");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Result />
      <InputBar />
    </div>
  );
};

export default App;
