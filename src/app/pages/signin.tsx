import { NextPage } from 'next';

const Signin: NextPage<{ userAgent: string }> = () => {

  return (
    <div>
      <h1>Welcome to My Awesome App</h1>
      <button>Sign In</button>
    </div>
  )

}


export default Signin;