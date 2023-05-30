type CarPictureProps = {
  path: string
  width: number
  height: number
  position: number
}

export type OfferProps = {
  objectID: number
  id: number
  reference_code: string
  referenceCode: string
  carId: number
  user: number
  user_email: string
  userEmail: string
  user_phone: string
  userPhone: string
  brand: string
  brandId: number
  model: string
  modelId: number
  body: string
  bodyId: number
  state: string
  stateId: number
  color: string
  colorId: number
  insideColor: string
  insideColorId: number
  saddlery: string
  saddleryId: number
  energy: string
  energyId: number
  motor: string
  version: string
  year: number
  gearbox: string
  mileage: number
  collectorPrice: number
  reducedPrice: number | null
  pictures: Array<CarPictureProps>
  created_at: string
  createdAt: string
  created_at_timestamp: number
  createdAtTimestamp: number
  updated_at: string
  updatedAt: string
  status: string
  sold: boolean
  published: boolean
  comments: string
  commentsEN: string
  type: string
  from_amateur: boolean
  fromAmateur: boolean
  car_type: string
  carType: string
  mot_test: boolean
  motTest: boolean
  historic: boolean
  expertise: boolean
  warranty: boolean
  ownerCount: number | null
  purchasedAt: string | null
  deliveryCountryCode: string
  registeredAt: string | null
  licensePlate: string
  vinNumber: string | null
  engineNumber: string | null
  isPartner: boolean
  brand_model: string
  brandModel: string
}
