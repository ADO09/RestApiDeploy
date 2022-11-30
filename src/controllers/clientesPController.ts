import { request, Request, Response } from "express";
import { connect } from "../database";
import { clientePinterface } from "../interfaces/ClientePinterface";

class ClientesPController {
    //CLIENTES FISIOTERAPEUTAS

   // const response = {error:false,msg:"AQUI ESTA EL DATO",data:general[0][0]};
    //SELECT
    public async list(req: Request, res: Response): Promise<any> {
        const conn = await connect();
        try {
            const clienteP = await conn.query("SELECT * FROM cliente");

            const response = {error:false,msg:"CLIENTES",data:clienteP[0]};
                       

            return res.json(response);
        } catch (error) {
            const response = {error:true,msg:"ERROR" + error,data:null};

            console.log(response);
        }
    }

    //SELECT WHERE ID =
    public async getoneclienteP(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const clienteP = await conn.query(
                
                "SELECT * FROM cliente WHERE id_Cliente = ?",
                [id]
            );
            
            return res.json(clienteP[0][0]);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            return null;
        }
    }

    //INSERT INTO
    public async addclienteP(req: Request, res: Response) {
        //console.log(req.body);
        const path = require("path");
        console.log(req.body);
        try {
            const conn = await connect();
            const clienteinF: clientePinterface = req.body;
   
                const clienteFU = await conn.query("SELECT usuario FROM fisioterapeuta");
      
                for (let index = 0; index < clienteFU[0].length; index++) {
 
                    if (clienteFU[0][index].usuario==clienteinF.usuario) {
                        const response = {error:true,msg:"ESTE USUARIO YA ESTA LIGADO A UNA CUENTA"};
                        return res.status(410).json(
                           response
                        );
                    }
                }

                const clientePUC = await conn.query("SELECT curp FROM cliente");
                for (let index = 0; index < clientePUC[0].length; index++) {
                    if (clientePUC[0][index].curp==clienteinF.curp) {
                        const response = {error:true,msg:"ESTE CURP YA ESTA LIGADO A UNA CUENTA"};
                        return res.json(
                            response
                        );
                    }
                }

            

          
            const clientePU = await conn.query("SELECT usuario FROM cliente");
            for (let index = 0; index < clientePU[0].length; index++) {
                if (clientePU[0][index].usuario==clienteinF.usuario) {
                    const response = {error:true,msg:"ESTE USUARIO YA ESTA LIGADO A UNA CUENTA"};
                    return res.status(410).json(
                        response
                    );
                }
            }

            if (req.files) {
                //console.log(req.files);
               // console.log("Si LLEGOSOIDHDAISD");
                var fs = require('fs');
                var dir = './archivos/ClientesPacientesArchivos/'+clienteinF.curp;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                const img: any = req.files.fotografia;
                const extfileImg = path.extname(img.name);
                
                await img.mv("./archivos/ClientesPacientesArchivos/" + clienteinF.curp + "/" + "Imagen" + extfileImg);
                clienteinF.fotografia = "/ClientesPacientesArchivos/" + clienteinF.curp + "/" + "Imagen" + extfileImg;
                
            }


            
         
            
            console.log(clienteinF);
            const clienteP = await conn.query("INSERT INTO cliente SET ?", [
                clienteinF,
            ]);
            const response = {error:false,msg:"SE AGREGO EL CLIENTE"};
            return res.json(response);
        } catch (error) {
            const response = {error:true,msg:"ERROR"};
            console.log(error);
            return res.status(500).json(response);
        }
    }

    //DELETE
    public async delclienteP(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const clienteP = await conn.query(
                "DELETE FROM cliente WHERE idCliente = ?",
                [id]
            );
            return res.json(clienteP[0]);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            return null;
        }
    }

    //UPDATE
    public async uptdclienteP(req: Request, res: Response) {
        //     try {
        //      await pool.execute("UPDATE clientes set ? WHERE idCliente = ?",[req.body,id]);

      
       
        try {
            const id = req.params.id;
            const clienteinF: clientePinterface = req.body;
            console.log(id);
            const conn = await connect();

            const clienteFU = await conn.query("SELECT usuario FROM fisioterapeuta");
      
            for (let index = 0; index < clienteFU[0].length; index++) {

                if (clienteFU[0][index].usuario==clienteinF.usuario) {
                    const response = {error:true,msg:"ESTE USUARIO YA ESTA LIGADO A UNA CUENTA"};
                    return res.json(
                       response
                    );
                }
            }


            const clientePUC = await conn.query("SELECT curp FROM cliente  where id_cliente not in ("+id+")");
            for (let index = 0; index < clientePUC[0].length; index++) {
                if (clientePUC[0][index].curp==clienteinF.curp) {
                    const response = {error:true,msg:"ESTE CURP YA ESTA LIGADO A UNA CUENTA"};
                    return res.json(
                        response
                    );
                }
            }

        

      
        const clientePU = await conn.query("SELECT usuario FROM cliente  where id_cliente not in ("+id+")");
        for (let index = 0; index < clientePU[0].length; index++) {
            if (clientePU[0][index].usuario==clienteinF.usuario) {
                const response = {error:true,msg:"ESTE USUARIO YA ESTA LIGADO A UNA CUENTA"};
                return res.json(
                    response
                );
            }
        }



            const http = require("http");
            const path = require("path");
    
    
            const clientePC = await conn.query("SELECT * FROM fisioterapeuta WHERE id_fisio = ?",
            [id]);
            if (req.files) {
                if (req.files.fotografia) {
    
                    var fs = require('fs');
                    var dir = './archivos/ClientesPacientesArchivos/'+clienteinF.curp;
                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir);
                    }
                 
                    console.log('aoisjoaisjd');
                    const img: any = req.files.fotografia;
                    const extfileImg = path.extname(img.name);
                    
                    await img.mv("archivos/ClientesPacientesArchivos/" + clienteinF.curp + "/" + "Imagen" + extfileImg);
                    clienteinF.fotografia = "/ClientesPacientesArchivos/" + clienteinF.curp + "/" + "Imagen" + extfileImg;
                    
                } else{
                    clienteinF.fotografia =  clientePC[0][0].fotografia;
                }
            }

            console.log(clienteinF.fotografia);
            const clienteP = await conn.query(
                "UPDATE cliente set ? WHERE id_Cliente = ?",
                [clienteinF, id]
            );

            console.log(clienteP);
                console.log('ajshdihadlkasjdkl');
                

            const clienteCRESP = await conn.query(
                "SELECT id_cliente,usuario,contrasena,TipoUsuario,correo,nombre,fotografia,TemaPagina,favoritos FROM cliente WHERE id_cliente = ?",
                [id]
            );
            //console.log(clienteCRESP[0][0])

            const response = {error:false,msg:"Se actualizo bueno",data:clienteCRESP[0][0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            const response = {error:true,msg:"ERROR: " + error,data:null};
            return res.status(500).json(response);
        }
    }

}







const clientepController = new ClientesPController();

export default clientepController;
