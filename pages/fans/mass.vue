<template>
	<view class="active_one-container">
		<view class="top-container">
			<view class="top-btn-wrap">
				<btnComponent type="default">
					<button open-type="share" data-share='7'>
						<view class="btn flex-set">
							<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXIPlU5Gk353lHIEcfwq2zCBpJxtgsPS2Kea21pk5SxnfqJCoUmq4ZVkNOvWIgPbTYicXvajEC7rGg/0"
							 mode=""></image>
							<text>集结</text>
						</view>
					</button>
				</btnComponent>
				<btnComponent type="default">
					<view class="btn flex-set" @tap="$app.goPage('/pages/notice/notice?id='+this.noticeId)">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXIPlU5Gk353lHIEcfwq2zCzAtYI22jJQn7nC7cpeBTIpBTUk413fvEX0OfmGbo0lJ2pesbTR9ZSA/0"
						 mode=""></image>
						<text>规则</text>
					</view>
				</btnComponent>
			</view>
			<image class="avatar" :src="fanclub.avatar||$app.AVATAR" mode="aspectFill"></image>
			<view class="nickname">{{fanclub.clubname}}</view>
		</view>

		<!-- <open-data style="width: 100%;text-align: center;" type="groupName" :open-gid="openGid"></open-data> -->

		<view class="status">
			<text>参与人数:</text><text style="color:red;">{{list.length}}</text>
			<!-- <text>获得能量：<text style="color:red;">{{list.length * 10}}</text></text> -->
		</view>
		<view class="status">
			<text>为<text style="color:#fbb225;margin: 0 10upx;">{{fanclub.star.name}}</text>增加热度:</text><text style="color:red;">{{totalCount}}</text>
			<!-- <text>获得能量：<text style="color:red;">{{list.length * 10}}</text></text> -->
		</view>

		<view class="main-container">
			<view class="top-wrap">
				<text>集结剩余时间:</text>
				<text style="color:red;">{{remainTime}}</text>
			</view>
			<view class="user-list flex-set">
				<view class="item-wrap" v-for="(item,index) in list" :key="index">
					<image class="avatar" :src="list[index].user.avatarurl" mode="aspectFill"></image>
					<view class="extra">{{item.mass_count}}</view>
				</view>
				<view class="item-wrap" v-for="index in blockUserCount" :key="index">
					<image class="avatar" :src="$app.AVATAR" mode="aspectFill"></image>
					<view class="extra">+1000</view>
				</view>
			</view>
		</view>

		<view class="btn-bottom">
			<navigator open-type="reLaunch" class='left' url='/pages/open/open'>
				<btnComponent type="default">
					<view class="flex-set" style="height: 80upx;">去打榜</view>
				</btnComponent>
			</navigator>

			<view class="right">
				<button open-type="getUserInfo" @getuserinfo="getUserInfo">
					<btnComponent type="default">
						<view class="flex-set" style="height: 80upx;">参与集结</view>
					</btnComponent>
				</button>
			</view>
		</view>

		<modalComponent v-if="modal=='mass'" @closeModal="modal=''" type="center">
			<view class="join-modal-container">
				<view class="top-wrap">
					<view class="title" style="font-size: 38upx;">选择参与集结方式</view>
					<view class="title">选择观看视频参与集结，可获得金豆x10倍</view>
				</view>

				<view class="main-wrap flex-set">
					<view class="item" @tap="ad">
						<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
						 mode="widthFix"></image>
						<view class="img-text">x10</view>
						<view class="text">+1000金豆</view>
						<btnComponent type="success">
							<view class="" style="padding: 10upx;">看视频参与</view>
						</btnComponent>
					</view>
					<view class="item" @tap="mass(0)">
						<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
						 mode="widthFix"></image>
						<view class="text">+100金豆</view>
						<btnComponent type="default">
							<view class="" style="padding: 10upx;">直接参与</view>
						</btnComponent>
					</view>
				</view>
			</view>
		</modalComponent>

	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			modalComponent,
			btnComponent
		},
		data() {
			return {
				list: [],
				remainTime: 0,
				modal: '',
				blockUserCount: 6, // 补位数
				fanclub: null,
				totalCount: 0,
				noticeId: 0,
				status: 0, // 0 加入了该粉丝团 2 没有加入圈子
			};
		},

		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad(option) {
			this.referrer = this.$app.getData('query').referrer
			this.loadData()
		},
		methods: {
			// 看视频广告
			ad() {
				this.$app.openVideoAd(() => {
					this.mass(1)
				})
			},
			mass(type) {
				this.$app.request('fans/joinMass', {
					type,
					fid: this.fanclub.id
				}, res => {
					this.modal = ''
					this.loadData()
					this.$app.toast('金豆+' + res.data)
				}, 'POST', true)
			},
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					if (!this.$app.getData('userInfo').nickname) {
						// 保存用户信息
						this.$app.request(this.$app.API.USER_SAVEINFO, {
							iv: e.detail.iv,
							encryptedData: e.detail.encryptedData,
						}, res => {
							this.$app.request(this.$app.API.USER_INFO, {
								user_id: this.$app.getData('userInfo').id
							}, res => {
								this.$app.setData('userInfo', res.data)
							})
						}, 'POST', true)
					}

					if (this.status == 3) {
						this.$app.toast('你已加入别的粉丝团')
					} else if (this.status == 2) {
						this.$app.modal(`是否加入 ${this.fanclub.clubname} ?`, () => {
							this.$app.request('fans/join', {
								id: this.fanclub.id
							}, res => {
								this.$app.toast('加入成功！', 'success')
								this.loadData()
								this.modal = 'mass'
							}, 'POST', true)
						}, '加入')
					} else if (this.status == 1) {
						this.$app.modal(`是否加入${this.fanclub.star.name}的圈子\n并加入粉丝圈${this.fanclub.clubname}`, () => {
							this.$app.request(this.$app.API.STAR_FOLLOW, {
								starid: this.fanclub.star_id,
								rer_user_id: this.$app.getData('query').referrer, // 推荐人
							}, res => {
								this.$app.request(this.$app.API.USER_STAR, {}, res => {
									this.$app.setData('userStar', res.data)
									this.$app.setData('noob', true)
									this.$app.request('fans/join', {
										id: this.fanclub.id
									}, res => {
										this.$app.toast('加入成功！', 'success')
										this.loadData()
										this.modal = 'mass'
									})
								})
							})
						}, '加入')
					} else {
						this.modal = 'mass'
					}
				}

			},
			loadData() {
				this.$app.request('fans/mass', {
					referrer: this.referrer
				}, res => {
					this.totalCount = res.data.totalCount
					this.list = res.data.list
					this.fanclub = res.data.fanclub
					this.noticeId = res.data.noticeId
					this.status = res.data.userStatus

					if (this.list && this.list.length > 3) {
						this.blockUserCount = 6 - this.list.length % 3
					}

					let time = res.data.remainTime
					if (time) {
						let formatTime = this.$app.timeGethms(time)
						this.remainTime = formatTime.str
						clearInterval(this.timeId)
						this.timeId = setInterval(() => {
							if (--time <= 0) {
								clearInterval(this.timeId)
								this.loadData()
							}
							formatTime = this.$app.timeGethms(time)
							this.remainTime = formatTime.str
						}, 1000)
					}

				})
			},
		}
	}
