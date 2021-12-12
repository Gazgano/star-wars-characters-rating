import DocumentManager from "../infra/firestore/document-manager"

export default class CharactersLikes {

    private documentManager: DocumentManager;
    
    constructor(documentManager: DocumentManager) {
        this.documentManager = documentManager;
    }

    getCollection() {
        return this.documentManager.getCollection('characters-likes');
    }
}