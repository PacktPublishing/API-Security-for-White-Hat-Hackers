const missingRequiredParams = (requiredParams,body) => {
    for (const paramName of requiredParams) {
      if (!Object.keys(body).includes(paramName)) {
      return paramName
      }
    }
    return false
  };
  
  module.exports = missingRequiredParams;