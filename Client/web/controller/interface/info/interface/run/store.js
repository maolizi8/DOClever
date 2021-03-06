/**
 * geqiuli baseUrl->baseurl
 */
var config=require("common/js/config")
module.exports={
    namespaced:true,
    state:{
		interid:getUrlParam("interid"),//geqiuli add
		
        interface:{},
        baseurl:"", //baseUrl->baseurl
        index:0,
    },
    getters:{
		interid:function (state,getters,rootState) {
			console.log("interface>info>interface>run>store.js>rootState.info.interid")
			console.log(rootState.info.interid)
            return rootState.info.interid;
        },
		
        event:function (state,getters,rootState) {
            return rootState.event;
        },
        baseUrls:function(state,getters,rootState){
            return rootState.info.project.baseUrls;
        },
        querySave:function (state,getters) {
            return state.interface.param[state.index].query.filter(function (obj) {
                if(obj.name && obj.enable)
                {
                    return true
                }
                else
                {
                    return false
                }
            })
        },
        headerSave:function (state,getters) {
            return state.interface.param[state.index].header.filter(function (obj) {
                if(obj.name)
                {
                    return true
                }
                else
                {
                    return false
                }
            });
        },
        bodySave:function (state,getters) {
            return state.interface.param[state.index].body.filter(function (obj) {
                if(obj.name && obj.enable)
                {
                    return true
                }
                else
                {
                    return false
                }
            })
        },
        queryCount:function (state,getters) {
            return getters.querySave.length
        },
        headerCount:function (state,getters) {
            return getters.headerSave.length
        },
        bodyCount:function (state,getters) {
            return getters.bodySave.length
        },
        paramCount:function (state,getters) {
            return getters.param.length;
        },
        param:function (state,getters) {
            return state.interface.param[state.index].param;
        },
        curParam:function (state) {
            console.log("interface>info>interface>run>store.js>getters:curParam")
            console.log(state.index)
            console.log(state.interface.param[state.index])
            return state.interface.param[state.index];
        },
        lastBaseUrl:function (state,getters,rootState) {
			//return rootState.project.info.lastBaseUrl;
            return rootState.info.lastBaseUrl;
        },
        status:function (state,getters,rootState) {
			
            return rootState.info.status;
        },
        interfaceEditRole:function (state,getters,rootState,rootGetters) {
			//return rootGetters["project/info/interfaceEditRole"];
            return rootGetters["info/interfaceEditRole"];
        },
        testEditRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/testEditRole"];
        },
        globalBaseUrlRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/globalBaseUrlRole"];
        },
        globalStatusRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/globalStatusRole"];
        },
        globalInjectRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/globalInjectRole"];
        },
        globalDocRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/globalDocRole"];
        },
        versionEditRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/versionEditRole"];
        },
        versionRollRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/versionRollRole"];
        }
    },
    mutations:{
        setIndex:function(state,data) {
            state.index=data;
        },
        toggleQuery:function (state) {
            if(state.interface.param[state.index].queryRawShow)
            {
                state.interface.param[state.index].queryRawShow=0;
                var str=$.trim(state.interface.param[state.index].queryRawStr);
                var arr=[];
                var param1=str.split("&");
                for(var i=0;i<param1.length;i++)
                {
                    if(!param1[i])
                    {
                        continue;
                    }
                    var param2=param1[i].split("=");
                    if(param2.length>0)
                    {
                        var valueObj=helper.findValue(state.interface.param[state.index].query,param2[0]);
                        arr.push({
                            name:param2[0],
                            must:valueObj?valueObj.must:1,
                            remark:valueObj?valueObj.remark:"",
                            selValue:param2[1]?decodeURIComponent(param2[1].replace(/\+/g, '%20')):"",
                            enable:valueObj?valueObj.enable:1,
                            value:valueObj?valueObj.value:null,
                            encrypt:(valueObj && valueObj.encrypt)?valueObj.encrypt:{
                                type:"",
                                salt:"",
                                key:0
                            }
                        })
                    }
                }
                arr.push({
                    name:"",
                    must:0,
                    remark:"",
                    value:"",
                    selValue:"",
                    enable:1
                })
                state.interface.param[state.index].query=arr;
            }
            else
            {
                state.interface.param[state.index].queryRawShow=1;
                var str="",arr=state.interface.param[state.index].query;
                for(var i=0;i<arr.length;i++)
                {
                    if(arr[i].name)
                    {
                        str+=(arr[i].name+"="+(encodeURIComponent(arr[i].selValue))+"&")
                    }
                    if(i==arr.length-1)
                    {
                        str=str.replace(/(\&+)$/,"");
                    }
                }
                state.interface.param[state.index].queryRawStr=str;
            }
        },
        toggleHeader:function (state) {
            if(state.interface.param[state.index].headerRawShow)
            {
                state.interface.param[state.index].headerRawShow=0;
                var arr=$.trim(state.interface.param[state.index].headerRawStr).split("\n");
                var arrHeader=[];
                for(var i=0;i<arr.length;i++)
                {
                    if(!$.trim(arr[i]))
                    {
                        continue;
                    }
                    var line=$.trim(arr[i]);
                    var index=line.indexOf(":");
                    var key="",value="";
                    if(index==-1)
                    {
                        key=line;
                    }
                    else
                    {
                        key=$.trim(line.substr(0,index));
                        value=$.trim(line.substr(index+1));
                    }
                    if(key)
                    {
                        var obj=helper.findValue(state.interface.param[state.index].header,key);
                        arrHeader.push({
                            name:key,
                            value:value,
                            remark:obj?obj.remark:"",
                            encrypt:(obj && obj.encrypt)?obj.encrypt:{
                                type:"",
                                salt:"",
                                key:0
                            }
                        })
                    }
                }
                arrHeader.push({
                    name:"",
                    value:"",
                    remark:""
                })
                state.interface.param[state.index].header=arrHeader;
            }
            else
            {
                state.interface.param[state.index].headerRawShow=1;
                var str="",arr=state.interface.param[state.index].header;
                for(var i=0;i<arr.length;i++)
                {
                    if(arr[i].name)
                    {
                        str+=(arr[i].name+":"+(arr[i].value?arr[i].value:"")+"\n");
                    }
                    if(i==arr.length-1)
                    {
                        str=str.replace(/(\n+)$/,"");
                    }
                }
                state.interface.param[state.index].headerRawStr=str;
            }
        },
        toggleBody:function (state) {
            if(state.interface.param[state.index].bodyRawShow)
            {
                state.interface.param[state.index].bodyRawShow=0;
                var str=$.trim(state.interface.param[state.index].bodyRawStr);
                var arr=[];
                var param1=str.split("&");
                for(var i=0;i<param1.length;i++)
                {
                    if(!param1[i])
                    {
                        continue;
                    }
                    var param2=param1[i].split("=");
                    if(param2.length>0)
                    {
                        var valueObj=helper.findValue(state.interface.param[state.index].body,param2[0]);
                        var selValue=param2[1]?decodeURIComponent(param2[1].replace(/\+/g, '%20')):""
                        if(valueObj && valueObj.type!=1)
                        {
                            valueObj.selValue=selValue;
                        }
                        arr.push({
                            name:decodeURIComponent(param2[0].replace(/\+/g, '%20')),
                            type:valueObj?valueObj.type:(selValue=="[FILE]"?1:0),
                            must:valueObj?valueObj.must:1,
                            remark:valueObj?valueObj.remark:"",
                            selValue:selValue,
                            enable:valueObj?valueObj.enable:1,
                            value:valueObj?valueObj.value:null,
                            encrypt:(valueObj && valueObj.encrypt)?valueObj.encrypt:{
                                type:"",
                                salt:"",
                                key:0
                            }
                        })
                    }
                }
                arr.push(
                    {
                        name:"",
                        type:0,
                        must:0,
                        remark:"",
                        value:"",
                        selValue:"",
                        enable:1
                    }
                )
                state.interface.param[state.index].body=arr;
            }
            else
            {
                state.interface.param[state.index].bodyRawShow=1;
                var str="",arr=state.interface.param[state.index].body;
                for(var i=0;i<arr.length;i++)
                {
                    if(arr[i].name)
                    {
                        str+=(arr[i].name+"="+(arr[i].type==1?"[FILE]":encodeURIComponent(arr[i].selValue))+"&")
                    }
                    if(i==arr.length-1)
                    {
                        str=str.replace(/(\&+)$/,"");
                    }
                }
                state.interface.param[state.index].bodyRawStr=str;
            }
        },
        changeMethod:function (state) {
            if(state.interface.method=="POST" || state.interface.method=="PUT" || state.interface.method=="PATCH")
            {
                state.interface.param.forEach(function (obj,index) {
                    if(obj.header.length==1 && !obj.header[0].name)
                    {
                        obj.header[0].name="Content-Type";
                        obj.header[0].value="application/x-www-form-urlencoded"
                    }
                    else
                    {
                        var bFind=false;
                        for(var i=0;i<obj.header.length;i++)
                        {
                            var obj1=obj.header[i];
                            if(obj1.name=="Content-Type")
                            {
                                bFind=true;
                                break;
                            }
                        }
                        if(!bFind)
                        {
                            obj.header.push({
                                name:"Content-Type",
                                value:"application/x-www-form-urlencoded",
                                remark:""
                            })
                        }
                    }
                    if(!obj.bodyInfo)
                    {
                        obj.bodyInfo={
                            type:0,
                            rawType:0,
                            rawTextRemark:"",
                            rawFileRemark:"",
                            rawText:"",
                            rawJSON:[],
                            rawJSONType:0
                        }
                    }
                })
            }
            else
            {
                state.interface.param.forEach(function (obj,index) {
                    for(var i=0;i<obj.header.length;i++)
                    {
                        var obj1=obj.header[i];
                        if(obj1.name=="Content-Type")
                        {
                            if(obj.header.length>1)
                            {
                                obj.header.splice(i,1);
                            }
                            else
                            {
                                obj.header[0].name="";
                                obj.header[0].value="";
                                obj.header[0].remark="";
                            }
                            break;
                        }
                    }
                })
            }
        },
        changeUrl:function (state,val) {
            if(val)
            {
                var arrParam=[];
                var arr=val.match(/\{([^\s|\}|\{]+?)\}(?!\})/g);
                if(arr)
                {
                    for(var i=0;i<arr.length;i++)
                    {
                        var str=arr[i].substr(1,arr[i].length-2);
                        var bFind=false;
                        for(var j=0;j<state.interface.param[state.index].param.length;j++)
                        {
                            if(str==state.interface.param[state.index].param[j].name)
                            {
                                bFind=true;
                                arrParam.push(state.interface.param[state.index].param[j]);
                                break;
                            }
                        }
                        if(!bFind)
                        {
                            arrParam.push({
                                name:str,
                                remark:"",
                                value:{
                                    type:0,
                                    status:"",
                                    data:[]
                                }
                            })
                        }
                    }
                }
                state.interface.param.forEach(function (obj,index) {
                    obj.param=arrParam;
                })
            }
        },

        changeBaseUrl:function(state){
            console.log("project>info>interface>run>stroe.js--<changeBaseUrl>")
            console.log(state.interface.baseurl)
        },  //geqiuli add

        setBaseUrl:function (state,val) {
            state.baseurl=val;
        },
    },
    actions:{
        run:async function (context,query) {
            var method=context.state.interface.method;

            console.log("interface>info>interface>run>store.js>run-interface")
            console.log(context.state.interface)
            //var baseUrl=$.trim(context.state.baseUrl);

            
            var runEnvironment=query.runEnvironment;

            console.log("interface>info>interface>run>store.js>runEnvironment")
            console.log(runEnvironment)

            if("baseurl" in context.state.interface){
                var baseurl=$.trim(context.state.interface.baseurl); //geqiuli modify
                console.log("interface>info>interface>run>store.js>run-baseurl")
                console.log(baseurl)
            }else{
                console.log("未录入baseurl")
                var baseurl="";
            }

            var path=$.trim(context.state.interface.url);
            var globalVar={};
            context.getters.baseUrls.forEach(function (obj) {
                if(obj.url==baseurl && obj.env)
                {
                    obj.env.forEach(function (obj) {
                        globalVar[obj.key]=obj.value;
                    })
                }
            })

            //if(!method || !baseUrl || !path)
            //geqiuli modify
            if(!method){
                return new Promise(function (resolve,reject) {
                    var obj={};
                    obj.code=0;
                    obj.msg="请求方法不能为空!"
                    resolve(obj)
                });
            }else if(!baseurl){
                return new Promise(function (resolve,reject) {
                    var obj={};
                    obj.code=0;
                    obj.msg="baseurl不能为空!"
                    resolve(obj)
                });
            }else if(!path){
                return new Promise(function (resolve,reject) {
                    var obj={};
                    obj.code=0;
                    obj.msg="路由地址不能为空!"
                    resolve(obj)
                });
            }


            var bMock=false;
            if (runEnvironment==2) {
                baseurl="MockServer"
            }
            
            if(baseurl!="MockServer")
            {
                var indexHttp=baseurl.indexOf("://");
                var indexSlash;
                var domainHttp;
                if(indexHttp==-1)
                {
                    indexSlash=baseurl.indexOf("/")
                    domainHttp='http'
                }
                else
                {
                    indexSlash=baseurl.indexOf("/",indexHttp+3);
                    domainHttp=baseurl.substring(0,indexHttp)  
                }
                console.log("interface>info>interface>run>store.js>>>indexHttp")
                console.log(indexHttp)
                console.log("interface>info>interface>run>store.js>>>indexSlash")
                console.log(indexSlash)
                console.log("interface>info>interface>run>store.js>>>domainHttp")
                console.log(domainHttp)
                
                var domainName;
                var domainHost;
                if (runEnvironment==0) {
                    if (indexHttp==-1 && indexSlash==-1) {
                        domainName=baseurl  
                    } else if (indexHttp>-1 && indexSlash==-1) {
                        domainName=baseurl.substr(indexHttp+3)    
                    }else if (indexHttp==-1 && indexSlash>-1) {
                        domainName=baseurl.substr(0,baseurl.length-1)       
                    }else if (indexHttp>-1 && indexSlash>-1) {
                        domainName=baseurl.substring(indexHttp+3,indexSlash)   
                    }

                    console.log("interface>info>interface>run>store.js>>>test environment >> domainName")
                    console.log(domainName)

                    await net.get("/tools/domainhostip",{
                        domain:domainName
                    }).then(function (data) {
                        if(data.code==200)
                        {
                            console.log("interface>info>interface>run>store.js>>>test environment >> /tools/domainhostip")
                            console.log(data.data)
                            if (data.data) {
                                domainHost=data.data.host
                            }else{
                                $.notify('请先配置测试环境下该域名的HostIP！',0);
                            }
                            
                        }else{
                            $.notify('查找测试环境HostIP报错：'+data.msg,0);
                        }
                    })
                }

                if(indexSlash>-1)
                {
                    var baseUrlTemp=baseurl.substring(0,indexSlash);
                    var pathTemp=baseurl.substr(indexSlash);
                    if(pathTemp[pathTemp.length-1]=="/" && path[0]=="/")
                    {
                        pathTemp=pathTemp.substr(0,pathTemp.length-1);
                    }
                    else if(pathTemp[pathTemp.length-1]!="/" && path[0]!="/" && pathTemp.indexOf("?")==-1 && pathTemp.indexOf("#")==-1)
                    {
                        pathTemp+="/"
                    }
                    //baseurl=baseUrlTemp;
                    if (runEnvironment==0) {
                        baseurl=domainHttp+"://"+domainHost
                    }else{
                        baseurl=baseUrlTemp;
                    }

                    path=pathTemp+path;
                }
                else
                {
                    if(path[0]!="/")
                    {
                        path="/"+path;
                    }

                    if (runEnvironment==0) {
                        baseurl=domainHttp+"://"+domainHost
                    }
                }
                console.log("interface>info>interface>run>store.js>>>baseurl")
                console.log(baseurl)   
                console.log("interface>info>interface>run>store.js>>>path")
                console.log(path)    
                
            }
            else
            {
                bMock=true;
                baseurl=config.projectBaseUrl;   /**geqiuli baseUrl->projectBaseUrl */
                path="/mock/"+context.getters.interid+(session.get("versionId")?session.get("versionId"):"")+(path[0]!="/"?("/"+path):path);
            }
            path=helper.handleGlobalVar(path,globalVar);
            if(path.substr(0,2)=="//")
            {
                path=path.substr(1);
            }
            var param={};
            context.getters.param.forEach(function (obj) {
                param[obj.name]=helper.handleGlobalVar(obj.selValue,globalVar);
            })
            var query={};
            context.getters.querySave.forEach(function (obj) {
                if(obj.encrypt && obj.encrypt.type)
                {
                    var value=helper.encrypt(obj.encrypt.type,helper.handleGlobalVar(obj.selValue,globalVar),obj.encrypt.salt);
                    var key=obj.name;
                    if(obj.encrypt.key)
                    {
                        key=helper.encrypt(obj.encrypt.type,key,obj.encrypt.salt);
                    }
                    query[key]=value;
                }
                else
                {
                    query[obj.name]=helper.handleGlobalVar(obj.selValue,globalVar);
                }

            })


            var header={},objHeaders={};

            
            var arrHeaders=["host","connection","origin","referer","user-agent","cookie","content-type"];

            //objHeaders["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8"; //add for test

            context.getters.headerSave.forEach(function (obj) {
                if(obj.encrypt && obj.encrypt.type)
                {
                    var value=helper.encrypt(obj.encrypt.type,helper.handleGlobalVar(obj.value,globalVar),obj.encrypt.salt);
                    var key=obj.name;
                    if($.inArr(key,arrHeaders))
                    {
                        objHeaders[key]=value;
                    }
                    else
                    {
                        header[key]=value;
                    }

                }
                else
                {
                    if($.inArr(obj.name,arrHeaders))
                    {
                        objHeaders[obj.name]=helper.handleGlobalVar(obj.value,globalVar);
                    }
                    else
                    {
                        header[obj.name]=helper.handleGlobalVar(obj.value,globalVar);
                    }

                }
            })

            if (runEnvironment==0) {
                console.log("interface>info>interface>run>store.js>runEnvironment should add Host")
                objHeaders['Host']=domainName

            }
            console.log("interface>info>interface>run>store.js>run-header")
            console.log(header)
            console.log("interface>info>interface>run>store.js>run-objHeaders")
            console.log(objHeaders)

            var body={},bUpload=false;
            if(method=="POST" || method=="PUT" || method=="PATCH")
            {
                if(context.getters.curParam.bodyInfo.type==0)
                {
                    var arr=document.getElementById("bodyTable").querySelectorAll("[custom]");
                    context.getters.bodySave.forEach(function (obj,index) {
                        if(obj.type==0)
                        {
                            if(obj.encrypt && obj.encrypt.type)
                            {
                                var value=helper.encrypt(obj.encrypt.type,helper.handleGlobalVar(obj.selValue,globalVar),obj.encrypt.salt);
                                var key=obj.name;
                                if(obj.encrypt.key)
                                {
                                    key=helper.encrypt(obj.encrypt.type,key,obj.encrypt.salt);
                                }
                                body[key]=value;
                            }
                            else
                            {
                                body[obj.name]=helper.handleGlobalVar(obj.selValue,globalVar);
                            }
                        }
                        else if(obj.type==1)
                        {
                            if(arr[index].files.length>0)
                            {
                                if(obj.encrypt && obj.encrypt.type && obj.encrypt.key)
                                {
                                    var key=helper.encrypt(obj.encrypt.type,obj.name,obj.encrypt.salt);
                                    body[key]=arr[index].files[0];
                                }
                                else
                                {
                                    body[obj.name]=arr[index].files[0];
                                }
                                bUpload=true;
                            }
                            else
                            {
                                if(obj.encrypt && obj.encrypt.type && obj.encrypt.key)
                                {
                                    var key=helper.encrypt(obj.encrypt.type,obj.name,obj.encrypt.salt);
                                    body[key]="";
                                }
                                else
                                {
                                    body[obj.name]="";
                                }

                            }
                        }
                    })
                }
                else
                {
                    if(context.getters.curParam.bodyInfo.rawType==0)
                    {
                        var encryptType=context.getters.curParam.encryptType;
                        if(encryptType)
                        {
                            body=helper.encrypt(encryptType,helper.handleGlobalVar(context.getters.curParam.bodyInfo.rawText,globalVar),document.getElementById("bodyRawEncryptSalt").querySelector("input").value)
                        }
                        else
                        {
                            body=helper.handleGlobalVar(context.getters.curParam.bodyInfo.rawText,globalVar);
                        }
                    }
                    else if(context.getters.curParam.bodyInfo.rawType==2)
                    {
                        var obj=context.getters.curParam.bodyInfo.rawJSONType==0?{}:[];
                        var result=helper.resultSave(context.getters.curParam.bodyInfo.rawJSON,0,globalVar);
                        helper.convertToJSON(result,obj,null,1);
                        body=obj;
                    }
                    else
                    {
                        if(!context.getters.curParam.fileResult)
                        {
                            return new Promise(function (resolve,reject) {
                                var obj={};
                                obj.code=0;
                                obj.msg="上传内容不能为空！";
                                resolve(obj)
                            });
                        }
                        body=context.getters.curParam.fileResult;
                    }
                }
            }

            var request={
                baseurl:baseurl,
                path:path,
                method:method
            }
            // console.log("interface>info>interface>run>store.js>run- about before")
            // console.log(context.getters.curParam.before.mode)
            // console.log(context.rootState.info.project.before)
            // console.log(context.getters.curParam.before)
            // console.log('befere helper.runBefore2>request')
            // console.log(request)

            if(context.getters.curParam.before.mode==0)
            {
                if(context.rootState.info.project.before)
                {
                    //helper.runBefore(context.rootState.info.project.before,baseurl,path,method,query,header,body,param)
                    helper.runBefore2(context.rootState.info.project.before,request,query,header,body,param)
                }
                //helper.runBefore(context.getters.curParam.before.code,baseurl,path,method,query,header,body,param)
                helper.runBefore2(context.getters.curParam.before.code,request,query,header,body,param)
            }
            else
            {
                //helper.runBefore(context.getters.curParam.before.code,baseurl,path,method,query,header,body,param)
                helper.runBefore2(context.getters.curParam.before.code,request,query,header,body,param)
            }
            // console.log('after helper.runBefore2>request')
            // console.log(request)
            baseurl=request.baseurl;
            path=request.path;
            method=request.method;


            for(var paramKey in param)
            {
                path=path.replace("{"+paramKey+"}",param[paramKey])
            }
            if((method=="POST" || method=="PUT" || method=="PATCH") && context.getters.curParam.bodyInfo.type==1 && context.getters.curParam.bodyInfo.rawType==2)
            {
                body=JSON.stringify(body);
            }
            query=$.param(query);
            if(query.length>0)
            {
                path=path+"?"+query;
            }
            header["url-doclever"]=baseurl;
            header["path-doclever"]=path;
            header["method-doclever"]=method;
            header["user-doclever"]=session.get("id");
            header["headers-doclever"]=JSON.stringify(objHeaders);
            var proxyUrl="/proxy";
            var bNet=false;
            if(!bMock && session.get("proxy"))
            {
                bNet=true;
                proxyUrl="http://127.0.0.1:36742";
            }
            var startDate=new Date();
            var bContent=false,contentKey;
            for(var key in header)
            {
                if(key.toLowerCase()=="content-type")
                {
                    bContent=true;
                    contentKey=key;
                    if(/multipart\/form-data/i.test(header[contentKey]))
                    {
                        bUpload=true;
                    }
                    break
                }
            }
            context.getters.curParam.resultData="";

            console.log("interface>run>store.js>body,header,bNet")
            console.log(body)
            console.log(header)
            console.log(bNet)

            var func;
            if(bUpload || context.getters.curParam.bodyInfo.type==1)
            {
                if(bContent && context.getters.curParam.bodyInfo.type==0)
                {
                    delete header[contentKey];
                }
                func=net.upload("POST",proxyUrl,body,header,null,1,bNet)
            }
            else
            {
                func=net.post(proxyUrl,body,header,null,1,bNet)
            }
            return func.then(function (result) {
                console.log("interface>run>store.js>result")
                console.log(result)

                context.getters.curParam.run=1;
                context.getters.curParam.reqHeader=result.header["doclever-request"]?JSON.parse(result.header["doclever-request"]):{};
                delete result.header["doclever-request"];
                context.getters.curParam.resHeader=result.header;
                context.getters.curParam.status=String(result.status);
                context.getters.curParam.second=(((new Date())-startDate)/1000).toFixed(3);
                context.getters.curParam.type=typeof (result.data);
                if(context.getters.curParam.after.mode==0)
                {
                    if(context.rootState.info.project.after)
                    {
                        helper.runAfter(context.rootState.info.project.after,result.status,result.header,result.data)
                    }
                    helper.runAfter(context.getters.curParam.after.code,result.status,result.header,result.data)
                }
                else
                {
                    helper.runAfter(context.getters.curParam.after.code,result.status,result.header,result.data)
                }
                if(context.getters.curParam.type=="object" && !(result.data instanceof Blob))
                {
                    context.getters.curParam.type="object"
                    context.getters.curParam.resultData=result.data;
                    context.getters.curParam.rawData=JSON.stringify(result.data);
                    var outParam=helper.resultSave(context.getters.curParam.result)
                    context.getters.curParam.draw=helper.format(context.getters.curParam.rawData,0,outParam,context.rootState.info.status).draw;
                    var obj=helper.format(context.getters.curParam.rawData,1,outParam,context.rootState.info.status);
                    context.getters.curParam.drawMix=obj.draw
                    context.getters.curParam.errorCount=obj.error;
                }
                else if(result.header["content-type"] && result.header["content-type"].indexOf("image/")>-1)
                {
                    if(context.getters.curParam.imgUrl)
                    {
                        $.revokeUrlObject(context.getters.curParam.imgUrl);
                        context.getters.curParam.imgUrl=""
                    }
                    context.getters.curParam.type="img";
                    context.getters.curParam.rawData="";
                    context.getters.curParam.imgUrl=$.createUrlObject(result.data);
                    context.getters.curParam.errorCount=0;
                }
                else if(result.header["content-type"] && result.header["content-type"].indexOf("/html")>-1)
                {
                    context.getters.curParam.type="html";
                    context.getters.curParam.rawData=result.data;
                    context.getters.curParam.draw=result.data
                    context.getters.curParam.drawMix=result.data;
                    context.getters.curParam.errorCount=0;
                }
                else
                {
                    if(result.header["content-type"]===undefined || (result.header["content-type"] && result.header["content-type"].indexOf("/xml")==-1))
                    {
                        var ele=document.createElement("div");
                        ele.innerHTML=result.data;
                        if(ele.childNodes.length>1 || (ele.childNodes.length>0 && ele.childNodes[0].nodeType==1))
                        {
                            context.getters.curParam.type="html";
                        }
                    }
                    context.getters.curParam.rawData=result.data;
                    context.getters.curParam.draw=result.data
                    context.getters.curParam.drawMix=result.data;
                    context.getters.curParam.errorCount=0;
                }
                return {
                    code:200
                }
            })
        },
        save:function (context) {
            if(context.getters.curParam.imgUrl)
            {
                $.revokeUrlObject(context.getters.curParam.imgUrl);
                context.getters.curParam.imgUrl=""
            }
            var method=context.state.interface.method;

            //var baseUrl=$.trim(context.state.baseUrl);
            console.log(context.state.interface)
            if("baseurl" in context.state.interface){
                var baseurl=$.trim(context.state.interface.baseurl); //geqiuli modify
                console.log("project>info>interface>run>store.js>save-baseurl")
                console.log(baseurl)
            }else{
                console.log("未录入baseurl")
                var baseurl="";
            }

            var path=$.trim(context.state.interface.url);
            
            //if(!method || !baseUrl || !path)
            //geqiuli modify
            if(!method){
                return new Promise(function (resolve,reject) {
                    var obj={};
                    obj.code=0;
                    obj.msg="请求方法不能为空!"
                    resolve(obj)
                });
            }else if(!baseurl){
                return new Promise(function (resolve,reject) {
                    var obj={};
                    obj.code=0;
                    obj.msg="baseurl不能为空!"
                    resolve(obj)
                });
            }else if(!path){
                return new Promise(function (resolve,reject) {
                    var obj={};
                    obj.code=0;
                    obj.msg="路由地址不能为空!"
                    resolve(obj)
                });
            }


            var originIndex=context.state.index;
            var arrParam=[];
            //var arrParam2=[];
            context.state.interface.param.forEach(function (obj,index) {
                context.state.index=index;
                var param=[];
                context.getters.param.forEach(function (obj) {
                    if(obj.name)
                    {
                        var value=helper.handleValue(obj);
                        param.push({
                            name:obj.name,
                            remark:obj.remark,
                            value:value
                        })
                    }
                })
                var query=[];
                context.getters.querySave.forEach(function (obj) {
                    var value=helper.handleValue(obj);
                    query.push({
                        name:obj.name,
                        must:obj.must,
                        remark:obj.remark,
                        value:value
                    })
                })
                var header=[];
                context.getters.headerSave.forEach(function (obj) {
                    header.push({
                        name:obj.name,
                        value:obj.value,
                        remark:obj.remark
                    })
                })
                var body=[],bUpload=false;
                if(method=="POST" || method=="PUT" || method=="PATCH")
                {
                    if(context.getters.curParam.bodyInfo.type==0)
                    {
                        context.getters.bodySave.forEach(function (obj) {
                            if(obj.type==0)
                            {
                                var value=helper.handleValue(obj);
                                body.push({
                                    name:obj.name,
                                    type:0,
                                    must:obj.must,
                                    remark:obj.remark,
                                    value:value
                                })
                            }
                            else if(obj.type==1)
                            {
                                body.push({
                                    name:obj.name,
                                    type:1,
                                    must:obj.must,
                                    remark:obj.remark
                                })
                                bUpload=true;
                            }
                        })
                        var contentTypeKey;
                        for(var key in header)
                        {
                            if(key.toLowerCase()=="content-type")
                            {
                                contentTypeKey=key;
                                break;
                            }
                        }
                        if(bUpload)
                        {
                            header[contentTypeKey?contentTypeKey:"content-type"]="multipart/form-data"
                        }
                    }
                }
                var result=[],outInfo;
                if(obj.run || (!obj.run && originIndex==index))
                {
                    var resultData,type;
                    if(obj.run)
                    {
                        resultData=context.getters.curParam.resultData;
                        type=context.getters.curParam.type;
                    }
                    else
                    {
                        resultData=context.getters.curParam.selParam.rawData?JSON.parse(context.getters.curParam.selParam.rawData):"";
                        type=context.getters.curParam.selParam.type;
                    }
                    if(resultData)
                    {
                        if((resultData instanceof Array) && resultData.length>0)
                        {
                            var resultObj=helper.findObj(context.getters.curParam.result,key);
                            helper.handleResultData(key,resultData[0],result,resultObj)
                        }
                        else
                        {
                            for(var key in resultData)
                            {
                                var resultObj=helper.findObj(context.getters.curParam.result,key);
                                helper.handleResultData(key,resultData[key],result,resultObj)
                            }
                        }
                    }
                    if(type=="object")
                    {
                        outInfo={
                            type:0,
                            rawRemark:"",
                            rawMock:"",
                            jsonType:(resultData && (resultData instanceof Array))?1:0
                        }
                    }
                    else
                    {
                        outInfo={
                            type:1,
                            rawRemark:context.getters.curParam.outInfo?context.getters.curParam.outInfo.rawRemark:"",
                            rawMock:context.getters.curParam.outInfo?context.getters.curParam.outInfo.rawMock:"",
                            jsonType:0
                        }
                    }
                }
                else
                {
                    result=context.getters.curParam.result;
                    outInfo=context.getters.curParam.outInfo;
                }
                var obj1={
                    queryParam:query,
                    header:header,
                    bodyParam:body,
                    outParam:result,
                    restParam:param,
                    outInfo:outInfo,
                    before:obj.before,
                    after:obj.after,
                    id:obj.id,
                    name:obj.name,
                    remark:obj.remark,
                };

                // var obj2={
                //     queryParam:query,
                //     header:header,
                //     bodyParam:body,
                //     //outParam:result,
                //     restParam:param,
                //     //outInfo:outInfo,
                //     before:obj.before,
                //     after:obj.after,
                //     id:obj.id,
                //     name:obj.name,
                //     remark:obj.remark,
                // };
                if(method=="POST" || method=="PUT" || method=="PATCH")
                {
                    obj1.bodyInfo=obj.bodyInfo;
                    if(obj1.bodyInfo.type==1 && obj1.bodyInfo.rawType==2 && obj1.bodyInfo.rawJSON)
                    {
                        obj1.bodyInfo.rawJSON=helper.resultSave(obj1.bodyInfo.rawJSON,1);
                    }
                }
                arrParam.push(obj1)
                //arrParam2.push(obj2);//geqiuli add
            })
            context.state.index=originIndex;
            var obj={
                _id:context.state.interface._id?context.state.interface._id:null,
                method:method,
                url:path,

                baseurl:baseurl,
                
                id:context.state.interface.id,
                group:{
                    _id:context.state.interface.group._id
                },
                name:context.state.interface.name,
                remark:context.state.interface.remark,
                owner:!context.state.interface._id?"":context.state.interface.owner,
                editor:!context.state.interface._id?"":context.state.interface.editor,
                createdAt:!context.state.interface._id?"":context.state.interface.createdAt,
                updatedAt:!context.state.interface._id?"":context.state.interface.updatedAt,
                finish:context.state.interface.finish,
                param:arrParam
            }

            // console.log('-----------obj--------------------')
            // console.log(obj)
            context.commit("info/interface/setNewInterfaceStr",JSON.stringify(obj),{
                root:true
            })
            var bMatchUrl=false;
            if(baseurl!="MockServer")
            {
                for(var i=0;i<context.rootState.info.project.baseUrls.length;i++)
                {
                    var reg=new RegExp(context.rootState.info.project.baseUrls[i].url);
                    if(reg.test(baseurl))
                    {
                        bMatchUrl=true;
                        break;
                    }
                }
            }
            else
            {
                bMatchUrl=true;
            }
            var pro=new Promise(function (resolve,reject) {
                resolve();
            })
            if(bMatchUrl)
            {
                return pro;
            }
            else
            {
                $.confirm("检测到当前根Url不在BaseUrl之内，是否自动添加",function () {
                    $.startHud();
                    net.put("/project/addurl",{
                        id:context.getters.interid,
                        url:baseurl
                    }).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            context.commit("info/addBaseUrl",{
                                url:baseurl,
                                remark:""
                            },{
                                root:true
                            });
                            $.notify("添加baseUrl成功",1);
                            return pro;
                        }
                        else
                        {
                            return pro;
                        }
                    })
                },function () {
                    return pro;
                })
            }
        },
        initBaseUrl:function (context) {
            console.log('project>info>interface>run>store.js>initBaseUrl')
            // console.log(context.rootState.interface)
            // context.commit("setBaseUrl",context.rootState.interface.baseurl?context.rootState.interface.baseurl:"");
            // if(context.rootState. .lastBaseUrl)
            // {
            //     context.commit("setBaseUrl",context.rootState.info.lastBaseUrl);
            // }
            // else 
            // {
            //     context.commit("setBaseUrl",context.rootState.info.project.length>0?context.rootState.info.project.baseUrls[0].url:"");
            // }
        },
        initData:function (context,data) {
            context.state.interface=data;
            context.state.interface.param.forEach(function (obj) {
                var objKey={
                    fileResult:"",
                    resHeader:[],
                    reqHeader:{},
                    status:"",
                    second:"",
                    draw:[],
                    drawMix:[],
                    type:"object",
                    imgUrl:"",
                    resultData:"",
                    queryRawShow:0,
                    headerRawShow:0,
                    bodyRawShow:0,
                    queryRawStr:"",
                    headerRawStr:"",
                    bodyRawStr:"",
                    rawData:"",
                    encryptType:"",
                    errorCount:0,
                    run:0
                }
                for(var key in objKey)
                {
                    Vue.set(obj,key,objKey[key]);
                }
                if(obj.query.length>0)
                {
                    for(var i=0;i<obj.query.length;i++)
                    {
                        Vue.set(obj.query[i],"enable",1);
                        Vue.set(obj.query[i],"selValue","");
                        if(obj.query[i].value && obj.query[i].value.type==0 && obj.query[i].value.data.length>0)
                        {
                            obj.query[i].selValue=obj.query[i].value.data[0].value;
                        }
                        else if(obj.query[i].value && obj.query[i].value.type==1 && obj.query[i].value.status)
                        {
                            var objStatus=null;
                            context.rootState.info.status.forEach(function (obj1) {
                                if(obj1.id==obj.query[i].value.status)
                                {
                                    objStatus=obj1;
                                }
                            })
                            if(objStatus && objStatus.data.length>0)
                            {
                                obj.query[i].selValue=objStatus.data[0].key;
                            }
                            else
                            {
                                obj.query[i].selValue="";
                            }
                        }
                        else
                        {
                            obj.query[i].selValue="";
                        }

                    }
                }
                if(obj.body.length>0)
                {
                    for(var i=0;i<obj.body.length;i++)
                    {
                        Vue.set(obj.body[i],"enable",1);
                        Vue.set(obj.body[i],"selValue","");
                        if(obj.body[i].value && obj.body[i].value.type==0 && obj.body[i].value.data.length>0)
                        {
                            obj.body[i].selValue=obj.body[i].value.data[0].value;
                        }
                        else if(obj.body[i].value && obj.body[i].value.type==1 && obj.body[i].value.status)
                        {
                            var objStatus=null;
                            context.rootState.info.status.forEach(function (obj1) {
                                if(obj1.id==obj.body[i].value.status)
                                {
                                    objStatus=obj1;
                                }
                            })
                            if(objStatus && objStatus.data.length>0)
                            {
                                obj.body[i].selValue=objStatus.data[0].key;
                            }
                            else
                            {
                                obj.body[i].selValue="";
                            }
                        }
                        else
                        {
                            obj.body[i].selValue="";
                        }

                    }
                }
                if(obj.param.length>0)
                {
                    for(var i=0;i<obj.param.length;i++)
                    {
                        Vue.set(obj.param[i],"selValue","");
                        if(obj.param[i].value && obj.param[i].value.type==0 && obj.param[i].value.data.length>0)
                        {
                            obj.param[i].selValue=obj.param[i].value.data[0].value;
                        }
                        else if(obj.param[i].value && obj.param[i].value.type==1 && obj.param[i].value.status)
                        {
                            var objStatus=null;
                            context.rootState.info.status.forEach(function (obj1) {
                                if(obj1.id==obj.param[i].value.status)
                                {
                                    objStatus=obj1;
                                }
                            })
                            if(objStatus && objStatus.data.length>0)
                            {
                                obj.param[i].selValue=objStatus.data[0].key;
                            }
                            else
                            {
                                obj.param[i].selValue="";
                            }
                        }
                        else
                        {
                            obj.param[i].selValue="";
                        }

                    }
                }
                Vue.set(obj,"selParam",$.clone(obj));
                Vue.set(obj,"selExample",{
                    id:"",
                    value:"无运行实例"
                });
                Vue.set(obj,"initParam",$.clone(obj));
            })
            context.dispatch("initBaseUrl");
        },
        setLastBaseUrl:function (context,data) {
            context.commit("info/setLastBaseUrl",data,{
                root:true
            })
        },
        changeExample:function (context,id) {
            if(id)
            {
                return net.get("/example/item",{
                    id:id
                }).then(function (data) {
                    if(data.code==200)
                    {
                        var obj={
                            query:data.data.param.query,
                            header:data.data.param.header,
                            body:data.data.param.body?data.data.param.body:[{
                                name:"",
                                type:0,
                                must:0,
                                remark:"",
                            }],
                            param:data.data.param.param,
                            bodyInfo:data.data.param.bodyInfo?data.data.param.bodyInfo:{
                                type:0,
                                rawType:0,
                                rawTextRemark:"",
                                rawFileRemark:"",
                                rawText:"",
                                rawJSON:[],
                                rawJSONType:0
                            },
                            rawJSONObject:[{
                                name:"",
                                must:1,
                                type:0,
                                remark:"",
                                show:1,
                                mock:"",
                                drag:1
                            }],
                            rawJSONArray:[{
                                name:null,
                                must:1,
                                type:0,
                                remark:"",
                                show:1,
                                mock:"",
                                drag:1
                            }],
                            before:data.data.param.before,
                            after:data.data.param.after,
                            fileResult:"",
                            resHeader:[],
                            reqHeader:{},
                            status:"",
                            second:"",
                            draw:[],
                            drawMix:[],
                            type:"object",
                            imgUrl:"",
                            resultData:"",
                            queryRawShow:0,
                            headerRawShow:0,
                            bodyRawShow:0,
                            queryRawStr:"",
                            headerRawStr:"",
                            bodyRawStr:"",
                            rawData:"",
                            encryptType:"",
                            errorCount:0,
                            run:0
                        }
                        for(var key in obj)
                        {
                            Vue.set(context.getters.curParam,key,obj[key]);
                        }
                        if(context.getters.curParam.bodyInfo.rawJSON.length==0)
                        {
                            context.getters.curParam.bodyInfo.rawJSON=context.getters.curParam.rawJSONObject;
                        }
                        var param=data.data.param;
                        if(param.type=="object")
                        {
                            param.draw=helper.format(param.rawData,0,[],context.rootState.info.status).draw;
                        }
                        else
                        {
                            param.draw=param.rawData;
                        }
                        Vue.set(context.getters.curParam,"selParam",$.clone(data.data.param));
                        Vue.set(context.getters.curParam,"selExample",{
                            id:data.data._id,
                            value:data.data.name
                        });
                        console.log('run.vue>store.js>changeExample>context.getters.curParam')
                        console.log(context.getters.curParam)
                    }
                    return data;
                })
            }
            else
            {
                var obj=$.clone(context.getters.curParam.initParam);
                for(var key in obj)
                {
                    Vue.set(context.getters.curParam,key,obj[key]);
                }
                return new Promise(function (resolve,reject) {
                    setTimeout(function () {
                        resolve({
                            code:200
                        })
                    },200);
                })
            }
        },
        saveExample:function (context,obj) {
            var obj1={
                query:context.getters.curParam.query,
                header:context.getters.curParam.header,
                body:context.getters.curParam.body,
                param:context.getters.curParam.param,
                before:context.getters.curParam.before,
                after:context.getters.curParam.after,
                run:context.getters.curParam.run
            };
            if(context.getters.curParam.run)
            {
                obj1.status=context.getters.curParam.status;
                obj1.second=context.getters.curParam.second;
                obj1.type=context.getters.curParam.type;
                obj1.rawData=context.getters.curParam.rawData;
                obj1.resHeader=context.getters.curParam.resHeader;
                obj1.reqHeader=context.getters.curParam.reqHeader
            }
            if(context.state.interface.method=="POST" || context.state.interface.method=="PUT" || context.state.interface.method=="PATCH")
            {
                obj1.bodyInfo=context.getters.curParam.bodyInfo;
            }
            var query={
                project:context.getters.interid,
                interface:context.state.interface._id,
                paramid:context.getters.curParam.id,
                param:JSON.stringify(obj1)
            }
            if(obj.type=="save")
            {
                query.id=context.getters.curParam.selExample.id;
                query.name=context.getters.curParam.selExample.value;
            }
            else if(obj.type=="saveAs")
            {
                query.name=obj.name
            }
            else if(obj.type=="rename")
            {
                query.name=obj.name;
                query.id=context.getters.curParam.selExample.id
            }
            return net.post("/example/item",query).then(function (data) {
                if(data.code==200)
                {
                    if(obj.type=="saveAs")
                    {
                        return context.dispatch("changeExample",data.data._id);
                    }
                    else if(obj.type=="rename")
                    {
                        context.getters.curParam.selExample.value=obj.name
                    }
                    else if(obj.type=="save")
                    {
                        if(context.getters.curParam.run)
                        {
                            context.getters.curParam.selParam.run=1;
                            context.getters.curParam.selParam.status=context.getters.curParam.status;
                            context.getters.curParam.selParam.second=context.getters.curParam.second;
                            context.getters.curParam.selParam.type=context.getters.curParam.type;
                            context.getters.curParam.selParam.rawData=context.getters.curParam.rawData;
                            context.getters.curParam.selParam.resHeader=context.getters.curParam.resHeader
                            context.getters.curParam.selParam.reqHeader=context.getters.curParam.reqHeader
                            if(context.getters.curParam.type=="object")
                            {
                                context.getters.curParam.selParam.draw=helper.format(context.getters.curParam.selParam.rawData,0,[],context.rootState.info.status).draw;
                            }
                        }
                    }
                }
                return data;
            })
        },
        removeExample:function (context) {
            return net.delete("/example/item",{
                id:context.getters.curParam.selExample.id
            }).then(function (data) {
                if(data.code==200)
                {
                    return context.dispatch("changeExample");
                }
                return data;
            })
        },
        joinTest:function (context) {
            var pro;
            if(context.getters.curParam.selExample.id)
            {
                pro=context.dispatch("saveExample",{
                    type:"save"
                })
            }
            else
            {
                pro=helper.delay(0);
            }

            console.log('project>info>interface>run>store.js>joinTest-curParam')
            console.log(context.getters.curParam)

            return pro.then(function () {
                var obj=$.clone(context.state.interface);
                console.log('project>info>interface>run>store.js>joinTest-context.state.interface')
                console.log(context.state.interface)

                delete obj.param;
                Object.assign(obj,{
                    paramId:context.getters.curParam.id,
                    queryParam:context.getters.curParam.query.filter(function (obj) {
                        if(obj.name)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }),
                    header:context.getters.curParam.header.filter(function (obj) {
                        if(obj.name)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }),
                    restParam:context.getters.curParam.param.filter(function (obj) {
                        if(obj.name)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }),
                    before:context.getters.curParam.before,
                    after:context.getters.curParam.after,
                    encrypt:context.getters.curParam.encrypt?context.getters.curParam.encrypt:{
                        "type":"",
                        "salt":""
                    },

                    //baseurl:"defaultUrl",
                    baseurl:context.state.interface.baseurl,

                    pullInject:0,
                    outInfo:context.getters.curParam.outInfo,
                    outParam:context.getters.curParam.result
                })
                if(context.getters.curParam.body)
                {
                    obj.bodyParam=context.getters.curParam.body.filter(function (obj) {
                        if(obj.name)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    });
                }
                if(context.getters.curParam.bodyInfo)
                {
                    obj.bodyInfo=context.getters.curParam.bodyInfo;
                }
                if(context.getters.curParam.selExample.id)
                {
                    obj.example=context.getters.curParam.selExample.id;
                }
                return obj;
            })
        }
    }
}








