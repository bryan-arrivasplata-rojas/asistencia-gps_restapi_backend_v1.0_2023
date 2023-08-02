const database= require('../../database/database');
const mysql = require('promise-mysql');

const getPerfilAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.codigo,
                                                a.primer_nombre,
                                                a.segundo_nombre,
                                                a.tercer_nombre,
                                                a.apellido_paterno,
                                                a.apellido_materno,
                                                c.tipo,
                                                c.descripcion,
                                                a.email
                                            FROM
                                                perfil a,
                                                usuario b,
                                                tipo c
                                            WHERE
                                                a.email = b.email AND
                                                a.tipo = c.tipo`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(response);
    
    res.json(response);
    connection.destroy();
};
const getPerfilDocente  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const response = await connection.query(
                                            `SELECT
                                                a.codigo,
                                                a.primer_nombre,
                                                a.segundo_nombre,
                                                a.tercer_nombre,
                                                a.apellido_paterno,
                                                a.apellido_materno,
                                                c.tipo,
                                                c.descripcion,
                                                a.email
                                            FROM
                                                perfil a,
                                                usuario b,
                                                tipo c
                                            WHERE
                                                a.email = b.email AND
                                                a.tipo = c.tipo AND
                                                a.tipo = 2`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getPerfilAlumno  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const response = await connection.query(
                                            `SELECT
                                                a.codigo,
                                                a.primer_nombre,
                                                a.segundo_nombre,
                                                a.tercer_nombre,
                                                a.apellido_paterno,
                                                a.apellido_materno,
                                                c.tipo,
                                                c.descripcion,
                                                a.email
                                            FROM
                                                perfil a,
                                                usuario b,
                                                tipo c
                                            WHERE
                                                a.email = b.email AND
                                                a.tipo = c.tipo AND
                                                a.tipo = 1`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getPerfil  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {codigo} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.codigo,
                                                a.primer_nombre,
                                                a.segundo_nombre,
                                                a.tercer_nombre,
                                                a.apellido_paterno,
                                                a.apellido_materno,
                                                c.tipo,
                                                c.descripcion,
                                                a.email
                                            FROM
                                                perfil a,
                                                usuario b,
                                                tipo c
                                            WHERE
                                                a.email = b.email AND
                                                a.tipo = c.tipo AND
                                                a.codigo='${codigo}'`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postPerfil  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {codigo,primer_nombre,segundo_nombre,tercer_nombre,apellido_paterno,apellido_materno,tipo,email} = req.body;
    try {
        let insertQuery = `INSERT INTO perfil (codigo, primer_nombre, apellido_paterno, apellido_materno, tipo, email) VALUES (?, ?, ?, ?, ?, ?)`;
        const queryParams = [codigo, primer_nombre, apellido_paterno, apellido_materno, tipo, email];
    
        // Verificar si los campos están vacíos antes de asignarles un valor en los parámetros de la consulta
        if (segundo_nombre !== '') {
            insertQuery = `INSERT INTO perfil (codigo, primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, tipo, email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            queryParams.splice(2, 0, segundo_nombre);
        }
        if (tercer_nombre !== '') {
            insertQuery = `INSERT INTO perfil (codigo, primer_nombre, segundo_nombre, tercer_nombre, apellido_paterno, apellido_materno, tipo, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            queryParams.splice(3, 0, tercer_nombre);
        }
    
        const response = await connection.query(insertQuery, queryParams);
        res.json(response);
    } catch (_) {
        res.json(_);
    }
    connection.destroy();
};
const putPerfil = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {codigo} = req.params;
    const {primer_nombre,segundo_nombre,tercer_nombre,apellido_paterno,apellido_materno,tipo,email} = req.body;
    try{
        let updateQuery = 'UPDATE perfil SET primer_nombre = ?, apellido_paterno = ?, apellido_materno = ?, tipo = ?, email = ?';
        const queryParams = [primer_nombre, apellido_paterno, apellido_materno, tipo, email];

        // Verificar si los campos están vacíos antes de asignarles un valor en los parámetros de la consulta
        if (segundo_nombre !== '') {
            updateQuery += ', segundo_nombre = ?';
            queryParams.push(segundo_nombre);
        }
        if (tercer_nombre !== '') {
            updateQuery += ', tercer_nombre = ?';
            queryParams.push(tercer_nombre);
        }

        updateQuery += ' WHERE codigo = ?';
        queryParams.push(codigo);

        const response = await connection.query(updateQuery, queryParams);
        res.json(response);
    }catch(_){
        //console.log(_);
        res.json(_);
    }
    connection.destroy();
};
const deletePerfil  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {codigo} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                perfil
                                            WHERE
                                                codigo = '${codigo}'`
                                            );
        //console.log(response);
        
        res.json(response);
    }catch(_){
        //console.log(_);
        res.json(_);
    }
    connection.destroy();
};

const methods = {
    getPerfilAll,
    getPerfilDocente,
    getPerfilAlumno,
    getPerfil,
    postPerfil,
    putPerfil,
    deletePerfil
};

module.exports = methods;