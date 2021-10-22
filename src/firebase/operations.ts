import { auth, db } from './index'
import { UserData } from '../types';

/**
 * update user's data in firestore
 * @param newData - new user data that you want to update
 */
export const updateUserData = (newData: UserData) => db.collection('users')
   .doc(auth.currentUser.uid)
   .update(newData)
   .catch((err: any) => {
      console.log(err);
   });
