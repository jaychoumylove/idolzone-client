(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/task/task"],{"1dad":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=function(){return e.e("components/btnComponent").then(e.bind(null,"b111"))},s=function(){return e.e("components/modalComponent").then(e.bind(null,"5390"))},i={components:{btnComponent:n,modalComponent:s},data:function(){return{$app:this.$app,requestCount:1,taskList:this.$app.getData("taskList")||[],modal:"",shareText:"",weiboUrl:"",weibo_zhuanfa:{},current:1}},onShow:function(){this.getTaskList()},onLoad:function(){this.getShareText()},onShareAppMessage:function(t){var a=t.target&&t.target.dataset.share;return this.$app.commonShareAppMessage(a)},methods:{openAdver:function(){var t=this;this.$app.openVideoAd(function(){t.taskSettle(19)})},clipboard:function(){var a=this;t.setClipboardData({data:this.shareText,success:function(){a.$app.toast("复制成功","success")}})},weiboCommit:function(){var t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.weiboUrl&&this.$app.request(this.$app.API.TASK_WEIBO,{weiboUrl:this.weiboUrl,type:a},function(a){t.$app.toast("提交成功","success"),t.modal="",t.weiboUrl="",t.getTaskList()})},useBadge:function(t){var a=this;if(0==t.status){if(1==t.type)return}else this.$app.request("badge/use",{badge_id:t.id},function(t){a.getTaskList()},"POST",!0)},doTask:function(t,a){0==t.status?8==t.id?this.modal="weibo":9==t.id?this.modal="weibo_zhuanfa":19==t.id?this.openAdver():t.gopage&&this.$app.goPage(t.gopage):1==t.status&&(this.taskList[a].status=2,this.taskSettle(t.id))},taskSettle:function(t){var a=this;this.$app.request(this.$app.API.TASK_SETTLE,{task_id:t},function(t){var e="领取成功";t.data.coin&&(e+="，金豆+"+t.data.coin),t.data.flower&&(e+="，鲜花+"+t.data.flower),t.data.stone&&(e+="，钻石+"+t.data.stone),t.data.trumpet&&(e+="，喇叭+"+t.data.trumpet),a.$app.toast(e),a.getTaskList(),a.$app.request(a.$app.API.USER_CURRENCY,{},function(t){a.$app.setData("userCurrency",t.data)})},"POST",!0)},getShareText:function(){var t=this;this.$app.request(this.$app.API.EXT_SHARETEXT,{},function(a){t.shareText=a.data.share_text,t.weibo_zhuanfa=a.data.weibo_zhuanfa})},getTaskList:function(){var t=this;this.$app.request(this.$app.API.TASK,{type:this.current},function(a){t.taskList=a.data,t.$app.setData("taskList",a.data)})}}};a.default=i}).call(this,e("543d")["default"])},2244:function(t,a,e){},2801:function(t,a,e){"use strict";e.r(a);var n=e("a6ae"),s=e("5498");for(var i in s)"default"!==i&&function(t){e.d(a,t,function(){return s[t]})}(i);e("a850");var o=e("2877"),u=Object(o["a"])(s["default"],n["a"],n["b"],!1,null,"7c9a8eaa",null);a["default"]=u.exports},5498:function(t,a,e){"use strict";e.r(a);var n=e("1dad"),s=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,function(){return n[t]})}(i);a["default"]=s.a},a6ae:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=(t._self._c,t.$app.getData("config")),n=t.$app.getVal("VERSION"),s=t.$app.getData("sysInfo").system.indexOf("iOS"),i=t.$app.getData("config"),o=t.$app.getData("config");t._isMounted||(t.e0=function(a){t.modal=""},t.e1=function(a){return t.$app.copy(this.shareText)},t.e2=function(a){t.weiboUrl=a.detail.value},t.e3=function(a){t.modal=""},t.e4=function(a){t.weiboUrl=a.detail.value}),t.$mp.data=Object.assign({},{$root:{g0:e,g1:n,g2:s,g3:i,g4:o}})},s=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return s})},a850:function(t,a,e){"use strict";var n=e("2244"),s=e.n(n);s.a}},[["0eb6","common/runtime","common/vendor"]]]);