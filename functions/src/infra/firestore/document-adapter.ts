import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from '@google-cloud/firestore';
import { timestampsToISO } from '../../helpers/date-helper';

export default class DocumentAdapter {

    constructor() {}

    formatDocumentSnapshot(docSnapshot: DocumentSnapshot): Promise<DocumentData> {
        if(docSnapshot.exists) {
          return this.formatDocumentData(docSnapshot)
        } else {
          return Promise.resolve(({ id: docSnapshot.id }));
        }
      };
    
    async formatDocumentData(doc: DocumentSnapshot | QueryDocumentSnapshot): Promise<DocumentData> {
        let docData = this.convertDocDataTimestamp(doc.data());
        docData.id = doc.id;
        return docData;
    }

    private convertDocDataTimestamp(docData: DocumentData | undefined): DocumentData {
        const result = {...docData};
        for(let key in result) {
          if (result[key] instanceof Timestamp) {
            result[key] = timestampsToISO(result[key]);
          }
        }
        return result;
      }
}