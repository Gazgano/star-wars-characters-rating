import { Express } from 'express';
import DocumentManager from '../infra/firestore/document-manager';
import FireStore from '../infra/firestore/firestore';
import CharactersLikes from './characters-likes';


export default class Routes {
    private app: Express;
    private fireStore: FireStore;
    private charactersLikes: CharactersLikes;
    
    constructor(app: Express, fireStore: FireStore, documentManager: DocumentManager) {
        this.app = app;
        this.fireStore = fireStore;
        this.charactersLikes = new CharactersLikes(documentManager);
    }

    init() {
        this.app.get('/characters-likes', this.fireStore.callDbService((req, res) => 
            this.charactersLikes.getCollection()
        ));

        // this.app.put('/posts/:id/unlike', this.fireStore.callDbService((req, res) => 
        //     this.dbService.unlikePost('posts', req.params.id, req.user.user_id)
        // ));

        // this.app.delete('/posts/:id', this.fireStore.callDbService((req, res) => 
        //     this.dbService.deletePost(req.params.id, req.user.user_id)
        // ));
    }
}