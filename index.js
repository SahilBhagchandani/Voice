const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/text-to-speech', (req, res) => {
  const { text, voice } = req.body;

  if (!text || !voice) {
    return res.status(400).json({ error: 'Both text and voice parameters are required.' });
  }

  res.status(200).json({ message: 'Speech initiated.' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
