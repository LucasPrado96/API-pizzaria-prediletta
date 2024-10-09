import  Sequelize, { Model, DataTypes } from "sequelize";
import bcrypt from 'bcrypt' 

class Users extends Model{
    static init(sequelize){
        super.init(
            {
              name: DataTypes.STRING,
              email: DataTypes.STRING,
              password: Sequelize.VIRTUAL,
              password_hash: DataTypes.STRING,
              admin: DataTypes.BOOLEAN,
                
                phone: {
                    type: DataTypes.STRING,
                 validate:{
                    is:{
                        args:  /^\(\d{2}\)\d{8,9}$/, 
                        msg: 'O número de telefone deve estar no formato (XX)xxxxxxxxx'
                      }
    
                 },
                },

            },
            {
                sequelize,
                tableName: 'users',
            }
        );

        this.addHook('beforeSave', async (Users) => {
            if(Users.password){
                Users.password_hash = await bcrypt.hash(Users.password, 10)
            }
        });
        
        return this;
    }
    async checkPassword(password){
       return bcrypt.compare(password, this.password_hash)
    }
}

export default Users