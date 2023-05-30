// CRUD services for Car ads "Annonces" in French.
import { fetchWrapper } from '@/utils/fetchWrapper'

export const adsService = {
  getAllOffers,
  getOfferById,
  getAllWantedCars,
  getWantedCarById,
}

function getAllOffers(token: string) {
  return fetchWrapper.get('/sales/latest', token)
}

function getOfferById(id: number, token: string) {
  return fetchWrapper.get(`sales/${id}`, token)
}

function getAllWantedCars(token: string) {
  return fetchWrapper.get('/demands/latest', token)
}

function getWantedCarById(id: number, token: string) {
  return fetchWrapper.get(`demands/${id}`, token)
}
