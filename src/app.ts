import express,{Application} from 'express';
import indexRoutes from './routes/indexroutes';
import clientesFRoutes from './routes/clientesFRoutes';
import morgan from 'morgan';
import cors from 'cors';
import clientesPRoutes from './routes/clientesPRoutes' ;
import generalRoutes  from './routes/generalRoutes'
import citaRoutes from './routes/citaRoutes';
import expedienteMedicoRoutes from './routes/expedienteMedicoRoutes';
import plan_rehabilitacionRoutes from './routes/plan_rehabilitacionRoutes';
import balanceRoutes from './routes/balanceRoutes';
import fileUpload from 'express-fileupload';
import mailerRoutes from './routes/mailerRoutes';

export class App {

    public path = require('path');
    private app!: Application;
   

    constructor(){  
       
        //const fileUpload = require ("express-fileupload");
        this.app= express();
        this.config();
        this.middleware();
        this.routes();
       
    }


    config():void{
        
        this.app.set('port',process.env.PORTSERV || 3000);
       
        this.app.use(cors());
    
    }

    middleware():void{
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(fileUpload());
        this.app.use(express.static(this.path.resolve(__dirname, '../archivos')));
        
    }

    routes():void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/clientesF',clientesFRoutes);
        this.app.use('/api/clientesP',clientesPRoutes);
        this.app.use('/api/inisesion',generalRoutes);
        this.app.use('/api/cita',citaRoutes);
        this.app.use('/api/balance',balanceRoutes);
        this.app.use('/api/expedienteMedico',expedienteMedicoRoutes);
        this.app.use('/api/planRehabilitacion',plan_rehabilitacionRoutes);
        this.app.use('/api/generalRoutes',generalRoutes);
        this.app.use('/api/mailer',mailerRoutes);
    }

    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log("Server on port ",this.app.get('port'));
        });

        
    }

}