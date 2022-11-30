import { Router } from "express";
import clientesPControllers from './../controllers/clientesPController';
class ClientesPRoutes {

   public router: Router = Router();


   constructor() {
      this.config();
   }


   config(): void {
      this.router.get('/', clientesPControllers.list)
         .get('/:id', clientesPControllers.getoneclienteP)
         .post('/', clientesPControllers.addclienteP)
         .delete('/:id', clientesPControllers.delclienteP)
         .put('/:id', clientesPControllers.uptdclienteP)
         
   }
}

const clientespRoutes = new ClientesPRoutes();
export default clientespRoutes.router;