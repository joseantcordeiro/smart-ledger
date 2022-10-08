/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "transactions";

export interface Posting {
  source: string;
  destination: string;
  asset: string;
  value: number;
}

export interface Batch {
  id: string;
  postings: Posting[];
  status: string;
}

export interface CreateBatchRequest {
  ledgerId: string;
  postings: Posting[];
}

export interface CreateBatchResponse {
  status: number;
  error: string[];
  data: Batch | undefined;
}

export const TRANSACTIONS_PACKAGE_NAME = "transactions";

export interface TransactionsServiceClient {
  createBatch(request: CreateBatchRequest): Observable<CreateBatchResponse>;
}

export interface TransactionsServiceController {
  createBatch(
    request: CreateBatchRequest,
  ): Promise<CreateBatchResponse> | Observable<CreateBatchResponse> | CreateBatchResponse;
}

export function TransactionsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createBatch"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TransactionsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TransactionsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TRANSACTIONS_SERVICE_NAME = "TransactionsService";
