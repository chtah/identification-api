import { Identification } from "@prisma/client";
import { RequestHandler } from "express";
import { IIdentificationDto } from "../dto/identification.dto";
import { IMessageDto } from "../dto/message.dto";

export interface IIdentification {
  id: string;
  identification_number: string;
  title_thai: string;
  name_thai: string;
  surename_thai: string;
  title_eng: string;
  name_eng: string;
  surename_eng: string;
  date_of_birth: Date;
  religion: string;
  address: string;
  date_of_issue: Date;
  date_of_expiry: Date;
}

export interface ICreateIdentification {
  identification_number: string;
  title_thai: string;
  name_thai: string;
  surename_thai: string;
  title_eng: string;
  name_eng: string;
  surename_eng: string;
  date_of_birth: Date;
  date_of_birth_buddhist: Date;
  religion: string;
  address: string;
  date_of_issue: Date;
  date_of_issue_buddhist: Date;
  date_of_expiry: Date;
  date_of_expiry_buddhist: Date;
}

export interface IIdentification_number {
  identification_number: string;
}

export interface IIdentificationRepository {
  create(data: ICreateIdentification): Promise<Identification>;
  getAll(): Promise<IIdentificationDto[]>;
  getById(id_number: string): Promise<IIdentification_number | boolean>;
  deleteById(id_number: string): Promise<IIdentificationDto>;
}

export interface IIdentificationHandler {
  createIdentification: RequestHandler<
    {},
    IIdentificationDto | IMessageDto,
    ICreateIdentification
  >;
  getAllIdentification: RequestHandler<{}, IIdentificationDto[] | IMessageDto>;
  deleteIdentification: RequestHandler<
    {},
    IIdentificationDto | IMessageDto,
    IIdentification_number
  >;
}
