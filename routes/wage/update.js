const wage = require('../../models/wage.js')
const wageRoot = require('./root.js')

module.exports = function (req, res, next) {
  wage.findOneAndUpdate({'_id': req.params.id}, req.body, function (err, document) {
    if (err) {
      return next(err)
    }

    if (document == null) {
      return res.status(404).json({err: {code: 404, desc: 'Resource not found'}})
    }

    return wageRoot(req, res, next) // Returns document with updated data
  })
}
