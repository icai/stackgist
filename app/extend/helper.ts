import * as bcrypt from 'bcryptjs';

export default {
  bhash: str => {
    return bcrypt.hashSync(str, 10);
  },
  bcompare: (str, hash) => {
    return bcrypt.compareSync(str, hash);
  }
};
