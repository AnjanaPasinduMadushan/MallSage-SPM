import Admins from '../model/admins-model.js';
import bcrypt from 'bcrypt'
import { validateEmail, validatePWD } from '../validations/user-validations.js'

const addSubAdmins = async (req, res) => {

  const { name, email, password, isFacilityAdmin } = req.body;
  //validation for all the input fields
  if (!name || !email || !password || !isFacilityAdmin) {
    return res.status(422).json({ message: "All feilds should be filled" })
  }

  //validation
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Please provide valid Email" })
  }
  else if (!validatePWD(password)) {
    console.log(password)
    return res.status(400).json({ message: "Please provide valid Password" })
  }

  try {
    let existingUser;
    //chaecking whether user already sign up or not based on the email
    try {
      existingUser = await Admins.findOne({ email: email });
    } catch (err) {
      console.error(err);
    }

    if (existingUser && existingUser.email === email) {
      return res.status(409).json({ message: "A User is already signUp with this email" })
    }

    const salt = await bcrypt.genSalt(6)
    //hashsync is a function that can hasing the password
    const hashedpassword = await bcrypt.hash(password, salt);

    //creating a new User
    const admin = new Admins({
      name,
      email,
      password: hashedpassword,
      isFacilityAdmin
    });

    await admin.save();
    return res.status(201).json({ message: "Sub-admin is Created, sub-admin can login to the system", Admins: admin })

  } catch (err) {
    console.error(err)
    return res.status(400).json({ message: "Error in saving admin in DB" });
  }

}

export { addSubAdmins }