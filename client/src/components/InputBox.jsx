
import "../styles/components.css";
import axios from "axios";
import Button from "./Button";
import { useState } from "react";
import Output from "./Output";

function InputBox() {
  const [webLink, setWebLink] = useState("");
  const [pdf, setPdf] = useState(null);
  const [aiOutput, setAiOutput] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleWebLinkChange = (e) => {
    setWebLink(e.target.value);
  };

  const handlePDFChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async (type) => {
    if(!webLink && !pdf) {
      alert("Please provide either a web link or a PDF file.");
      return;
    }

    if(webLink && pdf) {
        alert("Please provide only one input: either a web link or a PDF file.");
        return;
        }

    try{
      const formData = new FormData();

      if (webLink) {
        formData.append("webLink", webLink);
      }
      
      if (pdf) {
        formData.append("file", pdf);
      }

      const res = await axios.post(
        "https://smart-scribe-wjfa.onrender.com/api/process",
        formData,
        {
          headers: {"Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedText = res.data.data;

      if (!extractedText || extractedText.trim() === "") {
      alert("something went wrong while processing input");
      setLoading(false);
      return;
    }

       if (extractedText === "WEB_ERROR") {
      alert("could not fetch website content");
      return;
}

      if (extractedText === "WEB_EMPTY") {
        alert("website has no extractable content");
        return;
      }

       if (extractedText === "NO_INPUT") {
        alert("no input provided");
        return;
      }

      const trimmedText = extractedText.slice(0, 5000);
      console.log("Extracted text:", trimmedText);
      generateAI(trimmedText, type);


    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

const generateAI = async (text, type) => {
  try {
    setLoading(true);
    setAiOutput(null);

    let prompt = "";

    if (type === "notes") {

    prompt = `
    You are an expert note-maker.

    Convert the following text into:
    1. A short summary
    2. Structured notes with headings and bullet points

    Text:
    ${text}
    `;
    }

    if (type === "mcqs") {

      prompt = `
      You are an expert question maker.

      Convert the following text into 10 multiple-choice questions with 4 options each, and indicate the correct answer.
      Each question should begin with the word Question and then question number.
      Answer: (a/b/c/d)

      Text:
      ${text}
      `;
    }

    const response = await window.puter.ai.chat(prompt);

    console.log("Puter response:", response.message.content);
    setAiOutput(response.message.content);
  } 

  catch (err) {
    console.error("Puter error:", err);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="input-box">
      <p className="divider">word limit: 5000 words</p>
      <input
        type="text"
        placeholder="enter website link (articles/blogs only)"
        className="input"
        value={webLink}
        onChange={handleWebLinkChange}
      />

     <p className="divider">OR</p>

      <input
        type="file"
        accept=".pdf"
        onChange={handlePDFChange}
        className="file-input"
      />

      
      <div className="btn-group">
        <Button text="generate notes" onClick={() => handleSubmit("notes")} 
/>
        <Button text="generate MCQs" onClick={() => handleSubmit("mcqs")} type="secondary" />
      </div>

      <Output aiOutput={aiOutput} loading={loading} />

    </div>
  );
}

export default InputBox;