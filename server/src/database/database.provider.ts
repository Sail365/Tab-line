import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.set('strictQuery', true) &&
      mongoose.connect(process.env.MONGO_URL),
  },
];
