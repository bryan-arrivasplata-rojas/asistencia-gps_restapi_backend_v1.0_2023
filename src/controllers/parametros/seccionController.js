const database= require('../../database/database');
const mysql = require('promise-mysql');

const getSeccionAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                cod_seccion,
                                                descripcion
                                            FROM
                                                seccion`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_seccion} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                cod_seccion,
                                                descripcion
                                            FROM
                                                seccion
                                            WHERE
                                                cod_seccion='${cod_seccion}'`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_seccion,descripcion} = req.body;
    const response = await connection.query(
                                            `INSERT INTO
                                                seccion (cod_seccion,descripcion)
                                            VALUES ('${cod_seccion}','${descripcion}')`
                                            );
    
    res.json(response);
    connection.destroy();
};
const putSeccion = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_seccion} = req.params;
    const {descripcion} = req.body;
    try{
        const response = await connection.query(
                                            `UPDATE
                                                seccion
                                            SET
                                                descripcion = '${descripcion}'
                                            WHERE
                                                cod_seccion='${cod_seccion}'`
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
const deleteSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_seccion} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                seccion
                                            WHERE
                                                cod_seccion = '${cod_seccion}'`
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
    getSeccionAll,
    getSeccion,
    postSeccion,
    putSeccion,
    deleteSeccion
};

module.exports = methods;