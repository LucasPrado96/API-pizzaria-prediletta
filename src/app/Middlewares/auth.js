import authConfig from '../../config/auth'
import jwt from 'jsonwebtoken'

function authMiddleware(request, response, next){
   const authToken = request.headers.authorization

   if(!authToken){
    return response.status(401).json({Error: 'Token not provided'})
   }

   const token = authToken.split(' ').at(1)

 try{
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){
            throw new Error()
        }
        console.log(request.userPhone); 
        request.userId = decoded.id;
        request.userName = decoded.name;
        request.userPhone = decoded.phone;
       

    });
 } catch(err){
    return response.status(401).json({Error: 'token is not valid'})
 }


    return next()
}

export default authMiddleware