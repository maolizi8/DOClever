var global=require("./global/store");
var inter=require("./interface/store");
var setting=require("./setting/store");
var version=require("./version/store");

module.exports= {
    namespaced: true,
    state:{
        interid:null,
        teamid:null,
        interfaceSort:0,

        project:{
            users:[]
        },
        status:[],
        template:[],
        lastBaseUrl:"",
        roleOption:{},
        role:0,
        own:0,
        guest:0
    },
    getters:{
		
        event:function (state,getters,rootState) {
            return rootState.event;
        },
		
		rootInit:function (state,getters,rootState) {
            return rootState.init;
        },//geqiuli add
		
        shareRole:function (state) {
            if(/\/public\/public\.html/i.test(location.href))
            {
                return true
            }
            else
            {
                return false;
            }
        },
        interfaceEditRole:function (state) {
            if(state.own==1 || state.role==0)
            {
                return true;
            }
            if(state.roleOption["ie"])
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        testEditRole:function (state) {
            if(state.own==1 || state.role==0)
            {
                return true;
            }
            if(state.roleOption["te"])
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        globalBaseUrlRole:function (state) {
            if(state.own==1 || state.role==0)
            {
                return true;
            }
            if(state.roleOption["gb"])
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        globalStatusRole:function (state) {
            if(state.own==1 || state.role==0)
            {
                return true;
            }
            if(state.roleOption["gs"])
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        globalInjectRole:function (state) {
            if(state.own==1 || state.role==0)
            {
                return true;
            }
            if(state.roleOption["gi"])
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        globalTemplateRole:function (state) {
            if(state.own==1 || state.role==0)
            {
                return true;
            }
            if(state.roleOption["gt"])
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        globalDocRole:function (state) {
            if(state.own==1 || state.role==0)
            {
                return true;
            }
            if(state.roleOption["gd"])
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        versionEditRole:function (state) {
            if(state.own==1 || state.role==0)
            {
                return true;
            }
            if(state.roleOption["ve"])
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        versionRollRole:function (state) {
            if(state.own==1 || state.role==0)
            {
                return true;
            }
            if(state.roleOption["vr"])
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    },
    mutations:{
        setTeamId:function(state,data){
            console.log('interface>info>setTeamId>state')
            console.log(state)
            state.teamid=data.team;
        },//gql add

        setProject:function(state,data){
			// console.log('interface>info>setProject>data')
            // console.log(data)
            state.project=data;
            if(session.get("id")==state.project.owner)
            {
                state.own=1;
                state.role=0;
            }
            else
            {
                state.own=0;
                var bIn=false;
                state.project.users.forEach(function (obj) {
                    if(!obj.option && obj.role==1)
                    {
                        Vue.set(obj,"option",{
                            "ie":0,
                            "te":0,
                            "gb":0,
                            "gs":0,
                            "gi":0,
                            "gt":0,
                            "gd":0,
                            "ve":0,
                            "vr":0
                        })
                    }
                    if(obj.user && obj.user._id==session.get("id"))
                    {
                        bIn=true;
                        if(obj.role==0)
                        {
                            state.role=0;
                        }
                        else
                        {
                            state.role=1;
                            state.roleOption=obj.option;
                        }
                    }
                })
                if(!bIn && (state.project.public || /\/public\/public\.html/i.test(location.href)))
                {
                    state.role=1;
                    state.guest=1;
                    state.roleOption={
                        "ie":0,
                        "te":0,
                        "gb":0,
                        "gs":0,
                        "gi":0,
                        "gt":0,
                        "gd":0,
                        "ve":0,
                        "vr":0
                    };
                }
            }
        },
        setBaseUrls:function (state,data) {
            state.project.baseUrls=$.clone(data);
        },
        addBaseUrl:function (state,data) {
            if(!state.project.baseUrls)
            {
                state.project.baseUrls=[];
            }
            state.project.baseUrls.push($.clone(data));
        },
        setBefore:function (state,data) {
            state.project.before=data;
        },
        setAfter:function (state,data) {
            state.project.after=data;
        },
        setStatus:function (state,data) {
            state.status=data;
        },
        setLastBaseUrl:function (state,data) {
            state.lastBaseUrl=data;
        },
        setTemplate:function (state,data) {
            state.template=data;
        },
        init:function (state) {
            state.project={
                users:[]
            };
            state.status=[];
            state.lastBaseUrl="";
            state.roleOption={};
            state.role=0;
            state.own=0;
            state.guest=0;
            state.template=[];
        }
    },
    actions:{
        init:function (context) {
            var _this=this;

            context.state.interid=getUrlParam("interid");

            console.log('interface>info>init>interid')
            console.log(context.state.interid)

            context.commit("init");
            context.commit("interface/init");
            context.commit("test/init");
            
            return Promise.all([
                net.get("/project/interface",{
                    //id:session.get("projectId"),
                    id:context.state.interid,
                    sort:session.get("sort")?session.get("sort"):0
                    //sort:context.state.interfaceSort?context.state.interfaceSort:0
                }),
                net.get("/project/info",{
                    id:context.state.interid
                }),
                net.get("/status/list",{
                    id:context.state.interid
                }),
                net.get("/version/list",{
                    project:context.state.interid,
                    page:0
                }),
                net.get("/template/list",{
                    project:context.state.interid,
                })
            ]).then(function (values) {
                var obj1=values[0];
                var obj2=values[1];
                var obj3=values[2];
                var obj4=values[3];
                var obj5=values[4];
                if(obj1.code==200)
                {
                    context.dispatch("interface/getAllInterface",obj1.data)
                }
                else
                {
                    throw obj1.msg;
                }
                if(obj2.code==200)
                {
                    // console.log('interface>info>store.js>init>obj2.data')
                    // console.log(obj2.data)
                    context.commit("setProject",obj2.data);
                    context.commit("setTeamId",obj2.data);
                }
                else
                {
                    throw obj2.msg;
                }
                if(obj3.code==200)
                {
                    context.commit("setStatus",obj3.data);
                }
                else
                {
                    throw obj3.msg;
                }
                if(obj4.code==200)
                {
                    context.getters.event.$emit("initVersion",obj4.data);
                }
                else
                {
                    throw obj4.msg;
                }
                if(obj5.code==200)
                {
                    context.commit("setTemplate",obj5.data);
                }
                else
                {
                    throw obj5.msg;
                }
                context.getters.event.$emit("init");
                return values;
            })
        }
    },
    modules:{
        global:global,
        interface:inter,
        setting:setting,
        version:version
    }
}