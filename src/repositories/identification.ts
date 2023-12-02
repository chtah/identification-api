import { PrismaClient } from "@prisma/client";
import {
  ICreateIdentification,
  IIdentification,
  IIdentification_number,
} from "../interfaces/identification.interface";
import { IIdentificationDto } from "../dto/identification.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default class IdentificationRepository
  implements IdentificationRepository
{
  constructor(private prisma: PrismaClient) {}
  public async create(
    data: ICreateIdentification
  ): Promise<IIdentificationDto> {
    return await this.prisma.identification.create({
      data: {
        identification_number: data.identification_number,
        name_thai: data.name_thai,
        surename_thai: data.surename_thai,
        name_eng: data.name_eng,
        surename_eng: data.surename_eng,
        date_of_birth: data.date_of_birth,
        religion: data.religion,
        address: data.address,
        date_of_issue: data.date_of_issue,
        date_of_expiry: data.date_of_expiry,
      },
    });
  }

  public async getAll(): Promise<IIdentification[]> {
    const allIdentification = await this.prisma.identification.findMany({
      select: {
        id: true,
        identification_number: true,
        name_thai: true,
        surename_thai: true,
        name_eng: true,
        surename_eng: true,
        date_of_birth: true,
        religion: true,
        address: true,
        date_of_issue: true,
        date_of_expiry: true,
      },
    });
    return allIdentification;
  }

  public async getById(
    id_number: string
  ): Promise<IIdentification_number | boolean> {
    try {
      const matchIdentification_number =
        await this.prisma.identification.findUniqueOrThrow({
          select: { identification_number: true },
          where: { identification_number: id_number },
        });

      if (matchIdentification_number) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return false;
      }
      throw error;
    }
  }
}
