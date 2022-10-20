/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "accounts";

export interface Account {
  address: string;
  name: string;
  status: string;
}

export interface Balance {
  name: string;
  symbol: string;
  amount: number;
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

export interface FindBalanceRequest {
  name: string;
  symbol: string;
  ledgerId: string;
}

export interface FindBalanceResponse {
  status: number;
  error: string[];
  data: Balance | undefined;
}

export const ACCOUNTS_PACKAGE_NAME = "accounts";

export interface AccountsServiceClient {
  findOne(request: FindAccountRequest, metadata?: Metadata): Observable<FindAccountResponse>;

  findMany(request: FindAccountsRequest, metadata?: Metadata): Observable<FindAccountsResponse>;

  createAccount(request: FindAccountRequest, metadata?: Metadata): Observable<FindAccountResponse>;

  balance(request: FindBalanceRequest, metadata?: Metadata): Observable<FindBalanceResponse>;
}

export interface AccountsServiceController {
  findOne(
    request: FindAccountRequest,
    metadata?: Metadata,
  ): Promise<FindAccountResponse> | Observable<FindAccountResponse> | FindAccountResponse;

  findMany(
    request: FindAccountsRequest,
    metadata?: Metadata,
  ): Promise<FindAccountsResponse> | Observable<FindAccountsResponse> | FindAccountsResponse;

  createAccount(
    request: FindAccountRequest,
    metadata?: Metadata,
  ): Promise<FindAccountResponse> | Observable<FindAccountResponse> | FindAccountResponse;

  balance(
    request: FindBalanceRequest,
    metadata?: Metadata,
  ): Promise<FindBalanceResponse> | Observable<FindBalanceResponse> | FindBalanceResponse;
}

export function AccountsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "findMany", "createAccount", "balance"];
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
