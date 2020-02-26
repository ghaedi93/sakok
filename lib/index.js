exports.makeQuery=(req)=>{
    const query = {}
    const argumentsNumber = arguments.length;
    //start checking process from index 1 since index 0 is the req and containing incoming http request  
    for(i=1;i<argumentsNumber;i++){
        if(req.query[arguments[i]]){
            query[arguments[i]]=req.query[arguments[i]]
        }
    }
    return query
}