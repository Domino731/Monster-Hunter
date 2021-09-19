import { auth, db } from './index'
import { UserData } from '../types';


export const updateUserData = (newData: UserData) => {
    db.collection('users').doc(auth.currentUser.uid).update(newData)
}