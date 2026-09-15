import express from express;


const app =express();
const port =3000;


import usuario from usuario;


app.post("/usuario", usuario.createusuario);
app.post("/login", usuario.login);
app.put("/escucho",usuario.escucho);


app.listen(port,()=>{
    console.log("listening on http://localhost:${port}")
});
