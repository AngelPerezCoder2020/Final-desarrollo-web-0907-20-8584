const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")
/* GET users listing. */
router.get('/', async (req, res, next)=> {
  let data = []

  try{
    //Abrimos la conexion
    await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await sql.query("SELECT Nombre, Precio, Codigo, Existencia FROM Producto")
    data = resultado.recordset
    //await sql.close()

  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send(data)
});

router.get('/:Codigo', async (req, res, next)=> {
  let data = {}
  
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("codigo", sql.Int, req.params.Codigo)
                        .query("SELECT Nombre, Precio, Codigo, Existencia FROM Producto WHERE Codigo = @codigo")
    data = resultado.recordset[0]
    //await sql.close()

  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send(data)
});

router.put('/:Codigo', async (req, res, next)=> {
  let data = {}
  let {Nombre, Precio, Existencia} = req.body
  //user.name, user.pass, user.email
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("codigo", sql.Int, req.params.Codigo)
                        .query("SELECT Codigo FROM Producto WHERE Codigo = @codigo")
    if (resultado.recordset.length > 0){
      const result = await connection
      .request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("Precio", sql.VarChar, Precio)
      .input("Codigo", sql.VarChar, req.params.Codigo)
      .input("Existencia", sql.Int, Existencia)
      .query("UPDATE Producto SET Nombre=@Nombre, Precio=@Precio, Existencia=@Existencia WHERE Codigo=@Codigo")
       data = result.rowsAffected
    }
    //await sql.close()

  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send(data)
});

router.post("/", async (req, res, next)=>{
  const user = req.body;
  let resultado = {}
  try{
    let connection = await sql.connect(config)
    const result = await connection
                              .request()
                              .input("Nombre", sql.VarChar, user.name)
                              .input("Precio", sql.VarChar, user.pass)
                              .input("Existencia", sql.VarChar, user.email)
                              .input("Codigo", sql.VarChar, user.status)
                              
                              .query("INSERT INTO Producto(Nombre,Precio,Existencia,Codigo) VALUES (@Nombre,@Precio,@Existencia,@Codigo)")
    resultado = result.rowsAffected
    //await connection.close()                          
  }
  catch(err){
    console.error(err)
    res.statusCode = 500
    resultado = err
  }
  res.send(resultado)
})



router.delete('/:Codigo', async (req, res, next)=> {
  let data = {}
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("codigo", sql.Int, req.params.Codigo)
                        .query("SELECT Codigo FROM Producto WHERE Codigo = @codigo")
    if (resultado.recordset.length > 0){
      const result = await connection
      .request()
      .input("Codigo", sql.Int, req.params.id)
      .query("DELETE from Producto where Codigo=@Codigo")
       data = result.rowsAffected
    }
    //await sql.close()

  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send(data)
});

module.exports = router;