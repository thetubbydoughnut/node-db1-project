const router = require('express').Router()
const { getAll, create, updateById, deleteById } = require('./accounts-model');
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await getAll();
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.status(200).json(req.account);
  } catch (err) {
    next(err);
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await create(req.body);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updatedAccount = await updateById(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await deleteById(req.params.id);
    res.status(200).json({ message: 'account deleted' });
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  console.error(err); // Log the error for debugging
  res.status(err.status || 500).json({
    message: err.message
  });
});

module.exports = router;