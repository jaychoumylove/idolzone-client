(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/active_one/active_one"],{"05fc":function(t,a,e){"use strict";var n=e("a07c"),i=e.n(n);i.a},"4e4f":function(t,a,e){"use strict";e.r(a);var n=e("d945"),i=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(a,t,function(){return n[t]})}(s);a["default"]=i.a},"6c35":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=(t._self._c,t.$app.getData("platform")),n=t.$app.getData("platform"),i=t.$app.getData("config");t._isMounted||(t.e0=function(a){t.modal=""},t.e1=function(a){t.modal="otherShareW"},t.e2=function(a){t.drawCanvas(),t.modal="otherShareP"},t.e3=function(a){t.modal=""},t.e4=function(a){t.modal=""},t.e5=function(a){t.getShareText(3),t.saveCanvas()}),t.$mp.data=Object.assign({},{$root:{g0:e,g1:n,g2:i}})},i=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return i})},a07c:function(t,a,e){},d945:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=function(){return e.e("components/modalComponent").then(e.bind(null,"5390"))},i=function(){return e.e("components/btnComponent").then(e.bind(null,"b111"))},s={components:{modalComponent:n,btnComponent:i},data:function(){return{$app:this.$app,star:{},activeInfo:{active_info:{target_people:2e3},can_card:!0,complete_people:0,join_people:0,left_time:"0天0小时0分",my_card_days:0},userRank:[],modal:"",cardOverContent:"",article:this.$app.getData("config").active_notice}},onShareAppMessage:function(t){t.target&&t.target.dataset.share;return this.$app.commonShareAppMessage(5)},onLoad:function(t){this.id=t.id||0},onShow:function(){this.starid=this.$app.getData("userStar").id,this.starid?(this.getActiveInfo(),this.getStarInfo(),this.getActiveUserRank()):this.$app.toast("请先加入一个圈子")},methods:{preImg:function(t){this.$app.preImg(t)},getLocalImg:function(a,e){~a.indexOf("http")?t.getImageInfo({src:a,success:function(t){e&&e(t.path)}}):e&&e(a)},getShareText:function(t){var a=this;this.$app.request(this.$app.API.EXT_SHARETEXT,{type:t},function(t){a.modal="",a.$app.copy(t.data.share_text)})},drawCanvas:function(){var a=this,e=this.$app.getData("sysInfo").windowWidth/375/2,n=t.createCanvasContext("mycanvas",this),i=function(){n.setFillStyle("#000000"),n.setFontSize(18),n.setTextAlign("center"),n.fillText(this.star.name,140*e,535*e),n.setFontSize(10),n.fillText("榜单排名:NO.".concat(this.star.weekRank),335*e,515*e),n.fillText("人气值:".concat(this.star.weekHot),335*e,545*e),n.setTextAlign("left"),n.fillText("我是".concat(this.$app.getData("userInfo").nickname),140*e,670*e),n.fillText("一起pick".concat(this.star.name),140*e,700*e)}.bind(this);t.showLoading({title:"生成海报中"}),this.getLocalImg("/static/image/canvas-bg.jpg",function(s){n.drawImage(s,0,0,480*e,854*e),a.getLocalImg(a.star.share_img||a.star.avatar,function(s){n.drawImage(s,48*e,176*e,382*e,300*e),a.getLocalImg(a.$app.getData("userInfo").avatarurl||a.$app.AVATAR,function(s){n.save(),n.beginPath(),n.arc(85*e,675*e,40*e,0,2*Math.PI,!1),n.clip(),n.drawImage(s,45*e,635*e,80*e,80*e),n.restore(),a.$app.getData("config").version==a.$app.getData("VERSION")&&a.$app.setData("qrcode","/static/image/def.jpg"),a.getLocalImg(a.$app.getData("qrcode")||a.$app.QRCODE,function(s){n.save(),n.beginPath(),n.arc(380*e,675*e,50*e,0,2*Math.PI,!1),n.clip(),n.drawImage(s,330*e,625*e,100*e,100*e),n.restore(),i(),n.draw(!1,function(){t.canvasToTempFilePath({canvasId:"mycanvas",success:function(t){a.canvasImg=t.tempFilePath,console.log(a.canvasImg),a.saveCanvas()}},a)}),t.hideLoading()})})})})},saveCanvas:function(){var a=this;t.saveImageToPhotosAlbum({filePath:this.canvasImg,success:function(){a.$app.toast("保存成功","success")},fail:function(t){console.log(t)}})},getStarInfo:function(){var t=this;this.$app.request(this.$app.API.STAR_INFO,{starid:this.starid},function(a){var e=a.data;t.star={id:e.id,avatar:e.head_img_s?e.head_img_s:e.head_img_l,name:e.name,weekHot:t.$app.formatNumberRgx(e.star_rank.week_hot),weekRank:e.star_rank.week_hot_rank,share_img:e.share_img},t.$app.closeLoading(t)})},card:function(){var t=this;this.$app.getData("userStar").id==this.starid?this.activeInfo.self.is_card_today?(this.modal="cardOver",this.$app.toast("今日已打卡")):this.$app.openVideoAd(function(){t.$app.request(t.$app.API.EXT_ACTIVECARD,{starid:t.starid,active_id:t.id},function(a){t.modal="cardOver",t.getActiveInfo(),t.getActiveUserRank(),t.$app.toast("今日打卡成功","success")},"POST",!0)}):this.$app.toast("你怎么能为别的爱豆打卡呢")},getActiveUserRank:function(){var t=this;this.$app.request(this.$app.API.EXT_ACTIVE_USERRANK,{starid:this.starid,active_id:this.id},function(a){t.userRank=a.data})},getActiveInfo:function(){var t=this;this.$app.request(this.$app.API.EXT_ACTIVEINFO,{starid:this.starid,id:this.id},function(a){t.canvas_title=a.data.canvas_title;var e=t.$app.timeGethms(a.data.active_end);a.data.left_time=e.day+"天"+e.hour+"小时"+e.min+"分",t.activeInfo=a.data})}}};a.default=s}).call(this,e("543d")["default"])},e359:function(t,a,e){"use strict";e.r(a);var n=e("6c35"),i=e("4e4f");for(var s in i)"default"!==s&&function(t){e.d(a,t,function(){return i[t]})}(s);e("05fc");var o=e("2877"),c=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,"3c8191c6",null);a["default"]=c.exports}},[["c0e8","common/runtime","common/vendor"]]]);