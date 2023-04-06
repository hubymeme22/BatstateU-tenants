// Filter out the users by categories

// Search by name / SR-CODE
export const searchUser = (text, list) => {
  let keyword = text.toLowerCase();

  const filtered = list.filter((user) => {
    const { first, last } = user.name;
    const name = `${first} ${last} ${user.username}`.toLowerCase();
    if (name.includes(keyword)) return user;
  });

  return filtered;
};
