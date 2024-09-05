export const selectAllOffers = (state: any) => state.offers.offers;
export const selectIsOffersFetched = (state: any) => state.offers.offersFetched;

export const selectIsBuySuccess = (state: any) => state.offers.isBuySuccess;

export const selectIsLoadingOffers = (state: any) =>
  state.offers.isLoadingOffers;
export const selectIsLoadingBuy = (state: any) => state.offers.isLoadingBuy;
