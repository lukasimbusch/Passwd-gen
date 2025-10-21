// Import dependencies
import express from "express";
import cors from "cors";

const app = express();

// Allow JSON parsing
app.use(express.json());

// Enable CORS so your frontend can talk to this server
app.use(cors()); // for testing, allows all origins

// Root route (for testing server status)
app.get("/", (req, res) => {
  res.send("Password Generator Server is alive!");
});

// Password generation route
app.post("/generate", (req, res) => {
  const { count, minLen, maxLen } = req.body;

  if (!count || !minLen || !maxLen) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const passwords = [];
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  for (let i = 0; i < count; i++) {
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    let pass = "";
    for (let j = 0; j < len; j++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwords.push(pass);
  }

  res.json({ passwords });
});

// Listen on Render-assigned port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
