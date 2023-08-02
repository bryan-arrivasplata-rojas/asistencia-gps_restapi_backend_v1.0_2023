const database = require('../../database/database');
const mysql = require('promise-mysql');

const getFacultadAll  = async (req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                `SELECT
                                    cod_facultad,
                                    descripcion,
                                    abreviatura
                                FROM
                                    facultad
                                ORDER BY
                                    descripcion ASC`);
                        //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getFacultadCurso  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_facultad} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_curso,
                                                b.descripcion 'descripcion_facultad',
                                                a.descripcion
                                            FROM
                                                curso a,
                                                facultad b
                                            WHERE
                                                a.cod_facultad=b.cod_facultad AND
                                                a.cod_facultad=${cod_facultad}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getFacultad  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_facultad} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                cod_facultad,
                                                descripcion,
                                                abreviatura
                                            FROM
                                                facultad
                                            WHERE
                                                cod_facultad=${cod_facultad}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postFacultad  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {descripcion,abreviatura} = req.body;
    const response = await connection.query(
                                            `INSERT INTO
                                                facultad (descripcion,abreviatura)
                                            VALUES ('${descripcion}','${abreviatura}')`
                                            );
    
    res.json(response);
    connection.destroy();
};
const putFacultad = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_facultad} = req.params;
    const {descripcion,abreviatura} = req.body;
    try{
        const response = await connection.query(
                                            `UPDATE
                                                facultad
                                            SET
                                                descripcion = '${descripcion}',
                                                abreviatura = '${abreviatura}'
                                            WHERE
                                                cod_facultad='${cod_facultad}'`
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
const deleteFacultad  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_facultad} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                facultad
                                            WHERE
                                                cod_facultad = ${cod_facultad}`
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
    getFacultadAll,
    getFacultadCurso,
    getFacultad,
    postFacultad,
    putFacultad,
    deleteFacultad
};

module.exports = methods;