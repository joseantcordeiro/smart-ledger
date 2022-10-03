/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "tenants";

export interface Tenant {
  id: string;
  name: string;
  identifier: string;
  country: Country | undefined;
  timezone: Timezone | undefined;
}

export interface Timezone {
  value: string;
  text: string;
}

export interface Country {
  code: string;
  name: string;
}

export interface FindTenantRequest {
  id: string;
}

export interface FindTenantResponse {
  status: number;
  error: string[];
  data: Tenant | undefined;
}

export interface CreateTenantRequest {
  identifier: string;
  name: string;
  country: string;
  timezone: number;
}

export interface CreateTenantResponse {
  status: number;
  error: string[];
  data: Tenant | undefined;
}

export const TENANTS_PACKAGE_NAME = "tenants";

export interface TenantsServiceClient {
  findOne(request: FindTenantRequest): Observable<FindTenantResponse>;

  createTenant(request: CreateTenantRequest): Observable<CreateTenantResponse>;
}

export interface TenantsServiceController {
  findOne(
    request: FindTenantRequest,
  ): Promise<FindTenantResponse> | Observable<FindTenantResponse> | FindTenantResponse;

  createTenant(
    request: CreateTenantRequest,
  ): Promise<CreateTenantResponse> | Observable<CreateTenantResponse> | CreateTenantResponse;
}

export function TenantsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "createTenant"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TenantsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TenantsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TENANTS_SERVICE_NAME = "TenantsService";
