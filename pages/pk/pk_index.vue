<template>
	<view class="pk-page-container">

		<!-- pk场次 -->
		<swiper class="top-swiper-container" @change="swiperChange" :indicator-dots="true" :autoplay="false" :current="curPkTime.id-1">
			<swiper-item class="swiper-item" v-for="(item,index) in pkTimeList" :key="index">

				<view class="container" :class="{active:curPkTime.id==item.id}">
					<view class="top-title">
						<image class="bg" v-if="curPkTime.id==item.id" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9W1BibcOu04iaTBwBo7jxz0htMqHohEE7XqrCSqOKnQCWfTDHKnJZZiaibw/0"
						 mode="aspectFill"></image>
						<image class="bg" v-else src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9obQkq8GWNOia2UmbcaDv7BoMiba0C7sa0sAxtD7lM1wyZDT0YcGelcEg/0"
						 mode="aspectFill"></image>
						<view class="title">第{{item.id}}场 {{item.start_time}}-{{item.end_time}}</view>
					</view>
					<view class="item-wrap" v-for="(n,index) in [0,1]" :key="n">
						<view class="title">{{n==0?'钻石':'鲜花'}}争夺战</view>
						<view class="timeleft" v-if="curPkTime.id==item.id">还剩{{timeLeft}}</view>
						<!-- 按钮组 -->
						<view class="btn-wrap flex-set">
							<view v-if="item.status == 1 && item.isJoin !== null && item.isJoin===n" class="btn b-1" @tap="goPage"
							 :data-page='`/pages/pk/pk_rank?current=${n}`' :data-id="item.id" :data-type="n">已报名</view>
							<view v-if="item.status == 1 && item.isJoin !== null && item.isJoin!==n" class="btn b-1" @tap="goPage"
							 :data-page='`/pages/pk/pk_rank?current=${n}`' :data-id="item.id" :data-type="n">已报名其他场次</view>
							<view v-if="item.status == 1 && item.canJoin && item.isJoin===null" class="btn b-1" @tap='join' :data-index="index"
							 :data-current="n" :data-time="item.start_time+'-'+item.end_time">报名参加</view>

							<view v-if="item.status===2" @tap='goPage' :data-page='`/pages/pk/pk_rank?current=${n}`' class="btn b-1">正在进行</view>
							<view class="btn b-2" v-if="item.canJoin===true">
								<button open-type="share" @tap="buttonHandler" data-sharetype="share" data-shareid="5">召集好友参加团战</button>
							</view>
							<view v-if="item.status!==2&&item.canJoin===false" class="btn b-1" @tap="goPage" :data-page="`/pages/pk/pk_rank?current=${n}&pkTime=${item.pkTime}&time=${item.start_time}-${item.end_time}&yestoday=1`">查看结果</view>
							<view v-if="item.status!==2&&item.canJoin===undefined" class="btn b-1" @tap="goPage" :data-page="`/pages/pk/pk_rank?current=${n}&pkTime=${item.pkTime}&time=${item.start_time}-${item.end_time}`">查看结果</view>
						</view>

					</view>

				</view>
			</swiper-item>
		</swiper>

		<view class="space-line"></view>
		<view class="flex-set title-bottom">
			<!-- <button class="item left flex-set" open-type="share" @tap="buttonHandler" data-sharetype="share" data-shareid="5">
				<image class="" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9JLxccByJ4Q7E6acQ50SAJYcGdFQgIGGOAF9zXVunNh9nM2YJArQ1RQ/0"></image>
				<text class="">分享</text>
			</button> -->
			<view class="item" :class="{'bi-title':rankCurrent==0}" @tap='goUserRank' data-current='0'>粉丝荣誉墙</view>
			<view v-if="pk_active_enable" class="item" :class="{'bi-title':rankCurrent==2}" @tap='goUserRank' data-current='2'>{{$app.getData('config').pkactive_info.name}}贡献榜</view>
			<text class="item" :class="{'bi-title':rankCurrent==1}" @tap='goUserRank' data-current='1'>团战贡献总榜</text>
		</view>

		<view class='rank-box'>
			<view class='week-rank'>
				<block v-for="(item,index) in userList" :key='index'>
					<view class='rank-item'>
						<text class='index1'>{{index+1}}</text>

						<view class="head-img">
							<view class="avatar-wrap">
								<image :src='item.avatarurl?item.avatarurl:"/image/no-head.png"'></image>
								<image class="headwear position-set" :src="item.headwear&&item.headwear.img"></image>
							</view>
							<image v-if="index<3" class='s' :src='`/static/image/rank/p${index+1}.png`'></image>
						</view>

						<view class='visiting-card'>
							<view class='nickname'>
								<view class='nickname-text'>{{item.name?item.name:$app.getData('NICKNAME')}}</view>
								<view v-if='item.adm' class='level ling'>
									<image src='/image/ling.png'></image>
								</view>

								<view class='level' v-if='item.level'>
									<image :src='`/image/icon/lv${item.level}.png`'></image>
								</view>
								<view v-if='item.m_name' class='starname'>{{item.m_name}}</view>
							</view>
							<view class='flower'>
								<text class="" v-if="pkStatus==1 && rankCurrent==0">上场贡献</text>
								<text class="" v-else-if="pkStatus==2 && rankCurrent==0">本场贡献</text>
								<text class="" v-else-if="rankCurrent==1">总贡献</text>
								<text class="" v-else-if="rankCurrent==2">活动贡献</text>

								<text class='color' v-if="rankCurrent==0">{{item.last_pk_count}}</text>
								<text class='color' v-else-if="rankCurrent==1">{{item.total_count}}</text>
								<text class='color' v-else-if="rankCurrent==2">{{item.pkactive_count}}</text>
								<image src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F3NAxlopF2oyvfuiaEjgJItws1tcmzFFLo4WGc38l7kibxxk1atGAcjALuqvyvLib3icFPyAicbsOOl3g/0'></image>
							</view>

						</view>
						<view class="award big" v-if="rankCurrent == 0">
							<view v-if="item.last_pk_medal == 'gold'" class="flex-set">
								<image class="" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk91MFUUnActzcz1MGV2BchSQt4zB0HibmS4aDz6nt9kVVlKUWMsna4oxg/0"></image>
							</view>
							<view v-if="item.last_pk_medal == 'silver'" class="flex-set">
								<image class="" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9IcGalzcc9k2HCau060aufusZdCj9ia7nLJjfiaeorH5zkyemB5aLKsbg/0"></image>
							</view>
							<view v-if="item.last_pk_medal == 'bronze'" class="flex-set">
								<image class="" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9D5Kf1wgaoK5WibPiangOicSd663v6KHgrXx5asU8haias3RdRRskTia8Qvg/0"></image>
							</view>
						</view>
						<view class="award" v-else-if="rankCurrent == 1">
							<view v-if="item.gold" class="flex-set">
								<image class="" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk91MFUUnActzcz1MGV2BchSQt4zB0HibmS4aDz6nt9kVVlKUWMsna4oxg/0"></image>x{{item.gold}}
							</view>
							<view v-if="item.silver" class="flex-set">
								<image class="" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9IcGalzcc9k2HCau060aufusZdCj9ia7nLJjfiaeorH5zkyemB5aLKsbg/0"></image>x{{item.silver}}
							</view>
							<view v-if="item.bronze" class="flex-set">
								<image class="" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9D5Kf1wgaoK5WibPiangOicSd663v6KHgrXx5asU8haias3RdRRskTia8Qvg/0"></image>x{{item.bronze}}
							</view>
						</view>						
						<view class="award" v-else-if="rankCurrent == 2">
							<view class="flex-set" v-if="item.pkactive_score>0">
								<image class="" :src="$app.getData('config').pkactive_info.img"></image>x{{item.pkactive_score}}
							</view>
						</view>
						<view class="zan active flex-set" @tap='dianzan' :data-name="item.name" :data-uid='item.uid'
						 :data-i='index'>
							<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9WHoedvqgMtrImliawH7SeVNpS99fQvLdtJqL4XNtQI9KhD22BD7No2g/0"></image>
							{{item.total_zan}}
						</view>
					</view>
				</block>
				<!-- <import src="/lib/component/bottom-load/bottom-load.wxml"></import>
		      <template is="bottom-load" data='{{nomore_data}}'></template> -->
			</view>
		</view>
		<shareModalComponent ref="shareModal"></shareModalComponent>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				starid: this.$app.getData('userStar').id,
				pkTimeList: [], // pk时间段列表
				curPkTime: {}, // 当前pk场次
				myJoinType: '', // 我加入的pk类型

				current: 0,
				rankList: [],

				pkStatus: 1,
				timeSpace: {},
				list: [],
				rankCurrent: 0,
				page: 1,
				userList: [],
				timeLeft: '',
				pk_active_enable:false,
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.shareid
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad(option) {},
		onShow() {
			// this.getPkInfo()
			this.loadData()
		},
		onReachBottom() {
			this.page++
			if (this.page > 10) {
				return
			}
			this.loadData()
		},
		methods: {
			buttonHandler(e) {
				const sharetype = e.target.dataset.sharetype
				if (sharetype == 'share') {
					// 分享
					const shareType = e.target && e.target.dataset.shareid
					// #ifdef APP-PLUS
					const shareOptions = this.$app.commonShareAppMessage(shareType)
					this.$refs.shareModal.shareShow(shareOptions)
					// #endif
				}
			},
			swiperChange(e) {
				// this.current = e.detail.current
				// console.log(this.pkTimeList[e.detail.current])
			},
			dianzan(e) {
				const uid = e.currentTarget.dataset.uid
				const i = e.currentTarget.dataset.i
				this.$app.request('rank/pk_dianzan', {
					uid: uid,
				}, res => {
					if (res.code == 0) {
						this.userList[i].total_zan++
					} else {
						if (res.code == 4) {
							uni.showModal({
								title: '提示',
								content: "今日次数已用完",
								showCancel: false,
								confirmText: '确定',
							})
						}
					}
				}, 'POST', true)
			},
			goUserRank(e) {
				this.rankCurrent = e.currentTarget.dataset.current
				this.page = 1
				this.loadData()
			},
			join(e) {
				wx.showModal({
					title: '提示',
					content: `是否参加今天${e.currentTarget.dataset.time}${e.currentTarget.dataset.current == 0?'钻石':'鲜花'}场的团战`,
					success: res => {
						if (res.confirm) {
							this.$app.request('rank/pk_join', {
								type: e.currentTarget.dataset.current || 0,
								starid: this.$app.getData('userStar')['id'],
							}, res => {
								this.$app.toast(res.msg, 'success')
								this.pkTimeList[e.currentTarget.dataset.index].isJoin = e.currentTarget.dataset.current
								setTimeout(() => {
									this.$app.goPage('/pages/pk/pk_rank?current=' + e.currentTarget.dataset.current)
								}, 1000);

							});

						}
					}
				})
			},
			goPage(e) {
				this.$app.goPage(e.currentTarget.dataset.page)
			},
			loadData() {
				this.$app.request('rank/pk_status', {
					page: this.page,
					rankCurrent: parseInt(this.rankCurrent),
					starid: this.$app.getData('userStar')['id'],
				}, res => {
					this.shareContent = res.data.shareContent

					if (this.page == 1) {
						this.userList = res.data.userList
					} else {
						this.userList = this.userList.concat(res.data.userList)
					}
					this.pkTimeList = res.data.pkTime
					this.arcId = res.data.arcId
					this.pkStatus = res.data.status
					this.curPkTime = res.data.curPkTime
					this.pk_active_enable = res.data.pk_active_enable

					let timeLeft
					for (let key in this.pkTimeList) {
						if (this.pkTimeList[key].timeLeft) {
							timeLeft = this.pkTimeList[key].timeLeft
							break
						}
					}

					// 倒计时
					let formartTime = this.$app.timeGethms(timeLeft)
					this.timeLeft = formartTime.hour + '小时' + formartTime.min + '分' + formartTime.sec + '秒'
					clearInterval(this.timeId)
					this.timeId = setInterval(() => {
						let formartTime = this.$app.timeGethms(--timeLeft)

						this.timeLeft = formartTime.hour + '小时' + formartTime.min + '分' + formartTime.sec + '秒'
						if (timeLeft <= 0) {
							clearInterval(this.timeId)
							// app.page_get_userInfo(this._getInitData);
						}
					}, 1000)
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.pk-page-container {

		.top-swiper-container {
			height: 500upx;
			border-bottom: 2upx solid #efefef;

			.swiper-item {
				padding: 60upx 20upx;

				.container {
					border: 4upx solid #ff9303;
					box-shadow: 0 2upx 4upx #870c0e;
					border-radius: 30upx;
					height: auto;
					text-align: center;
					padding: 10upx 20upx;
					position: relative;

					.top-title {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top: -40upx;

						.bg {
							width: 481upx;
							height: 76upx;
						}

						.title {
							width: 100%;
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							top: 10upx;
							font-weight: 600;
							color: #fff;
							text-shadow: 0 2upx 4upx rgba(#333, .3);
						}
					}

					.item-wrap {
						padding: 10upx 20upx;
						position: relative;

						.timeleft {
							position: absolute;
							top: 30upx;
							left: 430upx;
							font-size: 20upx;
							color: #999;
						}

						.title {
							font-size: 34upx;
							padding: 10upx 20upx;
						}

						.user-list {
							padding: 10upx 20upx;
							display: flex;
							justify-content: space-between;

							.avatar {
								width: 60upx;
								height: 60upx;
								border-radius: 50%;
							}
						}

						.btn-wrap {
							padding: 10upx 20upx;
							justify-content: space-around;

							.btn {
								border-radius: 30upx;
								background-color: #ff9209;
								padding: 10upx 20upx;
								color: #fff;
							}
						}
					}

				}

				.container.active {
					border: 4upx solid #ff5139;

					.btn-wrap {
						.btn {
							background-color: #f74e37;
						}

						.btn.b-2 {
							background-color: #fff;
							border: 2upx solid #f74e37;
							color: #f74e37;
						}
					}
				}
			}

		}
	}


	.week-rank {
		height: 100%;
		width: 100%;
		/* position: absolute;
	  top:0;
	  left:0;
	  transform: translateX(-750px); */
	}

	.rank-item {
		height: 140upx;
		display: flex;
		font-size: 32upx;
		color: #323232;
		align-items: center;
		padding: 6upx 35upx;
	}

	.rank-item .index1 {
		/* margin: 0 20upx; */
		font-size: 34upx;
		color: #686868;
		width: 50upx;
		text-align: center
	}

	.pai {
		width: 55upx;
		height: 55upx;
	}

	.rank-item .index2 {
		color: #f78da6
	}

	.rank-item .index3 {
		color: #ba8cf7
	}

	.rank-item .index4 {
		color: #9dc0ee
	}

	.visiting-card .index4 {
		margin-right: 20upx;
	}

	.rank-item .index5 {
		color: #94edb5
	}

	.active.rank-item {
		background-color: #fff;
	}

	.head-img {
		width: 111upx;
		height: 107upx;
		position: relative;
		top: 6upx;
		background-color: transparent;
		line-height: 1.5;
		text-align: left;
		padding: 0;
		margin: 0;
	}

	.head-img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.avatar-wrap {
		position: relative;
		width: 95upx;
		height: 95upx;
		margin-right: 10upx;
	}

	.avatar-wrap .headwear {
		width: 145upx;
		height: 145upx;
	}

	.head-img image.s {
		width: 58upx;
		height: 58upx;
		position: absolute;
		right: 0;
		bottom: -2upx;
	}

	.visiting-card {
		line-height: 150%;
		width: 290upx;
	}

	.my-rank .visiting-card {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.visiting-card .flower {
		color: #686868;
		font-size: 24upx;
		display: flex;
		align-items: center;
	}

	.visiting-card .nickname {
		display: flex;
		align-items: center;
	}

	.visiting-card .share {
		font-size: 22upx;
		width: 334upx;
	}

	.rank-item .zan .icon {
		width: 40upx;
		height: 40upx;
		margin-right: 10upx;
	}

	.rank-item .zan {
		color: #FF7E00;
	}

	.rank-item .zan.active {
		color: #FF7E00;
	}

	.flower image {
		width: 30upx;
		height: 30upx;
		vertical-align: middle;
		margin-right: 6upx;
		margin-left: 6upx;

	}


	.my-rank {
		background-color: #fff;
		border-top: 1upx solid #eee;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		height: auto;
		bottom: 0;
		position: fixed;
	}

	.swiper {
		height: 100%;
	}

	.rankscrollbox {
		height: 90%;
	}

	.starname {
		background: -webkit-linear-gradient(#ff7e00, #fccd9f);
		color: #fff;
		padding: 0 12upx;
		border-radius: 12upx;
		font-size: 20upx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		line-height: 34upx;
		margin: 0 5upx;
		white-space: nowrap;
	}

	.nickname-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nickname-text.self {
		max-width: 250upx;
	}

	.explain-long {
		display: flex;
		justify-content: space-between;
		font-size: 26upx;
		padding: 20upx 60upx;
	}

	.explain-long .col {
		text-align: center;
	}

	.explain-long .col .col-top .icon {
		width: 25upx;
		height: 25upx;
		margin-left: 10upx;
	}

	.explain-row {
		position: relative;
		margin: 10upx 0;
	}

	.explain-row .explain {
		position: absolute;
		right: 50upx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 20upx;
	}

	.give-btn {
		width: 160upx;
		height: 65upx;
		margin: auto;
		background: #FF7E00;
		border-radius: 50upx;
		text-align: center;
		line-height: 65upx;
		color: #fff;
		font-size: 28upx;
	}

	.give-btn.disable {
		background: #eee;
		color: #999;
	}

	.give-btn.success {
		background-color: #0ec52f;
		color: #FFF;
	}

	.space-line {
		height: 1upx;
		background-color: #EEE;
	}


	.title-bottom {
		position: relative;
		font-size: 26upx;
		width: 100%;
		height: 80upx;
		justify-content: center;
	}

	.title-bottom .item {
		flex: 1;
		text-align: center;
		margin: 0 30upx;
	}

	.title-bottom .item.left {
		line-height: 1.5;
		font-size: 28upx;
		padding: 0;
		background-color: transparent;
		/* background-color: #FF7E00;
	  border-radius: 30upx;
	  box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
	  color: #FFF; */

	}

	.title-bottom .left image {
		width: 30upx;
		height: 30upx;
		margin: 0 10upx;
	}

	.title-bottom .bi-title {
		border-bottom: 2upx solid #FF7E00;
		font-size: 30upx;
		color: #FF7E00;
	}

	.rank-item .award {
		font-size: 26upx;
		width: 120upx;
	}

	.rank-item .award.big image {
		width: 50upx;
		height: 50upx;
	}

	.rank-item .award image {
		width: 35upx;
		height: 35upx;
	}

	.color {
		color: #FA7D09;
	}
</style>
