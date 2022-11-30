import { Router } from "express";
import balanceController from './../controllers/balanceController';
class BalanceRoutes {

   public router: Router = Router();


   constructor() {
      this.config();
   }


   config(): void {
      this.router.get('/', balanceController.list)
         .get('/:id', balanceController.getonebalance)
         .post('/', balanceController.addbalance)
         .delete('/:id', balanceController.delbalance)
         .put('/:id', balanceController.uptdbalance);
   }
}

const balanceRoutes = new BalanceRoutes();
export default balanceRoutes.router;