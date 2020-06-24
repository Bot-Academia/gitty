const axios = require('axios');
require('dotenv').config();

module.exports = {

      async execute(id,username){

      await  axios.post(process.env.FIREBASE+'users.json',{userid:id,
        gitusername:username
        })
        .then(res=>console.log(res.data))
        .catch(error=>console.log(error));}
   


}