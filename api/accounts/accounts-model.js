const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const create = account => {
  return db('accounts').insert(account).then(([id]) => getById(id))
}

const updateById = (id, account) => {
  return db('accounts').where('id', id).update(account).then(() => getById(id))
}

const deleteById = id => {
  return db('accounts').where('id', id).delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
