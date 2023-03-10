const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
});