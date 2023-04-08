import { fetchAsAdmin } from './request';

export const dashboardLoader = async () => {
  const slots = await fetchAsAdmin('slots');
  const summary = await fetchAsAdmin('slots/summary');

  return { slots, summary };
};

export const tenantsLoader = async () => {
  const allRecords = await fetchAsAdmin('summary/student');
  const available = await fetchAsAdmin('slots/available');
  return { records: allRecords.data, availableRooms: available.data };
};

export const usersLoader = async () => {
  const allAccounts = await fetchAsAdmin('summary/account');
  return allAccounts.data;
};
