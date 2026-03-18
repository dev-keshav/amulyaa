export const SHIPPING_THRESHOLD = 500;
export const SHIPPING_COST = 25;

export const calculateShipping = (subtotal: number) =>
  subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
