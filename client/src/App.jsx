import "./styles/layout.css";
import { useEffect } from "react";
import InputBox from "./components/InputBox";
import axios from "axios";

function App() {

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(res=> console.log(res.data))
      .catch(err => console.error("Error connecting to backend:", err));
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">SmartScribe</h1>
        <p className="subtitle">AI-powered Note-Maker</p>
        <InputBox />
      </div>
    </div>
  );
}

export default App;