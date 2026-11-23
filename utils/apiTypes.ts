
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export interface Account {
  id: number;
  customerId: number;
  type: string;
  balance: number;
}

export interface Transaction {
  id: number;
  accountId: number;
  type: string;
  amount: number;
  date: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}
