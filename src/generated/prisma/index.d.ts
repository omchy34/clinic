
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Clinic
 * 
 */
export type Clinic = $Result.DefaultSelection<Prisma.$ClinicPayload>
/**
 * Model Doctor
 * 
 */
export type Doctor = $Result.DefaultSelection<Prisma.$DoctorPayload>
/**
 * Model DoctorSchedule
 * 
 */
export type DoctorSchedule = $Result.DefaultSelection<Prisma.$DoctorSchedulePayload>
/**
 * Model DoctorSession
 * 
 */
export type DoctorSession = $Result.DefaultSelection<Prisma.$DoctorSessionPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BookingStatus: {
  CONFIRMED: 'CONFIRMED',
  SERVING: 'SERVING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const QueueStatus: {
  NOT_STARTED: 'NOT_STARTED',
  ACTIVE: 'ACTIVE',
  ENDED: 'ENDED'
};

export type QueueStatus = (typeof QueueStatus)[keyof typeof QueueStatus]


export const Weekday: {
  MON: 'MON',
  TUE: 'TUE',
  WED: 'WED',
  THU: 'THU',
  FRI: 'FRI',
  SAT: 'SAT',
  SUN: 'SUN'
};

export type Weekday = (typeof Weekday)[keyof typeof Weekday]

}

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type QueueStatus = $Enums.QueueStatus

export const QueueStatus: typeof $Enums.QueueStatus

export type Weekday = $Enums.Weekday

