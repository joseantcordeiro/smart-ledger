import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";



@Injectable()
export class TenantsService {
	constructor(private prisma: PrismaService) {}

}