import { Request, Response } from "express";
import { connect } from "../database";
import { clienteFinterface } from "../interfaces/ClienteFinterface";




class ClientesFController {
    //CLIENTES FISIOTERAPEUTAS

  //public const response = {error:false,msg:"AQUI ESTA EL DATO",data:general[0][0]};


//   public async getFavsF(req: Request, res: Response): Promise<any> {
//     try {
//         const id = req.params.id;
//         console.log(id);
//         const conn = await connect();
//         const clienteF = await conn.query(
//             "SELECT * FROM fisiolines.fisioterapeuta where id_fisio='' or  id_fisio = ?",
//             [id]
//         );
//         return res.json(clienteF[0][0]);
//     } catch (error) {
//         console.log(error);
//         res.status(500);
//         res.send(error);
//         return null;
//     }
// }

public async fisiosFavs(req: Request, res: Response): Promise<any> {
    const conn = await connect();
    console.log(req.body);
    var favs = JSON.stringify(req.body.favoritos);
    var favoritos; 
    if (favs == '""') {
       favoritos = '0';
    } else {
        favoritos = favs.substring(1,favs.length-2);
    }
   
    console.log(favs)
    console.log("estos son los favoritos" + favoritos);
    console.log(("SELECT * FROM fisioterapeuta where id_fisio not in ("+favoritos+")" ));
    
    try {
        
         const clienteF = await conn.query("SELECT * FROM fisioterapeuta where id_fisio in ("+favoritos+") and TipoUsuario not in ('admin')" );
       // console.log(clienteF[0])
        const response = {error:false,msg:"Lista de fisios favoritos",data:clienteF[0]};
         return res.json (response);
    } catch (error) {
        const response = {error:true,msg:"error: "+ error,data:null};
        console.log(error);
        return res.status(500).json(response);
    }

}

public async fisiosnotFavs(req: Request, res: Response): Promise<any> {
    const conn = await connect();
    console.log(req.body);
    var favs = JSON.stringify(req.body.favoritos);
    var favoritos; 
    if (favs == '""') {
       favoritos = '0';
    } else {
        favoritos = favs.substring(1,favs.length-2);
    }
   
    console.log(favs)
    console.log("estos son los favoritos" + favoritos);
    console.log(("SELECT * FROM fisioterapeuta where id_fisio not in ("+favoritos+")" ));
    
    try {
        
         const clienteF = await conn.query("SELECT * FROM fisioterapeuta where id_fisio not in ("+favoritos+") and TipoUsuario not in ('admin')" );
       // console.log(clienteF[0])
        const response = {error:false,msg:"Lista de fisios no favoritos",data:clienteF[0]};
         return res.json (response);
    } catch (error) {
        const response = {error:true,msg:"error: "+ error,data:null};
        console.log(error);
        return res.status(500).json(response);
    }

}

 
    //SELECT
    public async list(req: Request, res: Response): Promise<any> {
        const conn = await connect();
        try {
            const clienteF = await conn.query("SELECT * FROM fisioterapeuta where TipoUsuario not in ('admin')");
            // console.log(clienteF[0])
            const response = {error:false,msg:"Lista de fisios",data:clienteF[0]};
            return res.json (response);
        } catch (error) {
            const response = {error:true,msg:"error: "+ error,data:null};
            console.log(error);
            return res.status(500).json(response);
        }
    }

