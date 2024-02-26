import {Request, Response} from "express";
import {ContactRepository} from "../../../repository/ContactRepository";
import {Locationtype} from "../../../entity/Locationtype";
import {LocationRepository} from "../../../repository/LocationRepository";

export const LocationListController = async (req: Request, res: Response) => {
    try {
        const locationRepository = LocationRepository.getInstance()
        const data = await locationRepository.get()
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