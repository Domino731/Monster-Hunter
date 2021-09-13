import { auth, db } from './index'
import { UserData } from '../types';
import { User } from 'firebase';
export const getUserData =  () : UserData => {
    const userId: string = auth.currentUser.uid
    let data : UserData | null = null 
    db.collection("users").where("__name__", "==", userId)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data = doc.data() as UserData
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    return data

}