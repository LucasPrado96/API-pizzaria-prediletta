
import { Model, DataTypes } from "sequelize";
import Sequelize from "sequelize";
import Category from "./Category";

class Products extends Model {
    static init(sequelize) {
        super.init({
            
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            path: DataTypes.STRING,
            offer: DataTypes.BOOLEAN,
            description: DataTypes.TEXT,
            url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `http://localhost:3001/product-file/${this.path}`;
                },
            },
        },
            {
                sequelize,
            },
        )
        return this;
    }


    static associate(models) {
        this.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category'
        });
      


    }
}

export default Products