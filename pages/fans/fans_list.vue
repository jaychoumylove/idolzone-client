<template>
	<view class="list-page-container">
		<view class="top-container">
			<!-- 我加入的粉丝团 -->
			<view class="top-wrap no-data" v-if="myClub&&!myClub.id" @tap="$app.goPage('/pages/fans/fans_new')">
				<image class="btn-img" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JWwlVcSNe42f7cdITecxbg4CFAE6PV3BWaSicFpBBqib69VFqcoibLnod84vFJU2Hf5uZs5q57YDthCA/0"
				 mode="aspectFill"></image>
				<view class="text">创建粉丝团</view>
			</view>
			<view class="top-wrap club-item" v-if="myClub&&myClub.id" @tap="$app.goPage('/pages/fans/fans_club?fid=' + myClub.id)">

				<view class="avatar-wrap">
					<image class="avatar" :src="myClub.avatar" mode="aspectFill"></image>
				</view>

				<view class="item-content">
					<view class="top">
						<view class="clubname">{{myClub.clubname}}</view>
						<view class="starname">{{myClub.star.name}}</view>
					</view>
					<!-- <view class="bottom">所属爱豆<text class="highlight">{{myClub.star.name}}</text></view> -->
					<view class="bottom">
						成员<text class="highlight">{{myClub.mem_count}}</text>
						本周热度<text class="highlight">{{myClub.week_hot}}</text>
					</view>
					<view class="bottom">本周贡献<text class="highlight">{{myClub.week_count}}</text>人气</view>
				</view>

				<btnComponent type="default">
					<view class="flex-set" style="padding: 10upx 40upx;">进入</view>
				</btnComponent>
			</view>


		</view>

		<view class="scroll-wrap">
			<view class="item" :class="{active:active=='fansclub_count'}" @tap="changeField('fansclub_count')">粉丝团人气</view>
			<view class="item" :class="{active:active=='fansclub_hot'}" @tap="changeField('fansclub_hot')">粉丝团热度</view>
			<view class="item" :class="{active:active=='star_hot'}" @tap="changeField('star_hot')">爱豆热度</view>
		</view>

		<view class="search-wrap">
			<input class="input" @input="setKeyword" type="text" value="" />
			<view class="input-text position-set flex-set iconfont iconfangdajing" v-if="!keyword">
				<view class="text">搜索</view>
			</view>
		</view>

		<view class="list-wrap">
			<view class="item" v-for="(item,index) in list" :key="index">

				<view class="avatar-wrap">
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
				</view>

				<view class="item-content">
					<view class="top">
						<view class="clubname text-overflow">{{item.clubname}}</view>
						<view class="starname">{{item.star.name}}</view>
					</view>
					<!-- <view class="bottom">所属爱豆<text class="highlight">{{item.star.name}}</text></view> -->
					<block v-if="active=='star_hot'">
						<view class="bottom">本周热度<text class="highlight">{{item.week_hot}}</text></view>
					</block>
					<block v-else>
						<view class="bottom">
							成员<text class="highlight">{{item.mem_count}}</text>
							本周热度<text class="highlight">{{item.week_hot}}</text>
						</view>
						<view class="bottom">本周贡献<text class="highlight">{{item.week_count}}</text>人气</view>
					</block>
				</view>

				<image class="btn-add" v-if="!myClub||(myClub&&!myClub.id)" @tap="join(item)" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JWwlVcSNe42f7cdITecxbg4CFAE6PV3BWaSicFpBBqib69VFqcoibLnod84vFJU2Hf5uZs5q57YDthCA/0"
				 mode="aspectFill"></image>
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
				list: [],

				active: 'fansclub_count'
			};
		},
		onShow() {
			this.getMyFansClub()
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
			changeField(field) {
				this.active = field
				this.page = 1
				this.getList()
			},
			setKeyword(e) {
				this.keyword = e.detail.value
				this.page = 1
				this.getList()
			},
			join(item) {
				if (item.star_id != this.$app.getData('userStar').id) {
					this.$app.toast(`你不在同一个圈子`)
					return
				}

				this.$app.modal(`是否加入『${item.clubname}』`, () => {
					this.$app.request('fans/join', {
						id: item.id
					}, res => {
						this.$app.toast('加入成功', 'success')
						this.getMyFansClub()
						this.getList()
					}, 'POST', true)
				}, '加入')

			},
			
			getMyFansClub() {
				this.$app.request('fans/info', {}, res => {
					this.myClub = res.data
				})
			},
			getList() {
				this.$app.request('fans/list', {
					keyword: this.keyword,
					page: this.page,
					field: this.active,
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

		.top-container {
			background-color: #f4f4f4;
			padding: 20upx;

			.top-wrap {

				border-radius: 20upx;
				background-color: #fff;
			}

			.top-wrap.no-data {
				padding: 40upx;
				text-align: center;

				.btn-img {
					margin: 20upx;
					width: 120upx;
					height: 120upx;
				}
			}

			.top-wrap.club-item {
				display: flex;
				align-items: center;
				border-bottom: 2upx solid #efefef;
				padding: 20upx;

				.avatar-wrap {
					.avatar {
						width: 120upx;
						height: 120upx;
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
				height: 70upx;
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

				.avatar-wrap {
					.avatar {
						width: 120upx;
						height: 120upx;
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
