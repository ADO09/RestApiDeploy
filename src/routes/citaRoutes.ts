import { Router } from "express";
import citaController from './../controllers/citaController';
class CitaRoutes {

   public router: Router = Router();


   constructor() {
      this.config();
   }


   config(): void {
      this.router.get('/', citaController.list)
         .get('/:id', citaController.getonecita)
         .get('/listCitaFisio/:id', citaController.getCitasFisios)
         .get('/countCitas/:id', citaController.getCitasCount)
         .get('/listCitaClient/:id', citaController.getCitasClients)
         .get('/listCitaFisioH/:id', citaController.getCitasFisiosH)
         .get('/listCitaClientH/:id', citaController.getCitasClientsH)
         .post('/', citaController.addcita)
         .delete('/:id', citaController.delcita)
         .put('/:id', citaController.uptdcita);
   }
   
}

const citaRoutes = new CitaRoutes();
export default citaRoutes.router;