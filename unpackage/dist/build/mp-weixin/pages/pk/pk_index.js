(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pk/pk_index"],{"0d17":function(t,e,a){},"51fd":function(t,e,a){"use strict";a.r(e);var n=a("c9d2"),r=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=r.a},"83c8":function(t,e,a){"use strict";var n=a("0d17"),r=a.n(n);r.a},8987:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},r=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r})},"8fc1":function(t,e,a){"use strict";a.r(e);var n=a("8987"),r=a("51fd");for(var i in r)"default"!==i&&function(t){a.d(e,t,function(){return r[t]})}(i);a("83c8");var s=a("2877"),u=Object(s["a"])(r["default"],n["a"],n["b"],!1,null,"2a54249e",null);e["default"]=u.exports},c9d2:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{$app:this.$app,starid:this.$app.getData("userStar").id,pkTimeList:[],curPkTime:{},myJoinType:"",current:0,rankList:[],pkStatus:1,timeSpace:{},list:[],rankCurrent:0,page:1,userList:[],timeLeft:""}},onShareAppMessage:function(t){var e=t.target&&t.target.dataset.share;return this.$app.commonShareAppMessage(e)},onLoad:function(t){},onShow:function(){this.loadData()},onReachBottom:function(){this.page++,this.page>10||this.loadData()},methods:{swiperChange:function(t){},dianzan:function(e){var a=this,n=e.currentTarget.dataset.uid,r=e.currentTarget.dataset.i;this.$app.request("rank/pk_dianzan",{uid:n},function(e){0==e.code?a.userList[r].total_zan++:4==e.code&&t.showModal({title:"提示",content:"今日次数已用完",showCancel:!1,confirmText:"确定"})},"POST",!0)},goUserRank:function(t){this.rankCurrent=t.currentTarget.dataset.current,this.page=1,this.loadData()},join:function(t){var e=this;wx.showModal({title:"提示",content:"是否参加今天".concat(t.currentTarget.dataset.time).concat(0==t.currentTarget.dataset.current?"钻石":"鲜花","场的团战"),success:function(a){a.confirm&&e.$app.request("rank/pk_join",{type:t.currentTarget.dataset.current||0,starid:e.$app.getData("userStar")["id"]},function(a){e.$app.toast(a.msg,"success"),e.pkTimeList[t.currentTarget.dataset.index].isJoin=t.currentTarget.dataset.current,setTimeout(function(){e.$app.goPage("/pages/pk/pk_rank?current="+t.currentTarget.dataset.current)},1e3)})}})},goPage:function(t){this.$app.goPage(t.currentTarget.dataset.page)},loadData:function(){var t=this;this.$app.request("rank/pk_status",{page:this.page,rankCurrent:parseInt(this.rankCurrent),starid:this.$app.getData("userStar")["id"]},function(e){var a;for(var n in t.shareContent=e.data.shareContent,1==t.page?t.userList=e.data.userList:t.userList=t.userList.concat(e.data.userList),t.pkTimeList=e.data.pkTime,t.arcId=e.data.arcId,t.pkStatus=e.data.status,t.curPkTime=e.data.curPkTime,t.pkTimeList)if(t.pkTimeList[n].timeLeft){a=t.pkTimeList[n].timeLeft;break}var r=t.$app.timeGethms(a);t.timeLeft=r.hour+"小时"+r.min+"分"+r.sec+"秒",clearInterval(t.timeId),t.timeId=setInterval(function(){var e=t.$app.timeGethms(--a);t.timeLeft=e.hour+"小时"+e.min+"分"+e.sec+"秒",a<=0&&clearInterval(t.timeId)},1e3)})}}};e.default=a}).call(this,a("543d")["default"])}},[["dcf0","common/runtime","common/vendor"]]]);