/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "accounts";

export interface Account {
  address: string;
  name: string;
  meta: Metadata[];
}

export interface Metadata {
  key: string;
  value: string;
}

export interface FindAccountRequest {
  name: string;
}

export interface FindAccountResponse {
  status: number;
  error: string[];
  data: Account | undefined;
}

export interface FindAccountsRequest {
  searchString: string;
  take: number;
  skip: number;
  orderBy: string;
}

export interface FindAccountsResponse {
  status: number;
  error: string[];
  data: Account[];
}

export interface FindMetadataRequest {
  name: string;
  searchString: string;
  take: number;
  skip: number;
  orderBy: string;
}

export interface FindMetadataResponse {
  status: number;
  error: string[];
  data: Metadata[];
}

export interface CreateMetadataRequest {
  name: string;
  key: string;
  value: string;
}

export interface CreateMetadataResponse {
  status: number;
  error: string[];
  data: Metadata | undefined;
}

export const ACCOUNTS_PACKAGE_NAME = "accounts";

export interface AccountsServiceClient {
  findOne(request: FindAccountRequest): Observable<FindAccountResponse>;

  findMany(request: FindAccountsRequest): Observable<FindAccountsResponse>;

  findMetadata(request: FindMetadataRequest): Observable<FindMetadataResponse>;

  createMetadata(request: CreateMetadataRequest): Observable<CreateMetadataResponse>;
}

export interface AccountsServiceController {
  findOne(
    request: FindAccountRequest,
  ): Promise<FindAccountResponse> | Observable<FindAccountResponse> | FindAccountResponse;

  findMany(
    request: FindAccountsRequest,
  ): Promise<FindAccountsResponse> | Observable<FindAccountsResponse> | FindAccountsResponse;

  findMetadata(
    request: FindMetadataRequest,
  ): Promise<FindMetadataResponse> | Observable<FindMetadataResponse> | FindMetadataResponse;

  createMetadata(
    request: CreateMetadataRequest,
  ): Promise<CreateMetadataResponse> | Observable<CreateMetadataResponse> | CreateMetadataResponse;
}

export function AccountsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "findMany", "findMetadata", "createMetadata"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AccountsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AccountsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ACCOUNTS_SERVICE_NAME = "AccountsService";
