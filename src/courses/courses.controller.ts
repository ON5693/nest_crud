import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) {

    }

    @Get('list')
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id') id: string 
    ) {
        return this.coursesService.findOne(id);
    }

    @Post()
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    //Patch atualiza um campo específico - Put atualiza todos
    @Patch(':id') 
    update(
        @Param('id') id: string,
        @Body() updateCourseDto: UpdateCourseDto
    ) {
        return this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id') 
    remove(
        @Param('id') id: string,
    ) {
        return this.coursesService.remove(id);
    }
    

}
