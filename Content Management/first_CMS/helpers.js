exports.respond = function(res,besked, status = 200){

       res.writeHead(200,{ 'Content-type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(besked));
}
