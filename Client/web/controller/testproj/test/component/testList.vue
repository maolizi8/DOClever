<template>
    <el-tree :testid="testid" :data="data" :props="defaultProps" node-key="id"  :render-content="renderContent" highlight-current ref="tree" @current-change="info" style="font-size: 14px" empty-text="暂无模块">
    </el-tree>
</template>

<style>
    .testMenu {

    }
    .testLabel {
        margin-top: 0px;
    }
    .testRightMenu {
        display: none;
    }
    .testMenu:hover .testRightMenu {
        display: inline-block;
    }
</style>

<script type="text/jsx">
    module.exports={
        
        props:["testid"],

        data:function () {
            return {
                testid:this.testid,

                defaultProps:{
                    children:"data",
                    label:"name"
                }
            }
        },
        computed:{
            data:function () {
                // console.log('testList.vue>data-this.$store.state.data')
                // console.log(this.$store.state.data)
                return this.$store.state.data
            },
            editRole:function () {
                return this.$store.getters.editRole;
            },
			sysRole:function () {
				return session.get("role")
			},
        },
        methods:{
            addModule:function () {
                var _this=this;
                $.input("请输入模块名称",function (val) {
                    if(!val.value)
                    {
                        $.tip("请输入模块名称",0);
                        return false
                    }
                    var query={};

                    //query.project=session.get("projectId");
                    
                    query.project=_this.$store.getters.testid;
                    console.log("testList.vue>addModule>testid")
                    console.log(query.project)

                    query.name=val.value;
                    $.startHud("#body");
                    _this.$store.dispatch("addModule",query).then(function (data) {
                    
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify("新建成功",1)
                        }
                        else
                        {
                            $.notify(data.msg,0)
                        }
                    })
                });
            },
            renderContent:function(h, { node, data, store }) {

                if(node.level == 3){
                    console.log("testproj>test>component>testList.vue>renderContent>node,data,store")
                    // console.log(node)
                    // console.log(data)
                    // console.log(store)
                }
                

                return (
                        <span class="testMenu" style="display:inline-block;width:calc(100% - 45px);font-size:15px;height:26px;line-height:26px">
                            <span class="testLabel" style={{
                                height:'26px',
                                lineHeight:'26px',
                                display:'inline-block',
                                fontSize: '14px',
                                color: (node.level < 3) ? '#17B9E6' : (node.data.status == 0 ? 'black' : (node.data.status == 1 ? 'green' : 'red'))
                            }}>
                            {node.level < 3 ? (node.label + "(" + node.childNodes.length + ")") : node.label}
                            </span>
                        <span style="right: 5px;position:absolute;text-align: center;display:inline-block;" onclick="event.stopPropagation()">
                            {
                                node.level == 1 ?
                                        <div class="testRightMenu" style="height:26px;width;line-height: 26px;margin-right: 3px;" v-show={this.editRole}>
                                            <i class="el-icon-plus" style="border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;color:#17B9E6;background-color: white;font-weight: 900;margin-right:3px;"  on-click={this.addGroup.bind(this, node)} title="新建业务"></i>
                                            <i class="el-icon-edit" style="border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;color:#17B9E6;background-color: white;font-weight: 900;margin-right:3px;"  on-click={this.renameModule.bind(this, node)} title="修改名称"></i>
                                            <i class="el-icon-rank" style="border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;color:#17B9E6;background-color: white;font-weight: 900;margin-right:3px;"  on-click={this.migrateModule.bind(this, node)} title="迁移项目"></i>
                                            <i class="el-icon-delete" style="border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;color:red;background-color: white;font-weight: 900" on-click={this.removeModule.bind(this,node)} title="删除" v-show={this.sysRole==0||this.sysRole==1}></i>
                                        </div>
                                    : (node.level == 2 ?
                                        <div class="testRightMenu" style="height:26px;width;line-height: 26px;margin-right: 3px;" v-show={this.editRole}>
                                            <i class="el-icon-plus" style="border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;color:#17B9E6;background-color: white;font-weight: 900;margin-right:3px;"  on-click={this.addTest.bind(this, node)} title="新建用例"></i>
                                            <i class="el-icon-edit" style="border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;color:#17B9E6;background-color: white;font-weight: 900;margin-right:3px;"  on-click={this.addGroup.bind(this, node)} title="修改名称"></i>
                                            <i class="el-icon-delete" style="border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;color:red;background-color: white;font-weight: 900" on-click={this.removeGroup.bind(this, node)} title="删除" v-show={this.sysRole==0||this.sysRole==1}></i>
                                        </div>
                                    :
                                        <div class="testRightMenu" style="height:26px;width;line-height: 26px;margin-right: 3px;" v-show={this.editRole}>
                                            <i class="el-icon-news" style="border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;color:#17B9E6;background-color: white;font-weight: 900;margin-right:3px;" on-click={this.copyTest.bind(this, node)} title="复制"></i>
                                            <i class="el-icon-delete" style="border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;color:red;background-color: white;font-weight: 900" on-click={this.removeTest.bind(this, node)} title="删除" v-show={this.sysRole==0||this.sysRole==1}></i>
                                        </div>)

                            }
                        </span>
                    </span>
                );
            },
            addGroup:function (item) {
                var _this=this;
				console.log("testList.vue>addGroup: item")
				console.log(item)
                $.input("请输入业务名称",function (val) {
                    if(!val.value)
                    {
                        $.tip("请输入业务名称",0);
                        return false
                    }
                    $.startHud("#body");
                    _this.$store.dispatch("addGroup",{
                        node:item,
                        name:val.value,
                    }).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify("操作成功",1);
                        }
                        else
                        {
                            $.notify(data.msg,0)
                        }
                    })
                },item.label?item.label:"");

            },
            renameModule:function (item) {
                var _this=this;
				console.log("testList.vue>renameModule: item")
				console.log(item)
                $.input("请输入模块名称",function (val) {
                    if(!val.value)
                    {
                        $.tip("请输入模块名称",0);
                        return false
                    }
                    $.startHud("#body");
                    _this.$store.dispatch("addModule",{
                        node:item,
                        name:val.value,
                        type:1,
                    }).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify("修改成功",1)
                        }
                        else
                        {
                            $.notify(data.msg,0)
                        }
                    })
                },item.label);
            },
            migrateModule:function (item) {
                var _this=this;
				console.log("testList.vue>migrateModule: item")
				console.log(item)
                
                var _this=this;
                $.startHud();
                var projectGroups;

                net.get("/test/projectlist2",{}).then(function (data) {
                    $.stopHud();
                    
                    if(data.code==200)
                    {
                        projectGroups=data.data;
                    }
                    else
                    {
                        projectGroups=null;
                    }
                    
                    var child=$.showBox(_this,require("./testModuleMigration.vue"),{
                        "projectGroups":projectGroups,
                        "projectId":_this.$store.getters.testid,
                        "moduleId":item.data._id
                    })

                    child.$on("save",function (result) {
                        console.log('child.save>result')
                        console.log(result)
                        var testProjectData=_this.$store.state.data;
                        console.log('child.save>testProjectData')
                        console.log(testProjectData)

                        if (result.project!=item.data.project) {
                            for(var i=0;i<testProjectData.length;i++)
                            {
                                if(testProjectData[i]._id==result.module)
                                {
                                    testProjectData.splice(i,1);
                                    break;
                                }
                            }
                        } 
                       
                    })

                }).catch(function (err) {
                    console.log(err)
                    $.stopHud();
                    $.notify(err,0);
                })
            },


            removeModule:function (item) {
                // console.log("testList.vue>removeModule>item")
                // console.log(item)
                var _this=this;
                $.confirmdanger("是否确认删除: "+item.label+ " ? 【注意】该模块下的所有信息都会被删除!",function () {
                    $.startHud("#body");
                    _this.$store.dispatch("removeModule",item).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify("删除成功",1)
                        }
                        else
                        {
                            $.notify(data.msg,0)
                        }
                    })
                })
            },
            addTest:function (item) {
                var _this=this;
                $.input("请输入用例名称",function (val) {
                    if(!val.value)
                    {
                        $.tip("请输入用例名称",0);
                        return false
                    }
                    $.startHud("#body");
                    _this.$store.dispatch("addTest",{
                        node:item,
                        name:val.value,
                    }).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify("新建成功",1)
                        }
                        else
                        {
                            $.notify(data.msg,0)
                        }
                    })
                });
            },
            removeGroup:function (item) {
                // console.log("testList.vue>removeGroup>item")
                // console.log(item)
                var _this=this;
                $.confirmdanger("是否确认删除: "+item.label+ " ? 【注意】该业务下的所有信息都会被删除!",function () {
                    $.startHud("#body");
                    _this.$store.dispatch("removeGroup",item).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify("删除成功",1)
                        }
                        else
                        {
                            $.notify(data.msg,0)
                        }
                    })
                })
            },

            copyTest:function (item) {

                // console.log('testList.vue>copyTest>item')
                // console.log(item)
                var _this=this;
                $.confirm("是否确认复制该用例: "+item.label+ "?",function () {
                    $.startHud("#body");
                   _this.$store.dispatch("copyTest",item).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify("复制成功",1)
                        }
                        else
                        {
                            $.notify(data.msg,0)
                        }
                    })
                })

            },//gql add

            removeTest:function (item) {
                // console.log("testList.vue>removeTest>item")
                // console.log(item)
                var _this=this;
                $.confirmdanger("是否确认删除: "+item.label+ " ? 【注意】删除后该用例不可恢复!",function () {
                    $.startHud("#body");
                    _this.$store.dispatch("removeTest",item).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify("删除成功",1)
                        }
                        else
                        {
                            $.notify(data.msg,0)
                        }
                    })
                })
            },
            info:function (data,node) {
                if(node.level<3)
                {
                    return;
                }
                $.startLoading(3);
                var _this=this;

                // console.log("testList.vue>info>data")
                // console.log(data)
                // console.log("testList.vue>info>node")
                // console.log(node)

                this.$store.dispatch("info",node).then(function (data) {
                    $.stopLoading();
                    if(data.code!=200)
                    {
                        $.notify(data.msg,0);
                    }
                    else
                    {
                        _this.$nextTick(function () {
                            var ele=document.getElementById("testBasicInfo");
                            if(ele)
                            {
                                _this.$store.getters.event.$emit("initTestContent",data.data);
                            }
                            else
                            {
                                _this.$store.state.tempData=data.data;
                            }
                        })
                    }
                });
            }
        },
        mounted:function () {
            this.$store.state.tree=this.$refs.tree;
        },
        created:function () {
            this.$store.getters.event.$on("addTestModule",this.addModule);
        },
        beforeDestroy:function () {
            this.$store.getters.event.$off("addTestModule",this.addModule);
        }
    }
</script>











