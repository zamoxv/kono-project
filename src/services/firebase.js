const firebase = require('firebase/app');
const firestore =  require('firebase/firestore');
const{ getAuth, signInWithEmailAndPassword }= require("firebase/auth");

const credentials = require("../serviceAccountKey.json");
const { addDoc, updateDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBqLBfXL_6B6PJhUC0RJSKKVf82fPsvRa4",
    authDomain: "learn-6ed6d.firebaseapp.com",
    projectId: "learn-6ed6d",
    storageBucket: "learn-6ed6d.appspot.com",
    messagingSenderId: "752515852028",
    appId: "1:752515852028:web:681c6db15205eaa4035979",
    measurementId: "G-RLZKK191R2"
};

const app = firebase.initializeApp(firebaseConfig);

const db = firestore.getFirestore(app);

const getCities = async (db) => {
  const citiesCol =firestore.collection(db, 'Prueba');
  const citySnapshot = await firestore.getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
};

const showData = async () => {
    const data = await getCities(db);
    console.log(data);
    return data;
};

const getParkings = async () => {
  const parkings = firestore.collection(db, 'Parkings');
  const parkingsSnapshot = await firestore.getDocs(parkings);
  const parkingsList = parkingsSnapshot.docs.map(doc => {
    const d = {...doc.data(), id: doc.id};
    return d;
  });
  return parkingsList;
};

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

const reserveParking = async (parking) => {
    try {
        const id = parking.id
        delete parking.id
        parking.busy = true;
        const parkingRef = await firestore.doc(db, 'Parkings', id);
        const result = await updateDoc(parkingRef, parking);
        console.log(result);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
};

const deleteParking = async (id) => {
    try {
        const parkingRef = await firestore.doc(db, 'Parkings', id);
        const result = await updateDoc(parkingRef, {
            user: '',
            busy: false,
            hours: 0,
            appartment: '',
            license_plate: '',
            rut: '',
            photo: '',
            start: '',
            end: '',
        });
        console.log(result);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
};

const createParkings = async () => {
    const parkings = firestore.collection(db, 'Parkings');
    for (let i = 1; i <= 12; i += 1) {
        await addDoc(parkings, {
            number: i,
            busy: false,
            user: null,
            start: null,
            end: null,
            appartment: '',
            license_plate: '',
            rut: '',
            photo: '',
           });
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
  login,
  reserveParking,
  createParkings,
  deleteParking,
};
