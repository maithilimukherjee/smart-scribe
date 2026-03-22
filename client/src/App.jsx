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
        <h1 className="title">smart-scribe</h1>
        <p className="subtitle">transform pdfs and web content into concise summaries and structured notes.</p>
        <p className="subtitle">generate mcqs instantly for smarter revision.</p>
        <InputBox />
      </div>
    </div>
  );
}

export default App;