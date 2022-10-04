import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@ledger/prisma";
import { FindTenantRequestDto, CreateTenantRequestDto } from './tenants.dto';
import { FindTenantResponse, CreateTenantResponse } from './tenants.pb';

@Injectable()
export class TenantsService {
	constructor(private prisma: PrismaService) {}

	public async findOne({ id }: FindTenantRequestDto): Promise<FindTenantResponse> {
		
		const tenant = await this.prisma.tenants.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
				name: true,
				identifier: true,
				country: {
					select: {
						code: true,
						name: true,
					},
				},
				timezone: {
					select: {
						value: true,
						text: true,
					},
				},
			},
		})

    if (!tenant) {
      return { data: null, error: ['Tenant not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: tenant, error: null, status: HttpStatus.OK };
  }

	public async createTenant({ name, identifier, timezone, country }: CreateTenantRequestDto): Promise<CreateTenantResponse> {
		const tenant = await this.prisma.tenants.create({
			data: { name: name, identifier: identifier, timezone_id: timezone, country_code: country }
		})

    if (!tenant) {
      return { data: null, error: ['Tenant not created'], status: HttpStatus.NOT_FOUND };
    }

		const data = await this.prisma.tenants.findUnique({
			where: {
				id: tenant.id,
			},
			select: {
				id: true,
				name: true,
				identifier: true,
				country: {
					select: {
						code: true,
						name: true,
					},
				},
				timezone: {
					select: {
						value: true,
						text: true,
					},
				},
			},
		})

    return { data: data, error: null, status: HttpStatus.CREATED };
  }

}