import { Module } from "@nestjs/common";
import { AppController } from "./books/book.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    {
      provide: "BOOKS_SERVICE",
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: "localhost", port: 5032 },
        });
      },
    },
  ],
})
export class AppModule {}
