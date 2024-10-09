import * as Yup from 'yup'
import Products from '../models/Products';
import Category from '../models/Category';
import Users from '../models/Users'



class ProductController{
    async store(request, response){

        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean().required(),
            description: Yup.string().optional(),
        });


        try{
            schema.validateSync(request.body, {abortEarly: false})
        } catch(err){
            return response.status(400).json({Error: err.errors} )
        }

        const {admin: isAdmin} = await Users.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

        const {filename: path}  = request.file;
        const { name, price, category_id,  offer, description} = request.body;

        const product = await Products.create({
            name,
            price,
            category_id,
            path,
            offer,
            description,
        });


        return response.status(201).json(product)
    }

    async update(request, response){

        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
            description: Yup.string(),
        });


        try{
            schema.validateSync(request.body, {abortEarly: false})
        } catch(err){
            return response.status(400).json({Error: err.errors} )
        }

        const {admin: isAdmin} = await Users.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

       const {id} = request.params

        let path;
        if(request.file){
            path = request.file.filename
        }
        
     
        const { name, price, category_id, offer, description } = request.body;

        await Products.update({
            name,
            price,
            category_id,
            path,
            offer,
            description,
        },
        {
           where:{
            id,
           },
        }
        );


        return response.status(201).json()
    }

    async index(request, response){
        const products = await Products.findAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                },
            ]
         
            
        });
       

        return response.json(products);

     
    }

}

export default new ProductController()