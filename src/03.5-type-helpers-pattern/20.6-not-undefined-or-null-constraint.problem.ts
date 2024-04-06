export type Maybe<T extends Exclude<any, null | undefined>> =
  | T
  | null
  | undefined

// I thought any = number | string | bigint | boolean | .... | null | undefined
// So if I exclude null | undefined, I expect it will return number | string | bigint | boolean | .... | never | never
// Turns out, it still returns any
type Example = Exclude<unknown, null | undefined>

type tests = [
  // @ts-expect-error
  Maybe<null>,
  // @ts-expect-error
  Maybe<undefined>,

  Maybe<string>,
  Maybe<false>,
  Maybe<0>,
  Maybe<''>
]
