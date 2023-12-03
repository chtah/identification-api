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
        title_thai: data.title_thai,
        name_thai: data.name_thai,
        surename_thai: data.surename_thai,
        title_eng: data.title_eng,
        name_eng: data.name_eng,
        surename_eng: data.surename_eng,
        date_of_birth: data.date_of_birth,
        date_of_birth_buddhist: data.date_of_birth_buddhist,
        religion: data.religion,
        address: data.address,
        date_of_issue: data.date_of_issue,
        date_of_issue_buddhist: data.date_of_issue_buddhist,
        date_of_expiry: data.date_of_expiry,
        date_of_expiry_buddhist: data.date_of_expiry_buddhist,
      },
    });
  }

  public async getAll(): Promise<IIdentificationDto[]> {
    const allIdentification = await this.prisma.identification.findMany({
      select: {
        id: true,
        identification_number: true,
        title_thai: true,
        name_thai: true,
        surename_thai: true,
        title_eng: true,
        name_eng: true,
        surename_eng: true,
        date_of_birth: true,
        date_of_birth_buddhist: true,
        religion: true,
        address: true,
        date_of_issue: true,
        date_of_issue_buddhist: true,
        date_of_expiry: true,
        date_of_expiry_buddhist: true,
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

  public async deleteById(id_number: string): Promise<IIdentificationDto> {
    try {
      const deleteInfo = await this.prisma.identification.delete({
        where: { identification_number: id_number },
      });
      return deleteInfo;
    } catch (error) {
      throw error;
    }
  }
}
