import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Patch, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { UpdatePartialUserDTO } from './dtos/UpdatePartialUserDTO';
import { UserService } from './user.service';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from 'src/decorators/ParamId.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/User.decorator';
import { Role } from 'src/enums/Role.enum';
import { Roles } from 'src/decorators/Role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from 'src/file/file.service';

interface IFilesFields {
  PDF: Express.Multer.File
  IMG: Express.Multer.File[]
}

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService
  ){}


  @Post()
  async create(@Body() { email, name, password, role }: CreateUserDTO ){
    return this.userService.create({ email, name, password, role });
  }
  //recebe um unico arquivo
  @UseInterceptors(FileInterceptor("file"))
  @Roles(Role.Admin, Role.User)
  @Patch("photo")
  async photo(
    @User("id") id: number,
    @UploadedFile(new ParseFilePipe({ //Pipe de parse para arquivos
      errorHttpStatusCode: 400,
      validators: [
        new FileTypeValidator({ fileType: "image/*"}), //Pipe de validar o tipo de arquivo
        new MaxFileSizeValidator({ maxSize: 5000000 }) //Pipe de validar o tamanho de arquivo para 5 mb
      ]
    })) photo: Express.Multer.File
  ){

    const storagePath = join(__dirname, "..", "..", "storage", "photo");

    await this.fileService.createDirIfNotExits(storagePath);

    const photoPath = join(storagePath, `photo-${id}.png`)

    await this.fileService.createOnDisk(photoPath, photo.buffer);

    return { message: "Sucess." }
  }
  //recebe muitos arquivos em um unico campo
  @UseInterceptors(FilesInterceptor("files"))
  @Roles(Role.Admin, Role.User)
  @Post("files")
  async files(@User("id") id: number, @UploadedFiles() files: Express.Multer.File[]){
    return {
      files
    }
  }
  //recebe varios arquivoes em varios campos
  @UseInterceptors(FileFieldsInterceptor([
    {
      name: "PDF",
      maxCount: 1
    },
    {
      name: "IMG",
      maxCount: 3
    }
  ]))
  @Roles(Role.Admin, Role.User)
  @Post("files-fields")
  async filesFields(@User("id") id: number, @UploadedFiles() { IMG, PDF}: IFilesFields){
    return {
      IMG,
      PDF
    }

  }

  @Roles(Role.User, Role.Admin)
  @Get()
  async findAll(){
    return this.userService.findAll();
  }

  @Get(':id')
  async read(@User("id") id: number){

    return this.userService.findById(id);
  }

  @Put(":id")
  async update(@Body() { name, email, password, role }: UpdateUserDTO, @ParamId() id: number){
    return this.userService.update(id, { name, email, password, role });
  }

  @Patch(":id")
  async updatePartial(@Body() { name, email, password, role }: UpdatePartialUserDTO, @ParamId() id: number){
    return this.userService.updatePartial(id, { name, email, password, role });
  }

  @Delete(":id")
  async delete(@ParamId() id: number ){
    return this.userService.delete(id);
  }


}
