const { isValidObjectId } = require('mongoose');

// isValidObjectId вертає буль, тому основна ф-я теж має вертати буль
const validateID = id => {
  if (isValidObjectId(id)) {
    return true;
  }
  return false;
};

module.exports = validateID;
