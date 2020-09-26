<template>
	<view class="lucky-container">
		<view class="day-recharge">
			<view class="content">
				<view class="header">
					<view class="bg">
						<view class="m-title">
							{{lrtext.day_first_charge.title || ''}}
						</view>
					</view>
				</view>
				<view class="btn">
					<btnComponent v-if="my.dayPaid.count >= dayPaid.count" :type="my.dayPaid.is_settle == 0 ? 'success': 'disable'" @tap="getPaidReward(dayPaid)">
						<view class="get-bg-bm flex-set">
							<text v-if="my.dayPaid.is_settle > 0">今日已领取</text>
							<text v-else>{{lrtext.day_first_charge.btn_text || ''}}</text>
						</view>
					</btnComponent>
					<btnComponent v-else type="default" @tap="getPaidReward(dayPaid)">
						<view class="get-bg-bm flex-set normal-bg-bm">
							<text>{{lrtext.day_first_charge.btn_text || ''}}</text>
						</view>
					</btnComponent>
				</view>
				<view class="title">
					{{lrtext.day_first_charge.desc || ''}}
				</view>
				<view class="prize">
					<view class="item" v-for="(item, index) in dayPaid.reward" :key="index">
						<!-- <image mode="widthFix" :src="item.image_o" v-if="dayPaid.double&&item.image_o"></image>
						<image mode="widthFix" :src="item.image" v-else></image> -->
						<image mode="widthFix" :src="item.image"></image>
						<view class="number flex-set">X {{$app.formatNumber(item.number || 0)}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="recharge">
			<view class="content">
				<view class="header">
					<view class="bg">
						{{lrtext.sum_charge.title || ''}}
					</view>
				</view>
				<view class="right-tip" @tap="$app.goPage('/pages/lucky/paid_log')">
					<view class="flex-set get-btn">
						我的领取
					</view>
				</view>
				<view class="tip flex-set">
					<view class="tip-desc">{{lrtext.sum_charge.desc || ''}}</view>
				</view>
				<view class="charge-prize" v-if="sumPaid">
					<view class="item" v-for="(item, index) in sumPaid" :key="index">
						<view class="card">
							<view style="margin: 0 50upx;">
								<view style="display: flex;flex-direction: column;">
									<view class="lable">
										<view v-for="(ite, ind) in item.reward" :key="ind">
											{{ite.type == 'currency' ? '领': ''}}
											{{$app.formatNumber(ite.number || 0)}}
											{{ite.type == 'prop'&&ite.key_name&&ite.key_name=="lucky_draw" ? '张': ''}}
										</view>
									</view>
									<view class="image-group">
										<block v-for="(ite, ind) in item.reward" :key="ind">
											<image v-if="item.double&&ite.image_o" mode="aspectFit" :src="ite.image_o"></image>
											<image v-else mode="aspectFit" :src="ite.image"></image>
										</block>
									</view>
								</view>
							</view>
						</view>
						<view class="btn">
							<btnComponent :type="my.sumPaid.count >= item.count&&my.sumPaid.is_settle == 0 ? 'success': 'default'" @tap="getPaidReward(item)">
								<view class="get-bg-bm flex-set" :class="my.sumPaid.count >= item.count ? '': 'normal-bg-bm'">
									<text v-if="my.sumPaid.count >= item.count">可领取</text>
									<text v-else>补充{{$app.formatNumber(my.sumPaid.count || 0)}}/{{$app.formatNumber(item.count || 0)}}领取</text>
								</view>
							</btnComponent>
						</view>
					</view>
				</view>
				<view class="lottery-tip">
					<view class="label">
						{{lrtext.sum_charge.lucky.title || ''}}
					</view>
					<view class="go-label" @tap="$app.goPage('/pages/lucky/log')">
						{{lrtext.sum_charge.lucky.tip || ''}}
					</view>
				</view>
				
				<view class="dial-container">
					<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5ibLeIKoQPDMLgiblRd3GPSHeJ54HqaQ78IQkMPALILcFaorZOiafQ3lGg/0"
					 mode=""></image>
					<image class="dial-main" :style="{transition:lotteryTransition+'s', transform: 'rotate('+lotteryRotate+'deg)'}" :src="lucky_draw.draw||'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5H4zzF5xB3nzZNU0ZjOvMia94VeBrnibFLbdW8DdNMq8QsXMBaTBdkTyg/0'" mode="aspectFill"></image>
					<view class="cursor-wrap" @tap="lotteryStart">
						<btnComponent>
							<image class="cursor" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HpdKa9zTbvwsKmJ6hE0kNdFsSibhljHgVZicHO5mUiaeViaDyCDuowWtcB6CcdygE8W2KwGlQPIfKCAg/0"
							 mode="aspectFill"></image>
						</btnComponent>
					</view>
					<view class="bg-bottom"  v-if="lucky_draw"></view>
				</view>
				
				<view class="reamin">
					<view v-if="lrtext.multiple_draw ? lrtext.multiple_draw.able: false">
						<btnComponent type="default" @tap="fiftyStart">
							<view class="get-bg-bm flex-set settle-bg-bm">
								<text>{{lrtext.multiple_draw ? lrtext.multiple_draw.btn_text: '五十连抽 送幸运碎片'}}</text>
							</view>
						</btnComponent>
					</view>
					<view class="bg-b">
						<view class="bg">
							 我的抽奖券：{{my_lucky_num || 0}}张
						</view>
					</view>
				</view>
				
				<view class="notice" v-if="rewardList.length">
					<image class="notice-icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoPXtMTFLV2ydAKSiawiapkia2icuuW67SfcBKp3mbQWicrWJb4rJskIWFuhQ/0"></image>
					<view class="notice-info">
						<swiper 
							:indicator-dots="false" 
							:autoplay="true" 
							:interval="3000" 
							:duration="1000" 
							vertical="true"
							touchable="false"
							circular='true'
							disable-touch="true"
						>
							<swiper-item v-for="(item, index) in rewardList" :key="index">
								<view class="notice-item">
									<image class="notice-avatar" :src="item.user.avatarurl || AVATAR"></image>
									<view class="notice-con">
										<view class="user-name text-overflow">{{item.user.nickname || NICKNAME}}</view>
										<view class="ucr">{{item.item.number > 0 ? '获得': '失去'}}</view>
										<view class="reward-name text-overflow">{{item.item.name}} X {{$app.formatNumber(Math.abs(item.item.number) || 0)}}</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		
		<view class="recharge animal-r" v-if="exchangeAnimalList">
			<view class="content">
				<view class="header">
					<view class="bg">
						{{animal_national_lucky_draw.title || ''}}
					</view>
				</view>
				<view class="tip flex-set">
					<view class="tip-desc">{{animal_national_lucky_draw.desc || ''}}</view>
				</view>
				<view class="charge-prize">
					<block v-for="(item, index) in exchangeAnimalList" :key="index">
						<view class="animal-item">
							<image class="animal" :src="item.scrap_img"></image>
							<view class="exchange-btn flex-set">
								<btnComponent type='success' v-if="item.need_lv_up_scrap < 0">
									<view class="flex-set" @tap="$app.goPage('/pages/manor/animal_list')" style="width: 80upx;height: 40upx;font-size: 24rpx;">去升级</view>
								</btnComponent>
								<btnComponent type='default' v-else>
									<view class="flex-set" @tap="openExchangeAnimalModal(item)" style="width: 80upx;height: 40upx;font-size: 24rpx;">兑换</view>
								</btnComponent>
							</view>
						</view>
					</block>
				</view>
				
				<!-- <view class="charge-prize">
					<block v-for="(item, index) in exchangeAnimal" :key="index">
						<view class="animalitem">
							<image class="animal" :src="item.image"></image>
							<view class="exchange-btn flex-set">
								<btnComponent type='default'>
									<view class="flex-set" @tap="openExchangeAnimalModal(item)" style="width: 130upx;height: 50upx;">兑换</view>
								</btnComponent>
							</view>
						</view>
					</block>
				</view> -->
			</view>
		</view>
		
		<view class="lucky">
			<view class="content">
				<view class="header">
					<view class="bg">
						{{lrtext.scrap.title || ''}}
					</view>
				</view>
				<view class="tip flex-set">
					<view class="tip-desc">
						{{lrtext.scrap.desc || ''}}
					</view>
				</view>
				<view class="charge-prize">
					<block v-for="(item, index) in scrapList" :key="index">
						<block v-if="item.type == 'REDIRECT'">
							<block v-if="$app.getData('userStar').id == item.extra.star||item.extra.star==0">
								<view class="item"  :class="{'auto-flex': scrapList.length == 1}">
									<view class="up">
										<!-- <image v-if="item == 1" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoibe7bdHGH2icR6cs7PCILZKIooG44pGchYZKGb4YicdQ8ichs3q6dEu1bQ/0"></image>
										<image v-if="item == 2" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoPVpqtoXHtz6OhLfRMCg4wK1dNZ2C4PTcJVwrqWTblRlWSE2fs6UB3Q/0"></image>
										<image v-if="item == 3" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoyZkhpAiawiaTWqs72ynSnAl3Yf8A1Cp8oMianQtru2xtmYiamwwLXrQnEQ/0"></image>
										<image v-if="item == 4" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoOxUXk3YG5KlOA4lYByS7xppcrEwOcJAQeUia6IxKBRicmwBtzgfELQYg/0"></image> -->
										<image mode="aspectFit" :src="item.image_l"></image>
										<view class="info">
											<view class="title text-overflow">{{item.name || ''}}</view>
											<view class="desc">{{item.desc || ''}}</view>
										</view>
										<view class="exchange flex-set" @tap="exchange(item)">
											<btnComponent :type="item.has_number >= item.count ? 'success': 'yellow'">
												<view class="flex-set">{{item.has_number >= item.count ? item.extra.able_lock: item.extra.unlock_text}}</view>
											</btnComponent>
										</view>
									</view>
									<view class="down">
										<image style="width: 25rpx;height: 25rpx; margin-right: 10rpx;" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vceee3ribmebyLp4YUkEa7my8VjaX641mQdlnTgrXCl0xWLSIicQMKicKb3Q/0"></image>
										<view class="progress-label flex-set">碎片兑换奖品进度</view>
										<view class="progress">
											<progress :percent="item.percent || 0" stroke-width="10" activeColor="#ff9f08" border-radius="5" />
											<view class="percent-cover">{{item.has_number}} / {{item.count}}</view>
										</view>
									</view>
								</view>
							</block>
						</block>
						<block v-else>
							<view class="item"  :class="{'auto-flex': scrapList.length == 1}">
								<view class="up">
									<!-- <image v-if="item == 1" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoibe7bdHGH2icR6cs7PCILZKIooG44pGchYZKGb4YicdQ8ichs3q6dEu1bQ/0"></image>
									<image v-if="item == 2" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoPVpqtoXHtz6OhLfRMCg4wK1dNZ2C4PTcJVwrqWTblRlWSE2fs6UB3Q/0"></image>
									<image v-if="item == 3" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoyZkhpAiawiaTWqs72ynSnAl3Yf8A1Cp8oMianQtru2xtmYiamwwLXrQnEQ/0"></image>
									<image v-if="item == 4" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoOxUXk3YG5KlOA4lYByS7xppcrEwOcJAQeUia6IxKBRicmwBtzgfELQYg/0"></image> -->
									<image mode="aspectFit" :src="item.image_l"></image>
									<view class="info">
										<view class="title text-overflow">{{item.name || ''}}</view>
										<view class="desc" v-if="item.key!='coin'">还剩：{{item.limit_exchange - item.exchange_number}}</view>
									</view>
									<view class="exchange flex-set" @tap="exchange(item)">
										<btnComponent :type="item.has_number >= item.count ? 'success': 'yellow'">
											<view class="flex-set">兑换</view>
										</btnComponent>
									</view>
								</view>
								<view class="down">
									<image style="width: 25rpx;height: 25rpx; margin-right: 10rpx;" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vceee3ribmebyLp4YUkEa7my8VjaX641mQdlnTgrXCl0xWLSIicQMKicKb3Q/0"></image>
									<view class="progress-label flex-set">碎片兑换奖品进度</view>
									<view class="progress">
										<progress :percent="item.percent || 0" stroke-width="10" activeColor="#ff9f08" border-radius="5" />
										<view class="percent-cover">{{item.has_number}} / {{item.count}}</view>
									</view>
									<view class="exchange-desc flex-set">
										已兑换 <view class="exchange-number">{{item.has_exchange}}</view>
									</view>
								</view>
							</view>
						</block>
					</block>
				</view>
			</view>
		</view>
		
		<!-- 去充值 -->
		<modalComponent v-if="modal == 'goRecharge'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container offline-modal-container">
				<view class="title">{{lrtext.go_recharge ? lrtext.go_recharge.title: '未达到领取要求'}}</view>
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HUKRibxkbQUYy5TEicA6o19g4NiaDHHf2Y2dyskS4nV0fskOXXCsxXY1D6cpFWia41f3DrwRqbNl2e8A/0"
				 mode="aspectFill"></image>
				<view class="btn-wrap">
					<btnComponent type="unset">
						<block v-if="$app.getData('config').version != $app.getData('VERSION') ||  $app.getData('platform')!='MP-WEIXIN'">
							<view v-if="$app.chargeSwitch()==0" class="btn flex-set btn-unlock" @tap="$app.goPage('/pages/charge/charge')">
								{{lrtext.go_recharge ? lrtext.go_recharge.charge: '充值'}}<text class="iconfont iconjiantou"></text>
							</view>
							<button v-else-if="$app.chargeSwitch()==2" open-type="contact">
								<view class="btn flex-set btn-unlock">{{lrtext.go_recharge ? lrtext.go_recharge.contact: '回复“1”补充鲜花、钻石领取'}}</view>
							</button>
						</block>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
		
		<!-- 50抽奖 结果 -->
		<modalComponent v-if="modal == 'fiftyReward'" type="center" title="提示" @closeModal="modal=''">
			<view class="fifty-container">
				<view class="title">{{lrtext.multiple_draw ? lrtext.multiple_draw.reward.title: '恭喜你获得'}}</view>
				<view class="rewards">
					<view class="reward-item flex-set" v-for="(item, index) in fiftyReward.choose" :key="index">
					<!-- <view class="reward-item flex-set" v-for="(item, index) in lucky_draw.reward" :key="index" v-if='index < 4'> -->
						<view class="times">
							<view>
								X{{item.times}}
								<!-- X{{item.weights}} -->
							</view>
						</view>	
						<image class="icon" mode="aspectFit" v-if="item.image" :src="item.image"></image>
						<block v-else>
							<image v-if="item.key == 'panacea'" class="icon" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtVH7OoNPjuMs2xwl26pXQGbQn74vvibp5mUNuJk7ucxzdXGAd8OlHJDA/0"></image>
							<image v-if="item.key == 'scrap'" class="icon" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vceee3ribmebyLp4YUkEa7my8VjaX641mQdlnTgrXCl0xWLSIicQMKicKb3Q/0"></image>
							<image v-if="item.key == 'stone'" class="icon" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"></image>
							<image v-if="item.key == 'coin'" class="icon" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"></image>
							<image v-if="item.key == 'flower'" class="icon" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"></image>
						</block>
						<view class="name">{{item.name}}x{{$app.formatNumber(item.number || 0)}}</view>
					</view>
				</view>
				<view class="special" v-if="fiftyReward.special">
					<view class="desc">{{lrtext.multiple_draw ? lrtext.multiple_draw.reward.speical_text: '50抽额外奖励：'}}</view>
					<view class="special-item">
						<view class="position-set rotate-bg"></view>
						<view class="reward-item position-set flex-set">
							<image v-if="fiftyReward.special.key == 'scrap'" class="icon" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vceee3ribmebyLp4YUkEa7my8VjaX641mQdlnTgrXCl0xWLSIicQMKicKb3Q/0"></image>
							<image v-if="fiftyReward.special.key == 'stone'" class="icon" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"></image>
							<image v-if="fiftyReward.special.key == 'coin'" class="icon" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"></image>
							<image v-if="fiftyReward.special.key == 'flower'" class="icon" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"></image>
							<view class="name">{{fiftyReward.special ? fiftyReward.special.name: ''}}x{{$app.formatNumber(fiftyReward.special ? fiftyReward.special.number: 0)}}</view>
						</view>
					</view>
				</view>
				<view class="btn-wrap">
					<btnComponent type="success">
						<view class="btn flex-set" @tap="modal=''">
							{{lrtext.multiple_draw ? lrtext.multiple_draw.reward.confirm_btn: '确认收到'}}
						</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
		<!-- 幸运抽奖券兑换12生肖 -->
		<modalComponent v-if="modal == 'exchangeAnimal'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container exchange-modal-container">
				<view class="title">兑换{{exchangeCurrentAnimal.scrap_name}}</view>
				<view class="label flex-set">拥有{{exchangeCurrentAnimal.scrap_name}}：{{exchangeCurrentAnimal.has_scrap_num}}个 </view>
				<!-- <view class="title" v-if="callType=='goSupple'">{{goSupple.title}}</view>
				<view class="title-lable" @tap="getRewardPool">奖池详情</view> -->
				<image class="bg" :src="exchangeCurrentAnimal.scrap_img" mode="aspectFit"></image>
				<!-- <view class="desc flex-set">
					拥有 {{exchangeCurrentAnimal.scrap_name}} 10
				</view> -->
				<view class="desc left-desc">
					<block v-if="exchangeCurrentAnimal.need_lv_up_scrap == 'OVER'">
						已到最高等级
					</block>
					<block v-if="exchangeCurrentAnimal.need_lv_up_scrap < 1">
						<view @tap="$app.goPage('/pages/manor/animal_list')">
							已经可以<text style="color: #962de0;padding: 0 10rpx;font-weight: 650;">去升级</text>了
						</view>
					</block>
					<block v-if="exchangeCurrentAnimal.need_lv_up_scrap > 0">
						距离下一级还差 {{exchangeCurrentAnimal.need_lv_up_scrap}} {{exchangeCurrentAnimal.scrap_name}}
					</block>
				</view>
				<!-- <view class="desc flex-set" v-if="callType=='goCall'">
					{{goCall.desc}}
				</view>
				<view class="desc" v-if="callType=='goSupple'">
					<view class="p" v-for="(ite,ind) in goSupple.desc" :key="ind">{{ite}}</view>
				</view> -->
				<view class="btn-wrap">
					<btnComponent type="default" v-for="(item, index) in exchangeAnimalRate" :key="index">
						<view class="btn" @tap="exchangeAnimalAction(item)">{{item.text}}</view>
					</btnComponent>
				</view>
				
				<view class="buttom">
					我的幸运抽奖券：{{my_lucky_num || 0}}张
				</view>
			</view>
		</modalComponent>
		
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue'
	import modalComponent from '@/components/modalComponent.vue'
	export default {
		components: {
			btnComponent,
			modalComponent
		},
		data() {
			return {
				// modal: 'fiftyReward',
				modal: '',

				lotteryRotate: 0, // 旋转度数
				lotteryTransition: 0,

				lottery: {},
				sumPaid: [],
				dayPaid: {},
				my_lucky_num: 0,
				lucky_draw: null,
				my: {
					sumPaid: {},
					dayPaid: {}
				},
				isSumDouble: false,
				isDayDouble: false,
				lrtext: {},
				rewardList: [],
				scrapList: [],
				delay: 0,
				// 记录连抽的奖品
				fiftyReward: {
					choose: [],
					special: null
				},
				// 国庆节抽奖券兑换12生肖
				exchangeAnimalList: null,
				exchangeAnimalRate: [],
				exchangeCurrentAnimal: null,
				animal_national_lucky_draw: null,
			};
		},
		onLoad() {
			this.lotteryLock = 0
		},
		onShow() {
			this.lrtext = this.$app.getData('config').recharge_lucky;
			this.refresh()
		},
		methods: {
			refresh() {
				this.getPageInfo();
				this.getPaidInfo();
				this.getLuckyDrawInfo();
			},
			getPageInfo(delay) {
				this.$app.request(this.$app.API.PAGE_LUCKY_CHARGE, {}, res => {
					this.lrtext = res.data.recharge_lucky;
					this.exchangeAnimalList = res.data.animal_exchange;
					if (res.data.animal_exchange) {
						this.exchangeAnimalRate = res.data.animal_national.animal_exchange_rate;
						this.animal_national_lucky_draw = res.data.animal_national.lucky_draw;
					}
					if (delay) {
						setTimeout(() => {
							this.rewardList = res.data.lucky_log;
							this.scrapList = res.data.scrap_list;
						}, delay);
					} else {
						this.scrapList = res.data.scrap_list;
						this.rewardList = res.data.lucky_log;
					}
				})
			},
			getPaidInfo () {
				this.$app.request(this.$app.API.USER_PAID_INFO, {}, res => {
					const {sumPaid, dayPaid, mySumPaid, myDayPaid} = res.data;
					this.sumPaid = sumPaid;
					this.dayPaid = dayPaid;
					this.my = {
						sumPaid: mySumPaid,
						dayPaid: myDayPaid,
					};
				})
			},
			getLuckyDrawInfo (delay) {
				this.$app.request(this.$app.API.LUCKY_DRAW_INFO, {}, res => {
					if (delay) {
						setTimeout(() => {
							this.my_lucky_num = res.data.my_num;
						}, delay);
					} else {
						this.my_lucky_num = res.data.my_num;
					}
					this.lucky_draw = res.data.lucky_draw;
				})
			},
			getPaidReward(item) {
				if (item.type == 'DAY') {
					if (this.my.dayPaid.is_settle > 0) {
						return;
					}
					if (this.my.dayPaid.count < item.count) {
						return this.modal = 'goRecharge';
					}
				}
				if (item.type == 'SUM') {
					if (this.my.sumPaid.count < item.count) {
						return this.modal = 'goRecharge';
					}
				}
				uni.showLoading({
					mask:true,
					title: "领取中"
				})
				this.$app.request(this.$app.API.USER_PAID_SETTLE, {paid: item.id}, res => {
					this.$app.toast('已领取', 'success');
					this.refresh()
				})
			},
			openExchangeAnimalModal(animal) {
				this.exchangeCurrentAnimal = animal;
				this.modal = 'exchangeAnimal';
			},
			exchangeAnimalAction(item) {
				// 国庆中秋兑换12生肖
				this.$app.modal(`确认兑换么？`, () => {
					uni.showLoading({
						mask:true,
						title:'兑换中...'
					})
					
					this.$app.request(this.$app.API.LUCKY_DRAW_EXCHANGE_ANIMAL, {
						type: item.type,
						animal_id: this.exchangeCurrentAnimal.id
					}, res => {
						this.exchangeCurrentAnimal.has_scrap_num = parseInt(this.exchangeCurrentAnimal.has_scrap_num) + parseInt(item.number);
						this.exchangeCurrentAnimal.need_lv_up_scrap = parseInt(this.exchangeCurrentAnimal.need_lv_up_scrap) - parseInt(item.number);
						this.$app.toast('兑换成功');
						this.getPageInfo();
						this.getLuckyDrawInfo();
					})
				})
			},
			exchange(scrap) {
				if (scrap.limit_exchange) {
					if (scrap.limit_exchange <= scrap.exchange_number) {
						return this.$app.toast('奖品数量不足');
					}
				}
				if (scrap.has_number < scrap.count) {
					return this.$app.toast('碎片不够哦');
				}
				if (scrap.type=='REDIRECT') {
					return this.$app.goPage(scrap.extra.path);
				}
				uni.showModal({
					title:`兑换${scrap.name}`,
					confirmText:"兑换",
					content:`确认兑换${scrap.name}吗?`,
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								mask:true,
								title: "兑换中"
							})
							this.$app.request(this.$app.API.LUCKY_DRAW_EXCHANGE, {scrap:scrap.id}, res => {
								this.$app.toast(res.msg, 'success');
								this.refresh()
							})
						}
						if (res.cancel) {
							this.$app.toast('取消兑换');
						}
					}
				})
			},
			fiftyStart() {
				const max = this.lrtext.multiple_draw.hasOwnProperty('multiple') ? this.lrtext.multiple_draw.multiple: 50;
				if (this.my_lucky_num < max) {
					return this.$app.toast('幸运抽奖券不够哦');
				}
				uni.showLoading({
					mask:true,
					title:"抽奖中..."
				})
				this.$app.request(this.$app.API.LUCKY_DRAW_START_FIFTY, {}, res => {
					const {choose, special} = res.data;
					this.fiftyReward.choose = choose;
					this.fiftyReward.special = special;
					setTimeout(() => {
						uni.hideLoading();
						this.modal = 'fiftyReward';
					}, 100)
					this.refresh();
				})
			},
			lotteryStart() {
				// 奖品数
				let totalAward = 6
				// 转的时间 单位秒
				let rotateTime = 6
		
				if (this.my_lucky_num < 1) {
					this.$app.toast('没有幸运抽奖券了')
					return
				}
		
				// 没转完不能点
				if (Math.round(new Date().getTime() / 1000) - this.lotteryLock < rotateTime + 1) {
					this.$app.toast('点太快拉')
					return
				}
				this.$app.request(this.$app.API.LUCKY_DRAW_START, {}, res => {
					const lottery = res.data
					// 获取抽奖次数
					this.lotteryLock = Math.round(new Date().getTime() / 1000)
					this.getLuckyDrawInfo(6000);
					this.getPageInfo(6000);
		
					// 转盘转之前回到初始位置
					this.lotteryTransition = 0
					this.lotteryRotate = 0
		
					setTimeout(() => {
						this.lotteryTransition = rotateTime
						this.lotteryRotate = 360 * rotateTime + (res.data.index - 1) * (360 / totalAward)
		
						setTimeout(() => {
							this.lottery = lottery
							if (this.$app.getData('config').lottery_modal == 1) {
								this.modal = 'lottery'
							} else {
								this.$app.toast(`恭喜！获得${lottery.name}x${lottery.number}`)
							}
						}, rotateTime * 1000)
					}, 200)
				}, 'POST', true)
			},
		}
	}
