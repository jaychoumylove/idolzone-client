(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/farm/farm"],{"218a":function(e,t,i){},"63dd":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=(e._self._c,e.$app.getData("userInfo")),n=e.$app.getData("userInfo"),a=(e.offlinePercent/.2).toFixed(2);e._isMounted||(e.e0=function(t){15==e.farm.tree_1_level?e.getSkill(8):e.getSkill(6)},e.e1=function(t){15==e.farm.tree_2_level?e.getSkill(9):e.getSkill(7)},e.e2=function(t){15==e.farm.tree_1_level?e.getSkill(8):e.getSkill(6)},e.e3=function(t){15==e.farm.tree_2_level?e.getSkill(9):e.getSkill(7)},e.e4=function(t){e.skillShow=!e.skillShow},e.e5=function(t){e.skillShow=!e.skillShow},e.e6=function(t){e.skillShow=!e.skillShow},e.e7=function(t){e.skillShow=!e.skillShow},e.e8=function(t){e.getSkill(1),e.modal="skill"},e.e9=function(t){e.getSkill(2),e.modal="skill"},e.e10=function(t){e.getSkill(3),e.modal="skill"},e.e11=function(t){return e.$app.goPage("/pages/notice/notice?id=2")},e.e12=function(t){e.modal=""},e.e13=function(t){e.skill2Current=!e.skill2Current},e.e14=function(t){e.modal=""},e.e15=function(t){e.modal=""},e.e16=function(t){e.modal=""}),e.$mp.data=Object.assign({},{$root:{g0:i,g1:n,g2:a}})},a=[];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return a})},"852d":function(e,t,i){"use strict";i.r(t);var n=i("e6ec"),a=i.n(n);for(var l in n)"default"!==l&&function(e){i.d(t,e,function(){return n[e]})}(l);t["default"]=a.a},c2e0:function(e,t,i){"use strict";i.r(t);var n=i("63dd"),a=i("852d");for(var l in a)"default"!==l&&function(e){i.d(t,e,function(){return a[e]})}(l);i("d70f");var s=i("2877"),o=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"7a1ebc34",null);t["default"]=o.exports},d70f:function(e,t,i){"use strict";var n=i("218a"),a=i.n(n);a.a},e6ec:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(){return i.e("components/modalComponent").then(i.bind(null,"5390"))},a=function(){return i.e("components/btnComponent").then(i.bind(null,"b111"))},l=function(){return i.e("components/listItemComponent").then(i.bind(null,"8d4d"))},s={components:{modalComponent:n,btnComponent:a,listItemComponent:l},data:function(){return{userCurrency:{},modal:"",farm:{},skillInfo:{},skillType:"",coinAddNum:0,coinAddShow:!1,settleTime:100,skillShow:!1,skillOneRemainTime:"",skillTwoRemainCount:0,baseCoinCount:0,rateList:[],skill2Current:!1,skillTwoRemainOffset:0,skillThreePercent:"",helperList:[],offlinePercent:"",primary_house_img:"https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45awPD7e5IuDzoBoks0fLjVdwsUXliamwQDb6M1kHbtja6I7ogz2p2AQA/0",primary_land1_img:"https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45DbvLwianQO7amMCrjEoPbyZyQX1HD3getqlCaqElzFV0Xianf5XufuoQ/0",primary_land2_img:"https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45DbvLwianQO7amMCrjEoPbyZyQX1HD3getqlCaqElzFV0Xianf5XufuoQ/0",primary_tree1_img:"https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45ibdoeICBZgic5qIAmx5VTA9amISbmU2KIrFaaVd4EIgnmQ7h4HL8uXMg/0",primary_tree2_img:"https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45NwbKYxUZT69EbL1ic7EU8JF6Y184rhuzuKLCibHKyzOouqa74DX834YA/0"}},onShareAppMessage:function(e){var t=e.target&&e.target.dataset.share;return this.$app.commonShareAppMessage(t)},onLoad:function(){this.initInterval()},onShow:function(){this.getSpriteInfo(),this.userCurrency=this.$app.getData("userCurrency")},methods:{increaseRate:function(e){var t=this;this.$app.modal("爆豆".concat(e.rate,"倍目前概率").concat(e.chance,"%\n是否使用").concat(e.stone,"钻石提高1%的概率"),function(){t.$app.request("sprite/skill2rateIncrease",{rate:e.rate,stone:e.stone},function(e){t.$app.toast("提升成功"),t.rateList=e.data},"POST",!0)})},helpstart:function(){var e=this;this.$app.request("sprite/helpstart",{},function(t){e.$app.toast("加速成功，金豆+"+t.data),e.modal=""},"POST",!0)},speedModal:function(){var e=this;this.modal="speed",this.$app.request("sprite/helplist",{},function(t){e.helperList=t.data})},skillSettle:function(){var e=function(){var e=this;this.$app.request("sprite/skill_settle",{type:this.skillType},function(t){e.$app.modal(t.data.msg),e.getSkill(e.skillType),e.$app.request(e.$app.API.USER_CURRENCY,{},function(t){e.$app.setData("userCurrency",t.data),e.userCurrency=e.$app.getData("userCurrency")})},"POST",!0)}.bind(this);2==this.skillType?this.skillTwoRemainCount>0?this.$app.modal("金豆需要全投给爱豆",function(){return e()}):this.skillTwoRemainOffset>0?this.$app.modal("金豆需要全投给爱豆\n并且现在需要使用1钻石",function(){return e()}):this.$app.toast("今日使用次数已用完，请明日再来"):e()},getSkill:function(e){var t=this;this.skillType=e,this.$app.request(this.$app.API.SPRITE_SKILL,{type:e},function(i){t.skillInfo=i.data,t.modal="skill",1==e?t.initSkillOne(i.data.remainTime):2==e?(t.skillTwoRemainCount=i.data.remainTimes,t.baseCoinCount=i.data.baseCount,t.rateList=i.data.rate,t.skillTwoRemainOffset=i.data.remainOffset):3==e&&(t.skillThreePercent=i.data.myskill.percent)})},initSkillOne:function(e){var t=this;if(clearInterval(this.skillOneTimeId),!0===e)this.skillOneRemainTime="领取钻石";else{var i=this.$app.timeGethms(e);this.skillOneRemainTime="".concat(i.hour,":").concat(i.min,":").concat(i.sec),this.skillOneTimeId=setInterval(function(){var i=t.$app.timeGethms(--e);t.skillOneRemainTime="".concat(i.hour,":").concat(i.min,":").concat(i.sec),e<=0&&(clearInterval(t.skillOneTimeId),t.skillOneRemainTime="领取钻石")},1e3)}},upgrade:function(){var e=this;this.$app.request(this.$app.API.SPRITE_UPGRAGE,{type:this.skillType},function(t){e.$app.request(e.$app.API.USER_CURRENCY,{},function(t){e.$app.setData("userCurrency",t.data),e.userCurrency=e.$app.getData("userCurrency")}),e.getSpriteInfo(),0!=e.skillType&&e.getSkill(e.skillType),e.$app.toast("升级成功","success")},"POST",!0)},initInterval:function(){var e=this,t=function(){var e=this;this.$app.request("sprite/settle",{},function(t){t.data.earn&&(e.coinAddNum=t.data.earn,e.offlinePercent=t.data.percent,e.coinAddShow=!0,setTimeout(function(){e.coinAddShow=!1},500),e.$app.request(e.$app.API.USER_CURRENCY,{},function(t){e.$app.setData("userCurrency",t.data),e.userCurrency=e.$app.getData("userCurrency")}),1==t.data.mode&&(e.modal="offline"))})}.bind(this);t(),clearInterval(this.timeId),this.timeId=setInterval(function(){--e.settleTime<0&&(t(),e.settleTime=100)},1e3)},getSpriteInfo:function(){var e=this;this.$app.request(this.$app.API.SPRITE_INFO,{user_id:this.$app.getData("userInfo").id},function(t){e.farm=t.data.spriteInfo,e.initSkillOne(t.data.skillOneRemainTime),e.skillTwoRemainCount=t.data.skillTwoRemainTimes,e.skillThreePercent=t.data.skillThreePercent})}}};t.default=s}},[["3970","common/runtime","common/vendor"]]]);