<template>
	<view class="button flex-set" :class="[type,scale]" @touchstart="scale = 'scale'" @touchend="scale = ''">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scale: '',
			};
		},
		props: {
			// 按钮背景类型
			type: {
				default: 'none'
			}
		},

	}
</script>

<style lang="scss" scoped>
	.button {
		color: $text-color-2;
		transition: 0.4s ease;

		border-radius: 40upx;
		box-shadow: 0 2upx 4upx rgba(#666, 0.3);
	}
	
	.button.unset {
		color: unset;
		border-radius: unset;
		background: unset;
		box-shadow: unset;
	}

	.button.scale {
		transform: scale(0.7);
	}

	.button.default {
		color: #412b13;
		background: linear-gradient(to right bottom, #fed525, #fed525)
	}

	.button.big {
		background: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GnD8mrIKwSEItXUhLNibPUxibmPWGaicd1kWEsAHNRKt8jYQ9ILUZfXfVOib1mRFFbfRXiaMbXZj2nJsQ/0) center center/100% 100% no-repeat;
	}

	.button.success {
		color: #FFF;
		background: linear-gradient(to right bottom, #962de0, #962de0);
	}

	.button.disable {
		color: #FFF;
		background: linear-gradient(to right bottom, #ccc, #ccc);
	}

	.button.fangde {
		color: #412b13;
		box-shadow: none;
		border-radius: 0;
		background: url(https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9FsWnev2aG6T492FpDr5HAaXcd90tJhNX454ZhD1HhuMcEK0T5Suuva8yI7TvicibBTcw8CvEYibzl6w/0) center center/100% 100% no-repeat;
	}

	.button.css {
		color: #FFF;
		background: linear-gradient(to right bottom, #f8648a, #F00);
		box-shadow: none;
	}
	
	.button.green {
		color: #FFF;
		background: linear-gradient(to right bottom, #4EE059,#199B1A);
		box-shadow: none;
	}
	
	.button.yellow {
		color: #000;
		background: linear-gradient(to right bottom, #FDEBB2,#fbcc3e);
		box-shadow: none;
	}
	
	.button.custom1{
		background: #f74e37;
		color: #FFF;
	}
	
	.button.custom2{
		border: 2upx solid #f74e37;
		color: #f74e37;
	}
	
	.button.custom3{
		border: 2upx solid #999999;
		color: #999999;
	}
	

	.button.none {
		box-shadow: none;
	}

	.button.color {
		background-color: $text-color-1;
		border-radius: 60upx;
	}
	
	.button.adventure {
		color: #8A4B36;
		background: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Exvr8ppbZ5VVuxbP7tSmU42stko8KLVoQ2Pd4eLGvkhE5eyCPgeYT2lyD4icwyJ2nT5WyEs9E5ARQ/0) center center/100% 100% no-repeat;
	}
	.button.adventureover {
		color: #FFFFFF;
		background: url(https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXyaKHrg1Qcwb6oJzia3R4bqFt8q2x4Emjd6agcIsxWs5icbnzFax4tB4T28uicuefyiaiaSm0LLovQGGA/0) center center/100% 100% no-repeat;
	}
	
	
	.button.style2{
		background: linear-gradient(to bottom, #f7c566,#fe9a3c);
		border-radius: 10upx;
		color: #FFF;
	}
</style>
