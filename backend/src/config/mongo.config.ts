import { MongooseModule } from '@nestjs/mongoose';

export const mongoConfig = MongooseModule.forRoot(
  'mongodb://localhost:27017/easygenerator-backend',
);
