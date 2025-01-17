﻿import { build, fake } from '@jackfranklin/test-data-bot';

interface User {
  username: string;
  email: string;
  password: string;
}

interface Move {
  name: string;
  description: string;
}

const buildUser = build<User>('User', {
  fields: {
    username: fake((f) => f.internet.userName()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
  },
});

const buildMove = build<Move>('Move', {
  fields: {
    name: fake((f) => f.random.word()),
    description: fake((f) => f.lorem.sentence()),
  },
});

export { buildUser, buildMove };
