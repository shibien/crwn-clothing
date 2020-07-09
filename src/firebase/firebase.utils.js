import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCLAux5BSe1y7KnLlne_fDHBp6QLqFkXPk",
    authDomain: "crwn-db-4aa66.firebaseapp.com",
    databaseURL: "https://crwn-db-4aa66.firebaseio.com",
    projectId: "crwn-db-4aa66",
    storageBucket: "crwn-db-4aa66.appspot.com",
    messagingSenderId: "119309960224",
    appId: "1:119309960224:web:b1a7c3faa08f1612e12845",
    measurementId: "G-MB7CQ57LSM"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);   

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;