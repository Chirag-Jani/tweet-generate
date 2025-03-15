const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-tweet", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await model.generateContent(prompt);
    const data = response.response.text();
    console.log("Response: ", data);

    res.json({
      tweet: data,
    });
  } catch (error) {
    console.error("Error generating tweet:", error);
    res.status(500).json({ error: "Failed to generate tweet" });
  }
});

app.listen(5001, () => console.log("Server running on port 5000"));
