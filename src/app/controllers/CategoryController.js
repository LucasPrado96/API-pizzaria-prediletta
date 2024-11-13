import * as Yup from 'yup'
import Category from '../models/Category';
import Users from '../models/Users';



class CategoryController {
    async store(request, response) {

        const schema = Yup.object({
            name: Yup.string().required(),
        });


        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ Error: err.errors })
        }

        const user = await Users.findByPk(request.userId)

        if (!user) {
            return response.status(401).json()
        }

        const { admin: isAdmin } = user

        const { filename: path } = request.file;
        const { name } = request.body;

        const categoryExists = await Category.findOne({
            where: {
                name,
            },
        })

        if (categoryExists) {
            return response.status(400).json({ Error: 'Category already exists' })
        }



        const { id } = await Category.create({
            name,
            path,

        });


        return response.status(201).json({ id, name })
    }

    async update(request, response) {

        const schema = Yup.object({
            name: Yup.string(),
        });


        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ Error: err.errors })
        }

        const { admin: isAdmin } = await Users.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        }



        const { id } = request.params;

        const haveIdCategory = await Category.findByPk(id);

        if(!haveIdCategory){
            return response.status(400).json({Error: 'Category id not exists'})
        }



        let path;
        if (request.file) {
            path = request.file.filename
        }

       
        const { name } = request.body;

    

        if(name){
            
        const categoryExists = await Category.findOne({
            where: {
                name,
            },
        })

        if (categoryExists && categoryExists.id != id) {
            return response.status(400).json({ Error: 'Category already exists' })
        }
        }



       await Category.update({
            name,
            path,
        },
        {
            where:{
                id,
            }
        }
    );


        return response.status(201).json('As informações do produto foram atualizadas.')
    }

    async index(request, response) {
        const categories = await Category.findAll();


        return response.json(categories);


    }

}

export default new CategoryController()