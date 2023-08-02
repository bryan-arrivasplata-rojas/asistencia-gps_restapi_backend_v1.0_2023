const database= require('../../database/database');
const mysql = require('promise-mysql');

const getOSeccionAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_oseccion,
                                                a.cod_ocurso,
                                                e.cod_op,
                                                e.descripcion 'descripcion_op',
                                                f.cod_facultad,
                                                f.descripcion 'descripcion_facultad',
                                                c.cod_curso,
                                                c.descripcion 'descripcion_curso',
                                                a.cod_seccion
                                            FROM
                                                oseccion a,
                                                ocurso b,
                                                curso c,
                                                seccion d,
                                                orden_pedido e,
                                                facultad f
                                            WHERE
                                                a.cod_ocurso = b.cod_ocurso AND
                                                a.cod_seccion = d.cod_seccion AND
                                                b.cod_curso = c.cod_curso AND
                                                b.cod_op = e.cod_op AND
                                                e.cod_facultad = f.cod_facultad
                                            ORDER BY
                                                e.descripcion,f.descripcion,c.cod_curso,a.cod_seccion`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOSeccionCurso  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_oseccion} = req.params;
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
                                                a.cod_op=(
                                                    SELECT
                                                        b.cod_op
                                                    FROM
                                                        oseccion a,
                                                        ocurso b
                                                    WHERE
                                                        a.cod_ocurso = b.cod_ocurso AND
                                                        a.cod_oseccion = ${cod_oseccion}
                                                    )`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};

const getOSeccionSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_oseccion} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                d.cod_seccion 
                                            FROM 
                                                (
                                                    SELECT
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
                                                                    b.cod_ocurso = 
                                                                        (
                                                                            SELECT
                                                                                cod_ocurso
                                                                            FROM
                                                                                oseccion
                                                                            WHERE
                                                                                cod_oseccion = ${cod_oseccion}
                                                                        )
                                                            )
                                                    UNION
                                                    SELECT
                                                        c.cod_seccion
                                                    FROM
                                                        oseccion c
                                                    WHERE
                                                        c.cod_oseccion=${cod_oseccion}
                                                ) d
                                            ORDER BY d.cod_seccion`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOSeccionEmail  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_oseccion} = req.params;
    console.log(req.params);
    const response = await connection.query(
                                            `SELECT
                                                a.email
                                            FROM
                                                usuario a
                                            WHERE
                                                a.email NOT IN
                                                (
                                                    SELECT
                                                        a.email
                                                    FROM
                                                        usuario_seccion a,
                                                        oseccion b
                                                    WHERE
                                                        a.cod_oseccion = b.cod_oseccion AND
                                                        b.cod_ocurso = (
                                                            SELECT
                                                                b.cod_ocurso
                                                            FROM
                                                                oseccion b
                                                            WHERE
                                                                b.cod_oseccion = ${cod_oseccion}
                                                        )
                                                )`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};

const getOSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_oseccion} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_oseccion,
                                                a.cod_ocurso,
                                                e.cod_op,
                                                e.descripcion 'descripcion_op',
                                                f.cod_facultad,
                                                f.descripcion 'descripcion_facultad',
                                                c.cod_curso,
                                                c.descripcion 'descripcion_curso',
                                                a.cod_seccion
                                            FROM
                                                oseccion a,
                                                ocurso b,
                                                curso c,
                                                seccion d,
                                                orden_pedido e,
                                                facultad f
                                            WHERE
                                                a.cod_ocurso = b.cod_ocurso AND
                                                a.cod_seccion = d.cod_seccion AND
                                                b.cod_curso = c.cod_curso AND
                                                b.cod_op = e.cod_op AND
                                                e.cod_facultad = f.cod_facultad AND
                                                a.cod_oseccion=${cod_oseccion}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postOSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_ocurso,cod_seccion} = req.body;
    const response = await connection.query(
                                            `INSERT INTO
                                                oseccion (cod_ocurso,cod_seccion)
                                            VALUES (${cod_ocurso},'${cod_seccion}')`
                                            );
    
    res.json(response);
    connection.destroy();
};
const putOSeccion = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_oseccion} = req.params;
    const {cod_seccion} = req.body;
    try{
        const response = await connection.query(
                                            `UPDATE
                                                oseccion
                                            SET
                                                cod_seccion = '${cod_seccion}'
                                            WHERE
                                                cod_oseccion = ${cod_oseccion}`
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
const deleteOSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_oseccion} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                oseccion
                                            WHERE
                                                cod_oseccion = ${cod_oseccion}`
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
    getOSeccionAll,
    getOSeccionCurso,
    getOSeccionSeccion,
    getOSeccionEmail,
    getOSeccion,
    postOSeccion,
    putOSeccion,
    deleteOSeccion
};

module.exports = methods;