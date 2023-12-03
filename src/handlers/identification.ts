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
import { ChristianToBuddhistDate } from "../const/const";

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
        title_thai,
        name_thai,
        surename_thai,
        title_eng,
        name_eng,
        surename_eng,
        date_of_birth,
        religion,
        address,
        date_of_issue,
        date_of_expiry,
      } = req.body;

      const birthBuddhistEraDate = ChristianToBuddhistDate(date_of_birth);
      const issueBuddhistEraDate = ChristianToBuddhistDate(date_of_issue);
      const expiryBuddhistEraDate = ChristianToBuddhistDate(date_of_expiry);
      const isMatch = await this.repo.getById(identification_number);

      if (!isMatch) {
        const result = await this.repo.create({
          identification_number,
          title_thai,
          name_thai,
          surename_thai,
          title_eng,
          name_eng,
          surename_eng,
          date_of_birth,
          date_of_birth_buddhist: birthBuddhistEraDate,
          religion,
          address,
          date_of_issue,
          date_of_issue_buddhist: issueBuddhistEraDate,
          date_of_expiry,
          date_of_expiry_buddhist: expiryBuddhistEraDate,
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
