import { Role } from "../models/Role.js";
import { User } from "../models/User.js";

/**
 * Metodo encargado de crear los roles para el usuario
 * Se llama en app.js
 * @returns si ya existe data en los roles no retorna nada
 */
export const createRoles = async () => {
  try {
    const count = await Role.count();

    if (count > 0) return;

    const rolesToCreate = [
      { name: "cliente" },
      { name: "admin" },
      { name: "empleado" },
    ];

    await Role.bulkCreate(rolesToCreate);

    const createdRoles = await Role.findAll();
    console.log("Roles creados con éxito:");
    createdRoles.forEach((role) => {
      console.log(`ID: ${role.id}, Nombre: ${role.name}`);
    });
  } catch (error) {
    console.error(error);
  }
};

export const createFirstAdmin = async () => {
  try {
    const adminFound = await User.findOne({
      where: {
        role: ["admin"],
      },
    });

    if (adminFound) return;

    await User.create({
      name: "admin",
      last_name: "admin",
      document: "000000",
      email: "admin@admin.com",
      password: "12345",
      role: ["admin"]
    });
  } catch (error) {
    console.error(error);
  }
};
