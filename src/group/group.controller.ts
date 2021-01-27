import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { IdValidationPipe } from '../shared/id-validation.pipe';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new IdValidationPipe()) id: string) {
    return this.groupService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', new IdValidationPipe()) id: string,
    @Body() updateGroupDto: Partial<CreateGroupDto>,
  ) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id', new IdValidationPipe()) id: string) {
    return this.groupService.remove(+id);
  }
}
