const Joi = require('joi');
const genres = require('./routes/genres');
const pessoas = require('./routes/pessoas');
const express = require('express');
const app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/pessoas', pessoas);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));