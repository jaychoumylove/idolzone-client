<template>
	<view class="active_one-container" v-if="starid">

		<view class="top-container" v-if="info.banner">
			<image :src="info.banner" mode="widthFix"></image>
		</view>

		<view class="active-center-container">
			<view class="header">
				<view class="lable">
					本月福利
				</view>
				<view class="title">
					为<text class="text-color-3">{{$app.getData('userStar').name || '明星'}}</text>完成看视频任务，解锁应援金
				</view>
				
			</view>
			<view class="progress-wrap">
				<!-- 里程碑进度条 -->
				<view class="milestone-wrap">
					<view class="dot finished"></view>
					<view class="item-box" v-for="(item,index) in step" :key="index">
						<view class="progress">
							<view class="progress-finished" :style="{width: item.precent+'%'}"></view>
						</view>
						<view class="dot" :class="{finished:item.precent==100}">
							<view class="name">￥{{item.reward}}</view>
							<view class="value">{{item.step}}人</view>
						</view>
					</view>
				</view>

				<view class="bottom-text">
					<view>参与人数：<text style="color:#F6AFAF;">{{people.join_num}}</text></view>
					<view>打卡7天人数：<text style="color:#F6AFAF;">{{people.finish_num}}</text></view>
				</view>
			</view>

			<view class="active-container">
				<view class="lable">
					你已打卡：<text style="color:#F6AFAF;">{{my.sup_num}}</text> 天
				</view>
				<btnComponent v-if="is_today" type='default' @tap="setCard">
					<view class="card-action">今日已打卡</view>
				</btnComponent>
				<btnComponent v-else type='default' @tap="setCard">
					<view class="card-action flex-set">打卡解锁</view>
				</btnComponent>
				<button style="margin-left: 10upx;" open-type="share">
					<btnComponent type="default">
						<view class="card-action friend flex-set">好友助力</view>
					</btnComponent>
				</button>
			</view>

			<view class="header">
				<view class="lable">
					打卡天数奖励
				</view>
				<view class="title">
					邀请好友加天数，可多次重复领取
				</view>
				<view class="log" @tap="$app.goPage('/pages/welfare/active_one_section_log')">
					领取记录
				</view>
			</view>
			
			<view class="schedule">
				<view class="schedule-cont">
					<scroll-view scroll-x class="schedule-cont-scroll">
						<view class="schedule-list">
							<view class="dot finished" style="position: absolute; left: 0;"></view>
			
							<view class="item-box" v-for="(item,index) in steps_reward" :key="index">
								<view class="progress">
									<view class="progress-finished" :style="{width: item.precent+'%'}"></view>
								</view>
								<view class="dot" :class="{finished:item.precent==100}">
									<view class="name" @tap="get_steps_reward(index,item.is_get)">
										<view class="reward">
											<image style="width: 100rpx;" :src="item.image" mode="widthFix"></image>
										</view>
										<view class="reward-text">
											<btnComponent v-if="item.is_get" type="default">
												<view class="flex-set" style="width: 100upx;height: 35upx;">已领取</view>
											</btnComponent>
											<btnComponent v-else-if="!item.is_get && item.precent==100" type="success">
												<view class="flex-set" style="width: 100upx;height: 35upx;">待领取</view>
											</btnComponent>
											<btnComponent v-else type="disable">
												<view class="flex-set" style="width: 100upx;height: 35upx;">未完成</view>
											</btnComponent>
										</view>
									</view>
			
									<view class="value">{{item.step}}天</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			
			</view>

			<view class="notice-container">
				<view class="article-name">
					为爱解锁活动说明
				</view>

				<block v-for="(item,index) in info.desc" :key="index">
					<view class="article-group">
						<view class="article-title" v-if="item.label">{{item.label}}</view>
						<view class="article-row">
							<text class="article-content">{{item.content}}</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		
		<view class="rank-list-container">
			<view class="title">打卡天数排行</view>
			<view class='scroll-view'>
				<view class='item-wrap' v-for="(item,index) in userRank" :key="index">
					<image v-if="item.user&&item.user.avatarurl" class='avatar' :src="item.user.avatarurl" mode="aspectFill"></image>
					<image v-else class='avatar' :src="$app.getData('AVATAR')" mode="aspectFill"></image>
					<view class="text-wrap">
						<view class="name">{{item.user&& item.user.nickname?item.user.nickname:$app.getData('NICKNAME')}}</view>
						<view class="card">
							累计打卡：{{item.sup_num}}天
						</view>
					</view>
					<view class="rank flex-set">{{index+1}}</view>
				</view>
				<view class="item-wrap flex-set" v-if="!userRank.length">
					还没有人打卡哦
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue';
	import btnComponent from '@/components/btnComponent.vue';
	import listItemComponent from '@/components/listItemComponent.vue';
	export default {
		components: {
			modalComponent,
			listItemComponent,
			btnComponent
		},
		data() {
			return {
				starid: 0,
				star: {},
				activeInfo: {
					can_card: 1,
					complete_people: 0,
					join_people: 0,
					left_time: '0天0小时0分',
					my_card_days: 0,
					active_subscribe: 1,
					remainPeople: 0,
				},
				userRank: [],
				modal: '',
				cardOverContent: '',
				article: this.$app.getData('config').active_notice,
				mileList: [],
				invitList: [],
				subscriibeShow: false,
				page: 1,
				size: 10,
				end: false,
				info: {},
				people: {
					join_num: 0,
					finish_num: 0,
				},
				step: [], // 进度条
				steps_reward: [], // 奖励进度条
				my: {
					sup_num: 0,
					sup_ext: 0,
				},
				is_today: false, // 是否已打卡
				is_ext: false, // 是否可以补签
			};
		},
		onShareAppMessage() {
			const shareType = this.info.share_id ? this.info.share_id: 113;
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad(option) {},
		onShow() {
			if (this.$app.getData('userStar').id) {
				this.starid = this.$app.getData('userStar').id
			} else {
				uni.showModal({
					title: '提示',
					content: '请先加入一个圈子',
					showCancel: false,
					confirmText: '确定',
					success: res => {
						res.confirm && this.$app.goPage('/pages/index/index')
					}
				});
				return
			}
			this.getInfo();
			this.page = 1;
			this.end = false;
			this.getList();
		},
		/**
		 * 上拉加载
		 */
		onReachBottom() {
			this.page++;
			this.getList()
		},
		methods: {
			getInfo() {
				this.$app.request(this.$app.API.YINGYUAN_INFO, {}, res => {
					const {
						info,
						is_today,
						sup_ext,
						people,
						steps_reward,
						step
					} = res.data;
					this.info = info;
					this.step = step;
					this.steps_reward = steps_reward;
					this.is_today = is_today;
					this.people = people;
					this.my = res.data.self;
					this.is_ext = res.data.sup_ext;
				}, 'POST')
			},
			getList() {
				if (this.end) return;

				this.$app.request(this.$app.API.YINGYUAN_LIST, {
					page: this.page
				}, res => {
					let list = this.userRank;
					if (res.data.length < this.size) {
						this.end = true;
					}
					if (this.page > 1) {
						this.userRank = list.concat(res.data);
					} else {
						this.userRank = res.data;
					}
				}, 'POST')
			},
			setCard() {
				// 看视频打卡
				if (this.is_today) {
					// this.$app.toast('今日已打卡');
					this.modal = 'cardOver'
					this.is_today = true
					return;
				}
				this.$app.openVideoAd(() => {
					this.$app.request(this.$app.API.YINGYUAN_CARD, {}, res => {
						this.is_today = true
						this.getInfo();
						this.page = 1;
						this.end = false;
						this.getList();
						this.$app.toast('今日打卡成功', 'success')
					}, 'POST', true)
				}) //没有广告不给奖励
			},
			getActiveUserRank() {
				this.$app.request(this.$app.API.EXT_ACTIVE_USERRANK, {
					starid: this.starid
				}, res => {

					const resList = []

					for (let v of res.data) {
						if (v.user && v.user.nickname) {
							resList.push({
								active_card_days: v.active_card_days,
								user: v.user,
							})
						}
					}

					this.userRank = resList

				})
			},
			get_steps_reward(index,is_get) { //点击领取拉新额外奖励
				if(is_get) {
					this.$app.toast('已领取该奖励');
					return;
				}
				this.$app.request(this.$app.API.YINGYUAN_REWARD, {index:index}, res => {
					let text = '领取成功,';
					if (res.data.coin > 0) {
						text += '金豆' + res.data.coin;
					}
					if (res.data.panacea > 0) {
						text += ' 灵丹' + res.data.panacea;
					}
					if (res.data.stone> 0) {
						text += '砖石' + res.data.stone;
					}
					if (res.data.prop > 0) {
						text += res.data.prop_text + ' +1';
					}
					this.$app.toast(text)
			
					this.getInfo();
				}, 'POST', true)
			},
		}
	}
</script>

<style lang="scss" scoped="">
	$color_0: white;
	$color_1: white;
	
	$color_2: #ce797c;
	$color_3: #e5b4b0; 
	$color_4: #fae6e7; 
	$color_5: #f3d4d0;
	
	// $text-color-3: #FF5174;// 字体标红颜色
	// $text-color-8: #F6AFAF;// 顶部背景颜色，主题颜色
	$text-color-1: #FFFFFF;// 主题基调
	$text-color-2: #8181A7;// 小标题字体颜色
	$text-color-3: #FF8321;// 字体标红颜色
	$text-color-4: #5F6176;// tab字体颜色
	$text-color-5: #3C467B;// 字体颜色
	$text-color-6: #f4a1bd;// 能量字体颜色
	$text-color-7: #5F6176;// 大标题字体颜色
	$text-color-8: #F6AFAF;// 顶部背景颜色，主题颜色
	$text-color-9: #434987;// 中标题字体颜色
	$text-color-10: #f5f5f5;// 下划线及部分背景颜色
	$text-color-11: #ffd3dc;// 搜索框背景颜色
	$text-color-12: #E5DFDC;// 进度条背景色
	
	
	// 背景色
	$background-color: linear-gradient(to bottom, $text-color-1, $text-color-2);
	$background-color-rgba: rgba(243,243,243,0.5);

	.active_one-container {
		padding: 20upx;
		background-color: $text-color-10;

		.milestone-wrap {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 50upx 20upx;
			margin-top: 20upx;
			margin-bottom: 20upx;

			.dot {
				background-color: #dcdcdc;
				border-radius: 50%;
				width: 40upx;
				height: 40upx;
				z-index: 1;
				position: relative;

				.name {
					position: absolute;
					top: -40upx;
					left: 50%;
					transform: translateX(-50%);
					font-size: 22upx;
					white-space: nowrap;
				}

				.value {
					position: absolute;
					bottom: -40rpx;
					left: 50%;
					transform: translateX(-50%);
					font-size: 22upx;
					white-space: nowrap;
				}
			}

			.dot.finished {
				background-color: $text-color-3;
			}

			.item-box {
				flex: 1;
				display: flex;
				align-items: center;

				.progress {
					margin: 0 -5upx;
					flex: 1;
					height: 20upx;
					background-color: #dcdcdc;

					.progress-finished {
						width: 0%;
						height: 100%;
						background-color: $text-color-3;
					}
				}

			}

		}

		.top-container {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				border-radius: 20upx;
			}

			.switch {
				transform: scale(0.7);
				margin: 0 -20upx;
			}

			.top-btn-wrap {
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding: 0 10upx;
				align-items: center;

				.left-wrap {
					position: relative;

					.s-over {
						width: 150upx;
						position: absolute;
						left: 70upx;
						top: 56upx;
					}
				}

				.btn {

					image {
						margin: 0 10upx;
						width: 40upx;
						// height: 60upx;
					}
				}
			}

			.avatar {
				border: 4upx solid $color_1;
				border-radius: 50%;
				overflow: hidden;
				width: 120upx;
				height: 120upx;
			}

			.nickname {
				font-size: 32upx;
				font-weight: 700;
			}
		}

		.cardday {
			text-align: center;
			margin: 20upx;

			text {
				background-color: $color_1;
				border-radius: 10upx;
				color: #FFF;
				display: inline-block;
				margin: 0 2upx;
				padding: 0 10upx;
			}
		}

		.cardday.newbie {
			text {
				// background-color: #f7d11e;	
			}
		}

		.active-center-container {
			.header {
				display: flex;
				justify-content: flex-start;
				margin: 20upx 0;

				.lable {
					padding: 3rpx 8rpx;
					display: inline-block;
					background-color: $text-color-3;
					border-radius: 10rpx;
					margin-right: 15upx;
					font-size: 24rpx;
					color: white;
				}

				.title {
					color: $text-color-7;
					font-size: 28upx;
				}
				
				.log{
					text-decoration: underline; 
					color: #FBCB3D; 
					flex: 1 0%; 
					text-align: right;
				}
			}

			.top-wrap {
				border-top-left-radius: 30upx;
				border-top-right-radius: 30upx;
				background-color: #c0ebe9;
				height: 90upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $text-color-3;

				.left {
					display: flex;
					align-items: center;

					.left-1 {
						border-right: 2upx solid #fff;
						padding-left: 40upx;
						padding-right: 20upx;
						font-weight: 700;
					}

					.left-2 {
						padding: 20upx;
						font-size: 24upx;
					}
				}

				.right {
					color: $color_1;
					background-color: #ffd1b2;
					z-index: 2;
					display: flex;
					align-items: center;
					border-top-left-radius: 50upx;
					border-bottom-left-radius: 50upx;

					// margin-bottom: 30upx;
					// margin-right: 30upx;
					// height: 120upx;
					// width: 120upx;

					image {
						height: 90upx;
						width: 90upx;
					}

					.text {
						padding: 0 20upx;
						text-align: center;
					}
				}
			}

			.progress-wrap {
				padding: 30upx;
				background-color: #FFFFFF;
				border-radius: 30rpx;

				// 				.progress {
				// 					margin: 14upx 0;
				// 					display: flex;
				// 					align-items: center;
				// 
				// 					progress {
				// 						width: 100%;
				// 						border-radius: 60upx;
				// 						overflow: hidden;
				// 						margin-right: 20upx;
				// 					}
				// 
				// 					text {
				// 						border-radius: 30upx;
				// 						padding: 0 20upx;
				// 						color: #FFF;
				// 						width: 120upx;
				// 						text-align: center;
				// 					}
				// 				}

				.bottom-text {
					display: flex;
					justify-content: space-between;
				}
			}

			.active-container {
				display: flex;
				margin: 20upx 0;
				justify-content: flex-end;
				// height: 40upx;
				line-height: 70upx;

				.lable {
					margin-left: 20upx;
					margin-right: auto;
					display: inline-block;
					height: 70upx;
				}

				.card-action {
					height: 60upx;
					margin: 0 20upx;
					padding: 0 10upx;
				}

				.friend {}
			}

			.schedule {
				background: #FFFFFF;
				border-radius: 30rpx;
				padding: 10rpx 20rpx;
				display: flex;
				flex-direction: column;
			
			
				.schedule-cont {
					width: 100%;
			
					.schedule-cont-scroll {
						height: 300rpx;
					}
			
					.schedule-list {
			
						width: 100%;
						display: flex;
						align-items: center;
						padding: 50upx 20upx;
						margin-top: 160rpx;
			
						.dot {
							background-color: #dcdcdc;
							border-radius: 50%;
							width: 40upx;
							height: 40upx;
							z-index: 1;
							position: relative;
			
							.name {
								position: absolute;
								top: -160upx;
								left: 0;
								transform: translateX(-50%);
								font-size: 24upx;
								white-space: nowrap;
			
								.prop-img {
									width: 40rpx;
								}
			
								.reward {
									width: 100rpx;
									display: flex;
									flex-direction: column;
									align-items: center;
								}
			
								.reward-text {
									font-size: 22rpx;
									padding-top: 10rpx;
								}
							}
			
							.value {
								position: absolute;
								bottom: -40rpx;
								left: 50%;
								transform: translateX(-50%);
								font-size: 24upx;
								white-space: nowrap;
							}
						}
			
						.dot.finished {
							background-color: $text-color-3 !important;
						}
			
						.item-box {
							flex: 1;
							display: flex;
							align-items: center;
			
							.progress {
								margin: 0 -5upx;
								flex: 1;
								height: 20upx;
								background-color: #dcdcdc;
			
								.progress-finished {
									width: 0%;
									height: 100%;
									background-color: $text-color-3;
								}
							}
						}
			
					}
			
				}
			
				.rule {
					background: rgba(252, 244, 245, 1);
					border-radius: 20rpx;
					border: 3rpx solid rgba(194, 155, 158, 1);
					padding: 20rpx;
				}
			}

			.notice-container {
				background-color: #FFFFFF;
				border-radius: 30rpx;
				padding: 10upx 20upx;
				margin-top: 20rpx;

				.article-name {
					text-align: center;
					font-size: 32upx;
					font-weight: bold;
					color: $text-color-3;
					padding: 5upx 10upx;
				}

				.article-group {
					display: flex;
					align-items: baseline;
					padding: 5upx 10upx;

					.article-title {
						border: none;
						font-size: 28upx;
						font-weight: 300;
						padding: 0;
						margin: 0;
						width: 150upx;
					}

					.article-row {
						flex: 1;

						.article-content {
							flex: 1;
							text-indent: 0;
							font-size: 28upx;
							font-weight: 300;
							margin: 0;
						}

					}
				}
			}
		}
		
		.rank-list {
			background-color: #FFFFFF;
			border-radius: 20rpx;
			margin-top: 40rpx;
			.title {
				border-top-left-radius: 30upx;
				border-top-right-radius: 30upx;
				height: 90upx;
				display: flex;
				align-items: center;
				background-color: #ff8195;
				font-weight: 700;
				padding: 0 40upx;
				color: #FFF;
			}
		
			.rank-list-item {
				border-bottom: 1rpx solid $text-color-10;
				.left-container {
					line-height: 44upx;
					.name{
						display: flex;
						flex-direction: row;
						.user-name{
							max-width: 200rpx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
					}
					
				}
		
				.right-container {
					margin-right: 20upx;
				}
			}
		}

		.rank-list-container {
			.title {
				height: 90upx;
				display: flex;
				align-items: center;
				font-weight: 700;
				padding: 0 40upx;
				color: black;
			}
		
			.scroll-view {
				.item-wrap {
					min-height: 80upx;
					display: flex;
					position: relative;
					// background-color: #fbdedb;
					padding: 10upx 40upx;
		
					.avatar {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
					}
		
					.text-wrap {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding: 0 40upx;
						// width: 350upx;
		
						.name {}
		
						.card {
							color: #db7979;
							font-size: 24upx;
							.icon {
								width: 40rpx;
								height: 40rpx;
								margin-left: 10rpx;
							}
						}
		
						.progress {
							border-radius: 30upx;
							overflow: hidden;
						}
					}
		
					.rank {
						width: 70upx;
						height: 70upx;
						position: absolute;
						right: 40upx;
						top: 50%;
						transform: translateY(-50%);
						border-radius: 50%;
						color: #FFF;
						background-color: #b90504;
						font-size: 32upx;
		
					}
				}
			}
		}
	
		.modal-container {
			border-top-left-radius: 20upx;
			border-top-right-radius: 20upx;
			overflow: hidden;
			flex-direction: column;
			justify-content: flex-start;
			height: 100%;

			.top-wrap {
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: $color_0;
				width: 100%;
				line-height: 2;
				font-size: 32upx;

				.avatar {
					width: 140upx;
					height: 140upx;
					border-radius: 50%;
					margin: 30upx 0;
				}
			}

			.milestone-container {
				padding: 0 20upx;
				width: 100%;
				transform: scale(0.8);
			}

			.user-list {
				width: 100%;

				.user-list-avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					margin: 20upx;
				}
			}

			.btn-wrap {
				margin-top: 40upx;
				margin-bottom: 40upx;
				display: flex;
				justify-content: space-around;
				width: 100%;
				padding: 0 60upx;

				.fsend-btn {
					// background-color: #0EC52F;
					// font-size: 32upx;
					color: #333;
					padding: 0 20upx;
					flex-direction: column;

					image {
						width: 80upx;
						height: 80upx;
					}
				}

				.save-btn {
					background-color: #FF7E00;
					border-radius: 10upx;
					font-size: 32upx;
					color: #FFF;
					padding: 0 20upx;
				}
			}

		}

		.canvas-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9;
			background-color: rgba(0, 0, 0, .9);
			flex-direction: column;

			.canvas {
				width: 480upx;
				height: 854upx;
			}

			.close-btn {
				position: absolute;
				width: 80upx;
				height: 80upx;
				z-index: 99;
				border-radius: 50%;
				// background-color: rgba(0, 0, 0, .5);
				color: #FFF;
				font-size: 45upx;
				right: 20upx;
				top: 20upx;
			}

			.wrapper {
				width: 540upx;
				height: 960upx;
				padding: 40upx;
				flex-direction: column;
				background-color: #FFF;

				image {
					width: 100%;
					flex: 1;
				}

				.btn {
					margin-top: 40upx;
					width: 100%;
					height: 150upx;
					text-align: center;
					padding: 20upx;
					font-size: 40upx;
					color: #FFF;
					box-shadow: 0 1px 2px rgba(#000, 0.6);
					background-color: #ff648c;
					border-radius: 20upx;
				}
			}

			.btn-wrap {
				margin-top: 20upx;
				display: flex;
				justify-content: space-around;
				width: 100%;
				padding: 0 60upx;

				.fsend-btn {
					// background-color: #0EC52F;
					font-size: 32upx;
					color: #FFF;
					padding: 0 20upx;
					flex-direction: column;

					image {
						width: 80upx;
						height: 80upx;
					}
				}

				.save-btn {
					background-color: #FF7E00;
					border-radius: 10upx;
					font-size: 32upx;
					color: #FFF;
					padding: 0 20upx;
				}
			}
		}

		.canvas {
			width: 480upx;
			height: 854upx;
			position: fixed;
			z-index: -1;
			left: -100%;
		}
	}
</style>
