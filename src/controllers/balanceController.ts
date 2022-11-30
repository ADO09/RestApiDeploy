import { request, Request, Response } from "express";
import { connect } from "../database";
import { balanceInterface } from "../interfaces/balanceInterface";

class BalanceController {
    //balance 

    //SELECT
    public async list(req: Request, res: Response): Promise<any> {
        const conn = await connect();
        try {
            const balance = await conn.query("SELECT * FROM balance");
            return res.json(balance[0]);
        } catch (error) {
            console.log(error);
        }
    }

    //SELECT WHERE ID =
    public async getonebalance(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const balance = await conn.query(
                
                "SELECT * FROM balance WHERE id_balance = ?",
                [id]
            );
            return res.json(balance[0]);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            return null;
        }
    }

    //INSERT INTO
    public async addbalance(req: Request, res: Response) {
        //console.log(req.body);

        try {
            const conn = await connect();
            const balanceinf: balanceInterface = req.body;

            console.log(balanceinf);
            const balance = await conn.query("INSERT INTO balance SET ?", [
                balanceinf,
            ]);
            return res.json({
                message: "balance Fisio Registrado",
                //balance
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    //DELETE
    public async delbalance(req: Request, res: Response) {
        try {
            const id = req.params.id;
            console.log(id);
            const conn = await connect();
            const balance = await conn.query(
                "DELETE FROM balance WHERE id_balance = ?",
                [id]
            );
            return res.json(balance[0]);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            return null;
        }
    }

    //UPDATE
    public async uptdbalance(req: Request, res: Response) {
        //     try {
        //      await pool.execute("UPDATE balance set ? WHERE id_balance = ?",[req.body,id]);
        try {
            const id = req.params.id;
            const balanceinf: balanceInterface = req.body;
            console.log(id);
            const conn = await connect();
            const balance = await conn.query(
                "UPDATE balance set ? WHERE id_balance = ?",
                [balanceinf, id]
            );
            return res.json(balance[0]);
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send(error);
            return null;
        }
    }
}

const balanceController = new BalanceController();

export default balanceController;
