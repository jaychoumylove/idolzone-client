<template>
	<view class="active-open-container">
		<view class="star-list-container">
			<view class="star-top-info flex-set">
				<view class="left-content">
					<image style="width: 220rpx;" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FD3Srp4OIkJXZJK36LesDTEBb8jawPTGiaxB3bxLKRRQEvMuf9qhO4zkkAaG1o3kR5v9SMXf3jbNA/0"
					 mode="widthFix"></image>
					<view class="text">爱豆勇气排名</view>
				</view>
				<view class="right-content" @tap="goPage('/pages/active_open/star_rank')">查看更多>></view>
			</view>
			<view class="star-list">
				<view class="star-item" v-for="(item,index) in starList" :key="index">
					<view class="star-img">
						<image :src="item.star.head_img_s" mode="aspectFill"></image>
						<view class="rank flex-set">{{index+1}}</view>
					</view>
					<view class="star-name text-overflow">{{item.star.name}}</view>
					<view class="star-courage-num">
						<image class="courage" :src="courage_img" mode="widthFix"></image>
						<view class="num">{{item.courage || 0}}</view>
					</view>
					<view class="star-reward">
						{{pet_adventure.star_reward.list[index]}}
					</view>
				</view>

			</view>
		</view>
		<view class="tab-container">
			<view class="tab-item flex-set" @tap="currentTabType(1)">
				<text :class="{active:tabtype==1}">冒险获取勇气</text>
			</view>
			<view class="tab-item flex-set" @tap="currentTabType(2)">
				<text :class="{active:tabtype==2}">勇气值排名</text>
			</view>
			<view class="tab-item flex-set" @tap="currentTabType(3)">
				<text :class="{active:tabtype==3}">勇气值解锁奖励</text>
			</view>
		</view>
		<view class="adventure-container" v-if="tabtype==1">
			<view class="adventure-top">
				<view class="my-courage">
					我的勇气值：{{adventureInfo.my_courage || 0}}
					<image class="courage" :src="courage_img" mode="widthFix"></image>
				</view>
				<view class="rule" @tap="goPage(pet_adventure.notice.go_page)">{{pet_adventure.notice.desc}}>></view>
			</view>
			<view class="refresh_tips">
				<text>{{pet_adventure.notice.refresh_tips}}</text>
				<view class="courage_log" @tap="goPage('/pages/active_open/courage_log')">冒险记录>></view>
			</view>
			<view class="adventure-list">
				<view class="adventure-item">
					<view class="item-cont">
						<view class="reward">
							<image style="width: 60%;" :src="courage_img" mode="widthFix"></image>
							<view class="courage_num">+{{adventureInfo.my_first_courage || 0}}</view>
						</view>
						<view class="symbol">=</view>
						<block v-if="adventureInfo.my_first_list.length>0">
							<scroll-view scroll-x="true" class="scroll-x">
								<view class="pet-list" :style="'width:'+adventureInfo.my_first_list.length*140+ 'rpx'">
									<block v-for="(item,index) in adventureInfo.my_first_list" :key="index">
										<view class="pet-item flex-set">
											<image class="pet" :src="item.animal.image" mode="widthFix"></image>
											<view class="value">
												<view class="value-num flex-set">
													<text>+{{item.courage_value}}</text>
													<image style="width: 25rpx;" :src="courage_img" mode="widthFix"></image>
												</view>
											</view>
										</view>
										<view class="symbol" v-if="adventureInfo.my_first_list[index+1]">+</view>
									</block>
								</view>
							</scroll-view>
						</block>
						<block v-else>
							<view class="pet-list" :style="'width:360rpx'">
								<view class="pet-item flex-set">
								</view>
							</view>
						</block>
						<view class="item-btn">
							<btnComponent type="adventureover" @tap="getAdventureReward('other')" v-if="!adventureInfo.my_first_is_settle">
								<view class="flex-set" style="width: 130rpx; height: 50rpx; font-size: 24rpx;">点击冒险</view>
							</btnComponent>
							<btnComponent type="disable" v-else>
								<view class="flex-set" style="width: 130rpx; height: 50rpx; font-size: 24rpx;">已领取</view>
							</btnComponent>
						</view>
					</view>
					<view class="item-desc">说明：带上你的萌宠一起去冒险赢取勇气值</view>
				</view>
				<view class="adventure-item">
					<view class="item-cont">
						<view class="reward">
							<image style="width: 60%;" :src="courage_img" mode="widthFix"></image>
							<view class="courage_num">+{{adventureInfo.my_second_courage || 0}}</view>
						</view>
						<view class="symbol">=</view>
						<block v-if="adventureInfo.my_second_list.length>0">
							<scroll-view scroll-x="true" class="scroll-x">
								<view class="pet-list" :style="'width:'+adventureInfo.my_second_list.length*140+ 'rpx'">
									<block v-for="(item,index) in adventureInfo.my_second_list" :key="index">
										<view class="pet-item flex-set">
											<image class="pet" :src="item.animal.image" mode="widthFix"></image>
											<view class="value">
												<view class="value-num flex-set">
													<text>+{{item.courage_value}}</text>
													<image style="width: 25rpx;" :src="courage_img" mode="widthFix"></image>
												</view>
											</view>
										</view>
										<view class="symbol" v-if="adventureInfo.my_second_list[index+1]">+</view>
									</block>
								</view>
							</scroll-view>
						</block>
						<block v-else>
							<view class="pet-list" :style="'width:360rpx'">
								<view class="pet-item flex-set">
								</view>
							</view>
						</block>
						<view class="item-btn">
							<btnComponent type="adventureover" @tap="getAdventureReward('normal')" v-if="!adventureInfo.my_second_is_settle">
								<view class="flex-set" style="width: 130rpx; height: 50rpx; font-size: 24rpx;">点击冒险</view>
							</btnComponent>
							<btnComponent type="disable" v-else>
								<view class="flex-set" style="width: 130rpx; height: 50rpx; font-size: 24rpx;">已领取</view>
							</btnComponent>
						</view>
					</view>
					<view class="item-desc">说明：带上你的十二生肖宠物一起去冒险赢取勇气值</view>
				</view>
				<view class="adventure-item">
					<view class="item-cont">
						<view class="reward">
							<image style="width: 60%;" :src="courage_img" mode="widthFix"></image>
							<view class="courage_num">+{{adventureInfo.my_third_courage || 0}}</view>
						</view>
						<view class="symbol">=</view>
						<block v-if="adventureInfo.my_third_list.length>0">
							<scroll-view scroll-x="true" class="scroll-x">
								<view class="pet-list" :style="'width:'+adventureInfo.my_third_list.length*140+ 'rpx'">
									<block v-for="(item,index) in adventureInfo.my_third_list" :key="index">
										<view class="pet-item flex-set">
											<image class="pet" :src="item.animal.image" mode="widthFix"></image>
											<view class="value">
												<view class="value-num flex-set">
													<text>+{{item.courage_value}}</text>
													<image style="width: 25rpx;" :src="courage_img" mode="widthFix"></image>
												</view>
											</view>
										</view>
										<view class="symbol" v-if="adventureInfo.my_third_list[index+1]">+</view>
									</block>
								</view>
							</scroll-view>
						</block>
						<block v-else>
							<view class="pet-list" :style="'width:360rpx'">
								<view class="pet-item flex-set">
								</view>
							</view>
						</block>
						
						<view class="item-btn">
							<btnComponent type="adventureover" @tap="getAdventureReward('super_secret')" v-if="!adventureInfo.my_third_is_settle">
								<view class="flex-set" style="width: 130rpx; height: 50rpx; font-size: 24rpx;">点击冒险</view>
							</btnComponent>
							<btnComponent type="disable" v-else>
								<view class="flex-set" style="width: 130rpx; height: 50rpx; font-size: 24rpx;">已领取</view>
							</btnComponent>
						</view>
					</view>
					<view class="item-desc">说明：带上你的灵宠一起去冒险赢取勇气值</view>
				</view>
			</view>
			<view class="refresh_tips">
				<text>{{pet_adventure.notice.bottom_tips}}</text>
				<view class="courage_log" @tap="goPage(pet_adventure.notice.go_page)">宠物冒险值>></view>
			</view>
		</view>
		<view class="user-list-container" v-if="tabtype==2">
			<view class="user-list-three">
				<view class="user-item" v-for="(item,index) in userList" :key="index" v-if="index<3" @tap="goOtherManor(item.user_id)">
					<view class="user-item-cont">
						<view class="top-animal-img flex-set">
							<image class="bg-img" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FD3Srp4OIkJXZJK36LesDT0Bibg3Fh1F8rbZfdy2T3NlSW4wn67ZA2XESEAt1IflYj7LMRA8ymavg/0" mode="widthFix"></image>
							<image class="bg-img" v-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FD3Srp4OIkJXZJK36LesDT9lt8bNnWEDwcgbpp3icjHxoIc8HMnHxdKof1M6ia46wsYm8GTIRYMIgA/0" mode="widthFix"></image>
							<image class="bg-img" v-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FD3Srp4OIkJXZJK36LesDTRR9iatepFcecf9j77C7IHfQAxbyAQicE0EQPexVENBH6dljGia0JBBbcQ/0" mode="widthFix"></image>
							<image class="animal-img" v-if="index==0" style="width: 90%" :src="item.animal_img" mode="widthFix"></image>
							<image class="animal-img" v-if="index==1" style="width: 150%" :src="item.animal_img" mode="widthFix"></image>
							<image class="animal-img" v-if="index==2" :src="item.animal_img" mode="widthFix"></image>
						</view>
						<view class="user-item-info flex-set" :class="{'item-info-color1':index==0,'item-info-color2':index==1,'item-info-color3':index==2}">
							<image v-if="index==1" style="width: 20%;" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FD3Srp4OIkJXZJK36LesDTbZF23B2C02WicaR181peBxjWa9mwGrZ4lKRHCtaIfxCtIslibUDiaLAuA/0"
							 mode="widthFix"></image>
							<view class="user-info">
								<view class="user-img">
									<image :src="item.user.avatarurl || $app.getData('AVATAR') " mode="aspectFill"></image>
									<view class="user-rank flex-set">{{index==2?'3':(index==1?'1':'2')}}</view>
								</view>
								<view class="user-name text-overflow">{{item.user.nickname || $app.getData('NICKNAME')}}</view>
							</view>
							<view class="star-name text-overflow">
								<text>{{item.star.name || '神秘爱豆'}}</text>
							</view>
							<view class="user-courage-num">
								<image class="courage" :src="courage_img" mode="widthFix"></image>
								<view class="num">{{item.courage || 0}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="user-list">
				<view class="item" v-for="(item,index) in userList" :key="index" v-if="index>=3" @tap="goOtherManor(item.user_id)">
					<view class="cont flex-set">
						<view class="user-img">
							<image :src="item.user.avatarurl || $app.getData('AVATAR') " mode="aspectFill"></image>
							<view class="user-rank flex-set">{{index+1}}</view>
						</view>
					</view>
					<view class="cont flex-set">
						<view class="user-name text-overflow">{{item.user.nickname || $app.getData('NICKNAME')}}</view>
						<view class="star-name text-overflow"><text>{{item.star.name || '神秘爱豆'}}</text></view>
					</view>
					<view class="cont flex-set">
						<image class="animal-img" :src="item.animal_img" mode="widthFix"></image>
					</view>
					<view class="cont flex-set">
						<view class="user-courage-num">
							<view class="flex-set">
								<image class="courage" :src="courage_img" mode="widthFix"></image>
								<text>勇气值</text>
							</view>

							<view class="num">{{item.courage || 0}}</view>
						</view>
					</view>
				</view>


			</view>
		</view>
		<view class="open-container" v-if="tabtype==3">
			<view class="open-tab">
				<view class="open-tab-item">
					<btnComponent type="adventure" @tap="currentOpenTabType('open')">
						<view class="flex-set" style="width: 150rpx; height: 60rpx; font-size: 24rpx;">解锁开屏</view>
					</btnComponent>
				</view>
				<view class="open-tab-item">
					<btnComponent type="adventure" @tap="currentOpenTabType('box')">
						<view class="flex-set" style="width: 150rpx; height: 60rpx; font-size: 24rpx;">普通宝箱</view>
					</btnComponent>
				</view>
				<view class="open-tab-item">
					<btnComponent type="adventure" @tap="currentOpenTabType('big_box')">
						<view class="flex-set" style="width: 150rpx; height: 60rpx; font-size: 24rpx;">稀有宝箱</view>
					</btnComponent>
				</view>
				<!-- <view class="open-tab-item">
					<btnComponent type="adventure" @tap="currentOpenTabType('share_box')">
						<view class="flex-set" style="width: 150rpx; height: 60rpx; font-size: 24rpx;">好友宝箱</view>
					</btnComponent>
				</view> -->
				<!-- <view class="open-tab-item">
					<btnComponent type="adventure" @tap="currentOpenTabType('share_big_box')">
						<view class="flex-set" style="width: 150rpx; height: 60rpx; font-size: 24rpx;">我的宝藏</view>
					</btnComponent>
				</view> -->
			</view>
			<view class="open-cont">
				<view class="open-cont1" v-if="openTabtype=='open'">
					<view class="open_tips" v-if="pet_adventure.notice.open_tips">
						<text>{{pet_adventure.notice.open_tips}}</text>
					</view>
					<view class="list-wrapper">
						<view class="item" v-for="(item,index) in openList" :key="index">
							<view class="left">
								<view class="time">{{item.date_text}}{{item.title}}</view>
							</view>
							<view class="right">
								<view class='avatar'>
									<image :src="item.user.avatarurl || ''" mode="aspectFill"></image>
								</view>
								<view class="text-container">
									<view class="nickname text-overflow">{{item.user.nickname || '暂无占领者'}}</view>
									<block v-if="!item.timeout">
										<view class="bottom-text" v-if="item.star_id">
											<text class="star-name">{{item.star.name || '神秘爱豆'}}</text>
										</view>
										<view class="bottom-text" v-else @tap="occupyOpen(item)">
											<btnComponent type="default">
												<view class="flex-set" style="width: 140upx;height: 40upx;">我来占领</view>
											</btnComponent>
										</view>
									</block>
									<block v-else>
										<view class="bottom-text" v-if="item.star_id">
											<text class="star-name">{{item.star.name || '神秘爱豆'}}</text>
										</view>
										<view class="bottom-text" v-else>占领时间已过</view>
									</block>
								</view>
							</view>
						</view>
						
						
					</view>
				</view>
				<view class="open-cont2" v-if="openTabtype=='box' || openTabtype=='big_box'">
					<view class="open_tips" v-if="pet_adventure.box_list.desc">
						<text>{{pet_adventure.box_list.desc}}</text>
					</view>
					<view class="list-wrapper">
						<view class="item" v-for="(item,index) in boxList" :key="index">
							<view class="box-info">
								<view class="box-img">
									<image :src="item.image" mode="aspectFill"></image>
								</view>
								<view class="info">
									<view class="info-top">
										<view class="title text-overflow">{{item.title}}</view>
										<view class="need-courage flex-set">
											勇气值{{item.need_courage || 0}}解锁
										</view>
									</view>
									<view class="number">
										说明：打开后可获得<text class="num">{{item.number || 0}}</text>金豆
									</view>
								</view>
								<view class="btn-wrapper">
									<view class="btn">
										<block v-if="item.is_get">
											<btnComponent type="disable">
												<view class="flex-set" style="width: 130rpx; height: 50rpx; font-size: 24rpx;">已领取</view>
											</btnComponent>
										</block>
										<block v-if="!item.is_get">
											<btnComponent type="adventure" v-if="adventureInfo.my_courage<item.need_courage">
												<view class="flex-set" style="width: 130rpx; height: 50rpx; font-size: 24rpx;">去冒险</view>
											</btnComponent>
											<btnComponent type="adventureover" v-else @tap="getBoxReward(index)">
												<view class="flex-set" style="width: 130rpx; height: 50rpx; font-size: 24rpx;">点击领取</view>
											</btnComponent>
										</block>
									</view>
								</view>
							</view>
							<view class="unlock-progress">
								<view class="text">勇气值解锁宝箱进度</view>
								<view class="progress-wrap">
									<view class="progress">
										<view class="progress-inner" v-if="adventureInfo.my_courage<item.need_courage" :style="'width:'+(adventureInfo.my_courage/item.need_courage*100)+'%;background-color:#fbcc3e'"></view>
										<view class="progress-inner" v-else style="width:100%;background-color:#fbcc3e"></view>
									</view>
									<view class="text">
										<view class="">{{adventureInfo.my_courage || 0}}/{{item.need_courage || 0}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<modalComponent v-if="modal == 'getRewardSuccess'" type="center" title="提示" @closeModal="modal=''">
			<view class="get-reward-container">
				<view class="title">领取成功</view>
				<image class="bg" v-if="rewardData.coin" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
				 mode="aspectFill"></image>
				 <image class="bg" v-if="rewardData.panacea" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtVH7OoNPjuMs2xwl26pXQGbQn74vvibp5mUNuJk7ucxzdXGAd8OlHJDA/0"
				  mode="aspectFill"></image>
				<view class="count" v-if="rewardData.coin">+{{rewardData.coin}}</view>
				<view class="count" v-if="rewardData.panacea">+{{rewardData.panacea}}</view>
				<view class="btn-wrap">
					<btnComponent type="adventure" @tap="modal=''">
						<view class="flex-set" style="width: 240rpx; height: 80rpx; font-size: 28rpx;">我知道了</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
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
				courage_img: 'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Exvr8ppbZ5VVuxbP7tSmU4nKUGxoYVA4KdJwS3Jud6MOXdooRdAEHYuqBeib1976IIGUOvTcO5OoQ/0',
				page: 1,
				size: 10,
				type: 'user',
				select_star_id: '',
				rankField: 'courage',
				starList: [],
				userList: [],
				pet_adventure: [],
				tabtype: 1,
				openTabtype: 'open',
				adventureInfo: '',
				openList: [],
				boxList: [],
				rewardData: [],
				modal: '',
			};
		},
		onShow() {
			this.pet_adventure = this.$app.getData('config').pet_adventure
			var that = this;
			this.getActiveRank('star', 3, function(data) {
				that.starList = data;
			});
			this.getAdventureInfo();
		},
		onReachBottom() {
			this.page++;
			if(this.tabtype==2){
				var that = this;
				this.getActiveRank('user', this.size, function(data) {
					if (that.page == 1) {
						that.userList = data
					} else {
						that.userList = that.userList.concat(data)
					}
				});
			}
		},
		methods: {
			goPage(url){
				this.$app.goPage(url);
			},
			goOtherManor(user_id) {
				if (!user_id) return false;
				uni.navigateTo({
					url:`/pages/manor/other_manor?user=${user_id}`
				})
			},
			currentTabType(type){
				this.tabtype = type;
				this.page = 1;
				if(type==1){
					this.getAdventureInfo();
				}else if(type==2){
					var that = this;
					this.getActiveRank('user', this.size, function(data) {
						that.userList = data;
					});
				}else if(type==3){
					this.getOpenList();
				}
			},
			currentOpenTabType(type){
				this.openTabtype = type;
				if(type=='open'){
					this.getOpenList();
				}else if(type=='box' || type=='share_box' || type=='share_big_box' || type=='big_box'){
					this.getBoxList(type);
				}
			},
			getActiveRank(type, size, fcallback) {
				this.$app.request('activeopen/rank', {
					page: this.page,
					size: size,
					type: type,
					star_id: this.select_star_id,
					rankField: this.rankField,
				}, res => {
					fcallback(res.data);
				})
			},
			getAdventureInfo(){
				this.$app.request('activeopen/adventure_info', {}, res => {
					this.adventureInfo = res.data;
					if(res.data.my_manor_output<12){
						let that = this;
						uni.showModal({
							title: '提示',
							content: '前方危险!庄园产量达到10秒12金豆才能参与冒险',
							confirmText: '召唤宠物',
							cancelText: '我知道了',
							success: function(res) {
								if (res.confirm) {
									that.$app.goPage('/pages/manor/animal_list');
								} else if (res.cancel) {
									that.$app.goPage('/pages/group/group');
								}
							}
						});
					}
				})
			},
			getAdventureReward(type){
				this.$app.request('activeopen/get_adventure_reward', {type:type}, res => {
					let text = '领取成功，勇气+'+res.data;
					this.$app.toast(text);
					this.getAdventureInfo();
					var that = this;
					this.getActiveRank('star', 3, function(data) {
						that.starList = data;
					});
				})
				
			},
			getOpenList(){
				this.$app.request('activeopen/get_open_list', {}, res => {
					this.openList = res.data;
				})
			},
			occupyOpen(item){
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认占领'+item.date_text+' '+item.title+'，日期一旦占领，不可修改',
					success: function(res) {
						if (res.confirm) {
							that.$app.request('activeopen/occupy_open', {id:item.id}, res => {
								that.$app.toast('占领成功','success');
								that.getOpenList();
							})
						} else if (res.cancel) {
							
						}
					}
				});
			},
			getBoxList(type){
				this.$app.request('activeopen/get_box_list', {type:type}, res => {
					this.boxList = res.data;
				})
			},
			getBoxReward(index){
				this.$app.request('activeopen/get_box_reward', {index:index,type:this.openTabtype}, res => {
					this.rewardData = res.data;
					this.modal = 'getRewardSuccess';
					this.getBoxList(this.openTabtype);
				})
			}
		}
	}
