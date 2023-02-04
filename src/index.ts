import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose'
import { routes } from './routes'
import bodyParser from 'body-parser';
import config from "./config/config";
import passport from 'passport'
import passportMiddleware from './middlewares/passport';
import multer from 'multer';


const requireDir = require('require-dir')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

const app: Express = express();
const port = config.port;
const dbConnection = config.DB.URI;

app.get('/', (req: Request, res: Response) => {
  res.send('EPSI API');
});

mongoose.connect(dbConnection, (err) => {
  if (err) {
    console.log("Error while connecting to DB", err);
  } else {
    console.log("Connected to DB", dbConnection);
  }
});
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});
app.use(upload.single('photo'))
app.use(routes)
requireDir('./models')
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
