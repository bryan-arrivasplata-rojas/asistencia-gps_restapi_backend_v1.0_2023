const database= require('../../database/database');
const mysql = require('promise-mysql');

const getUsuarioAll  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                email,
                                                password,
                                                token,
                                                fecha_created
                                            FROM
                                                usuario`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(response);
    
    res.json(response);
    connection.destroy();
};
const getUsuarioFaltante  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    //const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                a.email,
                                                a.password,
                                                a.token,
                                                a.fecha_created
                                            FROM
                                                usuario a
                                            WHERE
                                                NOT EXISTS(
                                                    SELECT
                                                        1
                                                    FROM
                                                        perfil b
                                                    WHERE
                                                        a.email=b.email)`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(response);
    
    res.json(response);
    connection.destroy();
};
const getUsuario  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {email} = req.params;
    const response = await connection.query(
                                            `SELECT
                                                email,
                                                password,
                                                token,
                                                fecha_created
                                            FROM
                                                usuario
                                            WHERE
                                                email='${email}'`
                                            );
    //let result = Object.values(JSON.parse(JSON.stringify(response)));
    //console.log(result);
    
    res.json(response);
    connection.destroy();
};

const postUsuario  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    console.log(req.body);
    const {email,password} = req.body;
    const response = await connection.query(
                                            `INSERT INTO
                                                usuario (email,password)
                                            VALUES ('${email}','${password}')`
                                            );
    
    res.json(response);
    connection.destroy();
};
const putUsuario = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {email} = req.params;
    const {password,token} = req.body;
    try{
        const response = await connection.query(
                                            `UPDATE
                                                usuario
                                            SET
                                                password = '${password}',
                                                token = '${token}'
                                            WHERE
                                                email='${email}'`
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
const deleteUsuario  = async(req,res)=>{
    const connection = await mysql.createConnection(database);
    const {email} = req.params;
    try{
        const response = await connection.query(
                                            `DELETE FROM
                                                usuario
                                            WHERE
                                                email = '${email}'`
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
    getUsuarioAll,
    getUsuario,
    getUsuarioFaltante,
    postUsuario,
    putUsuario,
    deleteUsuario
};

module.exports = methods;