import { request, Request, Response } from "express";
import { connect } from "../database";
import { plan_rehabilitacionInterface } from "../interfaces/plan_rehabilitacionInterface";

class Plan_rehabilitacionController {
    //plan_rehabilitacion 

    //SELECT
    public async list(req: Request, res: Response): Promise<any> {
        const conn = await connect();
        try {
            const plan_rehabilitacion = await conn.query("SELECT * FROM plan_rehabilitacion");
            const response = {error:false,msg:"PLANES COMPLETOS",data:plan_rehabilitacion[0]};
            return res.json(response);
        } catch (error) {
            const response = {error:true,msg:"ERROR",data:null};
           
            console.log(error);
            return res.status(500).json(response);
        }
    }

    //SELECT WHERE ID =
    public async getoneplan_rehabilitacion(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const plan_rehabilitacion = await conn.query(
                
                "SELECT * FROM plan_rehabilitacion WHERE id_plan = ?",
                [id]
            );

            const response = {error:false,msg:"PLAN",data:plan_rehabilitacion[0][0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            const response = {error:true,msg:"ERROR",data:null};
           
            return res.status(500).json(response);
        }
    }

    //INSERT INTO
    public async addplan_rehabilitacion(req: Request, res: Response) {
        //console.log(req.body);

        try {
            const conn = await connect();
            const plan_rehabilitacioninf: plan_rehabilitacionInterface = req.body;

            console.log(plan_rehabilitacioninf);
            const plan_rehabilitacion = await conn.query("INSERT INTO plan_rehabilitacion SET ?", [
                plan_rehabilitacioninf,
            ]);

            const response = {error:false,msg:"PLAN AÑADIDO",data:plan_rehabilitacion[0]};
           
            return res.json(response);
        } catch (error) {
            console.log(error);
            const response = {error:true,msg:"ERROR",data:null};
           
            return res.status(500).json(response);
        }
    }

    //DELETE
    public async delplan_rehabilitacion(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const plan_rehabilitacion = await conn.query(
                "DELETE FROM plan_rehabilitacion WHERE id_plan = ?",
                [id]
            );

            const response = {error:false,msg:"ELIMINADO",data:plan_rehabilitacion[0]};
           
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            const response = {error:true,msg:"ERROR",data:null};
           
            return res.status(500).json(response);
        }
    }

    //UPDATE
    public async uptdplan_rehabilitacion(req: Request, res: Response) {
        //     try {
        //      await pool.execute("UPDATE plan_rehabilitacion set ? WHERE id_plan = ?",[req.body,id]);
        try {
            const id = req.params.id;
            const plan_rehabilitacioninf: plan_rehabilitacionInterface = req.body;
            console.log(id);
            const conn = await connect();
            const plan_rehabilitacion = await conn.query(
                "UPDATE plan_rehabilitacion set ? WHERE id_plan = ?",
                [plan_rehabilitacioninf, id]
            );
            const response = {error:false,msg:"PLAN ACTUALIZADO",data:plan_rehabilitacion[0]};
           
            return res.json(response);
        } catch (error) {
            console.log(error);
            const response = {error:true,msg:"ERROR",data:null};
           
            return res.status(500).json(response);
        }
    }

    public async getPlanOneFisio(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const plan_rehabilitacion = await conn.query(
                
                "SELECT * FROM plan_rehabilitacion WHERE id_fisio = ? and estatus = '1'",
                [id]
            );

            const response = {error:false,msg:"PLAN",data:plan_rehabilitacion[0]};
            return res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            const response = {error:true,msg:"ERROR",data:null};
           
            return res.status(500).json(response);
        }
    }
}

const plan_rehabilitacionController = new Plan_rehabilitacionController();

export default plan_rehabilitacionController;
