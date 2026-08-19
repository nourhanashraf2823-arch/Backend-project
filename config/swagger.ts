import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = { 
    definition : {
        openapi : "3.0.0",
        info : {
            title : "Train station API",
            version : "1.0.0",
            describtion:"A simple Express Train Station API"
        },
        servers :[{
            url :"http://localhost:3000"
        }]
    },
    apis : ["./src/**/*.ts"]
    }
    export const specs =swaggerJsdoc(options)
   