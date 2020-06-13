import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import * as compression from 'compression';

dotenv.config();

const app = express();

const resolve = (location: string) => path.resolve(__dirname, '../', location);

const file = (location: string) => async (req: express.Request, res: express.Response) => {
  res.sendFile(resolve(location));
}

app.use(compression());

app.use(express.static(resolve('public'), { maxAge: Number.MAX_VALUE }))
app.use(express.static(resolve('dist'), { maxAge: Number.MAX_VALUE }))

app.get('/', file('./dist/views/home.html'));
app.get('/about', file('./dist/views/about.html'));
app.get('/downloads', file('./dist/views/downloads.html'));

app.listen(process.env.PORT);
