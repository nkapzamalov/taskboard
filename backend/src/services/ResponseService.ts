import { Response } from "express";

class ResponseService {

  ok(res: Response, data: any){
    const code = 200;
    const response = {
      "error": null,
      data
    }
    return res.status(code).json(response)
  }

  created(res: Response, data: any){
    const code = 201;
    const response = {
      "error": null,
      data
    }
    return res.status(code).json(response)
  }

  noContent(res: Response){
    const code = 204;
    const response = {
      "error": null,
      "data": null
    }
    return res.status(code).json(response)
  }

  badRequest(res: Response, error: string) {
    const code = 400;
    const response = {
      error,
      data: null,
    };
    return res.status(code).json(response);
  }

  notFound(res: Response, error: string ){
    const code = 404;
    const response = {
      error,
      "data": null
    }
    return res.status(code).json(response)
  }

}

export default new ResponseService();