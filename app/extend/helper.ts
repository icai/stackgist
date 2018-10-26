import * as bcrypt from 'bcryptjs';

export const bhash = str => {
  return bcrypt.hashSync(str, 10);
};

export const bcompare = (str, hash) => {
  return bcrypt.compareSync(str, hash);
};
