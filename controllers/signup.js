const axios = require('axios');


module.exports = {

      async execute(guildname,org){

      await  axios.post(process.env.FIREBASE+'servers.json',{guildname:guildname,
        orgname:org
        })
        .then(res=>console.log(res.data))
        .catch(error=>console.log(error));}
   


}