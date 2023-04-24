import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TagEntity } from "./tag.entity";
import {v4 as uuidv4} from 'uuid';

@Entity('courses')
export class Course {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @JoinTable({ name: 'courses_tags' })
    @ManyToMany(() => TagEntity, (tag) => tag.courses, {
        cascade: true,
    })
    tags: TagEntity[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    //Caso já existam ids salvos em outro formato
    @BeforeInsert()
    generateId() {
        if(this.id) {
            return;
        }

        this.id = uuidv4();
    }
}