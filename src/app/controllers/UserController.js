
import Users from '../models/Users';
import { v4 } from "uuid";
import * as Yup from 'yup'



class UserController{
    async store(request, response){


        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean(),
            phone: Yup.string().required(),
        })

      

        try{
            schema.validateSync(request.body, {abortEarly: false})
        } catch(err){
            return response.status(400).json({Error: err.errors} )
        }



        const{name, email, password, admin, phone} = request.body;

        const userExists = await Users.findOne({
            where: {
                email,
            },
        })

        if(userExists){
            return response.status(409).json({error: 'User already exists'})
        }

        const user = await Users.create(
            {
            id: v4(),
            name,
            email,
            password,
            admin,
            phone,
           
            });

    return response.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        phone: user.phone,

    })
    }
}


export default new UserController()