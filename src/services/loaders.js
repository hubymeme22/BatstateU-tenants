import { fetchAsAdmin } from './adminFetch';

export const dashboardLoader = async () => {
  const slots = await fetchAsAdmin('slots');
  const summary = await fetchAsAdmin('slots/summary');

  return { slots, summary };
};

export const tenantsLoader = async () => {
  const allRecords = await fetchAsAdmin('students/details');
  return allRecords.data;
};