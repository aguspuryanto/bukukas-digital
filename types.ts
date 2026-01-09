
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum TransactionType {
  // Inputs (Add to balance)
  PEMAKAIAN = 'PEMAKAIAN',
  TRANSFER_ADMIN = 'TRANSFER_ADMIN',
  TRANSFER_DEBIT = 'TRANSFER_DEBIT',
  BIAYA_LAIN_INPUT = 'BIAYA_LAIN_INPUT',
  MODAL = 'MODAL',
  // Outputs (Subtract from balance)
  SETOR_ADMIN = 'SETOR_ADMIN',
  TARIK_TUNAI = 'TARIK_TUNAI',
  TARIK_KREDIT = 'TARIK_KREDIT',
  BIAYA_LAIN_OUTPUT = 'BIAYA_LAIN_OUTPUT'
}

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  description: string;
  adminFee?: number;
  userName: string;
  isPending: boolean;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface AppState {
  currentUser: User;
  transactions: Transaction[];
  totalBalance: number;
}
