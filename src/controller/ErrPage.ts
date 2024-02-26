import {Request, Response} from "express";

export const errPage = async (req: Request, res: Response): Promise<void> => {
  res.status(404).json({
      err : 'err'
  })
}