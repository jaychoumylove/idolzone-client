<template>
	<view class="prop-container">
		<view class="top-enter-wrapper">
			<view class="explain-wrapper flex-set">
				<view @tap="$app.goPage('/pages/notice/notice?id='+pointNoticeId)" class="iconfont iconicon-test" style="margin-top: 52upx;margin-left: 40upx;"></view>
				<view class="text-wrapper">
					当前积分{{$app.formatFloatNum(currentPoint/10000)}}
				</view>
			</view>
		</view>
		
		<view class="swiper-change flex-set">
			<view class="swiper-item" :class="{select:current==0}" @tap="current = 0;getUserPro();">已有道具</view>
			<view class="swiper-item" :class="{select:current==1}" @tap="current = 1;getProList();">去兑换</view>
		</view>

		<view class="list-wrapper" v-if="current==0 && list && list.length > 0">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<view class="row row-1">
					<view class="left flex-set">
						<image v-if="item.prop&&item.prop.img" :src="item.prop.img" class="icon" mode="aspectFill"></image>

						<view class="content">
							<view class="top" v-if="item.prop&&item.prop.name">{{item.prop.name}}</view>
							<view class="bottom">过期时间：{{item.end_time || ''}}</view>
						</view>
					</view>

					<view class="right">
						<btnComponent v-if="item.status == 0" type="green">
							<view @tap="useProp(item)" class="flex-set" style="padding: 10upx 36upx;">使用</view>
						</btnComponent>
						<btnComponent v-if="item.status == 1" type="disable">
							<view class="flex-set" style="padding: 10upx 36upx;">已使用</view>
						</btnComponent>
						<btnComponent v-if="item.status == 2" type="disable">
							<view class="flex-set" style="padding: 10upx 36upx;">已过期</view>
						</btnComponent>
					</view>
				</view>

				<view class="row row-2">{{item.prop&&item.prop.desc?item.prop.desc:''}}</view>

			</view>
		</view>
		
		<view class="list-wrapper" v-else-if="current==1 && list && list.length > 0">
			<!-- #ifdef MP-WEIXIN -->
			<view class="list-item" v-for="(item,index) in list" :key="index" v-if="!($app.getData('config').ios_switch==3&&item.id==1)">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="list-item" v-for="(item,index) in list" :key="index">
			<!-- #endif -->
				<view class="row row-1">
					<view class="left flex-set">
						<image :src="item.img" class="icon" mode="aspectFill"></image>
		
						<view class="content">
							<view class="top text-overflow">{{item.name}}</view>
							<view class="bottom flex-set">
								<view class="price">{{parseInt(item.point/10000) || ''}}积分</view>
								<view class="remain" v-if="item.remai>=0">剩余{{item.remain}}</view>
							</view>
						</view>
					</view>
		
					<view class="right flex-set">
						<view class="num-wrapper flex-set">
							<view class="btn flex-set" @tap="numChange(index, 0)">-</view>
							<input class="flex-set" type="number" :value="item.num" @input="numChange(index, $event)" />
							<view class="btn flex-set" @tap="numChange(index, 1)">+</view>
						</view>
						
						<btnComponent type="yellow">
							<view @tap="exchange(item)" class="flex-set" style="padding: 10upx 36upx;">兑换</view>
						</btnComponent>
					</view>
				</view>
		
				<view class="row row-2">{{item.desc}}</view>
		
			</view>
		</view>
		
		<view v-else class="nodata">
			<image src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JUmpAKCVJ2Npw9ISkVxibZZ2znF3I2MycvCASxl8JibMDDzIC1tnXjLriayEL4FSyibzAfc1QaSUBNkMA/0" mode="widthFix" class="img"></image>
			<view class="text">你还没有卡券</view>

		</view>
	</view>
</template>

