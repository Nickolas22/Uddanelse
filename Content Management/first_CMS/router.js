const url = require('url');
// const helpers = require('./helpers');

const routes = {
   '/cat': require('./endpointhandlers/cat'), //#1 Route! '/cat' er et route//

  '/dog': require('./endpointhandlers/dog'), //#2 Route! '/dog' er et route// //Denne måde er bedst hvis man har mange forskellige routes, der skal gøre forskellige ting//


};

console.log(routes['/cat']['GET']);


module.exports = function (req, res) {  //Denne funktion kommer ned i serveren//

    var pathname = url.parse(req.url).pathname;
    var action = routes[pathname];  //Pathname henter en route ("cat") - Hvis man skriver "cat" i url'en skriver den "cat" - ellers undefined//


    if (action) {
       var method = req.method;  //POST eller GET eller hvilken metode der bliver brugt ligger i denne variabel//
       var handler = action[method];

      if (handler) {        //Hvis den har en handler - kører den dette//
           handler(res);
       }
       else {
           helpers.respond(res, 'Metode ikke tilladt', 404);   //Hvis den ikke har fundet noget der matcher ovenstående metode - kører den dette//
           return;
       }
       // action(res);
       return;
   }


   // res.writeHead(404, { 'Content-type': 'application/json' });    // Hvis vi er her er der ikke fundet en route //
   // res.end('Route findes ikke');
   helpers.respond(res, 'Route findes ikke', 404);
};
