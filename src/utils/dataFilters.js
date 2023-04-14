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

export const sortByNames = (list) => {
  const sortedNames = list.sort((a, b) => {
    if (a.name.first > b.name.first) {
      return 1;
    }

    if (a.name.first < b.name.first) {
      return -1;
    }

    return 0;
  });

  return sortedNames;
};

export const sortByRoomNames = (list) => {
  const sortedRooms = list.sort((a, b) => {
    if (a.slot > b.slot) return 1;

    if (a.slot < b.slot) return -1;

    return 0;
  });

  return sortedRooms;
};
