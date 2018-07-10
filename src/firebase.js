import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyD5HO2c4wzYgAU7rUCiXUqc9cWubIhuZo4",
    authDomain: "nba-app-22676.firebaseapp.com",
    databaseURL: "https://nba-app-22676.firebaseio.com",
    projectId: "nba-app-22676",
    storageBucket: "nba-app-22676.appspot.com",
    messagingSenderId: "135128998903"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });

    return data;
};

export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper
}
