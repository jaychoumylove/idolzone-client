(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/headwear"],{"20e3":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){return e.e("components/badgeComponent").then(e.bind(null,"65dc"))},o=function(){return e.e("components/btnComponent").then(e.bind(null,"b111"))},r=function(){return e.e("components/modalComponent").then(e.bind(null,"5390"))},u={components:{badgeComponent:a,modalComponent:r,btnComponent:o},data:function(){return{list:[],curHeadwear:{}}},onLoad:function(){this.loadData()},onShow:function(){},onShareAppMessage:function(t){var n=t.target&&t.target.dataset.share;return this.$app.commonShareAppMessage(n)},methods:{preHead:function(t){this.curHeadwear=t},buy:function(t){var n=this;wx.showModal({title:"提示",content:"是否兑换？",success:function(e){e.confirm&&n.$app.request("headwear/buy",{hid:t.currentTarget.dataset.hid},function(t){n.$app.toast(t.msg),n.loadData()},"POST",!0)}})},use:function(t){var n=this;this.$app.request("headwear/use",{hid:t.currentTarget.dataset.hid},function(t){n.$app.toast(t.msg),n.loadData()},"POST",!0)},cancel:function(t){var n=this;this.$app.request("headwear/cancel",{},function(t){n.$app.toast(t.msg),n.loadData()},"POST",!0)},loadData:function(){var t=this;this.$app.request("headwear/select",{},function(n){t.list=n.data.list,t.curHeadwear=n.data.cur||null})}}};n.default=u},3067:function(t,n,e){"use strict";e.r(n);var a=e("20e3"),o=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);n["default"]=o.a},"4d5d":function(t,n,e){"use strict";var a=e("8ec5"),o=e.n(a);o.a},"8ec5":function(t,n,e){},ca78:function(t,n,e){"use strict";e.r(n);var a=e("f5fd"),o=e("3067");for(var r in o)"default"!==r&&function(t){e.d(n,t,function(){return o[t]})}(r);e("4d5d");var u=e("2877"),c=Object(u["a"])(o["default"],a["a"],a["b"],!1,null,"fdafdc02",null);n["default"]=c.exports},f5fd:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.$app.getData("userInfo")),a=t.$app.getData("userInfo");t.$mp.data=Object.assign({},{$root:{g0:e,g1:a}})},o=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return o})}},[["f7af","common/runtime","common/vendor"]]]);