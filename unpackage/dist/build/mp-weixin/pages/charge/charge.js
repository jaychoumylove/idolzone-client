(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/charge/charge"],{"33ee":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.$app.getData("config")),a=t.$app.getData("config"),i=t.$app.getData("sysInfo").system.indexOf("iOS"),r=t.$app.getData("config"),o=t.__map(t.rechargeList,function(e,n){var a=t.$app.formatNumber(e.flower,0);return{$orig:t.__get_orig(e),g4:a}}),s=t.__map(t.rechargeList,function(e,n){var a=t.$app.formatNumber(e.flower,0);return{$orig:t.__get_orig(e),g5:a}}),u=t.__map(t.rechargeList,function(e,n){var a=t.$app.formatNumber(e.flower,0);return{$orig:t.__get_orig(e),g6:a}}),p=t.$app.getData("config"),c=t.$app.getData("config"),d=t.__map(t.rechargeList,function(e,n){var a=t.$app.formatNumber(e.flower,1);return{$orig:t.__get_orig(e),g9:a}});t._isMounted||(t.e0=function(e){t.modal="proxyRecharge"},t.e1=function(e){t.tabActive=1},t.e2=function(e){t.tabActive=0},t.e3=function(e){t.modal=""},t.e4=function(e){t.currentUserid=e.detail.value}),t.$mp.data=Object.assign({},{$root:{g0:n,g1:a,g2:i,g3:r,l0:o,l1:s,l2:u,g7:p,g8:c,l3:d}})},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"4bf8":function(t,e,n){"use strict";var a=n("fb4a"),i=n.n(a);i.a},"72dc":function(t,e,n){"use strict";(function(t){var a;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return n.e("components/btnComponent").then(n.bind(null,"b111"))},r=function(){return n.e("components/badgeComponent").then(n.bind(null,"65dc"))},o=function(){return n.e("components/modalComponent").then(n.bind(null,"5390"))},s={components:{btnComponent:i,badgeComponent:r,modalComponent:o},data:function(){return{$app:this.$app,modal:"",requestCount:1,tabActive:0,userInfo:{avatarurl:this.$app.getData("userInfo")["avatarurl"]||this.$app.AVATAR,nickname:this.$app.getData("userInfo")["nickname"]||this.$app.NICKNAME,id:this.$app.getData("userInfo")["id"]||null},userCurrency:this.$app.getData("userCurrency")||{coin:0,stone:0,trumpet:0},rechargeList:this.$app.getData("goodsList")||[],tehui_show:!1,discount:{},discount_option:[],discount_option_index:0,currentUser:{},currentUserid:""}},onLoad:function(){var t=this;this.getGoodsList(0);var e=setInterval(function(){t.$app.getData("userInfo").nickname&&(clearInterval(e),t.userInfo=t.$app.getData("userInfo"),t.userCurrency=t.$app.getData("userCurrency"))},300)},onUnload:function(){clearInterval(a)},methods:{kickBack:function(){},confirm:function(){this.currentUser.nickname?(this.userInfo=this.currentUser,this.modal=""):this.$app.toast("请先查找用户")},searchUser:function(){var t=this;if(this.currentUserid){var e=Math.round(this.currentUserid/1234);this.$app.request("user/info",{user_id:e},function(e){e.data.nickname?t.currentUser=e.data:t.$app.toast("未找到用户")},"POST",!0)}},payment:function(e){var n=this;"MP-QQ"!=this.$app.getData("platform")?this.$app.request(this.$app.API.PAY_ORDER,{goods_id:e,userprop_id:this.discount.userprop_id,user_id:this.userInfo.id},function(e){t.requestPayment({provider:"wxpay",timeStamp:e.data.timeStamp,nonceStr:e.data.nonceStr,package:e.data.package,signType:e.data.signType,paySign:e.data.paySign,success:function(t){n.$app.toast("支付成功","success"),n.$app.request(n.$app.API.USER_CURRENCY,{},function(t){n.$app.setData("userCurrency",t.data),n.userCurrency=n.$app.getData("userCurrency"),n.modal=""}),n.getGoodsList(0)},fail:function(t){n.$app.toast("支付失败")}})},"POST",!0):this.$app.getData("config").version!=this.$app.VERSION?this.$app.preImg(this.$app.getData("config").qq_tips_img):this.$app.modal("抱歉，QQ支付暂无法使用")},getGoodsList:function(t){var e=this;this.$app.request(this.$app.API.PAY_GOODS,{userprop_id:t},function(t){e.tehui_show=t.data.tehui_show,e.rechargeList=t.data.list,e.discount=t.data.discount,e.discount_option=t.data.discount_option,e.$app.setData("goodsList",e.rechargeList)})},bindPickerChange:function(t){this.discount_option_index=t.target.value,this.getGoodsList(this.discount_option[this.discount_option_index].id)}}};e.default=s}).call(this,n("543d")["default"])},7476:function(t,e,n){"use strict";n.r(e);var a=n("72dc"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=i.a},e740:function(t,e,n){"use strict";n.r(e);var a=n("33ee"),i=n("7476");for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n("4bf8");var o=n("2877"),s=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,"161b05c2",null);e["default"]=s.exports},fb4a:function(t,e,n){}},[["ed45","common/runtime","common/vendor"]]]);