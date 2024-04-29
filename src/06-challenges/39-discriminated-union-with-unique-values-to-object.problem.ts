import { Equal, Expect } from '../helpers/type-utils'

type Route =
  | {
      route: '/'
      search: {
        page: string
        perPage: string
      }
    }
  | { route: '/about' }
  | { route: '/admin' }
  | { route: '/admin/users' }

// This solution will return this error
// Type '"search"' cannot be used to index type 'K'
// I guess it is because the the TS compiler can't detect whether "search" key will exist in the K until runtime
type RoutesObject2 = {
  [K in Route as K['route']]: K['search'] extends object ? K['search'] : never
}

type RoutesObject = {
  [K in Route as K['route']]: 'search' extends keyof K ? K['search'] : never
}

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        '/': {
          page: string
          perPage: string
        }
        '/about': never
        '/admin': never
        '/admin/users': never
      }
    >
  >
]
