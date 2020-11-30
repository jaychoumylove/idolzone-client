<template>
	<view class="box-page-container">
		<view class="top-container">
			<image class="avatar" :src="info.user.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
			<view class="nickname">来自 <text class="highlight">{{info.user.nickname||$app.getData('NICKNAME')}}</text> 的{{info.title || '礼物'}}</view>
			<view class="count flex-set">
				你获得了
				<text class="num">+{{self.count||0}}</text>
				
				<image class="img-m" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
				 mode="aspectFill"></image>
			</view>
		</view>
		<view class="tips">
			<view class="left">已领取 {{list.length || '0'}}/{{info.people||'0'}}</view>
			<view class="right flex-set">总额 <image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
				 mode=""></image> {{info.isEarn}}/{{info.coin||''}}</view>
		</view>
		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="left flex-set">
					<image class="avatar" :src="item.user.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
					<view class="nickname">{{item.user.nickname||$app.getData('NICKNAME')}}</view>
					<view class="lucky" v-if="lucky==item.user_id">手气最佳</view>
				</view>
				<view class="right flex-set">
					<image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
					 mode="aspectFill"></image>
					+{{item.count}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				modal: '',
				self: {},
				info: {},
				list: [],
				lucky: 0,

				box_id: '',
				type: '',
			};
		},
		onLoad(option) {
			console.log(option)
			this.box_id = option.box_id;
			this.type = option.type;
			this.loadData(option.type);
		},
		onShow() {
		},
		methods: {
			loadData(type) {
				if(type == '') return;
				let data = {};
				let url = '';
				if(type == 'sharebox'){
					url = 'animal_box/open_box'
					data = {box_id: this.box_id,type: 2};
				}
				this.$app.request(url, data, res => {
					this.info = res.data.info
					this.lucky = res.data.lucky
					this.self = res.data.self

					this.list = res.data.list
					this.award_type = res.data.award_type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box-page-container {
		text-align: center;

		.top-title {
			margin: 20upx 0 -20upx;
			font-weight: 700;
		}

		.top-bg {
			position: absolute;
			height: 300upx;
		}

		.top-container {
			text-align: center;
			border-radius: 30upx;
			box-shadow: 0 2upx 16upx rgba(#666, .3);
			margin: 40upx;
			padding: 40upx;
			position: relative;

			.avatar {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}

			.nickname {
				.highlight {
					color: #f00;
					margin: 0 10upx;
					font-weight: 700;
				}
			}

			.count {
				.num {
					color: #fbb225;
					font-size: 50upx;
					font-family: 'Impact';
				}

				.icon {
					width: 40upx;
					height: 40upx;
				}
			}
			
			.icon-wrap {
				position: absolute;
				right: 30upx;
				top: 30upx;
			}
		}

		.tips {
			display: flex;
			justify-content: space-between;
			padding: 20upx 40upx;
		}

		.list-container {
			padding: 20upx 40upx;

			.item {
				display: flex;
				border-bottom: 2upx solid #efefef;

				justify-content: space-between;
				padding: 20upx;

				.left {
					.avatar {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}

					.nickname {
						margin: 0 10upx;
					}

					.lucky {
						border-radius: 30upx;
						color: #fff;
						background-color: #f00;
						padding: 0 10upx;
						font-size: 22upx;
					}
				}

				.right {
					.icon {
						width: 40upx;
						height: 40upx;
						margin: 0 10upx;
					}
				}
			}
		}

		.btn {
			margin: 30upx;
			padding: 25upx 100upx;
			background-color: $bg-color-2;
			color: #fff;
			border-radius: 60upx;
			display: inline-block;
		}
	}
</style>
