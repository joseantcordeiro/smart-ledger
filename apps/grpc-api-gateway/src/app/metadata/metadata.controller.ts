import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CommonServiceClient,
  COMMON_SERVICE_NAME,
	FindMetadataResponse,
	FindMetadatasResponse,
	CreateMetadataResponse
} from '../common.pb';

@Controller('metadata')
export class MetadataController implements OnModuleInit {
  private svc: CommonServiceClient;

  @Inject(COMMON_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<CommonServiceClient>(COMMON_SERVICE_NAME);
  }

	@Get(':targetId')
  private async findMany(
		@Param('targetId') targetId: string,
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<Observable<FindMetadatasResponse>> {
		return this.svc.findManyMetadata({ targetId, searchString, take, skip, orderBy });
  }

	@Get(':targetId/:key')
  private async findManyMetadata(
		@Param('targetId') targetId: string,
    @Param('key') key: string,
  ): Promise<Observable<FindMetadataResponse>> {
		return this.svc.findOneMetadata({ targetId, key });
  }

	@Post(':targetId')
  private async createMetadata(
		@Param('targetId') targetId: string,
    @Body() createMetadata: { key: string, value: string},
  ): Promise<Observable<CreateMetadataResponse>> {
		const key = createMetadata.key;
		const value = createMetadata.value;
		return this.svc.createMetadata({ targetId, key, value });
  }
	
}
