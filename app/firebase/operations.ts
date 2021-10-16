import { auth, db } from './index'
import { UserData } from '../types';

// update user's data in firestore
export const updateUserData = (newData: UserData) => db.collection('users')
   .doc(auth.currentUser.uid)
   .update(newData)
   .then(() => {
      console.log('The data in firestore was updated successfully');
   })
   .catch((err) => {
      console.log(err);
   })
