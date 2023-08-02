const database= require('../../database/database');
const mysql = require('promise-mysql');

const getAsistenciaHabilitadoAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_asistencia_habilitado,
                                                a.distancia_maxima,
                                                a.tiempo_cerrar_num_solicitud,
                                                CASE
                                                    WHEN a.habilitado = 0 THEN "Habilitado"
                                                    WHEN a.habilitado = 1 THEN "Deshabilitado"
                                                    ELSE "Llamar soporte Técnico"
                                                END 'habilitado',
                                                a.num_solicitud,
                                                i.cod_op,
                                                i.descripcion 'descripcion_op',
                                                j.cod_facultad,
                                                j.descripcion 'descripcion_facultad',
                                                g.cod_ocurso,
                                                h.cod_curso,
                                                h.descripcion 'descripcion_curso',
                                                f.cod_oseccion,
                                                f.cod_seccion,
                                                e.cod_aula,
                                                e.referencia,
                                                b.email,
                                                k.descripcion 'descripcion_usuario',
                                                l.num_semana
                                            FROM
                                                asistencia_habilitado a,
                                                usuario_seccion b,
                                                usuario c,
                                                perfil d,
                                                aula e,
                                                oseccion f,
                                                ocurso g,
                                                curso h,
                                                orden_pedido i,
                                                facultad j,
                                                tipo k,
                                                op_semana l
                                            WHERE
                                                a.cod_oseccion = b.cod_oseccion AND
                                                b.email = c.email AND
                                                c.email = d.email AND
                                                a.cod_aula = e.cod_aula AND
                                                b.cod_oseccion = f.cod_oseccion AND
                                                f.cod_ocurso = g.cod_ocurso AND
                                                g.cod_curso = h.cod_curso AND
                                                g.cod_op = i.cod_op AND
                                                i.cod_facultad = j.cod_facultad AND
                                                d.tipo = k.tipo AND
                                                a.cod_op_semana = l.cod_op_semana AND
                                                d.tipo = 2
                                            ORDER BY
                                                i.cod_op,a.num_solicitud,l.num_semana DESC`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(response);
    
    res.json(response);
    connection.destroy();
};
const getAsistenciaHabilitado  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_asistencia_habilitado} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_asistencia_habilitado,
                                                a.distancia_maxima,
                                                a.tiempo_cerrar_num_solicitud,
                                                CASE
                                                    WHEN a.habilitado = 0 THEN "Habilitado"
                                                    WHEN a.habilitado = 1 THEN "Deshabilitado"
                                                    ELSE "Llamar soporte Técnico"
                                                END 'habilitado',
                                                a.num_solicitud,
                                                i.cod_op,
                                                i.descripcion 'descripcion_op',
                                                j.cod_facultad,
                                                j.descripcion 'descripcion_facultad',
                                                g.cod_ocurso,
                                                h.cod_curso,
                                                h.descripcion 'descripcion_curso',
                                                f.cod_oseccion,
                                                f.cod_seccion,
                                                e.cod_aula,
                                                e.referencia,
                                                b.email,
                                                k.descripcion 'descripcion_usuario',
                                                l.num_semana
                                            FROM
                                                asistencia_habilitado a,
                                                usuario_seccion b,
                                                usuario c,
                                                perfil d,
                                                aula e,
                                                oseccion f,
                                                ocurso g,
                                                curso h,
                                                orden_pedido i,
                                                facultad j,
                                                tipo k,
                                                op_semana l
                                            WHERE
                                                a.cod_oseccion = b.cod_oseccion AND
                                                b.email = c.email AND
                                                c.email = d.email AND
                                                a.cod_aula = e.cod_aula AND
                                                b.cod_oseccion = f.cod_oseccion AND
                                                f.cod_ocurso = g.cod_ocurso AND
                                                g.cod_curso = h.cod_curso AND
                                                g.cod_op = i.cod_op AND
                                                i.cod_facultad = j.cod_facultad AND
                                                d.tipo = k.tipo AND
                                                a.cod_op_semana = l.cod_op_semana AND
                                                d.tipo = 2 AND
                                                cod_asistencia_habilitado = ${cod_asistencia_habilitado}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postAsistenciaHabilitado  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op_semana,cod_oseccion,cod_aula,distancia_maxima,tiempo_cerrar_num_solicitud} = req.body;
    const num_solicitud = await connection.query(
                                            `SELECT
                                                count(*)+1 'num_solicitud'
                                            FROM
                                                asistencia_habilitado
                                            WHERE
                                                cod_op_semana=${cod_op_semana} AND
                                                cod_oseccion = ${cod_oseccion}`
                                            );
    const habilitado = await connection.query(
                                            `SELECT
                                                1
                                            FROM
                                                asistencia_habilitado
                                            WHERE
                                                cod_op_semana=${cod_op_semana} AND
                                                cod_oseccion = ${cod_oseccion} AND
                                                habilitado = 0`
                                            );
    const semana_disponible = await connection.query(
                                                `SELECT
                                                    1
                                                FROM
                                                    op_semana a
                                                WHERE
                                                    a.fecha_inicio<= NOW() AND
                                                    a.fecha_final>= NOW() AND
                                                    a.cod_op_semana = ${cod_op_semana}`
                                                );
    if(semana_disponible.length!=0){
        if (habilitado.length===0){
            const response = await connection.query(
                                                    `INSERT INTO asistencia_habilitado 
                                                    (cod_op_semana,cod_oseccion,cod_aula,num_solicitud,distancia_maxima,tiempo_cerrar_num_solicitud) VALUES 
                                                    (${cod_op_semana},${cod_oseccion},${cod_aula},${num_solicitud[0].num_solicitud},'${distancia_maxima}','${tiempo_cerrar_num_solicitud}')`
                                                    );
            res.json(response);
        }else{
            res.json({'response':'Hay semanas que aun no estan cerradas'});
            
        }
    }else{
        res.json({'response':'La semana actual ya no permite crear asistencia de clase'});
    }
    connection.destroy();
    
};
const putAsistenciaHabilitado = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_asistencia_habilitado} = req.params;
    const {distancia_maxima,tiempo_cerrar_num_solicitud,habilitado} = req.body;
    
    const semanas_habilitadas = await connection.query(
                                                    `SELECT
                                                        COUNT(*) 'contador'
                                                    FROM
                                                        asistencia_habilitado a
                                                    WHERE
                                                        a.cod_oseccion = 
                                                            (
                                                                SELECT
                                                                    c.cod_oseccion
                                                                FROM
                                                                    asistencia_habilitado c
                                                                WHERE
                                                                    c.cod_asistencia_habilitado = ${cod_asistencia_habilitado}
                                                            ) AND
                                                        a.habilitado = 0 AND
                                                        a.cod_asistencia_habilitado NOT IN (${cod_asistencia_habilitado})`
                                                    );
    if(semanas_habilitadas[0]['contador']===0){
        try{
            const response = await connection.query(
                                                `UPDATE
                                                    asistencia_habilitado
                                                SET
                                                    distancia_maxima = '${distancia_maxima}',
                                                    tiempo_cerrar_num_solicitud = '${tiempo_cerrar_num_solicitud}',
                                                    habilitado = ${habilitado}
                                                WHERE
                                                    cod_asistencia_habilitado=${cod_asistencia_habilitado}`
                                                );
            //const users = response.json();
            //res.json({'response':[{'response':'Cerrado con éxito'}]});
            
            res.json(response);
        }catch(_){
            //console.log(_);
            res.json(_);
        }
    }else{
        
        res.json({'response':'Actualmente hay alguna solicitud de semana habilitada para el curso/seccion, debe cerrarlo para evitar duplicidad'});
    }
    connection.destroy();
};
const deleteAsistenciaHabilitado  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_asistencia_habilitado} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                asistencia_habilitado
                                            WHERE
                                                cod_asistencia_habilitado = ${cod_asistencia_habilitado}`
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
    getAsistenciaHabilitadoAll,
    getAsistenciaHabilitado,
    postAsistenciaHabilitado,
    putAsistenciaHabilitado,
    deleteAsistenciaHabilitado
};

module.exports = methods;