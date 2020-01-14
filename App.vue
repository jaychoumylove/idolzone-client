<script>
	import lib from "@/lib/lib"
	export default {
		globalData: {
			...lib
		},
		onLaunch: function() {
			
			console.log(uni.getSystemInfoSync())
			// #ifndef H5
			uni.setKeepScreenOn({
				keepScreenOn: true
			})
			// #endif			
			this.setPlatform()

			this.$app.setData('sysInfo', uni.getSystemInfoSync())
			// 弹幕队列
			this.$app.danmakuQueue = []

			// 检查更新
			this.$app.checkUpdate()
		},
		onShow: function(option) {
			// console.log(option)
			// 处理入口option
			this.optionHandle(option)
			// 请求数据
			this.loadData(option)

			// 连接socket
			this.$app.invokeSocket()
		},
		methods: {
			/**平台判断*/
			setPlatform() {
				// 微信小程序
				this.$app.setData('platform', 'MP-WEIXIN')
				// QQ小程序
				if (uni.getSystemInfoSync().AppPlatform == 'qq') {
					this.$app.setData('platform', 'MP-QQ')
				}
				// H5
				// #ifdef H5
				this.$app.setData('platform', 'H5')
				// #endif
				// APP
				// #ifdef APP-PLUS
				this.$app.setData('platform', 'APP')
				// #endif
			},
			/**处理option参数*/
			optionHandle(option) {
				// console.log('option', option);
				// 入口参数
				this.$app.setData('query', option.query)
				if (option.query && option.query.referrer) {
					// 推荐人
					this.$app.setData('referrer', option.query.referrer)
				} else {
					this.$app.setData('referrer', '')
				}
			},
			loadData(option) {
				this.$app.request('page/app', {
					referrer: this.$app.getData('referrer'),
				}, res => {
					this.$app.setData('userInfo', res.data.userInfo)
					this.$app.setData('userCurrency', res.data.userCurrency)
					this.$app.setData('userStar', res.data.userStar)
					this.$app.setData('userExt', res.data.userExt)

					this.$app.setData('config', res.data.config)
				})
			},

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '/lib/css/base.scss';
	@import '/lib/css/iconfont.css';
	@import '/lib/css/font.css';

	page {
		background-color: #FFF;
		color: $text-color-1;
		font-size: $font-m;
		position: relative;
		height: 100%;
		line-height: 1.5;
	}

	.dark-theme {
		background-color: #666;
		color: #FFF;
	}
</style>
