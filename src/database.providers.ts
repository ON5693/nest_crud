//versão typeorm x.3.x
import { DataSource } from 'typeorm';
import { CreateCourseTable1678989617297 } from './migrations/1678989617297-CreateCourseTable';
import { CreateTagTable1678990577269 } from './migrations/1678990577269-CreateTagTable';
import { CreateCourseTagTable1678993928206 } from './migrations/1678993928206-CreateCourseTagTable';
import { AddCoursesId1678994236767 } from './migrations/1678994236767-AddCoursesId';
import { AddTagsId1678994659263 } from './migrations/1678994659263-AddTagsId';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'projetonestjs',
        entities: [
            __dirname + '/../**/*.entity.js',
        ],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'projetonestjs',
  entities: [
      __dirname + '/../**/*.entity.js',
  ],
  synchronize: false,
  migrations: [CreateCourseTable1678989617297, CreateTagTable1678990577269, CreateCourseTagTable1678993928206, AddCoursesId1678994236767, AddTagsId1678994659263],
});