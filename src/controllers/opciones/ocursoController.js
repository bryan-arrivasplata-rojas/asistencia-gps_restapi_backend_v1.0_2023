const database= require('../../database/database');
const mysql = require('promise-mysql');

const getOCursoAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_ocurso,
                                                b.cod_curso,
                                                b.descripcion 'descripcion_curso',
                                                c.cod_op,
                                                c.descripcion 'descripcion_op',
                                                d.cod_facultad,
                                                d.descripcion 'descripcion_facultad'
                                            FROM
                                                ocurso a,
                                                curso b,
                                                orden_pedido c,
                                                facultad d
                                            WHERE
                                                a.cod_curso = b.cod_curso AND
                                                a.cod_op = c.cod_op AND
                                                c.cod_facultad = d.cod_facultad
                                            ORDER BY
                                                c.fecha_inicio,b.cod_curso`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getCursoCicloDisponibleAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_ocurso} = req.params;
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
                                                b.cod_op = (
                                                        SELECT
                                                            c.cod_op
                                                        FROM
                                                            ocurso c
                                                        WHERE
                                                            c.cod_ocurso = ${cod_ocurso}) AND
                                                a.cod_curso NOT IN (
                                                    SELECT
                                                        b.cod_curso
                                                    FROM
                                                        ocurso b
                                                    WHERE b.cod_op = (
                                                        SELECT
                                                            c.cod_op
                                                        FROM
                                                            ocurso c
                                                        WHERE
                                                            c.cod_ocurso = ${cod_ocurso})
                                                )`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};

const getCursoCicloDisponible  = async(req,res)=>{
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
const getOCursoSeccionDisponible  = async(req,res)=>{
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
const getOCursoSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_ocurso} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_seccion
                                            FROM
                                                seccion a
                                            WHERE
                                                a.cod_seccion NOT IN
                                                    (
                                                        SELECT
                                                            b.cod_seccion
                                                        FROM
                                                            oseccion b
                                                        WHERE
                                                            b.cod_ocurso = ${cod_ocurso}
                                                    )
                                            ORDER BY
                                                a.cod_seccion`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOCursoOSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_ocurso} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                b.cod_oseccion,
                                                b.cod_seccion
                                            FROM
                                                ocurso a,
                                                oseccion b
                                            WHERE
                                                a.cod_ocurso = b.cod_ocurso AND
                                                a.cod_ocurso = ${cod_ocurso}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOCurso  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_ocurso} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_ocurso,
                                                b.cod_curso,
                                                b.descripcion 'descripcion_curso',
                                                c.cod_op,
                                                c.descripcion 'descripcion_op',
                                                d.cod_facultad,
                                                d.descripcion 'descripcion_facultad'
                                            FROM
                                                ocurso a,
                                                curso b,
                                                orden_pedido c,
                                                facultad d
                                            WHERE
                                                a.cod_curso = b.cod_curso AND
                                                a.cod_op = c.cod_op AND
                                                c.cod_facultad = d.cod_facultad AND
                                                a.cod_ocurso=${cod_ocurso}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postOCurso  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_curso,cod_op} = req.body;
    const response = await connection.query(
                                            `INSERT INTO
                                                ocurso (cod_curso,cod_op)
                                            VALUES ('${cod_curso}',${cod_op})`
                                            );
    
    res.json(response);
    connection.destroy();
};
const putOCurso = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_ocurso} = req.params;
    const {cod_curso} = req.body;
    try{
        const response = await connection.query(
                                            `UPDATE
                                                ocurso
                                            SET
                                                cod_curso='${cod_curso}'
                                            WHERE
                                                cod_op=${cod_ocurso}`
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
const deleteOCurso  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_ocurso} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                ocurso
                                            WHERE
                                                cod_ocurso = ${cod_ocurso}`
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
    getOCursoAll,
    getCursoCicloDisponibleAll,
    getCursoCicloDisponible,
    getOCursoSeccionDisponible,
    getOCursoSeccion,
    getOCursoOSeccion,
    getOCurso,
    postOCurso,
    putOCurso,
    deleteOCurso
};

module.exports = methods;