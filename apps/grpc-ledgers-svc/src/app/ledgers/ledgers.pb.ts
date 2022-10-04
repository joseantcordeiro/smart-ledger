/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "ledgers";

export interface Ledger {
  id: string;
  name: string;
  volumeIn: number;
  volumeOut: number;
}

export interface Config {
  key: string;
  value: string;
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
  name: string;
}

export interface CreateLedgerResponse {
  status: number;
  error: string[];
  data: Ledger | undefined;
}

export const LEDGERS_PACKAGE_NAME = "ledgers";

export interface LedgersServiceClient {
  findOne(request: FindLedgerRequest): Observable<FindLedgerResponse>;

  createTenant(request: CreateLedgerRequest): Observable<CreateLedgerResponse>;
}

export interface LedgersServiceController {
  findOne(
    request: FindLedgerRequest,
  ): Promise<FindLedgerResponse> | Observable<FindLedgerResponse> | FindLedgerResponse;

  createTenant(
    request: CreateLedgerRequest,
  ): Promise<CreateLedgerResponse> | Observable<CreateLedgerResponse> | CreateLedgerResponse;
}

export function LedgersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "createTenant"];
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
