import { response } from "express";
import db from "../config/db.js";

//capturar con process.argv
const argumento = process.argv.slice(2);

const accion = argumento[0];
const nombre = argumento[1];
//se modifica de const a let por el scope que nos da const
let rut = argumento[2];
const curso = argumento[3];
const nivel = argumento[4];

//insertando nuevo estudiante {agregar}
const nuevoEstudiante = async (nombre, rut, curso, nivel) => {
  const consulta = "insert into alumnos values ($1, $2, $3, $4)";
  const values = [nombre, rut, curso, nivel];
  const response = await db.query(consulta, values);
  console.log("Nuevo Estudiante Agregado Correctamente!");
};

//encontrar estudiante x rut {verRut}
const rutEstudientes = async (rut) => {
    const consulta = "select * from alumnos where rut = $1";
    const values = [rut];
    const response = await db.query(consulta, values);
    console.log(
      `El estudiante con el rut ${rut} es: ${JSON.stringify(response.rows)}`
    );
}

//ver todos los estudiantes {verTodos}
const verEstudiantes = async () => {
  const consulta = "select * from alumnos";
  const response = await db.query(consulta);
  console.log(response.rows);
};

//actualizar data Estudiante {actualizar}
const actualizarEstudiante = async (nombre, rut, curso, nivel) => {
  const consulta =
    "UPDATE alumnos SET nombre = $1, rut = $2, curso = $3, nivel = $4 WHERE rut = $2";
  const values = [nombre, rut, curso, nivel];
  const response = await db.query(consulta, values);
  console.log(response.rows, "Datos de Estudiante Actualizado!");
};


//eliminar registro de estudiante {eliminar}
const eliminarEstudiante = async (rut) => {
  const consulta = "delete from alumnos where rut = $1";
  const values = [rut];
  const response = await db.query(consulta, values);
  console.log(
    `${JSON.stringify(response.rows)} Estudiante con rut ${rut} eliminado correctamente!`
  );
};


//nombrar acciones/fx's
if (accion === "agregar") {
  nuevoEstudiante(nombre, rut, curso, nivel);
} else if (accion === "verRut") {
  rut = argumento[1];
  rutEstudientes(rut);
} else if (accion === "verTodos") {
  verEstudiantes();
} else if (accion === "actualizar") {
  actualizarEstudiante(nombre, rut, curso, nivel);
} else if (accion === "eliminar") {
  rut = argumento[1];
  eliminarEstudiante(rut);
} else {
  console.log("Accion no valida!🔥");
}