exports.makeQuery=(req)=>{
    const query = {}
    const argumentsNumber = arguments.length;
    /**
     * start processing from index 1 since index 0 is the incomming http request 
     */
    for(i=1;i<argumentsNumber;i++){
        /**
         * if a key is existed inside incomming reqest's query then that 
         * key is added to our local query object 
         */
        if(req.query[arguments[i]]){
            query[arguments[i]]=req.query[arguments[i]]
        }
    }
    return query
}