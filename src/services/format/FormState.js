export const userInitialState = {
  contact: '',
  details: {
    name: {
      first: '',
      middle: '',
      last: '',
    },
  },
  email: '',
};

export const billingInitialState = {
  dueDate: {
    month: '',
    day: '',
    year: '',
  },
  roomID: '',
  roomRentalFee: 0,
  space: {
    currentBalance: 0,
    previousBalance: 0,
    totalBalance: 0,
  },
  utility: {
    currentBalance: 0,
    previousBalance: 0,
    totalBalance: 0,
  },
};
export const notificationInit = {
  subject: '',
  message: '',
};
