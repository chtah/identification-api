import { RequestHandler } from "express";
import {
  ICreateIdentification,
  IIdentificationHandler,
  IIdentificationRepository,
} from "../interfaces/identification.interface";
import { IIdentificationDto } from "../dto/identification.dto";
import { IMessageDto } from "../dto/message.dto";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";

export default class IdentificationHandler implements IIdentificationHandler {
  constructor(private repo: IIdentificationRepository) {}
  public createIdentification: RequestHandler<
    {},
    IIdentificationDto | IMessageDto,
    ICreateIdentification
  > = async (req, res) => {
    try {
      const {
        identification_number,
        name_thai,
        surename_thai,
        name_eng,
        surename_eng,
        date_of_birth,
        religion,
        address,
        date_of_issue,
        date_of_expiry,
      } = req.body;

      const isMatch = await this.repo.getById(identification_number);

      if (!isMatch) {
        const result = await this.repo.create({
          identification_number,
          name_thai,
          surename_thai,
          name_eng,
          surename_eng,
          date_of_birth,
          religion,
          address,
          date_of_issue,
          date_of_expiry,
        });
        return res.status(201).json(result).end();
      } else {
        console.log(
          `Duplicate Identification Number: ${identification_number}`
        );
        return res
          .status(202)
          .json({
            message: `Duplicate Identification Number: ${identification_number}`,
          })
          .end();
      }
    } catch (error) {
      console.log(error);
      if (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientUnknownRequestError
      )
        return res.status(500).json({ message: `Prisma Error` }).end();
      console.error(`Error in handler : ${error}`);
      return res.status(500).json({ message: `Internal Error` }).end();
    }
  };

  public getAllIdentification: RequestHandler<
    {},
    IIdentificationDto[] | IMessageDto
  > = async (req, res) => {
    try {
      const allIdentification = await this.repo.getAll();
      return res.status(200).json(allIdentification).end();
    } catch (error) {
      return res.status(500).json({ message: `Internal Error` }).end();
    }
  };
}
