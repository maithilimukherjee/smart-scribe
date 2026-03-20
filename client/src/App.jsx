import "./styles/layout.css";
import InputBox from "./components/InputBox";

function App() {
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