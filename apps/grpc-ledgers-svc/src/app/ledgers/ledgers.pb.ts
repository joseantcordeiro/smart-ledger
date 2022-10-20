/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "ledgers";

export interface Ledger {
  id: string;
  name: string;
}

export interface Asset {
  contract: string;
  name: string;
  symbol: string;
  owner: string;
  ledgerId: string;
}

export interface FindLedgerRequest {
  id: string;
}

export interface FindLedgerResponse {
  status: number;
  error: string[];
  data: Ledger | undefined;
}

export interface CreateLedgerRequest {
  tenantId: string;
  name: string;
}

export interface CreateLedgerResponse {
  status: number;
  error: string[];
  data: Ledger | undefined;
}

export interface CreateAssetRequest {
  name: string;
  symbol: string;
  ledgerId: string;
}

export interface CreateAssetResponse {
  status: number;
  error: string[];
  data: Asset | undefined;
}

export const LEDGERS_PACKAGE_NAME = "ledgers";

export interface LedgersServiceClient {
  findOne(request: FindLedgerRequest, metadata?: Metadata): Observable<FindLedgerResponse>;

  createLedger(request: CreateLedgerRequest, metadata?: Metadata): Observable<CreateLedgerResponse>;

  createAsset(request: CreateAssetRequest, metadata?: Metadata): Observable<CreateAssetResponse>;
}

export interface LedgersServiceController {
  findOne(
    request: FindLedgerRequest,
    metadata?: Metadata,
  ): Promise<FindLedgerResponse> | Observable<FindLedgerResponse> | FindLedgerResponse;

  createLedger(
    request: CreateLedgerRequest,
    metadata?: Metadata,
  ): Promise<CreateLedgerResponse> | Observable<CreateLedgerResponse> | CreateLedgerResponse;

  createAsset(
    request: CreateAssetRequest,
    metadata?: Metadata,
  ): Promise<CreateAssetResponse> | Observable<CreateAssetResponse> | CreateAssetResponse;
}

export function LedgersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "createLedger", "createAsset"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("LedgersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("LedgersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const LEDGERS_SERVICE_NAME = "LedgersService";
