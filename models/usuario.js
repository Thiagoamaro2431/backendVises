import { DataTypes } from 'sequelize';
import { sequelize} from '../database/db.js';
import { Queja } from "../models/Queja.js"
export const Usuarios = sequelize.define('Usuarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  img_perfil: {
    type: DataTypes.STRING,
    defaultValue:"https://res.cloudinary.com/dzemdgvqo/image/upload/v1698414629/img/mawlby59pqvzp3fhvucp.jpg"
}
});

Usuarios.hasMany(Queja, {
foreingKey:"UserId",
sourceKey: "id"
});

Queja.belongsTo(Usuarios, {
  foreingKey: "UserId",
  targetKey: "id"
})

await Usuarios.sync({ alter: true })
  .then(() => {
    console.log('✨ Tabla de "Usuarios" sincronizada correctamente ✨');
  })
  .catch((error) => {
    console.log("========================================");
    console.error('Error al sincronizar la tabla de Usuarios:', error);
    console.log("========================================");
  });

  await Queja.sync({ alter: true })
    .then(() => {
        console.log('✨ Tabla "Queja" sincronizada correctamente ✨');
    })
    .catch((error) => {
        console.error('Error al sincronizar la tabla "Queja":', error);
    });
