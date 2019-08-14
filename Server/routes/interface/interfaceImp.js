/**
 * Created by sunxin on 2016/11/20.
 */
var interClass=require("./interface");
var inter=new interClass();
var interface=[
    {
        "method":"POST",
        "path":"/interface/create",
        "param": {
            name:{
                type:String,
                optional:1
            },
            project:{
                type:String
            },
            group:{
                type:String,
                optional:1
            },
            
            developer:{
                type:String,
                optional:1
            },  
            baseurl:{
                type:String,
                optional:1
            },  //geqiuli add

            url:{
                type:String,
                optional:1
            },
            remark:{
                type:String,
                optional:1
            },
            finish:{
                type:Number,
                optional:1
            },
            method:{
                type:String,
                uppercase:1,
                validate:{
                    in:["GET","POST","PUT","DELETE","PATCH"]
                }
            },
            param:{
                type:String,
                optional:1
            },
            id:{
                type:String,
                optional:1
            },
            autosave:{
                type:String,
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:inter.create
    },
    {
        "method":"DELETE",
        "path":"/interface/item",
        "param": {
            id:{
                type:String
            },
        },
        "data":String,
        user:1,
        handle:inter.remove
    },
    {
        "method":"DELETE",
        "path":"/interface/destroyitem",
        "param": {
            id:{
                type:String
            },
        },
        "data":String,
        user:1,
        handle:inter.destroy
    },
    {
        "method":"PUT",
        "path":"/interface/move",
        "param": {
            id:{
                type:String
            },
            group:{
                type:String
            },
            index:{
                type:Number,
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:inter.move
    },
    {
        "method":"GET",
        "path":"/interface/item",
        "param": {
            id:{
                type:String
            },
            group:{
                type:String,
                optional:1
            },
            project:{
                type:String,
                optional:1
            },
            run:{
                optional:1,
                type:Number
            }
        },
        "data":String,
        user:1,
        handle:inter.info
    },
    {
        "method":"GET",
        "path":"/interface/share",
        "param": {
            id:{
                type:String
            }
        },
        "data":String,
        handle:inter.share
    },
    {
        "method":"GET",
        "path":"/interface/exportjson",
        "param": {
            id:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:inter.exportJSON
    },
    {
        "method":"POST",
        "path":"/interface/importjson",
        "param": {
            group:{
                type:String
            },
            json:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:inter.importJSON
    },
    {
        "method":"POST",
        "path":"/interface/snapshot",
        "param": {
            id:{
                type:String
            },
            dis:String
        },
        "data":String,
        user:1,
        handle:inter.createSnapshot
    },
    {
        "method":"GET",
        "path":"/interface/snapshotlist",
        "param": {
            id:{
                type:String
            },
            page:Number
        },
        "data":String,
        user:1,
        handle:inter.snapshotList
    },
    {
        "method":"DELETE",
        "path":"/interface/snapshot",
        "param": {
            id:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:inter.removeSnapshot
    },
    {
        "method":"PUT",
        "path":"/interface/snapshotroll",
        "param": {
            id:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:inter.snapshotRoll
    },
    {
        "method":"POST",
        "path":"/interface/notify",
        "param": {
            id:{
                type:String
            },
            users:{
                type:String
            },
            content:{
                type:String,
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:inter.notify
    },
    {
        "method":"PUT",
        "path":"/interface/merge",
        "param": {
            id:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:inter.merge
    },
    {
        "method":"GET",
        "path":"/interface/docref",
        "param": {
            id:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:inter.docRef
    },
    {
        "method":"GET",
        "path":"/interface/param",
        "param": {
            id:{
                type:String
            },
            param:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:inter.getParam
    },

    {
        "method":"POST",
        "path":"/interface/transferproject",
        "param": {
            id:{
                type:String
            },
            project:String,
            group:String
        },
        "data":String,
        user:1,
        handle:inter.transferProject
    },//gql add
    {
        "method":"GET",
        "path":"/interface/projectgroup",
        "param": {
            id:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:inter.projectGroup
    },//gql add
    {
        "method":"GET",
        "path":"/interface/interfacelist",
        "param": {

        },
        "data":{

        },
        handle:inter.interfaceList
    },//gql add
    {
        "method":"GET",
        "path":"/interface/interfaceaddedlist",
        "param": {
            project:{
                type:String
            }
        },
        "data":{

        },
        handle:inter.interfaceAddedList
    },//gql add

    {
        "method":"GET",
        "path":"/interface/examplesbyprojects",
        "param": {
            project:{
                type:String,
                optional:1
            }
        },
        "data":{

        },
        handle:inter.examplesByProjects
    },//gql add

];

module.exports=interface;