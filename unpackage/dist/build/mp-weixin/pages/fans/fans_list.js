(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/fans/fans_list"],{2976:function(t,n,e){"use strict";var a=e("e189"),i=e.n(a);i.a},"38d4":function(t,n,e){"use strict";e.r(n);var a=e("b1a7"),i=e("4f26");for(var s in i)"default"!==s&&function(t){e.d(n,t,function(){return i[t]})}(s);e("2976");var o=e("2877"),u=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,"fdedf7f2",null);n["default"]=u.exports},"4f26":function(t,n,e){"use strict";e.r(n);var a=e("7ecc"),i=e.n(a);for(var s in a)"default"!==s&&function(t){e.d(n,t,function(){return a[t]})}(s);n["default"]=i.a},"7ecc":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){return e.e("components/btnComponent").then(e.bind(null,"b111"))},i={components:{btnComponent:a},data:function(){return{myClub:null,keyword:"",page:1,list:[],active:"fansclub_count"}},onShow:function(){this.getMyFansClub(),this.getList()},onReachBottom:function(){this.page++,this.getList()},onShareAppMessage:function(t){var n=t.target&&t.target.dataset.share;return this.$app.commonShareAppMessage(n)},methods:{changeField:function(t){this.active=t,this.page=1,this.getList()},setKeyword:function(t){this.keyword=t.detail.value,this.page=1,this.getList()},join:function(t){var n=this;t.star_id==this.$app.getData("userStar").id?this.$app.modal("是否加入".concat(t.clubname,"粉丝团"),function(){n.$app.request("fans/join",{id:t.id},function(t){n.$app.toast("加入成功！","success"),n.getMyFansClub(),n.getList()},"POST",!0)},"加入"):this.$app.toast("请加入".concat(this.$app.getData("userStar").name,"的粉丝圈"))},getMyFansClub:function(){var t=this;this.$app.request("fans/info",{},function(n){t.myClub=n.data})},getList:function(){var t=this;this.$app.request("fans/list",{keyword:this.keyword,page:this.page,field:this.active},function(n){1==t.page?t.list=n.data:t.list=t.list.concat(n.data)})}}};n.default=i},b1a7:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){return t.$app.goPage("/pages/fans/fans_new")},t.e1=function(n){return t.$app.goPage("/pages/fans/fans_club?fid="+t.myClub.id)})},i=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i})},e189:function(t,n,e){}},[["383a","common/runtime","common/vendor"]]]);