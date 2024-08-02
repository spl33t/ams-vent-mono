import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WorksService } from './works.service';
import { TypedBody, TypedFormData, TypedRoute } from '@nestia/core';
import { CreateWorkDto, UpdateWorkDto } from './works.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('works')
export class WorksController {
    constructor(private worksService: WorksService) {}

    @TypedRoute.Post("/")
    create(@TypedBody() data: CreateWorkDto) {
        return this.worksService.create(data)
    }


    @Public()
    @TypedRoute.Get("/")
    all() {
        return this.worksService.all()
    }

    @Public()
    @TypedRoute.Get("/:id")
    one(@Param("id") id: string) {
        return this.worksService.one({ id })
    }

    @TypedRoute.Delete("/:id")
    delete(@Param("id") id: string) {
        return this.worksService.delete({ id })
    }

    @TypedRoute.Put("/:id")
    put(
        @TypedBody() data: UpdateWorkDto,
        @Param("id") id: string
    ) {
        return this.worksService.update({
            data,
            where: { id }
        })
    }
}
