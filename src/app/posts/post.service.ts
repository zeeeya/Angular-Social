import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Post } from './post-model';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

interface NewPost {
  content: string;
  hearts: 0;
  time: number;
}

@Injectable()
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>;
  postDocument:   AngularFirestoreDocument<Node>;

  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('posts', (ref) => ref.orderBy('time', 'desc').limit(5));
  }

  getData(): Observable<Post[]> {
    return this.postsCollection.valueChanges();
  }

  getSnapshot(): Observable<Post[]> {
    // ['added', 'modified', 'removed']
    return this.postsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Post;
        return { id: a.payload.doc.id, content: data.content, hearts: data.hearts, time: data.time };
      });
    });
  }

  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`);
  }

  create(content: string) {
    const post = {
      content,
      hearts: 0,
      time: new Date().getTime(),
    };
    return this.postsCollection.add(post);
  }

  updatePost(id: string, data: Partial<Post>) {
    return this.getPost(id).update(data);
  }

  deletePost(id: string) {
    return this.getPost(id).delete();
  }
}
