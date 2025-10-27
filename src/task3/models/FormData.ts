export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  sameAsBilling: boolean;
}

export type FormField = keyof FormData;
