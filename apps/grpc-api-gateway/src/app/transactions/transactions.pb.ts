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
  status: string;
  counter: number;
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

export interface CreatePostingRequest {
  ledgerId: string;
  posting: Posting | undefined;
}

export interface CreatePostingResponse {
  status: number;
  error: string[];
  data: Posting | undefined;
}

export interface UpdateBatchStatusRequest {
  ledgerId: string;
  status: string;
}

export interface UpdateBatchStatusResponse {
  status: number;
  error: string[];
  data: Batch | undefined;
}

export interface CreateDepositRequest {
  ledgerId: string;
  destination: string;
  asset: string;
  value: number;
}

export interface CreateWithdrawalRequest {
  ledgerId: string;
  source: string;
  asset: string;
  value: number;
}

export const TRANSACTIONS_PACKAGE_NAME = "transactions";

export interface TransactionsServiceClient {
  createBatch(request: CreateBatchRequest): Observable<CreateBatchResponse>;

  createPosting(request: CreatePostingRequest): Observable<CreatePostingResponse>;

  updateBatchStatus(request: UpdateBatchStatusRequest): Observable<UpdateBatchStatusResponse>;

  createDeposit(request: CreateDepositRequest): Observable<CreateBatchResponse>;

  createWithdrawal(request: CreateWithdrawalRequest): Observable<CreateBatchResponse>;
}

export interface TransactionsServiceController {
  createBatch(
    request: CreateBatchRequest,
  ): Promise<CreateBatchResponse> | Observable<CreateBatchResponse> | CreateBatchResponse;

  createPosting(
    request: CreatePostingRequest,
  ): Promise<CreatePostingResponse> | Observable<CreatePostingResponse> | CreatePostingResponse;

  updateBatchStatus(
    request: UpdateBatchStatusRequest,
  ): Promise<UpdateBatchStatusResponse> | Observable<UpdateBatchStatusResponse> | UpdateBatchStatusResponse;

  createDeposit(
    request: CreateDepositRequest,
  ): Promise<CreateBatchResponse> | Observable<CreateBatchResponse> | CreateBatchResponse;

  createWithdrawal(
    request: CreateWithdrawalRequest,
  ): Promise<CreateBatchResponse> | Observable<CreateBatchResponse> | CreateBatchResponse;
}

export function TransactionsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createBatch",
      "createPosting",
      "updateBatchStatus",
      "createDeposit",
      "createWithdrawal",
    ];
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
