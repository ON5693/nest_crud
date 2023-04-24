//versão typeorm x.3.x
import { DataSource } from 'typeorm';
import { Course } from './entities/course.entity';
import { TagEntity } from './entities/tag.entity';

export const courseProviders = [
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TAG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TagEntity),
    inject: ['DATA_SOURCE'],
  },
];