export const Weekday: typeof $Enums.Weekday

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinic`: Exposes CRUD operations for the **Clinic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clinics
    * const clinics = await prisma.clinic.findMany()
    * ```
    */
  get clinic(): Prisma.ClinicDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctor`: Exposes CRUD operations for the **Doctor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Doctors
    * const doctors = await prisma.doctor.findMany()
    * ```
    */
  get doctor(): Prisma.DoctorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctorSchedule`: Exposes CRUD operations for the **DoctorSchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DoctorSchedules
    * const doctorSchedules = await prisma.doctorSchedule.findMany()
    * ```
    */
  get doctorSchedule(): Prisma.DoctorScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctorSession`: Exposes CRUD operations for the **DoctorSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DoctorSessions
    * const doctorSessions = await prisma.doctorSession.findMany()
    * ```
    */
  get doctorSession(): Prisma.DoctorSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Clinic: 'Clinic',
    Doctor: 'Doctor',
    DoctorSchedule: 'DoctorSchedule',
    DoctorSession: 'DoctorSession',
    Booking: 'Booking'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "clinic" | "doctor" | "doctorSchedule" | "doctorSession" | "booking"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Clinic: {
        payload: Prisma.$ClinicPayload<ExtArgs>
        fields: Prisma.ClinicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          findFirst: {
            args: Prisma.ClinicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          findMany: {
            args: Prisma.ClinicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          create: {
            args: Prisma.ClinicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          createMany: {
            args: Prisma.ClinicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          delete: {
            args: Prisma.ClinicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          update: {
            args: Prisma.ClinicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          deleteMany: {
            args: Prisma.ClinicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          upsert: {
            args: Prisma.ClinicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          aggregate: {
            args: Prisma.ClinicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinic>
          }
          groupBy: {
            args: Prisma.ClinicGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicCountAggregateOutputType> | number
          }
        }
      }
      Doctor: {
        payload: Prisma.$DoctorPayload<ExtArgs>
        fields: Prisma.DoctorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findFirst: {
            args: Prisma.DoctorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findMany: {
            args: Prisma.DoctorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          create: {
            args: Prisma.DoctorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          createMany: {
            args: Prisma.DoctorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          delete: {
            args: Prisma.DoctorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          update: {
            args: Prisma.DoctorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          deleteMany: {
            args: Prisma.DoctorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          upsert: {
            args: Prisma.DoctorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          aggregate: {
            args: Prisma.DoctorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctor>
          }
          groupBy: {
            args: Prisma.DoctorGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorCountAggregateOutputType> | number
          }
        }
      }
      DoctorSchedule: {
        payload: Prisma.$DoctorSchedulePayload<ExtArgs>
        fields: Prisma.DoctorScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>
          }
          findFirst: {
            args: Prisma.DoctorScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>
          }
          findMany: {
            args: Prisma.DoctorScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>[]
          }
          create: {
            args: Prisma.DoctorScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>
          }
          createMany: {
            args: Prisma.DoctorScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>[]
          }
          delete: {
            args: Prisma.DoctorScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>
          }
          update: {
            args: Prisma.DoctorScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>
          }
          deleteMany: {
            args: Prisma.DoctorScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>[]
          }
          upsert: {
            args: Prisma.DoctorScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSchedulePayload>
          }
          aggregate: {
            args: Prisma.DoctorScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctorSchedule>
          }
          groupBy: {
            args: Prisma.DoctorScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorScheduleCountAggregateOutputType> | number
          }
        }
      }
      DoctorSession: {
        payload: Prisma.$DoctorSessionPayload<ExtArgs>
        fields: Prisma.DoctorSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload>
          }
          findFirst: {
            args: Prisma.DoctorSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload>
          }
          findMany: {
            args: Prisma.DoctorSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload>[]
          }
          create: {
            args: Prisma.DoctorSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload>
          }
          createMany: {
            args: Prisma.DoctorSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload>[]
          }
          delete: {
            args: Prisma.DoctorSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload>
          }
          update: {
            args: Prisma.DoctorSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload>
          }
          deleteMany: {
            args: Prisma.DoctorSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload>[]
          }
          upsert: {
            args: Prisma.DoctorSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorSessionPayload>
          }
          aggregate: {
            args: Prisma.DoctorSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctorSession>
          }
          groupBy: {
            args: Prisma.DoctorSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorSessionCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorSessionCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    clinic?: ClinicOmit
    doctor?: DoctorOmit
    doctorSchedule?: DoctorScheduleOmit
    doctorSession?: DoctorSessionOmit
    booking?: BookingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    bookings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type ClinicCountOutputType
   */

  export type ClinicCountOutputType = {
    doctors: number
    bookings: number
  }

  export type ClinicCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctors?: boolean | ClinicCountOutputTypeCountDoctorsArgs
    bookings?: boolean | ClinicCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCountOutputType
     */
    select?: ClinicCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountDoctorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorWhereInput
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type DoctorCountOutputType
   */

  export type DoctorCountOutputType = {
    schedules: number
    sessions: number
  }

  export type DoctorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | DoctorCountOutputTypeCountSchedulesArgs
    sessions?: boolean | DoctorCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorCountOutputType
     */
    select?: DoctorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorScheduleWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorSessionWhereInput
  }


  /**
   * Count Type DoctorSessionCountOutputType
   */

  export type DoctorSessionCountOutputType = {
    bookings: number
  }

  export type DoctorSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | DoctorSessionCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * DoctorSessionCountOutputType without action
   */
  export type DoctorSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSessionCountOutputType
     */
    select?: DoctorSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DoctorSessionCountOutputType without action
   */
  export type DoctorSessionCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    image: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    image: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    image: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    image: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    createdAt?: boolean
    clinic?: boolean | User$clinicArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "image" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | User$clinicArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs> | null
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      image: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends User$clinicArgs<ExtArgs> = {}>(args?: Subset<T, User$clinicArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    bookings<T extends User$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.clinic
   */
  export type User$clinicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    where?: ClinicWhereInput
  }

  /**
   * User.bookings
   */
  export type User$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Clinic
   */

  export type AggregateClinic = {
    _count: ClinicCountAggregateOutputType | null
    _min: ClinicMinAggregateOutputType | null
    _max: ClinicMaxAggregateOutputType | null
  }

  export type ClinicMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    city: string | null
    email: string | null
    phone: string | null
    logo: string | null
    isApproved: boolean | null
    timezone: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type ClinicMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    city: string | null
    email: string | null
    phone: string | null
    logo: string | null
    isApproved: boolean | null
    timezone: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type ClinicCountAggregateOutputType = {
    id: number
    name: number
    address: number
    city: number
    email: number
    phone: number
    logo: number
    clinicImage: number
    isApproved: number
    timezone: number
    userId: number
    createdAt: number
    _all: number
  }


  export type ClinicMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    city?: true
    email?: true
    phone?: true
    logo?: true
    isApproved?: true
    timezone?: true
    userId?: true
    createdAt?: true
  }

  export type ClinicMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    city?: true
    email?: true
    phone?: true
    logo?: true
    isApproved?: true
    timezone?: true
    userId?: true
    createdAt?: true
  }

  export type ClinicCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    city?: true
    email?: true
    phone?: true
    logo?: true
    clinicImage?: true
    isApproved?: true
    timezone?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type ClinicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinic to aggregate.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clinics
    **/
    _count?: true | ClinicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicMaxAggregateInputType
  }

  export type GetClinicAggregateType<T extends ClinicAggregateArgs> = {
        [P in keyof T & keyof AggregateClinic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinic[P]>
      : GetScalarType<T[P], AggregateClinic[P]>
  }




  export type ClinicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicWhereInput
    orderBy?: ClinicOrderByWithAggregationInput | ClinicOrderByWithAggregationInput[]
    by: ClinicScalarFieldEnum[] | ClinicScalarFieldEnum
    having?: ClinicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicCountAggregateInputType | true
    _min?: ClinicMinAggregateInputType
    _max?: ClinicMaxAggregateInputType
  }

  export type ClinicGroupByOutputType = {
    id: string
    name: string
    address: string
    city: string
    email: string
    phone: string
    logo: string | null
    clinicImage: string[]
    isApproved: boolean
    timezone: string
    userId: string
    createdAt: Date
    _count: ClinicCountAggregateOutputType | null
    _min: ClinicMinAggregateOutputType | null
    _max: ClinicMaxAggregateOutputType | null
  }

  type GetClinicGroupByPayload<T extends ClinicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicGroupByOutputType[P]>
        }
      >
    >


  export type ClinicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    email?: boolean
    phone?: boolean
    logo?: boolean
    clinicImage?: boolean
    isApproved?: boolean
    timezone?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    doctors?: boolean | Clinic$doctorsArgs<ExtArgs>
    bookings?: boolean | Clinic$bookingsArgs<ExtArgs>
    _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    email?: boolean
    phone?: boolean
    logo?: boolean
    clinicImage?: boolean
    isApproved?: boolean
    timezone?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    email?: boolean
    phone?: boolean
    logo?: boolean
    clinicImage?: boolean
    isApproved?: boolean
    timezone?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    email?: boolean
    phone?: boolean
    logo?: boolean
    clinicImage?: boolean
    isApproved?: boolean
    timezone?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type ClinicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "city" | "email" | "phone" | "logo" | "clinicImage" | "isApproved" | "timezone" | "userId" | "createdAt", ExtArgs["result"]["clinic"]>
  export type ClinicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    doctors?: boolean | Clinic$doctorsArgs<ExtArgs>
    bookings?: boolean | Clinic$bookingsArgs<ExtArgs>
    _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClinicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClinicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClinicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Clinic"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      doctors: Prisma.$DoctorPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string
      city: string
      email: string
      phone: string
      logo: string | null
      clinicImage: string[]
      isApproved: boolean
      timezone: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["clinic"]>
    composites: {}
  }

  type ClinicGetPayload<S extends boolean | null | undefined | ClinicDefaultArgs> = $Result.GetResult<Prisma.$ClinicPayload, S>

  type ClinicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicCountAggregateInputType | true
    }

  export interface ClinicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Clinic'], meta: { name: 'Clinic' } }
    /**
     * Find zero or one Clinic that matches the filter.
     * @param {ClinicFindUniqueArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicFindUniqueArgs>(args: SelectSubset<T, ClinicFindUniqueArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clinic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicFindUniqueOrThrowArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindFirstArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicFindFirstArgs>(args?: SelectSubset<T, ClinicFindFirstArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindFirstOrThrowArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clinics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clinics
     * const clinics = await prisma.clinic.findMany()
     * 
     * // Get first 10 Clinics
     * const clinics = await prisma.clinic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicWithIdOnly = await prisma.clinic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicFindManyArgs>(args?: SelectSubset<T, ClinicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clinic.
     * @param {ClinicCreateArgs} args - Arguments to create a Clinic.
     * @example
     * // Create one Clinic
     * const Clinic = await prisma.clinic.create({
     *   data: {
     *     // ... data to create a Clinic
     *   }
     * })
     * 
     */
    create<T extends ClinicCreateArgs>(args: SelectSubset<T, ClinicCreateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clinics.
     * @param {ClinicCreateManyArgs} args - Arguments to create many Clinics.
     * @example
     * // Create many Clinics
     * const clinic = await prisma.clinic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicCreateManyArgs>(args?: SelectSubset<T, ClinicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clinics and returns the data saved in the database.
     * @param {ClinicCreateManyAndReturnArgs} args - Arguments to create many Clinics.
     * @example
     * // Create many Clinics
     * const clinic = await prisma.clinic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clinics and only return the `id`
     * const clinicWithIdOnly = await prisma.clinic.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Clinic.
     * @param {ClinicDeleteArgs} args - Arguments to delete one Clinic.
     * @example
     * // Delete one Clinic
     * const Clinic = await prisma.clinic.delete({
     *   where: {
     *     // ... filter to delete one Clinic
     *   }
     * })
     * 
     */
    delete<T extends ClinicDeleteArgs>(args: SelectSubset<T, ClinicDeleteArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clinic.
     * @param {ClinicUpdateArgs} args - Arguments to update one Clinic.
     * @example
     * // Update one Clinic
     * const clinic = await prisma.clinic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicUpdateArgs>(args: SelectSubset<T, ClinicUpdateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clinics.
     * @param {ClinicDeleteManyArgs} args - Arguments to filter Clinics to delete.
     * @example
     * // Delete a few Clinics
     * const { count } = await prisma.clinic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicDeleteManyArgs>(args?: SelectSubset<T, ClinicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clinics
     * const clinic = await prisma.clinic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicUpdateManyArgs>(args: SelectSubset<T, ClinicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinics and returns the data updated in the database.
     * @param {ClinicUpdateManyAndReturnArgs} args - Arguments to update many Clinics.
     * @example
     * // Update many Clinics
     * const clinic = await prisma.clinic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clinics and only return the `id`
     * const clinicWithIdOnly = await prisma.clinic.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClinicUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Clinic.
     * @param {ClinicUpsertArgs} args - Arguments to update or create a Clinic.
     * @example
     * // Update or create a Clinic
     * const clinic = await prisma.clinic.upsert({
     *   create: {
     *     // ... data to create a Clinic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clinic we want to update
     *   }
     * })
     */
    upsert<T extends ClinicUpsertArgs>(args: SelectSubset<T, ClinicUpsertArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCountArgs} args - Arguments to filter Clinics to count.
     * @example
     * // Count the number of Clinics
     * const count = await prisma.clinic.count({
     *   where: {
     *     // ... the filter for the Clinics we want to count
     *   }
     * })
    **/
    count<T extends ClinicCountArgs>(
      args?: Subset<T, ClinicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClinicAggregateArgs>(args: Subset<T, ClinicAggregateArgs>): Prisma.PrismaPromise<GetClinicAggregateType<T>>

    /**
     * Group by Clinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicGroupByArgs} args - Group by arguments.
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
      T extends ClinicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicGroupByArgs['orderBy'] }
        : { orderBy?: ClinicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ClinicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Clinic model
   */
  readonly fields: ClinicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Clinic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    doctors<T extends Clinic$doctorsArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$doctorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookings<T extends Clinic$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Clinic model
   */
  interface ClinicFieldRefs {
    readonly id: FieldRef<"Clinic", 'String'>
    readonly name: FieldRef<"Clinic", 'String'>
    readonly address: FieldRef<"Clinic", 'String'>
    readonly city: FieldRef<"Clinic", 'String'>
    readonly email: FieldRef<"Clinic", 'String'>
    readonly phone: FieldRef<"Clinic", 'String'>
    readonly logo: FieldRef<"Clinic", 'String'>
    readonly clinicImage: FieldRef<"Clinic", 'String[]'>
    readonly isApproved: FieldRef<"Clinic", 'Boolean'>
    readonly timezone: FieldRef<"Clinic", 'String'>
    readonly userId: FieldRef<"Clinic", 'String'>
    readonly createdAt: FieldRef<"Clinic", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Clinic findUnique
   */
  export type ClinicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic findUniqueOrThrow
   */
  export type ClinicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic findFirst
   */
  export type ClinicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic findFirstOrThrow
   */
  export type ClinicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic findMany
   */
  export type ClinicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinics to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic create
   */
  export type ClinicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The data needed to create a Clinic.
     */
    data: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
  }

  /**
   * Clinic createMany
   */
  export type ClinicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clinics.
     */
    data: ClinicCreateManyInput | ClinicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clinic createManyAndReturn
   */
  export type ClinicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * The data used to create many Clinics.
     */
    data: ClinicCreateManyInput | ClinicCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Clinic update
   */
  export type ClinicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The data needed to update a Clinic.
     */
    data: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
    /**
     * Choose, which Clinic to update.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic updateMany
   */
  export type ClinicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clinics.
     */
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
    /**
     * Filter which Clinics to update
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to update.
     */
    limit?: number
  }

  /**
   * Clinic updateManyAndReturn
   */
  export type ClinicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * The data used to update Clinics.
     */
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
    /**
     * Filter which Clinics to update
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Clinic upsert
   */
  export type ClinicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The filter to search for the Clinic to update in case it exists.
     */
    where: ClinicWhereUniqueInput
    /**
     * In case the Clinic found by the `where` argument doesn't exist, create a new Clinic with this data.
     */
    create: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
    /**
     * In case the Clinic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
  }

  /**
   * Clinic delete
   */
  export type ClinicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter which Clinic to delete.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic deleteMany
   */
  export type ClinicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinics to delete
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to delete.
     */
    limit?: number
  }

  /**
   * Clinic.doctors
   */
  export type Clinic$doctorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    where?: DoctorWhereInput
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    cursor?: DoctorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Clinic.bookings
   */
  export type Clinic$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Clinic without action
   */
  export type ClinicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
  }


  /**
   * Model Doctor
   */

  export type AggregateDoctor = {
    _count: DoctorCountAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  export type DoctorMinAggregateOutputType = {
    id: string | null
    name: string | null
    image: string | null
    description: string | null
    isActive: boolean | null
    specialtySlug: string | null
    clinicId: string | null
    createdAt: Date | null
  }

  export type DoctorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    image: string | null
    description: string | null
    isActive: boolean | null
    specialtySlug: string | null
    clinicId: string | null
    createdAt: Date | null
  }

  export type DoctorCountAggregateOutputType = {
    id: number
    name: number
    image: number
    description: number
    isActive: number
    specialtySlug: number
    clinicId: number
    createdAt: number
    _all: number
  }


  export type DoctorMinAggregateInputType = {
    id?: true
    name?: true
    image?: true
    description?: true
    isActive?: true
    specialtySlug?: true
    clinicId?: true
    createdAt?: true
  }

  export type DoctorMaxAggregateInputType = {
    id?: true
    name?: true
    image?: true
    description?: true
    isActive?: true
    specialtySlug?: true
    clinicId?: true
    createdAt?: true
  }

  export type DoctorCountAggregateInputType = {
    id?: true
    name?: true
    image?: true
    description?: true
    isActive?: true
    specialtySlug?: true
    clinicId?: true
    createdAt?: true
    _all?: true
  }

  export type DoctorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctor to aggregate.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Doctors
    **/
    _count?: true | DoctorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorMaxAggregateInputType
  }

  export type GetDoctorAggregateType<T extends DoctorAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctor[P]>
      : GetScalarType<T[P], AggregateDoctor[P]>
  }




  export type DoctorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorWhereInput
    orderBy?: DoctorOrderByWithAggregationInput | DoctorOrderByWithAggregationInput[]
    by: DoctorScalarFieldEnum[] | DoctorScalarFieldEnum
    having?: DoctorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorCountAggregateInputType | true
    _min?: DoctorMinAggregateInputType
    _max?: DoctorMaxAggregateInputType
  }

  export type DoctorGroupByOutputType = {
    id: string
    name: string
    image: string | null
    description: string | null
    isActive: boolean
    specialtySlug: string
    clinicId: string
    createdAt: Date
    _count: DoctorCountAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  type GetDoctorGroupByPayload<T extends DoctorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorGroupByOutputType[P]>
        }
      >
    >


  export type DoctorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    description?: boolean
    isActive?: boolean
    specialtySlug?: boolean
    clinicId?: boolean
    createdAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    schedules?: boolean | Doctor$schedulesArgs<ExtArgs>
    sessions?: boolean | Doctor$sessionsArgs<ExtArgs>
    _count?: boolean | DoctorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    description?: boolean
    isActive?: boolean
    specialtySlug?: boolean
    clinicId?: boolean
    createdAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    description?: boolean
    isActive?: boolean
    specialtySlug?: boolean
    clinicId?: boolean
    createdAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectScalar = {
    id?: boolean
    name?: boolean
    image?: boolean
    description?: boolean
    isActive?: boolean
    specialtySlug?: boolean
    clinicId?: boolean
    createdAt?: boolean
  }

  export type DoctorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "image" | "description" | "isActive" | "specialtySlug" | "clinicId" | "createdAt", ExtArgs["result"]["doctor"]>
  export type DoctorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    schedules?: boolean | Doctor$schedulesArgs<ExtArgs>
    sessions?: boolean | Doctor$sessionsArgs<ExtArgs>
    _count?: boolean | DoctorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DoctorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }
  export type DoctorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
  }

  export type $DoctorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Doctor"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs>
      schedules: Prisma.$DoctorSchedulePayload<ExtArgs>[]
      sessions: Prisma.$DoctorSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      image: string | null
      description: string | null
      isActive: boolean
      specialtySlug: string
      clinicId: string
      createdAt: Date
    }, ExtArgs["result"]["doctor"]>
    composites: {}
  }

  type DoctorGetPayload<S extends boolean | null | undefined | DoctorDefaultArgs> = $Result.GetResult<Prisma.$DoctorPayload, S>

  type DoctorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorCountAggregateInputType | true
    }

  export interface DoctorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Doctor'], meta: { name: 'Doctor' } }
    /**
     * Find zero or one Doctor that matches the filter.
     * @param {DoctorFindUniqueArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorFindUniqueArgs>(args: SelectSubset<T, DoctorFindUniqueArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Doctor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorFindUniqueOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorFindFirstArgs>(args?: SelectSubset<T, DoctorFindFirstArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Doctors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doctors
     * const doctors = await prisma.doctor.findMany()
     * 
     * // Get first 10 Doctors
     * const doctors = await prisma.doctor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorWithIdOnly = await prisma.doctor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorFindManyArgs>(args?: SelectSubset<T, DoctorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Doctor.
     * @param {DoctorCreateArgs} args - Arguments to create a Doctor.
     * @example
     * // Create one Doctor
     * const Doctor = await prisma.doctor.create({
     *   data: {
     *     // ... data to create a Doctor
     *   }
     * })
     * 
     */
    create<T extends DoctorCreateArgs>(args: SelectSubset<T, DoctorCreateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Doctors.
     * @param {DoctorCreateManyArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorCreateManyArgs>(args?: SelectSubset<T, DoctorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Doctors and returns the data saved in the database.
     * @param {DoctorCreateManyAndReturnArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Doctor.
     * @param {DoctorDeleteArgs} args - Arguments to delete one Doctor.
     * @example
     * // Delete one Doctor
     * const Doctor = await prisma.doctor.delete({
     *   where: {
     *     // ... filter to delete one Doctor
     *   }
     * })
     * 
     */
    delete<T extends DoctorDeleteArgs>(args: SelectSubset<T, DoctorDeleteArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Doctor.
     * @param {DoctorUpdateArgs} args - Arguments to update one Doctor.
     * @example
     * // Update one Doctor
     * const doctor = await prisma.doctor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorUpdateArgs>(args: SelectSubset<T, DoctorUpdateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Doctors.
     * @param {DoctorDeleteManyArgs} args - Arguments to filter Doctors to delete.
     * @example
     * // Delete a few Doctors
     * const { count } = await prisma.doctor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorDeleteManyArgs>(args?: SelectSubset<T, DoctorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorUpdateManyArgs>(args: SelectSubset<T, DoctorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors and returns the data updated in the database.
     * @param {DoctorUpdateManyAndReturnArgs} args - Arguments to update many Doctors.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Doctor.
     * @param {DoctorUpsertArgs} args - Arguments to update or create a Doctor.
     * @example
     * // Update or create a Doctor
     * const doctor = await prisma.doctor.upsert({
     *   create: {
     *     // ... data to create a Doctor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doctor we want to update
     *   }
     * })
     */
    upsert<T extends DoctorUpsertArgs>(args: SelectSubset<T, DoctorUpsertArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorCountArgs} args - Arguments to filter Doctors to count.
     * @example
     * // Count the number of Doctors
     * const count = await prisma.doctor.count({
     *   where: {
     *     // ... the filter for the Doctors we want to count
     *   }
     * })
    **/
    count<T extends DoctorCountArgs>(
      args?: Subset<T, DoctorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DoctorAggregateArgs>(args: Subset<T, DoctorAggregateArgs>): Prisma.PrismaPromise<GetDoctorAggregateType<T>>

    /**
     * Group by Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorGroupByArgs} args - Group by arguments.
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
      T extends DoctorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorGroupByArgs['orderBy'] }
        : { orderBy?: DoctorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, DoctorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Doctor model
   */
  readonly fields: DoctorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Doctor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    schedules<T extends Doctor$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends Doctor$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Doctor model
   */
  interface DoctorFieldRefs {
    readonly id: FieldRef<"Doctor", 'String'>
    readonly name: FieldRef<"Doctor", 'String'>
    readonly image: FieldRef<"Doctor", 'String'>
    readonly description: FieldRef<"Doctor", 'String'>
    readonly isActive: FieldRef<"Doctor", 'Boolean'>
    readonly specialtySlug: FieldRef<"Doctor", 'String'>
    readonly clinicId: FieldRef<"Doctor", 'String'>
    readonly createdAt: FieldRef<"Doctor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Doctor findUnique
   */
  export type DoctorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findUniqueOrThrow
   */
  export type DoctorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findFirst
   */
  export type DoctorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findFirstOrThrow
   */
  export type DoctorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findMany
   */
  export type DoctorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctors to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor create
   */
  export type DoctorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to create a Doctor.
     */
    data: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
  }

  /**
   * Doctor createMany
   */
  export type DoctorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Doctor createManyAndReturn
   */
  export type DoctorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctor update
   */
  export type DoctorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to update a Doctor.
     */
    data: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
    /**
     * Choose, which Doctor to update.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor updateMany
   */
  export type DoctorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to update.
     */
    limit?: number
  }

  /**
   * Doctor updateManyAndReturn
   */
  export type DoctorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctor upsert
   */
  export type DoctorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The filter to search for the Doctor to update in case it exists.
     */
    where: DoctorWhereUniqueInput
    /**
     * In case the Doctor found by the `where` argument doesn't exist, create a new Doctor with this data.
     */
    create: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
    /**
     * In case the Doctor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
  }

  /**
   * Doctor delete
   */
  export type DoctorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter which Doctor to delete.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor deleteMany
   */
  export type DoctorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctors to delete
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to delete.
     */
    limit?: number
  }

  /**
   * Doctor.schedules
   */
  export type Doctor$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
    where?: DoctorScheduleWhereInput
    orderBy?: DoctorScheduleOrderByWithRelationInput | DoctorScheduleOrderByWithRelationInput[]
    cursor?: DoctorScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorScheduleScalarFieldEnum | DoctorScheduleScalarFieldEnum[]
  }

  /**
   * Doctor.sessions
   */
  export type Doctor$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    where?: DoctorSessionWhereInput
    orderBy?: DoctorSessionOrderByWithRelationInput | DoctorSessionOrderByWithRelationInput[]
    cursor?: DoctorSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorSessionScalarFieldEnum | DoctorSessionScalarFieldEnum[]
  }

  /**
   * Doctor without action
   */
  export type DoctorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
  }


  /**
   * Model DoctorSchedule
   */

  export type AggregateDoctorSchedule = {
    _count: DoctorScheduleCountAggregateOutputType | null
    _min: DoctorScheduleMinAggregateOutputType | null
    _max: DoctorScheduleMaxAggregateOutputType | null
  }

  export type DoctorScheduleMinAggregateOutputType = {
    id: string | null
    doctorId: string | null
    day: $Enums.Weekday | null
    startTime: string | null
    endTime: string | null
    bookingCloseTime: string | null
  }

  export type DoctorScheduleMaxAggregateOutputType = {
    id: string | null
    doctorId: string | null
    day: $Enums.Weekday | null
    startTime: string | null
    endTime: string | null
    bookingCloseTime: string | null
  }

  export type DoctorScheduleCountAggregateOutputType = {
    id: number
    doctorId: number
    day: number
    startTime: number
    endTime: number
    bookingCloseTime: number
    _all: number
  }


  export type DoctorScheduleMinAggregateInputType = {
    id?: true
    doctorId?: true
    day?: true
    startTime?: true
    endTime?: true
    bookingCloseTime?: true
  }

  export type DoctorScheduleMaxAggregateInputType = {
    id?: true
    doctorId?: true
    day?: true
    startTime?: true
    endTime?: true
    bookingCloseTime?: true
  }

  export type DoctorScheduleCountAggregateInputType = {
    id?: true
    doctorId?: true
    day?: true
    startTime?: true
    endTime?: true
    bookingCloseTime?: true
    _all?: true
  }

  export type DoctorScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorSchedule to aggregate.
     */
    where?: DoctorScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSchedules to fetch.
     */
    orderBy?: DoctorScheduleOrderByWithRelationInput | DoctorScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DoctorSchedules
    **/
    _count?: true | DoctorScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorScheduleMaxAggregateInputType
  }

  export type GetDoctorScheduleAggregateType<T extends DoctorScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctorSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctorSchedule[P]>
      : GetScalarType<T[P], AggregateDoctorSchedule[P]>
  }




  export type DoctorScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorScheduleWhereInput
    orderBy?: DoctorScheduleOrderByWithAggregationInput | DoctorScheduleOrderByWithAggregationInput[]
    by: DoctorScheduleScalarFieldEnum[] | DoctorScheduleScalarFieldEnum
    having?: DoctorScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorScheduleCountAggregateInputType | true
    _min?: DoctorScheduleMinAggregateInputType
    _max?: DoctorScheduleMaxAggregateInputType
  }

  export type DoctorScheduleGroupByOutputType = {
    id: string
    doctorId: string
    day: $Enums.Weekday
    startTime: string
    endTime: string
    bookingCloseTime: string | null
    _count: DoctorScheduleCountAggregateOutputType | null
    _min: DoctorScheduleMinAggregateOutputType | null
    _max: DoctorScheduleMaxAggregateOutputType | null
  }

  type GetDoctorScheduleGroupByPayload<T extends DoctorScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorScheduleGroupByOutputType[P]>
        }
      >
    >


  export type DoctorScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    bookingCloseTime?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorSchedule"]>

  export type DoctorScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    bookingCloseTime?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorSchedule"]>

  export type DoctorScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    bookingCloseTime?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorSchedule"]>

  export type DoctorScheduleSelectScalar = {
    id?: boolean
    doctorId?: boolean
    day?: boolean
    startTime?: boolean
    endTime?: boolean
    bookingCloseTime?: boolean
  }

  export type DoctorScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctorId" | "day" | "startTime" | "endTime" | "bookingCloseTime", ExtArgs["result"]["doctorSchedule"]>
  export type DoctorScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }
  export type DoctorScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }
  export type DoctorScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }

  export type $DoctorSchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DoctorSchedule"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      doctorId: string
      day: $Enums.Weekday
      startTime: string
      endTime: string
      bookingCloseTime: string | null
    }, ExtArgs["result"]["doctorSchedule"]>
    composites: {}
  }

  type DoctorScheduleGetPayload<S extends boolean | null | undefined | DoctorScheduleDefaultArgs> = $Result.GetResult<Prisma.$DoctorSchedulePayload, S>

  type DoctorScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorScheduleCountAggregateInputType | true
    }

  export interface DoctorScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DoctorSchedule'], meta: { name: 'DoctorSchedule' } }
    /**
     * Find zero or one DoctorSchedule that matches the filter.
     * @param {DoctorScheduleFindUniqueArgs} args - Arguments to find a DoctorSchedule
     * @example
     * // Get one DoctorSchedule
     * const doctorSchedule = await prisma.doctorSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorScheduleFindUniqueArgs>(args: SelectSubset<T, DoctorScheduleFindUniqueArgs<ExtArgs>>): Prisma__DoctorScheduleClient<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DoctorSchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorScheduleFindUniqueOrThrowArgs} args - Arguments to find a DoctorSchedule
     * @example
     * // Get one DoctorSchedule
     * const doctorSchedule = await prisma.doctorSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorScheduleClient<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorScheduleFindFirstArgs} args - Arguments to find a DoctorSchedule
     * @example
     * // Get one DoctorSchedule
     * const doctorSchedule = await prisma.doctorSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorScheduleFindFirstArgs>(args?: SelectSubset<T, DoctorScheduleFindFirstArgs<ExtArgs>>): Prisma__DoctorScheduleClient<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorScheduleFindFirstOrThrowArgs} args - Arguments to find a DoctorSchedule
     * @example
     * // Get one DoctorSchedule
     * const doctorSchedule = await prisma.doctorSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorScheduleClient<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DoctorSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorSchedules
     * const doctorSchedules = await prisma.doctorSchedule.findMany()
     * 
     * // Get first 10 DoctorSchedules
     * const doctorSchedules = await prisma.doctorSchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorScheduleWithIdOnly = await prisma.doctorSchedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorScheduleFindManyArgs>(args?: SelectSubset<T, DoctorScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DoctorSchedule.
     * @param {DoctorScheduleCreateArgs} args - Arguments to create a DoctorSchedule.
     * @example
     * // Create one DoctorSchedule
     * const DoctorSchedule = await prisma.doctorSchedule.create({
     *   data: {
     *     // ... data to create a DoctorSchedule
     *   }
     * })
     * 
     */
    create<T extends DoctorScheduleCreateArgs>(args: SelectSubset<T, DoctorScheduleCreateArgs<ExtArgs>>): Prisma__DoctorScheduleClient<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DoctorSchedules.
     * @param {DoctorScheduleCreateManyArgs} args - Arguments to create many DoctorSchedules.
     * @example
     * // Create many DoctorSchedules
     * const doctorSchedule = await prisma.doctorSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorScheduleCreateManyArgs>(args?: SelectSubset<T, DoctorScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DoctorSchedules and returns the data saved in the database.
     * @param {DoctorScheduleCreateManyAndReturnArgs} args - Arguments to create many DoctorSchedules.
     * @example
     * // Create many DoctorSchedules
     * const doctorSchedule = await prisma.doctorSchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DoctorSchedules and only return the `id`
     * const doctorScheduleWithIdOnly = await prisma.doctorSchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DoctorSchedule.
     * @param {DoctorScheduleDeleteArgs} args - Arguments to delete one DoctorSchedule.
     * @example
     * // Delete one DoctorSchedule
     * const DoctorSchedule = await prisma.doctorSchedule.delete({
     *   where: {
     *     // ... filter to delete one DoctorSchedule
     *   }
     * })
     * 
     */
    delete<T extends DoctorScheduleDeleteArgs>(args: SelectSubset<T, DoctorScheduleDeleteArgs<ExtArgs>>): Prisma__DoctorScheduleClient<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DoctorSchedule.
     * @param {DoctorScheduleUpdateArgs} args - Arguments to update one DoctorSchedule.
     * @example
     * // Update one DoctorSchedule
     * const doctorSchedule = await prisma.doctorSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorScheduleUpdateArgs>(args: SelectSubset<T, DoctorScheduleUpdateArgs<ExtArgs>>): Prisma__DoctorScheduleClient<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DoctorSchedules.
     * @param {DoctorScheduleDeleteManyArgs} args - Arguments to filter DoctorSchedules to delete.
     * @example
     * // Delete a few DoctorSchedules
     * const { count } = await prisma.doctorSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorScheduleDeleteManyArgs>(args?: SelectSubset<T, DoctorScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorSchedules
     * const doctorSchedule = await prisma.doctorSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorScheduleUpdateManyArgs>(args: SelectSubset<T, DoctorScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorSchedules and returns the data updated in the database.
     * @param {DoctorScheduleUpdateManyAndReturnArgs} args - Arguments to update many DoctorSchedules.
     * @example
     * // Update many DoctorSchedules
     * const doctorSchedule = await prisma.doctorSchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DoctorSchedules and only return the `id`
     * const doctorScheduleWithIdOnly = await prisma.doctorSchedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DoctorSchedule.
     * @param {DoctorScheduleUpsertArgs} args - Arguments to update or create a DoctorSchedule.
     * @example
     * // Update or create a DoctorSchedule
     * const doctorSchedule = await prisma.doctorSchedule.upsert({
     *   create: {
     *     // ... data to create a DoctorSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorSchedule we want to update
     *   }
     * })
     */
    upsert<T extends DoctorScheduleUpsertArgs>(args: SelectSubset<T, DoctorScheduleUpsertArgs<ExtArgs>>): Prisma__DoctorScheduleClient<$Result.GetResult<Prisma.$DoctorSchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DoctorSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorScheduleCountArgs} args - Arguments to filter DoctorSchedules to count.
     * @example
     * // Count the number of DoctorSchedules
     * const count = await prisma.doctorSchedule.count({
     *   where: {
     *     // ... the filter for the DoctorSchedules we want to count
     *   }
     * })
    **/
    count<T extends DoctorScheduleCountArgs>(
      args?: Subset<T, DoctorScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DoctorSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DoctorScheduleAggregateArgs>(args: Subset<T, DoctorScheduleAggregateArgs>): Prisma.PrismaPromise<GetDoctorScheduleAggregateType<T>>

    /**
     * Group by DoctorSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorScheduleGroupByArgs} args - Group by arguments.
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
      T extends DoctorScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorScheduleGroupByArgs['orderBy'] }
        : { orderBy?: DoctorScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, DoctorScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DoctorSchedule model
   */
  readonly fields: DoctorScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DoctorSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DoctorSchedule model
   */
  interface DoctorScheduleFieldRefs {
    readonly id: FieldRef<"DoctorSchedule", 'String'>
    readonly doctorId: FieldRef<"DoctorSchedule", 'String'>
    readonly day: FieldRef<"DoctorSchedule", 'Weekday'>
    readonly startTime: FieldRef<"DoctorSchedule", 'String'>
    readonly endTime: FieldRef<"DoctorSchedule", 'String'>
    readonly bookingCloseTime: FieldRef<"DoctorSchedule", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DoctorSchedule findUnique
   */
  export type DoctorScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSchedule to fetch.
     */
    where: DoctorScheduleWhereUniqueInput
  }

  /**
   * DoctorSchedule findUniqueOrThrow
   */
  export type DoctorScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSchedule to fetch.
     */
    where: DoctorScheduleWhereUniqueInput
  }

  /**
   * DoctorSchedule findFirst
   */
  export type DoctorScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSchedule to fetch.
     */
    where?: DoctorScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSchedules to fetch.
     */
    orderBy?: DoctorScheduleOrderByWithRelationInput | DoctorScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorSchedules.
     */
    cursor?: DoctorScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorSchedules.
     */
    distinct?: DoctorScheduleScalarFieldEnum | DoctorScheduleScalarFieldEnum[]
  }

  /**
   * DoctorSchedule findFirstOrThrow
   */
  export type DoctorScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSchedule to fetch.
     */
    where?: DoctorScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSchedules to fetch.
     */
    orderBy?: DoctorScheduleOrderByWithRelationInput | DoctorScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorSchedules.
     */
    cursor?: DoctorScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorSchedules.
     */
    distinct?: DoctorScheduleScalarFieldEnum | DoctorScheduleScalarFieldEnum[]
  }

  /**
   * DoctorSchedule findMany
   */
  export type DoctorScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSchedules to fetch.
     */
    where?: DoctorScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSchedules to fetch.
     */
    orderBy?: DoctorScheduleOrderByWithRelationInput | DoctorScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DoctorSchedules.
     */
    cursor?: DoctorScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorSchedules.
     */
    distinct?: DoctorScheduleScalarFieldEnum | DoctorScheduleScalarFieldEnum[]
  }

  /**
   * DoctorSchedule create
   */
  export type DoctorScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a DoctorSchedule.
     */
    data: XOR<DoctorScheduleCreateInput, DoctorScheduleUncheckedCreateInput>
  }

  /**
   * DoctorSchedule createMany
   */
  export type DoctorScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorSchedules.
     */
    data: DoctorScheduleCreateManyInput | DoctorScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DoctorSchedule createManyAndReturn
   */
  export type DoctorScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many DoctorSchedules.
     */
    data: DoctorScheduleCreateManyInput | DoctorScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorSchedule update
   */
  export type DoctorScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a DoctorSchedule.
     */
    data: XOR<DoctorScheduleUpdateInput, DoctorScheduleUncheckedUpdateInput>
    /**
     * Choose, which DoctorSchedule to update.
     */
    where: DoctorScheduleWhereUniqueInput
  }

  /**
   * DoctorSchedule updateMany
   */
  export type DoctorScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorSchedules.
     */
    data: XOR<DoctorScheduleUpdateManyMutationInput, DoctorScheduleUncheckedUpdateManyInput>
    /**
     * Filter which DoctorSchedules to update
     */
    where?: DoctorScheduleWhereInput
    /**
     * Limit how many DoctorSchedules to update.
     */
    limit?: number
  }

  /**
   * DoctorSchedule updateManyAndReturn
   */
  export type DoctorScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * The data used to update DoctorSchedules.
     */
    data: XOR<DoctorScheduleUpdateManyMutationInput, DoctorScheduleUncheckedUpdateManyInput>
    /**
     * Filter which DoctorSchedules to update
     */
    where?: DoctorScheduleWhereInput
    /**
     * Limit how many DoctorSchedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorSchedule upsert
   */
  export type DoctorScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the DoctorSchedule to update in case it exists.
     */
    where: DoctorScheduleWhereUniqueInput
    /**
     * In case the DoctorSchedule found by the `where` argument doesn't exist, create a new DoctorSchedule with this data.
     */
    create: XOR<DoctorScheduleCreateInput, DoctorScheduleUncheckedCreateInput>
    /**
     * In case the DoctorSchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorScheduleUpdateInput, DoctorScheduleUncheckedUpdateInput>
  }

  /**
   * DoctorSchedule delete
   */
  export type DoctorScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
    /**
     * Filter which DoctorSchedule to delete.
     */
    where: DoctorScheduleWhereUniqueInput
  }

  /**
   * DoctorSchedule deleteMany
   */
  export type DoctorScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorSchedules to delete
     */
    where?: DoctorScheduleWhereInput
    /**
     * Limit how many DoctorSchedules to delete.
     */
    limit?: number
  }

  /**
   * DoctorSchedule without action
   */
  export type DoctorScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSchedule
     */
    select?: DoctorScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSchedule
     */
    omit?: DoctorScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorScheduleInclude<ExtArgs> | null
  }


  /**
   * Model DoctorSession
   */

  export type AggregateDoctorSession = {
    _count: DoctorSessionCountAggregateOutputType | null
    _avg: DoctorSessionAvgAggregateOutputType | null
    _sum: DoctorSessionSumAggregateOutputType | null
    _min: DoctorSessionMinAggregateOutputType | null
    _max: DoctorSessionMaxAggregateOutputType | null
  }

  export type DoctorSessionAvgAggregateOutputType = {
    lastTokenNumber: number | null
    queueVersion: number | null
  }

  export type DoctorSessionSumAggregateOutputType = {
    lastTokenNumber: number | null
    queueVersion: number | null
  }

  export type DoctorSessionMinAggregateOutputType = {
    id: string | null
    doctorId: string | null
    date: Date | null
    startTime: string | null
    endTime: string | null
    lastTokenNumber: number | null
    bookingOpensAt: Date | null
    bookingClosesAt: Date | null
    bookingExtended: boolean | null
    bookingManuallyClosed: boolean | null
    queueStatus: $Enums.QueueStatus | null
    queueStartedAt: Date | null
    queueEndedAt: Date | null
    queueVersion: number | null
    servingBookingId: string | null
    createdAt: Date | null
  }

  export type DoctorSessionMaxAggregateOutputType = {
    id: string | null
    doctorId: string | null
    date: Date | null
    startTime: string | null
    endTime: string | null
    lastTokenNumber: number | null
    bookingOpensAt: Date | null
    bookingClosesAt: Date | null
    bookingExtended: boolean | null
    bookingManuallyClosed: boolean | null
    queueStatus: $Enums.QueueStatus | null
    queueStartedAt: Date | null
    queueEndedAt: Date | null
    queueVersion: number | null
    servingBookingId: string | null
    createdAt: Date | null
  }

  export type DoctorSessionCountAggregateOutputType = {
    id: number
    doctorId: number
    date: number
    startTime: number
    endTime: number
    lastTokenNumber: number
    bookingOpensAt: number
    bookingClosesAt: number
    bookingExtended: number
    bookingManuallyClosed: number
    queueStatus: number
    queueStartedAt: number
    queueEndedAt: number
    queueVersion: number
    servingBookingId: number
    createdAt: number
    _all: number
  }


  export type DoctorSessionAvgAggregateInputType = {
    lastTokenNumber?: true
    queueVersion?: true
  }

  export type DoctorSessionSumAggregateInputType = {
    lastTokenNumber?: true
    queueVersion?: true
  }

  export type DoctorSessionMinAggregateInputType = {
    id?: true
    doctorId?: true
    date?: true
    startTime?: true
    endTime?: true
    lastTokenNumber?: true
    bookingOpensAt?: true
    bookingClosesAt?: true
    bookingExtended?: true
    bookingManuallyClosed?: true
    queueStatus?: true
    queueStartedAt?: true
    queueEndedAt?: true
    queueVersion?: true
    servingBookingId?: true
    createdAt?: true
  }

  export type DoctorSessionMaxAggregateInputType = {
    id?: true
    doctorId?: true
    date?: true
    startTime?: true
    endTime?: true
    lastTokenNumber?: true
    bookingOpensAt?: true
    bookingClosesAt?: true
    bookingExtended?: true
    bookingManuallyClosed?: true
    queueStatus?: true
    queueStartedAt?: true
    queueEndedAt?: true
    queueVersion?: true
    servingBookingId?: true
    createdAt?: true
  }

  export type DoctorSessionCountAggregateInputType = {
    id?: true
    doctorId?: true
    date?: true
    startTime?: true
    endTime?: true
    lastTokenNumber?: true
    bookingOpensAt?: true
    bookingClosesAt?: true
    bookingExtended?: true
    bookingManuallyClosed?: true
    queueStatus?: true
    queueStartedAt?: true
    queueEndedAt?: true
    queueVersion?: true
    servingBookingId?: true
    createdAt?: true
    _all?: true
  }

  export type DoctorSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorSession to aggregate.
     */
    where?: DoctorSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSessions to fetch.
     */
    orderBy?: DoctorSessionOrderByWithRelationInput | DoctorSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DoctorSessions
    **/
    _count?: true | DoctorSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorSessionMaxAggregateInputType
  }

  export type GetDoctorSessionAggregateType<T extends DoctorSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctorSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctorSession[P]>
      : GetScalarType<T[P], AggregateDoctorSession[P]>
  }




  export type DoctorSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorSessionWhereInput
    orderBy?: DoctorSessionOrderByWithAggregationInput | DoctorSessionOrderByWithAggregationInput[]
    by: DoctorSessionScalarFieldEnum[] | DoctorSessionScalarFieldEnum
    having?: DoctorSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorSessionCountAggregateInputType | true
    _avg?: DoctorSessionAvgAggregateInputType
    _sum?: DoctorSessionSumAggregateInputType
    _min?: DoctorSessionMinAggregateInputType
    _max?: DoctorSessionMaxAggregateInputType
  }

  export type DoctorSessionGroupByOutputType = {
    id: string
    doctorId: string
    date: Date
    startTime: string
    endTime: string
    lastTokenNumber: number
    bookingOpensAt: Date
    bookingClosesAt: Date
    bookingExtended: boolean
    bookingManuallyClosed: boolean
    queueStatus: $Enums.QueueStatus
    queueStartedAt: Date | null
    queueEndedAt: Date | null
    queueVersion: number
    servingBookingId: string | null
    createdAt: Date
    _count: DoctorSessionCountAggregateOutputType | null
    _avg: DoctorSessionAvgAggregateOutputType | null
    _sum: DoctorSessionSumAggregateOutputType | null
    _min: DoctorSessionMinAggregateOutputType | null
    _max: DoctorSessionMaxAggregateOutputType | null
  }

  type GetDoctorSessionGroupByPayload<T extends DoctorSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorSessionGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorSessionGroupByOutputType[P]>
        }
      >
    >


  export type DoctorSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    lastTokenNumber?: boolean
    bookingOpensAt?: boolean
    bookingClosesAt?: boolean
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: boolean
    queueStartedAt?: boolean
    queueEndedAt?: boolean
    queueVersion?: boolean
    servingBookingId?: boolean
    createdAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    servingBooking?: boolean | DoctorSession$servingBookingArgs<ExtArgs>
    bookings?: boolean | DoctorSession$bookingsArgs<ExtArgs>
    _count?: boolean | DoctorSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorSession"]>

  export type DoctorSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    lastTokenNumber?: boolean
    bookingOpensAt?: boolean
    bookingClosesAt?: boolean
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: boolean
    queueStartedAt?: boolean
    queueEndedAt?: boolean
    queueVersion?: boolean
    servingBookingId?: boolean
    createdAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    servingBooking?: boolean | DoctorSession$servingBookingArgs<ExtArgs>
  }, ExtArgs["result"]["doctorSession"]>

  export type DoctorSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    lastTokenNumber?: boolean
    bookingOpensAt?: boolean
    bookingClosesAt?: boolean
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: boolean
    queueStartedAt?: boolean
    queueEndedAt?: boolean
    queueVersion?: boolean
    servingBookingId?: boolean
    createdAt?: boolean
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    servingBooking?: boolean | DoctorSession$servingBookingArgs<ExtArgs>
  }, ExtArgs["result"]["doctorSession"]>

  export type DoctorSessionSelectScalar = {
    id?: boolean
    doctorId?: boolean
    date?: boolean
    startTime?: boolean
    endTime?: boolean
    lastTokenNumber?: boolean
    bookingOpensAt?: boolean
    bookingClosesAt?: boolean
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: boolean
    queueStartedAt?: boolean
    queueEndedAt?: boolean
    queueVersion?: boolean
    servingBookingId?: boolean
    createdAt?: boolean
  }

  export type DoctorSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctorId" | "date" | "startTime" | "endTime" | "lastTokenNumber" | "bookingOpensAt" | "bookingClosesAt" | "bookingExtended" | "bookingManuallyClosed" | "queueStatus" | "queueStartedAt" | "queueEndedAt" | "queueVersion" | "servingBookingId" | "createdAt", ExtArgs["result"]["doctorSession"]>
  export type DoctorSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    servingBooking?: boolean | DoctorSession$servingBookingArgs<ExtArgs>
    bookings?: boolean | DoctorSession$bookingsArgs<ExtArgs>
    _count?: boolean | DoctorSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DoctorSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    servingBooking?: boolean | DoctorSession$servingBookingArgs<ExtArgs>
  }
  export type DoctorSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    servingBooking?: boolean | DoctorSession$servingBookingArgs<ExtArgs>
  }

  export type $DoctorSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DoctorSession"
    objects: {
      doctor: Prisma.$DoctorPayload<ExtArgs>
      servingBooking: Prisma.$BookingPayload<ExtArgs> | null
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      doctorId: string
      date: Date
      startTime: string
      endTime: string
      lastTokenNumber: number
      bookingOpensAt: Date
      bookingClosesAt: Date
      bookingExtended: boolean
      bookingManuallyClosed: boolean
      queueStatus: $Enums.QueueStatus
      queueStartedAt: Date | null
      queueEndedAt: Date | null
      queueVersion: number
      servingBookingId: string | null
      createdAt: Date
    }, ExtArgs["result"]["doctorSession"]>
    composites: {}
  }

  type DoctorSessionGetPayload<S extends boolean | null | undefined | DoctorSessionDefaultArgs> = $Result.GetResult<Prisma.$DoctorSessionPayload, S>

  type DoctorSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorSessionCountAggregateInputType | true
    }

  export interface DoctorSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DoctorSession'], meta: { name: 'DoctorSession' } }
    /**
     * Find zero or one DoctorSession that matches the filter.
     * @param {DoctorSessionFindUniqueArgs} args - Arguments to find a DoctorSession
     * @example
     * // Get one DoctorSession
     * const doctorSession = await prisma.doctorSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorSessionFindUniqueArgs>(args: SelectSubset<T, DoctorSessionFindUniqueArgs<ExtArgs>>): Prisma__DoctorSessionClient<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DoctorSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorSessionFindUniqueOrThrowArgs} args - Arguments to find a DoctorSession
     * @example
     * // Get one DoctorSession
     * const doctorSession = await prisma.doctorSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorSessionClient<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSessionFindFirstArgs} args - Arguments to find a DoctorSession
     * @example
     * // Get one DoctorSession
     * const doctorSession = await prisma.doctorSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorSessionFindFirstArgs>(args?: SelectSubset<T, DoctorSessionFindFirstArgs<ExtArgs>>): Prisma__DoctorSessionClient<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSessionFindFirstOrThrowArgs} args - Arguments to find a DoctorSession
     * @example
     * // Get one DoctorSession
     * const doctorSession = await prisma.doctorSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorSessionClient<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DoctorSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorSessions
     * const doctorSessions = await prisma.doctorSession.findMany()
     * 
     * // Get first 10 DoctorSessions
     * const doctorSessions = await prisma.doctorSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorSessionWithIdOnly = await prisma.doctorSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorSessionFindManyArgs>(args?: SelectSubset<T, DoctorSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DoctorSession.
     * @param {DoctorSessionCreateArgs} args - Arguments to create a DoctorSession.
     * @example
     * // Create one DoctorSession
     * const DoctorSession = await prisma.doctorSession.create({
     *   data: {
     *     // ... data to create a DoctorSession
     *   }
     * })
     * 
     */
    create<T extends DoctorSessionCreateArgs>(args: SelectSubset<T, DoctorSessionCreateArgs<ExtArgs>>): Prisma__DoctorSessionClient<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DoctorSessions.
     * @param {DoctorSessionCreateManyArgs} args - Arguments to create many DoctorSessions.
     * @example
     * // Create many DoctorSessions
     * const doctorSession = await prisma.doctorSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorSessionCreateManyArgs>(args?: SelectSubset<T, DoctorSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DoctorSessions and returns the data saved in the database.
     * @param {DoctorSessionCreateManyAndReturnArgs} args - Arguments to create many DoctorSessions.
     * @example
     * // Create many DoctorSessions
     * const doctorSession = await prisma.doctorSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DoctorSessions and only return the `id`
     * const doctorSessionWithIdOnly = await prisma.doctorSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DoctorSession.
     * @param {DoctorSessionDeleteArgs} args - Arguments to delete one DoctorSession.
     * @example
     * // Delete one DoctorSession
     * const DoctorSession = await prisma.doctorSession.delete({
     *   where: {
     *     // ... filter to delete one DoctorSession
     *   }
     * })
     * 
     */
    delete<T extends DoctorSessionDeleteArgs>(args: SelectSubset<T, DoctorSessionDeleteArgs<ExtArgs>>): Prisma__DoctorSessionClient<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DoctorSession.
     * @param {DoctorSessionUpdateArgs} args - Arguments to update one DoctorSession.
     * @example
     * // Update one DoctorSession
     * const doctorSession = await prisma.doctorSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorSessionUpdateArgs>(args: SelectSubset<T, DoctorSessionUpdateArgs<ExtArgs>>): Prisma__DoctorSessionClient<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DoctorSessions.
     * @param {DoctorSessionDeleteManyArgs} args - Arguments to filter DoctorSessions to delete.
     * @example
     * // Delete a few DoctorSessions
     * const { count } = await prisma.doctorSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorSessionDeleteManyArgs>(args?: SelectSubset<T, DoctorSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorSessions
     * const doctorSession = await prisma.doctorSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorSessionUpdateManyArgs>(args: SelectSubset<T, DoctorSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorSessions and returns the data updated in the database.
     * @param {DoctorSessionUpdateManyAndReturnArgs} args - Arguments to update many DoctorSessions.
     * @example
     * // Update many DoctorSessions
     * const doctorSession = await prisma.doctorSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DoctorSessions and only return the `id`
     * const doctorSessionWithIdOnly = await prisma.doctorSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DoctorSession.
     * @param {DoctorSessionUpsertArgs} args - Arguments to update or create a DoctorSession.
     * @example
     * // Update or create a DoctorSession
     * const doctorSession = await prisma.doctorSession.upsert({
     *   create: {
     *     // ... data to create a DoctorSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorSession we want to update
     *   }
     * })
     */
    upsert<T extends DoctorSessionUpsertArgs>(args: SelectSubset<T, DoctorSessionUpsertArgs<ExtArgs>>): Prisma__DoctorSessionClient<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DoctorSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSessionCountArgs} args - Arguments to filter DoctorSessions to count.
     * @example
     * // Count the number of DoctorSessions
     * const count = await prisma.doctorSession.count({
     *   where: {
     *     // ... the filter for the DoctorSessions we want to count
     *   }
     * })
    **/
    count<T extends DoctorSessionCountArgs>(
      args?: Subset<T, DoctorSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DoctorSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DoctorSessionAggregateArgs>(args: Subset<T, DoctorSessionAggregateArgs>): Prisma.PrismaPromise<GetDoctorSessionAggregateType<T>>

    /**
     * Group by DoctorSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorSessionGroupByArgs} args - Group by arguments.
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
      T extends DoctorSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorSessionGroupByArgs['orderBy'] }
        : { orderBy?: DoctorSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, DoctorSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DoctorSession model
   */
  readonly fields: DoctorSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DoctorSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    servingBooking<T extends DoctorSession$servingBookingArgs<ExtArgs> = {}>(args?: Subset<T, DoctorSession$servingBookingArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    bookings<T extends DoctorSession$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, DoctorSession$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DoctorSession model
   */
  interface DoctorSessionFieldRefs {
    readonly id: FieldRef<"DoctorSession", 'String'>
    readonly doctorId: FieldRef<"DoctorSession", 'String'>
    readonly date: FieldRef<"DoctorSession", 'DateTime'>
    readonly startTime: FieldRef<"DoctorSession", 'String'>
    readonly endTime: FieldRef<"DoctorSession", 'String'>
    readonly lastTokenNumber: FieldRef<"DoctorSession", 'Int'>
    readonly bookingOpensAt: FieldRef<"DoctorSession", 'DateTime'>
    readonly bookingClosesAt: FieldRef<"DoctorSession", 'DateTime'>
    readonly bookingExtended: FieldRef<"DoctorSession", 'Boolean'>
    readonly bookingManuallyClosed: FieldRef<"DoctorSession", 'Boolean'>
    readonly queueStatus: FieldRef<"DoctorSession", 'QueueStatus'>
    readonly queueStartedAt: FieldRef<"DoctorSession", 'DateTime'>
    readonly queueEndedAt: FieldRef<"DoctorSession", 'DateTime'>
    readonly queueVersion: FieldRef<"DoctorSession", 'Int'>
    readonly servingBookingId: FieldRef<"DoctorSession", 'String'>
    readonly createdAt: FieldRef<"DoctorSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DoctorSession findUnique
   */
  export type DoctorSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSession to fetch.
     */
    where: DoctorSessionWhereUniqueInput
  }

  /**
   * DoctorSession findUniqueOrThrow
   */
  export type DoctorSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSession to fetch.
     */
    where: DoctorSessionWhereUniqueInput
  }

  /**
   * DoctorSession findFirst
   */
  export type DoctorSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSession to fetch.
     */
    where?: DoctorSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSessions to fetch.
     */
    orderBy?: DoctorSessionOrderByWithRelationInput | DoctorSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorSessions.
     */
    cursor?: DoctorSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorSessions.
     */
    distinct?: DoctorSessionScalarFieldEnum | DoctorSessionScalarFieldEnum[]
  }

  /**
   * DoctorSession findFirstOrThrow
   */
  export type DoctorSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSession to fetch.
     */
    where?: DoctorSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSessions to fetch.
     */
    orderBy?: DoctorSessionOrderByWithRelationInput | DoctorSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorSessions.
     */
    cursor?: DoctorSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorSessions.
     */
    distinct?: DoctorSessionScalarFieldEnum | DoctorSessionScalarFieldEnum[]
  }

  /**
   * DoctorSession findMany
   */
  export type DoctorSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    /**
     * Filter, which DoctorSessions to fetch.
     */
    where?: DoctorSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorSessions to fetch.
     */
    orderBy?: DoctorSessionOrderByWithRelationInput | DoctorSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DoctorSessions.
     */
    cursor?: DoctorSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorSessions.
     */
    distinct?: DoctorSessionScalarFieldEnum | DoctorSessionScalarFieldEnum[]
  }

  /**
   * DoctorSession create
   */
  export type DoctorSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a DoctorSession.
     */
    data: XOR<DoctorSessionCreateInput, DoctorSessionUncheckedCreateInput>
  }

  /**
   * DoctorSession createMany
   */
  export type DoctorSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorSessions.
     */
    data: DoctorSessionCreateManyInput | DoctorSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DoctorSession createManyAndReturn
   */
  export type DoctorSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * The data used to create many DoctorSessions.
     */
    data: DoctorSessionCreateManyInput | DoctorSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorSession update
   */
  export type DoctorSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a DoctorSession.
     */
    data: XOR<DoctorSessionUpdateInput, DoctorSessionUncheckedUpdateInput>
    /**
     * Choose, which DoctorSession to update.
     */
    where: DoctorSessionWhereUniqueInput
  }

  /**
   * DoctorSession updateMany
   */
  export type DoctorSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorSessions.
     */
    data: XOR<DoctorSessionUpdateManyMutationInput, DoctorSessionUncheckedUpdateManyInput>
    /**
     * Filter which DoctorSessions to update
     */
    where?: DoctorSessionWhereInput
    /**
     * Limit how many DoctorSessions to update.
     */
    limit?: number
  }

  /**
   * DoctorSession updateManyAndReturn
   */
  export type DoctorSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * The data used to update DoctorSessions.
     */
    data: XOR<DoctorSessionUpdateManyMutationInput, DoctorSessionUncheckedUpdateManyInput>
    /**
     * Filter which DoctorSessions to update
     */
    where?: DoctorSessionWhereInput
    /**
     * Limit how many DoctorSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorSession upsert
   */
  export type DoctorSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the DoctorSession to update in case it exists.
     */
    where: DoctorSessionWhereUniqueInput
    /**
     * In case the DoctorSession found by the `where` argument doesn't exist, create a new DoctorSession with this data.
     */
    create: XOR<DoctorSessionCreateInput, DoctorSessionUncheckedCreateInput>
    /**
     * In case the DoctorSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorSessionUpdateInput, DoctorSessionUncheckedUpdateInput>
  }

  /**
   * DoctorSession delete
   */
  export type DoctorSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    /**
     * Filter which DoctorSession to delete.
     */
    where: DoctorSessionWhereUniqueInput
  }

  /**
   * DoctorSession deleteMany
   */
  export type DoctorSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorSessions to delete
     */
    where?: DoctorSessionWhereInput
    /**
     * Limit how many DoctorSessions to delete.
     */
    limit?: number
  }

  /**
   * DoctorSession.servingBooking
   */
  export type DoctorSession$servingBookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
  }

  /**
   * DoctorSession.bookings
   */
  export type DoctorSession$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * DoctorSession without action
   */
  export type DoctorSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    tokenNumber: number | null
    queuePosition: number | null
    skipCount: number | null
  }

  export type BookingSumAggregateOutputType = {
    tokenNumber: number | null
    queuePosition: number | null
    skipCount: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    tokenNumber: number | null
    queuePosition: number | null
    status: $Enums.BookingStatus | null
    patientName: string | null
    skipCount: number | null
    lastSkippedAt: Date | null
    userId: string | null
    clinicId: string | null
    sessionId: string | null
    createdAt: Date | null
    calledAt: Date | null
    completedAt: Date | null
    cancelledAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    tokenNumber: number | null
    queuePosition: number | null
    status: $Enums.BookingStatus | null
    patientName: string | null
    skipCount: number | null
    lastSkippedAt: Date | null
    userId: string | null
    clinicId: string | null
    sessionId: string | null
    createdAt: Date | null
    calledAt: Date | null
    completedAt: Date | null
    cancelledAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    tokenNumber: number
    queuePosition: number
    status: number
    patientName: number
    skipCount: number
    lastSkippedAt: number
    userId: number
    clinicId: number
    sessionId: number
    createdAt: number
    calledAt: number
    completedAt: number
    cancelledAt: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    tokenNumber?: true
    queuePosition?: true
    skipCount?: true
  }

  export type BookingSumAggregateInputType = {
    tokenNumber?: true
    queuePosition?: true
    skipCount?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    tokenNumber?: true
    queuePosition?: true
    status?: true
    patientName?: true
    skipCount?: true
    lastSkippedAt?: true
    userId?: true
    clinicId?: true
    sessionId?: true
    createdAt?: true
    calledAt?: true
    completedAt?: true
    cancelledAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    tokenNumber?: true
    queuePosition?: true
    status?: true
    patientName?: true
    skipCount?: true
    lastSkippedAt?: true
    userId?: true
    clinicId?: true
    sessionId?: true
    createdAt?: true
    calledAt?: true
    completedAt?: true
    cancelledAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    tokenNumber?: true
    queuePosition?: true
    status?: true
    patientName?: true
    skipCount?: true
    lastSkippedAt?: true
    userId?: true
    clinicId?: true
    sessionId?: true
    createdAt?: true
    calledAt?: true
    completedAt?: true
    cancelledAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    tokenNumber: number
    queuePosition: number
    status: $Enums.BookingStatus
    patientName: string | null
    skipCount: number
    lastSkippedAt: Date | null
    userId: string
    clinicId: string
    sessionId: string
    createdAt: Date
    calledAt: Date | null
    completedAt: Date | null
    cancelledAt: Date | null
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenNumber?: boolean
    queuePosition?: boolean
    status?: boolean
    patientName?: boolean
    skipCount?: boolean
    lastSkippedAt?: boolean
    userId?: boolean
    clinicId?: boolean
    sessionId?: boolean
    createdAt?: boolean
    calledAt?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    session?: boolean | DoctorSessionDefaultArgs<ExtArgs>
    servingIn?: boolean | Booking$servingInArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenNumber?: boolean
    queuePosition?: boolean
    status?: boolean
    patientName?: boolean
    skipCount?: boolean
    lastSkippedAt?: boolean
    userId?: boolean
    clinicId?: boolean
    sessionId?: boolean
    createdAt?: boolean
    calledAt?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    session?: boolean | DoctorSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenNumber?: boolean
    queuePosition?: boolean
    status?: boolean
    patientName?: boolean
    skipCount?: boolean
    lastSkippedAt?: boolean
    userId?: boolean
    clinicId?: boolean
    sessionId?: boolean
    createdAt?: boolean
    calledAt?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    session?: boolean | DoctorSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    tokenNumber?: boolean
    queuePosition?: boolean
    status?: boolean
    patientName?: boolean
    skipCount?: boolean
    lastSkippedAt?: boolean
    userId?: boolean
    clinicId?: boolean
    sessionId?: boolean
    createdAt?: boolean
    calledAt?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tokenNumber" | "queuePosition" | "status" | "patientName" | "skipCount" | "lastSkippedAt" | "userId" | "clinicId" | "sessionId" | "createdAt" | "calledAt" | "completedAt" | "cancelledAt", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    session?: boolean | DoctorSessionDefaultArgs<ExtArgs>
    servingIn?: boolean | Booking$servingInArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    session?: boolean | DoctorSessionDefaultArgs<ExtArgs>
  }
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    session?: boolean | DoctorSessionDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      clinic: Prisma.$ClinicPayload<ExtArgs>
      session: Prisma.$DoctorSessionPayload<ExtArgs>
      servingIn: Prisma.$DoctorSessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenNumber: number
      queuePosition: number
      status: $Enums.BookingStatus
      patientName: string | null
      skipCount: number
      lastSkippedAt: Date | null
      userId: string
      clinicId: string
      sessionId: string
      createdAt: Date
      calledAt: Date | null
      completedAt: Date | null
      cancelledAt: Date | null
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
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
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    session<T extends DoctorSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorSessionDefaultArgs<ExtArgs>>): Prisma__DoctorSessionClient<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    servingIn<T extends Booking$servingInArgs<ExtArgs> = {}>(args?: Subset<T, Booking$servingInArgs<ExtArgs>>): Prisma__DoctorSessionClient<$Result.GetResult<Prisma.$DoctorSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly tokenNumber: FieldRef<"Booking", 'Int'>
    readonly queuePosition: FieldRef<"Booking", 'Int'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly patientName: FieldRef<"Booking", 'String'>
    readonly skipCount: FieldRef<"Booking", 'Int'>
    readonly lastSkippedAt: FieldRef<"Booking", 'DateTime'>
    readonly userId: FieldRef<"Booking", 'String'>
    readonly clinicId: FieldRef<"Booking", 'String'>
    readonly sessionId: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly calledAt: FieldRef<"Booking", 'DateTime'>
    readonly completedAt: FieldRef<"Booking", 'DateTime'>
    readonly cancelledAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.servingIn
   */
  export type Booking$servingInArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorSession
     */
    select?: DoctorSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorSession
     */
    omit?: DoctorSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorSessionInclude<ExtArgs> | null
    where?: DoctorSessionWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    image: 'image',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClinicScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    city: 'city',
    email: 'email',
    phone: 'phone',
    logo: 'logo',
    clinicImage: 'clinicImage',
    isApproved: 'isApproved',
    timezone: 'timezone',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type ClinicScalarFieldEnum = (typeof ClinicScalarFieldEnum)[keyof typeof ClinicScalarFieldEnum]


  export const DoctorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    image: 'image',
    description: 'description',
    isActive: 'isActive',
    specialtySlug: 'specialtySlug',
    clinicId: 'clinicId',
    createdAt: 'createdAt'
  };

  export type DoctorScalarFieldEnum = (typeof DoctorScalarFieldEnum)[keyof typeof DoctorScalarFieldEnum]


  export const DoctorScheduleScalarFieldEnum: {
    id: 'id',
    doctorId: 'doctorId',
    day: 'day',
    startTime: 'startTime',
    endTime: 'endTime',
    bookingCloseTime: 'bookingCloseTime'
  };

  export type DoctorScheduleScalarFieldEnum = (typeof DoctorScheduleScalarFieldEnum)[keyof typeof DoctorScheduleScalarFieldEnum]


  export const DoctorSessionScalarFieldEnum: {
    id: 'id',
    doctorId: 'doctorId',
    date: 'date',
    startTime: 'startTime',
    endTime: 'endTime',
    lastTokenNumber: 'lastTokenNumber',
    bookingOpensAt: 'bookingOpensAt',
    bookingClosesAt: 'bookingClosesAt',
    bookingExtended: 'bookingExtended',
    bookingManuallyClosed: 'bookingManuallyClosed',
    queueStatus: 'queueStatus',
    queueStartedAt: 'queueStartedAt',
    queueEndedAt: 'queueEndedAt',
    queueVersion: 'queueVersion',
    servingBookingId: 'servingBookingId',
    createdAt: 'createdAt'
  };

  export type DoctorSessionScalarFieldEnum = (typeof DoctorSessionScalarFieldEnum)[keyof typeof DoctorSessionScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    tokenNumber: 'tokenNumber',
    queuePosition: 'queuePosition',
    status: 'status',
    patientName: 'patientName',
    skipCount: 'skipCount',
    lastSkippedAt: 'lastSkippedAt',
    userId: 'userId',
    clinicId: 'clinicId',
    sessionId: 'sessionId',
    createdAt: 'createdAt',
    calledAt: 'calledAt',
    completedAt: 'completedAt',
    cancelledAt: 'cancelledAt'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Weekday'
   */
  export type EnumWeekdayFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Weekday'>
    


  /**
   * Reference to a field of type 'Weekday[]'
   */
  export type ListEnumWeekdayFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Weekday[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'QueueStatus'
   */
  export type EnumQueueStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueueStatus'>
    


  /**
   * Reference to a field of type 'QueueStatus[]'
   */
  export type ListEnumQueueStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueueStatus[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    clinic?: XOR<ClinicNullableScalarRelationFilter, ClinicWhereInput> | null
    bookings?: BookingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    clinic?: XOR<ClinicNullableScalarRelationFilter, ClinicWhereInput> | null
    bookings?: BookingListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClinicWhereInput = {
    AND?: ClinicWhereInput | ClinicWhereInput[]
    OR?: ClinicWhereInput[]
    NOT?: ClinicWhereInput | ClinicWhereInput[]
    id?: StringFilter<"Clinic"> | string
    name?: StringFilter<"Clinic"> | string
    address?: StringFilter<"Clinic"> | string
    city?: StringFilter<"Clinic"> | string
    email?: StringFilter<"Clinic"> | string
    phone?: StringFilter<"Clinic"> | string
    logo?: StringNullableFilter<"Clinic"> | string | null
    clinicImage?: StringNullableListFilter<"Clinic">
    isApproved?: BoolFilter<"Clinic"> | boolean
    timezone?: StringFilter<"Clinic"> | string
    userId?: StringFilter<"Clinic"> | string
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    doctors?: DoctorListRelationFilter
    bookings?: BookingListRelationFilter
  }

  export type ClinicOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    logo?: SortOrderInput | SortOrder
    clinicImage?: SortOrder
    isApproved?: SortOrder
    timezone?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    doctors?: DoctorOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type ClinicWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ClinicWhereInput | ClinicWhereInput[]
    OR?: ClinicWhereInput[]
    NOT?: ClinicWhereInput | ClinicWhereInput[]
    name?: StringFilter<"Clinic"> | string
    address?: StringFilter<"Clinic"> | string
    city?: StringFilter<"Clinic"> | string
    email?: StringFilter<"Clinic"> | string
    phone?: StringFilter<"Clinic"> | string
    logo?: StringNullableFilter<"Clinic"> | string | null
    clinicImage?: StringNullableListFilter<"Clinic">
    isApproved?: BoolFilter<"Clinic"> | boolean
    timezone?: StringFilter<"Clinic"> | string
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    doctors?: DoctorListRelationFilter
    bookings?: BookingListRelationFilter
  }, "id" | "userId">

  export type ClinicOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    logo?: SortOrderInput | SortOrder
    clinicImage?: SortOrder
    isApproved?: SortOrder
    timezone?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: ClinicCountOrderByAggregateInput
    _max?: ClinicMaxOrderByAggregateInput
    _min?: ClinicMinOrderByAggregateInput
  }

  export type ClinicScalarWhereWithAggregatesInput = {
    AND?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
    OR?: ClinicScalarWhereWithAggregatesInput[]
    NOT?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Clinic"> | string
    name?: StringWithAggregatesFilter<"Clinic"> | string
    address?: StringWithAggregatesFilter<"Clinic"> | string
    city?: StringWithAggregatesFilter<"Clinic"> | string
    email?: StringWithAggregatesFilter<"Clinic"> | string
    phone?: StringWithAggregatesFilter<"Clinic"> | string
    logo?: StringNullableWithAggregatesFilter<"Clinic"> | string | null
    clinicImage?: StringNullableListFilter<"Clinic">
    isApproved?: BoolWithAggregatesFilter<"Clinic"> | boolean
    timezone?: StringWithAggregatesFilter<"Clinic"> | string
    userId?: StringWithAggregatesFilter<"Clinic"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
  }

  export type DoctorWhereInput = {
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    id?: StringFilter<"Doctor"> | string
    name?: StringFilter<"Doctor"> | string
    image?: StringNullableFilter<"Doctor"> | string | null
    description?: StringNullableFilter<"Doctor"> | string | null
    isActive?: BoolFilter<"Doctor"> | boolean
    specialtySlug?: StringFilter<"Doctor"> | string
    clinicId?: StringFilter<"Doctor"> | string
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    schedules?: DoctorScheduleListRelationFilter
    sessions?: DoctorSessionListRelationFilter
  }

  export type DoctorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    specialtySlug?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
    schedules?: DoctorScheduleOrderByRelationAggregateInput
    sessions?: DoctorSessionOrderByRelationAggregateInput
  }

  export type DoctorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    name?: StringFilter<"Doctor"> | string
    image?: StringNullableFilter<"Doctor"> | string | null
    description?: StringNullableFilter<"Doctor"> | string | null
    isActive?: BoolFilter<"Doctor"> | boolean
    specialtySlug?: StringFilter<"Doctor"> | string
    clinicId?: StringFilter<"Doctor"> | string
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    schedules?: DoctorScheduleListRelationFilter
    sessions?: DoctorSessionListRelationFilter
  }, "id">

  export type DoctorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    specialtySlug?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
    _count?: DoctorCountOrderByAggregateInput
    _max?: DoctorMaxOrderByAggregateInput
    _min?: DoctorMinOrderByAggregateInput
  }

  export type DoctorScalarWhereWithAggregatesInput = {
    AND?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    OR?: DoctorScalarWhereWithAggregatesInput[]
    NOT?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Doctor"> | string
    name?: StringWithAggregatesFilter<"Doctor"> | string
    image?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    description?: StringNullableWithAggregatesFilter<"Doctor"> | string | null
    isActive?: BoolWithAggregatesFilter<"Doctor"> | boolean
    specialtySlug?: StringWithAggregatesFilter<"Doctor"> | string
    clinicId?: StringWithAggregatesFilter<"Doctor"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
  }

  export type DoctorScheduleWhereInput = {
    AND?: DoctorScheduleWhereInput | DoctorScheduleWhereInput[]
    OR?: DoctorScheduleWhereInput[]
    NOT?: DoctorScheduleWhereInput | DoctorScheduleWhereInput[]
    id?: StringFilter<"DoctorSchedule"> | string
    doctorId?: StringFilter<"DoctorSchedule"> | string
    day?: EnumWeekdayFilter<"DoctorSchedule"> | $Enums.Weekday
    startTime?: StringFilter<"DoctorSchedule"> | string
    endTime?: StringFilter<"DoctorSchedule"> | string
    bookingCloseTime?: StringNullableFilter<"DoctorSchedule"> | string | null
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
  }

  export type DoctorScheduleOrderByWithRelationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    bookingCloseTime?: SortOrderInput | SortOrder
    doctor?: DoctorOrderByWithRelationInput
  }

  export type DoctorScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    doctorId_day_startTime?: DoctorScheduleDoctorIdDayStartTimeCompoundUniqueInput
    AND?: DoctorScheduleWhereInput | DoctorScheduleWhereInput[]
    OR?: DoctorScheduleWhereInput[]
    NOT?: DoctorScheduleWhereInput | DoctorScheduleWhereInput[]
    doctorId?: StringFilter<"DoctorSchedule"> | string
    day?: EnumWeekdayFilter<"DoctorSchedule"> | $Enums.Weekday
    startTime?: StringFilter<"DoctorSchedule"> | string
    endTime?: StringFilter<"DoctorSchedule"> | string
    bookingCloseTime?: StringNullableFilter<"DoctorSchedule"> | string | null
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
  }, "id" | "doctorId_day_startTime">

  export type DoctorScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    bookingCloseTime?: SortOrderInput | SortOrder
    _count?: DoctorScheduleCountOrderByAggregateInput
    _max?: DoctorScheduleMaxOrderByAggregateInput
    _min?: DoctorScheduleMinOrderByAggregateInput
  }

  export type DoctorScheduleScalarWhereWithAggregatesInput = {
    AND?: DoctorScheduleScalarWhereWithAggregatesInput | DoctorScheduleScalarWhereWithAggregatesInput[]
    OR?: DoctorScheduleScalarWhereWithAggregatesInput[]
    NOT?: DoctorScheduleScalarWhereWithAggregatesInput | DoctorScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DoctorSchedule"> | string
    doctorId?: StringWithAggregatesFilter<"DoctorSchedule"> | string
    day?: EnumWeekdayWithAggregatesFilter<"DoctorSchedule"> | $Enums.Weekday
    startTime?: StringWithAggregatesFilter<"DoctorSchedule"> | string
    endTime?: StringWithAggregatesFilter<"DoctorSchedule"> | string
    bookingCloseTime?: StringNullableWithAggregatesFilter<"DoctorSchedule"> | string | null
  }

  export type DoctorSessionWhereInput = {
    AND?: DoctorSessionWhereInput | DoctorSessionWhereInput[]
    OR?: DoctorSessionWhereInput[]
    NOT?: DoctorSessionWhereInput | DoctorSessionWhereInput[]
    id?: StringFilter<"DoctorSession"> | string
    doctorId?: StringFilter<"DoctorSession"> | string
    date?: DateTimeFilter<"DoctorSession"> | Date | string
    startTime?: StringFilter<"DoctorSession"> | string
    endTime?: StringFilter<"DoctorSession"> | string
    lastTokenNumber?: IntFilter<"DoctorSession"> | number
    bookingOpensAt?: DateTimeFilter<"DoctorSession"> | Date | string
    bookingClosesAt?: DateTimeFilter<"DoctorSession"> | Date | string
    bookingExtended?: BoolFilter<"DoctorSession"> | boolean
    bookingManuallyClosed?: BoolFilter<"DoctorSession"> | boolean
    queueStatus?: EnumQueueStatusFilter<"DoctorSession"> | $Enums.QueueStatus
    queueStartedAt?: DateTimeNullableFilter<"DoctorSession"> | Date | string | null
    queueEndedAt?: DateTimeNullableFilter<"DoctorSession"> | Date | string | null
    queueVersion?: IntFilter<"DoctorSession"> | number
    servingBookingId?: StringNullableFilter<"DoctorSession"> | string | null
    createdAt?: DateTimeFilter<"DoctorSession"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    servingBooking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
    bookings?: BookingListRelationFilter
  }

  export type DoctorSessionOrderByWithRelationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    lastTokenNumber?: SortOrder
    bookingOpensAt?: SortOrder
    bookingClosesAt?: SortOrder
    bookingExtended?: SortOrder
    bookingManuallyClosed?: SortOrder
    queueStatus?: SortOrder
    queueStartedAt?: SortOrderInput | SortOrder
    queueEndedAt?: SortOrderInput | SortOrder
    queueVersion?: SortOrder
    servingBookingId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    doctor?: DoctorOrderByWithRelationInput
    servingBooking?: BookingOrderByWithRelationInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type DoctorSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    servingBookingId?: string
    doctorId_date_startTime?: DoctorSessionDoctorIdDateStartTimeCompoundUniqueInput
    AND?: DoctorSessionWhereInput | DoctorSessionWhereInput[]
    OR?: DoctorSessionWhereInput[]
    NOT?: DoctorSessionWhereInput | DoctorSessionWhereInput[]
    doctorId?: StringFilter<"DoctorSession"> | string
    date?: DateTimeFilter<"DoctorSession"> | Date | string
    startTime?: StringFilter<"DoctorSession"> | string
    endTime?: StringFilter<"DoctorSession"> | string
    lastTokenNumber?: IntFilter<"DoctorSession"> | number
    bookingOpensAt?: DateTimeFilter<"DoctorSession"> | Date | string
    bookingClosesAt?: DateTimeFilter<"DoctorSession"> | Date | string
    bookingExtended?: BoolFilter<"DoctorSession"> | boolean
    bookingManuallyClosed?: BoolFilter<"DoctorSession"> | boolean
    queueStatus?: EnumQueueStatusFilter<"DoctorSession"> | $Enums.QueueStatus
    queueStartedAt?: DateTimeNullableFilter<"DoctorSession"> | Date | string | null
    queueEndedAt?: DateTimeNullableFilter<"DoctorSession"> | Date | string | null
    queueVersion?: IntFilter<"DoctorSession"> | number
    createdAt?: DateTimeFilter<"DoctorSession"> | Date | string
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    servingBooking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
    bookings?: BookingListRelationFilter
  }, "id" | "servingBookingId" | "doctorId_date_startTime">

  export type DoctorSessionOrderByWithAggregationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    lastTokenNumber?: SortOrder
    bookingOpensAt?: SortOrder
    bookingClosesAt?: SortOrder
    bookingExtended?: SortOrder
    bookingManuallyClosed?: SortOrder
    queueStatus?: SortOrder
    queueStartedAt?: SortOrderInput | SortOrder
    queueEndedAt?: SortOrderInput | SortOrder
    queueVersion?: SortOrder
    servingBookingId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DoctorSessionCountOrderByAggregateInput
    _avg?: DoctorSessionAvgOrderByAggregateInput
    _max?: DoctorSessionMaxOrderByAggregateInput
    _min?: DoctorSessionMinOrderByAggregateInput
    _sum?: DoctorSessionSumOrderByAggregateInput
  }

  export type DoctorSessionScalarWhereWithAggregatesInput = {
    AND?: DoctorSessionScalarWhereWithAggregatesInput | DoctorSessionScalarWhereWithAggregatesInput[]
    OR?: DoctorSessionScalarWhereWithAggregatesInput[]
    NOT?: DoctorSessionScalarWhereWithAggregatesInput | DoctorSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DoctorSession"> | string
    doctorId?: StringWithAggregatesFilter<"DoctorSession"> | string
    date?: DateTimeWithAggregatesFilter<"DoctorSession"> | Date | string
    startTime?: StringWithAggregatesFilter<"DoctorSession"> | string
    endTime?: StringWithAggregatesFilter<"DoctorSession"> | string
    lastTokenNumber?: IntWithAggregatesFilter<"DoctorSession"> | number
    bookingOpensAt?: DateTimeWithAggregatesFilter<"DoctorSession"> | Date | string
    bookingClosesAt?: DateTimeWithAggregatesFilter<"DoctorSession"> | Date | string
    bookingExtended?: BoolWithAggregatesFilter<"DoctorSession"> | boolean
    bookingManuallyClosed?: BoolWithAggregatesFilter<"DoctorSession"> | boolean
    queueStatus?: EnumQueueStatusWithAggregatesFilter<"DoctorSession"> | $Enums.QueueStatus
    queueStartedAt?: DateTimeNullableWithAggregatesFilter<"DoctorSession"> | Date | string | null
    queueEndedAt?: DateTimeNullableWithAggregatesFilter<"DoctorSession"> | Date | string | null
    queueVersion?: IntWithAggregatesFilter<"DoctorSession"> | number
    servingBookingId?: StringNullableWithAggregatesFilter<"DoctorSession"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DoctorSession"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    tokenNumber?: IntFilter<"Booking"> | number
    queuePosition?: IntFilter<"Booking"> | number
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    patientName?: StringNullableFilter<"Booking"> | string | null
    skipCount?: IntFilter<"Booking"> | number
    lastSkippedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    userId?: StringFilter<"Booking"> | string
    clinicId?: StringFilter<"Booking"> | string
    sessionId?: StringFilter<"Booking"> | string
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    calledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    session?: XOR<DoctorSessionScalarRelationFilter, DoctorSessionWhereInput>
    servingIn?: XOR<DoctorSessionNullableScalarRelationFilter, DoctorSessionWhereInput> | null
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    tokenNumber?: SortOrder
    queuePosition?: SortOrder
    status?: SortOrder
    patientName?: SortOrderInput | SortOrder
    skipCount?: SortOrder
    lastSkippedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    calledAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    clinic?: ClinicOrderByWithRelationInput
    session?: DoctorSessionOrderByWithRelationInput
    servingIn?: DoctorSessionOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId_tokenNumber?: BookingSessionIdTokenNumberCompoundUniqueInput
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    tokenNumber?: IntFilter<"Booking"> | number
    queuePosition?: IntFilter<"Booking"> | number
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    patientName?: StringNullableFilter<"Booking"> | string | null
    skipCount?: IntFilter<"Booking"> | number
    lastSkippedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    userId?: StringFilter<"Booking"> | string
    clinicId?: StringFilter<"Booking"> | string
    sessionId?: StringFilter<"Booking"> | string
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    calledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    session?: XOR<DoctorSessionScalarRelationFilter, DoctorSessionWhereInput>
    servingIn?: XOR<DoctorSessionNullableScalarRelationFilter, DoctorSessionWhereInput> | null
  }, "id" | "sessionId_tokenNumber">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    tokenNumber?: SortOrder
    queuePosition?: SortOrder
    status?: SortOrder
    patientName?: SortOrderInput | SortOrder
    skipCount?: SortOrder
    lastSkippedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    calledAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    tokenNumber?: IntWithAggregatesFilter<"Booking"> | number
    queuePosition?: IntWithAggregatesFilter<"Booking"> | number
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    patientName?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    skipCount?: IntWithAggregatesFilter<"Booking"> | number
    lastSkippedAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    userId?: StringWithAggregatesFilter<"Booking"> | string
    clinicId?: StringWithAggregatesFilter<"Booking"> | string
    sessionId?: StringWithAggregatesFilter<"Booking"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    calledAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
  }

  export type UserCreateInput = {
    id: string
    name: string
    email: string
    image?: string | null
    createdAt?: Date | string
    clinic?: ClinicCreateNestedOneWithoutUserInput
    bookings?: BookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name: string
    email: string
    image?: string | null
    createdAt?: Date | string
    clinic?: ClinicUncheckedCreateNestedOneWithoutUserInput
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneWithoutUserNestedInput
    bookings?: BookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUncheckedUpdateOneWithoutUserNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name: string
    email: string
    image?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCreateInput = {
    id?: string
    name: string
    address: string
    city: string
    email: string
    phone: string
    logo?: string | null
    clinicImage?: ClinicCreateclinicImageInput | string[]
    isApproved?: boolean
    timezone?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClinicInput
    doctors?: DoctorCreateNestedManyWithoutClinicInput
    bookings?: BookingCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateInput = {
    id?: string
    name: string
    address: string
    city: string
    email: string
    phone: string
    logo?: string | null
    clinicImage?: ClinicCreateclinicImageInput | string[]
    isApproved?: boolean
    timezone?: string
    userId: string
    createdAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutClinicInput
    bookings?: BookingUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImage?: ClinicUpdateclinicImageInput | string[]
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClinicNestedInput
    doctors?: DoctorUpdateManyWithoutClinicNestedInput
    bookings?: BookingUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImage?: ClinicUpdateclinicImageInput | string[]
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    timezone?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutClinicNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type ClinicCreateManyInput = {
    id?: string
    name: string
    address: string
    city: string
    email: string
    phone: string
    logo?: string | null
    clinicImage?: ClinicCreateclinicImageInput | string[]
    isApproved?: boolean
    timezone?: string
    userId: string
    createdAt?: Date | string
  }

  export type ClinicUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImage?: ClinicUpdateclinicImageInput | string[]
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImage?: ClinicUpdateclinicImageInput | string[]
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    timezone?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorCreateInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    isActive?: boolean
    specialtySlug: string
    createdAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutDoctorsInput
    schedules?: DoctorScheduleCreateNestedManyWithoutDoctorInput
    sessions?: DoctorSessionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    isActive?: boolean
    specialtySlug: string
    clinicId: string
    createdAt?: Date | string
    schedules?: DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput
    sessions?: DoctorSessionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutDoctorsNestedInput
    schedules?: DoctorScheduleUpdateManyWithoutDoctorNestedInput
    sessions?: DoctorSessionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput
    sessions?: DoctorSessionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorCreateManyInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    isActive?: boolean
    specialtySlug: string
    clinicId: string
    createdAt?: Date | string
  }

  export type DoctorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorScheduleCreateInput = {
    id?: string
    day: $Enums.Weekday
    startTime: string
    endTime: string
    bookingCloseTime?: string | null
    doctor: DoctorCreateNestedOneWithoutSchedulesInput
  }

  export type DoctorScheduleUncheckedCreateInput = {
    id?: string
    doctorId: string
    day: $Enums.Weekday
    startTime: string
    endTime: string
    bookingCloseTime?: string | null
  }

  export type DoctorScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    bookingCloseTime?: NullableStringFieldUpdateOperationsInput | string | null
    doctor?: DoctorUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type DoctorScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    day?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    bookingCloseTime?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DoctorScheduleCreateManyInput = {
    id?: string
    doctorId: string
    day: $Enums.Weekday
    startTime: string
    endTime: string
    bookingCloseTime?: string | null
  }

  export type DoctorScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    bookingCloseTime?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DoctorScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    day?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    bookingCloseTime?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DoctorSessionCreateInput = {
    id?: string
    date: Date | string
    startTime: string
    endTime: string
    lastTokenNumber?: number
    bookingOpensAt: Date | string
    bookingClosesAt: Date | string
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: $Enums.QueueStatus
    queueStartedAt?: Date | string | null
    queueEndedAt?: Date | string | null
    queueVersion?: number
    createdAt?: Date | string
    doctor: DoctorCreateNestedOneWithoutSessionsInput
    servingBooking?: BookingCreateNestedOneWithoutServingInInput
    bookings?: BookingCreateNestedManyWithoutSessionInput
  }

  export type DoctorSessionUncheckedCreateInput = {
    id?: string
    doctorId: string
    date: Date | string
    startTime: string
    endTime: string
    lastTokenNumber?: number
    bookingOpensAt: Date | string
    bookingClosesAt: Date | string
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: $Enums.QueueStatus
    queueStartedAt?: Date | string | null
    queueEndedAt?: Date | string | null
    queueVersion?: number
    servingBookingId?: string | null
    createdAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutSessionInput
  }

  export type DoctorSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutSessionsNestedInput
    servingBooking?: BookingUpdateOneWithoutServingInNestedInput
    bookings?: BookingUpdateManyWithoutSessionNestedInput
  }

  export type DoctorSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    servingBookingId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type DoctorSessionCreateManyInput = {
    id?: string
    doctorId: string
    date: Date | string
    startTime: string
    endTime: string
    lastTokenNumber?: number
    bookingOpensAt: Date | string
    bookingClosesAt: Date | string
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: $Enums.QueueStatus
    queueStartedAt?: Date | string | null
    queueEndedAt?: Date | string | null
    queueVersion?: number
    servingBookingId?: string | null
    createdAt?: Date | string
  }

  export type DoctorSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    servingBookingId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    user: UserCreateNestedOneWithoutBookingsInput
    clinic: ClinicCreateNestedOneWithoutBookingsInput
    session: DoctorSessionCreateNestedOneWithoutBookingsInput
    servingIn?: DoctorSessionCreateNestedOneWithoutServingBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    userId: string
    clinicId: string
    sessionId: string
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    servingIn?: DoctorSessionUncheckedCreateNestedOneWithoutServingBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutBookingsNestedInput
    session?: DoctorSessionUpdateOneRequiredWithoutBookingsNestedInput
    servingIn?: DoctorSessionUpdateOneWithoutServingBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servingIn?: DoctorSessionUncheckedUpdateOneWithoutServingBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    userId: string
    clinicId: string
    sessionId: string
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClinicNullableScalarRelationFilter = {
    is?: ClinicWhereInput | null
    isNot?: ClinicWhereInput | null
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DoctorListRelationFilter = {
    every?: DoctorWhereInput
    some?: DoctorWhereInput
    none?: DoctorWhereInput
  }

  export type DoctorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClinicCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    logo?: SortOrder
    clinicImage?: SortOrder
    isApproved?: SortOrder
    timezone?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClinicMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    logo?: SortOrder
    isApproved?: SortOrder
    timezone?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClinicMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    logo?: SortOrder
    isApproved?: SortOrder
    timezone?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ClinicScalarRelationFilter = {
    is?: ClinicWhereInput
    isNot?: ClinicWhereInput
  }

  export type DoctorScheduleListRelationFilter = {
    every?: DoctorScheduleWhereInput
    some?: DoctorScheduleWhereInput
    none?: DoctorScheduleWhereInput
  }

  export type DoctorSessionListRelationFilter = {
    every?: DoctorSessionWhereInput
    some?: DoctorSessionWhereInput
    none?: DoctorSessionWhereInput
  }

  export type DoctorScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DoctorSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DoctorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    specialtySlug?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
  }

  export type DoctorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    specialtySlug?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
  }

  export type DoctorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    specialtySlug?: SortOrder
    clinicId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumWeekdayFilter<$PrismaModel = never> = {
    equals?: $Enums.Weekday | EnumWeekdayFieldRefInput<$PrismaModel>
    in?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    not?: NestedEnumWeekdayFilter<$PrismaModel> | $Enums.Weekday
  }

  export type DoctorScalarRelationFilter = {
    is?: DoctorWhereInput
    isNot?: DoctorWhereInput
  }

  export type DoctorScheduleDoctorIdDayStartTimeCompoundUniqueInput = {
    doctorId: string
    day: $Enums.Weekday
    startTime: string
  }

  export type DoctorScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    bookingCloseTime?: SortOrder
  }

  export type DoctorScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    bookingCloseTime?: SortOrder
  }

  export type DoctorScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    day?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    bookingCloseTime?: SortOrder
  }

  export type EnumWeekdayWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Weekday | EnumWeekdayFieldRefInput<$PrismaModel>
    in?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    not?: NestedEnumWeekdayWithAggregatesFilter<$PrismaModel> | $Enums.Weekday
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWeekdayFilter<$PrismaModel>
    _max?: NestedEnumWeekdayFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumQueueStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QueueStatus | EnumQueueStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQueueStatusFilter<$PrismaModel> | $Enums.QueueStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BookingNullableScalarRelationFilter = {
    is?: BookingWhereInput | null
    isNot?: BookingWhereInput | null
  }

  export type DoctorSessionDoctorIdDateStartTimeCompoundUniqueInput = {
    doctorId: string
    date: Date | string
    startTime: string
  }

  export type DoctorSessionCountOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    lastTokenNumber?: SortOrder
    bookingOpensAt?: SortOrder
    bookingClosesAt?: SortOrder
    bookingExtended?: SortOrder
    bookingManuallyClosed?: SortOrder
    queueStatus?: SortOrder
    queueStartedAt?: SortOrder
    queueEndedAt?: SortOrder
    queueVersion?: SortOrder
    servingBookingId?: SortOrder
    createdAt?: SortOrder
  }

  export type DoctorSessionAvgOrderByAggregateInput = {
    lastTokenNumber?: SortOrder
    queueVersion?: SortOrder
  }

  export type DoctorSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    lastTokenNumber?: SortOrder
    bookingOpensAt?: SortOrder
    bookingClosesAt?: SortOrder
    bookingExtended?: SortOrder
    bookingManuallyClosed?: SortOrder
    queueStatus?: SortOrder
    queueStartedAt?: SortOrder
    queueEndedAt?: SortOrder
    queueVersion?: SortOrder
    servingBookingId?: SortOrder
    createdAt?: SortOrder
  }

  export type DoctorSessionMinOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    lastTokenNumber?: SortOrder
    bookingOpensAt?: SortOrder
    bookingClosesAt?: SortOrder
    bookingExtended?: SortOrder
    bookingManuallyClosed?: SortOrder
    queueStatus?: SortOrder
    queueStartedAt?: SortOrder
    queueEndedAt?: SortOrder
    queueVersion?: SortOrder
    servingBookingId?: SortOrder
    createdAt?: SortOrder
  }

  export type DoctorSessionSumOrderByAggregateInput = {
    lastTokenNumber?: SortOrder
    queueVersion?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumQueueStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QueueStatus | EnumQueueStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQueueStatusWithAggregatesFilter<$PrismaModel> | $Enums.QueueStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQueueStatusFilter<$PrismaModel>
    _max?: NestedEnumQueueStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type DoctorSessionScalarRelationFilter = {
    is?: DoctorSessionWhereInput
    isNot?: DoctorSessionWhereInput
  }

  export type DoctorSessionNullableScalarRelationFilter = {
    is?: DoctorSessionWhereInput | null
    isNot?: DoctorSessionWhereInput | null
  }

  export type BookingSessionIdTokenNumberCompoundUniqueInput = {
    sessionId: string
    tokenNumber: number
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    tokenNumber?: SortOrder
    queuePosition?: SortOrder
    status?: SortOrder
    patientName?: SortOrder
    skipCount?: SortOrder
    lastSkippedAt?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    calledAt?: SortOrder
    completedAt?: SortOrder
    cancelledAt?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    tokenNumber?: SortOrder
    queuePosition?: SortOrder
    skipCount?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenNumber?: SortOrder
    queuePosition?: SortOrder
    status?: SortOrder
    patientName?: SortOrder
    skipCount?: SortOrder
    lastSkippedAt?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    calledAt?: SortOrder
    completedAt?: SortOrder
    cancelledAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    tokenNumber?: SortOrder
    queuePosition?: SortOrder
    status?: SortOrder
    patientName?: SortOrder
    skipCount?: SortOrder
    lastSkippedAt?: SortOrder
    userId?: SortOrder
    clinicId?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
    calledAt?: SortOrder
    completedAt?: SortOrder
    cancelledAt?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    tokenNumber?: SortOrder
    queuePosition?: SortOrder
    skipCount?: SortOrder
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type ClinicCreateNestedOneWithoutUserInput = {
    create?: XOR<ClinicCreateWithoutUserInput, ClinicUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutUserInput
    connect?: ClinicWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutUserInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ClinicUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ClinicCreateWithoutUserInput, ClinicUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutUserInput
    connect?: ClinicWhereUniqueInput
  }

  export type BookingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClinicUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClinicCreateWithoutUserInput, ClinicUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutUserInput
    upsert?: ClinicUpsertWithoutUserInput
    disconnect?: ClinicWhereInput | boolean
    delete?: ClinicWhereInput | boolean
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutUserInput, ClinicUpdateWithoutUserInput>, ClinicUncheckedUpdateWithoutUserInput>
  }

  export type BookingUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUserInput | BookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUserInput | BookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUserInput | BookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ClinicUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClinicCreateWithoutUserInput, ClinicUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutUserInput
    upsert?: ClinicUpsertWithoutUserInput
    disconnect?: ClinicWhereInput | boolean
    delete?: ClinicWhereInput | boolean
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutUserInput, ClinicUpdateWithoutUserInput>, ClinicUncheckedUpdateWithoutUserInput>
  }

  export type BookingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUserInput | BookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUserInput | BookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUserInput | BookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ClinicCreateclinicImageInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutClinicInput = {
    create?: XOR<UserCreateWithoutClinicInput, UserUncheckedCreateWithoutClinicInput>
    connectOrCreate?: UserCreateOrConnectWithoutClinicInput
    connect?: UserWhereUniqueInput
  }

  export type DoctorCreateNestedManyWithoutClinicInput = {
    create?: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput> | DoctorCreateWithoutClinicInput[] | DoctorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutClinicInput | DoctorCreateOrConnectWithoutClinicInput[]
    createMany?: DoctorCreateManyClinicInputEnvelope
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutClinicInput = {
    create?: XOR<BookingCreateWithoutClinicInput, BookingUncheckedCreateWithoutClinicInput> | BookingCreateWithoutClinicInput[] | BookingUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClinicInput | BookingCreateOrConnectWithoutClinicInput[]
    createMany?: BookingCreateManyClinicInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type DoctorUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput> | DoctorCreateWithoutClinicInput[] | DoctorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutClinicInput | DoctorCreateOrConnectWithoutClinicInput[]
    createMany?: DoctorCreateManyClinicInputEnvelope
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<BookingCreateWithoutClinicInput, BookingUncheckedCreateWithoutClinicInput> | BookingCreateWithoutClinicInput[] | BookingUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClinicInput | BookingCreateOrConnectWithoutClinicInput[]
    createMany?: BookingCreateManyClinicInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type ClinicUpdateclinicImageInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutClinicNestedInput = {
    create?: XOR<UserCreateWithoutClinicInput, UserUncheckedCreateWithoutClinicInput>
    connectOrCreate?: UserCreateOrConnectWithoutClinicInput
    upsert?: UserUpsertWithoutClinicInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClinicInput, UserUpdateWithoutClinicInput>, UserUncheckedUpdateWithoutClinicInput>
  }

  export type DoctorUpdateManyWithoutClinicNestedInput = {
    create?: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput> | DoctorCreateWithoutClinicInput[] | DoctorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutClinicInput | DoctorCreateOrConnectWithoutClinicInput[]
    upsert?: DoctorUpsertWithWhereUniqueWithoutClinicInput | DoctorUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: DoctorCreateManyClinicInputEnvelope
    set?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    disconnect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    delete?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    update?: DoctorUpdateWithWhereUniqueWithoutClinicInput | DoctorUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: DoctorUpdateManyWithWhereWithoutClinicInput | DoctorUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: DoctorScalarWhereInput | DoctorScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutClinicNestedInput = {
    create?: XOR<BookingCreateWithoutClinicInput, BookingUncheckedCreateWithoutClinicInput> | BookingCreateWithoutClinicInput[] | BookingUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClinicInput | BookingCreateOrConnectWithoutClinicInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutClinicInput | BookingUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: BookingCreateManyClinicInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutClinicInput | BookingUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutClinicInput | BookingUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type DoctorUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput> | DoctorCreateWithoutClinicInput[] | DoctorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: DoctorCreateOrConnectWithoutClinicInput | DoctorCreateOrConnectWithoutClinicInput[]
    upsert?: DoctorUpsertWithWhereUniqueWithoutClinicInput | DoctorUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: DoctorCreateManyClinicInputEnvelope
    set?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    disconnect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    delete?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    connect?: DoctorWhereUniqueInput | DoctorWhereUniqueInput[]
    update?: DoctorUpdateWithWhereUniqueWithoutClinicInput | DoctorUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: DoctorUpdateManyWithWhereWithoutClinicInput | DoctorUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: DoctorScalarWhereInput | DoctorScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<BookingCreateWithoutClinicInput, BookingUncheckedCreateWithoutClinicInput> | BookingCreateWithoutClinicInput[] | BookingUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClinicInput | BookingCreateOrConnectWithoutClinicInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutClinicInput | BookingUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: BookingCreateManyClinicInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutClinicInput | BookingUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutClinicInput | BookingUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ClinicCreateNestedOneWithoutDoctorsInput = {
    create?: XOR<ClinicCreateWithoutDoctorsInput, ClinicUncheckedCreateWithoutDoctorsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutDoctorsInput
    connect?: ClinicWhereUniqueInput
  }

  export type DoctorScheduleCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorScheduleCreateWithoutDoctorInput, DoctorScheduleUncheckedCreateWithoutDoctorInput> | DoctorScheduleCreateWithoutDoctorInput[] | DoctorScheduleUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorScheduleCreateOrConnectWithoutDoctorInput | DoctorScheduleCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorScheduleCreateManyDoctorInputEnvelope
    connect?: DoctorScheduleWhereUniqueInput | DoctorScheduleWhereUniqueInput[]
  }

  export type DoctorSessionCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorSessionCreateWithoutDoctorInput, DoctorSessionUncheckedCreateWithoutDoctorInput> | DoctorSessionCreateWithoutDoctorInput[] | DoctorSessionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorSessionCreateOrConnectWithoutDoctorInput | DoctorSessionCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorSessionCreateManyDoctorInputEnvelope
    connect?: DoctorSessionWhereUniqueInput | DoctorSessionWhereUniqueInput[]
  }

  export type DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorScheduleCreateWithoutDoctorInput, DoctorScheduleUncheckedCreateWithoutDoctorInput> | DoctorScheduleCreateWithoutDoctorInput[] | DoctorScheduleUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorScheduleCreateOrConnectWithoutDoctorInput | DoctorScheduleCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorScheduleCreateManyDoctorInputEnvelope
    connect?: DoctorScheduleWhereUniqueInput | DoctorScheduleWhereUniqueInput[]
  }

  export type DoctorSessionUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorSessionCreateWithoutDoctorInput, DoctorSessionUncheckedCreateWithoutDoctorInput> | DoctorSessionCreateWithoutDoctorInput[] | DoctorSessionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorSessionCreateOrConnectWithoutDoctorInput | DoctorSessionCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorSessionCreateManyDoctorInputEnvelope
    connect?: DoctorSessionWhereUniqueInput | DoctorSessionWhereUniqueInput[]
  }

  export type ClinicUpdateOneRequiredWithoutDoctorsNestedInput = {
    create?: XOR<ClinicCreateWithoutDoctorsInput, ClinicUncheckedCreateWithoutDoctorsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutDoctorsInput
    upsert?: ClinicUpsertWithoutDoctorsInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutDoctorsInput, ClinicUpdateWithoutDoctorsInput>, ClinicUncheckedUpdateWithoutDoctorsInput>
  }

  export type DoctorScheduleUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorScheduleCreateWithoutDoctorInput, DoctorScheduleUncheckedCreateWithoutDoctorInput> | DoctorScheduleCreateWithoutDoctorInput[] | DoctorScheduleUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorScheduleCreateOrConnectWithoutDoctorInput | DoctorScheduleCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorScheduleUpsertWithWhereUniqueWithoutDoctorInput | DoctorScheduleUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorScheduleCreateManyDoctorInputEnvelope
    set?: DoctorScheduleWhereUniqueInput | DoctorScheduleWhereUniqueInput[]
    disconnect?: DoctorScheduleWhereUniqueInput | DoctorScheduleWhereUniqueInput[]
    delete?: DoctorScheduleWhereUniqueInput | DoctorScheduleWhereUniqueInput[]
    connect?: DoctorScheduleWhereUniqueInput | DoctorScheduleWhereUniqueInput[]
    update?: DoctorScheduleUpdateWithWhereUniqueWithoutDoctorInput | DoctorScheduleUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorScheduleUpdateManyWithWhereWithoutDoctorInput | DoctorScheduleUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorScheduleScalarWhereInput | DoctorScheduleScalarWhereInput[]
  }

  export type DoctorSessionUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorSessionCreateWithoutDoctorInput, DoctorSessionUncheckedCreateWithoutDoctorInput> | DoctorSessionCreateWithoutDoctorInput[] | DoctorSessionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorSessionCreateOrConnectWithoutDoctorInput | DoctorSessionCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorSessionUpsertWithWhereUniqueWithoutDoctorInput | DoctorSessionUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorSessionCreateManyDoctorInputEnvelope
    set?: DoctorSessionWhereUniqueInput | DoctorSessionWhereUniqueInput[]
    disconnect?: DoctorSessionWhereUniqueInput | DoctorSessionWhereUniqueInput[]
    delete?: DoctorSessionWhereUniqueInput | DoctorSessionWhereUniqueInput[]
    connect?: DoctorSessionWhereUniqueInput | DoctorSessionWhereUniqueInput[]
    update?: DoctorSessionUpdateWithWhereUniqueWithoutDoctorInput | DoctorSessionUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorSessionUpdateManyWithWhereWithoutDoctorInput | DoctorSessionUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorSessionScalarWhereInput | DoctorSessionScalarWhereInput[]
  }

  export type DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorScheduleCreateWithoutDoctorInput, DoctorScheduleUncheckedCreateWithoutDoctorInput> | DoctorScheduleCreateWithoutDoctorInput[] | DoctorScheduleUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorScheduleCreateOrConnectWithoutDoctorInput | DoctorScheduleCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorScheduleUpsertWithWhereUniqueWithoutDoctorInput | DoctorScheduleUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorScheduleCreateManyDoctorInputEnvelope
    set?: DoctorScheduleWhereUniqueInput | DoctorScheduleWhereUniqueInput[]
    disconnect?: DoctorScheduleWhereUniqueInput | DoctorScheduleWhereUniqueInput[]
    delete?: DoctorScheduleWhereUniqueInput | DoctorScheduleWhereUniqueInput[]
    connect?: DoctorScheduleWhereUniqueInput | DoctorScheduleWhereUniqueInput[]
    update?: DoctorScheduleUpdateWithWhereUniqueWithoutDoctorInput | DoctorScheduleUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorScheduleUpdateManyWithWhereWithoutDoctorInput | DoctorScheduleUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorScheduleScalarWhereInput | DoctorScheduleScalarWhereInput[]
  }

  export type DoctorSessionUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorSessionCreateWithoutDoctorInput, DoctorSessionUncheckedCreateWithoutDoctorInput> | DoctorSessionCreateWithoutDoctorInput[] | DoctorSessionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorSessionCreateOrConnectWithoutDoctorInput | DoctorSessionCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorSessionUpsertWithWhereUniqueWithoutDoctorInput | DoctorSessionUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorSessionCreateManyDoctorInputEnvelope
    set?: DoctorSessionWhereUniqueInput | DoctorSessionWhereUniqueInput[]
    disconnect?: DoctorSessionWhereUniqueInput | DoctorSessionWhereUniqueInput[]
    delete?: DoctorSessionWhereUniqueInput | DoctorSessionWhereUniqueInput[]
    connect?: DoctorSessionWhereUniqueInput | DoctorSessionWhereUniqueInput[]
    update?: DoctorSessionUpdateWithWhereUniqueWithoutDoctorInput | DoctorSessionUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorSessionUpdateManyWithWhereWithoutDoctorInput | DoctorSessionUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorSessionScalarWhereInput | DoctorSessionScalarWhereInput[]
  }

  export type DoctorCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<DoctorCreateWithoutSchedulesInput, DoctorUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutSchedulesInput
    connect?: DoctorWhereUniqueInput
  }

  export type EnumWeekdayFieldUpdateOperationsInput = {
    set?: $Enums.Weekday
  }

  export type DoctorUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<DoctorCreateWithoutSchedulesInput, DoctorUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutSchedulesInput
    upsert?: DoctorUpsertWithoutSchedulesInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutSchedulesInput, DoctorUpdateWithoutSchedulesInput>, DoctorUncheckedUpdateWithoutSchedulesInput>
  }

  export type DoctorCreateNestedOneWithoutSessionsInput = {
    create?: XOR<DoctorCreateWithoutSessionsInput, DoctorUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutSessionsInput
    connect?: DoctorWhereUniqueInput
  }

  export type BookingCreateNestedOneWithoutServingInInput = {
    create?: XOR<BookingCreateWithoutServingInInput, BookingUncheckedCreateWithoutServingInInput>
    connectOrCreate?: BookingCreateOrConnectWithoutServingInInput
    connect?: BookingWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutSessionInput = {
    create?: XOR<BookingCreateWithoutSessionInput, BookingUncheckedCreateWithoutSessionInput> | BookingCreateWithoutSessionInput[] | BookingUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutSessionInput | BookingCreateOrConnectWithoutSessionInput[]
    createMany?: BookingCreateManySessionInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<BookingCreateWithoutSessionInput, BookingUncheckedCreateWithoutSessionInput> | BookingCreateWithoutSessionInput[] | BookingUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutSessionInput | BookingCreateOrConnectWithoutSessionInput[]
    createMany?: BookingCreateManySessionInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumQueueStatusFieldUpdateOperationsInput = {
    set?: $Enums.QueueStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DoctorUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<DoctorCreateWithoutSessionsInput, DoctorUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutSessionsInput
    upsert?: DoctorUpsertWithoutSessionsInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutSessionsInput, DoctorUpdateWithoutSessionsInput>, DoctorUncheckedUpdateWithoutSessionsInput>
  }

  export type BookingUpdateOneWithoutServingInNestedInput = {
    create?: XOR<BookingCreateWithoutServingInInput, BookingUncheckedCreateWithoutServingInInput>
    connectOrCreate?: BookingCreateOrConnectWithoutServingInInput
    upsert?: BookingUpsertWithoutServingInInput
    disconnect?: BookingWhereInput | boolean
    delete?: BookingWhereInput | boolean
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutServingInInput, BookingUpdateWithoutServingInInput>, BookingUncheckedUpdateWithoutServingInInput>
  }

  export type BookingUpdateManyWithoutSessionNestedInput = {
    create?: XOR<BookingCreateWithoutSessionInput, BookingUncheckedCreateWithoutSessionInput> | BookingCreateWithoutSessionInput[] | BookingUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutSessionInput | BookingCreateOrConnectWithoutSessionInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutSessionInput | BookingUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: BookingCreateManySessionInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutSessionInput | BookingUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutSessionInput | BookingUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<BookingCreateWithoutSessionInput, BookingUncheckedCreateWithoutSessionInput> | BookingCreateWithoutSessionInput[] | BookingUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutSessionInput | BookingCreateOrConnectWithoutSessionInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutSessionInput | BookingUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: BookingCreateManySessionInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutSessionInput | BookingUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutSessionInput | BookingUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type ClinicCreateNestedOneWithoutBookingsInput = {
    create?: XOR<ClinicCreateWithoutBookingsInput, ClinicUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutBookingsInput
    connect?: ClinicWhereUniqueInput
  }

  export type DoctorSessionCreateNestedOneWithoutBookingsInput = {
    create?: XOR<DoctorSessionCreateWithoutBookingsInput, DoctorSessionUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: DoctorSessionCreateOrConnectWithoutBookingsInput
    connect?: DoctorSessionWhereUniqueInput
  }

  export type DoctorSessionCreateNestedOneWithoutServingBookingInput = {
    create?: XOR<DoctorSessionCreateWithoutServingBookingInput, DoctorSessionUncheckedCreateWithoutServingBookingInput>
    connectOrCreate?: DoctorSessionCreateOrConnectWithoutServingBookingInput
    connect?: DoctorSessionWhereUniqueInput
  }

  export type DoctorSessionUncheckedCreateNestedOneWithoutServingBookingInput = {
    create?: XOR<DoctorSessionCreateWithoutServingBookingInput, DoctorSessionUncheckedCreateWithoutServingBookingInput>
    connectOrCreate?: DoctorSessionCreateOrConnectWithoutServingBookingInput
    connect?: DoctorSessionWhereUniqueInput
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type UserUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    upsert?: UserUpsertWithoutBookingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookingsInput, UserUpdateWithoutBookingsInput>, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type ClinicUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<ClinicCreateWithoutBookingsInput, ClinicUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutBookingsInput
    upsert?: ClinicUpsertWithoutBookingsInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutBookingsInput, ClinicUpdateWithoutBookingsInput>, ClinicUncheckedUpdateWithoutBookingsInput>
  }

  export type DoctorSessionUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<DoctorSessionCreateWithoutBookingsInput, DoctorSessionUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: DoctorSessionCreateOrConnectWithoutBookingsInput
    upsert?: DoctorSessionUpsertWithoutBookingsInput
    connect?: DoctorSessionWhereUniqueInput
    update?: XOR<XOR<DoctorSessionUpdateToOneWithWhereWithoutBookingsInput, DoctorSessionUpdateWithoutBookingsInput>, DoctorSessionUncheckedUpdateWithoutBookingsInput>
  }

  export type DoctorSessionUpdateOneWithoutServingBookingNestedInput = {
    create?: XOR<DoctorSessionCreateWithoutServingBookingInput, DoctorSessionUncheckedCreateWithoutServingBookingInput>
    connectOrCreate?: DoctorSessionCreateOrConnectWithoutServingBookingInput
    upsert?: DoctorSessionUpsertWithoutServingBookingInput
    disconnect?: DoctorSessionWhereInput | boolean
    delete?: DoctorSessionWhereInput | boolean
    connect?: DoctorSessionWhereUniqueInput
    update?: XOR<XOR<DoctorSessionUpdateToOneWithWhereWithoutServingBookingInput, DoctorSessionUpdateWithoutServingBookingInput>, DoctorSessionUncheckedUpdateWithoutServingBookingInput>
  }

  export type DoctorSessionUncheckedUpdateOneWithoutServingBookingNestedInput = {
    create?: XOR<DoctorSessionCreateWithoutServingBookingInput, DoctorSessionUncheckedCreateWithoutServingBookingInput>
    connectOrCreate?: DoctorSessionCreateOrConnectWithoutServingBookingInput
    upsert?: DoctorSessionUpsertWithoutServingBookingInput
    disconnect?: DoctorSessionWhereInput | boolean
    delete?: DoctorSessionWhereInput | boolean
    connect?: DoctorSessionWhereUniqueInput
    update?: XOR<XOR<DoctorSessionUpdateToOneWithWhereWithoutServingBookingInput, DoctorSessionUpdateWithoutServingBookingInput>, DoctorSessionUncheckedUpdateWithoutServingBookingInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumWeekdayFilter<$PrismaModel = never> = {
    equals?: $Enums.Weekday | EnumWeekdayFieldRefInput<$PrismaModel>
    in?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    not?: NestedEnumWeekdayFilter<$PrismaModel> | $Enums.Weekday
  }

  export type NestedEnumWeekdayWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Weekday | EnumWeekdayFieldRefInput<$PrismaModel>
    in?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    not?: NestedEnumWeekdayWithAggregatesFilter<$PrismaModel> | $Enums.Weekday
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWeekdayFilter<$PrismaModel>
    _max?: NestedEnumWeekdayFilter<$PrismaModel>
  }

  export type NestedEnumQueueStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.QueueStatus | EnumQueueStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQueueStatusFilter<$PrismaModel> | $Enums.QueueStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumQueueStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QueueStatus | EnumQueueStatusFieldRefInput<$PrismaModel>
    in?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.QueueStatus[] | ListEnumQueueStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumQueueStatusWithAggregatesFilter<$PrismaModel> | $Enums.QueueStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQueueStatusFilter<$PrismaModel>
    _max?: NestedEnumQueueStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type ClinicCreateWithoutUserInput = {
    id?: string
    name: string
    address: string
    city: string
    email: string
    phone: string
    logo?: string | null
    clinicImage?: ClinicCreateclinicImageInput | string[]
    isApproved?: boolean
    timezone?: string
    createdAt?: Date | string
    doctors?: DoctorCreateNestedManyWithoutClinicInput
    bookings?: BookingCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    address: string
    city: string
    email: string
    phone: string
    logo?: string | null
    clinicImage?: ClinicCreateclinicImageInput | string[]
    isApproved?: boolean
    timezone?: string
    createdAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutClinicInput
    bookings?: BookingUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutUserInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutUserInput, ClinicUncheckedCreateWithoutUserInput>
  }

  export type BookingCreateWithoutUserInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    clinic: ClinicCreateNestedOneWithoutBookingsInput
    session: DoctorSessionCreateNestedOneWithoutBookingsInput
    servingIn?: DoctorSessionCreateNestedOneWithoutServingBookingInput
  }

  export type BookingUncheckedCreateWithoutUserInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    clinicId: string
    sessionId: string
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    servingIn?: DoctorSessionUncheckedCreateNestedOneWithoutServingBookingInput
  }

  export type BookingCreateOrConnectWithoutUserInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingCreateManyUserInputEnvelope = {
    data: BookingCreateManyUserInput | BookingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ClinicUpsertWithoutUserInput = {
    update: XOR<ClinicUpdateWithoutUserInput, ClinicUncheckedUpdateWithoutUserInput>
    create: XOR<ClinicCreateWithoutUserInput, ClinicUncheckedCreateWithoutUserInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutUserInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutUserInput, ClinicUncheckedUpdateWithoutUserInput>
  }

  export type ClinicUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImage?: ClinicUpdateclinicImageInput | string[]
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUpdateManyWithoutClinicNestedInput
    bookings?: BookingUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImage?: ClinicUpdateclinicImageInput | string[]
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutClinicNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type BookingUpsertWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
  }

  export type BookingUpdateManyWithWhereWithoutUserInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutUserInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    tokenNumber?: IntFilter<"Booking"> | number
    queuePosition?: IntFilter<"Booking"> | number
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    patientName?: StringNullableFilter<"Booking"> | string | null
    skipCount?: IntFilter<"Booking"> | number
    lastSkippedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    userId?: StringFilter<"Booking"> | string
    clinicId?: StringFilter<"Booking"> | string
    sessionId?: StringFilter<"Booking"> | string
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    calledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
  }

  export type UserCreateWithoutClinicInput = {
    id: string
    name: string
    email: string
    image?: string | null
    createdAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClinicInput = {
    id: string
    name: string
    email: string
    image?: string | null
    createdAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClinicInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClinicInput, UserUncheckedCreateWithoutClinicInput>
  }

  export type DoctorCreateWithoutClinicInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    isActive?: boolean
    specialtySlug: string
    createdAt?: Date | string
    schedules?: DoctorScheduleCreateNestedManyWithoutDoctorInput
    sessions?: DoctorSessionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutClinicInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    isActive?: boolean
    specialtySlug: string
    createdAt?: Date | string
    schedules?: DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput
    sessions?: DoctorSessionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutClinicInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput>
  }

  export type DoctorCreateManyClinicInputEnvelope = {
    data: DoctorCreateManyClinicInput | DoctorCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutClinicInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    user: UserCreateNestedOneWithoutBookingsInput
    session: DoctorSessionCreateNestedOneWithoutBookingsInput
    servingIn?: DoctorSessionCreateNestedOneWithoutServingBookingInput
  }

  export type BookingUncheckedCreateWithoutClinicInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    userId: string
    sessionId: string
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    servingIn?: DoctorSessionUncheckedCreateNestedOneWithoutServingBookingInput
  }

  export type BookingCreateOrConnectWithoutClinicInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutClinicInput, BookingUncheckedCreateWithoutClinicInput>
  }

  export type BookingCreateManyClinicInputEnvelope = {
    data: BookingCreateManyClinicInput | BookingCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutClinicInput = {
    update: XOR<UserUpdateWithoutClinicInput, UserUncheckedUpdateWithoutClinicInput>
    create: XOR<UserCreateWithoutClinicInput, UserUncheckedCreateWithoutClinicInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClinicInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClinicInput, UserUncheckedUpdateWithoutClinicInput>
  }

  export type UserUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DoctorUpsertWithWhereUniqueWithoutClinicInput = {
    where: DoctorWhereUniqueInput
    update: XOR<DoctorUpdateWithoutClinicInput, DoctorUncheckedUpdateWithoutClinicInput>
    create: XOR<DoctorCreateWithoutClinicInput, DoctorUncheckedCreateWithoutClinicInput>
  }

  export type DoctorUpdateWithWhereUniqueWithoutClinicInput = {
    where: DoctorWhereUniqueInput
    data: XOR<DoctorUpdateWithoutClinicInput, DoctorUncheckedUpdateWithoutClinicInput>
  }

  export type DoctorUpdateManyWithWhereWithoutClinicInput = {
    where: DoctorScalarWhereInput
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyWithoutClinicInput>
  }

  export type DoctorScalarWhereInput = {
    AND?: DoctorScalarWhereInput | DoctorScalarWhereInput[]
    OR?: DoctorScalarWhereInput[]
    NOT?: DoctorScalarWhereInput | DoctorScalarWhereInput[]
    id?: StringFilter<"Doctor"> | string
    name?: StringFilter<"Doctor"> | string
    image?: StringNullableFilter<"Doctor"> | string | null
    description?: StringNullableFilter<"Doctor"> | string | null
    isActive?: BoolFilter<"Doctor"> | boolean
    specialtySlug?: StringFilter<"Doctor"> | string
    clinicId?: StringFilter<"Doctor"> | string
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutClinicInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutClinicInput, BookingUncheckedUpdateWithoutClinicInput>
    create: XOR<BookingCreateWithoutClinicInput, BookingUncheckedCreateWithoutClinicInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutClinicInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutClinicInput, BookingUncheckedUpdateWithoutClinicInput>
  }

  export type BookingUpdateManyWithWhereWithoutClinicInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutClinicInput>
  }

  export type ClinicCreateWithoutDoctorsInput = {
    id?: string
    name: string
    address: string
    city: string
    email: string
    phone: string
    logo?: string | null
    clinicImage?: ClinicCreateclinicImageInput | string[]
    isApproved?: boolean
    timezone?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClinicInput
    bookings?: BookingCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutDoctorsInput = {
    id?: string
    name: string
    address: string
    city: string
    email: string
    phone: string
    logo?: string | null
    clinicImage?: ClinicCreateclinicImageInput | string[]
    isApproved?: boolean
    timezone?: string
    userId: string
    createdAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutDoctorsInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutDoctorsInput, ClinicUncheckedCreateWithoutDoctorsInput>
  }

  export type DoctorScheduleCreateWithoutDoctorInput = {
    id?: string
    day: $Enums.Weekday
    startTime: string
    endTime: string
    bookingCloseTime?: string | null
  }

  export type DoctorScheduleUncheckedCreateWithoutDoctorInput = {
    id?: string
    day: $Enums.Weekday
    startTime: string
    endTime: string
    bookingCloseTime?: string | null
  }

  export type DoctorScheduleCreateOrConnectWithoutDoctorInput = {
    where: DoctorScheduleWhereUniqueInput
    create: XOR<DoctorScheduleCreateWithoutDoctorInput, DoctorScheduleUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorScheduleCreateManyDoctorInputEnvelope = {
    data: DoctorScheduleCreateManyDoctorInput | DoctorScheduleCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type DoctorSessionCreateWithoutDoctorInput = {
    id?: string
    date: Date | string
    startTime: string
    endTime: string
    lastTokenNumber?: number
    bookingOpensAt: Date | string
    bookingClosesAt: Date | string
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: $Enums.QueueStatus
    queueStartedAt?: Date | string | null
    queueEndedAt?: Date | string | null
    queueVersion?: number
    createdAt?: Date | string
    servingBooking?: BookingCreateNestedOneWithoutServingInInput
    bookings?: BookingCreateNestedManyWithoutSessionInput
  }

  export type DoctorSessionUncheckedCreateWithoutDoctorInput = {
    id?: string
    date: Date | string
    startTime: string
    endTime: string
    lastTokenNumber?: number
    bookingOpensAt: Date | string
    bookingClosesAt: Date | string
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: $Enums.QueueStatus
    queueStartedAt?: Date | string | null
    queueEndedAt?: Date | string | null
    queueVersion?: number
    servingBookingId?: string | null
    createdAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutSessionInput
  }

  export type DoctorSessionCreateOrConnectWithoutDoctorInput = {
    where: DoctorSessionWhereUniqueInput
    create: XOR<DoctorSessionCreateWithoutDoctorInput, DoctorSessionUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorSessionCreateManyDoctorInputEnvelope = {
    data: DoctorSessionCreateManyDoctorInput | DoctorSessionCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type ClinicUpsertWithoutDoctorsInput = {
    update: XOR<ClinicUpdateWithoutDoctorsInput, ClinicUncheckedUpdateWithoutDoctorsInput>
    create: XOR<ClinicCreateWithoutDoctorsInput, ClinicUncheckedCreateWithoutDoctorsInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutDoctorsInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutDoctorsInput, ClinicUncheckedUpdateWithoutDoctorsInput>
  }

  export type ClinicUpdateWithoutDoctorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImage?: ClinicUpdateclinicImageInput | string[]
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClinicNestedInput
    bookings?: BookingUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutDoctorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImage?: ClinicUpdateclinicImageInput | string[]
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    timezone?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type DoctorScheduleUpsertWithWhereUniqueWithoutDoctorInput = {
    where: DoctorScheduleWhereUniqueInput
    update: XOR<DoctorScheduleUpdateWithoutDoctorInput, DoctorScheduleUncheckedUpdateWithoutDoctorInput>
    create: XOR<DoctorScheduleCreateWithoutDoctorInput, DoctorScheduleUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorScheduleUpdateWithWhereUniqueWithoutDoctorInput = {
    where: DoctorScheduleWhereUniqueInput
    data: XOR<DoctorScheduleUpdateWithoutDoctorInput, DoctorScheduleUncheckedUpdateWithoutDoctorInput>
  }

  export type DoctorScheduleUpdateManyWithWhereWithoutDoctorInput = {
    where: DoctorScheduleScalarWhereInput
    data: XOR<DoctorScheduleUpdateManyMutationInput, DoctorScheduleUncheckedUpdateManyWithoutDoctorInput>
  }

  export type DoctorScheduleScalarWhereInput = {
    AND?: DoctorScheduleScalarWhereInput | DoctorScheduleScalarWhereInput[]
    OR?: DoctorScheduleScalarWhereInput[]
    NOT?: DoctorScheduleScalarWhereInput | DoctorScheduleScalarWhereInput[]
    id?: StringFilter<"DoctorSchedule"> | string
    doctorId?: StringFilter<"DoctorSchedule"> | string
    day?: EnumWeekdayFilter<"DoctorSchedule"> | $Enums.Weekday
    startTime?: StringFilter<"DoctorSchedule"> | string
    endTime?: StringFilter<"DoctorSchedule"> | string
    bookingCloseTime?: StringNullableFilter<"DoctorSchedule"> | string | null
  }

  export type DoctorSessionUpsertWithWhereUniqueWithoutDoctorInput = {
    where: DoctorSessionWhereUniqueInput
    update: XOR<DoctorSessionUpdateWithoutDoctorInput, DoctorSessionUncheckedUpdateWithoutDoctorInput>
    create: XOR<DoctorSessionCreateWithoutDoctorInput, DoctorSessionUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorSessionUpdateWithWhereUniqueWithoutDoctorInput = {
    where: DoctorSessionWhereUniqueInput
    data: XOR<DoctorSessionUpdateWithoutDoctorInput, DoctorSessionUncheckedUpdateWithoutDoctorInput>
  }

  export type DoctorSessionUpdateManyWithWhereWithoutDoctorInput = {
    where: DoctorSessionScalarWhereInput
    data: XOR<DoctorSessionUpdateManyMutationInput, DoctorSessionUncheckedUpdateManyWithoutDoctorInput>
  }

  export type DoctorSessionScalarWhereInput = {
    AND?: DoctorSessionScalarWhereInput | DoctorSessionScalarWhereInput[]
    OR?: DoctorSessionScalarWhereInput[]
    NOT?: DoctorSessionScalarWhereInput | DoctorSessionScalarWhereInput[]
    id?: StringFilter<"DoctorSession"> | string
    doctorId?: StringFilter<"DoctorSession"> | string
    date?: DateTimeFilter<"DoctorSession"> | Date | string
    startTime?: StringFilter<"DoctorSession"> | string
    endTime?: StringFilter<"DoctorSession"> | string
    lastTokenNumber?: IntFilter<"DoctorSession"> | number
    bookingOpensAt?: DateTimeFilter<"DoctorSession"> | Date | string
    bookingClosesAt?: DateTimeFilter<"DoctorSession"> | Date | string
    bookingExtended?: BoolFilter<"DoctorSession"> | boolean
    bookingManuallyClosed?: BoolFilter<"DoctorSession"> | boolean
    queueStatus?: EnumQueueStatusFilter<"DoctorSession"> | $Enums.QueueStatus
    queueStartedAt?: DateTimeNullableFilter<"DoctorSession"> | Date | string | null
    queueEndedAt?: DateTimeNullableFilter<"DoctorSession"> | Date | string | null
    queueVersion?: IntFilter<"DoctorSession"> | number
    servingBookingId?: StringNullableFilter<"DoctorSession"> | string | null
    createdAt?: DateTimeFilter<"DoctorSession"> | Date | string
  }

  export type DoctorCreateWithoutSchedulesInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    isActive?: boolean
    specialtySlug: string
    createdAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutDoctorsInput
    sessions?: DoctorSessionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutSchedulesInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    isActive?: boolean
    specialtySlug: string
    clinicId: string
    createdAt?: Date | string
    sessions?: DoctorSessionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutSchedulesInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutSchedulesInput, DoctorUncheckedCreateWithoutSchedulesInput>
  }

  export type DoctorUpsertWithoutSchedulesInput = {
    update: XOR<DoctorUpdateWithoutSchedulesInput, DoctorUncheckedUpdateWithoutSchedulesInput>
    create: XOR<DoctorCreateWithoutSchedulesInput, DoctorUncheckedCreateWithoutSchedulesInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutSchedulesInput, DoctorUncheckedUpdateWithoutSchedulesInput>
  }

  export type DoctorUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutDoctorsNestedInput
    sessions?: DoctorSessionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: DoctorSessionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorCreateWithoutSessionsInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    isActive?: boolean
    specialtySlug: string
    createdAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutDoctorsInput
    schedules?: DoctorScheduleCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    isActive?: boolean
    specialtySlug: string
    clinicId: string
    createdAt?: Date | string
    schedules?: DoctorScheduleUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutSessionsInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutSessionsInput, DoctorUncheckedCreateWithoutSessionsInput>
  }

  export type BookingCreateWithoutServingInInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    user: UserCreateNestedOneWithoutBookingsInput
    clinic: ClinicCreateNestedOneWithoutBookingsInput
    session: DoctorSessionCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutServingInInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    userId: string
    clinicId: string
    sessionId: string
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
  }

  export type BookingCreateOrConnectWithoutServingInInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutServingInInput, BookingUncheckedCreateWithoutServingInInput>
  }

  export type BookingCreateWithoutSessionInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    user: UserCreateNestedOneWithoutBookingsInput
    clinic: ClinicCreateNestedOneWithoutBookingsInput
    servingIn?: DoctorSessionCreateNestedOneWithoutServingBookingInput
  }

  export type BookingUncheckedCreateWithoutSessionInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    userId: string
    clinicId: string
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    servingIn?: DoctorSessionUncheckedCreateNestedOneWithoutServingBookingInput
  }

  export type BookingCreateOrConnectWithoutSessionInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutSessionInput, BookingUncheckedCreateWithoutSessionInput>
  }

  export type BookingCreateManySessionInputEnvelope = {
    data: BookingCreateManySessionInput | BookingCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type DoctorUpsertWithoutSessionsInput = {
    update: XOR<DoctorUpdateWithoutSessionsInput, DoctorUncheckedUpdateWithoutSessionsInput>
    create: XOR<DoctorCreateWithoutSessionsInput, DoctorUncheckedCreateWithoutSessionsInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutSessionsInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutSessionsInput, DoctorUncheckedUpdateWithoutSessionsInput>
  }

  export type DoctorUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutDoctorsNestedInput
    schedules?: DoctorScheduleUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type BookingUpsertWithoutServingInInput = {
    update: XOR<BookingUpdateWithoutServingInInput, BookingUncheckedUpdateWithoutServingInInput>
    create: XOR<BookingCreateWithoutServingInInput, BookingUncheckedCreateWithoutServingInInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutServingInInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutServingInInput, BookingUncheckedUpdateWithoutServingInInput>
  }

  export type BookingUpdateWithoutServingInInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutBookingsNestedInput
    session?: DoctorSessionUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutServingInInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BookingUpsertWithWhereUniqueWithoutSessionInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutSessionInput, BookingUncheckedUpdateWithoutSessionInput>
    create: XOR<BookingCreateWithoutSessionInput, BookingUncheckedCreateWithoutSessionInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutSessionInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutSessionInput, BookingUncheckedUpdateWithoutSessionInput>
  }

  export type BookingUpdateManyWithWhereWithoutSessionInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutSessionInput>
  }

  export type UserCreateWithoutBookingsInput = {
    id: string
    name: string
    email: string
    image?: string | null
    createdAt?: Date | string
    clinic?: ClinicCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookingsInput = {
    id: string
    name: string
    email: string
    image?: string | null
    createdAt?: Date | string
    clinic?: ClinicUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
  }

  export type ClinicCreateWithoutBookingsInput = {
    id?: string
    name: string
    address: string
    city: string
    email: string
    phone: string
    logo?: string | null
    clinicImage?: ClinicCreateclinicImageInput | string[]
    isApproved?: boolean
    timezone?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClinicInput
    doctors?: DoctorCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutBookingsInput = {
    id?: string
    name: string
    address: string
    city: string
    email: string
    phone: string
    logo?: string | null
    clinicImage?: ClinicCreateclinicImageInput | string[]
    isApproved?: boolean
    timezone?: string
    userId: string
    createdAt?: Date | string
    doctors?: DoctorUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutBookingsInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutBookingsInput, ClinicUncheckedCreateWithoutBookingsInput>
  }

  export type DoctorSessionCreateWithoutBookingsInput = {
    id?: string
    date: Date | string
    startTime: string
    endTime: string
    lastTokenNumber?: number
    bookingOpensAt: Date | string
    bookingClosesAt: Date | string
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: $Enums.QueueStatus
    queueStartedAt?: Date | string | null
    queueEndedAt?: Date | string | null
    queueVersion?: number
    createdAt?: Date | string
    doctor: DoctorCreateNestedOneWithoutSessionsInput
    servingBooking?: BookingCreateNestedOneWithoutServingInInput
  }

  export type DoctorSessionUncheckedCreateWithoutBookingsInput = {
    id?: string
    doctorId: string
    date: Date | string
    startTime: string
    endTime: string
    lastTokenNumber?: number
    bookingOpensAt: Date | string
    bookingClosesAt: Date | string
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: $Enums.QueueStatus
    queueStartedAt?: Date | string | null
    queueEndedAt?: Date | string | null
    queueVersion?: number
    servingBookingId?: string | null
    createdAt?: Date | string
  }

  export type DoctorSessionCreateOrConnectWithoutBookingsInput = {
    where: DoctorSessionWhereUniqueInput
    create: XOR<DoctorSessionCreateWithoutBookingsInput, DoctorSessionUncheckedCreateWithoutBookingsInput>
  }

  export type DoctorSessionCreateWithoutServingBookingInput = {
    id?: string
    date: Date | string
    startTime: string
    endTime: string
    lastTokenNumber?: number
    bookingOpensAt: Date | string
    bookingClosesAt: Date | string
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: $Enums.QueueStatus
    queueStartedAt?: Date | string | null
    queueEndedAt?: Date | string | null
    queueVersion?: number
    createdAt?: Date | string
    doctor: DoctorCreateNestedOneWithoutSessionsInput
    bookings?: BookingCreateNestedManyWithoutSessionInput
  }

  export type DoctorSessionUncheckedCreateWithoutServingBookingInput = {
    id?: string
    doctorId: string
    date: Date | string
    startTime: string
    endTime: string
    lastTokenNumber?: number
    bookingOpensAt: Date | string
    bookingClosesAt: Date | string
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: $Enums.QueueStatus
    queueStartedAt?: Date | string | null
    queueEndedAt?: Date | string | null
    queueVersion?: number
    createdAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutSessionInput
  }

  export type DoctorSessionCreateOrConnectWithoutServingBookingInput = {
    where: DoctorSessionWhereUniqueInput
    create: XOR<DoctorSessionCreateWithoutServingBookingInput, DoctorSessionUncheckedCreateWithoutServingBookingInput>
  }

  export type UserUpsertWithoutBookingsInput = {
    update: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type UserUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ClinicUpsertWithoutBookingsInput = {
    update: XOR<ClinicUpdateWithoutBookingsInput, ClinicUncheckedUpdateWithoutBookingsInput>
    create: XOR<ClinicCreateWithoutBookingsInput, ClinicUncheckedCreateWithoutBookingsInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutBookingsInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutBookingsInput, ClinicUncheckedUpdateWithoutBookingsInput>
  }

  export type ClinicUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImage?: ClinicUpdateclinicImageInput | string[]
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClinicNestedInput
    doctors?: DoctorUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    clinicImage?: ClinicUpdateclinicImageInput | string[]
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    timezone?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctors?: DoctorUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type DoctorSessionUpsertWithoutBookingsInput = {
    update: XOR<DoctorSessionUpdateWithoutBookingsInput, DoctorSessionUncheckedUpdateWithoutBookingsInput>
    create: XOR<DoctorSessionCreateWithoutBookingsInput, DoctorSessionUncheckedCreateWithoutBookingsInput>
    where?: DoctorSessionWhereInput
  }

  export type DoctorSessionUpdateToOneWithWhereWithoutBookingsInput = {
    where?: DoctorSessionWhereInput
    data: XOR<DoctorSessionUpdateWithoutBookingsInput, DoctorSessionUncheckedUpdateWithoutBookingsInput>
  }

  export type DoctorSessionUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutSessionsNestedInput
    servingBooking?: BookingUpdateOneWithoutServingInNestedInput
  }

  export type DoctorSessionUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    servingBookingId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorSessionUpsertWithoutServingBookingInput = {
    update: XOR<DoctorSessionUpdateWithoutServingBookingInput, DoctorSessionUncheckedUpdateWithoutServingBookingInput>
    create: XOR<DoctorSessionCreateWithoutServingBookingInput, DoctorSessionUncheckedCreateWithoutServingBookingInput>
    where?: DoctorSessionWhereInput
  }

  export type DoctorSessionUpdateToOneWithWhereWithoutServingBookingInput = {
    where?: DoctorSessionWhereInput
    data: XOR<DoctorSessionUpdateWithoutServingBookingInput, DoctorSessionUncheckedUpdateWithoutServingBookingInput>
  }

  export type DoctorSessionUpdateWithoutServingBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: DoctorUpdateOneRequiredWithoutSessionsNestedInput
    bookings?: BookingUpdateManyWithoutSessionNestedInput
  }

  export type DoctorSessionUncheckedUpdateWithoutServingBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type BookingCreateManyUserInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    clinicId: string
    sessionId: string
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
  }

  export type BookingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clinic?: ClinicUpdateOneRequiredWithoutBookingsNestedInput
    session?: DoctorSessionUpdateOneRequiredWithoutBookingsNestedInput
    servingIn?: DoctorSessionUpdateOneWithoutServingBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clinicId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servingIn?: DoctorSessionUncheckedUpdateOneWithoutServingBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clinicId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorCreateManyClinicInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    isActive?: boolean
    specialtySlug: string
    createdAt?: Date | string
  }

  export type BookingCreateManyClinicInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    userId: string
    sessionId: string
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
  }

  export type DoctorUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: DoctorScheduleUpdateManyWithoutDoctorNestedInput
    sessions?: DoctorSessionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: DoctorScheduleUncheckedUpdateManyWithoutDoctorNestedInput
    sessions?: DoctorSessionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    specialtySlug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    session?: DoctorSessionUpdateOneRequiredWithoutBookingsNestedInput
    servingIn?: DoctorSessionUpdateOneWithoutServingBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servingIn?: DoctorSessionUncheckedUpdateOneWithoutServingBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DoctorScheduleCreateManyDoctorInput = {
    id?: string
    day: $Enums.Weekday
    startTime: string
    endTime: string
    bookingCloseTime?: string | null
  }

  export type DoctorSessionCreateManyDoctorInput = {
    id?: string
    date: Date | string
    startTime: string
    endTime: string
    lastTokenNumber?: number
    bookingOpensAt: Date | string
    bookingClosesAt: Date | string
    bookingExtended?: boolean
    bookingManuallyClosed?: boolean
    queueStatus?: $Enums.QueueStatus
    queueStartedAt?: Date | string | null
    queueEndedAt?: Date | string | null
    queueVersion?: number
    servingBookingId?: string | null
    createdAt?: Date | string
  }

  export type DoctorScheduleUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    bookingCloseTime?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DoctorScheduleUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    bookingCloseTime?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DoctorScheduleUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    bookingCloseTime?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DoctorSessionUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    servingBooking?: BookingUpdateOneWithoutServingInNestedInput
    bookings?: BookingUpdateManyWithoutSessionNestedInput
  }

  export type DoctorSessionUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    servingBookingId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type DoctorSessionUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    lastTokenNumber?: IntFieldUpdateOperationsInput | number
    bookingOpensAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingClosesAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingExtended?: BoolFieldUpdateOperationsInput | boolean
    bookingManuallyClosed?: BoolFieldUpdateOperationsInput | boolean
    queueStatus?: EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus
    queueStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueEndedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queueVersion?: IntFieldUpdateOperationsInput | number
    servingBookingId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManySessionInput = {
    id?: string
    tokenNumber: number
    queuePosition: number
    status?: $Enums.BookingStatus
    patientName?: string | null
    skipCount?: number
    lastSkippedAt?: Date | string | null
    userId: string
    clinicId: string
    createdAt?: Date | string
    calledAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
  }

  export type BookingUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutBookingsNestedInput
    clinic?: ClinicUpdateOneRequiredWithoutBookingsNestedInput
    servingIn?: DoctorSessionUpdateOneWithoutServingBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    servingIn?: DoctorSessionUncheckedUpdateOneWithoutServingBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenNumber?: IntFieldUpdateOperationsInput | number
    queuePosition?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    skipCount?: IntFieldUpdateOperationsInput | number
    lastSkippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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