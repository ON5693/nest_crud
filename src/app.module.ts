import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [CoursesModule, DatabaseModule
  // versão typeorm x.2.x  
  //   TypeOrmModule.forRoot({
  //   type: 'postgres',
  //   host: 'localhost',
  //   port: 5432,
  //   username: 'postgres',
  //   password: 'docker',
  //   database: 'postgres',
  //   autoLoadEntities: true,
  //   synchronize: true, })
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
