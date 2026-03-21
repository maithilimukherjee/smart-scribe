const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const cheerio = require("cheerio");

const extractTextFromPDF = async (webLink, file) => {
  try {
    // 📄 PDF
    if (file) {
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);

      fs.unlinkSync(file.path);
      return pdfData.text;
    }

  if (webLink) {
  try {
    const axios = require("axios");
    const cheerio = require("cheerio");

    const response = await axios.get(webLink, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const $ = cheerio.load(response.data);

    $("script, style, noscript").remove();

    const text = $("p")
      .map((i, el) => $(el).text())
      .get()
      .join(" ");

    if (!text || text.trim().length === 0) {
      return "WEB_EMPTY";
    }

    return text.slice(0, 5000);

  } catch (err) {
    console.error("Web scraping error:", err);
    return "WEB_ERROR";
  }
}

    return "NO_INPUT";

  } catch (err) {
    console.error("Error extracting text:", err);
    throw new Error("Failed to extract text");
  }
};

module.exports = {
  extractTextFromPDF,
};