import User from "../model/user-schema.js"


export const userSignUp = async (request, response) => {
    try {
       const exist = await User.findOne({username:request.body.username});
       if(exist){
        return response.status(401).json("username already exist")
       }

        const user = request.body;
        const newUser = new User(user);
        await newUser.save();
        response.status(200).json({ message: user });
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const userLogin = async (request, response) => {
    try {
        const username  = request.body.username;
        const password = request.body.username;

        let user = await User.findOne({username:username,password:password});
        if(user){
            return response.status(200).json(`${username} successfully login`)
        }else{
            return response.status(401).json('Invalid login')
        }
    } catch (error) {
        return response.status(501).json('server error',error.message);    
    }
}