</script>

<style lang="scss">
	.active-open-container {
		height: 100%;
		padding: 20rpx 30rpx;

		.courage {
			width: 40rpx;
		}

		.star-list-container {
			width: 100%;

			.star-top-info {
				display: flex;
				justify-content: space-between;

				.left-content {
					color: #FFFFFF;
					position: relative;

					.text {
						position: absolute;
						top: 20%;
						left: 10%;
					}

				}

				.right-content {
					color: #FFC19D;
				}
			}

			.star-list {
				display: flex;
				flex-direction: row;

				.star-item {
					width: 33.3%;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 20rpx 0;

					.star-img {
						width: 130rpx;

						image {
							width: 130rpx;
							height: 130rpx;
							border-radius: 50%;
							border: 6rpx solid #FFC19D;
						}

						position: relative;

						.rank {
							width: 40rpx;
							height: 40rpx;
							color: #FFFFFF;
							font-weight: bold;
							background-color: #FFD840;
							border-radius: 50%;
							position: absolute;
							bottom: 0;
							right: 0;
						}
					}

					.star-name {
						font-size: 32rpx;
						font-weight: bold;
						text-align: center;
						color: #FF5174;
						padding-top: 10rpx;
						max-width: 180rpx;
					}

					.star-courage-num {
						display: flex;
						flex-direction: row;
						align-items: center;
						color: #B5B5B5;
						font-size: 24rpx;
						padding: 10rpx 0;
					}

					.star-reward {
						padding: 5rpx 20rpx;
						border-radius: 30rpx;
						color: #F88A4B;
						background-color: #FFDFC6;
					}
				}
			}
		}

		.tab-container {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0;

			.tab-item {
				flex: 1 0%;

				text {
					font-size: 24rpx;
					color: #BFBFBF;
					padding: 10rpx 0;
				}
			}

			.active {
				font-size: 28rpx !important;
				color: #FFC19D !important;
				border-bottom: 4rpx solid #FFC19D;
			}
		}

		.adventure-container{
			width: 100%;
			border: 6rpx solid #FFD840;
			border-radius: 30rpx;
			display: flex;
			flex-direction: column;
			padding: 20rpx 10rpx;
			margin-bottom: 40rpx;
			color: #8A4B36;
			
			.adventure-top{
				display: flex;
				justify-content: space-between;
				color: #EC7934;
				font-size: 24rpx;
				font-weight: bold;
				padding: 0 20rpx;
				
			}
			.refresh_tips{
				padding: 10rpx 20rpx;
				display: flex;
				justify-content: space-between;
				text{
					padding: 5rpx 20rpx;
					background-color: #F9F1E0;
					font-size: 22rpx;
					font-weight: bold;
					border-radius: 20rpx;
				}
				.courage_log{
					color: #EC7934;
					font-size: 24rpx;
					font-weight: bold;
				}
			}
			
			.adventure-list{
				width: 100%;
				display: flex;
				flex-direction: column;
				.adventure-item{
					width: 100%;
					display: flex;
					flex-direction: column;
					border: 3rpx solid #BCA893;
					box-shadow: 0rpx 3rpx 0rpx 0rpx #FFD840;
					border-radius: 30rpx;
					background-color: #F9F1E0;
					padding: 20rpx 10rpx;
					margin: 15rpx 0;
					.item-cont{
						width: 100%;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						padding-bottom: 10rpx;
						.reward{
							width: 100rpx;
							height: 130rpx;
							border: 4rpx dashed #BCA893;
							background-color: #F8E9CA;
							border-radius: 20rpx;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
						}
						.scroll-x{
							width: 360rpx;
							height: 130rpx;
							.pet-list{
								height: 130rpx;
								display: flex;
								flex-direction: row;
								align-items: center;
							}
						}
						.pet-item{
							width: 100rpx;
							height: 130rpx;
							background-color: #BCA893;
							border-radius: 20rpx;
							position: relative;
							.pet{
								width: 100%;
							}
							.value{
								position: absolute;
								bottom: 0;
								right: -5rpx;
								.value-num{
									display: flex;
									flex-direction: row;
									border: 2rpx solid #BCA893;
									background-color: #F8E9CA;
									border-radius: 15rpx;
									font-size: 22rpx;
									padding: 0 5rpx;
								}
							}
						}
						.symbol{
							font-size: 36rpx;
							font-weight: bold;
							padding: 0 5rpx;
						}
						.item-btn{
							padding-left: 10rpx;
						}
					}
					.item-desc{
						padding-left: 20rpx;
						font-size: 22rpx;
					}
				}
			}
		
		
		
		}

		.user-list-container {
			.user-list-three {
				display: flex;
				flex-wrap: wrap;

				.user-item {
					width: 33.3%;
					min-height: 420rpx;
					position: relative;

					.user-item-cont {
						width: 100%;
						display: flex;
						flex-direction: column;
						position: absolute;
						bottom: 0;

						.top-animal-img {
							width: 100%;
							position: relative;

							.bg-img {
								width: 100%;
								position: absolute;
								bottom: 0;
								z-index: 1;
							}

							.animal-img {
								width: 80%;
								position: relative;
								z-index: 4;
							}
						}

						.item-info-color1 {
							background-color: #FF774D;
							border-top-left-radius: 30rpx;
						}

						.item-info-color2 {
							background-color: #FFD664;
							border-top-left-radius: 30rpx;
							border-top-right-radius: 30rpx;
						}

						.item-info-color3 {
							background-color: #40D5FD;
							border-top-right-radius: 30rpx;
						}

						.user-item-info {
							width: 100%;
							display: flex;
							flex-direction: column;
							color: #FFFFFF;
							margin-top: -20rpx;
							padding-top: 10rpx;
							position: relative;
							z-index: 5;

							.user-info {
								width: 100%;
								display: flex;
								flex-direction: row;
								justify-content: center;
								padding: 10rpx 0;

								.user-img {
									width: 50rpx;

									image {
										width: 50rpx;
										height: 50rpx;
										border-radius: 50%;
									}

									position: relative;

									.user-rank {
										width: 20rpx;
										height: 20rpx;
										font-size: 12rpx;
										color: #FF5174;
										background-color: #FFFFFF;
										border-radius: 50%;
										font-weight: bold;
										position: absolute;
										bottom: -5rpx;
										right: 0;
									}
								}

								.user-name {
									max-width: 150rpx;
									font-size: 28rpx;
									padding-left: 10rpx;
								}
							}

							.star-name {
								max-width: 70%;

								text {
									padding: 2rpx 10rpx;
									background-color: #FFFFFF;
									border-radius: 20rpx;
									font-size: 24rpx;
									color: #FF5174;
								}
							}

							.user-courage-num {
								display: flex;
								flex-direction: row;
								align-items: center;
								font-size: 24rpx;
								padding: 10rpx 0 20rpx;
							}
						}
					}

				}
			}

			.user-list {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 20rpx;

				.item {
					width: 100%;
					background-color: #f5f5f5;
					border-radius: 20rpx;
					margin: 10rpx 0;
					padding: 20rpx;
					display: flex;
					flex-wrap: wrap;

					.cont {
						flex: 1 0%;
						display: flex;
						flex-direction: column;
						position: relative;

						.user-img {
							width: 100rpx;

							image {
								width: 90rpx;
								height: 90rpx;
								border-radius: 50%;
								border: 4rpx solid #FFC19D;
							}

							position: relative;

							.user-rank {
								width: 40rpx;
								height: 40rpx;
								color: #FFFFFF;
								font-weight: bold;
								background-color: #FFD840;
								border-radius: 50%;
								position: absolute;
								bottom: 0;
								right: 0;
							}
						}

						.user-name {
							max-width: 100%;
							color: #6B6B6B;
						}

						.star-name {
							max-width: 80%;
							margin-top: 10rpx;

							text {
								padding: 4rpx 10rpx;
								background-color: #FFC19D;
								border-radius: 20rpx;
								font-size: 24rpx;
								color: #FFFFFF;
							}
						}

						.animal-img {
							width: 80%;
							position: absolute;
						}

						.user-courage-num {
							display: flex;
							flex-direction: column;
							align-items: center;
							font-size: 24rpx;
							color: #FFC19D;

							.num {
								padding-top: 10rpx;
							}
						}
					}
				}
			}
		}
	
		.open-container{
			width: 100%;
			border: 6rpx solid #FFD840;
			border-radius: 30rpx;
			display: flex;
			flex-direction: column;
			padding: 20rpx 10rpx;
			margin-bottom: 40rpx;
			color: #8A4B36;
			
			.open-tab{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.open-tab-item{
					display: flex;
					flex: 1 0%;
					justify-content: center;
		
				}
			}
			
			.open-cont{
				
				.open_tips{
					margin-top: 20rpx;
					padding: 10rpx 20rpx;
					background-color: #F9F1E0;
					text{
						padding: 5rpx 20rpx;
						font-size: 22rpx;
						font-weight: bold;
					}
				}
				
				.open-cont1{
					.list-wrapper {
					
						.item {
							display: flex;
							justify-content: space-around;
							align-items: center;
							padding: 10upx;
							border: 3rpx solid #BCA893;
							box-shadow: 0rpx 3rpx 0rpx 0rpx #FFD840;
							border-radius: 30rpx;
							background-color: #F9F1E0;
							margin: 15rpx 0rpx;
					
					
							.left {
								padding: 10upx 0;
								font-size: 28rpx;
								line-height: 28upx;
								.time{
								}
							}
					
							.right {
								display: flex;
								flex-direction: row;
								align-items: center;
								padding: 10rpx 20rpx;
					
								.avatar image {
									width: 80upx;
									height: 80upx;
									border-radius: 50%;
									border: 4rpx solid #FFC19D;
								}
					
								.text-container {
									width: 220upx;
									padding-left: 30rpx;
									padding-bottom: 10rpx;
									line-height: 44upx;
					
									.nickname {
										max-width: 200rpx;
										color: #EC7934;
									}
					
									.bottom-text {
										display: flex;
										align-items: center;
										font-size: 24rpx;
										.star-name{
											background-color: #EC7934;
											padding: 0 10rpx;
											color: #fff;
											border-radius: 20rpx;
										}
									}
								}
							}
					
					
						}
					
					}
				}
			
				.open-cont2{
					.list-wrapper {
					
						.item {
							display: flex;
							flex-direction: column;
							padding: 20upx;
							border: 3rpx solid #BCA893;
							box-shadow: 0rpx 3rpx 0rpx 0rpx #FFD840;
							border-radius: 30rpx;
							background-color: #F9F1E0;
							margin: 15rpx 0rpx;
							
							.box-info{
								display: flex;
								flex-direction: row;
								align-items: center;
								
								.box-img {
									width: 100rpx;
								
									image {
										width: 100rpx;
										height: 100rpx;
									}
								
								}
							
								.info{
									display: flex;
									flex-direction: column;
									padding-left: 25rpx;
									.info-top{
										display: flex;
										flex-direction: row;
										align-items: center;
										.title {
											font-weight: bold;
											color: #8A4B36;
											padding-top: 5rpx;
											max-width: 180rpx;
										}
										.need-courage {
											min-width: 120rpx;
											height: 40rpx;
											color: #F88A4B;
											font-weight: bold;
											font-size: 22rpx;
											background-color: #FFDFC6;
											margin-left: 10rpx;
											padding: 0 10rpx;
										}
									}
									.number {
										color: #FFC19D;
										display: flex;
										flex-direction: row;
										align-items: center;
										font-size: 24rpx;
										padding-top: 10rpx;
									}
								}
								
								.btn-wrapper{
									display: flex;
									justify-content: flex-end;
									flex: 1 0%;
								}
							}
							.unlock-progress{
								display: flex;
								flex-direction: row;
								font-size: 24rpx;
								.progress-wrap {
									display: flex;
									width: 250rpx;
									padding-left: 20rpx;
									align-items: center;
									position: relative;
								
									.progress {
										width: 250rpx;
										background-color: #f9f9f9;
										height: 25upx;
										border-radius: 20upx;
										overflow: hidden;
								
										.progress-inner {
											height: 100%;
											border-radius: 20upx;
										}
									}
								
									.text {
										width: 100%;
										position: absolute;
										left: 0%;
										view{
											width: 100%;
											text-align: center;
										}
									}
								}
							}
						}
					}
				}
			
			}
		}
	
		.get-reward-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: -80upx;
			padding: 40upx;
			overflow: hidden;
					
			.title {
				font-size: 36upx;
				font-weight: 700;
			}
					
			.tips {
				padding: 20upx;
			}
					
			.count {
				font-size: 50upx;
				padding-bottom: 20upx;
				font-weight: 700;
				color: $bg-color-2;
				margin-bottom: 30rpx;
			}
					
			.bg {
				width: 150upx;
				height: 150upx;
				margin: 30rpx 0;
			}
					
			.btn {
				padding: 10upx 30upx;
				font-size: 30upx;
				width: 220upx;
				font-weight: 600;
			}
		
		
		}
	}
</style>
