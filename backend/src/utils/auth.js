export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getRole = () => {
  return getUser()?.role;
};

export const isSuperAdmin = () => {
  return getRole() === "SUPER_ADMIN";
};

export const isHR = () => {
  return getRole() === "HR_MANAGER";
};

export const isEmployee = () => {
  return getRole() === "EMPLOYEE";
};
