<template>
	<view class="manor-container">
		<!-- <view class="background"></view> -->
		<image mode='widthFix' class='bg' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36xVGzlKdeqOnW4G5JmiavsgjHzgx1jTomDoUxx4KgCickAapmaNt2DerQ/0'></image>
		<view class="manor-info">
			<view class="user-info">
				<image class="avatar" src="https://wx.qlogo.cn/mmopen/vi_32/QNxwK0GqTw7MsuqAQA8EaHhtor4EU261v2cTH19eP2YSxRQtmGdU8RvHqDfXTofjP6uu4ZV4HoiaCXkTOwCGsnQ/132" mode="aspectFill"></image>
				<view class="info">
					<view>姓名</view>
					<view>
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
						 mode="aspectFill"></image>
						 <view>本周收益：</view>
						 <view>1314</view>
					</view>
				</view>
			</view>
			
			<view class="right-btn-list">
				<view class="item" v-for="(i, l) in [1,2,3,4]" :key="l">宠物列表</view>
			</view>
			
			<view class="main-animal">
				<view class="word">记得常来看我</view>
				<image class="animal" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36vX5Q2uDsarNMV61fJZc3IQf5dT5mfBrPykicibib0fiaDr6AzWZuxO8JIw/0"></image>
			</view>
			
			<view class="left-buttom">
				<view class="output">
					<view class="info">当前产量：10秒/99颗</view>
					<image class="ouput-add" src=""></image>
				</view>
				<view class="outputing">
					<progress :percent="0" stroke-width="10" activeColor="#ff9f08" border-radius="5" />
				</view>
				<view class="outputleft">
					<view class="outleft">1234</view>
					<image class="buttom"></image>
				</view>
			</view>
		</view>
		<view class="steal-list">
			<view class="title">最新动态</view>
			<view class="steal-item" v-for="(i, l) in [1,2,3,4]" :key="l">
				<view class="time">今天 12:34:23</view>
				<view class="info">
					<image class="left" src="https://wx.qlogo.cn/mmopen/vi_32/QNxwK0GqTw7MsuqAQA8EaHhtor4EU261v2cTH19eP2YSxRQtmGdU8RvHqDfXTofjP6uu4ZV4HoiaCXkTOwCGsnQ/132"></image>
					<view class="middle">
						<view class="name">昵称昵称昵称昵称昵称</view>
						<view class="log">偷走1000金豆</view>
					</view>
					<view class="right flex-set">
						<btnComponent type="defalut">
							<view class="flex-set right-btn">回偷</view>
						</btnComponent>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
		},
		data() {
			return {
			};
		},
		onShareAppMessage(e) {
			const shareid = e.target && e.target.dataset.shareid
			return this.$app.commonShareAppMessage(shareid)
		},
		// 优化加载速度
		onLoad() {
		},
		onShow() {
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.manor-container {
		display: relative;
		.background {
			width: 100%;
			height: 1284rpx;
			background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36xVGzlKdeqOnW4G5JmiavsgjHzgx1jTomDoUxx4KgCickAapmaNt2DerQ/0");
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 100% 100%;
		}
		.bg {
			width: 100%;
			overflow: hidden;
		}
	}
</style>
