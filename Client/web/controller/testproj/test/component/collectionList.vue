<template>
    <el-row class="row" :testid="testid">
        <el-row class="row" v-for="(item,index) in arr" :key="index" style="padding-left: 10px;line-height: 30px;height: 30px;font-size: 14px;color:#17B9E6;cursor: pointer " @mouseenter.native="mouseEnter($event)" @mouseleave.native="mouseLeave($event)" @click.native="info($event,item)">
            {{item.name}}
            <div class="collectionMenu" style="height:26px;width:auto;line-height: 26px;position: absolute;right: 5px;top:2px;display: none" @click="$event.stopPropagation()" v-if="editRole">
                <i class="el-icon-news icon-button" style="color:#17B9E6;"  @click="copyCollection(item)" title="复制集合"></i>
                <i class="el-icon-edit icon-button" style="color:#17B9E6;"  @click="renameCollection(item)" title="修改名称"></i>
                <i class="el-icon-delete icon-button" style="color:red;" @click="remove(item,index)" title="删除" v-if="sysRole==0||sysRole==1"></i>
            </div>
        </el-row>
    </el-row>
</template>

<style>
.icon-button{
    border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;background-color: white;font-weight: 900;
}
/*border: 1px rgba(226, 226, 226, 0.71) solid;font-size: 12px;padding: 2px;color:red;background-color: white;font-weight: 900*/
</style>

<script>
    module.exports = {
        props:["testid"],
        data: function () {
            return {
                testid:this.testid,

                lastEle:null
            }
        },
        computed:{
            arr:function () {
                return this.$store.state.collection;
            },
            editRole:function () {
                return this.$store.getters.editRole;
            },
			sysRole:function () {
				return session.get("role")
			},
        },
        methods: {
            mouseEnter:function (event) {
                if(!event.target.hasAttribute("select"))
                {
                    event.target.style.backgroundColor='#f3f3f3';
                }
                var ele=event.target.querySelector(".collectionMenu");
                ele.style.display="block"
            },
            mouseLeave:function (event) {
                if(!event.target.hasAttribute("select"))
                {
                    event.target.style.backgroundColor='white';
                }
                var ele=event.target.querySelector(".collectionMenu");
                ele.style.display="none"
            },
            info:function (event,item) {
                if(this.lastEle)
                {
                    this.lastEle.style.backgroundColor="white";
                    this.lastEle.style.color="#17B9E6";
                    this.lastEle.removeAttribute("select")
                }
                this.lastEle=event.target;
                this.lastEle.setAttribute("select",1);
                this.lastEle.style.backgroundColor="rgb(238,246,255)";
                $.startLoading(3);
                var _this=this;
                this.$store.dispatch("collectionInfo",item._id).then(function (data) {
                    $.stopLoading();
                    if(data.code!=200)
                    {
                        $.notify(data.msg,0);
                    }
                });
            },
            renameCollection:function (item) {
                var _this=this;
				console.log("collectionList.vue>renameCollection: item")
				console.log(item)
                $.input("请输入集合名称",function (val) {
                    if(!val.value)
                    {
                        $.tip("请输入集合名称",0);
                        return;
                    }
                    _this.$store.dispatch("renameCollection",{
                        id:item._id,
                        name:val.value
                    }).then(function (data) {
                        if(data.code==200)
                        {
                            item.name=val.value;
                            if(_this.$store.state.selCollection && _this.$store.state.selCollection._id==item._id)
                            {
                                _this.$store.state.selCollection.name=item.name
                            }
                            $.notify("修改成功",1);
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                },item.name)
            },
            remove:function (item,index) {
                var _this=this;
                console.log('removeCollection>item')
                console.log(item)
                var title="确认删除该集合："+item.name+" ?"
                $.confirm(title,function () {
                    _this.$store.dispatch("removeCollection",item._id).then(function (data) {
                        if(data.code)
                        {
                            $.notify("删除成功",1)
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                })
            },
            addCollection:function () {
                var _this=this;
                $.input("请输入集合名称",function (val) {
                    if(!val.value)
                    {
                        $.tip("请输入集合名称",0);
                        return;
                    }
                    _this.$store.dispatch("addCollection",val.value).then(function (data) {
                        if(data.code==200)
                        {
                            $.notify("新建成功",1);
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                })
            },
            copyCollection:function (item) {
                console.log('copyCollection>item')
                console.log(item)
                var _this=this;
                var title="确认要复制集合："+item.name+" ?"
                $.confirm(title,function () {
                    _this.$store.dispatch("copyCollection",item).then(function (data) {
                        _this.savePending=false;
                        if(data.code==200)
                        {   
                            $.notify("复制成功",1);
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                })
            }
        },
        created:function () {
            this.$store.getters.event.$on("addCollection",this.addCollection);
        },
        beforeDestroyed:function () {
            this.$store.getters.event.$off("addCollection",this.addCollection);
        }
    }
</script>








