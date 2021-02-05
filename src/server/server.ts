import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';
import router from './routes';
import * as path from 'path'

const app = express();

app.use(express.json());
app.use(express.static('public')); //put before morgan so logs don't clog up 
app.use(morgan('dev')); //provide info for every request
app.use(helmet()); //security responses 
app.use(compression()); //speed up response time
app.use(router);
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));