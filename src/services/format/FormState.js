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
  roomID: '',
  room_label: '',
  status: '',
  username: '',
};

export const accountInitialState = {
  contact: '',
  name: {
    first: '',
    middle: '',
    last: '',
  },
  email: '',
  roomID: '',
  room_label: '',
  status: '',
  username: '',
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

export const invoiceInitialState = {
  // Dates
  start_date: '',
  end_date: '',
  days_present: 0,

  // Readings
  previous_kwh: 0,
  current_kwh: 0,
  total_kwh: 0,
  rate: 0,
  total_amount: 0,
  bill_per_individual: 0,

  // Bills
  roomBill: 0,
  waterBill: 0,
  overall_bill: 0,
};

export const notificationInit = {
  subject: '',
  message: '',
};

export const defaultBillingsInit = {
  dormWater: 0,
  dormRoom: 0,
  canteenWater: 0,
  canteenRoom: 0,
};
