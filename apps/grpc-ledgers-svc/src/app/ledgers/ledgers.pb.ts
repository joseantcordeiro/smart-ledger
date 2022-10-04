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

export interface Configuration {
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
  tenantId: string;
  name: string;
}

export interface CreateLedgerResponse {
  status: number;
  error: string[];
  data: Ledger | undefined;
}

export interface GetConfigurationRequest {
  id: string;
  key: string;
}

export interface GetConfigurationsRequest {
  id: string;
}

export interface CreateConfigurationRequest {
  id: string;
  key: string;
  value: string;
}

export interface GetConfigurationResponse {
  status: number;
  error: string[];
  data: Configuration | undefined;
}

export interface GetConfigurationsResponse {
  status: number;
  error: string[];
  data: Configuration[];
}

export interface CreateConfigurationResponse {
  status: number;
  error: string[];
  data: Configuration | undefined;
}

export const LEDGERS_PACKAGE_NAME = "ledgers";

export interface LedgersServiceClient {
  findOne(request: FindLedgerRequest): Observable<FindLedgerResponse>;

  createLedger(request: CreateLedgerRequest): Observable<CreateLedgerResponse>;

  getConfiguration(request: GetConfigurationRequest): Observable<GetConfigurationResponse>;

  getConfigurations(request: GetConfigurationsRequest): Observable<GetConfigurationsResponse>;

  createConfiguration(request: CreateConfigurationRequest): Observable<CreateConfigurationResponse>;
}

export interface LedgersServiceController {
  findOne(
    request: FindLedgerRequest,
  ): Promise<FindLedgerResponse> | Observable<FindLedgerResponse> | FindLedgerResponse;

  createLedger(
    request: CreateLedgerRequest,
  ): Promise<CreateLedgerResponse> | Observable<CreateLedgerResponse> | CreateLedgerResponse;

  getConfiguration(
    request: GetConfigurationRequest,
  ): Promise<GetConfigurationResponse> | Observable<GetConfigurationResponse> | GetConfigurationResponse;

  getConfigurations(
    request: GetConfigurationsRequest,
  ): Promise<GetConfigurationsResponse> | Observable<GetConfigurationsResponse> | GetConfigurationsResponse;

  createConfiguration(
    request: CreateConfigurationRequest,
  ): Promise<CreateConfigurationResponse> | Observable<CreateConfigurationResponse> | CreateConfigurationResponse;
}

export function LedgersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "findOne",
      "createLedger",
      "getConfiguration",
      "getConfigurations",
      "createConfiguration",
    ];
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
