import { NextPage } from 'next';
import { handleLogin } from '../firebase/firebase';

const Signin: NextPage<{ userAgent: string }> = () => {

  return (
    <div>
      <h1>Welcome to My Awesome App</h1>
      <button onClick={handleLogin}>Sign In</button>
      {/* <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div> */}
    </div>
  )

}


export default Signin;