import { Response, NextFunction, RequestHandler } from 'express';


const asyncHandler = (requestHandler: RequestHandler) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      await Promise.resolve(requestHandler(req, res, next));
    } catch (err: any) {
      res.status(err?.statusCode || 400).json({
        statusCode: err?.statusCode || 400,
        data: null,
        message: err.message
      })
    }
  };
};

export { asyncHandler };
