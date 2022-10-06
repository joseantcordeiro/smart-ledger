/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "common";

export interface Configuration {
  targetId: string;
  key: string;
  value: string;
}

export interface Metadata {
  targetId: string;
  key: string;
  value: string;
}

export interface DefaultConfigurationRequest {
  targetId: string;
}

export interface CreateMany {
  count: number;
}

export interface DefaultConfigurationResponse {
  status: number;
  error: string[];
  data: CreateMany | undefined;
}

export interface DefaultMetadataRequest {
  targetId: string;
}

export interface DefaultMetadataResponse {
  status: number;
  error: string[];
  data: number;
}

export interface FindOneRequest {
  targetId: string;
  key: string;
}

export interface FindManyRequest {
  targetId: string;
  searchString: string;
  take: number;
  skip: number;
  orderBy: string;
}

export interface FindConfigurationResponse {
  status: number;
  error: string[];
  data: Configuration | undefined;
}

export interface FindConfigurationsResponse {
  status: number;
  error: string[];
  data: Configuration[];
}

export interface FindMetadataResponse {
  status: number;
  error: string[];
  data: Metadata | undefined;
}

export interface FindMetadatasResponse {
  status: number;
  error: string[];
  data: Metadata[];
}

export interface CreateRequest {
  targetId: string;
  key: string;
  value: string;
}

export interface CreateConfigurationResponse {
  status: number;
  error: string[];
  data: Configuration | undefined;
}

export interface CreateMetadataResponse {
  status: number;
  error: string[];
  data: Metadata | undefined;
}

export const COMMON_PACKAGE_NAME = "common";

export interface CommonServiceClient {
  tenantDefaultConfiguration(request: DefaultConfigurationRequest): Observable<DefaultConfigurationResponse>;

  metadataDefaultConfiguration(request: DefaultMetadataRequest): Observable<DefaultMetadataResponse>;

  findOneConfiguration(request: FindOneRequest): Observable<FindConfigurationResponse>;

  findManyConfiguration(request: FindManyRequest): Observable<FindConfigurationsResponse>;

  findOneMetadata(request: FindOneRequest): Observable<FindMetadataResponse>;

  findManyMetadata(request: FindManyRequest): Observable<FindMetadatasResponse>;

  createConfiguration(request: CreateRequest): Observable<CreateConfigurationResponse>;

  createMetadata(request: CreateRequest): Observable<CreateMetadataResponse>;
}

export interface CommonServiceController {
  tenantDefaultConfiguration(
    request: DefaultConfigurationRequest,
  ): Promise<DefaultConfigurationResponse> | Observable<DefaultConfigurationResponse> | DefaultConfigurationResponse;

  metadataDefaultConfiguration(
    request: DefaultMetadataRequest,
  ): Promise<DefaultMetadataResponse> | Observable<DefaultMetadataResponse> | DefaultMetadataResponse;

  findOneConfiguration(
    request: FindOneRequest,
  ): Promise<FindConfigurationResponse> | Observable<FindConfigurationResponse> | FindConfigurationResponse;

  findManyConfiguration(
    request: FindManyRequest,
  ): Promise<FindConfigurationsResponse> | Observable<FindConfigurationsResponse> | FindConfigurationsResponse;

  findOneMetadata(
    request: FindOneRequest,
  ): Promise<FindMetadataResponse> | Observable<FindMetadataResponse> | FindMetadataResponse;

  findManyMetadata(
    request: FindManyRequest,
  ): Promise<FindMetadatasResponse> | Observable<FindMetadatasResponse> | FindMetadatasResponse;

  createConfiguration(
    request: CreateRequest,
  ): Promise<CreateConfigurationResponse> | Observable<CreateConfigurationResponse> | CreateConfigurationResponse;

  createMetadata(
    request: CreateRequest,
  ): Promise<CreateMetadataResponse> | Observable<CreateMetadataResponse> | CreateMetadataResponse;
}

export function CommonServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "tenantDefaultConfiguration",
      "metadataDefaultConfiguration",
      "findOneConfiguration",
      "findManyConfiguration",
      "findOneMetadata",
      "findManyMetadata",
      "createConfiguration",
      "createMetadata",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CommonService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CommonService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const COMMON_SERVICE_NAME = "CommonService";
