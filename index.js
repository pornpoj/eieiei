var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var token = "CAAYLBZA5g0wkBADVVtC38ZACAJI4vvruIuG8c1bE1NFcZAdl6QZBjIB00xZCoQbuUkbOVYCf6ff3brdVruZC4BHhWLcPoe5yfYIqqFmdT8sEnM53iJiSgN7dX98eQnAKWTCVDj0LxfZCZAZBpt7cQEICYBICuhEWWbnZBkhdecAOnChV9hKiw9sMsZBmnGGTdZC5JP86rVoEo2E1NQZDZD";

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use(bodyParser.json())
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'pornpoj') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

app.set('port', (process.env.PORT || 5000))

app.post('/webhook/', function (req, res) {
  var messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i];
    var sender = event.sender.id;
    if (event.message && event.message.text) {
     var text = event.message.text;
      // Handle a text message from this sender
      console.log(text);
      //sendTextMessage(sender, 'สุดหล่อ : ' + text )
    }
  }
  res.sendStatus(200);
});

function sendTextMessage(sender, text) {
  var messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.listen(app.get('port'), function () {
  console.log('Example aoo listening on port ' + app.get('port') + ' !')
})