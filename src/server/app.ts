import path from 'path';
import express from 'express';

const app = express();
const port = process.env.PORT ?? 3000;

app.use('/static', express.static(path.resolve(process.cwd(), 'static')));

app.use(express.static(path.resolve(__dirname), { extensions: ['css', 'js'] }));

app.get('/:page', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
