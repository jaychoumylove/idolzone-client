(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/headwear"],{"049c":function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement,a=(t._self._c,t.$app.getData("userInfo")),e=t.$app.getData("userInfo");t.$mp.data=Object.assign({},{$root:{g0:a,g1:e}})},o=[];a.d(n,"a",function(){return e}),a.d(n,"b",function(){return o})},1597:function(t,n,a){},"20e3":function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=function(){return a.e("components/badgeComponent").then(a.bind(null,"65dc"))},o=function(){return a.e("components/btnComponent").then(a.bind(null,"b111"))},r=function(){return a.e("components/modalComponent").then(a.bind(null,"5390"))},u={components:{badgeComponent:e,modalComponent:r,btnComponent:o},data:function(){return{list:[],curHeadwear:{}}},onLoad:function(){this.loadData()},onShow:function(){},onShareAppMessage:function(t){var n=t.target&&t.target.dataset.share;return this.$app.commonShareAppMessage(n)},methods:{preHead:function(t){this.curHeadwear=t.currentTarget.dataset.cur},buy:function(t){var n=this;wx.showModal({title:"提示",content:"是否兑换？",success:function(a){a.confirm&&n.$app.request("headwear/buy",{hid:t.currentTarget.dataset.hid},function(t){n.$app.toast(t.msg),n.loadData()},"POST",!0)}})},use:function(t){var n=this;this.$app.request("headwear/use",{hid:t.currentTarget.dataset.hid},function(t){n.$app.toast(t.msg),n.loadData()},"POST",!0)},cancel:function(t){var n=this;this.$app.request("headwear/cancel",{},function(t){n.$app.toast(t.msg),n.loadData()},"POST",!0)},loadData:function(){var t=this;this.$app.request("headwear/select",{},function(n){t.list=n.data.list,t.curHeadwear=n.data.cur||null})}}};n.default=u},3067:function(t,n,a){"use strict";a.r(n);var e=a("20e3"),o=a.n(e);for(var r in e)"default"!==r&&function(t){a.d(n,t,function(){return e[t]})}(r);n["default"]=o.a},"9a70":function(t,n,a){"use strict";var e=a("1597"),o=a.n(e);o.a},ca78:function(t,n,a){"use strict";a.r(n);var e=a("049c"),o=a("3067");for(var r in o)"default"!==r&&function(t){a.d(n,t,function(){return o[t]})}(r);a("9a70");var u=a("2877"),c=Object(u["a"])(o["default"],e["a"],e["b"],!1,null,"4db4d38c",null);n["default"]=c.exports}},[["f7af","common/runtime","common/vendor"]]]);