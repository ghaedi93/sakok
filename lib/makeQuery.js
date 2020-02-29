/**
 * generates a valid query for mongoose operations based on user get queries . 
 * @module makeQuery
 */
/**
 * generates a query for mongoose
 * @param {object} req - incoming request which we use its query object
 * @param {String} filters - provided names and filters that is used to compare with request query keys add by user 
 * @returns {Object} - returns a object to be used by mongoose find method 
 */
function makeQuery(requestQuery,/*filters*/){
    /**
     * query variable 
     * @type {Object}
     */
    const generatedQuery = {};
    /**
     * number of all arguements provided to this function including request and filters 
     * @type {number}
     */
    const argumentsCount = arguments.length;
    //start processing from index 1 since index 0 is the requestQuery 
    for(i=1;i<argumentsCount;i++){
        /*every filter argument that exists inside requestQuery is
          added to our locally defined generatedQuery object  
          as a key and the value is extracted from requestQuery . 
          for exmaple if we have the function makeQuery('product','number',age')
          and the incoming request is something like http://localhost/something?product=peguet
          our function returns this object
            {
             product:'peguet' 
          }
          */
         const filter=arguments[i];
        if(requestQuery[filter]){
            generatedQuery[filter]=requestQuery[filter]
        }
    }
    return generatedQuery
}
module.exports = makeQuery