import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JatekModule } from './jatek/jatek.module';
import { ChildModule } from './child/child.module';

@Module({
  imports: [JatekModule, ChildModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
