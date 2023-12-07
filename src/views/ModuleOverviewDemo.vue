<style lang="scss" scoped>
	$leftTopList: 191 716 1414;
	$leftHeightList: 494 668 530;
	$rightTopList: 191 1150;
	$rightHeightList: 936 794;
	.card {
		width: rem(686);
		position: absolute;
		img {
			width: 100%;height: 100%;
			object-fit: fill;
		}
		@for $i from 1 through 3 {
			&:nth-child(#{$i}) {
				left: vw(32);
				height: rem(nth($leftHeightList, $i));
				top: rem(nth($leftTopList, $i));
			}
		}
		@for $i from 4 through 5 {
			&:nth-child(#{$i}) {
				right: vw(32);
				height: rem(nth($rightHeightList, $i - 3));
				top: rem(nth($rightTopList, $i - 3));
			}
		}
	}
</style>

<template>
	<div class="card">
		<img src="@images/园区面积.png">
	</div>
	<div class="card">
		<img src="@images/设备构成.png">
	</div>
	<div class="card">
		<img src="@images/区域分布.png">
	</div>
	<div class="card">
		<img src="@images/用电总量.png">
	</div>
	<div class="card">
		<img src="@images/监控画面.png">
	</div>
</template>

<script setup lang="ts">
	
</script>