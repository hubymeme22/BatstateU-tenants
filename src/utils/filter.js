export const filterByVerificationStatus = (list, filterBy) => {
  if (filterBy == '') return list;

  let newList = [];
  if (filterBy == 'verified') {
    newList = list.filter((user) => user.verified);
  } else if (filterBy == 'unverified') {
    newList = list.filter((user) => !user.verified);
  }

  return newList;
};

export const filterByStatus = (list, filterValue) => {
  if (filterValue == '') return list;
  return list.filter((user) => user.status == filterValue);
};
