import fb from 'firebase/app';
import { firebaseConfig } from './firebase.creds';

export const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app();
