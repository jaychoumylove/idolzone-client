<template>
	<view class="container">
		<view class='tab-container'>
			<view class="tab-item" :class="{active:rankField == 'week_count'}" @tap="changeField('week_count')">打榜</view>
			<view class="tab-item" :class="{active:rankField == 'week_hot'}" @tap="changeField('week_hot')">集结</view>
			<view class="tab-item" :class="{active:rankField == 'weekmem_count'}" @tap="changeField('weekmem_count')">拉新</view>
			<view class="tab-item" :class="{active:rankField == 'weekbox_count'}" @tap="changeField('weekbox_count')">宝箱</view>
		</view>
		
		<view class="search-wrap">
			<input class="input" @input="setKeyword" type="text" value="" />
			<btnComponent type="default">
				<view class="flex-set" style="padding: 10upx 40upx;" @tap="loadData()">搜索</view>
			</btnComponent>
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
				<view class='avatar-wrap' @tap="tapUser(item.user_id)">
					<image class="avatar" :src="item.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
					<image class="headwear position-set" :src="item.headwear" mode=""></image>
					<view class="badge-wrap">
						<view class="leader" v-if="item.user_id==leader_uid">团长</view>
					</view>
				</view>
				<view class="text-container">
					<view class="star-name text-overflow">
						{{item.nickname||$app.getData('NICKNAME')}}
						<image class="img-s" :src="`/static/image/user_level/lv${item.level}.png`" mode=""></image><text v-if="item.admin==1" class="exit iconfont iconicon_signal" style="color: red;"></text>
					</view>
					<view class="count-box">
						<view class="count">本周{{rankFieldDanwei}} {{item.hot}} 上周{{rankFieldDanwei}} {{item.lastweek_hot}}</view>
					</view>
				</view>
				<view class="exit iconfont iconicon_signal" style="padding-right: 20rpx;" @tap="upAdmin(item.user_id,1)" v-if="leader_uid==$app.getData('userInfo').id&&item.admin==0&&leader_uid!=item.user_id"></view>
				<view class="exit iconfont iconicon_signal" style="color: red; padding-right: 20rpx;" @tap="upAdmin(item.user_id,0)" v-if="leader_uid==$app.getData('userInfo').id&&item.admin==1&&leader_uid!=item.user_id"></view>
				<view class="exit iconfont iconclose" @tap="exit(item.user_id)" v-if="(leader_uid==$app.getData('userInfo').id||admin)&&leader_uid!=item.user_id"></view>
			</view>
		</view>
		<!-- 我的 -->
		<view class="my-container">
			<view class="rank-num">
				<view>{{myInfo.rank}}</view>
			</view>
			<view class='avatar-wrap'>
				<image class="avatar" :src="$app.getData('userInfo').avatarurl" mode="aspectFill"></image>
				<image v-if="myInfo.headwear&&myInfo.headwear.img" class="headwear position-set" :src="myInfo.headwear&&myInfo.headwear.img" mode=""></image>
			</view>
			<view class="text-container">
				<view>
					{{$app.getData('userInfo').nickname}}
					<image class="img-s" :src="`/static/image/user_level/lv${myInfo.level}.png`" mode=""></image>
				</view>
				<view class="count-box">
					<view class="count">本周{{rankFieldDanwei}} {{myInfo.score||0}} 上周{{rankFieldDanwei}}  {{myInfo.lastweek_score||0}}</view>
				</view>
			</view>
			<image class="exit" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JWwlVcSNe42f7cdITecxbg4vgXqHL191U954COPpyUJZk3bVFibGKvBO6lw9qBP2iaJLsB1U01mLcug/0"
			 mode="aspectFill"  @tap="exit(myInfo.user_id)" v-if="myInfo.user_id==$app.getData('userInfo').id"></image>
		</view>
		
		<!-- 用户modal -->
		<modalComponent v-if="modal == 'userInfo'" type="center" title=" " @closeModal="modal=''">
			<view class="userinfo-modal-container">
				<view class="top">
					<image class="avatar" :src="currentUser.avatarurl||$app.getData('AVATAR')" mode="scaleToFill" @tap="$app.preImg(currentUser.avatarurl)"></image>
					<view class="nickname">{{currentUser.nickname}}</view>
		
				</view>
				<view class="btn-list flex-set">
					<view class="btn-item" @tap="sendOtherType='stone';modal = 'sendOther'">
						<view class="bg flex-set">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
							 mode=""></image>
						</view>
						<view class="text">赠送钻石</view>
					</view>
					<view class="btn-item" @tap="sendOtherType='flower';modal = 'sendOther'">
						<view class="bg flex-set">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
							 mode=""></image>
						</view>
						<view class="text">赠送鲜花</view>
					</view>
				</view>
			</view>
		</modalComponent>
		
		<!-- 送灵丹给别人 -->
		<modalComponent v-if="modal == 'sendOther'" type="center" title=" " @closeModal="modal=''">
			<view class="userinfo-modal-container">
				<view class="top">
					<image class="avatar" :src="currentUser.avatarurl" mode="scaleToFill"></image>
					<view class="nickname">{{currentUser.nickname}}</view>
				</view>
		
				<view class="send-input">
					<input type="number" :value="sendOtherNum" @input="sendOtherNum = $event.detail.value" />
					<image v-if="sendOtherType=='flower'" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
					 mode=""></image>
					<image v-if="sendOtherType=='stone'" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
					 mode=""></image>
				</view>
				<btnComponent type="default">
					<view class="btn flex-set" @tap="sendOther()">送给TA</view>
				</btnComponent>
			</view>
		</modalComponent>
		
	</view>
	
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';
	import modalComponent from '@/components/modalComponent.vue';
	export default {
		components: {
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				keyword:'',
				rankField: 'week_count',
				rankFieldDanwei: '人气',
				fid: 0,
				userRank: [],
				page: 1,
				leader_uid: 0,
				admin:'',
				myInfo: {},
				AVATAR:this.$app.getData('AVATAR'),
				NICKNAME: this.$app.getData('NICKNAME'),
				
				// 点击聊天室头像,当前显示用户
				modal: '',
				currentUser: {},
				sendOtherNum: 1,
				sendOtherType: '', // 赠送他人是鲜花还是钻石‘’
			};
		},
		onLoad(option) {
			this.fid = option.fid
			this.loadData()
		},
		onReachBottom() {
			this.page++
			this.loadData()
		},
		methods: {
			// 点击用户头像
			tapUser(uid) {
				if (uid == this.$app.getData('userInfo').id) return
				this.currentUser = {}
				this.modal = 'userInfo'
				this.$app.request('user/info', {
					user_id: uid
				}, res => {
					this.currentUser = res.data
				})
			},
			// 送给别人
			sendOther() {
				let sendOtherNum = parseInt(this.sendOtherNum)
				this.sendOtherNum = 1
			
				if (sendOtherNum <= 0) {
					this.$app.toast('请输入正确的数字')
					return
				}
				let text
				if (this.sendOtherType == 'flower') {
					text = '鲜花'
				} else if (this.sendOtherType == 'stone') {
					text = '钻石'
				}
				if (sendOtherNum > this.$app.getData('userCurrency')[this.sendOtherType]) {
					this.$app.toast('你没有这么多' + text)
					return
				}
			
				this.$app.modal(`确认将${sendOtherNum}${text}送给${this.currentUser.nickname}？`, () => {
					this.$app.request('user/sendToOther', {
						user_id: this.currentUser.id,
						num: sendOtherNum,
						type: this.sendOtherType,
					}, res => {
						this.$app.toast('赠送成功', 'success')
						this.modal = ''
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
						})
					}, 'POST', true)
				})
			},
			exit(uid) {
				let msg = `退出粉丝团，你在粉丝团内的贡献会清空`
				if(uid==this.$app.getData('userInfo').id && this.myInfo.hasExited) msg = `你已经退过一次，本次需要花费100钻石`
				else if(uid!=this.$app.getData('userInfo').id) msg = `请出粉丝团，TA在粉丝团内贡献会清空`
				this.$app.modal(msg, () => {
					this.$app.request('fans/exit', {
						user_id: uid,
					}, res => {
						this.$app.toast(`退出成功`)
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/fans/fans_list'
							})
						}, 1000)
					}, 'POST', true)
				})

			},
			upAdmin(uid,admin){
				let msg = `确定提升TA为管理员吗？`
				if(admin==0) msg='确定取消TA的管理员吗？'
				console.log(uid);
				this.$app.modal(msg,()=>{
					this.$app.request('fans/upAdmin',{
						user_id:uid,
						admin:admin,
					},res=>{
						this.$app.toast(res.msg)
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/fans/member?fid='+this.fid
							})
						}, 1000)
					},'POST',true)
				})
			},
			setKeyword(e) {
				this.keyword = e.detail.value
				this.page = 1
			},
			changeField(field) {
				this.page = 1
				if(field=='week_count') this.rankFieldDanwei = '人气'
				else if(field=='week_hot') this.rankFieldDanwei = '热度'
				else if(field=='weekmem_count') this.rankFieldDanwei = '净拉新'
				else if(field=='weekbox_count') this.rankFieldDanwei = '派宝箱'
				this.rankField = field
				this.keyword = ''
				this.loadData()
			},
			loadData() {
				this.$app.request('fans/member', {
					fid: this.fid,
					page: this.page,
					field: this.rankField,
					keyword: this.keyword,
				}, res => {
					this.myInfo = res.data.my
					this.leader_uid = res.data.leader_uid
					this.admin=res.data.admin
					if (this.page == 1) {
						this.userRank = res.data.list
					} else {
						this.userRank = this.userRank.concat(res.data.list)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {

		.tab-container {
			padding: 25upx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-bottom: 1upx solid #eee;

			.tab-item {
				border-radius: 32upx;
				padding: 10upx 30upx;
				justify-content: center;
				display: flex;
				font-size: 30upx;
				margin: 0 20upx;
				flex: 1;
				color: #FF7E00;
				border: 1upx solid #FFEAC9;
			}

			.tab-item.active {
				background-color: #FFEAC9;
				text-align: center;
				color: #FF9B2E;
			}
		}

		.search-wrap {
			display: flex;
			margin: 20upx;
			position: relative;

			.input {
				margin-right: 20upx;
				width: 550upx;
				height: 60upx;
				background-color: #f7f7f7;
				border-radius: 40upx;
				text-align: center;
			}

			.input-text {
				color: #999;
			}
		}

		.list-container {

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
						width: 90upx;
						height: 90upx;
						border-radius: 50%;
					}

					.headwear {
						width: 150%;
						height: 150%;
					}

					.badge-wrap {
						position: absolute;
						bottom: 0;
						right: 0;

						.leader {
							background-color: rgba(#F99152, .8);
							border-radius: 12upx;
							padding: 0 6upx;
							color: #FFF;
							font-size: 20upx;
						}
					}
				}

				.text-container {
					margin: 0 20upx;
					width: 420upx;

					.bottom-text {
						display: flex;
						align-items: center;
						color: $text-color-1;
					}
				}

				.count {
					font-size: 22upx;
					color: #ADADAD;
				}

				.exit {
					color: #888;
				}

			}
		}

		.my-container {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 130upx;
			display: flex;
			align-items: center;
			background-color: #FFF;
			border-top: 1upx solid #eee;

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
					width: 90upx;
					height: 90upx;
					border-radius: 50%;
				}

				.headwear {
					width: 150%;
					height: 150%;
				}
			}

			.text-container {
				margin: 0 20upx;
				width: 450upx;

				.bottom-text {
					display: flex;
					align-items: center;
					color: $text-color-1;
				}
			}

			.count {
				font-size: 22upx;
				color: #ADADAD;
			}
			
			.exit {
				width: 40upx;
				height: 40upx;
			}
		}
		
		.userinfo-modal-container {
			height: 640upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			padding: 40upx;
		
			.top {
				display: flex;
				flex-direction: column;
				align-items: center;
				line-height: 1.6;
		
				.avatar {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
				}
		
				.nickname {
					font-size: 36upx;
					font-weight: 600;
				}
		
				.badge-wrap {
					.badge {
						position: relative;
						width: 40upx;
						height: 40upx;
					}
		
					.level {
						color: #FFF;
						font-size: 26upx;
					}
		
					.text {
						margin-top: 15upx;
						height: 70%;
						font-size: 20upx;
						padding-left: 38upx;
						padding-right: 19upx;
						border-radius: 30upx;
						margin-left: -30upx;
						color: #FFF;
					}
		
					.text.i-1 {
						background: linear-gradient(to right, #FFF, #8d8f91);
					}
		
					.text.i-2 {
						background: linear-gradient(to right, #FFF, #234232);
					}
		
					.text.i-3 {
						background: linear-gradient(to right, #FFF, #860d3d);
					}
		
					.text.i-4 {
						background: linear-gradient(to right, #FFF, #b51688);
					}
		
					.text.i-5 {
						background: linear-gradient(to right, #FFF, #612f29);
					}
		
					.text.i-6 {
						background: linear-gradient(to right, #FFF, #730056);
					}
				}
			}
		
			.btn-list {
				width: 100%;
				justify-content: space-around;
		
				.btn-item {
					display: flex;
					flex-direction: column;
					align-items: center;
		
					.bg {
						background-color: #EEE;
						border-radius: 20upx;
						width: 100upx;
						height: 100upx;
		
						image {
							width: 60upx;
							height: 60upx;
						}
					}
		
					.text {
						margin-top: 10upx;
					}
				}
			}
		
			.content {
				line-height: 1.6;
			}
		
			.btn {
				font-size: 32upx;
				font-weight: 700;
				width: 300upx;
				height: 80upx;
			}
		
			.row {
				width: 100%;
				justify-content: space-around;
		
				.btn {
					width: 200upx;
				}
			}
		
			.send-input {
				position: relative;
		
				input {
					border: 1px solid #CCC;
					background-color: #EEE;
					border-radius: 60upx;
					text-align: center;
					width: 300upx;
					height: 80upx;
					font-size: 32upx;
					font-weight: 700;
				}
		
				image {
					position: absolute;
					width: 50upx;
					height: 50upx;
					right: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>
