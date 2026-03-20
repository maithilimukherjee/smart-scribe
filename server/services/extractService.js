const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (ytLink, file) => {
  try {
    
    if (file) {
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);

      
      fs.unlinkSync(file.path);

      return pdfData.text;
    }

    
    if (ytLink) {
      return "YouTube link processing is not implemented yet.";
    }

    return "No valid input provided.";

  } catch (err) {
    console.error("Error extracting text from PDF:", err);
    throw new Error("Failed to extract text from PDF");
  }
};

module.exports = {
  extractTextFromPDF,
};