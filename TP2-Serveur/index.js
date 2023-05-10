var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express
var counter = 0;
var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"]

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

app.get('/test/*', function(req, res) {
  const obj = req.url.substr('test/'.length + 1);
  res.json({"msg": obj});
});

/*Un micro-service avec un état*/
//Définit la route "/cpt/query"
app.get('/cpt/query', function(req, res) {
  res.json({ "Counter": counter })
})

//Définit la route "/cpt/inc"
app.get('/cpt/inc', function(req, res) {
  const args = req.query.v

  //Vérifie si une valeur a été passée à incrémenter
  if (args === undefined) {
    counter++
    res.json({ "code": 0 })
  }
  else {
    //Vérifie si la valeur passée est un entier
    if (args.match(/^[+-]?[0-9]+$/)) {
      counter += parseInt(args)
      res.json({ "code": 0 })
    }
    else {
      res.json({ "code": -1 })
    }
  }
})

/*Micro-service de gestion de messages*/
//définit la route "/msg/post/*"
app.get('/msg/post/*', function(req, res) {
  const msg = unescape(req.url.substr('msg/post/'.length + 1));
  allMsgs.push(msg);
  displayMsg = "Message \'" + msg + "\' ajouté au serveur avec le numéro d'identification [" + (allMsgs.length - 1) + "]";

  res.json({ postMessage: displayMsg });
})

//définit la route "/msg/get/*"
app.get('/msg/get/*', function(req, res) {
  const index = parseInt(req.url.substr('msg/get/'.length + 1));

  if (!Number.isInteger(index) || index > (allMsgs.length - 1)) {
    res.json({ "code": 0 });
  }
  else {
    res.json({ "code": 1, "msg": allMsgs[index] });
  }
})

//définit la route "/msg/getAll"
app.get('/msg/getAll', function(req, res) {
  res.json({ "Liste de messages": allMsgs });
})

//définit la route "/msg/nber"
app.get('/msg/nber', function(req, res) {
  res.json({ "Taille de la liste": allMsgs.length });
})

/*Connection avec micro-service de gestion de messages*/

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");

