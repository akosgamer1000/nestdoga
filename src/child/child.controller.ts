import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ChildService } from './child.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('child')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childService.update(+id, updateChildDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childService.remove(+id);
  }
  @Put(':id/jatek/:jatekId')
  addJatek(@Param('id') id: string, @Param('jatekId') jatekId: string) {
    return this.childService.addJatek(+id, +jatekId);
  }
  @Delete(':id/jatek/:jatekId')
  removeJatek(@Param('id') id: string, @Param('jatekId') jatekId: string) {
    return this.childService.removeJatek(+id, +jatekId);
  }
}
