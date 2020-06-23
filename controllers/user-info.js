const axios = require('axios');


module.exports = {

async execute(id){
    var username=null;
  await axios.get(process.env.FIREBASE+'users.json')
      .then(res=>{ const data = res.data;
        for(let key in data){
            if(data[key].userid===id)
               username=data[key].gitusername;
        }    
      });

       return username;
}
    
}