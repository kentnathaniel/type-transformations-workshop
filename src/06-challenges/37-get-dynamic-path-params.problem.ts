import { S, T } from 'ts-toolbelt'
import { Equal, Expect } from '../helpers/type-utils'

type UserPath = '/users/:id'

type UserOrganisationPath = '/users/:id/organisations/:organisationId'

type ExtractPathParams<T extends string> = {
  [K in S.Split<T, '/'>[number] as K extends `:${infer Path}`
    ? Path
    : never]: string
}

/* If want to create ExtractPathParams with union as the solution */
type ExtractPathParams2<T extends string> =
  T extends `${string}/:${infer Param}/${infer Rest}`
    ? Param | ExtractPathParams2<Rest>
    : T extends `${string}/:${infer Param}`
    ? Param
    : never

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >
]
