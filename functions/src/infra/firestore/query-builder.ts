import { DocumentData, QuerySnapshot, Query, Firestore } from '@google-cloud/firestore';
import DocumentAdapter from './document-adapter';

export default class QueryBuilder {

    db: Firestore;
    documentHandler: DocumentAdapter;
    
    constructor(db: Firestore, documentHandler: DocumentAdapter) {
        this.db = db;
        this.documentHandler = documentHandler;
    }
    
    buildQuery(collectionPath: string, conditions: {[key: string]: string} = {}, limit = 10): Query {
        let query = this.db.collection(collectionPath).offset(0);
        
        for(let key in conditions) {
            query = query.where(key, '==', conditions[key]);
        }
        
        return query.limit(limit);
    }
    
    async formatQuerySnapshot(querySnapshot: QuerySnapshot): Promise<DocumentData[]> {
        if(!querySnapshot.empty) {
            return Promise.all(
            querySnapshot.docs.map(doc => this.documentHandler.formatDocumentData(doc))
            ).then(docDatas => docDatas);
        } else {
            return Promise.resolve([]);
        }
    }
}