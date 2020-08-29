<template>
	<view class="manor-list-container">
		<view class="user-info flex-set">
			<view class="avatar">
				<image src="https://wx.qlogo.cn/mmopen/vi_32/QNxwK0GqTw7MsuqAQA8EaHhtor4EU261v2cTH19eP2YSxRQtmGdU8RvHqDfXTofjP6uu4ZV4HoiaCXkTOwCGsnQ/132" mode="aspectFill"></image>
			</view>
			<view class="nickname text-overflow">姓名</view>
			<view class="week-output">
				<view class="output">产量：1金豆/10秒</view>
				<view>每日可偷：3次</view>
			</view>
		</view>
		
		<view class="list">
			<view class="list-bg flex-set">
				<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxvibxEPbs73zlP1tDYtQ14qDEBBfkuEibruNTC56gAdWsDv0tARfGqKiaA/0"></image>
			</view>
			<view class="check-btn">
				<view class="active">全部</view>
				<view>未拥有</view>
			</view>
			
			<scroll-view scroll-y class="scroll-wrapper">
				<block v-for="(j, l) in [1,2,3,4,5]" :key='l'>
					<view class="animal-list scroll-item">
						<view class="animal-item" v-for="(ja, la) in [1,2,3]" :key='la'>
							<view class="lv">Lv.1</view>
							<view class="name">鼠</view>
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36ezEQLzJIVfTQ1DkqkIcfiakuyPWWEJNryp8sCR07BlfMETzXQBicVHvQ/0" mode="aspectFit"></image>
							<view class="desc">每日可偷1次</view>
							<view class="up">
								升级宠物
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		
		<view class="bottom-desc">
			<view class="desc-label">宠物说明:</view>
			<view class="desc-content">
				<view class="p">所有产豆宝宝产量相加为每10秒总产量</view>
				<view class="p">所有偷豆宝宝总次数相加为每日可偷次数</view>
			</view>
		</view>
		
		
		<!-- 升级 -->
		<modalComponent v-if="modal == 'lvUp'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container lvup-modal-container">
				<view class="title">鼠</view>
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36vX5Q2uDsarNMV61fJZc3IQf5dT5mfBrPykicibib0fiaDr6AzWZuxO8JIw/0"
					   mode="aspectFit"></image>
				<view class="lv-info">
					<view class="current-lv">
						<view class="lv-number">当前等级：Lv.1</view>
						<view class="lv-desc">每10秒/1000金豆</view>
					</view>
					<view class="middle">
						》》》
					</view>
					<view class="next-lv">
						<view class="lv-number">当前等级：Lv.1</view>
						<view class="lv-desc">每日可偷10次</view>
					</view>
				</view>
				<view class="btn-wrap">
					<btnComponent type="default">
						<view class="btn" @tap="modal=''">鼠碎片X50升级</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
		},
		data() {
			return {
				title_class: 'title-and',
				modal: 'lvUp',
				btn: [
					
				],
			};
		},
		onShareAppMessage(e) {
			const shareid = e.target && e.target.dataset.shareid
			return this.$app.commonShareAppMessage(shareid)
		},
		// 优化加载速度
		onLoad() {
		},
		onShow() {
			// const {platform} = uni.getSystemInfoSync();
			// if (platform == 'ios') {
			// 	this.title_class = 'title-ios';
			// }
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.manor-list-container {
		background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxyrvoy2uibbD5myzWgH4hrQOgAjqiafI0gk1Ha5y5cVxdwKNSnKkL1TSw/0");
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 100%;
		width: 100%;
		
		.user-info {
			border-radius: 50rpx;
			width: 400rpx;
			margin: 0 auto;
			flex-direction: column;
			color: #653208;
			.avatar {
				image {
					width: 170rpx;
					height: 170rpx;
					border-radius: 100rpx;
				}
				margin: 20rpx 0;
			}
			.nickname {
				text-align: center;
				max-width: 300rpx;
				margin-bottom: 20rpx;
				// border-bottom: white 1rpx solid;
				font-size: 38rpx;
				font-weight: 650;
			}
			.week-output {
				white-space: nowrap;
				display: flex;
				justify-content: space-around;
				background-color: rgba(white, 0.5);
				border-radius: 50rpx;
				padding: 10rpx 20rpx;
				margin-bottom: 20rpx;
				width: 500rpx;
			}
		}
		
		.list {
			position: relative;
			.list-bg {
				image {
					width: 700rpx;
					height: 900rpx;
				}
			}
			.scroll-wrapper {
				position: absolute;
				transform: translate(-50%,-50%);
				top: 56%;
				left: 50%;
				width: 600rpx;
				height: 650rpx;
				.animal-list {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					.animal-item {
						width: 170rpx;
						height: 223rpx;
						background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxTF2BC1ibhWdNOMZnQpmYpdjibWvic8Ahiaibib3Eko3ODu6ObWaB2pNUGicPg/0");
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
						position: relative;
						margin-bottom: 20rpx;
						image {
							position: absolute;
							width: 100rpx;
							height: 100rpx;
							transform: translate(-50%,-50%);
							top: 30%;
							left: 50%;
						}
						.lv {
							position: absolute;
							transform: translate(-50%, -50%);
							left: 10%;
							top: 17%;
							font-size: 24rpx;
							writing-mode: vertical-rl;
						}
						.name {
							position: absolute;
							transform: translate(-50%, -50%);
							left: 10%;
							top: 37%;
							font-size: 20rpx;
						}
						.desc {
							transform: translateX(-50%);
							left: 50%;
							bottom: 28%;
							position: absolute;
							text-align: center;
							font-size: 20rpx;
							color: #653208;
							white-space: nowrap;
						}
						.up {
							font-size: 24rpx;
							transform: translateX(-50%);
							left: 50%;
							bottom: 5%;
							position: absolute;
							text-align: center;
							padding: 5rpx 10rpx;
							background-color: #FDEB40;
							color: #653208;
							white-space: nowrap;
							border-radius: 20rpx;
						}
					}
				}
			}
			.check-btn {
				position: absolute;
				transform: translate(-50%,-50%);
				top: 5%;
				left: 50%;
				width: 500rpx;
				display: flex;
				justify-content: space-around;
				font-size: 34rpx;
				color: #643208;
				.active {
					color: #F2394B;
					border-bottom: 6rpx #F2394B solid;
				}
			}
		}
		
		.bottom-desc {
			display: flex;
			justify-content: center;
			color: #643208;
			font-size: 20rpx;
			margin: 20rpx 0;
			padding-bottom: 10rpx;
			.desc-label {
				margin-right: 10rpx;
			}
			.desc-content {
				.p {
					margin-bottom: 10rpx;
				}
			}
		}
		
		.lvup-modal-container {
			color: #643107;
			.btn {
				font-size: 26rpx;
				font-weight: 500;
				white-space: nowrap;
				padding: 10rpx 20rpx !important;
			}
			.btn-wrap {
				margin: 25rpx 0!important;
				justify-content: space-around!important;
			}
			
			.lv-info {
				display: flex;
				margin: 20rpx 0;
				justify-content: space-around;
				width: 560rpx;
				.current-lv,.next-lv {
					.lv-number {
						font-size: 30rpx;
					}
					.lv-desc {
						font-size: 22rpx;
					}
				}
				.middle {
					align-self: center;
				}
			}
		}
		
		.modal-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: -80upx;
			padding: 40upx;
		
			.title {
				font-size: 36upx;
				font-weight: 700;
			}
			
			.title-lable {
				margin-left: auto;
				color: red;
				font-size: 30rpx;
				font-weight: 500;
				border-bottom: red 1rpx solid;
			}
		
			.bg {
				width: 250upx;
				height: 250upx;
			}
		
			.btn {
				padding: 10upx 30upx;
				font-size: 30upx;
				font-weight: 600;
			}
		
			.btn-wrap {
				margin: 10upx 0;
				text-align: center;
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding: 0 20upx;
			}
		}
	}
</style>
