const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bcrypt = require('bcrypt');
const router = require("./router")

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is app.js!');
});

app.use("/router", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 