const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) 
  {
    return res.status(401).json({ message: 'Authentication invalid.' });
  }

  try 
  {
	let user = await User.findOne({ publicKey: token});

	// Create user if it doesn't exist!
	if(!user)
	{
		const newUser = new User({publicKey: token});
		user = await newUser.save();
	}

    req.user = user;
    next();
    
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};

module.exports = requireAuth;