    public async getonePuntuacion(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const clienteF = await conn.query(
                "SELECT puntuacion FROM fisioterapeuta WHERE id_fisio = ?",
                [id]
            );
            const response = {error:false,msg:"Puntuacion:",data:clienteF[0][0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            const response = {error:true,msg:"Error: "+error,data:null};
            return res.status(500).json(response);
        }
    }

    //SELECT WHERE ID =
    public async getoneClienteF(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const clienteF = await conn.query(
                "SELECT * FROM fisioterapeuta WHERE id_fisio = ?",
                [id]
            );
            console.log(clienteF[0][0])
            const response = {error:false,msg:"DATOS DEUSUARIO",data:clienteF[0][0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            const response = {error:true,msg:"Error: "+error,data:null};
            return res.status(500).json(response);
        }
    }

    //INSERT INTO
    public async addClienteF(req: Request, res: Response) {
        //console.log(req);
        //console.log("bien");
        const http = require("http");
        const path = require("path");
        console.log(req.body)



        try {
            const fisioinf: clienteFinterface = req.body;
           

                const conn = await connect();
                 
              

                const clienteFCC = await conn.query("SELECT usuario FROM cliente");
                //console.log(clienteFC[0][0].RFC)
                for (let index = 0; index < clienteFCC[0].length; index++) {
                    console.log(clienteFCC[0][index].RFC)
                    console.log(fisioinf.usuario)
                    if (clienteFCC[0][index].usuario==fisioinf.usuario) {
                        const response = {error:true,msg:"Este usuario ya esta en uso",data:null};
                        return res.status(400).json(
                           response
                        );
                    }
                }

                const clienteFU = await conn.query("SELECT usuario FROM fisioterapeuta");
                //console.log(clienteFC[0][0].RFC)
                for (let index = 0; index < clienteFU[0].length; index++) {
                    console.log(clienteFU[0][index].usuario)
                    console.log(fisioinf.usuario)
                    if (clienteFU[0][index].usuario==fisioinf.usuario) {
                        const response = {error:true,msg:"Este usuario ya esta en uso",data:null};
                        return res.status(400).json(
                            response
                        );
                    }
                }

                const clienteFURFC = await conn.query("SELECT RFC FROM fisioterapeuta");
                //console.log(clienteFC[0][0].RFC)
                for (let index = 0; index < clienteFURFC[0].length; index++) {
                    console.log(clienteFURFC[0][index].RFC)
                    console.log(fisioinf.RFC)
                    if (clienteFURFC[0][index].usuario==fisioinf.usuario) {
                        const response = {error:true,msg:"Este RFC ya esta en uso",data:null};
                        return res.status(400).json(
                            response
                        );
                    }
                }

            


         


            if (req.files) {

                var fs = require('fs');
                var dir = './archivos/ClientesFisiosArchivos/' + fisioinf.RFC;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
    
                }

                if (req.files.fotografia) {

                    //fs.unlinkSync(clienteFC[0][0].fotografia);

                    const img: any = req.files.fotografia;
                    const extfileImg = path.extname(img.name);
                    
                    await img.mv("./archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Imagen" + extfileImg);
                    fisioinf.fotografia = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Imagen" + extfileImg;
                    
                }
                else{
                    return res.status(400).json({
                        message: "No se ingreso Los archivos necesarios",
                    });
                }

                if (req.files.cedula) {
                   // fs.unlinkSync(clienteFC[0][0].cedula);
                    const ced: any = req.files.cedula;
                    const extfileCed = path.extname(ced.name);
                    await ced.mv("./archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Cedula" + extfileCed);
                    fisioinf.cedula = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Cedula" + extfileCed;
                   
                }
                else{
                    return res.status(400).json({
                        message: "No se ingreso Los archivos necesarios",
                    });
                }
                            
                if (req.files.titulo) {
                  //  fs.unlinkSync(clienteFC[0][0].titulo);
                    const titulo: any = req.files.titulo;
                    const extfileTitulo = path.extname(titulo.name);
                    await titulo.mv("./archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Titulo" + extfileTitulo);
                    fisioinf.titulo = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Titulo"+ extfileTitulo;
                    
                }
                else{
                    return res.status(400).json({
                        message: "No se ingreso Los archivos necesarios",
                    });
                }
                    
                if (req.files.certificados) {
                  //  fs.unlinkSync(clienteFC[0][0].certificados);
                    const certificados: any = req.files.certificados;
                    const extfileCertificado = path.extname(certificados.name);
                    await certificados.mv("./archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Certificados" + extfileCertificado);
                    fisioinf.certificados = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Certificados" + extfileCertificado;
                   
                }
                else{
                    return res.status(400).json({
                        message: "No se ingreso Los archivos necesarios",
                    });
                }
                    
                if (req.files.especialidades) {
                  //  fs.unlinkSync(clienteFC[0][0].especialidades);
                    const especialidades: any = req.files.especialidades;
                    const extfileEspec = path.extname(especialidades.name);
                    await especialidades.mv("./archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Especialidades" + extfileEspec);
                    fisioinf.especialidades = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Especialidades" + extfileEspec;
                    
                }
                else{
                    return res.status(400).json({
                        message: "No se ingreso Los archivos necesarios",
                    });
                }
                    
                if (req.files.evidencia) {   
                  //  fs.unlinkSync( clienteFC[0][0].evidencia); 
                    const años_exp_ev: any = req.files.evidencia;
                    const extfileAñosExp = path.extname(años_exp_ev.name);
                    await años_exp_ev.mv("./archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Años_experiencia" + extfileAñosExp);
                    fisioinf.evidencia = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Años_experiencia" + extfileAñosExp;
                    
                }
                else{
                    return res.status(400).json({
                        error:true,
                        msg: "No se ingreso Los archivos necesarios",
                        data:null
                    });
                }


            }else{
               
                    // return res.status(400).json({
                    //     message: "No se ingreso Los archivos necesarios",
                    // });
                
            }
           


                  console.log(fisioinf);
                const clienteF = await conn.query("INSERT INTO fisioterapeuta SET ?", [
                     fisioinf,
                 ]);

                 const response = {error:false,msg:"Cuenta actualizado",data:clienteF[0]};
                return res.status(200).json(
                     response);

        } catch (error) {
                 console.log(error);
                 const response = {error:true,msg:"Cuenta actualizado",data:null};
                return res.status(500).json(response);
        }
    }

    //DELETE
    public async delClienteF(req: Request, res: Response) {
        
        var rimraf = require("rimraf");
        try {
            
            const id = req.params.id;
            console.log(id);
           
            const conn = await connect();
            const clienteFC = await conn.query("SELECT * FROM fisioterapeuta WHERE id_fisio = ?",
            [id]);
            rimraf("archivos/ClientesFisiosArchivos/"+ clienteFC[0][0].RFC, function () { console.log("done"); });
            
            const clienteF = await conn.query(
                "DELETE FROM fisioterapeuta WHERE id_fisio = ?",
                [id]
            );

            
            const response = {error:false,msg:"Cuenta actualizado",data:clienteF[0]};
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            const response = {error:true,msg:"Error servidor " + error,data:null};
            return res.status(500).json(response);
        }
    }


    



    //UPDATE
    public async uptdClienteF(req: Request, res: Response) {

        const http = require("http");
        const path = require("path");
        var fs =  require("fs");
        const id = req.params.id;
        try {

            const conn = await connect();
            const fisioinf: clienteFinterface = req.body;
            const clienteFCC = await conn.query("SELECT usuario FROM cliente");
            //console.log(clienteFC[0][0].RFC)
            for (let index = 0; index < clienteFCC[0].length; index++) {
                // console.log(clienteFCC[0][index].RFC)
                // console.log(fisioinf.usuario)
                if (clienteFCC[0][index].usuario==fisioinf.usuario) {
                    const response = {error:true,msg:"Este usuario ya esta en uso",data:null};
                    return res.json(
                       response
                    );
                }
            }

            const clienteFU = await conn.query("SELECT usuario FROM fisioterapeuta  where id_fisio not in (" +id+")");
            //console.log(clienteFC[0][0].RFC)
            for (let index = 0; index < clienteFU[0].length; index++) {
                // console.log(clienteFU[0][index].usuario)
                // console.log(fisioinf.usuario)
                if (clienteFU[0][index].usuario==fisioinf.usuario) {
                    const response = {error:true,msg:"Este usuario ya esta en uso",data:null};
                    return res.json(
                        response
                    );
                }
            }

            const clienteFURFC = await conn.query("SELECT RFC FROM fisioterapeuta where id_fisio not in ("+id+")" );
            //console.log(clienteFC[0][0].RFC)
            for (let index = 0; index < clienteFURFC[0].length; index++) {
                // console.log(clienteFURFC[0][index].RFC)
                // console.log(fisioinf.RFC)
                if (clienteFURFC[0][index].RFC==fisioinf.RFC) {
                    const response = {error:true,msg:"Este RFC ya esta en uso",data:null};
                    return res.json(
                        response
                    );
                }
            }


            
            
            
            console.log(id);
            

           

             const clienteFC = await conn.query("SELECT * FROM fisioterapeuta WHERE id_fisio = ?",
                 [id]);
           
            if (req.files) {
                

                var fs = require('fs');
                var dir = './archivos/ClientesFisiosArchivos/' + fisioinf.RFC;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
    
                }
                
                if (req.files.fotografia) {

                    //fs.unlinkSync(clienteFC[0][0].fotografia);

                    const img: any = req.files.fotografia;
                    const extfileImg = path.extname(img.name);
                    
                    await img.mv("archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Imagen" + extfileImg);
                    fisioinf.fotografia = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Imagen" + extfileImg;
                    
                }
                else{
                    fisioinf.fotografia =  clienteFC[0][0].fotografia;
                }

                if (req.files.cedula) {
                   // fs.unlinkSync(clienteFC[0][0].cedula);
                    const ced: any = req.files.cedula;
                    const extfileCed = path.extname(ced.name);
                    await ced.mv("archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Cedula" + extfileCed);
                    fisioinf.cedula = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Cedula" + extfileCed;
                   
                }
                else{
                    fisioinf.cedula =  clienteFC[0][0].cedula;
                }
                            
                if (req.files.titulo) {
                  //  fs.unlinkSync(clienteFC[0][0].titulo);
                    const titulo: any = req.files.titulo;
                    const extfileTitulo = path.extname(titulo.name);
                    await titulo.mv("archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Titulo" + extfileTitulo);
                    fisioinf.titulo = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Titulo"+ extfileTitulo;
                    
                }
                else{
                    fisioinf.titulo =  clienteFC[0][0].titulo;
                }
                    
                if (req.files.certificados) {
                  //  fs.unlinkSync(clienteFC[0][0].certificados);
                    const certificados: any = req.files.certificados;
                    const extfileCertificado = path.extname(certificados.name);
                    await certificados.mv("archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Certificados" + extfileCertificado);
                    fisioinf.certificados = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Certificados" + extfileCertificado;
                   
                }
                else{
                    fisioinf.certificados =   clienteFC[0][0].certificados;
                }
                    
                if (req.files.especialidades) {
                  //  fs.unlinkSync(clienteFC[0][0].especialidades);
                    const especialidades: any = req.files.especialidades;
                    const extfileEspec = path.extname(especialidades.name);
                    await especialidades.mv("archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Especialidades" + extfileEspec);
                    fisioinf.especialidades = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Especialidades" + extfileEspec;
                    
                }
                else{
                    fisioinf.especialidades =  clienteFC[0][0].especialidades;
                }
                    
                if (req.files.evidencia) {   
                  //  fs.unlinkSync( clienteFC[0][0].evidencia); 
                    const años_exp_ev: any = req.files.evidencia;
                    const extfileAñosExp = path.extname(años_exp_ev.name);
                    await años_exp_ev.mv("archivos/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Años_experiencia" + extfileAñosExp);
                    fisioinf.evidencia = "/ClientesFisiosArchivos/" + fisioinf.RFC + "/" + "Años_experiencia" + extfileAñosExp;
                    
                }
                else{
                    fisioinf.evidencia =  clienteFC[0][0].evidencia;
                }
                // const img = "pepe" + extfile;
                // const data = {IMG: img}
                //console.log(req.files)
            }
            else{
                fisioinf.fotografia =  clienteFC[0][0].fotografia;
                fisioinf.cedula =  clienteFC[0][0].cedula;
                fisioinf.titulo =  clienteFC[0][0].titulo;
                fisioinf.certificados =   clienteFC[0][0].certificados;
                fisioinf.especialidades =  clienteFC[0][0].especialidades;
                fisioinf.evidencia =  clienteFC[0][0].evidencia;       
            }              


            const clienteF = await conn.query(
                "UPDATE fisioterapeuta set ? WHERE id_fisio = ?",
                [fisioinf, id]
            );
            console.log(clienteF);
            

            const clienteFRESP = await conn.query(
                "SELECT id_fisio,usuario,contrasena,TipoUsuario,correo,nombre,fotografia,TemaPagina FROM fisioterapeuta WHERE id_fisio = ?",
                [id]
            );
           // console.log(clienteFRESP[0][0])
         
            
            const response = {error:false,msg:"Cuenta actualizado",data:clienteFRESP[0][0]};
             res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            const response = {error:true,msg:error,data:null};

             res.status(500).json(response);
        }
    }
}

const clientefController = new ClientesFController();

export default clientefController;
