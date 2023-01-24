import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Session,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import TarhelyDataDto from './tarhelydata.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/tarhely')
  async allTarhely() {
    const [storages] = await db.execute(
      'SELECT * FROM tarhelycsomagok'
    );
    return { storages: storages };
  }

  @Post('/api/tarhely')
  async registerTarhely(@Body() tarhelydata: TarhelyDataDto) {
    await db.execute('INSERT INTO tarhelycsomagok (nev, meret, ar) VALUES (?, ?)', [
      tarhelydata.nev,
      tarhelydata.meret,
      tarhelydata.ar,
    ]);
  }

  @Delete('/api/tarhely/:id')
  async deleteTarhely(@Param('id') id: number) {
    await db.execute(
      'DELETE FROM tarhelycsomagok WHERE id = ?',
      [id],
    );
  }
}
