const database= require('../../database/database');
const mysql = require('promise-mysql');

const getTipoCicloAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                cod_tipo_ciclo,
                                                semanas
                                            FROM
                                                tipo_ciclo
                                            ORDER BY
                                                semanas ASC`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getTipoCiclo  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_tipo_ciclo} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                cod_tipo_ciclo,
                                                semanas
                                            FROM
                                                tipo_ciclo
                                            WHERE
                                                cod_tipo_ciclo=${cod_tipo_ciclo}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postTipoCiclo  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {semanas} = req.body;
    const response = await connection.query(
                                            `INSERT INTO
                                                tipo_ciclo (semanas)
                                            VALUES (${semanas})`
                                            );
    res.json(response);
    connection.destroy();
};
const putTipoCiclo = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_tipo_ciclo} = req.params;
    const {semanas} = req.body;
    try{
        const response = await connection.query(
                                            `UPDATE
                                                tipo_ciclo
                                            SET
                                                semanas=${semanas}
                                            WHERE
                                                cod_tipo_ciclo='${cod_tipo_ciclo}'`
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
const deleteTipoCiclo  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_tipo_ciclo} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                tipo_ciclo
                                            WHERE
                                                cod_tipo_ciclo = ${cod_tipo_ciclo}`
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
    getTipoCicloAll,
    getTipoCiclo,
    postTipoCiclo,
    putTipoCiclo,
    deleteTipoCiclo
};

module.exports = methods;