const { extractTextFromPDF } = require("../services/extractService");

const processInput = async (req, res) => {
  try {
    const { ytLink } = req.body;
    const file = req.file;

    const text = await extractTextFromPDF(ytLink, file);

    res.json({
      success: true,
      data: text,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "error processing input",
    });
  }
};

module.exports = { processInput };