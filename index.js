var path = require('path')
var express = require('express')
var expressVue = require('express-vue')
var app = express();
var glob = require('glob');

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

var users = [];
var pageTitle = 'Express Vue';
users.push({ name: 'tobi', age: 12 });
users.push({ name: 'loki', age: 14  });
users.push({ name: 'jane', age: 16  });

  var controllers = glob.sync(path.normalize(__dirname) + '/controllers/**/*.js');
  console.log('kv');
  console.log(path.normalize(__dirname));
  controllers.forEach(function (controller) {

    require(controller)(app);
  });


app.listen(3001);
console.log('Express server listening on port 3001');
