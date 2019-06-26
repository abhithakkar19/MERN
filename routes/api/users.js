const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

const userModel = require('../../models/User');
/* GET users listing. */
router.post('/', function (req, res, next) {

  console.log('Getting all users');
  userModel.find({ status: 1 }).then(result => {
    res.json({
      status: 1,
      message: 'All users fetched successfully',
      data: result
    });
  }).catch(err => {
    console.log('Error :', err);
    res.json({
      status: 0,
      message: err,
      data: []
    });
  })
});

router.post('/addUser', function (req, res, next) {

  const inputs = req.body;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(inputs.password, saltRounds).then(function (hash) {
      // Store hash in your password DB.
      const newUser = new userModel({
        first_name: inputs.first_name,
        last_name: inputs.last_name,
        email: inputs.email,
        phone: inputs.phone,
        password: hash
      });

      newUser.save(newUser).then(result => {
        res.json({
          status: 1,
          message: 'User added successfully.',
          data: result
        });
      }).catch(err => {
        res.json({
          status: 0,
          message: err,
          data: []
        })
      });
    });
  });
});

router.post('/updateUser', function (req, res, next) {

  const inputs = req.body;

  const user_data = new userModel({
    first_name: inputs.first_name,
    last_name: inputs.last_name,
    email: inputs.email,
    phone: inputs.phone
  });

  userModel.findOneAndUpdate({ id: inputs.user_id }, user_data, { new: true }).then((err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 0,
        message: err,
        data: result
      });
    } else {
      res.json({
        status: 1,
        message: 'User updated successfully',
        data: result
      });
    }
  })
});

router.post('/deleteUser', function (req, res, next) {

  const inputs = req.body;
  console.log("Input parameters  :", inputs);


  userModel.findOneAndUpdate({ _id: inputs.user_id }, { status: 2 }, { new: true }).then(result => {
    console.log('Delete Result =======>', result);
    res.json({
      status: 1,
      message: 'User deleted successfully',
      data: result
    });
  }).catch(err => {
    console.log('Error :', err);
    res.json({
      status: 0,
      message: err,
      data: []
    });
  });
});

module.exports = router;
