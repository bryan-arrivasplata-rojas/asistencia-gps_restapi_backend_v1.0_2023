const database= require('../../database/database');
const mysql = require('promise-mysql');

const getUsuarioSeccionAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.id,
                                                a.email,
                                                b.cod_oseccion,
                                                c.cod_seccion,
                                                d.cod_ocurso,
                                                e.cod_curso,
                                                e.descripcion 'descripcion_curso',
                                                f.cod_op,
                                                f.descripcion 'descripcion_op',
                                                g.cod_facultad,
                                                g.descripcion 'descripcion_facultad'
                                            FROM
                                                usuario_seccion a,
                                                oseccion b,
                                                seccion c,
                                                ocurso d,
                                                curso e,
                                                orden_pedido f,
                                                facultad g
                                            WHERE
                                                a.cod_oseccion = b.cod_oseccion AND
                                                b.cod_seccion = c.cod_seccion AND
                                                b.cod_ocurso = d.cod_ocurso AND
                                                d.cod_curso = e.cod_curso AND
                                                d.cod_op = f.cod_op AND
                                                f.cod_facultad = g.cod_facultad`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(response);
    res.json(response);
    connection.destroy();
};
const getUsuarioSeccionEmail  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {id} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.email
                                            FROM
                                                usuario a
                                            WHERE
                                                a.email NOT IN 
                                                (
                                                    SELECT
                                                        b.email
                                                    FROM
                                                        usuario_seccion b
                                                    WHERE
                                                        b.cod_oseccion = 
                                                            (
                                                                SELECT
                                                                    c.cod_oseccion
                                                                FROM
                                                                    usuario_seccion c
                                                                WHERE
                                                                    c.id = ${id}
                                                            )
                                                )`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    res.json(response);
    connection.destroy();
};
const getUsuarioSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {id} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.id,
                                                a.email,
                                                b.cod_oseccion,
                                                c.cod_seccion,
                                                d.cod_ocurso,
                                                e.cod_curso,
                                                e.descripcion 'descripcion_curso',
                                                f.cod_op,
                                                f.descripcion 'descripcion_op',
                                                g.cod_facultad,
                                                g.descripcion 'descripcion_facultad'
                                            FROM
                                                usuario_seccion a,
                                                oseccion b,
                                                seccion c,
                                                ocurso d,
                                                curso e,
                                                orden_pedido f,
                                                facultad g
                                            WHERE
                                                a.cod_oseccion = b.cod_oseccion AND
                                                b.cod_seccion = c.cod_seccion AND
                                                b.cod_ocurso = d.cod_ocurso AND
                                                d.cod_curso = e.cod_curso AND
                                                d.cod_op = f.cod_op AND
                                                f.cod_facultad = g.cod_facultad AND
                                                a.id=${id}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    res.json(response);
    connection.destroy();
};
const postUsuarioSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {email,cod_oseccion} = req.body;
    const response = await connection.query(
                                            `INSERT INTO
                                                usuario_seccion (email,cod_oseccion)
                                            VALUES ('${email}',${cod_oseccion})`
                                            );
    res.json(response);
    connection.destroy();
};
const putUsuarioSeccion = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {id} = req.params;
    const {email} = req.body;
    try{
        const response = await connection.query(
                                            `UPDATE
                                                usuario_seccion
                                            SET
                                                email = '${email}'
                                            WHERE
                                                id=${id}`
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
const deleteUsuarioSeccion  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {id} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                usuario_seccion
                                            WHERE
                                                id = ${id}`
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
    getUsuarioSeccionAll,
    getUsuarioSeccionEmail,
    getUsuarioSeccion,
    postUsuarioSeccion,
    putUsuarioSeccion,
    deleteUsuarioSeccion,
};

module.exports = methods;