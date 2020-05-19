import { build, fake } from '@jackfranklin/test-data-bot';

interface User {
  username: string;
  email: string;
  password: string;
}

const buildUser = build<User>('User', {
  fields: {
    username: fake((f) => f.internet.userName()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
  },
});

export { buildUser };
