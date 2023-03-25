const errorTranslator = (error) => {
  let translatedError = '';

  switch (error) {
    case 'NonExistentEmail':
      translatedError = 'Account not found';
      break;
    case 'InvalidCredentials':
      translatedError = 'Incorrect username or password';
      break;
    default:
      translatedError = error;
      break;
  }

  return translatedError;
};

export default errorTranslator;
