import { Service } from 'egg';
// import { Author } from '../../app/model/Author';
/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    const { app } = this;
    console.info(app);
    //  await Author.create<Author>({name: 'elisa', secret: '3k435kj43'}),
    await app.model.models.Author.create({ name: 'elisa', secret: '3k435kj43' });
    await app.model.models.Author.create({ name: 'nelly' });
    await app.model.models.Author.create({ name: 'elisa' });
    return `hi, ${name}`;
  }
}
