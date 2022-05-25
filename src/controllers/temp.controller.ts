import { RequestHandler, Request, Response } from "express";
import log from "../utils/logger";

const tes: RequestHandler = async (req: Request, res: Response) => {
    log.info("Hi tes")
    res.send({hi:"hi"})
    return
}

const temp = {tes}
export default temp