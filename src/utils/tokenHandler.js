// Methods to save and get token from local storage and cookies

// Save
export const saveToken = (token) => {
  document.cookie = `token=${token};path=/`;
};

// Get
export const getTokenCookie = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(`token=`)) {
      return cookie.substring('token'.length + 1);
    }
  }

  return null;
};

// Delete
export const clearToken = () => {
  const cookie = document.cookie.split('=');
  document.cookie = `token=${cookie[1]}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
