import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MetadataService } from './metadata.service';

@Controller()
export class MetadataController {
	@Inject(MetadataService)
  private readonly service: MetadataService;

	@GrpcMethod(COMMON_SERVICE_NAME, 'FindMetadata')
  private findMetadata(payload: FindMetadataRequestDto): Promise<FindMetadataResponse> {
    return this.service.findMetadata(payload);
  }

	@GrpcMethod(COMMON_SERVICE_NAME, 'CreateMetadata')
  private createMetadata(payload: CreateMetadataRequestDto): Promise<CreateMetadataResponse> {
    return this.service.createMetadata(payload);
  }

}