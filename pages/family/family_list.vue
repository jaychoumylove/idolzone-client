<template>
	<view class="list-page-container">
		
		
		<view class="top-container">
			<!-- 我加入的家族 -->
			<view class="top-wrap no-data" v-if="myClub&&!myClub.id" @tap="$app.goPage('/pages/family/family_new')">
				<image class="btn-img" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JWwlVcSNe42f7cdITecxbg4CFAE6PV3BWaSicFpBBqib69VFqcoibLnod84vFJU2Hf5uZs5q57YDthCA/0"
				 mode="aspectFill"></image>
				<view class="text">创建家族</view>
			</view>
			<view class="top-wrap club-item" v-if="myClub&&myClub.id" @tap="$app.goPage('/pages/family/family?fid=' + myClub.id)">

				<view class="avatar-wrap">
					<image class="avatar" :src="myClub.avatar" mode="aspectFill"></image>
				</view>

				<view class="item-content">
					<view class="top">
						<view class="clubname">{{myClub.clubname}}</view>
						<view class="starname">{{myClub.star.name}}</view>
					</view>
					<view class="bottom">
						成员<text class="highlight">{{myClub.mem_count}}</text>
						{{$app.getData('config').family_switch.field_name}}贡献<text class="highlight">{{myClub.hot}}</text>
					</view>
				</view>

				<btnComponent type="default">
					<view class="flex-set" style="padding: 10upx 40upx;">进入</view>
				</btnComponent>
			</view>


		</view>

		<view class="search-wrap">
			<input class="input" @input="setKeyword" type="text" value="" />
			<view class="input-text position-set flex-set iconfont iconfangdajing" v-if="!keyword">
				<view class="text">搜索</view>
			</view>
		</view>

		<view class="list-wrap">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="rank-num">
					<image class="icon" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERPO5dPoLHgkajBHNM2z9fooSUMLxB0ogg1mYllIAOuoanico1icDFfYFA/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERcWnBrw6yAIeVRx4ibIfShZ3tn26ubDUiakNcrwf2F43JI97MYEaYiaib9A/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7oibKWZCN5ThjI799sONJZAtZmRRTIQmo1R9j26goVMBJ43giaJHLIlA/0"
					 mode=""></image>
					<view v-else>{{index+1}}</view>
				</view>
				<view class="avatar-wrap">
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
				</view>

				<view class="item-content">
					<view class="top">
						<view class="clubname text-overflow">{{item.clubname}}</view>
						<view class="starname">{{item.star.name}}</view>
					</view>
					<!-- <view class="bottom">所属爱豆<text class="highlight">{{item.star.name}}</text></view> -->
					<view class="bottom">
						成员<text class="highlight">{{item.mem_count}}</text>
						{{$app.getData('config').family_switch.field_name}}贡献<text class="highlight">{{item.hot}}</text>
					</view>
				</view>
				
				<block v-if="!myClub||(myClub&&!myClub.id)">
					<btnComponent type="green" v-if="item.mystatus==1">
						<view class="flex-set" style="width: 140upx;padding: 10upx 0;">已申请</view>
					</btnComponent>
					
					<btnComponent type="disable" v-else-if="item.mystatus==-1"  @tap="apply(item)">
						<view class="flex-set" style="width: 140upx;padding: 10upx 0;">已拒绝</view>
					</btnComponent>
					
					<btnComponent type="disable" v-else-if="item.mystatus==-2">
						<view class="flex-set" style="width: 140upx;padding: 10upx 0;">已满员</view>
					</btnComponent>
					
					<btnComponent type="default" v-else  @tap="apply(item)">
						<view class="flex-set" style="width: 140upx;padding: 10upx 0;">申请</view>
					</btnComponent>
				</block>
				<!-- <image class="btn-add" v-if="!myClub||(myClub&&!myClub.id)" @tap="join(item)" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JWwlVcSNe42f7cdITecxbg4CFAE6PV3BWaSicFpBBqib69VFqcoibLnod84vFJU2Hf5uZs5q57YDthCA/0"
				 mode="aspectFill"></image> -->
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
				myClub: null,
				keyword: '',
				page: 1,
				list: []
			};
		},
		onShow() {
			this.getMyFamily()
			this.getList()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			goPage(url) {
				if (this.$app.getData('userStar').id) {
					this.$app.goPage(url)
				} else {
					uni.showModal({
						content: '请先加入一个圈子',
						confirmText: '去加圈子',
						showCancel: false,
						success: res => {
							if (res.confirm) {
								this.$app.goPage('/pages/group/group')
							}
						}
					})
				}
			},
			setKeyword(e) {
				this.keyword = e.detail.value
				this.page = 1
				this.getList()
			},
			apply(item) {
				if (item.star_id != this.$app.getData('userStar').id) {
					this.$app.toast(`你不在同一个圈子`)
					return
				}

				this.$app.modal(`申请加入『${item.clubname}』`, () => {
					this.$app.request('family/apply', {
						id: item.id
					}, res => {
						this.$app.toast('申请成功，等待族长确认', 'none')
						this.getMyFamily()
						this.getList()
					}, 'POST', true)
				}, '确定')

			},
			
			getMyFamily() {
				this.$app.request('family/info', {}, res => {
					this.myClub = res.data
				})
			},
			getList() {
				this.$app.request('family/list', {
					keyword: this.keyword,
					page: this.page,
					field: this.$app.getData('config').family_switch.field,
				}, res => {
					if (this.page == 1) {
						this.list = res.data
					} else {
						this.list = this.list.concat(res.data)
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.list-page-container {
		.item-content {
			flex: 1;
			margin: 0 20upx;

			.top {
				display: flex;
				align-items: center;

				.clubname {
					font-weight: 700;
					font-size: 30upx;
				}

				.starname {
					background: linear-gradient(#ff7e00, #fccd9f);
					color: #fff;
					padding: 0 12rpx;
					border-radius: 12rpx;
					font-size: 20rpx;
					box-shadow: 0 0 1px rgba(0, 0, 0, .3);
					line-height: 34rpx;
					margin: 0 5rpx;
					white-space: nowrap;
				}

			}

			.bottom {
				font-size: 24upx;
				color: #888;
				display: flex;
				align-items: center;

				.highlight {
					color: #edce14;
					margin: 0 8upx;
				}
			}
		}
		.ad-container{
			background-color: #f4f4f4;
			padding: 10upx 20upx;
		}
		.top-container {
			background-color: #f4f4f4;
			padding: 10upx 20upx;

			.top-wrap {

				border-radius: 20upx;
				background-color: #fff;
			}

			.top-wrap.no-data {
				padding: 40upx;
				text-align: center;

				.btn-img {
					margin: 10upx;
					width: 60upx;
					height: 60upx;
				}
			}

			.top-wrap.club-item {
				display: flex;
				align-items: center;
				border-bottom: 2upx solid #efefef;
				padding: 20upx;

				.avatar-wrap {
					.avatar {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}
				}



				.btn-add {
					width: 80upx;
					height: 80upx;
				}

			}
		}

		.scroll-wrap {
			margin: 20upx;
			display: flex;
			overflow-y: auto;

			.item {
				color: #9a9a9a;
				border: 2upx solid #9a9a9a;
				border-radius: 40upx;
				padding: 5upx 20upx;
				white-space: nowrap;
				margin-right: 20upx;
			}

			.item.active {
				border-color: #ff89ad;
				color: #ff89ad;
			}
		}

		.search-wrap {
			margin: 20upx;
			position: relative;

			.input {
				width: 100%;
				height: 60upx;
				background-color: #f7f7f7;
				border-radius: 40upx;
				text-align: center;
			}

			.input-text {
				color: #999;

				.text {
					margin: 0 10upx;
				}
			}
		}

		.list-wrap {
			margin: 20upx;

			.item {
				display: flex;
				align-items: center;
				border-bottom: 2upx solid #efefef;
				padding: 20upx;
				
				.rank-num {
					text-align: center;
					width: 80upx;
				
					.icon {
						width: 50upx;
						height: 50upx;
					}
				}
				
				.avatar-wrap {
					.avatar {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}
				}

				.btn-add {
					width: 80upx;
					height: 80upx;
				}
			}
		}
	}
</style>
