
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model accounts
 * 
 */
export type accounts = {
  address: string
  name: string
  active: boolean
}

/**
 * Model metadata
 * 
 */
export type metadata = {
  account: string
  key: string
  value: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.accounts.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.accounts.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.accounts`: Exposes CRUD operations for the **accounts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.accounts.findMany()
    * ```
    */
  get accounts(): Prisma.accountsDelegate<GlobalReject>;

  /**
   * `prisma.metadata`: Exposes CRUD operations for the **metadata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Metadata
    * const metadata = await prisma.metadata.findMany()
    * ```
    */
  get metadata(): Prisma.metadataDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.4.0
   * Query Engine version: f352a33b70356f46311da8b00d83386dd9f145d6
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    accounts: 'accounts',
    metadata: 'metadata'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AccountsCountOutputType
   */


  export type AccountsCountOutputType = {
    meta: number
  }

  export type AccountsCountOutputTypeSelect = {
    meta?: boolean
  }

  export type AccountsCountOutputTypeGetPayload<
    S extends boolean | null | undefined | AccountsCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? AccountsCountOutputType
    : S extends undefined
    ? never
    : S extends AccountsCountOutputTypeArgs
    ?'include' extends U
    ? AccountsCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof AccountsCountOutputType ? AccountsCountOutputType[P] : never
  } 
    : AccountsCountOutputType
  : AccountsCountOutputType




  // Custom InputTypes

  /**
   * AccountsCountOutputType without action
   */
  export type AccountsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the AccountsCountOutputType
     * 
    **/
    select?: AccountsCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model accounts
   */


  export type AggregateAccounts = {
    _count: AccountsCountAggregateOutputType | null
    _min: AccountsMinAggregateOutputType | null
    _max: AccountsMaxAggregateOutputType | null
  }

  export type AccountsMinAggregateOutputType = {
    address: string | null
    name: string | null
    active: boolean | null
  }

  export type AccountsMaxAggregateOutputType = {
    address: string | null
    name: string | null
    active: boolean | null
  }

  export type AccountsCountAggregateOutputType = {
    address: number
    name: number
    active: number
    _all: number
  }


  export type AccountsMinAggregateInputType = {
    address?: true
    name?: true
    active?: true
  }

  export type AccountsMaxAggregateInputType = {
    address?: true
    name?: true
    active?: true
  }

  export type AccountsCountAggregateInputType = {
    address?: true
    name?: true
    active?: true
    _all?: true
  }

  export type AccountsAggregateArgs = {
    /**
     * Filter which accounts to aggregate.
     * 
    **/
    where?: accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<accountsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned accounts
    **/
    _count?: true | AccountsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountsMaxAggregateInputType
  }

  export type GetAccountsAggregateType<T extends AccountsAggregateArgs> = {
        [P in keyof T & keyof AggregateAccounts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccounts[P]>
      : GetScalarType<T[P], AggregateAccounts[P]>
  }




  export type AccountsGroupByArgs = {
    where?: accountsWhereInput
    orderBy?: Enumerable<accountsOrderByWithAggregationInput>
    by: Array<AccountsScalarFieldEnum>
    having?: accountsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountsCountAggregateInputType | true
    _min?: AccountsMinAggregateInputType
    _max?: AccountsMaxAggregateInputType
  }


  export type AccountsGroupByOutputType = {
    address: string
    name: string
    active: boolean
    _count: AccountsCountAggregateOutputType | null
    _min: AccountsMinAggregateOutputType | null
    _max: AccountsMaxAggregateOutputType | null
  }

  type GetAccountsGroupByPayload<T extends AccountsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AccountsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountsGroupByOutputType[P]>
            : GetScalarType<T[P], AccountsGroupByOutputType[P]>
        }
      >
    >


  export type accountsSelect = {
    address?: boolean
    name?: boolean
    active?: boolean
    meta?: boolean | metadataFindManyArgs
    _count?: boolean | AccountsCountOutputTypeArgs
  }

  export type accountsInclude = {
    meta?: boolean | metadataFindManyArgs
    _count?: boolean | AccountsCountOutputTypeArgs
  }

  export type accountsGetPayload<
    S extends boolean | null | undefined | accountsArgs,
    U = keyof S
      > = S extends true
        ? accounts
    : S extends undefined
    ? never
    : S extends accountsArgs | accountsFindManyArgs
    ?'include' extends U
    ? accounts  & {
    [P in TrueKeys<S['include']>]:
        P extends 'meta' ? Array < metadataGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? AccountsCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'meta' ? Array < metadataGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? AccountsCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof accounts ? accounts[P] : never
  } 
    : accounts
  : accounts


  type accountsCountArgs = Merge<
    Omit<accountsFindManyArgs, 'select' | 'include'> & {
      select?: AccountsCountAggregateInputType | true
    }
  >

  export interface accountsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Accounts that matches the filter.
     * @param {accountsFindUniqueArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends accountsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, accountsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'accounts'> extends True ? CheckSelect<T, Prisma__accountsClient<accounts>, Prisma__accountsClient<accountsGetPayload<T>>> : CheckSelect<T, Prisma__accountsClient<accounts | null, null>, Prisma__accountsClient<accountsGetPayload<T> | null, null>>

    /**
     * Find the first Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsFindFirstArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends accountsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, accountsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'accounts'> extends True ? CheckSelect<T, Prisma__accountsClient<accounts>, Prisma__accountsClient<accountsGetPayload<T>>> : CheckSelect<T, Prisma__accountsClient<accounts | null, null>, Prisma__accountsClient<accountsGetPayload<T> | null, null>>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.accounts.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.accounts.findMany({ take: 10 })
     * 
     * // Only select the `address`
     * const accountsWithAddressOnly = await prisma.accounts.findMany({ select: { address: true } })
     * 
    **/
    findMany<T extends accountsFindManyArgs>(
      args?: SelectSubset<T, accountsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<accounts>>, PrismaPromise<Array<accountsGetPayload<T>>>>

    /**
     * Create a Accounts.
     * @param {accountsCreateArgs} args - Arguments to create a Accounts.
     * @example
     * // Create one Accounts
     * const Accounts = await prisma.accounts.create({
     *   data: {
     *     // ... data to create a Accounts
     *   }
     * })
     * 
    **/
    create<T extends accountsCreateArgs>(
      args: SelectSubset<T, accountsCreateArgs>
    ): CheckSelect<T, Prisma__accountsClient<accounts>, Prisma__accountsClient<accountsGetPayload<T>>>

    /**
     * Create many Accounts.
     *     @param {accountsCreateManyArgs} args - Arguments to create many Accounts.
     *     @example
     *     // Create many Accounts
     *     const accounts = await prisma.accounts.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends accountsCreateManyArgs>(
      args?: SelectSubset<T, accountsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Accounts.
     * @param {accountsDeleteArgs} args - Arguments to delete one Accounts.
     * @example
     * // Delete one Accounts
     * const Accounts = await prisma.accounts.delete({
     *   where: {
     *     // ... filter to delete one Accounts
     *   }
     * })
     * 
    **/
    delete<T extends accountsDeleteArgs>(
      args: SelectSubset<T, accountsDeleteArgs>
    ): CheckSelect<T, Prisma__accountsClient<accounts>, Prisma__accountsClient<accountsGetPayload<T>>>

    /**
     * Update one Accounts.
     * @param {accountsUpdateArgs} args - Arguments to update one Accounts.
     * @example
     * // Update one Accounts
     * const accounts = await prisma.accounts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends accountsUpdateArgs>(
      args: SelectSubset<T, accountsUpdateArgs>
    ): CheckSelect<T, Prisma__accountsClient<accounts>, Prisma__accountsClient<accountsGetPayload<T>>>

    /**
     * Delete zero or more Accounts.
     * @param {accountsDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.accounts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends accountsDeleteManyArgs>(
      args?: SelectSubset<T, accountsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const accounts = await prisma.accounts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends accountsUpdateManyArgs>(
      args: SelectSubset<T, accountsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Accounts.
     * @param {accountsUpsertArgs} args - Arguments to update or create a Accounts.
     * @example
     * // Update or create a Accounts
     * const accounts = await prisma.accounts.upsert({
     *   create: {
     *     // ... data to create a Accounts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Accounts we want to update
     *   }
     * })
    **/
    upsert<T extends accountsUpsertArgs>(
      args: SelectSubset<T, accountsUpsertArgs>
    ): CheckSelect<T, Prisma__accountsClient<accounts>, Prisma__accountsClient<accountsGetPayload<T>>>

    /**
     * Find one Accounts that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {accountsFindUniqueOrThrowArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends accountsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, accountsFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__accountsClient<accounts>, Prisma__accountsClient<accountsGetPayload<T>>>

    /**
     * Find the first Accounts that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsFindFirstOrThrowArgs} args - Arguments to find a Accounts
     * @example
     * // Get one Accounts
     * const accounts = await prisma.accounts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends accountsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, accountsFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__accountsClient<accounts>, Prisma__accountsClient<accountsGetPayload<T>>>

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountsCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.accounts.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends accountsCountArgs>(
      args?: Subset<T, accountsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountsAggregateArgs>(args: Subset<T, AccountsAggregateArgs>): PrismaPromise<GetAccountsAggregateType<T>>

    /**
     * Group by Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountsGroupByArgs['orderBy'] }
        : { orderBy?: AccountsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for accounts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__accountsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    meta<T extends metadataFindManyArgs = {}>(args?: Subset<T, metadataFindManyArgs>): CheckSelect<T, PrismaPromise<Array<metadata>| Null>, PrismaPromise<Array<metadataGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * accounts base type for findUnique actions
   */
  export type accountsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the accounts
     * 
    **/
    select?: accountsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: accountsInclude | null
    /**
     * Filter, which accounts to fetch.
     * 
    **/
    where: accountsWhereUniqueInput
  }

  /**
   * accounts: findUnique
   */
  export interface accountsFindUniqueArgs extends accountsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * accounts base type for findFirst actions
   */
  export type accountsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the accounts
     * 
    **/
    select?: accountsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: accountsInclude | null
    /**
     * Filter, which accounts to fetch.
     * 
    **/
    where?: accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<accountsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for accounts.
     * 
    **/
    cursor?: accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of accounts.
     * 
    **/
    distinct?: Enumerable<AccountsScalarFieldEnum>
  }

  /**
   * accounts: findFirst
   */
  export interface accountsFindFirstArgs extends accountsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * accounts findMany
   */
  export type accountsFindManyArgs = {
    /**
     * Select specific fields to fetch from the accounts
     * 
    **/
    select?: accountsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: accountsInclude | null
    /**
     * Filter, which accounts to fetch.
     * 
    **/
    where?: accountsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<accountsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing accounts.
     * 
    **/
    cursor?: accountsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AccountsScalarFieldEnum>
  }


  /**
   * accounts create
   */
  export type accountsCreateArgs = {
    /**
     * Select specific fields to fetch from the accounts
     * 
    **/
    select?: accountsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: accountsInclude | null
    /**
     * The data needed to create a accounts.
     * 
    **/
    data: XOR<accountsCreateInput, accountsUncheckedCreateInput>
  }


  /**
   * accounts createMany
   */
  export type accountsCreateManyArgs = {
    /**
     * The data used to create many accounts.
     * 
    **/
    data: Enumerable<accountsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * accounts update
   */
  export type accountsUpdateArgs = {
    /**
     * Select specific fields to fetch from the accounts
     * 
    **/
    select?: accountsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: accountsInclude | null
    /**
     * The data needed to update a accounts.
     * 
    **/
    data: XOR<accountsUpdateInput, accountsUncheckedUpdateInput>
    /**
     * Choose, which accounts to update.
     * 
    **/
    where: accountsWhereUniqueInput
  }


  /**
   * accounts updateMany
   */
  export type accountsUpdateManyArgs = {
    /**
     * The data used to update accounts.
     * 
    **/
    data: XOR<accountsUpdateManyMutationInput, accountsUncheckedUpdateManyInput>
    /**
     * Filter which accounts to update
     * 
    **/
    where?: accountsWhereInput
  }


  /**
   * accounts upsert
   */
  export type accountsUpsertArgs = {
    /**
     * Select specific fields to fetch from the accounts
     * 
    **/
    select?: accountsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: accountsInclude | null
    /**
     * The filter to search for the accounts to update in case it exists.
     * 
    **/
    where: accountsWhereUniqueInput
    /**
     * In case the accounts found by the `where` argument doesn't exist, create a new accounts with this data.
     * 
    **/
    create: XOR<accountsCreateInput, accountsUncheckedCreateInput>
    /**
     * In case the accounts was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<accountsUpdateInput, accountsUncheckedUpdateInput>
  }


  /**
   * accounts delete
   */
  export type accountsDeleteArgs = {
    /**
     * Select specific fields to fetch from the accounts
     * 
    **/
    select?: accountsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: accountsInclude | null
    /**
     * Filter which accounts to delete.
     * 
    **/
    where: accountsWhereUniqueInput
  }


  /**
   * accounts deleteMany
   */
  export type accountsDeleteManyArgs = {
    /**
     * Filter which accounts to delete
     * 
    **/
    where?: accountsWhereInput
  }


  /**
   * accounts: findUniqueOrThrow
   */
  export type accountsFindUniqueOrThrowArgs = accountsFindUniqueArgsBase
      

  /**
   * accounts: findFirstOrThrow
   */
  export type accountsFindFirstOrThrowArgs = accountsFindFirstArgsBase
      

  /**
   * accounts without action
   */
  export type accountsArgs = {
    /**
     * Select specific fields to fetch from the accounts
     * 
    **/
    select?: accountsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: accountsInclude | null
  }



  /**
   * Model metadata
   */


  export type AggregateMetadata = {
    _count: MetadataCountAggregateOutputType | null
    _min: MetadataMinAggregateOutputType | null
    _max: MetadataMaxAggregateOutputType | null
  }

  export type MetadataMinAggregateOutputType = {
    account: string | null
    key: string | null
    value: string | null
  }

  export type MetadataMaxAggregateOutputType = {
    account: string | null
    key: string | null
    value: string | null
  }

  export type MetadataCountAggregateOutputType = {
    account: number
    key: number
    value: number
    _all: number
  }


  export type MetadataMinAggregateInputType = {
    account?: true
    key?: true
    value?: true
  }

  export type MetadataMaxAggregateInputType = {
    account?: true
    key?: true
    value?: true
  }

  export type MetadataCountAggregateInputType = {
    account?: true
    key?: true
    value?: true
    _all?: true
  }

  export type MetadataAggregateArgs = {
    /**
     * Filter which metadata to aggregate.
     * 
    **/
    where?: metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of metadata to fetch.
     * 
    **/
    orderBy?: Enumerable<metadataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` metadata from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` metadata.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned metadata
    **/
    _count?: true | MetadataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetadataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetadataMaxAggregateInputType
  }

  export type GetMetadataAggregateType<T extends MetadataAggregateArgs> = {
        [P in keyof T & keyof AggregateMetadata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetadata[P]>
      : GetScalarType<T[P], AggregateMetadata[P]>
  }




  export type MetadataGroupByArgs = {
    where?: metadataWhereInput
    orderBy?: Enumerable<metadataOrderByWithAggregationInput>
    by: Array<MetadataScalarFieldEnum>
    having?: metadataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetadataCountAggregateInputType | true
    _min?: MetadataMinAggregateInputType
    _max?: MetadataMaxAggregateInputType
  }


  export type MetadataGroupByOutputType = {
    account: string
    key: string
    value: string
    _count: MetadataCountAggregateOutputType | null
    _min: MetadataMinAggregateOutputType | null
    _max: MetadataMaxAggregateOutputType | null
  }

  type GetMetadataGroupByPayload<T extends MetadataGroupByArgs> = PrismaPromise<
    Array<
      PickArray<MetadataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetadataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetadataGroupByOutputType[P]>
            : GetScalarType<T[P], MetadataGroupByOutputType[P]>
        }
      >
    >


  export type metadataSelect = {
    account?: boolean
    key?: boolean
    value?: boolean
    acc?: boolean | accountsArgs
  }

  export type metadataInclude = {
    acc?: boolean | accountsArgs
  }

  export type metadataGetPayload<
    S extends boolean | null | undefined | metadataArgs,
    U = keyof S
      > = S extends true
        ? metadata
    : S extends undefined
    ? never
    : S extends metadataArgs | metadataFindManyArgs
    ?'include' extends U
    ? metadata  & {
    [P in TrueKeys<S['include']>]:
        P extends 'acc' ? accountsGetPayload<Exclude<S['include'], undefined | null>[P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'acc' ? accountsGetPayload<Exclude<S['select'], undefined | null>[P]> | null :  P extends keyof metadata ? metadata[P] : never
  } 
    : metadata
  : metadata


  type metadataCountArgs = Merge<
    Omit<metadataFindManyArgs, 'select' | 'include'> & {
      select?: MetadataCountAggregateInputType | true
    }
  >

  export interface metadataDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Metadata that matches the filter.
     * @param {metadataFindUniqueArgs} args - Arguments to find a Metadata
     * @example
     * // Get one Metadata
     * const metadata = await prisma.metadata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends metadataFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, metadataFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'metadata'> extends True ? CheckSelect<T, Prisma__metadataClient<metadata>, Prisma__metadataClient<metadataGetPayload<T>>> : CheckSelect<T, Prisma__metadataClient<metadata | null, null>, Prisma__metadataClient<metadataGetPayload<T> | null, null>>

    /**
     * Find the first Metadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metadataFindFirstArgs} args - Arguments to find a Metadata
     * @example
     * // Get one Metadata
     * const metadata = await prisma.metadata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends metadataFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, metadataFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'metadata'> extends True ? CheckSelect<T, Prisma__metadataClient<metadata>, Prisma__metadataClient<metadataGetPayload<T>>> : CheckSelect<T, Prisma__metadataClient<metadata | null, null>, Prisma__metadataClient<metadataGetPayload<T> | null, null>>

    /**
     * Find zero or more Metadata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metadataFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Metadata
     * const metadata = await prisma.metadata.findMany()
     * 
     * // Get first 10 Metadata
     * const metadata = await prisma.metadata.findMany({ take: 10 })
     * 
     * // Only select the `account`
     * const metadataWithAccountOnly = await prisma.metadata.findMany({ select: { account: true } })
     * 
    **/
    findMany<T extends metadataFindManyArgs>(
      args?: SelectSubset<T, metadataFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<metadata>>, PrismaPromise<Array<metadataGetPayload<T>>>>

    /**
     * Create a Metadata.
     * @param {metadataCreateArgs} args - Arguments to create a Metadata.
     * @example
     * // Create one Metadata
     * const Metadata = await prisma.metadata.create({
     *   data: {
     *     // ... data to create a Metadata
     *   }
     * })
     * 
    **/
    create<T extends metadataCreateArgs>(
      args: SelectSubset<T, metadataCreateArgs>
    ): CheckSelect<T, Prisma__metadataClient<metadata>, Prisma__metadataClient<metadataGetPayload<T>>>

    /**
     * Create many Metadata.
     *     @param {metadataCreateManyArgs} args - Arguments to create many Metadata.
     *     @example
     *     // Create many Metadata
     *     const metadata = await prisma.metadata.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends metadataCreateManyArgs>(
      args?: SelectSubset<T, metadataCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Metadata.
     * @param {metadataDeleteArgs} args - Arguments to delete one Metadata.
     * @example
     * // Delete one Metadata
     * const Metadata = await prisma.metadata.delete({
     *   where: {
     *     // ... filter to delete one Metadata
     *   }
     * })
     * 
    **/
    delete<T extends metadataDeleteArgs>(
      args: SelectSubset<T, metadataDeleteArgs>
    ): CheckSelect<T, Prisma__metadataClient<metadata>, Prisma__metadataClient<metadataGetPayload<T>>>

    /**
     * Update one Metadata.
     * @param {metadataUpdateArgs} args - Arguments to update one Metadata.
     * @example
     * // Update one Metadata
     * const metadata = await prisma.metadata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends metadataUpdateArgs>(
      args: SelectSubset<T, metadataUpdateArgs>
    ): CheckSelect<T, Prisma__metadataClient<metadata>, Prisma__metadataClient<metadataGetPayload<T>>>

    /**
     * Delete zero or more Metadata.
     * @param {metadataDeleteManyArgs} args - Arguments to filter Metadata to delete.
     * @example
     * // Delete a few Metadata
     * const { count } = await prisma.metadata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends metadataDeleteManyArgs>(
      args?: SelectSubset<T, metadataDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metadataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Metadata
     * const metadata = await prisma.metadata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends metadataUpdateManyArgs>(
      args: SelectSubset<T, metadataUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Metadata.
     * @param {metadataUpsertArgs} args - Arguments to update or create a Metadata.
     * @example
     * // Update or create a Metadata
     * const metadata = await prisma.metadata.upsert({
     *   create: {
     *     // ... data to create a Metadata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Metadata we want to update
     *   }
     * })
    **/
    upsert<T extends metadataUpsertArgs>(
      args: SelectSubset<T, metadataUpsertArgs>
    ): CheckSelect<T, Prisma__metadataClient<metadata>, Prisma__metadataClient<metadataGetPayload<T>>>

    /**
     * Find one Metadata that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {metadataFindUniqueOrThrowArgs} args - Arguments to find a Metadata
     * @example
     * // Get one Metadata
     * const metadata = await prisma.metadata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends metadataFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, metadataFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__metadataClient<metadata>, Prisma__metadataClient<metadataGetPayload<T>>>

    /**
     * Find the first Metadata that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metadataFindFirstOrThrowArgs} args - Arguments to find a Metadata
     * @example
     * // Get one Metadata
     * const metadata = await prisma.metadata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends metadataFindFirstOrThrowArgs>(
      args?: SelectSubset<T, metadataFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__metadataClient<metadata>, Prisma__metadataClient<metadataGetPayload<T>>>

    /**
     * Count the number of Metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {metadataCountArgs} args - Arguments to filter Metadata to count.
     * @example
     * // Count the number of Metadata
     * const count = await prisma.metadata.count({
     *   where: {
     *     // ... the filter for the Metadata we want to count
     *   }
     * })
    **/
    count<T extends metadataCountArgs>(
      args?: Subset<T, metadataCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetadataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetadataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MetadataAggregateArgs>(args: Subset<T, MetadataAggregateArgs>): PrismaPromise<GetMetadataAggregateType<T>>

    /**
     * Group by Metadata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetadataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MetadataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetadataGroupByArgs['orderBy'] }
        : { orderBy?: MetadataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MetadataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetadataGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for metadata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__metadataClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    acc<T extends accountsArgs = {}>(args?: Subset<T, accountsArgs>): CheckSelect<T, Prisma__accountsClient<accounts | Null>, Prisma__accountsClient<accountsGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * metadata base type for findUnique actions
   */
  export type metadataFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the metadata
     * 
    **/
    select?: metadataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: metadataInclude | null
    /**
     * Filter, which metadata to fetch.
     * 
    **/
    where: metadataWhereUniqueInput
  }

  /**
   * metadata: findUnique
   */
  export interface metadataFindUniqueArgs extends metadataFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * metadata base type for findFirst actions
   */
  export type metadataFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the metadata
     * 
    **/
    select?: metadataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: metadataInclude | null
    /**
     * Filter, which metadata to fetch.
     * 
    **/
    where?: metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of metadata to fetch.
     * 
    **/
    orderBy?: Enumerable<metadataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for metadata.
     * 
    **/
    cursor?: metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` metadata from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` metadata.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of metadata.
     * 
    **/
    distinct?: Enumerable<MetadataScalarFieldEnum>
  }

  /**
   * metadata: findFirst
   */
  export interface metadataFindFirstArgs extends metadataFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * metadata findMany
   */
  export type metadataFindManyArgs = {
    /**
     * Select specific fields to fetch from the metadata
     * 
    **/
    select?: metadataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: metadataInclude | null
    /**
     * Filter, which metadata to fetch.
     * 
    **/
    where?: metadataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of metadata to fetch.
     * 
    **/
    orderBy?: Enumerable<metadataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing metadata.
     * 
    **/
    cursor?: metadataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` metadata from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` metadata.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MetadataScalarFieldEnum>
  }


  /**
   * metadata create
   */
  export type metadataCreateArgs = {
    /**
     * Select specific fields to fetch from the metadata
     * 
    **/
    select?: metadataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: metadataInclude | null
    /**
     * The data needed to create a metadata.
     * 
    **/
    data: XOR<metadataCreateInput, metadataUncheckedCreateInput>
  }


  /**
   * metadata createMany
   */
  export type metadataCreateManyArgs = {
    /**
     * The data used to create many metadata.
     * 
    **/
    data: Enumerable<metadataCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * metadata update
   */
  export type metadataUpdateArgs = {
    /**
     * Select specific fields to fetch from the metadata
     * 
    **/
    select?: metadataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: metadataInclude | null
    /**
     * The data needed to update a metadata.
     * 
    **/
    data: XOR<metadataUpdateInput, metadataUncheckedUpdateInput>
    /**
     * Choose, which metadata to update.
     * 
    **/
    where: metadataWhereUniqueInput
  }


  /**
   * metadata updateMany
   */
  export type metadataUpdateManyArgs = {
    /**
     * The data used to update metadata.
     * 
    **/
    data: XOR<metadataUpdateManyMutationInput, metadataUncheckedUpdateManyInput>
    /**
     * Filter which metadata to update
     * 
    **/
    where?: metadataWhereInput
  }


  /**
   * metadata upsert
   */
  export type metadataUpsertArgs = {
    /**
     * Select specific fields to fetch from the metadata
     * 
    **/
    select?: metadataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: metadataInclude | null
    /**
     * The filter to search for the metadata to update in case it exists.
     * 
    **/
    where: metadataWhereUniqueInput
    /**
     * In case the metadata found by the `where` argument doesn't exist, create a new metadata with this data.
     * 
    **/
    create: XOR<metadataCreateInput, metadataUncheckedCreateInput>
    /**
     * In case the metadata was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<metadataUpdateInput, metadataUncheckedUpdateInput>
  }


  /**
   * metadata delete
   */
  export type metadataDeleteArgs = {
    /**
     * Select specific fields to fetch from the metadata
     * 
    **/
    select?: metadataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: metadataInclude | null
    /**
     * Filter which metadata to delete.
     * 
    **/
    where: metadataWhereUniqueInput
  }


  /**
   * metadata deleteMany
   */
  export type metadataDeleteManyArgs = {
    /**
     * Filter which metadata to delete
     * 
    **/
    where?: metadataWhereInput
  }


  /**
   * metadata: findUniqueOrThrow
   */
  export type metadataFindUniqueOrThrowArgs = metadataFindUniqueArgsBase
      

  /**
   * metadata: findFirstOrThrow
   */
  export type metadataFindFirstOrThrowArgs = metadataFindFirstArgsBase
      

  /**
   * metadata without action
   */
  export type metadataArgs = {
    /**
     * Select specific fields to fetch from the metadata
     * 
    **/
    select?: metadataSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: metadataInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AccountsScalarFieldEnum: {
    address: 'address',
    name: 'name',
    active: 'active'
  };

  export type AccountsScalarFieldEnum = (typeof AccountsScalarFieldEnum)[keyof typeof AccountsScalarFieldEnum]


  export const MetadataScalarFieldEnum: {
    account: 'account',
    key: 'key',
    value: 'value'
  };

  export type MetadataScalarFieldEnum = (typeof MetadataScalarFieldEnum)[keyof typeof MetadataScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  /**
   * Deep Input Types
   */


  export type accountsWhereInput = {
    AND?: Enumerable<accountsWhereInput>
    OR?: Enumerable<accountsWhereInput>
    NOT?: Enumerable<accountsWhereInput>
    address?: StringFilter | string
    name?: StringFilter | string
    active?: BoolFilter | boolean
    meta?: MetadataListRelationFilter
  }

  export type accountsOrderByWithRelationInput = {
    address?: SortOrder
    name?: SortOrder
    active?: SortOrder
    meta?: metadataOrderByRelationAggregateInput
  }

  export type accountsWhereUniqueInput = {
    address?: string
    name?: string
  }

  export type accountsOrderByWithAggregationInput = {
    address?: SortOrder
    name?: SortOrder
    active?: SortOrder
    _count?: accountsCountOrderByAggregateInput
    _max?: accountsMaxOrderByAggregateInput
    _min?: accountsMinOrderByAggregateInput
  }

  export type accountsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<accountsScalarWhereWithAggregatesInput>
    OR?: Enumerable<accountsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<accountsScalarWhereWithAggregatesInput>
    address?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    active?: BoolWithAggregatesFilter | boolean
  }

  export type metadataWhereInput = {
    AND?: Enumerable<metadataWhereInput>
    OR?: Enumerable<metadataWhereInput>
    NOT?: Enumerable<metadataWhereInput>
    account?: StringFilter | string
    key?: StringFilter | string
    value?: StringFilter | string
    acc?: XOR<AccountsRelationFilter, accountsWhereInput> | null
  }

  export type metadataOrderByWithRelationInput = {
    account?: SortOrder
    key?: SortOrder
    value?: SortOrder
    acc?: accountsOrderByWithRelationInput
  }

  export type metadataWhereUniqueInput = {
    account_key?: metadataAccountKeyCompoundUniqueInput
  }

  export type metadataOrderByWithAggregationInput = {
    account?: SortOrder
    key?: SortOrder
    value?: SortOrder
    _count?: metadataCountOrderByAggregateInput
    _max?: metadataMaxOrderByAggregateInput
    _min?: metadataMinOrderByAggregateInput
  }

  export type metadataScalarWhereWithAggregatesInput = {
    AND?: Enumerable<metadataScalarWhereWithAggregatesInput>
    OR?: Enumerable<metadataScalarWhereWithAggregatesInput>
    NOT?: Enumerable<metadataScalarWhereWithAggregatesInput>
    account?: StringWithAggregatesFilter | string
    key?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
  }

  export type accountsCreateInput = {
    address: string
    name: string
    active?: boolean
    meta?: metadataCreateNestedManyWithoutAccInput
  }

  export type accountsUncheckedCreateInput = {
    address: string
    name: string
    active?: boolean
    meta?: metadataUncheckedCreateNestedManyWithoutAccInput
  }

  export type accountsUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    meta?: metadataUpdateManyWithoutAccNestedInput
  }

  export type accountsUncheckedUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    meta?: metadataUncheckedUpdateManyWithoutAccNestedInput
  }

  export type accountsCreateManyInput = {
    address: string
    name: string
    active?: boolean
  }

  export type accountsUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type accountsUncheckedUpdateManyInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type metadataCreateInput = {
    key: string
    value: string
    acc?: accountsCreateNestedOneWithoutMetaInput
  }

  export type metadataUncheckedCreateInput = {
    account: string
    key: string
    value: string
  }

  export type metadataUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    acc?: accountsUpdateOneWithoutMetaNestedInput
  }

  export type metadataUncheckedUpdateInput = {
    account?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type metadataCreateManyInput = {
    account: string
    key: string
    value: string
  }

  export type metadataUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type metadataUncheckedUpdateManyInput = {
    account?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type MetadataListRelationFilter = {
    every?: metadataWhereInput
    some?: metadataWhereInput
    none?: metadataWhereInput
  }

  export type metadataOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type accountsCountOrderByAggregateInput = {
    address?: SortOrder
    name?: SortOrder
    active?: SortOrder
  }

  export type accountsMaxOrderByAggregateInput = {
    address?: SortOrder
    name?: SortOrder
    active?: SortOrder
  }

  export type accountsMinOrderByAggregateInput = {
    address?: SortOrder
    name?: SortOrder
    active?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type AccountsRelationFilter = {
    is?: accountsWhereInput | null
    isNot?: accountsWhereInput | null
  }

  export type metadataAccountKeyCompoundUniqueInput = {
    account: string
    key: string
  }

  export type metadataCountOrderByAggregateInput = {
    account?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type metadataMaxOrderByAggregateInput = {
    account?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type metadataMinOrderByAggregateInput = {
    account?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type metadataCreateNestedManyWithoutAccInput = {
    create?: XOR<Enumerable<metadataCreateWithoutAccInput>, Enumerable<metadataUncheckedCreateWithoutAccInput>>
    connectOrCreate?: Enumerable<metadataCreateOrConnectWithoutAccInput>
    createMany?: metadataCreateManyAccInputEnvelope
    connect?: Enumerable<metadataWhereUniqueInput>
  }

  export type metadataUncheckedCreateNestedManyWithoutAccInput = {
    create?: XOR<Enumerable<metadataCreateWithoutAccInput>, Enumerable<metadataUncheckedCreateWithoutAccInput>>
    connectOrCreate?: Enumerable<metadataCreateOrConnectWithoutAccInput>
    createMany?: metadataCreateManyAccInputEnvelope
    connect?: Enumerable<metadataWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type metadataUpdateManyWithoutAccNestedInput = {
    create?: XOR<Enumerable<metadataCreateWithoutAccInput>, Enumerable<metadataUncheckedCreateWithoutAccInput>>
    connectOrCreate?: Enumerable<metadataCreateOrConnectWithoutAccInput>
    upsert?: Enumerable<metadataUpsertWithWhereUniqueWithoutAccInput>
    createMany?: metadataCreateManyAccInputEnvelope
    set?: Enumerable<metadataWhereUniqueInput>
    disconnect?: Enumerable<metadataWhereUniqueInput>
    delete?: Enumerable<metadataWhereUniqueInput>
    connect?: Enumerable<metadataWhereUniqueInput>
    update?: Enumerable<metadataUpdateWithWhereUniqueWithoutAccInput>
    updateMany?: Enumerable<metadataUpdateManyWithWhereWithoutAccInput>
    deleteMany?: Enumerable<metadataScalarWhereInput>
  }

  export type metadataUncheckedUpdateManyWithoutAccNestedInput = {
    create?: XOR<Enumerable<metadataCreateWithoutAccInput>, Enumerable<metadataUncheckedCreateWithoutAccInput>>
    connectOrCreate?: Enumerable<metadataCreateOrConnectWithoutAccInput>
    upsert?: Enumerable<metadataUpsertWithWhereUniqueWithoutAccInput>
    createMany?: metadataCreateManyAccInputEnvelope
    set?: Enumerable<metadataWhereUniqueInput>
    disconnect?: Enumerable<metadataWhereUniqueInput>
    delete?: Enumerable<metadataWhereUniqueInput>
    connect?: Enumerable<metadataWhereUniqueInput>
    update?: Enumerable<metadataUpdateWithWhereUniqueWithoutAccInput>
    updateMany?: Enumerable<metadataUpdateManyWithWhereWithoutAccInput>
    deleteMany?: Enumerable<metadataScalarWhereInput>
  }

  export type accountsCreateNestedOneWithoutMetaInput = {
    create?: XOR<accountsCreateWithoutMetaInput, accountsUncheckedCreateWithoutMetaInput>
    connectOrCreate?: accountsCreateOrConnectWithoutMetaInput
    connect?: accountsWhereUniqueInput
  }

  export type accountsUpdateOneWithoutMetaNestedInput = {
    create?: XOR<accountsCreateWithoutMetaInput, accountsUncheckedCreateWithoutMetaInput>
    connectOrCreate?: accountsCreateOrConnectWithoutMetaInput
    upsert?: accountsUpsertWithoutMetaInput
    disconnect?: boolean
    delete?: boolean
    connect?: accountsWhereUniqueInput
    update?: XOR<accountsUpdateWithoutMetaInput, accountsUncheckedUpdateWithoutMetaInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type metadataCreateWithoutAccInput = {
    key: string
    value: string
  }

  export type metadataUncheckedCreateWithoutAccInput = {
    key: string
    value: string
  }

  export type metadataCreateOrConnectWithoutAccInput = {
    where: metadataWhereUniqueInput
    create: XOR<metadataCreateWithoutAccInput, metadataUncheckedCreateWithoutAccInput>
  }

  export type metadataCreateManyAccInputEnvelope = {
    data: Enumerable<metadataCreateManyAccInput>
    skipDuplicates?: boolean
  }

  export type metadataUpsertWithWhereUniqueWithoutAccInput = {
    where: metadataWhereUniqueInput
    update: XOR<metadataUpdateWithoutAccInput, metadataUncheckedUpdateWithoutAccInput>
    create: XOR<metadataCreateWithoutAccInput, metadataUncheckedCreateWithoutAccInput>
  }

  export type metadataUpdateWithWhereUniqueWithoutAccInput = {
    where: metadataWhereUniqueInput
    data: XOR<metadataUpdateWithoutAccInput, metadataUncheckedUpdateWithoutAccInput>
  }

  export type metadataUpdateManyWithWhereWithoutAccInput = {
    where: metadataScalarWhereInput
    data: XOR<metadataUpdateManyMutationInput, metadataUncheckedUpdateManyWithoutMetaInput>
  }

  export type metadataScalarWhereInput = {
    AND?: Enumerable<metadataScalarWhereInput>
    OR?: Enumerable<metadataScalarWhereInput>
    NOT?: Enumerable<metadataScalarWhereInput>
    account?: StringFilter | string
    key?: StringFilter | string
    value?: StringFilter | string
  }

  export type accountsCreateWithoutMetaInput = {
    address: string
    name: string
    active?: boolean
  }

  export type accountsUncheckedCreateWithoutMetaInput = {
    address: string
    name: string
    active?: boolean
  }

  export type accountsCreateOrConnectWithoutMetaInput = {
    where: accountsWhereUniqueInput
    create: XOR<accountsCreateWithoutMetaInput, accountsUncheckedCreateWithoutMetaInput>
  }

  export type accountsUpsertWithoutMetaInput = {
    update: XOR<accountsUpdateWithoutMetaInput, accountsUncheckedUpdateWithoutMetaInput>
    create: XOR<accountsCreateWithoutMetaInput, accountsUncheckedCreateWithoutMetaInput>
  }

  export type accountsUpdateWithoutMetaInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type accountsUncheckedUpdateWithoutMetaInput = {
    address?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type metadataCreateManyAccInput = {
    key: string
    value: string
  }

  export type metadataUpdateWithoutAccInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type metadataUncheckedUpdateWithoutAccInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type metadataUncheckedUpdateManyWithoutMetaInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}