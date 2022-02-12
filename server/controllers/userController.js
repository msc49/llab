import React, { useState } from "react";
import express from "../../apis/express";
const asyncHandler = require('express-async-handler')
const User = require('../models/user')


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name
    }
});



module.exports = updateUserProfile