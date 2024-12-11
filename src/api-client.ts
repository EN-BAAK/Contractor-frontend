import { controlRenew } from "./components/RenewsForm";
import { controlUser } from "./components/UserForm";
import { ContractorType, User } from "./misc/types";
import { loginData } from "./screens/Login";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://chatpt.net";

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error fetching user");

  return response.json();
};

export const login = async (formData: loginData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error logging out");

  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/users`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error logging out");

  return response.json();
};

export const addUser = async (formData: controlUser) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/add/user`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editUser = async (data: { formData: controlUser; id: number }) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/admin/edit/user/${data.id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.formData),
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteUser = async (id: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/admin/delete/user/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const fetchRenews = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/contracts/renews`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error logging out");

  return response.json();
};

export const addRenews = async (formData: controlRenew) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/contracts/add/renews`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteRenews = async (id: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/contracts/delete/renews/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editRenews = async (data: {
  formData: controlRenew;
  id: number;
}) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/contracts/edit/renews/${data.id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.formData),
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const addContractor = async (data: {
  renews: ContractorType[];
  id: number;
  tester_name: string;
  date: Date;
  order: number;
}) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/admin/add/contract/${data.id}`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        renews: data.renews,
        tester_name: data.tester_name,
        date: data.date,
        order: data.order,
      }),
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const fetchContractors = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/admin/unfinished-contracts`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) throw new Error("Error logging out");

  return response.json();
};

export const fetchFinishedContractors = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/admin/finished-contracts`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) throw new Error("Error logging out");

  return response.json();
};

export const deleteContractors = async (id: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/admin/delete/contract/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const doneContractors = async (id: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/contracts/done-contracts/${id}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const unDoneContractors = async (id: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/contracts/undone-contracts/${id}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const fetchTesterContractors = async (id: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/contracts/undone-contracts/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const fetchTesterDoneContractors = async (id: number) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/contracts/done-contracts/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const updateContractors = async (contracts: ContractorType) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/edit/contracts`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contracts),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const fetchTesters = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/mainTester/testers`, {
    method: "GET",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};
