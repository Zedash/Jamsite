export type UserProps = {
  token: string
  data: {
    objectID: number
    id: number
    email: string
    roles: Array<string>
    username: string
    username_canonical: string
    usernameCanonical: string
    lastLogin: string
    lastLoginTimestamp: {
      date: string
      timezone_type: number
      timezone: string
    }
    createdAt: string
    createdAtTimestamp: number
    updatedAt: string
    zipCode: string
    city: string
    country: string
    countryCode: string
    firstName: string
    lastName: string
    phone: string
    isEnabled: boolean
    emailConfirmed: boolean
    birthday: string | null
    language: string | null
    gender: string | null
    isPro: boolean
    picture: Array<unknown> | null
    isSubscribed: boolean
  }
}
