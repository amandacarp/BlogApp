import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as path from 'path'
import * as passport from 'passport'
import routes from './routes';
import './middlewares/passport-strategies';

const app = express();

//middlewares
app.use(express.json()); //parses json
app.use(express.static('public')); //put before morgan so logs don't clog up 
app.use(passport.initialize()); //tells express passport is a middleware we can use
app.use(morgan('dev')); //provide info for every request
app.use(helmet()); //security responses 
app.use(compression()); //speed up response time
app.use(routes);

app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));