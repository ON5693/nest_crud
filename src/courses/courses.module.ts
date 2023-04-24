import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database.module';
import { CoursesController } from './courses.controller';
import { courseProviders } from './courses.providers';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { TagEntity } from './entities/tag.entity';

@Module({
    //versão typeorm x.2.x
    //imports: [TypeOrmModule.forFeature([Course, TagEntity])],

    //versão typeorm x.3.x
    imports: [DatabaseModule],
    controllers: [CoursesController],
    providers: [CoursesService, ...courseProviders],
})
export class CoursesModule {}
