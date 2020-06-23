const axios = require('axios');


module.exports = {

async execute(guildname){
    var orgname=null;
  await axios.get(process.env.FIREBASE+'servers.json')
      .then(res=>{ const data = res.data;
        for(let key in data){
            if(data[key].guildname===guildname)
               orgname=data[key].orgname;
        }    
      });

       return orgname;
}
    
}