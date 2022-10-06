/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "accounts";

export enum Status {
  ACTIVE = 0,
  SUSPEND = 1,
  BANNED = 2,
  DELETED = 3,
  UNRECOGNIZED = -1,
}

export interface Account {
  address: string;
  name: string;
  status: Status;
}

export interface FindAccountRequest {
  name: string;
  ledgerId: string;
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
  ledgerId: string;
}

export interface FindAccountsResponse {
  status: number;
  error: string[];
  data: Account[];
}

export const ACCOUNTS_PACKAGE_NAME = "accounts";

export interface AccountsServiceClient {
  findOne(request: FindAccountRequest): Observable<FindAccountResponse>;

  findMany(request: FindAccountsRequest): Observable<FindAccountsResponse>;
}

export interface AccountsServiceController {
  findOne(
    request: FindAccountRequest,
  ): Promise<FindAccountResponse> | Observable<FindAccountResponse> | FindAccountResponse;

  findMany(
    request: FindAccountsRequest,
  ): Promise<FindAccountsResponse> | Observable<FindAccountsResponse> | FindAccountsResponse;
}

export function AccountsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "findMany"];
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
