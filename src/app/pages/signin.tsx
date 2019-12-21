import { NextPage } from 'next';
import { auth } from '../firebase/firebase';

const Signin: NextPage<{ userAgent: string }> = () => {

  console.log(auth.currentUser);

  return (
    <div>
      <h1>Welcome to My Awesome App</h1>
      {/* <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div> */}
    </div>
  )

}


export default Signin;