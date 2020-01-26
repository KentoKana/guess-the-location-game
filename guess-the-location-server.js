"use strict";
// ---- Import Modules ---- //
const express = require("express");
const path = require("path");
const app = express();

// ----Paths---- //
const paths = {
  reactBuild: path.join(__dirname, "./build")
};

// ---- Serve React Production Build Static Files ---- //
app.use(express.static(paths.reactBuild));

// ---- Serve index.html on any url (for SPA) ---- //
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

// ---- Serve On Port ---- //
const port = 5001;
app.listen(process.env.PORT || port);
console.log(`Listening on port ${port}`);
