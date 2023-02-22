import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';

describe('DatabaseModule', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule.forRoot()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(DatabaseModule).toBeDefined();
  });

  const CatSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
  });
  const Cat = mongoose.model('Cat', CatSchema);

  it('should be able to find a document', async () => {
    const kitty = new Cat({ name: 'Zildjian', age: 3, breed: 'Tabby' });
    await kitty.save();
    const foundKitty = await Cat.findOne({ name: 'Zildjian' });
    expect(foundKitty.age).toEqual(3);
  });

  it('should be able to delete a document', async () => {
    const deletedKitty = await Cat.deleteOne({ name: 'Zildjian' });
    expect(deletedKitty).toBeDefined();
  });
});