</script>

<style lang="scss" scoped="">
	.active_one-container {
		padding: 20upx;

		.full {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.top-container {
			display: flex;
			flex-direction: column;
			align-items: center;

			.top-btn-wrap {
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding: 0 10upx;

				.btn {
					font-size: 32upx;
					padding: 0 20upx;
					height: 55upx;

					.icon {
						width: 38upx;
						height: 38upx;
					}
				}
			}

			.avatar {
				border: 4upx solid $text-color-2;
				border-radius: 50%;
				overflow: hidden;
				width: 120upx;
				height: 120upx;
				margin: 10upx;
			}

			.nickname {
				font-size: 32upx;
				font-weight: 700;
				margin: 10upx;
			}
		}

		.status {
			text-align: center;
		}

		.main-container {
			background-color: #FFFFFF;
			box-shadow: 0 4upx 16upx rgba(#999, .3);
			border-radius: 20upx;
			position: relative;
			margin-top: 50upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 120upx;

			.top-wrap {
				position: absolute;
				top: 0;
				background-color: #FFF;
				border-radius: 30upx;
				left: 50%;
				transform: translate(-50%, -50%);
				padding: 10upx 20upx;
				white-space: nowrap;
			}

			.space {
				border-radius: 30upx;
				padding: 10upx 20upx;
				background-color: rgba($text-color-1, .6);
				margin: auto;
			}

			.user-list {
				width: 100%;
				padding: 20upx;
				flex-wrap: wrap;
				flex-direction: flex-start;
				justify-content: space-between;


				.item-wrap {
					margin: 40upx;
					position: relative;

					.avatar {
						width: 120upx;
						height: 120upx;
						border-radius: 50%;
					}

					.extra {
						font-size: 24upx;
						position: absolute;
						background-color: #ffaf2c;
						color: #FFF;
						width: 90upx;
						text-align: center;
						border-radius: 30upx;
						bottom: -10upx;
						left: 50%;
						transform: translateX(-50%);
						white-space: nowrap;
					}

					.extra.yellow {
						background-color: #ff5770;
					}

					.earn {
						font-size: 24upx;
						position: absolute;
						width: 90upx;
						text-align: center;
						border-radius: 30upx;
						bottom: -45upx;
						font-weight: 700;
						left: 50%;
						transform: translateX(-50%);
						white-space: nowrap;
					}
				}

			}
		}

		.btn-bottom {
			position: fixed;
			bottom: 30upx;
			width: 100%;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			jusify-content: space-between;
			padding: 20upx;

			.left {
				width: 150upx;
				margin-right: 20upx;
			}

			.right {
				flex: 1;
			}
		}

		.join-modal-container {
			height: 100%;
			padding: 20upx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-top: -80upx;

			.top-wrap {
				font-size: 32upx;
				text-align: center;
				margin: 20upx 10upx;
			}

			.main-wrap {
				justify-content: space-between;

				.item {
					flex: 1;
					text-align: center;
					padding: 20upx 10upx;
					border: 2upx solid $bg-color-2;
					border-radius: 10upx;
					margin: 10upx;
					position: relative;

					.img {
						width: 100upx;
					}

					.img-text {
						position: absolute;
						top: 90upx;
						right: 50upx;
						color: #686868;
						font-weight: 700;
						font-size: 32upx;
					}

					.text {
						margin: 20upx;
					}
				}
			}

		}
	}
</style>
