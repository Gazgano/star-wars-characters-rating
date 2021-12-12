import { DocumentData, DocumentSnapshot, QuerySnapshot, Firestore } from '@google-cloud/firestore';
import DbServiceError from '../../helpers/error-helper';
import DocumentAdapter from './document-adapter';
import QueryBuilder from './query-builder';

export default class DocumentManager {

    private db: Firestore;
    private documentHandler: DocumentAdapter;
    private queryBuilder: QueryBuilder;

    constructor(db: Firestore, documentHandler: DocumentAdapter) {
        this.db = db;
        this.documentHandler = documentHandler;
        this.queryBuilder = new QueryBuilder(db, documentHandler);
    }
    
    async getCollection(collectionPath: string, conditions?: {[key: string]: string}): Promise<DocumentData[]> {
        return this.queryBuilder.buildQuery(collectionPath, conditions).get()
        .then((qs: QuerySnapshot) => this.queryBuilder.formatQuerySnapshot(qs))
        .catch(err => { throw DbServiceError.createError(err) })
    }
    
    async getDocument(collection: string, id: string): Promise<DocumentData> {
        return this.db.doc(`${collection}/${id}`).get()
        .then((ds: DocumentSnapshot) => this.documentHandler.formatDocumentData(ds))
        .catch(err => { throw DbServiceError.createError(err) })
    }
}