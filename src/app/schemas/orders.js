import mongoose, { mongo } from "mongoose";


const OrderSchema = new mongoose.Schema(
    {
    user: {
        id:{
            type: String,
            required: true,
        },
        
        name:{
            type: String,
            required: true,
        },

        phone:{
            type: String,
            required: true,
        },
    },

    products: [{
        id:{
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        }, 

        category:{
            type: String,
            required: true,
        },

        url: {
            type: String,
            required: true,
        },

        quantity: {
            type: String,
            required: true,
        },

        borda: {
            type: String,
            required: true,
        },
    }],

    address:{

        rua:{
            type: String,
            required: true,
        },

        bairro:{
            type: String,
            required: true,
        },

        numero: {
            type: String,
            required: true,
        },

        cep: {
            type: String,
            required: true,
        },

        cidade: {
            type: String,
            required: true,
        },

    },
       
    paymentMethod:{
        type: String,
        required: true,
    },

    TotalValue:{
        type: Number,
        required: true,
    },
    

    

    status: {
        type: String,
        required: true,
    },

  

}, 
    {
        timestamps:true,
    },
)


export default mongoose.model('Order', OrderSchema);