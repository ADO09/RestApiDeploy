import { request, Request, Response } from "express";
import { connect } from "../database";
import { expedienteInterface } from "../interfaces/expedienteMedicoInterface";

class Expediente_medicoController {
    //expediente_medico 

    //SELECT
    public async list(req: Request, res: Response): Promise<any> {
        const conn = await connect();
        try {
            const expediente_medico = await conn.query("SELECT * FROM expediente_medico");

            return res.json(expediente_medico[0]);
        } catch (error) {
            console.log(error);
        }
    }

    //SELECT WHERE ID =
    public async getoneexpediente_medico(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const expediente_medico = await conn.query(
                
                "select c.*,p.*, f.nombre,f.apellido1,f.correo,f.telefono,f.id_fisio from fisiolines.cita c join fisiolines.plan_rehabilitacion p on c.id_plan = p.id_plan join fisioterapeuta f on f.id_fisio = c.id_fisio where c.id_cliente = ? and c.estatus in(1,2,5);",
                [id]
            );
            const response = {error:false,msg:"Cuenta actualizado",data:expediente_medico[0]};

            return res.json(response);
        } catch (error) {
            console.log(error);
            const response = {error:true,msg:"Cuenta actualizado",data:null};

            return res.status(500).json(response);
        }
    }

    //INSERT INTO
    public async addexpediente_medico(req: Request, res: Response) {
        //console.log(req.body);

        try {
            const conn = await connect();
            const expediente_medicoinf: expedienteInterface = req.body;

            console.log(expediente_medicoinf);
            const expediente_medico = await conn.query("INSERT INTO expediente_medico SET ?", [
                expediente_medicoinf,
            ]);
            return res.json({
                message: "expediente_medico Fisio Registrado",
                //expediente_medico
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    //DELETE
    public async delexpediente_medico(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const expediente_medico = await conn.query(
                "DELETE FROM expediente_medico WHERE id_expediente = ?",
                [id]
            );
            return res.json(expediente_medico[0]);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            return null;
        }
    }

    //UPDATE
    public async uptdexpediente_medico(req: Request, res: Response) {
        //     try {
        //      await pool.execute("UPDATE expediente_medico set ? WHERE id_expediente = ?",[req.body,id]);
        try {
            const id = req.params.id;
            const expediente_medicoinf: expedienteInterface = req.body;
            console.log(id);
            const conn = await connect();
            const expediente_medico = await conn.query(
                "UPDATE expediente_medico set ? WHERE id_expediente = ?",
                [expediente_medicoinf, id]
            );
            return res.json(expediente_medico[0]);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            return null;
        }
    }
}

const expediente_medicoController = new Expediente_medicoController();

export default expediente_medicoController;
