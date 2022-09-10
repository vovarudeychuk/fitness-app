import { Injectable } from '@angular/core';
import { doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { NbAuthService } from '@nebular/auth';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserProfile: Subject<boolean> = new Subject();

  constructor(private firestore: Firestore, private auth: NbAuthService) {
   }

  getUser(): Observable<User>  {
    const userRef = doc(this.firestore, `users/${this.getAuthUid()}`);
    return docData(userRef, { idField: 'id' }) as Observable<User>;
  }

  async addUser(user: User) {
    await setDoc(doc(this.firestore, 'users', this.getAuthUid()), user);
  }

  getExist () {
      this.getUserProfileExist()
      return this.isUserProfile
  }

  private async getUserProfileExist() {
    let result: boolean;
    const docRef = doc(this.firestore, 'users', this.getAuthUid());
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      this.isUserProfile.next(true)
      result = true
    } else {
      this.isUserProfile.next(false)
      result = false
    }
  }


  private getAuthUid(): string {
    let uId: string = ''
    this.auth.onTokenChange().subscribe((token) => {
      if(token.isValid()) {
        uId = token.getPayload().user_id
      }
      
    })
    return uId
  }

}
