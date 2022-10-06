import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  CommonServiceClient,
  COMMON_SERVICE_NAME,
	FindConfigurationResponse,
	FindConfigurationsResponse,
	CreateConfigurationResponse
} from '../common.pb';

@Controller('configuration')
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
  ): Promise<Observable<FindConfigurationsResponse>> {
		return this.svc.findManyConfiguration({ targetId, searchString, take, skip, orderBy });
  }

	@Get(':targetId/:key')
  private async findManyMetadata(
		@Param('targetId') targetId: string,
    @Param('key') key: string,
  ): Promise<Observable<FindConfigurationResponse>> {
		return this.svc.findOneConfiguration({ targetId, key });
  }

	@Post(':targetId')
  private async createConfiguration(
		@Param('targetId') targetId: string,
    @Body() createConfiguration: { key: string, value: string},
  ): Promise<Observable<CreateConfigurationResponse>> {
		const key = createConfiguration.key;
		const value = createConfiguration.value;
		return this.svc.createConfiguration({ targetId, key, value });
  }
	
}
