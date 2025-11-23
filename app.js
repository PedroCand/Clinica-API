const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const clinicsRouter = require('./routes/clinics');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/clinics', clinicsRouter);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'API Clinica rodando', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
