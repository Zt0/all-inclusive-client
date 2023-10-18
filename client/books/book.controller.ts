import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export interface BookDTO {
  id: string;
  title: string;
  author: string;
  release_date: Date;
}

export interface FindBookDTO {
  title: string;
}

@Controller("booksstore")
export class AppController {
  constructor(@Inject("BOOKS_SERVICE") private client: ClientProxy) {}

  @Get()
  getAllBooks(): unknown {
    return this.client.send({ cmd: "get_books" }, {});
  }

  @Get(":id")
  getBookByID(@Param("id") id: string): unknown {
    return this.client.send({ cmd: "get_book" }, id);
  }

  @Post()
  createNewBook(@Body() book: BookDTO): unknown {
    return this.client.send({ cmd: "new_book" }, book);
  }

  @Post("find")
  findBook(@Body() book: FindBookDTO): unknown {
    console.log(6246, book);
    return this.client.send({ cmd: "find_book" }, book);
  }
}
