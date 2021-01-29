import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { IdValidationPipe } from '../shared/id-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private logger = new Logger('UserController');

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', new IdValidationPipe()) id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(JSON.stringify(createUserDto));
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', new IdValidationPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', new IdValidationPipe()) id: string) {
    return this.userService.remove(+id);
  }
}
