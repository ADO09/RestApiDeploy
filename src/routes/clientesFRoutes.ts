import { Router } from "express";
import clientesFControllers from './../controllers/clientesFController';
class ClientesFRoutes {

   public router: Router = Router();


   constructor() {
      this.config();
   }


   config(): void {
      this.router.get('/', clientesFControllers.list)
         .get('/:id', clientesFControllers.getoneClienteF)
         .get('/puntuacion/:id', clientesFControllers.getonePuntuacion)
         .post('/', clientesFControllers.addClienteF)
         .post('/noFavoritos', clientesFControllers.fisiosnotFavs)
         .post('/Favoritos', clientesFControllers.fisiosFavs)
         .delete('/:id', clientesFControllers.delClienteF)
         .put('/:id', clientesFControllers.uptdClienteF);
   }
}

const clientesfRoutes = new ClientesFRoutes();
export default clientesfRoutes.router;