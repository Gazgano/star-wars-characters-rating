const functions = require('firebase-functions');
const admin = require('firebase-admin');
import { Request, Response } from 'express';
import DbServiceError from '../../helpers/error-helper';
import DocumentAdapter from './document-adapter';
import DocumentManager from './document-manager';

export default class FireStore {
    documentManager: DocumentManager;

    constructor() {
        admin.initializeApp(functions.config().firebase);
        const db = admin.firestore();
        const documentAdapter = new DocumentAdapter();
        this.documentManager = new DocumentManager(db, documentAdapter);
    }

    callDbService(action: (req: Request, res: Response) => Promise<any>): (req: Request, res: Response) => void {
        return (req, res) => {
            action(req, res)
            .then(data => res.status(data.code).json(data.data))
            .catch((err: DbServiceError) => res.status(err.code).send(err.message));
        }
      }

    // async validateFirebaseIdToken(req: Request, res: Response, next: NextFunction) {
    //     if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
    //         !(req.cookies && req.cookies.__session)) {
    //       console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
    //           'Make sure you authorize your request by providing the following HTTP header:',
    //           'Authorization: Bearer <Firebase ID Token>',
    //           'or by passing a "__session" cookie.');
    //       res.status(403).send('Unauthorized');
    //       return;
    //     }
      
    //     let idToken;
    //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    //       // Read the ID Token from the Authorization header.
    //       idToken = req.headers.authorization.split('Bearer ')[1];
    //     } else if(req.cookies) {
    //       // Read the ID Token from cookie.
    //       idToken = req.cookies.__session;
    //     } else {
    //       // No cookie
    //       res.status(403).send('Unauthorized');
    //       return;
    //     }
      
    //     try {
    //       const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    //       req.user = decodedIdToken;
    //       next();
    //       return;
    //     } catch (error) {
    //       console.error('Error while verifying Firebase ID token:', error);
    //       res.status(403).send('Unauthorized');
    //       return;
    //     }
    //   };
}