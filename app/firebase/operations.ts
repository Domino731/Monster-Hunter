import { auth, db } from './index'
import { UserData, SearchedUserData, FriendData } from '../types';
import { Friends } from '../views/friends';


export const updateUserData = (newData: UserData) => db.collection('users').doc(auth.currentUser.uid).update(newData)
 