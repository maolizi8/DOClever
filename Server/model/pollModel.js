/**
 * Created by sunxin on 2017/7/5.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    name:String,
    
    users:{
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }],
        default:[]
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    
    date:{
        type:[Number],
        default:[]
    },
    time:{
        type:[Number],
        default:[]
    },// for hour
    time2:{
        type:[Number],
        default:[]
    },//gql add for half of hour
    cronStyle:{
        type:String,
        default:""
    },

    enabled:{
        type:Number,
        default:1
    },//gql add
    sendMail:{
        type:Number,
        default:1
    },//gql add

    testProject:{
        type:mongoose.Schema.ObjectId,
        ref:"TestProject"
    }, //gql modify project>testProject
    testCollection:{
        type:mongoose.Schema.ObjectId,
        ref:"TestCollection"
    },//gql add
    test:{
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:"Test"
        }],
        default:[]
    },
    
    // baseUrl:{
    //     type:String,
    //     default:""
    // },
    interProject:{
        type:mongoose.Schema.ObjectId,
        ref:"Project"
    },
    failSend:{
        type:Number,
        default:0
    },
    runEnvironment:{
        type:Number,
        default:0
    },//gql add,0-测试环境，1-生产环境


},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);

model.index({
    "runEnvironment":1
});

var dbManage=db.model("Poll",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;


/**
 
var model=new mongoose.Schema({
    name:String,
    project:{
        type:mongoose.Schema.ObjectId,
        ref:"TestProject"
    },
    users:{
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }],
        default:[]
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    date:{
        type:[Number],
        default:[]
    },
    time:{
        type:[Number],
        default:[]
    },
    sendInfo:{
        user:{
            type:String,
            default:""
        },
        password:{
            type:String,
            default:""
        },
        smtp:{
            type:String,
            default:""
        },
        port:{
            type:Number,
            default:465
        }
    },
    test:{
        type:[{
            type:mongoose.Schema.ObjectId,
            ref:"Test"
        }],
        default:[]
    },

    testCollection:{
        type:mongoose.Schema.ObjectId,
        ref:"TestCollection"
    },//gql add

    baseUrl:{
        type:String,
        default:""
    },
    interProject:{
        type:mongoose.Schema.ObjectId,
        ref:"Project"
    },
    failSend:{
        type:Number,
        default:0
    },
    phoneInfo:{
        method:{
            type:String,
            default:"GET"
        },
        sign:{
            type:String,
            default:""
        },
        baseUrl:{
            type:String,
            default:""
        },
        param:{
            type:Array,
            default:[{
                key:"",
                value:""
            }]
        },
        bindParam:{
            type:String,
            default:""
        },
        split:{
            type:String,
            default:","
        },
        contentParam:{
            type:String,
            default:""
        }
    }
},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);
var dbManage=db.model("Poll",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;
 */