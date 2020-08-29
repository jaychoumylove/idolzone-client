<template>
	<view class="manor-container">
		<!-- <view class="background"></view> -->
		<image mode='widthFix' class='bg' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36WkoItYoGoC20F1N49sXdnmrLwodF6x2icITRfQ4GN999WzPyMmDib7fw/0'></image>
		<!-- <view class="header">
			<view class="left iconfont iconclose"></view>
			<view class="right title" :class="title_class">庄园</view>
		</view> -->
		<view class="user-info">
			<image class="avatar" src="https://wx.qlogo.cn/mmopen/vi_32/QNxwK0GqTw7MsuqAQA8EaHhtor4EU261v2cTH19eP2YSxRQtmGdU8RvHqDfXTofjP6uu4ZV4HoiaCXkTOwCGsnQ/132" mode="aspectFill"></image>
			<view class="info">
				<view class="nickname text-overflow">姓名</view>
				<view class="week-output">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
					 mode="aspectFill"></image>
					 <view class="number-lable">本周收益：</view>
					 <view class="number">1314</view>
				</view>
			</view>
		</view>
		
		<view class="right-btn-list">
			<view class="item" v-for="(i, l) in [1,2,3,4]" :key="l">宠物列表</view>
		</view>
		
		<view class="main-animal">
			<view class="word">
				记得常来看我
			</view>
			<image class="animal" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36vX5Q2uDsarNMV61fJZc3IQf5dT5mfBrPykicibib0fiaDr6AzWZuxO8JIw/0"></image>
		</view>
		
		<view class="left-buttom">
			<view class="word">
				<view class="output">
					<view class="info">产量：10秒/99颗</view>
					<view class="add flex-set">+</view>
				</view>
				<view class="angle"></view>
			</view>
			<view class="outputing">
				<progress :percent="10" stroke-width="10" activeColor="#ff9f08" border-radius="5" />
				<view class="times">7</view>
			</view>
			<view class="outputleft">
				<view class="outleft flex-set">1234</view>
				<image class="buttom"></image>
			</view>
		</view>
		<view class="steal-list">
			<view class="title">最新动态</view>
			<view class="steal-item" v-for="(i, l) in [1,2,3,4]" :key="l">
				<view class="time">今天 12:34:23</view>
				<view class="info">
					<view class="left flex-set">
						<image src="https://wx.qlogo.cn/mmopen/vi_32/QNxwK0GqTw7MsuqAQA8EaHhtor4EU261v2cTH19eP2YSxRQtmGdU8RvHqDfXTofjP6uu4ZV4HoiaCXkTOwCGsnQ/132"></image>
					</view>
					<view class="middle">
						<view class="name text-overflow">昵称昵称昵称昵称昵称</view>
						<view class="log">偷走1000金豆</view>
					</view>
					<view class="right flex-set">
						<btnComponent type="default">
							<view class="flex-set right-btn">回偷</view>
						</btnComponent>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 召唤宠物 -->
		<modalComponent v-if="modal == 'goCall'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container gocall-modal-container">
				<view class="title">召唤宠物</view>
				<view class="title-lable">奖池详情</view>
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr365PtRS8G9udQu0QHYZN2vLm0PiaKaaiaiafvCKzZibtCw5rFATmiaZBXXOXQ/0"
					   mode="aspectFit"></image>
				<view class="btn-wrap">
					<btnComponent type="default">
						<view class="btn" @tap="modal=''">1次：10灵丹</view>
					</btnComponent>
		
					<btnComponent type="default">
						<view class="btn" @tap="modal=''">10次：90灵丹</view>
					</btnComponent>
				</view>
				
				<view class="buttom">
					今日剩余次数：100
				</view>
			</view>
		</modalComponent>
		
		<!-- 奖池详情 -->
		<modalComponent v-if="modal == 'callPool'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container callpoll-modal-container">
				<view class="title">奖池详情</view>
				
				<scroll-view scroll-y class="scroll-wrapper">
					<block v-for="(j, l) in [1,2,3,4,5]" :key='l'>
						<view class="call-list scroll-item">
							<view class="call-item" v-for="(ja, la) in [1,2,3]" :key='la'>
								<view class="name">鼠</view>
								<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36ezEQLzJIVfTQ1DkqkIcfiakuyPWWEJNryp8sCR07BlfMETzXQBicVHvQ/0" mode="aspectFit"></image>
								<view class="percent">10%</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</modalComponent>
		
		<!-- 召唤结果 -->
		<modalComponent v-if="modal == 'callResult'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container callresult-modal-container">
				<view class="title">召唤结果</view>
				
				<view class="result">
					<view class="call-list">
						<view class="call-item" v-for="(ja, la) in [1,2,3,4,5,6,7,8,9]" :key='la'>
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36cbr4akdEVWicxazJmWF9PAN6uwfkBStWamGAakGtz4IMRjqp7a7p7CA/0" mode="aspectFit"></image>
							<view class="number">X10</view>
						</view>
					</view>
					
					<view class="new-list">
						<view class="new-item" v-for="(ja, la) in [1,2,3]" :key='la'>
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36bPWQUX62NWicmCfydd46v7zlnIUhvXqQNukU4bGZT7160gjIC4eagUw/0" mode="aspectFit"></image>
						</view>
					</view>
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
				modal: 'callResult',
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
			goModelOrPage(item) {
				if (item.hasOwnProperty('page')) {
					this.$app.goPage(item.page);
				}
				if (item.hasOwnProperty('modal')) {
					this.modal = item.modal;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.manor-container {
		position: relative;
		.background {
			width: 100%;
			height: 1284rpx;
			background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36xVGzlKdeqOnW4G5JmiavsgjHzgx1jTomDoUxx4KgCickAapmaNt2DerQ/0");
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 100% 100%;
		}
		.bg {
			width: 100%;
		}
		.header {
			position: absolute;
			width: 100%;
			height: 60rpx;
			top: 50rpx;
			padding-left: 50rpx;
			line-height: 60rpx;
			display: flex;
			width: 85%;
			.title {
				display: inline-block;
			}
			.title-and {
				padding-left: 30rpx;
			}
			.title-ios {
				flex: 1;
				text-align: center;
			}
		}
		
		.user-info {
			position: absolute;
			top: 30rpx;
			left: 40rpx;
			display: flex;
			flex-direction: row;
			background-color: rgba(white, 0.5);
			border-radius: 50rpx;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50rpx;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 0 40rpx 0 20rpx;
				.nickname {
					max-width: 300rpx;
					margin-bottom: 5rpx;
					border-bottom: white 1rpx solid;
					color: #653208;
				}
				.week-output {
					white-space: nowrap;
					display: flex;
					.icon {
						width: 32upx;
						height: 32upx;
						margin-right: 10rpx;
					}
					.number {
						color:#643208;
					}
					.number-label {
						color: #643208;
					}
				}
			}
		}
	
		.right-btn-list {
			position: absolute;
			right: 30rpx;
			top: 90rpx;
			
			.item {
				width: 110rpx;
				height: 110rpx;
				border-radius: 55rpx;
				font-weight: 500;
				background-color: rgba(white, 0.5);
				// background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36ZVutLiajia46W0EWctVh3v8fib8Vk4AhPWcylNb7gluxvJGWI7Gb6lt0g/0");
				background-repeat: no-repeat;
				background-position: center center;
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
				text-shadow: -4rpx 0 black, 0 4rpx black, 4rpx 0 black, 0 -4rpx black;
				color: white;
				&:not(:last-of-type) {
					margin-bottom: 20rpx;
				}
			}
		}
		
		.main-animal {
			position: absolute;
			transform: translateX(-50%);
			left: 45%;
			top: 450rpx;
			.word {
				width: 260rpx;
				color: #653208;
				height: 80rpx;
				text-align: center;
				background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36oMHsTH5c6R9rEEcUr4ICtc4DbkYSahVc5Y8dbsn2wZWroBzepkThMQ/0');
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				padding-top: 15rpx;
				margin-left: 80rpx;
			}
			
			.animal {
				width: 400rpx;
				height: 400rpx;
			}
		}
		
		.left-buttom {
			position: absolute;
			right: 20rpx;
			top: 820rpx;
			.word {
				width: 260rpx;
				height: 80rpx;
				color: #653208;
				text-align: center;
				background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36hRLMglxCbvkDrNW0skG2RIatbFSVlNMLibbPuOzUzDeg2Bz4ibh4ZUkg/0');
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				padding-top: 15rpx;
				.output {
					display: flex;
					justify-content: space-around;
					.info {
						font-size: 22rpx;
					}
					.add {
						background-color: red;
						border-radius: 30rpx;
						color: white;
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
			.outputing {
				margin: 20rpx auto;
				width: 100rpx;
				position: relative;
				border: 1rpx solid #653208;
				.times {
					color: black;
					position: absolute;
					left: 50%;
					transform: translate(-50%, -50%);
					top: 50%;
					font-size: 22rpx;
				}
			}
			.outputleft {
				width: 160rpx;
				margin: 10rpx auto;
				.outleft, .buttom {
					background-position: center center;
					background-repeat: no-repeat;
					background-size: 100% 100%;
					width: 160rpx;
				}
				.outleft {
					background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36iaTEyc8ptBZ9NShb9NmfC2BsI4R3UgXff7oLmK15BibickLuaz1Acl36Q/0');
					height: 80rpx;
					color: white;
				}
				.buttom {
					background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36zicDIwaxZQl2IIsAdqxvJyUs0a1ZVIWnicwfUKRL8lAR9L39SJUicgW9A/0');
					height: 30rpx;
				}
			}
		}
	
		.steal-list {
			position: absolute;
			top: 1100rpx;
			left: 0;
			border-radius: 40rpx;
			background-color: rgba(245,245,245,1);
			width: 100%;
			padding: 20rpx;

			.title {
				font-size: 34rpx;
				font-weight: 650;
				margin-bottom: 20rpx;
				padding-left: 30rpx;
			}
			.steal-item {
				margin-bottom: 20rpx;

				.time {
					font-size: 24rpx;
					padding-left: 20rpx;
					margin-bottom: 20rpx;
				}
				.info {
					background-color: white;
					border-radius: 65rpx;
					height: 130rpx;
					display: flex;
					.left {
						margin: 0 15rpx;
						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50rpx;
						}
					}
					.middle {
						display: flex;
						flex-direction: column;
						justify-content: center;

						.name {
							margin-bottom: 10rpx;
							color: #444444;
							max-width: 300rpx;
							font-size: 30rpx;
							font-weight: 500;
						}
						.log {
							color: #7D7D7D;
							font-size: 22rpx;
						}
					}
					.right {
						margin-left: auto;
						margin-right: 20rpx;
						.right-btn {
							padding: 10rpx 30rpx;
						}
					}
				}
			}
		}
	
		.gocall-modal-container {
			.btn {
				font-size: 30upx;
				width: 220upx;
				white-space: nowrap;
				color: #643107;
				padding: 10rpx 20rpx !important;
			}
			.buttom {
				color: #643107;
				font-size: 24rpx;
			}
			.btn-wrap {
				margin: 25rpx 0!important;
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
	
		.callpoll-modal-container {
			.scroll-wrapper {
				margin-top: 40rpx;
				overflow-y: auto;
				height: 500rpx;
			}
			.call-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.call-item {
					width: 170rpx;
					height: 205rpx;
					background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36vYmAhrGZwCkKyPcSxVbO2JW3d21RwhASW5BYIyzArvlCHwpDcEsrQA/0");
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
						top: 40%;
						left: 50%;
					}
					.name {
						position: absolute;
						transform: translate(-50%, -50%);
						left: 10%;
						top: 20%;
						font-size: 22rpx;
					}
					.percent {
						width: 100rpx;
						height: 50rpx;
						background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36Yu6KcWXLNIq5PXPICp52ibWGtAoDqLY6PJ6rX6ARgK1Yso9vc3fndNg/0');
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
						transform: translateX(-50%);
						left: 50%;
						bottom: 5%;
						position: absolute;
						text-align: center;
						line-height: 50rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	
		.callresult-modal-container {
			.result {
				background: #F5F5F5;
				border-radius: 30px;
				width: 100%;
				padding: 20rpx;
				margin-top: 30rpx;
			}
			.call-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.call-item {
					position: relative;
					image {
						width: 100rpx;
						height: 100rpx;
					}
					margin-bottom: 20rpx;
					.number {
						text-align: right;
						font-size: 22rpx;
						color: #FC6258;
					}
				}
				
			}
			.new-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				margin: 20rpx 0;
				.new-item {
					image {
						width: 130rpx;
						height: 130rpx;
					}
				}
			}
		}
	}
</style>
