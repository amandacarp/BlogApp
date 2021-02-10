import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as path from 'path'
import * as passport from 'passport'
import routes from './routes';
import './middlewares/passport-strategies'; //this file will run after server runs and compiles

const app = express();

//middlewares
app.use(helmet()); //security responses 
app.use(compression()); //speed up response time
app.use(express.json()); //parses json
app.use(express.static('public')); //put before morgan so logs don't clog up 
app.use(passport.initialize()); //tells express passport is a middleware we can use
app.use(morgan('dev')); //provide info for every request
app.use(routes);

app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
//our code runs from dist/server.js so this gets added as our code is a single page application
//request tells the server if a route doesn't start with /api, ignore it
//allows react-router to do it's job

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
//this says if there is an environment variable provided then use that, if not default to host 3000
//we can run localhost:3000 on our comps but when we deploy elsewhere, we can provide a port by that server 
//because it is likely another server already has port 3000 running something else