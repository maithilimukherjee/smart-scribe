const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (ytLink, file) => {
  try {
    // 🟡 handle PDF
    if (file) {
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);

      // 🧹 cleanup uploaded file
      fs.unlinkSync(file.path);

      return pdfData.text;
    }

    // 🟡 handle youtube (placeholder)
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