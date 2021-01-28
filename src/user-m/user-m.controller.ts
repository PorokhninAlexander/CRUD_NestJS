import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserMService } from './user-m.service';
import {CreateUserMDto, UpdateUserMDto} from './dto/create-user-m.dto';
import { IdMongoValidationPipe } from '../shared/id-validation.pipe';

@Controller('user-m')
export class UserMController {
  constructor(private readonly userMService: UserMService) {}

  @Post()
  create(@Body() createUserMDto: CreateUserMDto) {
    return this.userMService.create(createUserMDto);
  }

  @Get()
  findAll() {
    return this.userMService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new IdMongoValidationPipe()) id: string) {
    return this.userMService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new IdMongoValidationPipe()) id: string,
    @Body() updateUserMDto: UpdateUserMDto,
  ) {
    return this.userMService.update(id, updateUserMDto);
  }

  @Delete(':id')
  remove(@Param('id', new IdMongoValidationPipe()) id: string) {
    return this.userMService.remove(id);
  }
}
