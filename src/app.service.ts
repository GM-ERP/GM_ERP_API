import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const welcome = ` =============== Hello world! ===============\n<br>
                      ===============    GM-ERP    ===============`;

    return welcome;
  }
}
