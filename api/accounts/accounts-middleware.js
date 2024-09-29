const db = require('../../data/db-config');



const checkAccountPayload = (req, res, next) => {
  console.log("checkAccountPayload middleware called");
  const { name, budget } = req.body;

  if (name === undefined || budget === undefined) {
    return next({ status: 400, message: "name and budget are required" });
  }

  const trimmedName = name.trim();
  if (trimmedName.length < 3 || trimmedName.length > 100) {
    return next({ status: 400, message: "name of account must be between 3 and 100" });
  }

  if (isNaN(budget) || typeof budget !== 'number') {
    return next({ status: 400, message: "budget must be a number" });
  }

  if (budget < 0 || budget > 1000000) {
    return next({ status: 400, message: "budget of account is too large or too small" });
  }

  req.body.name = trimmedName; // Ensure name is trimmed
  req.body.budget = Number(budget); // Ensure budget is a number
  next();
};

const checkAccountNameUnique = async (req, res, next) => {
  console.log("checkAccountNameUnique middleware called");
  try {
    const existingAccount = await db('accounts').where('name', req.body.name.trim()).first();
    if (existingAccount) {
      return next({ status: 400, message: 'that name is taken' });
    } else {
      next();
    }
  } catch (err) {
    next({ status: 500, message: err.message });
  }
};

const checkAccountId = async (req, res, next) => {
  console.log("checkAccountId middleware called");
  try {
    const account = await db('accounts').where('id', req.params.id).first();
    if (!account) {
      return next({ status: 404, message: 'account not found' });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next({ status: 500, message: err.message });
  }
};

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
};