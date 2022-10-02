import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { FindTenantsRequestDto,
	FindTenantRequestDto,
	CreateTenantRequestDto } from './tenants.dto';
import {
	FindTenantResponse,
	FindTenantsResponse,
	CreateTenantResponse } from './tenants.pb';

@Injectable()
export class TenantsService {
	constructor(private prisma: PrismaService) {}

	public async findOne({ id }: FindTenantRequestDto): Promise<FindTenantResponse> {
		
		const tenant = await this.prisma.tenants.findUnique({
			where: {
				id: id,
			},
			select: {
				name: true,
				identifier: true,
				timezone: true,
				country: true
			},
		})

    if (!tenant) {
      return { data: null, error: ['Tenant not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: tenant, error: null, status: HttpStatus.OK };
  }

	public async findMany({ searchString, take, skip, orderBy }: FindTenantsRequestDto): Promise<FindTenantsResponse> {
		const or = searchString ? {
      OR: [
        { identifier: { contains: searchString } },
      ],
    } : {};

		const tenants = await this.prisma.tenants.findMany({
			where: {
        active: true,
        ...or
      },
			select: {
				name: true,
				identifier: true,
				timezone: true,
				country: true
			},
			take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      //orderBy: {
      //  name: orderBy
      //}
		});

    if (!tenants) {
      return { data: null, error: ['Tenants not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: tenants, error: null, status: HttpStatus.OK };
  }

	public async createTenant({ name, identifier, timezone, country }: CreateTenantRequestDto): Promise<CreateTenantResponse> {
		const tenant = await this.prisma.tenants.create({
			data: { name: name, identifier: identifier, timezone: timezone, country: country }
		})

    if (!tenant) {
      return { data: null, error: ['Tenant not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: tenant, error: null, status: HttpStatus.OK };
  }

}