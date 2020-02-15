<template>
	<view class="active-one-list-container">


		<view class="list-wrap">

			<view class="item-wrap" v-for="(item,index) in activeList" :key="index" @tap="goPage(item.id)">
				<view class="left-img">
					<image class="img" :src="item.title_img" mode="aspectFill"></image>
					<view class="remain">还剩{{item.left_time}}天</view>
				</view>

				<view class="right-content">
					<view class="title">{{item.title}}</view>
					<view class="progress-wrap">
						<view class="progress">
							<view class="progress-inner" :style="{width: item.progress.join_people/item.target_people*100+'%',backgroundColor: '#fbcc3e'}"></view>
						</view>
						<view class="text">{{getNumber(item.progress.join_people/item.target_people*100)+'%'}}</view>
					</view>
					<view class="progress-wrap">
						<view class="progress">
							<view class="progress-inner" :style="{width: item.progress.complete_people/item.target_people*100+'%',backgroundColor: '#613a11'}"></view>
						</view>
						<view class="text">{{getNumber(item.progress.complete_people/item.target_people*100)+'%'}}</view>
					</view>
					<view class="bottom-wrap">
						<view class="text">
							<view>参与人数</view>
							<view>{{item.progress.join_people||0}}</view>
						</view>
						<view class="split"></view>
						<view class="text">
							<view>完成人数</view>
							<view>{{item.progress.complete_people||0}}</view>
						</view>
						<view class="split"></view>
						<view class="text">
							<view>目标人数</view>
							<view>{{item.target_people}}</view>
						</view>
					</view>
				</view>

			</view>
		</view>

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
				activeList: [],
				star: {},
			};
		},
		onShareAppMessage(e) {
			return this.$app.commonShareAppMessage('share')
		},
		onShow(option) {
			if(!this.$app.getData('userStar').id) {
				uni.reLaunch({
					url: '/pages/group/group'
				})
				return
			}
			this.loadData()
		},
		methods: {
			getNumber(num) {
				return num.toFixed(2)
			},
			getStarInfo() {
				this.$app.request(this.$app.API.STAR_INFO, {
					starid: this.$app.getData('userStar').id
				}, res => {
					this.star = res.data
				})
			},
			goPage(id) {
				this.$app.goPage('/pages/active_one/active_one?id=' + id)
			},
			loadData() {
				this.$app.request('active/list', {
					starid: this.$app.getData('userStar').id
				}, res => {
					for (let key in res.data) {
						let left_time = this.$app.timeGethms(res.data[key].active_end)
						res.data[key].left_time = left_time.day
					}

					this.activeList = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active-one-list-container {

		.list-wrap {

			.item-wrap {
				padding: 30upx 20upx;
				display: flex;
				
				border-bottom: 1upx solid #efefef;

				.left-img {
					border-radius: 30upx;
					position: relative;
					z-index: 1;
					overflow: hidden;

					.img {
						width: 314upx;
						height: 227upx;
					}

					.remain {
						position: absolute;
						top: 0;
						left: 0;
						background: linear-gradient(to right, #f1c30d, #e79d18);
						border-bottom-right-radius: 100upx;
						padding-right: 40upx;
						padding-left: 20upx;
						color: #fff;
					}
				}

				.right-content {
					color: #a8a8a8;
					font-size: 26upx;
					flex: 1;
					padding-left: 20upx;
					display: flex;
					flex-direction: column;


					.title {
						color: #000;
						font-size: 30upx;
						font-weight: 700;
						flex: 1;

						.tips {
							font-size: 18upx;
						}
					}

					.progress-wrap {
						display: flex;
						align-items: center;

						.progress {
							background-color: #f9f9f9;
							flex: 1;
							height: 20upx;
							border-radius: 20upx;
							overflow: hidden;

							.progress-inner {
								height: 100%;
								border-radius: 20upx;
							}
						}

						.text {
							width: 100upx;
							text-align: center;
						}
					}

					.bottom-wrap {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.text {
							text-align: center;
						}

						.split {
							height: 30upx;
							width: 1px;
							background-color: #efefef;
						}
					}
				}
			}
		}
	}
</style>
