import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Password generator API is running!");
});

app.post("/generate", (req, res) => {
  const { count = 100, minLen = 8, maxLen = 12 } = req.body;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const passwords = [];

  for (let i = 0; i < count; i++) {
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    let pw = "";
    for (let j = 0; j < len; j++) {
      pw += charset[crypto.randomInt(0, charset.length)];
    }
    passwords.push(pw);
  }

  res.json({ passwords });
});

app.listen(10000, () => console.log("Server running on port 10000"));
