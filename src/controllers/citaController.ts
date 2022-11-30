import { request, Request, Response } from "express";
import { connect } from "../database";
import { citaInterface } from "../interfaces/citaInterface";

class CitaController {
    //CITA 

    //SELECT
    public async list(req: Request, res: Response): Promise<any> {
        const conn = await connect();
        try {
            const cita = await conn.query("SELECT * FROM cita");

            return res.json(cita[0]);
        } catch (error) {
            console.log(error);
        }
    }

    public async getCitasFisios(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const cita = await conn.query(
                
                "select c.*, p.nombre, p.apellido1, p.apellido2, p.curp,p.correo from cita c join  cliente p on c.id_cliente = p.id_cliente  where id_fisio = ? and estatus = '1'" ,
                [id]
            );

            const response = {error:false,msg:"CITAS DEL FISIO",data:cita[0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);

            const response = {error:true,msg:"ERROR SERVIDOR",data:null};
            return res.status(500).json(response);
        }
    }

    public async getCitasFisiosH(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const cita = await conn.query(
                
                "select c.*, p.nombre, p.apellido1, p.apellido2, p.curp, p.correo from cita c join  cliente p on c.id_cliente = p.id_cliente  where id_fisio = ? and estatus in ('1','2','3')  " ,
                [id]
            );

            const response = {error:false,msg:"CITAS DEL FISIO",data:cita[0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);

            const response = {error:true,msg:"ERROR SERVIDOR",data:null};
            return res.status(500).json(response);
        }
    }
    

    public async getCitasClients(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const cita = await conn.query(
                
                "select c.*, f.nombre, f.apellido1, f.apellido2, f.RFC, f.correo from cita c join  fisioterapeuta f on c.id_fisio = f.id_fisio  where id_cliente = ? and estatus = '1'" ,
                [id]
            );

            const response = {error:false,msg:"CITAS DEL FISIO",data:cita[0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);

            const response = {error:true,msg:"ERROR SERVIDOR",data:null};
            return res.status(500).json(response);
        }
    }

    public async getCitasClientsH(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const cita = await conn.query(
                
                "select c.*, f.nombre, f.apellido1, f.apellido2, f.RFC, f.correo from cita c join  fisioterapeuta f on c.id_fisio = f.id_fisio  where id_cliente = ? and estatus in ('1','2','3','4') " ,
                [id]
            );

            const response = {error:false,msg:"CITAS DEL FISIO",data:cita[0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);

            const response = {error:true,msg:"ERROR SERVIDOR",data:null};
            return res.status(500).json(response);
        }
    }

    //SELECT WHERE ID =
    public async getonecita(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const cita = await conn.query(
                
                "SELECT * FROM cita WHERE id_cita = ?",
                [id]
            );
            return res.json(cita[0]);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            return null;
        }
    }

    //INSERT INTO
    public async addcita(req: Request, res: Response) {
        //console.log(req.body);

        try {
            const conn = await connect();
            const citainf: citaInterface = req.body;

            console.log(citainf);
            const cita = await conn.query("INSERT INTO cita SET ?", [
                citainf,
            ]);

            const response = {error:false,msg:"Cita registrada",data:cita[0]};
            return res.json( response);
        } catch (error) {
            const response = {error:true,msg:"ERROR" + error,data:null};
            console.log(error);
            return res.status(500).json(response);
        }
    }

    //DELETE
    public async delcita(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const cita = await conn.query(
                "DELETE FROM cita WHERE id_cita = ?",
                [id]
            );
            const response = {error:false,msg:"CITA ELIMINADA",data:cita[0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            const response = {error:false,msg:"CITA ELIMINADA",data:null};
            return res.status(500).json(response);
        }
    }

    //UPDATE
    public async uptdcita(req: Request, res: Response) {
        //     try {
        //      await pool.execute("UPDATE cita set ? WHERE id_cita = ?",[req.body,id]);
        try {
            const id = req.params.id;
            const citainf: citaInterface = req.body;
            console.log(id);
            const conn = await connect();
            const cita = await conn.query(
                "UPDATE cita set ? WHERE id_cita = ?",
                [citainf, id]
            );
            const response = {error:false,msg:"CITA ACTUALIZADA",data:cita[0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            const response = {error:true,msg:error,data:null};
            return response;
        }
    }

    public async getCitasCount(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const cita = await conn.query(
                
                "select COUNT(id_cita) from cita where id_fisio = ? and estatus in (3)" ,
                [id]
            );

            const response = {error:false,msg:"CITAS DEL FISIO",data:cita[0][0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);

            const response = {error:true,msg:"ERROR SERVIDOR",data:null};
            return res.status(500).json(response);
        }
    }
}

const citaController = new CitaController();

export default citaController;
