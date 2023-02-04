const User = require("../model/User");
const Name = require("../model/Name");
// const bcrypt = require("bcrypt")


const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  try {
    console.log(req.body.name)
    const newUser = new Name({
      name: req.body.name
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}); 


//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  // if (req.body.password) {
  //   req.body.password = await bcrypt.hash(req.body.password, 10)
  // }

  try {
    const updatedUser = await Name.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Name.findByIdAndDelete(req.params.id);
    res.status(200).json("Name has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await Name.find();
    // const { password, ...others } = user._doc;
    // res.status(200).json(others);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router;
