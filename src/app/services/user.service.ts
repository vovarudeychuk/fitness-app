import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { NbAuthService } from '@nebular/auth';
import { BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: string = ''
  private isUserProfile: Subject<boolean> = new Subject();

  constructor(private firestore: Firestore, private auth: NbAuthService) {
    this.getAuthUid()     
   }

  getUser(): Observable<User>  {
    this.getAuthUid()
    const userRef = doc(this.firestore, `users/${this.userId}`);
    return docData(userRef, { idField: 'id' }) as Observable<User>;
  }

  getExist () {
      this.getUserProfileExist()
      return this.isUserProfile
  }

  async getUserProfileExist() {
    const docRef = doc(this.firestore, 'users', this.userId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      this.isUserProfile.next(true)
    } else {
      this.isUserProfile.next(false)
    }
  }

  async addUser(user: User) {
    await setDoc(doc(this.firestore, 'users', this.userId), user);
  }

  private getAuthUid() {
    this.auth.onTokenChange().subscribe((token) => {
      if(token.isValid()) {
        this.userId = token.getPayload().user_id
      }
    })
  }

}
