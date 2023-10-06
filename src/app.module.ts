import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { TaskModule } from "./task/task.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1",
      database: "task-management",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
