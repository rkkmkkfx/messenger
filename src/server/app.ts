import { existsSync } from 'fs';
import path from 'path';
import express from 'express';

const app = express();
const port = 3000;

app.use('/static', express.static(path.resolve(process.cwd(), 'static')));

app.use(express.static(path.resolve(__dirname), { extensions: ['css', 'js'] }));

app.get('/:page', (req, res) => {
  if (existsSync(path.resolve(process.cwd(), 'src', 'pages', req.params.page, 'index.ts'))) {
    res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
  } else {
    res.status(404).sendFile(path.resolve(__dirname, 'index.html'));
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
