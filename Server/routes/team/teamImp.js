/**
 * Created by sunxin on 2017/6/7.
 */
var teamClass=require("./team");
var team=new teamClass();
var interface=[
    {
        "method":"POST",
        "path":"/team/save",
        "param": {
            id:{
                type:String,
                optional:1
            },
            name:{
                type:String,
                optional:1
            },
            dis:{
                type:String,
                optional:1
            },
        },
        "data":String,
        user:1,
        handle:team.save
    },
    {
        "method":"GET",
        "path":"/team/info",
        "param": {
            id:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:[team.validate,team.info]
    },

    {
        "method":"GET",
        "path":"/team/info2",
        "param": {
            id:{
                type:String,
                optional:1,
            },
        },
        "data":String,
        user:1,
        handle:[team.info2]
    },//gql add
    {
        "method":"GET",
        "path":"/team/info3",
        "param": {
        },
        "data":String,
        user:1,
        handle:[team.info3]
    },//gql add

    {
        "method":"GET",
        "path":"/team/teamlist",
        "param": {
            
        },
        "data":String,
        user:1,
        handle:[team.teamlist]
    },//gql add

    {
        "method":"PUT",
        "path":"/team/pulluser",
        "param": {
            id:{
                type:String,
            },
            user:{
                type:String
            },
            group:String,
        },
        "data":String,
        user:1,
        handle:[team.validate,team.pullUser]
    },
    {
        "method":"DELETE",
        "path":"/team/user",
        "param": {
            id:{
                type:String,
            },
            user:{
                type:String
            },
            self:{
                type:Number,
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:[team.validate,team.removeUser]
    },
    {
        "method":"DELETE",
        "path":"/team/projectuser",
        "param": {
            id:{
                type:String,
            },
            user:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:[team.validate,team.removeProjectUser]
    },
    {
        "method":"GET",
        "path":"/team/projectuser",
        "param": {
            id:{
                type:String,
            },
            project:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:[team.validate,team.projectUser]
    },

    {
        "method":"GET",
        "path":"/team/projectuser2",
        "param": {
            project:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:[team.projectUser2]
    },//gql add

    {
        "method":"PUT",
        "path":"/team/userrole",
        "param": {
            id:{
                type:String,
            },
            user:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:[team.validate,team.userRole]
    },
    {
        "method":"PUT",
        "path":"/team/moveuser",
        "param": {
            id:{
                type:String,
            },
            user:{
                type:String
            },
            group:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:[team.validate,team.moveUser]
    },
    {
        "method":"POST",
        "path":"/team/group",
        "param": {
            id:{
                type:String,
                optional:1
            },
            group:{
                type:String,
                optional:1
            },
            name:{
                type:String,
                optional:1
            },
        },
        "data":String,
        user:1,
        handle:[team.validate,team.createGroup]
    },
    {
        "method":"DELETE",
        "path":"/team/group",
        "param": {
            id:{
                type:String,
            },
            group:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:[team.validate,team.removeGroup]
    },
    {
        "method":"PUT",
        "path":"/team/pullproject",
        "param": {
            id:{
                type:String,
            },
            project:String
        },
        "data":String,
        user:1,
        handle:[team.validate,team.pullProject]
    },
    {
        "method":"PUT",
        "path":"/team/userapply",
        "param": {
            id:{
                type:String,
            },
            dis:{
                type:String,
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:[team.validateTeam,team.userApply]
    },
    {
        "method":"PUT",
        "path":"/team/projectapply",
        "param": {
            id:{
                type:String,
            },
            project:{
                type:String,
                optional:1
            },
            dis:{
                type:String,
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:[team.validateTeam,team.projectApply]
    },
    {
        "method":"GET",
        "path":"/team/group",
        "param": {
            id:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:[team.validate,team.groupList]
    },
    {
        "method":"POST",
        "path":"/team/notice",
        "param": {
            id:{
                type:String,
            },
            notice:{
                type:String,
                optional:1
            },
            content:String
        },
        "data":String,
        user:1,
        handle:[team.validate,team.saveNotice]
    },
    {
        "method":"GET",
        "path":"/team/notice",
        "param": {
            id:{
                type:String,
            },
            page:Number
        },
        "data":String,
        user:1,
        handle:[team.validate,team.getNotice]
    },
    {
        "method":"DELETE",
        "path":"/team/notice",
        "param": {
            id:{
                type:String,
            },
            notice:String
        },
        "data":String,
        user:1,
        handle:[team.validate,team.removeNotice]
    },
    {
        "method":"GET",
        "path":"/team/apply",
        "param": {
            id:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:[team.validate,team.applyList]
    },
    {
        "method":"PUT",
        "path":"/team/apply",
        "param": {
            id:{
                type:String,
            },
            apply:String,
            state:{
                type:Number,
                in:[1,2]
            },
            group:{
                type:String,
                optional:1
            },
            role:{
                type:Number,
                in:[0,1],
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:[team.validate,team.handleApply]
    },
    {
        "method":"DELETE",
        "path":"/team/project",
        "param": {
            id:{
                type:String,
            },
            project:String
        },
        "data":String,
        user:1,
        handle:[team.validate,team.removeProject]
    },

    {
        "method":"DELETE",
        "path":"/team/project2",
        "param": {
            project:String
        },
        "data":String,
        user:1,
        handle:[team.removeProject2]
    },//gql add

    {
        "method":"GET",
        "path":"/team/userpulledlist",
        "param": {
            id:{
                type:String,
            },
            project:String
        },
        "data":String,
        user:1,
        handle:[team.validate,team.userPulledList]
    },
    {
        "method":"PUT",
        "path":"/team/userJoin",
        "param": {
            id:{
                type:String,
            },
            user:String,
            group:String,
            role:Number
        },
        "data":String,
        user:1,
        handle:[team.validate,team.userJoin]
    },
    {
        "method":"DELETE",
        "path":"/team/item",
        "param": {
            id:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:[team.validate,team.removeTeam]
    },
    {
        "method":"PUT",
        "path":"/team/transfer",
        "param": {
            id:{
                type:String,
            },
            user:String
        },
        "data":String,
        user:1,
        handle:[team.validate,team.transfer]
    },
    {
        "method":"GET",
        "path":"/team/user",
        "param": {
            id:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:[team.validate,team.userList]
    },
    {
        "method":"GET",
        "path":"/team/list",
        "param": {

        },
        "data":String,
        user:1,
        handle:[team.list]
    },

    {
        "method":"GET",
        "path":"/team/alllist",
        "param": {

        },
        "data":String,
        user:1,
        handle:[team.allList]
    },//gql add 


    {
        "method":"GET",
        "path":"/team/projectlist",
        "param": {
            id:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:[team.validate,team.projectList]
    },
    {
        "method":"GET",
        "path":"/team/doclist",
        "param": {
            id:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:[team.validate,team.docList]
    },
    {
        "method":"GET",
        "path":"/team/testlist",
        "param": {
            id:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:[team.validate,team.testList]
    },
    {
        "method":"DELETE",
        "path":"/team/doc",
        "param": {
            id:{
                type:String,
            },
            project:String
        },
        "data":String,
        user:1,
        handle:[team.validate,team.removeDoc]
    },
    {
        "method":"GET",
        "path":"/team/docuser",
        "param": {
            id:{
                type:String,
            },
            project:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:[team.validate,team.docUser]
    },
    {
        "method":"PUT",
        "path":"/team/pulldoc",
        "param": {
            id:{
                type:String,
            },
            project:String
        },
        "data":String,
        user:1,
        handle:[team.validate,team.pullDoc]
    },
    {
        "method":"PUT",
        "path":"/team/docapply",
        "param": {
            id:{
                type:String,
            },
            project:{
                type:String,
                optional:1
            },
            dis:{
                type:String,
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:[team.validateTeam,team.docApply]
    },
    {
        "method":"DELETE",
        "path":"/team/test",
        "param": {
            id:{
                type:String,
            },
            project:String
        },
        "data":String,
        user:1,
        handle:[team.validate,team.removeTest]
    },
    {
        "method":"GET",
        "path":"/team/testuser",
        "param": {
            id:{
                type:String,
            },
            project:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:[team.validate,team.testUser]
    },
    {
        "method":"PUT",
        "path":"/team/pulltest",
        "param": {
            id:{
                type:String,
            },
            project:String
        },
        "data":String,
        user:1,
        handle:[team.validate,team.pullTest]
    },
    {
        "method":"PUT",
        "path":"/team/testapply",
        "param": {
            id:{
                type:String,
            },
            project:{
                type:String,
                optional:1
            },
            dis:{
                type:String,
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:[team.validateTeam,team.testApply]
    },
];

module.exports=interface;