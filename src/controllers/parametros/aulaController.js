const database= require('../../database/database');
const mysql = require('promise-mysql');

const getAulaAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_aula,
                                                a.latitud,
                                                a.longitud,
                                                a.referencia,
                                                b.descripcion
                                            FROM
                                                aula a,
                                                facultad b
                                            WHERE
                                                a.cod_facultad = b.cod_facultad`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(response);
    
    res.json(response);
    connection.destroy();
};
const getAula  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_aula} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_aula,
                                                a.latitud,
                                                a.longitud,
                                                a.referencia,
                                                b.descripcion 'facultad'
                                            FROM
                                                aula a,
                                                facultad b
                                            WHERE
                                                a.cod_facultad = b.cod_facultad AND
                                                cod_aula='${cod_aula}'`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postAula  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_aula,latitud,longitud,referencia,cod_facultad} = req.body;
    const response = await connection.query(
                                            `INSERT INTO
                                                aula (cod_aula,latitud,longitud,referencia,cod_facultad)
                                            VALUES ('${cod_aula}','${latitud}','${longitud}','${referencia}','${cod_facultad}')`
                                            );
    
    res.json(response);
};
const putAula = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_aula} = req.params;
    const {latitud,longitud,referencia,cod_facultad} = req.body;
    try{
        const response = await connection.query(
                                            `UPDATE
                                                aula
                                            SET
                                                latitud = '${latitud}',
                                                longitud = '${longitud}',
                                                referencia = '${referencia}',
                                                cod_facultad = '${cod_facultad}'
                                            WHERE
                                                cod_aula='${cod_aula}'`
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
const deleteAula  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_aula} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                aula
                                            WHERE
                                                cod_aula = '${cod_aula}'`
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
    getAulaAll,
    getAula,
    postAula,
    putAula,
    deleteAula
};

module.exports = methods;