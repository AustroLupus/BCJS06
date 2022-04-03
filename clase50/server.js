const express = require('express');
const axios = require('axios');


const app = express();
app.use(express.static('public'))


app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});