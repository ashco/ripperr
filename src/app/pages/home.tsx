import { NextPage } from 'next';
import { withAuthorization } from '../components/Session';
import { InterfaceAuthUserContext } from '../components/Firebase/firebase';

const HomePage: NextPage<{ userAgent: string }> = () => (
  <div>
    <h1>Home world</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <button>Add Workout</button>
  </div>
);

const condition = (authUser: InterfaceAuthUserContext): boolean =>
  authUser !== null;

export default withAuthorization(condition)(HomePage);
