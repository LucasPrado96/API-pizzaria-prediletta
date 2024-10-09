import  Sequelize  from "sequelize";
import Users from "../models/Users";
import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import authConfig from "../../config/auth";



class SessionController {
    async store(request, response){

        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        const {email, password} = request.body
        const isValid = await schema.isValid(request.body);

       

        function loginNotValid(){
            response.status(401).json({error: 'Email or password are incorrect'})
        }

        if(!isValid){
            return loginNotValid()
        }

        const user = await Users.findOne({
            where:{
                email
            }
        });

        if(!user){
            return loginNotValid()
        }

  const isSamePassword = await user.checkPassword(password)


if(!isSamePassword){
    return loginNotValid()
}

      

        return response.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            phone: user.phone,
            token: jwt.sign({id: user.id, name: user.name}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
    
        })
    }
}



export default new  SessionController()