import { Home } from '../components/home-page/Home';
import './app.scss';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD17dp_uneNLE5fPcYR6w2b-e2_fCTYcIo',
  authDomain: 'website-b1e61.firebaseapp.com',
  projectId: 'website-b1e61',
  storageBucket: 'website-b1e61.appspot.com',
  messagingSenderId: '801623926680',
  appId: '1:801623926680:web:b9bce06ba4caecd5186ded',
  measurementId: 'G-LLWGGT0Z4W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

logEvent(analytics, 'master_view');

function App() {
  return <Home />;
}

export default App;
