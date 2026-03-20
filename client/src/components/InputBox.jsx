import "../styles/inputBox.css";
import "../styles/components.css";
import Button from "./Button";
import { useState } from "react";

function InputBox() {
  const [ytLink, setYtLink] = useState("");
  const [pdf, setPdf] = useState(null);

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

      console.log("Response from server:", res.data);


    } catch (error) {
      console.error("Error submitting form:", error);
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

      <div className="btn-group">
        <Button text="generate notes" onClick={handleSubmit} />
        <Button text="generate MCQs" onClick={handleSubmit} type="secondary" />
      </div>
    </div>
  );
}

export default InputBox;