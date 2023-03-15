// Methods to save and get token from local storage and cookies

export const saveToken = (token) => {
  localStorage.setItem('token', token);
  document.cookie = `token=${token};path=/`;
};

export const checkToken = () => {
  let token = localStorage.getItem('token');
  return token;
};

export const clearToken = () => {
  localStorage.clear();
  document.cookie = '';
};
