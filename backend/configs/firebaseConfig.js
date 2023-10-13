import {initializeApp, cert} from 'firebase-admin/app';
import {getStorage} from 'firebase-admin/storage';

import firebaseKey from './keys/firebaseKey.json' assert { type: "json" };

const config = initializeApp({
  credential: cert(firebaseKey),
  storageBucket: 'gs://mall-sage-spm.appspot.com',
});

const FirebaseStorage = getStorage(config).bucket();

export default FirebaseStorage;