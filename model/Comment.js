var mongoose = require("mongoose")
var Schema = mongoose.Schema ;
var ObjectId = Schema.Types.ObjectId ;

var commentSchema = new Schema({
    content : {type : String, require : true},
    articleId : { type : ObjectId , require : true , ref : "Article"}
},{timestamps: true});

module.exports = mongoose.model('Comment', commentSchema);