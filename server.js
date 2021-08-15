const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send({ name: "hello world!" });
});

app.get("/members", (req, res) => {
  res.send([
    { name: "Eddie Jaoude", github: "eddiejaoude" },
    { name: "Sara Jaoude", github: "sarajaoude" },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
