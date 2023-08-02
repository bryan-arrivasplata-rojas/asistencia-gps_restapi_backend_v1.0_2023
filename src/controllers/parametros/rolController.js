const database= require('../../database/database');
const mysql = require('promise-mysql');

const getRolAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                tipo,
                                                descripcion
                                            FROM
                                                tipo`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(response);
    
    res.json(response);
    connection.destroy();
};
const getRol  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {tipo} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                tipo,
                                                descripcion
                                            FROM
                                                tipo
                                            WHERE
                                                tipo='${tipo}'`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postRol  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {tipo,descripcion} = req.body;
    const response = await connection.query(
                                            `INSERT INTO
                                                tipo (tipo,descripcion)
                                            VALUES ('${tipo}','${descripcion}')`
                                            );
    
    res.json(response);
    connection.destroy();
};
const putRol = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {tipo} = req.params;
    const {descripcion} = req.body;
    try{
        const response = await connection.query(
                                            `UPDATE
                                                tipo
                                            SET
                                                descripcion = '${descripcion}'
                                            WHERE
                                                tipo='${tipo}'`
                                            );
        //const users = response.json();
        //res.json({'response':[{'response':'Cerrado con éxito'}]});
        
        res.json(response);
    }catch(_){
        //console.log(_);
        res.json(_);
    }
    connection.destroy();
};
const deleteRol  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {tipo} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                tipo
                                            WHERE
                                                tipo = '${tipo}'`
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
    getRolAll,
    getRol,
    postRol,
    putRol,
    deleteRol
};

module.exports = methods;