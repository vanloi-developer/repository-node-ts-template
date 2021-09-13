import { Request, Response, NextFunction } from "express";
import { AutoError as HttpError } from "./error-custom";

export const handleError = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  const status: number = error.code|| 500;
  const message: string = error.message || "Something went wrong!!!";
  const response = {
    result: null,
    targetUrl: null,
    success: false,
    error: {
      code: status,
      message,
      details: error.stack,
      validationErrors: null,
    },
    unAuthorizedRequest: false,
    __abp: true,
  };

  return res.status(status).json(response);
};

export const handleNotFoundPage = (req: Request, res: Response) => {
  const response = {
    result: null,
    targetUrl: null,
    success: false,
    error: {
      code: 404,
      message: `${req.method} ${req.url} not found!!!`,
      details: null,
      validationErrors: null,
    },
    unAuthorizedRequest: false,
    __abp: true,
  };
  return res.json(response);
};

// import * as express from "express";

// import { AutoError } from "./error-custom";

// class HttpException {
//   constructor() {}

//   public static handleError = (
//     error: AutoError,
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     const code: number = error.code || 500;
//     const message: string = error.message || `Internal Server Error`;
//     const details: string = error.stack || null;

//     const response = {
//       result: null,
//       targetUrl: null,
//       success: false,
//       unAuthorizedRequest: false,
//       __abp: true,
//       error: {
//         code,
//         message,
//         details,
//         validationErrors: null,
//       },
//     };

//     return res.status(code).json(response);
//   };

//   public static handleNotFoundPage = (
//     error: AutoError,
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     const code = 404;
//     const response = {
//       result: null,
//       targetUrl: null,
//       success: false,
//       unAuthorizedRequest: false,
//       __abp: true,
//       error: {
//         code,
//         message: `${req.method} ${req.url} is not found.`,
//         details: null,
//         validationErrors: null,
//       },
//     };

//     return res.status(code).json(response);
//   };
// }

// const handleError = HttpException.handleError;

// const handleNotFoundPage = HttpException.handleNotFoundPage;

// export { handleError, handleNotFoundPage };
