import { Address } from "./Address";

export interface Client {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  documentNumber: string;
  address: Address;
}