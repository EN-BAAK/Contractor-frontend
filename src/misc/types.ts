export type User = {
  id: number;
  fullName: string;
  mobileNumber: string;
  role: "admin" | "tester" | "secretary" | "mainTester";
  password: string;
};

export type RenewsType = {
  id?: number;
  name: string;
  companyName: string;
  phone: string;
  city: string;
  location: string;
  locationLink?: string;
  notes?: string;
  creator?: string;
};

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type AppContext = {
  isLoggedIn: boolean;
  user: User | undefined;
  showToast: (toastMessage: ToastMessage) => void;
  users: User[];
  setUsers: () => void;
};

export type ContractorType = {
  id?: number;
  name: string;
  companyName: string;
  phone: string;
  city: string;
  location: string;
  locationLink?: string;
  notes?: string;
  tester_name?: string;
  tester_id?: number;
  date?: string;
  done?: string;
  order?: number;
  creator?: string;
};
