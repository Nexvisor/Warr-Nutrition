import { PRODUCT_IDS } from "./PRODUCT_IDs";
export const DiscountPercentage = (id: string) => {
  return PRODUCT_IDS.includes(id) ? 30 : 25;
};
