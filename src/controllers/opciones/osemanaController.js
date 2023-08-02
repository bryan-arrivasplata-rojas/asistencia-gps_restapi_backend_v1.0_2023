const database= require('../../database/database');
const mysql = require('promise-mysql');

const getOSemanaAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_op_semana,
                                                b.cod_op,
                                                b.descripcion 'descripcion_op',
                                                c.cod_facultad,
                                                c.descripcion 'descripcion_facultad',
                                                a.num_semana,
                                                DATE_FORMAT(a.fecha_inicio,"%Y-%m-%d %H:%i:%s") 'fecha_inicio',
                                                DATE_FORMAT(a.fecha_final,"%Y-%m-%d %H:%i:%s") 'fecha_final'
                                            FROM
                                                op_semana a,
                                                orden_pedido b,
                                                facultad c
                                            WHERE
                                                a.cod_op = b.cod_op AND
                                                b.cod_facultad = c.cod_facultad
                                            ORDER BY
                                                a.fecha_inicio`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOSemanaSeccionCursoFacultadOP  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_seccion,cod_op_semana,cod_curso,cod_op} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                MAX(a.num_solicitud) 'num_solicitud'
                                            FROM
                                                asistencia_habilitado a,
                                                usuario_seccion b,
                                                oseccion c,
                                                ocurso d,
                                                orden_pedido e
                                            WHERE
                                                a.cod_oseccion = b.cod_oseccion AND
                                                b.cod_oseccion = c.cod_oseccion AND
                                                c.cod_ocurso = d.cod_ocurso AND
                                                d.cod_op = e.cod_op AND
                                                c.cod_seccion = '${cod_seccion}' AND
                                                a.cod_op_semana = ${cod_op_semana} AND
                                                d.cod_curso = '${cod_curso}' AND
                                                e.cod_op = ${cod_op}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const getOSemana  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op_semana} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.cod_op_semana,
                                                b.cod_op,
                                                b.descripcion 'descripcion_op',
                                                c.cod_facultad,
                                                c.descripcion 'descripcion_facultad',
                                                a.num_semana,
                                                DATE_FORMAT(a.fecha_inicio,"%Y-%m-%d %H:%i:%s") 'fecha_inicio',
                                                DATE_FORMAT(a.fecha_final,"%Y-%m-%d %H:%i:%s") 'fecha_final'
                                            FROM
                                                op_semana a,
                                                orden_pedido b,
                                                facultad c
                                            WHERE
                                                a.cod_op = b.cod_op AND
                                                b.cod_facultad = c.cod_facultad AND
                                                a.cod_op_semana=${cod_op_semana}`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};
