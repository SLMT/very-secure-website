
window.onload = function () {
  axios.get('/api/posts')
    .then(function (response) {
      messages = response.data;

      html = '';
      for (i = 0; i < messages.length; i++) {
        id = messages[i].id;
        title = messages[i].title;
        html += '<tr><td><a href="#" onclick="loadMessage(' + id + ')">' + title + '</a></td></tr>';
      }

      document.getElementById('message-data').innerHTML = html;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function loadMessage(id) {
  axios.get('/api/posts?id=' + id)
    .then(function (response) {
      messages = response.data;

      document.getElementById('message-title').innerHTML = messages[0].title;
      document.getElementById('message-text').innerHTML = messages[0].message;
      document.getElementById('message').classList.remove('invisible');
    })
    .catch(function (error) {
      console.log(error);
    });
}

function login() {
  us = document.getElementById('login-username').value;
  pw = document.getElementById('login-password').value;

  axios.post('/api/login', {
    username: us,
    password: pw
  })
    .then(function (response) {
      user = response.data;
      logAlert = document.getElementById('login-alert');
      logAlert.classList.remove('alert-danger');
      logAlert.classList.add('alert-success');

      if (user[0].username == 'admin') {
        logAlert.innerHTML = '<div style="text-align: center;"><h2>How Did You Know THIS !??</h2>' +
            '<img src="http://www.petful.com/wp-content/uploads/2012/06/why-is-cat-scared-rain-thunder.png"></div>';
      } else {
        logAlert.innerHTML = 'Welcome !! ' + user[0].name;
      }

      logAlert.classList.remove('invisible');
    })
    .catch(function (error) {
      logAlert = document.getElementById('login-alert');
      logAlert.classList.remove('alert-success');
      logAlert.classList.add('alert-danger');
      logAlert.innerHTML = 'Wrong username or password';
      logAlert.classList.remove('invisible');
    });
}
