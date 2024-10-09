
import {Model, DataTypes} from "sequelize";
import Sequelize from "sequelize";

class Category extends Model{
    static init(sequelize){
        super.init({
            
                name: DataTypes.STRING,
                path: DataTypes.STRING,
                url: {
                    type: DataTypes.VIRTUAL,
                    get() {
                        return `http://localhost:3001/category-file/${this.path}`;
                    },
                },
               
            },
                {
                    sequelize,
                },
        )
        return this
    }

    
}

export default Category