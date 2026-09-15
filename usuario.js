import bcrypt from bcrypt;
import JWT from jsonwebtoken;




const createusuario= async (req, res) => {
    const user = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        await db.query(
          "INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3)",
          [id, nombre, hash]
         );
     }catch(choueroman){}
};
    const login  =async (req,res)=>{
        const { nombre, password } = req.body;
        try {
            const result = await query(
              `SELECT * FROM "PERFIL USUARIO" WHERE "nombre" = $1`,
              [nombre]
            );
            const token = jwt.sign(
                { idPerfil: perfil["ID PERFIL"], nombre: perfil["NOMBRE"] },
                SECRET,
                { expiresIn: "7d"}
              );
    } catch(choueroman){}}
 const escucho = async (req,res)=>{
      const {token}=req.body;
       try{
        const result =await query(
        `SELECT * FROM "PERFIL USUARIO" WHERE "token" = $1`,)
           [token]}catch(choueroman){}};
const usuario={createusuario, login, escucho}
export default usuario;