<script>
	import btnComponent from "@/components/btnComponent.vue"

	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				list: [],
				page: 1,
				current: 0,
				num: 1,
				currentPoint: 0,
				pointNoticeId: 0,
			};
		},
		onShow() {
			this.current ? this.getProList() : this.getUserPro() ;
		},
		methods: {
			getProList(item) {
				this.$app.request('page/prop', {}, res => {
				
					for (let key in res.data) {
						res.data[key].num = 1
					}
					this.list = res.data
				})
			},
			getUserPro() {
				this.$app.request('page/myprop', {
					page: this.page
				}, res => {
					if (this.page == 1) {
						this.list = res.data.list
					} else {
						this.list = this.list.concat(res.data.list)
					}
					this.currentPoint = res.data.currentPoint		
					this.pointNoticeId = res.data.pointNoticeId

				})
			},
			exchange(item) {
				if(item.id==4){ 
					this.$app.goPage(`/pages/group/group`)
					return
				}
				this.$app.request('page/propexchange', {
					proid: item.id,
					count: item.num
				}, res => {
					this.$app.toast('兑换成功', 'success')
					this.current = 0
					this.getUserPro()
				}, 'POST', true)
				
			},
			useProp(item) {
				if(item.prop_id==1 || item.prop_id==2){ 
					this.$app.goPage(`/pages/charge/charge`)
					return
				}
				this.$app.request('page/propuse', {
					userprop_id: item.id
				}, res => {
					this.$app.toast('使用成功', 'success')
					this.list = res.data.list
					this.currentPoint = res.data.currentPoint		
					this.pointNoticeId = res.data.pointNoticeId				
				})
				
			},
			
			numChange(index, plus) {
				if (plus.detail) {
					this.list[index].num = plus.detail.value
				} else {
					if (plus) this.list[index].num++
					else this.list[index].num--
				}
			
				if (this.list[index].num < 1) this.list[index].num = 1
			},
		}
	}
</script>

<style lang="scss" scoped>
	.prop-container {
		.nodata {
			margin-top: 30%;
			color: $text-color-2;
			text-align: center;

			image {
				width: 150upx;
				margin: 20upx;
			}
		}

		.top-enter-wrapper {

			.explain-wrapper {
				background: url('https://mmbiz.qpic.cn/mmbiz_jpg/h9gCibVJa7JUmpAKCVJ2Npw9ISkVxibZZ29cVUokSMl3c4nXptmibx4s32GCE2Gd0UF2JPx6zcPasg0gqgMBbWrrA/0') no-repeat left top;
				background-size:cover;
				padding: 10upx 20upx;
				height:234upx;
				display: flex;
				justify-content: flex-start;
				
				.text-wrapper{
					background: linear-gradient(to right, #51B9EC 0%,#F07091 100%);
					border-radius: 40rpx;
					margin: 50upx 0 0 10upx;
					padding: 5upx 20upx;
					color: #FFFFFF;
				}


			}
		}
		//切换tab
		.swiper-change {
			margin: 30upx;
			border-radius: 30upx;
			overflow: hidden;
			box-shadow: 0 2upx 4upx rgba(0, 0, 0, .3);
		
			.swiper-item {
				flex: 1;
				height: 70upx;
				line-height: 70upx;
				background-color: #f5f5f5;
				color: #ff648d;
				text-align: center;
		
			}
		
			.swiper-item.select {
				background-color: #fbcc3e;
				color: #000;
			}
		
		}

		// 列表
		.list-item {
			padding: 10upx 20upx;
			background-color: rgba(#FFF, .3);
			margin: 20upx 0;
			border-bottom: 1upx solid #DDDDDD;

			.row {
				padding: 10upx 20upx;

				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.row-1 {
				border-bottom: 1px solid #FFF;

				.left {
					.icon {
						width: 100upx;
						height: 100upx;

					}

					.content {
						line-height: 1.7;
						margin: 0 40upx;

						.top {}

						.bottom {
							justify-content: flex-start;
							font-size: 22upx;
							color: $text-color-2;

							.price {
								color: red;
								font-size: 30upx;
								margin-right: 10upx;
							}

							.remain {}
						}
					}
				}
				
				.right {
				
					.num-wrapper {
				
						margin: 0 20upx;
				
						.btn {
							width: 30upx;
							height: 30upx;
							border-radius: 50%;
							box-shadow: 0upx 2upx 4upx rgba(#000, .3);
						}
				
						input {
							width: 60upx;
							height: 30upx;
							line-height: 30upx;
							border-radius: 30upx;
							margin: 0 10upx;
							background-color: #FFF;
							text-align: center;
							font-size: 22upx;
						}
					}
					.excharge{
						background: linear-gradient(to right bottom, #962de0, #962de0);
						color: #fff;
						border-radius: 30upx;
						padding: 10upx 30upx;
					}
				}
			}

			.row-2 {
				font-size: 24upx;
			}
		}
	}
</style>