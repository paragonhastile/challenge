export class PrismaError extends Error {
  statusCode: number;
  constructor(message:string) {
    super(message);
    this.statusCode = 400;
  }
}

export class ItemNotFountError extends Error {
  statusCode: number;
  constructor(message:string) {
    super(message);
    this.statusCode = 404;
  }
}