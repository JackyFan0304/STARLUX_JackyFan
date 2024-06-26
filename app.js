const express = require('express');
const app = express();
const port = 3000;
const router = require("./router");
const sequelize = require('./config/database');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is app.js!');
});

app.use("/api", router);

(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();