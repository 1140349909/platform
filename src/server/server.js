require('babel-register');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// const isProduction = process.env.NODE_ENV === 'production';

const app = express();

//  RESTful API
const publicPath = path.resolve(__dirname);
app.use(bodyParser.json({type: 'application/json'}));
app.use(express.static(publicPath));

// const port = isProduction ? (process.env.PORT || 80) : 3000;

// this is necessary to handle URL correctly since client uses Browser History
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '', 'index.html'));
});

app.put('/api/login', function (req, res) {
    const credentials = req.body;
    if (credentials.user === 'joe_he@linkin.mobi' && credentials.password === 'a123456') {
        res.cookie('uid', '55ebfddd7ec6136c73e21779');
        res.json({'user': credentials.user, 'role': 'ADMIN', 'uid': '55ebfddd7ec6136c73e21779'});
    } else {
        res.status('500').send({'message': 'Invalid user/password'});
    }
});

app.post('/api/menu', function (req, res) {
    res.json({
        menus: [
            {
                'key': 1,
                'name': '平台管理',
                'icon': 'home',
                'child': [
                    {'name': '客户管理', 'icon': 'team', 'key': 'customer'},
                    {'name': '平台会员', 'icon': 'user', 'key': 'member'}
                ]
            }
        ]
    });
});

app.post('/api/my', function (req, res) {
    res.json({'user': 'admin', 'role': 'ADMIN', 'uid': 1});
});

app.post('/api/logout', function (req, res) {
    res.clearCookie('uid');
    res.json({'user': 'admin', 'role': 'ADMIN'});
});

/*app.listen(port, function (err) {
   if (err) {
        console.log(err);
    }
    console.log('Server running on port ' + port);
});*/
