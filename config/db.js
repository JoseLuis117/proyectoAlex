import { configDotenv } from "dotenv";
import mysql from 'mysql';
configDotenv({ path: '.env' });
// const db = new Sequelize(process.env.DB_NOMBRE,process.env.DB_USUARIO,process.env.DB_PASSWORD??'',{
//     host:process.env.DB_HOST,
//     port:3306,
//     dialect:'mysql',
//     define:{
//         timestamps:true
//     },
//     pool:{
//         max:5,
//         min:0,
//         acquire:30000,
//         idle:10000
//     }
// })
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USUARIO,
    password: 'password',
    database: process.env.DB_NOMBRE,
    port: 3306
})
try {
    db.connect();
    // db.query('SELECT * from admin', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results[0].usuario);
    // });
} catch (error) {
    console.log(error);
}
export default db;