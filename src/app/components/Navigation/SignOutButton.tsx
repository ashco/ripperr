// import React, { useContext } from 'react';
import * as React from 'react';
import { FirebaseContext } from '../Firebase';

class SignOutButton extends React.Component {
  handleSignOut() {
    console.log('Lets hope this works!');
    return true;
  }

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => (
          <button type="button" onClick={firebase.doSignOut}>
            Sign Out
          </button>
        )}
      </FirebaseContext.Consumer>
    );
  }
}

export default SignOutButton;
// const SignOutButton = () => {
//   const firebase = useContext(FirebaseContext);

//   function handleSignOut() {
//     console.log('Lets hope this works!');
//     return true;
//   }

//   return (
//     <button type="button" onClick={firebase.doSignOut}>
//       Sign Out
//     </button>
//   );
// };

// export default SignOutButton;
