import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class CoursesService {

    // versão typeorm x.2.x
    // @InjectRepository(Course)
    // private readonly courseRepository: Repository<Course>;

    @Inject('COURSE_REPOSITORY')
    private readonly courseRepository: Repository<Course>;
    
    @Inject('TAG_REPOSITORY')
    private readonly tagRepository: Repository<TagEntity>;
   

    async findAll() {
        return this.courseRepository.find({
            relations: ['tags'],
          });
    }

   async findOne(id: string): Promise<Course> {
        //Mapeamento sem TypeORM
        //const hasCourse = this.courses.find((course: Course) => course.id == Number(id));

        const hasCourse = await this.courseRepository.findOne({
            where: { id },
            relations: ['tags'],
            });


        if(!hasCourse) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }
        
        return hasCourse;
    }

    async create(createCourseDto: CreateCourseDto) {

        const tags = await Promise.all(
            createCourseDto.tags.map((name) => this.preloadTagByName(name))
        );

        const course = this.courseRepository.create({
            ...createCourseDto, 
            tags,
        });

        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {

        const tags = updateCourseDto.tags && (await Promise.all(
            updateCourseDto.tags.map((name) => this.preloadTagByName(name))
        ));
        
        const course = await this.courseRepository.preload({
            id: id, 
            ... updateCourseDto,
            tags,
        });

        if(!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return this.courseRepository.save(course);

    }

    async remove(id: string) {

        const course = await this.courseRepository.findOneBy({id: id});

        if(!course) {
            throw new NotFoundException(`Course ID ${id} not found`);
        }

        return this.courseRepository.remove(course);
    }

    private async preloadTagByName(name: string): Promise<TagEntity> {

        //const tag = await this.tagRepository.findOne({ where: { name: name } });

        let tag = await this.tagRepository.query(`
            SELECT * FROM tags
            WHERE name = '${name}'
        `);

        if(tag.length > 0) {
            return tag[0];
        }
        else {
            return this.tagRepository.create({ name });
        }
    }
}
