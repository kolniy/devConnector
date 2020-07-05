const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/Users')
const router = express.Router()
const auth = require('../../middleware/auth')
const jwtSecret = process.env.JWTSECRET

// @route    GET api/auth
// @desc     Test route
// @access   Private
// Route to get the currently login user
router.get('/', auth, async (req, res) => {
    try{
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
    } catch (err) {
       console.log(err.message)
       res.status(500).send('Server Error')
    }
});

// Route to login a user
router.post('/', [
    check('email', 'Please Include a valid email').isEmail(),
    check('password', 'Please is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })  

      if(!user){
         return res.status(400).json({ errors : [{ msg: 'Invalid Credentials' }]})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch){
        return res.status(400).json({ errors : [{ msg: 'Invalid Credentials' }]})
      }
        
    let payload = {
        user: {
         id: user.id
        }
    }

        jwt.sign(payload, jwtSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err
            res.json({ token})
        })

        } catch(err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
});

module.exports = router

