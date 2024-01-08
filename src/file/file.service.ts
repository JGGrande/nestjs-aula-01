import { Injectable } from "@nestjs/common";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";

@Injectable()
export class FileService {
  async createDirIfNotExits(path: string) {
    if(!existsSync(path)){
      await mkdir(path);
    }
  }

  async createOnDisk(path: string, buffer: Buffer) {
    const result = await writeFile(path, buffer)
    return result
  }
}