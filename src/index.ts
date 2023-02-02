import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose'
import { routes } from './routes'
import bodyParser from 'body-parser';
import config from "./config/config";
import passport from 'passport'
import passportMiddleware from './middlewares/passport';

const requireDir = require('require-dir')
// const multer = require('multer')
// const upload = multer()
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
app.use(express.urlencoded({ limit: '50000mb', extended: false }));
app.use(routes)
requireDir('./models')
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
