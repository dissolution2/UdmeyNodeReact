// keys figure otu what set of credentials to return
//node.env 
if(process.env.NODE_ENV == 'production'){
    // production
    module.exports = require('./prod');
}else{
    // testing inv
    module.exports = require('./dev');
}