const postOSemana  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op,fecha_inicio,fecha_final} = req.body;
    const num_semana = await connection.query(
                                            `SELECT
                                                a.num_semana
                                            FROM 
                                                (
                                                    SELECT
                                                        count(*)+1 'num_semana'
                                                    FROM
                                                        op_semana
                                                    WHERE
                                                        cod_op=${cod_op}
                                                ) a,
                                                orden_pedido b,
                                                tipo_ciclo c
                                            WHERE
                                                b.cod_op = ${cod_op} AND
                                                b.cod_tipo_ciclo = c.cod_tipo_ciclo AND
                                                a.num_semana<=c.semanas`
                                            );
    const habilitado_fecha = await connection.query(
                                                `SELECT 
                                                    1
                                                FROM
                                                    (
                                                        SELECT
                                                            MAX(fecha_final) 'fecha_final'
                                                        FROM
                                                            op_semana
                                                        WHERE
                                                            cod_op=${cod_op}
                                                    ) a
                                                WHERE
                                                    a.fecha_final<= '${fecha_inicio}'`
                                                );
    if (num_semana.length!=0){
        const value=num_semana[0].num_semana;
        if(habilitado_fecha.length!=0 || value===1){
            const response = await connection.query(
                                                `INSERT INTO
                                                    op_semana (cod_op,num_semana,fecha_inicio,fecha_final)
                                                VALUES (${cod_op},${num_semana[0].num_semana},'${fecha_inicio}','${fecha_final}')`);
            
            res.json(response);
        }else{
            
            res.json({'response':'Revisar la fecha inicio, debe ser mayor a la fecha final de la semana anterior'});
        }
        
    }else{
        
        res.json({'response':'El ciclo actual no puede superar las semanas establecitas en el Ciclo Académico: OP'});
    }
    connection.destroy();
    
};
const putOSemana = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op_semana} = req.params;
    const {fecha_inicio,fecha_final} = req.body;
    const num_semana = await connection.query(`SELECT
                                                    x.cod_op,
                                                    x.num_semana
                                                FROM
                                                    op_semana x
                                                WHERE
                                                    x.cod_op_semana=${cod_op_semana}
                                                `);
    const num_semana_max = await connection.query(`SELECT
                                                    c.semanas
                                                FROM
                                                    op_semana a,
                                                    orden_pedido b,
                                                    tipo_ciclo c
                                                WHERE
                                                    a.cod_op = b.cod_op AND
                                                    b.cod_tipo_ciclo = c.cod_tipo_ciclo AND
                                                    a.cod_op_semana = ${cod_op_semana}
                                                `);                                            
    const fecha_inicio_valido = await connection.query(`SELECT
                                                            1
                                                        FROM
                                                            op_semana a,
                                                            (
                                                                SELECT
                                                                    x.cod_op,
                                                                    x.num_semana
                                                                FROM
                                                                    op_semana x
                                                                WHERE
                                                                    x.cod_op_semana=${cod_op_semana}
                                                            ) b
                                                        WHERE
                                                            a.cod_op=b.cod_op AND
                                                            a.num_semana = b.num_semana - 1 AND
                                                            a.fecha_final<='${fecha_inicio}'
                                                        `);
    const fecha_final_validado = await connection.query(`SELECT
                                                            1
                                                        FROM
                                                            op_semana a,
                                                            (
                                                                SELECT
                                                                    x.cod_op,
                                                                    x.num_semana
                                                                FROM
                                                                    op_semana x
                                                                WHERE
                                                                    x.cod_op_semana=${cod_op_semana}
                                                            ) b
                                                        WHERE
                                                            a.cod_op=b.cod_op AND
                                                            a.num_semana = b.num_semana + 1 AND
                                                            a.fecha_inicio>='${fecha_final}'
                                                        `);
    if(num_semana[0]['num_semana']!=1){
        if(fecha_inicio_valido.length!=0){
            if(fecha_final_validado.length!=0){
                try{
                    const response = await connection.query(
                                                        `UPDATE
                                                            op_semana
                                                        SET
                                                            fecha_inicio='${fecha_inicio}',
                                                            fecha_final='${fecha_final}'
                                                        WHERE
                                                            cod_op_semana=${cod_op_semana}`
                                                        );
                    //const users = response.json();
                    //res.json({'response':[{'response':'Cerrado con éxito'}]});
                    res.json(response);
                }catch(_){
                    //console.log(_);
                    res.json(_);
                }
            }else{
                if(num_semana[0]['num_semana']===num_semana_max[0]['semanas']){
                    try{
                        const response = await connection.query(
                                                            `UPDATE
                                                                op_semana
                                                            SET
                                                                fecha_inicio='${fecha_inicio}',
                                                                fecha_final='${fecha_final}'
                                                            WHERE
                                                                cod_op_semana=${cod_op_semana}`
                                                            );
                        //const users = response.json();
                        //res.json({'response':[{'response':'Cerrado con éxito'}]});
                        res.json(response);
                    }catch(_){
                        //console.log(_);
                        res.json(_);
                    }
                }else{
                    res.json({'response':'Revisar la fecha final, no debe superar la fecha inicial de la semana siguiente'});
                }
                
            }
        }else{
            res.json({'response':'Revisar la fecha inicial, no debe superar la fecha final de la semana anterior'});
        }
    }else{
        if(fecha_final_validado.length!=0){
            try{
                const response = await connection.query(
                                                    `UPDATE
                                                        op_semana
                                                    SET
                                                        fecha_inicio='${fecha_inicio}',
                                                        fecha_final='${fecha_final}'
                                                    WHERE
                                                        cod_op_semana=${cod_op_semana}`
                                                    );
                //const users = response.json();
                //res.json({'response':[{'response':'Cerrado con éxito'}]});
                res.json(response);
            }catch(_){
                //console.log(_);
                res.json(_);
            }
        }else{
            res.json({'response':'Revisar la fecha final, no debe superar la fecha inicial de la semana siguiente'});
        }
    }
    connection.destroy();
    
};
const deleteOSemana  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {cod_op_semana} = req.params;
    const validar_op_semana = await connection.query(
                                                    `SELECT
                                                        MAX(b.num_semana) 'num_semana_max',
                                                        a.num_semana
                                                    FROM
                                                        (
                                                            SELECT
                                                                cod_op,
                                                                num_semana
                                                            from
                                                                op_semana
                                                            where
                                                                cod_op_semana = ${cod_op_semana}
                                                        ) a,
                                                        op_semana b
                                                    WHERE
                                                        a.cod_op = b.cod_op`
                                                    );
    if(validar_op_semana.length!=0){
        if(validar_op_semana[0].num_semana_max === validar_op_semana[0].num_semana){
            try{
                const response = await connection.query(
                                                    `DELETE FROM
                                                        op_semana
                                                    WHERE
                                                        cod_op_semana = ${cod_op_semana}`
                                                    );
                //console.log(response);
                res.json(response);
            }catch(_){
                //console.log(_);
                res.json(_);
            }
        }else{
            res.json({'sqlMessage':'Solo puede borrar desde la ultima semana del ciclo-facultad hacia atras'});
        }
    }else{
        res.json({'sqlMessage':'Contactar a soporte Tecnico'});
    }
    connection.destroy();
};

const methods = {
    getOSemanaAll,
    getOSemanaSeccionCursoFacultadOP,
    getOSemana,
    postOSemana,
    putOSemana,
    deleteOSemana
};

module.exports = methods;