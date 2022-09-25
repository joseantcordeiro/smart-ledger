/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "accounts";

export interface FindOneData {
  address: string;
  name: string;
}

export interface FindOneRequest {
  name: string;
}

export interface FindOneResponse {
  status: number;
  error: string[];
  data: FindOneData | undefined;
}

export const ACCOUNTS_PACKAGE_NAME = "accounts";

export interface AccountsServiceClient {
  /** rpc CreateProduct (CreateProductRequest) returns (CreateProductResponse) {} */

  findOne(request: FindOneRequest): Observable<FindOneResponse>;
}

export interface AccountsServiceController {
  /** rpc CreateProduct (CreateProductRequest) returns (CreateProductResponse) {} */

  findOne(request: FindOneRequest): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;
}

export function AccountsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne"];
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
