export type Role = 'user' | 'admin' | 'superAdmin';

export const ROLES: { value: Role; label: string }[] = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
  { value: 'superAdmin', label: 'Super Admin' }
];


export const CAN_VIEW: Role[] = ['user', 'admin', 'superAdmin'];
export const CAN_EDIT: Role[] = ['admin', 'superAdmin'];
export const CAN_DELETE: Role[] = ['superAdmin'];
