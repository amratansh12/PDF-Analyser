require("dotenv/config");
const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");

const { Document, VectorStoreIndex } = require("llamaindex");
const formidable = require("formidable");
const pdf = require("pdf-parse");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.post("/fileUpload", (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const path = files.file[0].filepath;
    const buffer = await fs.readFile(path);
    const data = await pdf(buffer);

    res.status(201).json({ document: JSON.stringify(data) });
  });
});

app.post("/query", async (req, res) => {
  const { query, document } = req.body;

  if (!document) {
    return res.status(401).json({ error: "Kindly upload a valid pdf" });
  }

  if (!query) {
    return res.status(401).json({ error: "Enter a valid query" });
  }

  const data = JSON.parse(document);
  const queryDocument = new Document({ text: data.text });

  const index = await VectorStoreIndex.fromDocuments([queryDocument]);

  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query({ query });

  res.status(201).json({ answer: response.toString() });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
