import {Request, Response} from "express";

export const errPage = async (req: Request, res: Response): Promise<void> => {
  res.json({
      err : 'err'
  })
}