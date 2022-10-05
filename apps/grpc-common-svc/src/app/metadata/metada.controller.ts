import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MetadataService } from './metadata.service';

@Controller()
export class MetadataController {
	@Inject(MetadataService)
  private readonly service: MetadataService;

}