import { auth, db } from './index'
import { UserData } from '../types';


export const updateUserData = (newData: UserData) => {
    console.log('successful')
    db.collection('users').doc(auth.currentUser.uid).update(newData)
}