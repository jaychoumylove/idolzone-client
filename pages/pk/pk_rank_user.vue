<template>
	<view class="rank-page-container">
		<!-- tab栏 -->
		<view class='tab-container'>
			<view class="tab-item" :class='{active:current==0}' @tap='current=0'>钻石争夺战</view>
			<view class="tab-item" :class='{active:current==1}' @tap='current=1'>鲜花争夺战</view>
		</view>


		<swiper class='swiper' @change="swiperChange" :current="current">
			<block v-for='n in [0,1]' :key='n'>
				<swiper-item>
					<view class="explain-long">
						<view class='explain'>本场粉丝贡献排名</view>
					</view>

					<scroll-view scroll-y class='rankscrollbox' @scrolltolower="lower">
						<view class='rank-box'>
							<view class='week-rank'>

								<block v-for='(item,index) in list' :key='index'>


									<view class='rank-item'>
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
													<text class='color'>{{item.send_hot}}</text>
													<image v-if='pkStatus==2' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F3NAxlopF2oyvfuiaEjgJItws1tcmzFFLo4WGc38l7kibxxk1atGAcjALuqvyvLib3icFPyAicbsOOl3g/0'></image>
												</block>
											</view>
										</view>
										<view v-if="mymid == item.star_id && pkStatus == 2" class="right-btn">粉丝贡献</view>
										<!-- 封禁 -->
										<view class="out iconfont iconjinzhi" v-if="captain" @tap="out(item,index)"></view>
									</view>
								</block>

							</view>
						</view>
					</scroll-view>
				</swiper-item>

			</block>


		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				rankList: [],
				tabList: [{
					name: '钻石争夺战'
				}, {
					name: '鲜花争夺战'
				}],
				pkStatus: 1,
				timeSpace: {},
				list: [],
				pkTime: '',
				mid: 0,
				yestoday: 0,
				adm: 0,
				captain: this.$app.getData('userStar').captain,
			};
		},
		onLoad(options) {
			console.log(options)
			let starname = options.starname || ''
			uni.setNavigationBarTitle({
				title: starname + '团战',
			})

			this.pkTime = options.pkTime || ''
			this.mid = options.mid
			this.yestoday = options.yestoday || 0
			this.current = options.current
			this.page = 1;
			this.loadData()
		},

		methods: {
			lower() {
				this.page++;
				if (this.page > 10) {
					return
				}
				this.loadData()
			},
			out(item, index) {
				const list = [2, 4, 8, 12, 24, 72];
				const itemList = []
				for (let v of list) {
					itemList.push(`禁止 ${item.name} 参加团战：${v}小时`)
				}
				wx.showActionSheet({
					itemList,
					success: res => {
						let time = list[res.tapIndex]
						wx.showModal({
							title: '提示',
							content: `禁止 ${item.name} ${time}小时参加团战?`,
							success: res => {
								if (res.confirm) {
									let uid = item.uid

									this.$app.request('rank/pk_out', {
										mid: this.$app.getData('userStar')['id'],
										uid: uid,
										time: time,
									}, res => {
										this.$app.toast(res.msg)
									})
								}
							}
						})
					}
				})

			},
			goPage(e) {
				if (this.pkStatus == 2) {
					if (e.currentTarget.dataset.mid == this.$app.getData('userStar').id || this.sAdm == 1) {
						this.$app.goPage(e.currentTarget.dataset.page)
					}
				}
			},
			swiperChange(e) {
				this.current = e.detail.current
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
					s: 1,
				}, res => {

					let data = res.data

					if (this.pkTime) {
						data.status = 2
					}
					if (this.page == 1) {
						this.list = data.userList

					} else {
						this.list = this.list.concat(data.userList)
					}

					this.pkStatus = data.status
					this.isJoin = data.isJoin || 0
					this.adm = data.isAdm || 0


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
				border: 1upx solid #FF7E00;
				padding: 10upx 30upx;
				justify-content: center;
				display: flex;
				font-size: 30upx;
				margin: 0 20upx;
				flex: 1;
				color: #FF7E00;
			}

			.tab-item.active {
				background-color: #FF7E00;
				text-align: center;
				color: #fff;
			}
		}
	}


	page {
		background-color: #fff;
		height: 100%;
		overflow: hidden;
	}

	.title {
		padding: 25rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1rpx solid #eee;
	}

	.tab-active,
	.tab-nomal {
		border-radius: 32rpx;
		border: 1rpx solid #FF7E00;
		padding: 10rpx 20rpx;
		justify-content: center;
		display: flex;
		font-size: 30rpx;
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
		height: 140rpx;
		display: flex;
		font-size: 32rpx;
		color: #323232;
		align-items: center;
		padding: 6rpx 35rpx;
	}

	.rank-item .index1 {
		margin: 0 20rpx;
		font-size: 34rpx;
		color: #686868;
	}

	.pai {
		width: 55rpx;
		height: 55rpx;
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
		margin-right: 20rpx;
	}

	.rank-item .index5 {
		color: #94edb5
	}

	.active.rank-item {
		background-color: #fff;
	}

	.head-img {
		width: 111rpx;
		height: 107rpx;
		position: relative;
		top: 6rpx;
	}

	.head-img image {
		width: 95rpx;
		height: 95rpx;
		border-radius: 50%;
	}

	.head-img image.s {
		width: 58rpx;
		height: 58rpx;
		position: absolute;
		right: 0;
		bottom: -2rpx;
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

	.visiting-card .flower {
		color: #686868;
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}

	.visiting-card .share {
		font-size: 22rpx;
		width: 334rpx;
	}

	.flower image {
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-right: 6rpx;
		margin-left: 6rpx;

	}

	.my-rank {
		background-color: #fff;
		border-top: 1rpx solid #eee;
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
		padding: 0 12rpx;
		border-radius: 12rpx;
		font-size: 20rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		line-height: 34rpx;
	}

	.nickname-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 320rpx;
	}

	.nickname-text.self {
		max-width: 250rpx;
	}

	.explain-long {
		display: flex;
		justify-content: space-around;
		font-size: 26rpx;
		padding: 20rpx;
	}

	.explain-row {
		position: relative;
	}

	.explain-row .explain {
		position: absolute;
		right: 50rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 20rpx;
	}

	.give-btn {
		width: 160rpx;
		height: 65rpx;
		margin: auto;
		background: #FF7E00;
		border-radius: 50rpx;
		text-align: center;
		line-height: 65rpx;
		color: #fff;
		font-size: 28rpx;
	}

	.visiting-card .nickname {
		display: flex;
		align-items: center;
	}

	.visiting-card .level {
		width: 30upx;
		height: 30upx;
	}

	.rank-item .out {
		position: absolute;
		right: 70rpx;
		color: #999;

	}

	.rank-item .out image {
		width: 40rpx;
		height: 40rpx;
	}

	.color {
		color: #FA7D09;
	}
</style>
