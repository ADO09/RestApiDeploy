import { Router } from "express";
import { mailerController } from "../controllers/mailerControllers";
class MailerRoutes{

   public router:Router = Router();


   constructor (){
        this.config();
   }


   config():void{
    this.router.get('/', mailerController.MAIL1)
                .post('/mssge',mailerController.mssgFisioCliente)
                 .post('/citAcptFis',mailerController.mssgcitAcptFis) 
                 .post('/citAcptClit',mailerController.mssgcitAcptClit)
                  .post('/baneoCuenta',mailerController.mssBaneoCuenta)  
   }
}

const mailerRoutes = new MailerRoutes();
export default mailerRoutes.router;