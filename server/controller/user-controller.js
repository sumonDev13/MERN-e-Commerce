import User from "../model/user-schema.js";
import bcrypt from "bcrypt";

export const userSignUp = async (request, response) => {
  try {
    const exist = await User.findOne({ username: request.body.username });
    if (exist) {
      return response.status(401).json("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const newUser = new User({
      username: request.body.username,
      password: hashedPassword,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      phone: request.body.phone,
    });

    await newUser.save();
    response.status(200).json({ message: "User created successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const userLogin = async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    let user = await User.findOne({ username: username, password: password });

    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return response.status(200).json(`${username} successfully logged in`);
        } else {
            return response.status(401).json('Invalid login credentials');
        }
    } else {
        return response.status(401).json('Invalid login credentials');
    }

    // if (user) {
    //   return response.status(200).json(`${username} successfully login`);
    //   // return response.status(200).json({data:user},"login successful")
    // } else {
    //   return response.status(401).json("Invalid login");
    // }
  } catch (error) {
    return response.status(501).json("server error", error.message);
  }
};
