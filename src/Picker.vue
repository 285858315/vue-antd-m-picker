<style lang="less">
	@pickerPrefixCls: rmc-picker;
	@multiPickerPrefixCls: rmc-multi-picker;
	@picker-item-height: 34px;

	.@{pickerPrefixCls} {
		display: block;
		position: relative;
		overflow: hidden;
		height: 7*@picker-item-height;

		&-content {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			z-index: 1;
			padding: 3*@picker-item-height 0;
		}

		&-mask {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 3;
			background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)),
			-webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
			background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)),
			linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
			background-position: top, bottom;
			background-size: 100% 102px;
			background-repeat: no-repeat;
		}

		&-item {
			text-align: center;
			font-size: 16px;
			line-height: @picker-item-height;
			height: @picker-item-height;
			color: #000;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}


		&-indicator {
			right: 0;
			position: absolute;
			left: 0;
			top: 3*@picker-item-height;
			height: @picker-item-height;
			z-index: 3;
			background-image: -webkit-linear-gradient(top, #d0d0d0, #d0d0d0, transparent, transparent),
			-webkit-linear-gradient(bottom, #d0d0d0, #d0d0d0, transparent, transparent);
			background-image: linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent),
			linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
			background-position: top, bottom;
			background-size: 100% 1px;
			background-repeat: no-repeat;
		}
	}

	.@{multiPickerPrefixCls} {
		display: flex;
		align-items: center;
		padding: 10px 0;

		&-item {
			flex: 1;
			text-align: center;
		}
	}

</style>

<template>
	<div class="rmc-picker">
		<div class="rmc-picker-mask"></div>
		<div class="rmc-picker-indicator" ref="indicator" style="indicatorStyle"></div>
		<div class="rmc-picker-content" ref="content">
			<div class='rmc-picker-item' v-for="item in list">{{item.label}}</div>
		</div>
	</div>
</template>
<script>
import ZScroller from "zscroller"
import PickerMixin from './PickerMixin';

export default {
	mixins:[PickerMixin],		
	props:{
		list:Array,
		value:String | Number,
	},
	created:function(){

	},
	mounted:function(){
		this.itemHeight = this.$refs.indicator.offsetHeight
		this.$refs.content.style.padding = `${this.itemHeight * 3}px 0`
		this.zscroller = new ZScroller(this.$refs.content, {
			snapping: true,
			scrollingX:false,
			penetrationDeceleration:.1,
			minVelocityToKeepDecelerating:0.5,
			scrollingComplete: this.scrollingComplete
		})
		this.zscroller.scroller.setSnapSize(0, this.itemHeight)
		let value = this.value
		if(!value && this.list && this.list.length > 0){
			value = this.list[0].value
		}
		this.value && this.select(this.value)
	},
	destroyed:function(){
		this.zscroller.destroy()
	},
	methods:{
		scrollTo(top) {
			this.zscroller.scroller.scrollTo(0, top)
		},
		scrollingComplete() {
			const { top } = this.zscroller.scroller.getValues()		
			if (top >= 0) {
				this.doScrollingComplete(top)
			}
		},
		emit(key,value){
			this.$emit(key,value)
		}
	}
}
</script>
