(function(){var t={6789:function(t,e,i){"use strict";var a=i(9242),n=i(7173),r=(i(4415),i(3396)),l=i(7139);const s={style:{flex:"auto"}};function o(t,e,i,a,n,o){const u=(0,r.up)("el-input"),c=(0,r.up)("el-table-column"),d=(0,r.up)("el-button"),h=(0,r.up)("el-table"),f=(0,r.up)("el-drawer"),p=(0,r.Q2)("loading");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(u,{modelValue:t.search,"onUpdate:modelValue":e[0]||(e[0]=e=>t.search=e),placeholder:"输入姓名或学号筛选",clearable:""},null,8,["modelValue"]),(0,r.wy)(((0,r.wg)(),(0,r.j4)(h,{data:t.tableData.filter((e=>!t.search||-1!==e.name.indexOf(t.search)||-1!==e.id.indexOf(t.search))),style:{width:"100%",height:"calc(90vh - 32px)"},"row-class-name":t.tableRowClassName},{default:(0,r.w5)((()=>[(0,r.Wm)(c,{prop:"id",label:"学号",width:"110"}),(0,r.Wm)(c,{prop:"name",label:"姓名"}),(0,r.Wm)(c,{prop:"status",label:"核酸状态",width:"100",filters:[{text:"未完成",value:"未完成"},{text:"已完成",value:"已完成"}],"filter-method":t.filterStatus},null,8,["filter-method"]),(0,r.Wm)(c,{fixed:"right",label:"操作",width:"70"},{default:(0,r.w5)((e=>["未完成"==e.row.status?((0,r.wg)(),(0,r.j4)(d,{key:0,link:"",type:"primary",size:"small",onClick:i=>t.handleFinish(e.$index,e.row)},{default:(0,r.w5)((()=>[(0,r.Uk)("完成")])),_:2},1032,["onClick"])):((0,r.wg)(),(0,r.j4)(d,{key:1,link:"",type:"warning",size:"small",onClick:i=>t.handleUndone(e.$index,e.row)},{default:(0,r.w5)((()=>[(0,r.Uk)("未完成")])),_:2},1032,["onClick"]))])),_:1})])),_:1},8,["data","row-class-name"])),[[p,t.loading]]),(0,r.Wm)(f,{modelValue:t.confirmDialogVisible,"onUpdate:modelValue":e[1]||(e[1]=e=>t.confirmDialogVisible=e),direction:"btt"},{title:(0,r.w5)((()=>[(0,r._)("h4",null,(0,l.zw)(t.name),1)])),default:(0,r.w5)((()=>[(0,r._)("div",null,[(0,r.Uk)("请确认是否"),(0,r._)("span",{style:(0,l.j5)("已完成"==t.tips?"color:var(--el-color-success)":"color:var(--el-color-warning)")},(0,l.zw)(t.tips),5),(0,r.Uk)("核酸检测？")])])),footer:(0,r.w5)((()=>[(0,r._)("div",s,[(0,r.Wm)(d,{onClick:t.cancelClick},{default:(0,r.w5)((()=>[(0,r.Uk)("取消")])),_:1},8,["onClick"]),(0,r.Wm)(d,{type:"primary",onClick:t.confirmClick},{default:(0,r.w5)((()=>[(0,r.Uk)("确认")])),_:1},8,["onClick"])])])),_:1},8,["modelValue"])],64)}i(7658);var u=i(7178),c=i(70),d=i(5410),h=i.n(d);const f=c.ZP.create({baseURL:"https://lyrbbding.site/lyr",timeout:3e3}),p=["POST","post","PUT","put"],m=["GET","get","DELETE","delete"];f.interceptors.request.use((t=>(t.method&&p.includes(t.method)?t.data=h().stringify(t.data):t.method&&m.includes(t.method)&&(t.params=h().parse(t.data),t.data=void 0),t)),(t=>t)),f.interceptors.response.use((t=>Promise.resolve(t)),(t=>t));var b=f;const w={nuclear_list:"/nuclear_list",nuclear_update:"/nuclear_update"};var g=w,v=t=>new Promise(((e,i)=>{b({url:g[t.url],data:t.data||{},method:t.method||"GET",responseType:t.responseType||"json"}).then((t=>{e(t.data)})).catch((t=>{i(t)}))})),k=(0,r.aZ)({name:"App",data(){let t="",e=!0,i=!1,a=[],n="",r="",l="",s="",o=-1;return{search:t,loading:e,confirmDialogVisible:i,tableData:a,tips:n,setStatus:r,id:l,name:s,currentIndex:o}},mounted(){v({url:"nuclear_list"}).then((t=>{this.tableData.push(...t.res)})).catch((()=>{u.z8.error("网络异常，请稍后再试")})).finally((()=>{this.loading=!1}))},methods:{filterStatus(t,e){return e.status===t},tableRowClassName({row:t,rowIndex:e}){return"未完成"==t.status?"warning-row":"已完成"==t.status?"success-row":void 0},handleFinish(t,e){if(e.id==this.tableData[t].id)this.currentIndex=t;else for(let i=0;i<this.tableData.length;i++)if(e.id==this.tableData[i].id){this.currentIndex=i;break}this.confirmDialogVisible=!0,this.tips="已完成",this.name=`${this.tableData[this.currentIndex].name}同学`,this.setStatus="finish"},handleUndone(t,e){if(e.id==this.tableData[t].id)this.currentIndex=t;else for(let i=0;i<this.tableData.length;i++)if(e.id==this.tableData[i].id){this.currentIndex=i;break}this.confirmDialogVisible=!0,this.tips="尚未完成",this.name=`${this.tableData[this.currentIndex].name}同学`,this.setStatus="undone"},cancelClick(){this.confirmDialogVisible=!1,this.currentIndex=-1,this.tips="",this.setStatus="",this.id="",this.name="",(0,u.z8)("操作取消")},confirmClick(){let t=this.currentIndex;if(this.id!=this.tableData[t].id)for(let e=0;e<this.tableData.length;e++)if(this.id==this.tableData[e].id){t=e;break}v({url:"nuclear_update",method:"POST",data:{id:this.tableData[t].id,date:this.tableData[t].date,status:"finish"==this.setStatus?1:0}}).then((e=>{0===e.errCode?(this.tableData[t].status="finish"==this.setStatus?"已完成":"未完成",u.z8.success("操作成功")):u.z8.error("操作失败，请重试")})).catch((()=>{u.z8.error("网络异常，请稍后再试")})).finally((()=>{this.confirmDialogVisible=!1,this.currentIndex=-1,this.tips="",this.setStatus="",this.id="",this.name=""}))}}}),y=i(89);const D=(0,y.Z)(k,[["render",o]]);var x=D;const _=(0,a.ri)(x);_.use(n.Z),_.mount("#app")},4654:function(){}},e={};function i(a){var n=e[a];if(void 0!==n)return n.exports;var r=e[a]={exports:{}};return t[a].call(r.exports,r,r.exports,i),r.exports}i.m=t,function(){var t=[];i.O=function(e,a,n,r){if(!a){var l=1/0;for(c=0;c<t.length;c++){a=t[c][0],n=t[c][1],r=t[c][2];for(var s=!0,o=0;o<a.length;o++)(!1&r||l>=r)&&Object.keys(i.O).every((function(t){return i.O[t](a[o])}))?a.splice(o--,1):(s=!1,r<l&&(l=r));if(s){t.splice(c--,1);var u=n();void 0!==u&&(e=u)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[a,n,r]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var a in e)i.o(e,a)&&!i.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={826:0};i.O.j=function(e){return 0===t[e]};var e=function(e,a){var n,r,l=a[0],s=a[1],o=a[2],u=0;if(l.some((function(e){return 0!==t[e]}))){for(n in s)i.o(s,n)&&(i.m[n]=s[n]);if(o)var c=o(i)}for(e&&e(a);u<l.length;u++)r=l[u],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(c)},a=self["webpackChunknuclear_ts_frontend"]=self["webpackChunknuclear_ts_frontend"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=i.O(void 0,[998],(function(){return i(6789)}));a=i.O(a)})();
//# sourceMappingURL=index.bd0e1248.js.map