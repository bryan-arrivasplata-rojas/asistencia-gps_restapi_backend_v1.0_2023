const database= require('../../database/database');
const mysql = require('promise-mysql');

const getOPAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_op,
                                                a.descripcion,
                                                b.cod_facultad,
                                                b.descripcion 'descripcion_facultad',
                                                c.cod_tipo_ciclo,
                                                c.semanas,
                                                DATE_FORMAT(a.fecha_inicio,"%Y-%m-%d %H:%i:%s") 'fecha_inicio',
                                                DATE_FORMAT(a.fecha_final,"%Y-%m-%d %H:%i:%s") 'fecha_final'
                                            FROM
                                                orden_pedido a,
                                                facultad b,
                                                tipo_ciclo c
                                            WHERE
                                                a.cod_facultad = b.cod_facultad AND
                                                a.cod_tipo_ciclo = c.cod_tipo_ciclo
                                            ORDER BY
                                                a.fecha_inicio`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOPOSemana  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_op,
                                                a.descripcion,
                                                b.cod_op_semana,
                                                b.num_semana
                                            FROM
                                                orden_pedido a,
                                                op_semana b
                                            WHERE
                                                a.cod_op = b.cod_op AND
                                                a.cod_op = ${cod_op}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOPCursoDisponible  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_curso,
                                                a.descripcion
                                            FROM
                                                curso a,
                                                orden_pedido b,
                                                facultad c
                                            WHERE
                                                b.cod_facultad = c.cod_facultad AND
                                                c.cod_facultad = a.cod_facultad AND
                                                b.cod_op = ${cod_op} AND
                                                a.cod_curso NOT IN (
                                                    SELECT
                                                        b.cod_curso
                                                    FROM
                                                        ocurso b
                                                    WHERE b.cod_op = ${cod_op}
                                                )`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOPAula  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_facultad,
                                                a.descripcion,
                                                b.cod_aula,
                                                b.referencia
                                            FROM
                                                facultad a,
                                                aula b
                                            WHERE
                                                a.cod_facultad = b.cod_facultad AND
                                                a.cod_facultad = 
                                                    (
                                                        SELECT
                                                            c.cod_facultad
                                                        FROM
                                                            orden_pedido c
                                                        WHERE
                                                            c.cod_op = ${cod_op}
                                                    )`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOPOCurso  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                b.cod_ocurso,
                                                c.cod_curso,
                                                c.descripcion
                                            FROM
                                                orden_pedido a,
                                                ocurso b,
                                                curso c
                                            WHERE
                                                a.cod_op = b.cod_op AND
                                                b.cod_curso = c.cod_curso AND
                                                a.cod_op = ${cod_op}
                                            ORDER BY
                                                c.cod_curso,c.descripcion`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOP  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_op,
                                                a.descripcion,
                                                b.cod_facultad,
                                                b.descripcion 'descripcion_facultad',
                                                c.cod_tipo_ciclo,                   
                                                c.semanas,
                                                DATE_FORMAT(a.fecha_inicio,"%Y-%m-%d %H:%i:%s") 'fecha_inicio',
                                                DATE_FORMAT(a.fecha_final,"%Y-%m-%d %H:%i:%s") 'fecha_final'
                                            FROM
                                                orden_pedido a,
                                                facultad b,
                                                tipo_ciclo c
                                            WHERE
                                                a.cod_facultad = b.cod_facultad AND
                                                a.cod_tipo_ciclo = c.cod_tipo_ciclo AND
                                                a.cod_op=${cod_op}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postOP  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_facultad,cod_tipo_ciclo,descripcion,fecha_inicio,fecha_final} = req.body;
    const response = await connection.query(
                                            `INSERT INTO
                                                orden_pedido (cod_facultad,cod_tipo_ciclo,descripcion,fecha_inicio,fecha_final)
                                            VALUES (${cod_facultad},${cod_tipo_ciclo},'${descripcion}','${fecha_inicio}','${fecha_final}')`
                                            );
    
    res.json(response);
    connection.destroy();
};
const putOP = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op} = req.params;
    const {cod_tipo_ciclo,descripcion,fecha_inicio,fecha_final} = req.body;
    try{
        const response = await connection.query(
                                            `UPDATE
                                                orden_pedido
                                            SET
                                                cod_tipo_ciclo=${cod_tipo_ciclo},
                                                descripcion='${descripcion}',
                                                fecha_inicio='${fecha_inicio}',
                                                fecha_final='${fecha_final}'
                                            WHERE
                                                cod_op=${cod_op}`
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
const deleteOP  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                orden_pedido
                                            WHERE
                                                cod_op = ${cod_op}`
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
    getOPAll,
    getOPCursoDisponible,
    getOPOSemana,
    getOPAula,
    getOPOCurso,
    getOP,
    postOP,
    putOP,
    deleteOP
};

module.exports = methods;