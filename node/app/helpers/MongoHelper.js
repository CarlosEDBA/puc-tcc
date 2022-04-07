module.exports = {
  getLastItemObjectId(result) {
    return result[result.length - 1]._id
  },

  getFirstItemObjectId(result) {
    return result[0]._id
  },

  async hasPrev(Model, filter = {}, objectId) {
    //console.log('log > hasPrev', objectId)

    const query = await Model.findOne({
      ...filter,
      _id: { $lt: objectId }
    })

    //console.log('prev', query)

    return query
  },

  async hasNext(Model, filter = {}, objectId) {
    //console.log('log > hasNext', objectId)

    const query = await Model.findOne({
      ...filter,
      _id: { $gt: objectId }
    })

    //console.log('next', query)

    return query
  }
}