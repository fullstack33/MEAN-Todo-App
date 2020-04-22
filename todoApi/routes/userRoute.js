const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs')


// SET STORAGE
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
let upload = multer({ storage: storage })

router
    .route('/:token')
    .get(async (req, res)=> {
        let token = req.params.token;
        try{
          let payload = jwt.verify(token, 'secretKey');
          if(!payload){
              return res.status(401).send({message: "Wrong token"});
          }
          let userId = payload.subject;
          let user = await User.find({_id: userId});
          return res.status(200).send(user);
        }catch(error){
          console.log(error)
          return res.status(400).send(error.message)
        }

    })

router
    .route('/')
    .post(async (req, res) => {
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(400).send({message: "Email Already register ..!!"});

        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            profile: ''
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)

        user = await user.save();
        // Generate jwtWebToken
        let payload = {subject: user._id};
        let token = jwt.sign(payload, 'secretKey');
        return res.status(200).send({token})
    });

router
    .route('/login')
    .post(async (req, res, next) => {
        let userData = req.body;
        let user = await User.findOne({email: userData.email});
        if(!user) return res.status(401).send({message: "Invailed Email"});
        const validePassword = await bcrypt.compare(userData.password, user.password);
        if(!validePassword) return res.status(400).send({message: "Invailed Password"});

        // Generate jwtWebToken
        let payload = {subject: user._id};
        let token = jwt.sign(payload, 'secretKey');

        return res.status(200).send({token, userId: user._id})
    })

router
    .route('/:id')
    .put(async (req, res)=> {
      await User.findByIdAndUpdate(req.params.id, {
          $set: req.body
      }, {new: true});

      return res.status(200).send({message: "Updated Successfully ..!!"})
    })

router
    .route('/profilePic/:id')
    .put(upload.single('file'), async (req, res)=> {
          const file = req.file
          // console.log(file)
          if (!file) return res.status(400).send({ message: 'Please Upload File ..!' })

          let img = fs.readFileSync(req.file.path)
          let encode_image = img.toString('base64')
          // Define a JSONobject for the image attributes for saving to database

          let finalImg = {
            contentType: req.file.mimetype,
            image: new Buffer(encode_image, 'base64'),
          }
          let data = await User.findByIdAndUpdate(req.params.id, {
              $set: {
                profile: finalImg
              }
          }, {new: true});
          if(!data) return res.status(401).send({message: "Something Went Wrong ..!!!"})
          return res.status(200).send({message: "Profile Uploaded Successfully ..!!"})
    })


module.exports = router;