</script>

<style scoped lang="scss">
	$gray-bg: rgba(248,247,253,0.8);
	.lucky-container {
		* {
			font-family:Microsoft YaHei;
			font-weight: bold;
		}
		
		/deep/ .container .modal-container {
			overflow: unset;
		}
		
		.header {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%,-50%);
			background:rgba(255,230,115,1);
			border-radius:0px 0px 60px 60px;
			padding: 5upx 10upx;
			.bg {
				background:rgba(236,121,52,1);
				border-radius:0px 0px 60px 60px;
				padding: 10rpx 40rpx;
				font-size: 24upx;
				color: white;
				margin: 0 auto;
				text-align: center;
				white-space: nowrap;
			}
		}
		.btn-bg {
			height: 60upx; 
			width: 180upx;
			font-size: 24upx;
			color: white;
		}
		.day-recharge {
			margin: 30upx 20upx 0;
			background:$gray-bg;
			height: 250upx;
			
			.content {
				position: relative;
				height: 200upx;
				background:rgba(255,253,232,1);
				border:15upx solid rgba(245,184,87,1);
				border-radius:60upx;
				margin: 15upx 18upx 35upx;
				.btn {
					position: absolute;
					bottom: -20%;
					right: 10%;
					.btn-bg-m {
						height: 52upx;
						background-color: #FFF100;
						border-radius: 26upx;
						padding-left: 10upx;
						padding-top: 7upx;
					}
					.get-bg-bm {
						border-radius:30upx;
						font-size:24upx;
						color: white;
						padding:10upx 30upx;
					}
					.normal-bg-bm {
						background:url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vcef7WGKxvBTuXAEwsWeAHbgk4oV9fHGxgxVaiclicLibHfFAOdTd6vO7pKg/0") no-repeat center center;
						background-size: cover;
					}
					.settle-bg-bm {
						background:url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vcexDOGKtQObydGP6JIsK8beArHv69icnhRG7tHeemibngmmvqEmO1FXNJQ/0") no-repeat center center;
						background-size: cover;
					}
				}
				.title {
					margin-top: 30upx;
					text-align: center;
					font-size: 24upx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					color: rgba(255,102,0,1);
					line-height: 45upx;
				}
				.prize {
					display: flex;
					justify-content: space-around;
					flex-direction: row;
					margin: 10upx auto;
					.item {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						image {
							width: 50upx;
							height: 50upx;
						}
						.number {
							margin-left: 10upx;
							flex: 1;
							color: #918E8E;
							font-size: 24upx;
						}
					}
				}
			}
		}
		
		.animal-r {
			.charge-prize {
				border: 1rpx #ccc solid;
				border-radius: 50rpx;
				margin: 20rpx;
			}
		}
	
		.recharge {
			margin: 30upx 20upx 0;
			background:$gray-bg;
			.content {
				position: relative;
				width: 100%;
				.header {
					top: 20upx;
					height: 62upx;
					.bg {
						height: 56upx;
						font-size: 24rpx;
					}
				}
				.right-tip {
					position: absolute;
					transform: translate(-50%,-50%);
					top: 1.5%;
					right: -6%;
					.get-btn {
						font-size: 28rpx;
						text-decoration: underline;
						color: #FBCC3E;
					}
				}
				.tip {
					padding-top: 60rpx;
					margin: 0 auto;
					.tip-desc {
						padding:0 20rpx;
						background:rgba(248,226,207,0.42);
						border-radius:19upx;
						line-height:45upx;
						font-size:20upx;
						
						color:rgba(120,67,16,1);
						text-align: center;
					}
				}
				.charge-prize {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: center;
					.item {
						margin: 10upx;
						margin-top: 25upx;
						.card{
							width: 320upx;
							height: 180upx;
							background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FBlImEL23YOTuiciaSo0JyAju3ncCTQTVDWzVhEtJR7JkTUnYvOGGTx4cKxibKttkUQhs3UCn3qcxxA/0") no-repeat center center;
							background-size: cover;
							.lable,.image-group {
								display: flex;
								flex-direction: row;
								justify-content: space-around;
								width: 100%;
							}
							.lable {
								height: 40upx;
								margin-top:25upx;
								view {
									font-size: 30upx;
									line-height: 40upx;
									text-align: center;
									&:not(:first-of-type) {
										margin-left: auto;
										margin-right: 15upx;
									}
								}
							}
							.image-group {
								height: 90upx;
								image {
									height: 80upx;
									&:not(:first-of-type) {
										margin-left: 20upx;
									}
								}
							}
						}
						.btn {
							margin: 0 auto;
							margin-top: 20upx;
							display: flex;
							justify-content: center;
							align-content: center;
							.get-bg-bm {
								border-radius:30upx;
								font-size:24upx;
								color: white;
								padding:10upx 30upx;
							}
							.normal-bg-bm {
								background:url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vcef7WGKxvBTuXAEwsWeAHbgk4oV9fHGxgxVaiclicLibHfFAOdTd6vO7pKg/0") no-repeat center center;
								background-size: cover;
							}
							.settle-bg-bm {
								background:url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vcexDOGKtQObydGP6JIsK8beArHv69icnhRG7tHeemibngmmvqEmO1FXNJQ/0") no-repeat center center;
								background-size: cover;
							}
						}
					}
					
					.animalitem {
						margin: 25rpx 5rpx;
						width: 150rpx;
						height: 210rpx;
						.exchange-btn {
							margin-top: 10rpx;
							height: 50rpx;
							line-height: 50rpx;
						}
						.animal {
							width: 150rpx;
							height: 150rpx;
						}
					}
					
					.animal-item {
						margin: 15rpx 5rpx;
						width: 100rpx;
						height: 150rpx;
						.exchange-btn {
							margin-top: 10rpx;
							height: 40rpx;
							line-height: 40rpx;
						}
						.animal {
							width: 100rpx;
							height: 100rpx;
						}
					}
				}
				.lottery-tip {
					height: 40upx;
					line-height: 40upx;
					display: flex;
					flex-direction: row;
					margin: 30upx 20upx 0;
					.label {
						color: #706F6F;
						font-size:28upx;
					}
					.go-label {
						margin-left: auto;
						font-size:28upx;
						text-decoration:underline;
						color: #FBCC3E;
					}
				}
				.dial-container {
					width: 710upx;
					height: 710upx;
					position: relative;
				
					.dial-main,
					.bg {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 5;
					}
				
					.cursor-wrap {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top: 225upx;
						z-index: 6;
				
						.cursor {
							width: 150upx;
							height: 300upx;
						}
					}
					
					.bg-bottom {
						position: absolute;
						left: 50%;
						bottom: -7%;
						width: 50%;
						height: 10%;
						transform: translate(-50%, -50%);
						background:rgba(246,70,47,1);
						opacity:0.55;
						border-radius:50%;
					}
				}
				.reamin {
					margin: 30upx 20upx 0;
					display: flex;
					justify-content: space-around;
					.get-bg-bm {
						border-radius:30upx;
						font-size:24upx;
						color: white;
						padding:10upx 30upx;
					}
					.settle-bg-bm {
						background:url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vcexDOGKtQObydGP6JIsK8beArHv69icnhRG7tHeemibngmmvqEmO1FXNJQ/0") no-repeat center center / 100% 100%;
					}
					.bg-b {
						background:rgba(244,171,127,1);
						border-radius:32upx;
						padding: 5upx 0 5upx 10upx;
						.bg {
							background:rgba(236,121,52,1);
							border-radius:26upx;
							padding: 7upx 20upx;
							color: white;
							font-size:24upx;
						}
					}
				}
				.notice {
					margin: 30upx 20upx 0;
					background:rgba(248,226,207,0.57);
					border-radius:19upx;
					display: flex;
					justify-content: flex-start;
					.notice-icon {
						margin:0;
						margin-left: 4%;
						width: 35upx;
						align-self: center;
						height: 35upx;
						border-radius:50%;
					}
					.notice-info {
						margin: 10upx 5%;
						flex: 1;
						display: inline-block;
						overflow: hidden;
						height: 50upx;
						swiper {
							height: 50upx;
						}
						.notice-item {
							display: flex;
							justify-content: flex-start;
							.notice-avatar {
								width: 50upx;
								height: 50upx;
								border-radius:50%;
								margin-right: 10upx;
							}
							.notice-con {
								flex: 1;
								height: 50upx;
								margin-right: 10%;
								display: inline-block;
								display: flex;
								flex-direction: row;
								justify-content: space-around;
								font-size:26upx;
								line-height: 50upx;
								.user-name {
									color: #FFCC00;
								}
								.ucr {
									white-space: nowrap;
								}
								.reward-name {
									color: #FF6600;
								}
							}
						}
					}
				}
			}
		}
	
		.lucky {
			margin: 30upx 20upx 20upx;
			background:$gray-bg;
			padding-bottom: 20upx;
			.content {
				position: relative;
				width: 100%;
				.header {
					top: 20upx;
					height: 62upx;
					.bg {
						height: 56upx;
					}
				}
				.tip {
					width: 80%;
					padding-top: 60rpx;
					margin: 0 auto;
					.tip-desc {
						font-size:22upx;
						color:rgba(120,67,16,1);
						text-align: center;
					}
				}
				.charge-prize {
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					justify-content: flex-start;
					.auto-flex {
						flex: 1;
					}
					.item {
						background:rgba(255,253,232,1);
						border-radius:30px;
						margin: 18upx;
						margin-top: 25upx;
						display: flex;
						flex-direction: column;
						padding: 20upx 30upx;
						.up,.down {
							display: flex;
							flex-direction: row;
						}
						.up {
							image {
								height: 80upx;
								width: 80upx;
							}
							.info {
								display: flex;
								flex-direction: column;
								justify-content: center;
								margin-left: 30upx;
								.title {
									color:rgba(88,87,87,1);
									width: 350rpx;
								}
								.desc {
									color:rgba(146,143,142,1);
									font-size:24rpx;
								}
							}
							.exchange {
								margin-left: auto;
								view {
									height: 50upx;
									width: 120upx;
									white-space: nowrap;
									padding: 10upx 20upx;
								}
							}
						}
						
						.down {
							margin-top: 20upx;
							.progress-label {
								width: 160upx;
							}
							.progress-label, .exchange-number, .exchange-desc {
								text-align: center;
								font-size: 20upx;
								color:rgba(88,87,87,1);
							}
							.progress {
								margin-left: 30upx;
								display: flex;
								justify-content: center;
								flex-direction: column;
								position: relative;
								progress {
									width: 156upx;
									height: 30upx;
								}
								.percent-cover {
									position: absolute;
									font-size:20upx;
									left: 50%;
									top: 50%;
									transform: translate(-50%,-50%);
									line-height: 30upx;
									height: 30upx;
									white-space: nowrap;
								}
							}
							.exchange-desc {
								margin-left: auto;
								margin-right: 10rpx;
								.exchange-number {
									padding-left: 20upx;
									color: red;
								}
							}
						}
					}
				}
			}
		}
		
		.offline-modal-container {
			.btn {
				font-size: 30upx;
				width: 220upx;
			}
		}
		
		.btn-wrapper .submit {
			margin: 40upx 20upx;
		}
		
		.modal-container {
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
		
			.coin-count {
				font-size: 50upx;
				padding-bottom: 20upx;
				margin-top: -20upx;
				font-weight: 700;
				color: $bg-color-2;
			}
		
			.bg {
				width: 300upx;
				height: 300upx;
			}
		
			.btn {
				padding: 10upx 30upx;
				font-size: 30upx;
				font-weight: 600;
			}
		
			.btn.s {
				padding: 5upx 20upx;
				font-size: 30upx;
			}
		
			.btn-wrap {
				margin: 10upx 0;
				text-align: center;
				display: flex;
				width: 100%;
				justify-content: space-around;
				padding: 0 20upx;
				.btn-unlock {
					width: unset;
					white-space: nowrap;
					background:url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vcef7WGKxvBTuXAEwsWeAHbgk4oV9fHGxgxVaiclicLibHfFAOdTd6vO7pKg/0") no-repeat center center;
					background-size: cover;
					border-radius:30upx;
					font-size:28upx;
					color: white;
					padding:15upx 40upx;
				}
			}
		
			.desc {
				padding-top: 10upx;
			}
		
			.row {
				width: 100%;
				padding: 10upx 20upx;
		
				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 60upx;
		
					.left {
						font-weight: 600;
						border-left: 8upx solid $bg-color-2;
						padding: 0 20upx;
						line-height: 1.2;
					}
		
					.right {
						padding: 5upx 20upx;
					}
				}
			}
		}
		
		.confirm-modal-container {
			height: 100%;
			padding: 30upx;
			flex-direction: column;
			justify-content: center;
			color: #333;
			margin-top: -40upx;
			.tip-image {
				image {
					width: 400rpx;
					height: 400rpx;
				}
			}
			.desc {
				margin-bottom: 40upx;
			}
			
			.btn {
				margin: 0 auto;
				padding: 10upx 20upx;
				display: flex;
				justify-content: space-around;
				flex-direction: row;
			}
			.btn-unlock {
				padding: 10rpx 20rpx;
			}
		}
	
		.fifty-container {
			$fontC: #b50023;
			$fontS: 26rpx;
			position: relative;
			.title {
				position: absolute;
				background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9H3sH9NNZVwUQcM60TfnoLibOWALPClHthrHsDEOXWlibafbnq2tp4c4FC83PbEht3r7HibBJ3QDjjkg/0") no-repeat center center / cover;
				left: 50%;
				top: -13%;
				transform: translate(-50%, -50%);
				width: 400rpx;
				height: 100rpx;
				color: white;
				text-align: center;
				line-height: 65rpx;
				font-size: 30rpx;
				font-weight: 650;
				z-index: 999;
			}
			.rewards {
				margin: 20rpx;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
			}
			.special {
				display: flex;
				justify-content: center;
				.desc {
					justify-self: center;
					align-self: center;
					color: $fontC;
					font-size: 40rpx;
					font-weight: 700;
				}
				.special-item {
					width: 200rpx;
					height: 200rpx;
					position: relative;
					
					.rotate-bg {
						background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9H3sH9NNZVwUQcM60TfnoLibfV9exKAZLQfEhia07jpfHDhQhTVoY1tyybfWaqnlVsKRnEjFiazZ8L2Q/0") no-repeat center center / 120% 120%;
						animation-name: rotate;
						animation-duration:2s;
						animation-iteration-count:infinite;
						animation-timing-function:linear;
						animation-name: rotate;
						animation-duration:2s;
						animation-iteration-count:infinite;
						animation-timing-function:linear;
						width: 200rpx;
						height: 200rpx;
					}
					.reward-item {
						margin: 0;
					}
					
					@keyframes rotate {
					  from { transform:translate(-50%,-50%) rotate(0deg);}
					  to { transform:translate(-50%,-50%) rotate(360deg);}
					}
				}
			}
			.reward-item {
				margin: 10rpx 5rpx;
				position: relative;
				background: url("http://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9H3sH9NNZVwUQcM60TfnoLib3Hghw7t9kjNib9BGLeJdAThI5SibO2iaPuNk7icXt38o0Q2OibRYtHAJrpw/0") no-repeat center center / 100% 100%;
				height: 160rpx;
				width: 160rpx;
				.icon {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 40rpx;
				}
				.name {
					position: absolute;
					left: 50%;
					bottom: 0%;
					transform: translate(-50%, -50%);
					text-align: center;
					white-space: nowrap;
					color: $fontC;
					font-size: 26rpx;
				}
				.times {
					position: absolute;
					background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9H3sH9NNZVwUQcM60TfnoLibg2KeoI5qLCIkO7Jp6KoKsYZmBBfia5mmaMKXVpWcTuYHsHIw3aoYzAw/0") no-repeat center center / 100% 100%;
					right: -25%;
					top: 10%;
					transform: translate(-50%, -50%);
					view {
						transform: rotate(25deg);
						text-align: center;
						white-space: nowrap;
						min-height: 60rpx;
						line-height: 50rpx;
						min-width: 60rpx;
						color: white;
					}
				}
			}
			.btn-wrap {
				margin: 30rpx 0;
			}
		}
		
		.exchange-modal-container {
			.label{
				font-size: 24rpx;
				color: #888;
				margin: 10rpx 0;
			}
			.left-desc {
				border: dashed 1rpx #ccc; 
				padding: 10rpx 30rpx; 
				border-radius: 20rpx;
				margin: 20rpx 0;
			}
		}
	}
</style>
