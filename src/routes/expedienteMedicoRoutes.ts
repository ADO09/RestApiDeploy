import { Router } from "express";
import expediente_medicoController from './../controllers/expedienteMedicoController';
class Expediente_medicoRoutes {

   public router: Router = Router();


   constructor() {
      this.config();
   }


   config(): void {
      this.router.get('/', expediente_medicoController.list)
         .get('/:id', expediente_medicoController.getoneexpediente_medico)
         .post('/', expediente_medicoController.addexpediente_medico)
         .delete('/:id', expediente_medicoController.delexpediente_medico)
         .put('/:id', expediente_medicoController.uptdexpediente_medico);
   }
}

const expediente_medicoRoutes = new Expediente_medicoRoutes();
export default expediente_medicoRoutes.router;