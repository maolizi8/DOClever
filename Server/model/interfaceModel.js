/**
 * Created by sunxin on 2016/11/17.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    name:String,
    project:{
        type:mongoose.Schema.ObjectId,
        ref:"Project"
    },
    group:{
        type:mongoose.Schema.ObjectId,
        ref:"Group"
    },
    developer:{
        type:String,
        default:""
    },
    baseurl:String,
    url:String,
    remark:String,
    method:String,
    param:Array,
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    editor:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    mock:String,
    finish:{
        type:Number,
        default:0
    },
    before:Object,
    after:Object,
    id:String,
    delete:Number,
    sort:{
        type:Number,
        default:0
    }
},{
    timestamps:true,
    strict: false
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);
model.index({"updatedAt":-1,"name":1})
var dbManage=db.model("Interface",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;