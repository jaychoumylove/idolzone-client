(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"2c70":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.$app.getData("config")),a=t.$app.getData("config"),i=t.$app.getData("config"),o=t.$app.getData("config"),r=t.$app.getData("config"),s=t.$app.formatNumber(t.rankList[1]&&t.rankList[1].hot||0),p=t.$app.formatNumber(t.rankList[0]&&t.rankList[0].hot||0),g=t.$app.formatNumber(t.rankList[2]&&t.rankList[2].hot||0),u=t.__map(t.rankList,function(n,e){var a=t.$app.formatNumber(n.hot);return{$orig:t.__get_orig(n),g8:a}}),c=t.$app.getData("config"),d=t.$app.getData("config"),f=t.$app.getData("config"),h=t.$app.getData("config");t._isMounted||(t.e0=function(n){return t.$app.goPage("/pages/notice/notice?id=1")},t.e1=function(n){return t.$app.goPage("/pages/index/fengyun")},t.e2=function(n){t.$app.goPage(t.$app.getData("config").index_banner.url)},t.e3=function(n){t.changeField("week_hot"),t.getSunday()},t.e4=function(n){t.changeField("month_hot_flower"),t.getLast()},t.e5=function(n){t.changeField("month_hot_coin"),t.getLast()},t.e6=function(n){return t.$app.goPage("/pages/user/dashen_rank")},t.e7=function(n){return t.$app.goPage("/pages/index/rank")},t.e8=function(n){t.modal="",t.$app.goPage(t.$app.getData("config").index_open.url)},t.e9=function(n){t.modal=""}),t.$mp.data=Object.assign({},{$root:{g0:e,g1:a,g2:i,g3:o,g4:r,g5:s,g6:p,g7:g,l0:u,g9:c,g10:d,g11:f,g12:h}})},i=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i})},"669c":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){return e.e("components/modalComponent").then(e.bind(null,"5390"))},i=function(){return e.e("components/bannerComponent").then(e.bind(null,"5903"))},o=function(){return e.e("components/btnComponent").then(e.bind(null,"b111"))},r=function(){return e.e("components/listItemComponent").then(e.bind(null,"8d4d"))},s={components:{bannerComponent:i,btnComponent:o,listItemComponent:r,modalComponent:a},data:function(){return{$app:this.$app,theme:this.$app.getData("theme")||0,modal:"indexBanner",showBottomLoading:!0,page:1,keywords:"",rankField:"week_hot",sign:0,rankList:this.$app.getData("index_rankList")||[],topImg:{},cutOffDate:""}},onLoad:function(t){return this.getSunday(),t.path?this.$app.goPage(t.path):t.starid?(this.starid=t.starid,this.goGroup(this.starid)):void 0},onShow:function(){this.page=1,this.keywords="",this.getRankList(),this.getBannerList()},onShareAppMessage:function(){return this.$app.commonShareAppMessage()},onHide:function(){t.pageScrollTo({scrollTop:0,duration:0})},onReachBottom:function(){~this.rankField.indexOf("last")||(this.page++,this.getRankList())},methods:{goGroup:function(t){this.modal="qrcode",this.$app.getData("userStar")["id"]==t?this.$app.goPage("/pages/group/group"):this.$app.goPage("/pages/group/star?starid="+t)},getLast:function(){var t=new Date,n=t.getMonth(),e=++n,a=new Date(t.getFullYear(),e,1),i=864e5,o=new Date(a-i);this.cutOffDate=o.getMonth()+1+"月"+o.getDate()+"日"},getSunday:function(){var t=new Date,n=t.getDay()||7;t.setDate(t.getDate()-n+7),this.cutOffDate=t.getMonth()+1+"月"+t.getDate()+"日"},changeField:function(t){this.page=1,this.rankField=t,this.keywords="",this.getRankList()},searchInput:function(t){this.keywords&&t.detail.value||(this.rankList=[]),this.page=1,this.sign=0,this.rankField="week_hot",this.keywords=t.detail.value,this.getRankList()},getBannerList:function(){var t=this;this.$app.request("banner/top",{},function(n){t.topImg=n.data})},getRankList:function(){var t=this;this.$app.request(this.$app.API.STAR_RANK,{page:this.page,rankField:this.rankField,keywords:this.keywords,sign:this.sign},function(n){"fengyun"!=t.rankField?(n.data.length<10&&(t.showBottomLoading=!1),1==t.page?(t.rankList=n.data,t.$app.setData("index_rankList",n.data)):t.rankList=t.rankList.concat(n.data)):1==t.page?t.rankList=n.data:t.rankList=t.rankList.concat(n.data)})}}};n.default=s}).call(this,e("543d")["default"])},"7d5e":function(t,n,e){"use strict";e.r(n);var a=e("2c70"),i=e("c450");for(var o in i)"default"!==o&&function(t){e.d(n,t,function(){return i[t]})}(o);e("c802");var r=e("2877"),s=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"172b9836",null);n["default"]=s.exports},b1a3:function(t,n,e){},c450:function(t,n,e){"use strict";e.r(n);var a=e("669c"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=i.a},c802:function(t,n,e){"use strict";var a=e("b1a3"),i=e.n(a);i.a}},[["6bd9","common/runtime","common/vendor"]]]);