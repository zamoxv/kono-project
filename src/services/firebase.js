const initializeApp = require('firebase/app');
const firestore =  require('firebase/firestore');
const admin = require("firebase-admin");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyBqLBfXL_6B6PJhUC0RJSKKVf82fPsvRa4",
    authDomain: "learn-6ed6d.firebaseapp.com",
    projectId: "learn-6ed6d",
    storageBucket: "learn-6ed6d.appspot.com",
    messagingSenderId: "752515852028",
    appId: "1:752515852028:web:681c6db15205eaa4035979",
    measurementId: "G-RLZKK191R2"
};

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://learn-6ed6d.firebaseio.com"
});


const app = initializeApp.initializeApp(firebaseConfig);

const db = firestore.getFirestore(app);

const getCities = async (db) => {
  const citiesCol =firestore.collection(db, 'Prueba');
  const citySnapshot = await firestore.getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

const showData = async () => {
    const data = await getCities(db);
    console.log(data);
    return data;
};

const getParkings = async () => {
  const parkings = firestore.collection(db, 'Parkings');
  const parkingsSnapshot = await firestore.getDocs(parkings);
  const parkingsList = parkingsSnapshot.docs.map(doc => doc.data());
  return parkingsList;
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, email, password)
        const user = {
            uid: result.user.uid,
            email: result.user.email,
            emailVerified: result.user.emailVerified,
            accessToken: result.user.stsTokenManager.accessToken,
        }
        const message = 'Success';
        return responseGenerator(res, OK.status, message, user);
    } catch (err) {
        return responseGenerator(res, INTERNAL_SERVER_ERROR.status, err.message);
    }
};

const signupWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await admin.auth().createUser({
            email,
            password,
            emailVerified: false,
            disabled: false
        });
        const message = 'Success creating user';
        return responseGenerator(res, OK.status, message, user);
    } catch (err) {
        return responseGenerator(res, INTERNAL_SERVER_ERROR.status, err.message);
    }
};


module.exports = {
  getParkings,
}
