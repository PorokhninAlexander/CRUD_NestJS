import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupMService } from './group-m.service';
import { CreateGroupMDto } from './dto/create-group-m.dto';
import { IdMongoValidationPipe } from '../shared/id-validation.pipe';

@Controller('group-m')
export class GroupMController {
  constructor(private readonly groupMService: GroupMService) {}

  @Post()
  create(@Body() createGroupMDto: CreateGroupMDto) {
    return this.groupMService.create(createGroupMDto);
  }

  @Get()
  findAll() {
    return this.groupMService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new IdMongoValidationPipe()) id: string) {
    return this.groupMService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new IdMongoValidationPipe()) id: string,
    @Body() updateGroupMDto: Partial<CreateGroupMDto>,
  ) {
    return this.groupMService.update(id, updateGroupMDto);
  }

  @Delete(':id')
  remove(@Param('id', new IdMongoValidationPipe()) id: string) {
    return this.groupMService.remove(id);
  }
}
