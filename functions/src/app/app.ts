import * as express from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');

// import FireStore from '../infra/firestore/firestore';
import { environment } from '../../../src/environments/environment';
import Routes from './routes';

export default class App {
    public app = express();
    // private fireStore = new FireStore();
    private routes = new Routes(/*this.app, this.fireStore*/);

    constructor() {
        this.configure();
        this.routes.init();
    }

    private configure() {
        this.app.use(cors({
          origin: environment.production? 
            ['https://star-wars-characters-rating.web.app', 'star-wars-characters-rating.firebaseapp.com']:
            ['http://localhost:4200']
        }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // this.app.use(this.dbService.validateFirebaseIdToken);
      }
}