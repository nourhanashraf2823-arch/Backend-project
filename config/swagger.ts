import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = { 
    definition : {
        openapi : "3.0.0",
        info : {
            title : "Gym /fitness class booking API",
            version : "1.0.0",
            describtion:"Gym booking system API"
        },
        servers :[{
            url :"http://localhost:3000"
        }]
    },
    apis : ["./routes/*.ts"]
    }
    export const specs =swaggerJsdoc(options)
   