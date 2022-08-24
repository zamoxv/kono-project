const firebase = require('firebase/app');
const firestore =  require('firebase/firestore');
const{ getAuth, signInWithEmailAndPassword }= require("firebase/auth");

const credentials = require("../serviceAccountKey.json");

const firebaseConfig = {
    apiKey: "AIzaSyBqLBfXL_6B6PJhUC0RJSKKVf82fPsvRa4",
    authDomain: "learn-6ed6d.firebaseapp.com",
    projectId: "learn-6ed6d",
    storageBucket: "learn-6ed6d.appspot.com",
    messagingSenderId: "752515852028",
    appId: "1:752515852028:web:681c6db15205eaa4035979",
    measurementId: "G-RLZKK191R2"
};

// admin.initializeApp({
//   credential: admin.credential.cert(credentials),
//   databaseURL: "https://learn-6ed6d.firebaseio.com"
// });


const app = firebase.initializeApp(firebaseConfig);

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

const login = async (email, password) => {
    try {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, email, password)
        const user = {
            uid: result.user.uid,
            email: result.user.email,
            emailVerified: result.user.emailVerified,
            accessToken: result.user.stsTokenManager.accessToken,
        }
        return {
            success: true,
            user,
            message: 'Exito!'
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: 'Error al autenticar'
        };
    }
};

// const signupWithEmail = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await admin.auth().createUser({
//             email,
//             password,
//             emailVerified: false,
//             disabled: false
//         });
//         const message = 'Success creating user';
//         return res.status(200).json(user);
//     } catch (err) {
//         return res.status(200).json({ errMessage: 'Internal error'});
//     }
// };


module.exports = {
  getParkings,
  login
}
