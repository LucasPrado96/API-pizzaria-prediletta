
import OrderSchema from '../schemas/orders'
import * as Yup from 'yup'
import Products from '../models/Products'
import Category from '../models/Category'
import Users from '../models/Users'

class OrderController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                    borda: Yup.string(),
                }),
            ),
            address: Yup.object().shape({
                rua: Yup.string().required(),
                bairro: Yup.string().required(),
                numero: Yup.string().required(),
                cep: Yup.string().required(),
                cidade: Yup.string().required(),
            }).required(),
            paymentMethod: Yup.string().required()

        })

        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ Error: err.errors })
        }

       

    

        const { products, address, paymentMethod, TotalOrder, borda} = request.body
        console.log(request.body);
        
        const productsIds = products.map(product => product.id)

        const productsData = await Products.findAll({
            where: {
                id: productsIds
            },
            include: {
              model: Category,
              as: 'category',
              attributes: ['name'],

            }
        })

        const formatedProducts = productsData.map( product => {
            const productsIndex = products.findIndex((item)=>  item.id === product.id);
            

            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category.name,
                url: product.url,
                quantity: products[productsIndex].quantity,
                borda: request.body.borda || 'sem borda',
                
            };
           
            return newProduct;
        })

      
     
        const order = ({
            user: {
                id: request.userId,
                name: request.userName,
                phone: request.userPhone,
               
            }, 
            products: formatedProducts,
            address,
            paymentMethod,
            status: 'Pedido realizado',
           
            TotalValue: TotalOrder,
           

        })

        const createOrder = await OrderSchema.create(order)

        return response.status(201).json(createOrder)
    }

    async index(request, response){
        const orders = await OrderSchema.find()

        return response.json(orders)

    }

    async update(request, response){
        const schema = Yup.object({
            status: Yup.string().required()
          
        })

        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ Error: err.errors })
        }

        const user = await Users.findByPk(request.userId)

        if(!user){
            return response.status(401).json()
        }

        const {admin: isAdmin} = user
        
        const {id } = request.params
        const { status} = request.body

        await OrderSchema.updateOne({_id:id }, {status});

        return response.json({message: 'status alterado'})
    }
}


export default new OrderController()