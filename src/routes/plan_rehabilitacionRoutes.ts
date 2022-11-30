import { Router } from "express";
import plan_rehabilitacionController from './../controllers/plan_rehabilitacionController';
class Plan_rehabilitacionRoutes {

   public router: Router = Router();


   constructor() {
      this.config();
   }


   config(): void {
      this.router.get('/', plan_rehabilitacionController.list)
         .get('/:id', plan_rehabilitacionController.getoneplan_rehabilitacion)
         .get('/planFisio/:id', plan_rehabilitacionController.getPlanOneFisio)
         .post('/', plan_rehabilitacionController.addplan_rehabilitacion)
         .delete('/:id', plan_rehabilitacionController.delplan_rehabilitacion)
         .put('/:id', plan_rehabilitacionController.uptdplan_rehabilitacion);
   }
}

const plan_rehabilitacionRoutes = new Plan_rehabilitacionRoutes();
export default plan_rehabilitacionRoutes.router;