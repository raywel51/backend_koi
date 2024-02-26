import {Request, Response} from "express";
import { DatabaseManager } from "../../../repository/DatabaseManager";

export const LocalVisitorListController = async (req: Request, res: Response) => {
   try {
      const dbManager = DatabaseManager.getInstance();
      await dbManager.loadDatabase()

      const data = dbManager.readAllData()
      return res.status(200).json({
         status: true,
         message: 'Data IS Ok.',
         data
     });
   } catch (e) {
      console.error(e);

      return res.status(500).json({
          status: false,
          message: 'An unexpected error occurred.',
          err: e
      });
  }
}