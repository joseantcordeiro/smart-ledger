import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
	COMMON_SERVICE_NAME,
	CreateMetadataResponse,
	FindMetadataResponse,
	FindMetadatasResponse
} from '../common.pb';
import {
	CreateMetadataRequestDto,
	FindMetadataRequestDto,
	FindMetadatasRequestDto
} from './metadata.dto';
import { MetadataService } from './metadata.service';

@Controller()
export class MetadataController {
	@Inject(MetadataService)
  private readonly service: MetadataService;

	@GrpcMethod(COMMON_SERVICE_NAME, 'FindOneMetadata')
  private findOneMetadata(payload: FindMetadataRequestDto): Promise<FindMetadataResponse> {
    return this.service.findOneMetadata(payload);
  }

	@GrpcMethod(COMMON_SERVICE_NAME, 'FindManyMetadata')
  private findManyMetadata(payload: FindMetadatasRequestDto): Promise<FindMetadatasResponse> {
    return this.service.findManyMetadata(payload);
  }

	@GrpcMethod(COMMON_SERVICE_NAME, 'CreateMetadata')
  private createMetadata(payload: CreateMetadataRequestDto): Promise<CreateMetadataResponse> {
    return this.service.createMetadata(payload);
  }

}