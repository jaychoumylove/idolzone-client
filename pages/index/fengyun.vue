<template>
	<view class="container">

		<!-- <view class='tab-container'>
			<view class="tab-item" :class="{active:rankField == 'fengyun'}" @tap="changeField('fengyun')">粉丝风云榜</view>
		</view> -->
		
		<view class="swiper-container" v-if="topImg.star" @tap="goTofengyun()">
			<image class='img' :src="topImg.star.head_img_l" mode="aspectFill"></image>
			<view class="bottom-hold" v-if="$app.getData('config').version != $app.getData('VERSION') ||  $app.getData('platform')!='MP-WEIXIN'">
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5TZUvVibQBxK00NyCdWmK7QNRDKdkAn4xFuXtEYgY4ib2gL4dEh0RIyIg/0"
				 mode=""></image>
				<view class="content position-set flex-set">
					<image :src="topImg.user.avatarurl" class="avatar" mode=""></image>
					<text class="text-overflow" style="max-width: 250upx;">{{topImg.user.nickname}}</text> 为 <text>{{topImg.star.name}}</text>
					占领了封面
				</view>
			</view>
		</view>
		
		<view class="occopy">
			<view class="diff flex-set">
				还差123万第一
			</view>
			<view class="btn">
				<btnComponent type="default">
					<view class="get-bg-bm">
						<view class="get-bg">
							<view class="left">立刻</view>
							抢占封面
						</view>
					</view>
				</btnComponent>
			</view>
		</view>
		
		<view class="recharge">
			<view class="content">
				<view class="header">
					<view class="bg">
						活动说明
					</view>
				</view>
				<view class="desc">
					<view class="p">1、在一小时内，贡献鲜花第一的粉丝可以助力爱豆占领封面</view>
					<view class="p">2、鲜花小时榜的贡献值每小时清零，重新计算数值占领封面</view>
					<view class="p">3、爱豆首页封面图由各圈领袖粉上传，尺寸649X247</view>
					<view class="p">4、无领袖粉请加客服申请</view>
				</view>
			</view>
		</view>
		
		<!-- 列表 -->
		<view class="rank-list-container">
			<view class="rank-list-item" v-for="(item,index) in rankList" :key="index">
				<view class="num">{{index+1}}</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="item.user.avatarurl" mode="aspectFill"></image>
					<image class="headwear position-set" :src="item.user.headwear&&item.user.headwear.img" mode=""></image>
				</view>
				<view class="content">
					<view class="top">
						<view class="name text-overflow">{{item.user.nickname}}</view>
						<view class="star flex-set text-overflow">{{item.star.name}}</view>
					</view>
					
					<view></view>
					<view class="bottom">
						贡献{{$app.formatNumber(item.count||0)}}
						<image class="icon-heart" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
						 mode=""></image>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import listItemComponent from '@/components/listItemComponent.vue';
	export default {
		components: {
			listItemComponent
		},
		data() {
			return {
				rankField: 'fengyun',
				rankList: [],
				page: 1,
				topImg: {
					count: 2064001040,
					create_time: "2020-07-21 09:45:53",
					id: 658129,
					star: {
						id: 711, 
						name: "周杰伦", 
						head_img_l: "",
					},
					head_img_l: "",
					id: 711,
					name: "周杰伦",
					star_id: 711,
					time: "2020072109",
					user: {
						id: 679995, 
						nickname: "才先",
						avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/QNxwK0GqTw7MsuqAQA8EaHhtor4EU261v2cTH19eP2YSxRQtmGdU8RvHqDfXTofjP6uu4ZV4HoiaCXkTOwCGsnQ/132",
					},
					avatarurl: "https://wx.qlogo.cn/mmopen/vi_32/QNxwK0GqTw7MsuqAQA8EaHhtor4EU261v2cTH19eP2YSxRQtmGdU8RvHqDfXTofjP6uu4ZV4HoiaCXkTOwCGsnQ/132",
					id: 679995,
					nickname: "才先",
					user_id: 679995,
				}, // 风云榜
			};
		},
		onLoad(option) {
			this.getBannerList()
			this.getRankList()
		},
		onReachBottom() {
			this.page++
			this.getRankList()
		},
		methods: {
			getBannerList() {
				this.$app.request('banner/top', {}, res => {
					if (res.data instanceof Array) {
						if (res.data.length) this.topImg = res.data;
					}
					if (res.data instanceof Object) {
						const length = Object.keys(res.data).length;
						if (length) this.topImg = res.data;
					}
				})
			},
			changeField(field) {
				this.page = 1
				this.rankField = field
				this.keywords = ''
				this.getRankList()
			},
			getRankList() {
				this.$app.request(this.$app.API.STAR_RANK, {
					page: this.page,
					rankField: this.rankField,
				}, res => {
					if (res.data.length) {
						if (this.page == 1) {
							this.rankList = res.data
						} else {
							this.rankList = this.rankList.concat(res.data)
						}
					} else {
						this.rankList = [this.topImg];
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		.swiper-container {
			margin: 5upx 30upx;
			height: 250upx;
			border-radius: 30upx;
			overflow: hidden;
			position: relative;
			z-index: 1;
		
			.banner {
				width: 690upx;
				height: 250upx;
				background: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERVpWtSSpwicFERRz0Wa4Nw9AG4iaH5mBbnjW6zmm26oETkLm86mfk8srw/0') no-repeat left top;
				background-size: cover;
			}
		
			.bottom-hold {
				position: absolute;
				z-index: 3;
				bottom: 0;
				left: 0;
				height: 100upx;
				width: 100%;
				.bg {
					position: absolute;
				}
				.content {
					top: 73%;
					width: 100%;
					color: #FFF;
					font-size: 26upx;
		
					.avatar {
						width: 40upx;
						height: 40upx;
						border-radius: 50%;
					}
					text {
						color: #fbb225;
						margin: 0 4upx;
					}
				}
			}
		
		}
		
		.tab-container {
			padding: 20upx 40upx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.tab-item {
				position: relative;
				margin: 0 20upx;
			}

			.tab-item.active {
				font-size: 30upx;
				font-weight: 700;
			}

			.tab-item.active::before {
				position: absolute;
				content: "";
				height: 8upx;
				width: 50upx;
				border-radius: 14upx;
				bottom: -10upx;
				left: 50%;
				transform: translateX(-50%);
				background-color: #f00;
			}
		}
		.occopy {
			margin: 20upx auto;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			height: 66upx;
			.diff {
				background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FBlImEL23YOTuiciaSo0JyAju3ncCTQTVDWzVhEtJR7JkTUnYvOGGTx4cKxibKttkUQhs3UCn3qcxxA/0") no-repeat center center;
				background-size: cover;
			}
			.btn {
				display: flex;
				justify-content: center;
				align-content: center;
				.get-bg-bm {
					background:#ec7934;
					border-radius:30upx;
					padding:5upx 0;
					.get-bg {
						background:#fa9050;
						padding:5upx;
						padding-right: 20upx;
						font-size:24upx;
						color:rgba(255,255,255,1);
						line-height:45upx;
						display: flex;
						flex-direction: row;
						border-radius:30upx;
						.left {
							padding: 0 10upx;
							background:#ffb273;
							border-radius:26upx;
							margin-right: 7upx;
						}
					}
				}
			}
		}
		
		.recharge {
			margin: 50upx 20upx 0;
			background: rgba(248,247,253,0.8);
			
			.content {
				position: relative;
				.header {
					position: absolute;
					top: 0;
					width: 220upx;
					left: 50%;
					transform: translate(-50%,-50%);
					background:rgba(255,230,115,1);
					border-radius:0px 0px 60px 60px;
					.bg {
						background:rgba(236,121,52,1);
						border-radius:0px 0px 60px 60px;
						padding: 10upx 20upx;
						width: 200upx;
						font-size: 24upx;
						color: white;
						margin: 0 auto;
						text-align: center;
					}
				}
				.desc {
					padding: 40upx 40upx 20upx;
					font-size: 24upx;
				}
			}
		}

		.rank-list-container {

			.rank-list-item {
				display: flex;
				align-items: center;
				background-color: #FFF;
				margin: 20upx 30upx;
				box-shadow: 0 2upx 16upx rgba(#999, .3);

				border-radius: 30upx;
				overflow: hidden;

				.num {
					width: 80upx;
					padding: 10upx 20upx;
				}
				
				.avatar-wrap {
					position: relative;
					
					.avatar {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}
				
					.headwear {
						width: 150%;
						height: 150%;
					}
				}

				.content {
					padding: 10upx 20upx;
					line-height: 1.6;
					max-width: 470upx;

					.top {
						display: flex;
						align-items: center;

						.name {
							font-size: 30upx;
							color: #000;
							flex: 1;
						}

						.star {
							border-radius: 20upx;
							background-color: #82c7d4;
							color: #FFF;
							padding: 0 10upx;
							margin: 0 10upx;
							font-size: 22upx;
						}
					}
				}
				
				.bottom {
					display: flex;
					align-items: center;
					font-size: 26upx;
				
					.hot-count {
						color: $text-color-1;
						margin-right: 4upx;
					}
				
					.icon-heart {
						width: 24upx;
						height: 24upx;
					}
				}

			}

		}


	}
</style>
