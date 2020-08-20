<template>
	<view class="rank-page-container">
		<!-- tab栏 -->
		<view class='tab-container'>
			<view class="tab-item" :class='{active:current==0}' @tap='current=0'>钻石争夺战</view>
			<view class="tab-item" :class='{active:current==1}' @tap='current=1'>鲜花争夺战</view>
		</view>


		<swiper class='swiper' @change="swiperChange" :current="current">
			<block v-for='n in 2' :key='n'>

				<swiper-item>
					<view v-if="pkStatus != 0 && !pkTime" class="explain-long">
						<view class=''>{{pkStatus == 1?'报名':'当前'}}场次：{{timeSpace.start_time}}-{{timeSpace.end_time}}</view>
						<view class=''>{{pkStatus == 1?'开场倒计时':'距本场结束'}}：{{timeLeft}}</view>
					</view>
					<view class="explain-long" v-if="pkTime">
						<view class=''>场次：{{yestoday?'昨天':'今天'}}{{showTime}}（已结束）</view>
					</view>

					<scroll-view scroll-y class='rankscrollbox' @scrolltolower="lower">
						<view class='rank-box'>
							<view class='week-rank'>

								<view class="bi-title" v-if="pkStatus == 1">已有<text class="">{{joinNum}}</text>人报名</view>
								<view class="flex-set">
									<button open-type="share" @tap="buttonHandler" data-sharetype="share" data-shareid="5" class="invit-btn">召集好友一起参加团战</button>
								</view>

								<block v-for='(item,index) in list' :key='index'>


									<view class='rank-item' @tap='goPage' :data-mid="item.star_id" :data-page='`/pages/pk/pk_rank_user?starname=${item.name}&current=${current}&pkTime=${pkTime}&mid=${item.star_id}&yestoday=${yestoday}`'>
										<text class='index1'>{{pkStatus==2?index+1:''}}</text>

										<view class='head-img'>
											<image :src='item.avatarurl?item.avatarurl:this.AVATAR'></image>
											<image v-if="pkStatus==2 && index<3" class='s' :src='`/static/image/rank/p${index+1}.png`'></image>
										</view>

										<view class='visiting-card'>
											<view class='nickname'>
												<view class='nickname-text'>{{item.name?item.name:'神秘粉丝'}}</view>
												<view v-if='item.adm' class='level ling'>
													<image src='/image/ling.png'></image>
												</view>

												<image class='level' v-if='item.level' :src='`/static/image/user_level/lv${item.level}.png`'></image>
												<!-- <view v-if='item.name' class='starname'>{{item.name}}</view> -->
											</view>
											<view class='flower'>
												<block v-if='pkStatus==1'>报名参加了本场团战</block>
												<block v-if="pkStatus==2">
													<text class="">本场人气</text>
													<text class='color'>{{item.hot}}</text>
													<image v-if='pkStatus==2' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F3NAxlopF2oyvfuiaEjgJItws1tcmzFFLo4WGc38l7kibxxk1atGAcjALuqvyvLib3icFPyAicbsOOl3g/0'></image>
												</block>
											</view>
										</view>
										<view v-if="mymid == item.star_id && pkStatus == 2" class="right-btn">粉丝贡献</view>
										<!-- 踢人 -->
										<view class="out iconfont iconclose" v-if="pkStatus == 1 && (captain || item.uid==userInfo.id)" @tap="out(item,index)"></view>
									</view>
								</block>

							</view>
						</view>
					</scroll-view>
				</swiper-item>

			</block>

		</swiper>
		<shareModalComponent ref="shareModal"></shareModalComponent>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				starid: this.$app.getData('userStar').id,

				pkTimeList: [], // pk时间列表
				curPkTime: {}, // 当前pk场次
				myJoinType: '',

				current: 0,
				rankList: [],
				tabList: [{
					name: '钻石争夺战'
				}, {
					name: '鲜花争夺战'
				}],
				pkStatus: 0,
				timeSpace: {},
				list: [],
				pkTime: '',
				mymid: this.$app.getData('userStar').id,
				showTime: '',
				yestoday: 0,
				joinNum: 0,
				timeLeft: '',
				userInfo: this.$app.getData('userInfo'),
				captain: this.$app.getData('userStar').captain,


			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.shareid
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad(options) {
			this.pkTime = options.pkTime || ''
			this.showTime = options.time || ''
			this.yestoday = options.yestoday || 0
			this.current = options.current

			this.page = 1;
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
			out(item, index) {
				this.$app.modal(`将${item.name}移出本次团战?`, () => {
					this.$app.request('rank/pk_out', {
						mid: this.starid,
						uid: item.uid,
					}, res => {
						this.$app.toast(res.msg)
						this.list.splice(index, 1)
					})
				})
			},
			lower() {
				this.page++;
				if (this.page > 10) {
					return
				}
				this.loadData()
			},
			goPage(e) {
				if (this.pkStatus == 2) {
					if (e.currentTarget.dataset.mid == this.$app.getData('userStar').id || this.sAdm == 1) {
						this.$app.goPage(e.currentTarget.dataset.page)
					}
				}
			},
			swiperChange(e) {
				this.page = 1;
				this.rankList = []
				this.loadData()
			},
			loadData() {
				this.$app.request('rank/pk', {
					page: this.page,
					type: this.current || 0,
					mid: this.$app.getData('userStar')['id'],
					pkTime: this.pkTime || '',
					yestoday: this.yestoday || 0,
				}, res => {

					let data = res.data

					if (this.pkTime) {
						// 历史记录
						data.status = 2
					}
					if (this.page == 1) {
						if (data.status == 1) {
							this.list = data.userList
						} else if (data.status == 2) {
							this.list = data.starList
						}
					} else {
						if (data.status == 1) {
							this.list = this.list.concat(data.userList)
						} else if (data.status == 2) {
							this.list = this.list.concat(data.starList)
						}
					}

					this.pkStatus = data.status
					this.timeSpace = data.timeSpace || null
					this.isJoin = data.isJoin || 0
					this.joinNum = data.joinNum || 0
					this.adm = data.isAdm || 0
					this.sAdm = data.sAdm || 0
					this.uid = data.uid

					// 倒计时
					let formartTime = this.$app.timeGethms(data.timeLeft)
					this.timeLeft = formartTime.hour + '小时' + formartTime.min + '分' + formartTime.sec + '秒'
					clearInterval(this.timeId)
					this.timeId = setInterval(() => {
						let formartTime = this.$app.timeGethms(--data.timeLeft)

						this.timeLeft = formartTime.hour + '小时' + formartTime.min + '分' + formartTime.sec + '秒'
						if (data.timeLeft <= 0) {
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
	.rank-page-container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.tab-container {
			padding: 25upx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-bottom: 1upx solid #eee;

			.tab-item {
				border-radius: 32upx;
				padding: 10upx 30upx;
				justify-content: center;
				display: flex;
				font-size: 30upx;
				margin: 0 20upx;
				color: #FF7E00;
				border: 1upx solid #FFEAC9;
			}

			.tab-item.active {
				background-color: #FFEAC9;
				text-align: center;
				color: #FF9B2E;
			}
		}
	}

	page {
		background-color: #fff;
		height: 100%;
		overflow: hidden;
	}

	.title {
		padding: 25upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1upx solid #eee;
	}

	.tab-active,
	.tab-nomal {
		border-radius: 32upx;
		border: 1upx solid #FF7E00;
		padding: 10upx 20upx;
		justify-content: center;
		display: flex;
		font-size: 30upx;
	}

	.tab-active {
		background-color: #FF7E00;
		text-align: center;
		color: #fff;
	}

	.tab-nomal {
		color: #FF7E00;
	}

	.all-rank {
		height: 100%;
		width: 100%;
		transform: translateX(750px);
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
		margin: 0 20upx;
		font-size: 34upx;
		color: #686868;
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
	}

	.head-img image {
		width: 95upx;
		height: 95upx;
		border-radius: 50%;
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
	}

	.my-rank .visiting-card {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.visiting-card .nickname {
		display: flex;
		align-items: center;
	}

	.visiting-card .level {
		width: 30upx;
		height: 30upx;
	}

	.visiting-card .flower {
		color: #686868;
		font-size: 24upx;
		display: flex;
		align-items: center;
	}

	.visiting-card .share {
		font-size: 22upx;
		width: 334upx;
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
		flex: 1;
	}


	.rankscrollbox {
		height: 100%;
	}

	.rank-box {
		padding-bottom: 100rpx;
	}


	.starname {
		background: -webkit-linear-gradient(#ff7e00, #fccd9f);
		color: #fff;
		padding: 0 12upx;
		border-radius: 12upx;
		font-size: 20upx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		line-height: 34upx;
	}

	.nickname-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 320upx;
	}

	.nickname-text.self {
		max-width: 250upx;
	}

	.explain-long {
		display: flex;
		justify-content: space-around;
		font-size: 26upx;
		padding: 20upx;
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

	.rank-item .right-btn {
		position: absolute;
		right: 80upx;

		border-bottom: 2upx solid #ff7e00;
		color: #FF7E00;
		padding: 10upx 20upx;
	}

	.bi-title {
		text-align: center;
		font-size: 26upx;
	}

	.bi-title text {
		color: #FF7E00;
	}

	.rank-item .out {
		position: absolute;
		right: 70upx;
		color: #999;
	}

	.invit-btn {
		font-size: 32upx;
		background-color: #FF7E00;
		color: #FFF;
		display: inline-block;
		border-radius: 50upx;
		line-height: 2;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
		margin: 10upx;
		padding: 0 20upx;
	}

	.color {
		color: #FA7D09;
	}
</style>
