import "../styles/inputBox.css";
import "../styles/components.css";
import axios from "axios";
import Button from "./Button";
import { useState } from "react";
import Output from "./Output";

function InputBox() {
  const [ytLink, setYtLink] = useState("");
  const [pdf, setPdf] = useState(null);
  const [aiOutput, setAiOutput] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleYtLinkChange = (e) => {
    setYtLink(e.target.value);
  };

  const handlePDFChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async () => {

    if(!ytLink && !pdf) {
      alert("Please provide either a YouTube link or a PDF file.");
      return;
    }

    if(ytLink && pdf) {
        alert("Please provide only one input: either a YouTube link or a PDF file.");
        return;
        }

    try{
      const formData = new FormData();

      if (ytLink) {
        formData.append("ytLink", ytLink);
      }
      
      if (pdf) {
        formData.append("file", pdf);
      }

      const res = await axios.post(
        "http://localhost:5000/api/process",
        formData,
        {
          headers: {"Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedText = res.data.data.slice(0, 5000);

      console.log("extracted text: ", extractedText);
      generateNotes(extractedText);


    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

const generateNotes = async (text) => {
  try {
    setLoading(true);
    setAiOutput(null);

    const prompt = `
    You are an expert note-maker.

    Convert the following text into:
    1. A short summary
    2. Structured notes with headings and bullet points

    Text:
    ${text}
    `;

    const response = await window.puter.ai.chat(prompt);

    console.log("Puter response:", response.message.content);
    setAiOutput(response.message.content);
  } catch (err) {
    console.error("Puter error:", err);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="enter youtube link"
        className="input"
        value={ytLink}
        onChange={handleYtLinkChange}
      />

     <p className="divider">OR</p>

      <input
        type="file"
        accept=".pdf"
        onChange={handlePDFChange}
        className="file-input"
      />

      <p className="divider">word limit: 5000 words</p>
      <div className="btn-group">
        <Button text="generate notes" onClick={handleSubmit} />
        <Button text="generate MCQs" onClick={handleSubmit} type="secondary" />
      </div>

      <Output aiOutput={aiOutput} loading={loading} />

    </div>
  );
}

export default InputBox;