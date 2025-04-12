declare module 'express-validator' {
  import { Request } from 'express';

  export function body(field: string, message?: string): any;
  export function validationResult(req: Request): {
    isEmpty(): boolean;
    array(): Array<{ msg: string }>;
  };
} 