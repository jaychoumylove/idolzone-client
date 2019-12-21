<template>
	<view class="container">
		
		<view class='tab-container'>
			<view class="tab-item" :class='{active:current==1}' @tap='switchAct(1)'>爱</view>
			<view class="tab-item" :class='{active:current==2}' @tap='switchAct(2)'>壕</view>
			<view class="tab-item" :class='{active:current==3}' @tap='switchAct(3)'>勤</view>
			<view class="tab-item" :class='{active:current==4}' @tap='switchAct(4)'>豆</view>
			<view class="tab-item" :class='{active:current==5}' @tap='switchAct(5)'>赞</view>
			<view class="tab-item" :class='{active:current==6}' @tap='switchAct(6)'>战</view>
		</view>
		
		
		<!-- 列表 -->
		<view class="list-container">
			<view class="item" v-for="(item,index) in userRank" :key="index">
				<view class="rank-num">
					<image class="icon" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERPO5dPoLHgkajBHNM2z9fooSUMLxB0ogg1mYllIAOuoanico1icDFfYFA/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERcWnBrw6yAIeVRx4ibIfShZ3tn26ubDUiakNcrwf2F43JI97MYEaYiaib9A/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7oibKWZCN5ThjI799sONJZAtZmRRTIQmo1R9j26goVMBJ43giaJHLIlA/0"
					 mode=""></image>
					<view v-else>{{index+1}}</view>
				</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="item.user.avatarurl || AVATAR" mode="aspectFill"></image>
					<image v-if="item.user.headwear.img" class="headwear position-set" :src="item.user.headwear.img" mode=""></image>
				</view>
				<view class="text-container">
					<view>
						{{item.user.nickname || NICKNAME}}
						<view v-if='item.star.name' class='starname'>{{item.star.name}}</view>
					</view>					
					<view class="tips">
						<text v-if="item.user.maxBadge.stype==1">打榜守护{{item.hot}}天</text>
						<text v-if="item.user.maxBadge.stype==2">贡献{{formatFloatNum(item.hot)}}鲜花</text>
						<text v-if="item.user.maxBadge.stype==3">参与{{item.hot}}次集结</text>
						<text v-if="item.user.maxBadge.stype==4">农场产量{{item.hot}}</text>
						<text v-if="item.user.maxBadge.stype==5">获得{{item.hot}}次点赞</text>
						<text v-if="item.user.maxBadge.stype==6">团战获得{{item.hot}}次冠军</text>
						<image class="badge-image" v-if="item.user.maxBadge.simg" :src="item.user.maxBadge.simg"></image>
					</view>
				</view>
				<view class="count" v-if="item.user.maxBadge.complete_time">
					<view>获得时间</view>
					<view>{{item.user.maxBadge.complete_time}}</view>
				</view>
				<view class="count" v-else>未获得</view>
			</view>
		</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 1,
				userRank: [],
				page: 1,
				AVATAR:this.$app.AVATAR,
				NICKNAME: this.$app.NICKNAME,
			};
		},
		onLoad(option) {
			this.stype = option.stype
			this.loadData()
		},
		onReachBottom() {
			this.page++
			this.loadData()
		},
		methods: {
			switchAct(current) {
				this.page = 1
				this.current = current
				this.loadData()
			},
			loadData() {
				if (this.page > 10) return
				this.$app.request('badge/rank', {
					starid: this.$app.getData('userStar').id || 0,
					stype: this.current,
					page: this.page,
				}, res => {
					if (this.page == 1) {
						this.userRank = res.data.list
					} else {
						this.userRank = this.userRank.concat(res.data.list)
					}
				})
			},
			formatFloatNum (num){
				if(num>10000) num = this.$app.formatFloatNum(num/10000,1) + '万'
				return num;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.title image{
			width: 750upx;
			height: 191upx;
		}
		.tab-container {
			padding: 25upx;
			display: flex;
			align-items: center;
			justify-content:space-between;
			border-bottom: 1upx solid #eee;

			.tab-item {
				border-radius: 32upx;
				border: 1upx solid #FF7E00;
				padding: 10upx 30upx;
				justify-content: center;
				display: flex;
				font-size: 30upx;
				margin: 0 10upx;
				flex: 1;
				color: #FF7E00;
			}

			.tab-item.active {
				background-color: #FF7E00;
				text-align: center;
				color: #fff;
			}
		}

		.list-container {
			padding-bottom: 130upx;

			.item {
				height: 130upx;
				display: flex;
				align-items: center;

				.rank-num {
					text-align: center;
					width: 100upx;

					.icon {
						width: 50upx;
						height: 50upx;
					}
				}

				.avatar-wrap {
					position: relative;

					.avatar {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
					}

					.headwear {
						width: 150%;
						height: 150%;
					}
				}

				.text-container {
					margin: 0 20upx;
					width: 320upx;
					
					.tips{
						color: #ff8421;
					}
					.bottom-text {
						display: flex;
						align-items: center;
						color: $text-color-1;
					}
				
					.starname {
						background: -webkit-linear-gradient(#ff7e00, #fccd9f);
						color: #fff;
						padding: 0 12upx;
						border-radius: 12upx;
						font-size: 20upx;
						box-shadow: 0 0 1px rgba(0, 0, 0, .3);
						line-height: 34upx;
						margin: 0 5upx;
						white-space: nowrap;
						width: 100upx;
						text-align: center;

					}
					.badge-image{
						width: 42upx;
						height: 41upx;
						margin-left: 10upx;
					}		
					
				}	
				.count {
					margin:0 30upx;
					width: 200upx;
				}


			}
		}
	}
</style>