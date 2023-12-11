<style lang="scss" scoped>
	.header-options {
		width: 200px;
		height: 120px;
		border: 2px dotted red;
	}
</style>

<template>
	<div class="header-options">
		<div class="wrapper">
			<ElBreadcrumb
				separator="/"
			>
				<ElBreadcrumbItem>
					{{ breadcrumbList[0] }}
				</ElBreadcrumbItem>
				<template
					v-for="(item, index) in breadcrumbList.slice(1)"
					:key="index"
				>
					<ElBreadcrumbItem>
						{{ item }}
					</ElBreadcrumbItem>
				</template>
			</ElBreadcrumb>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		ElBreadcrumb,
		ElBreadcrumbItem
	} from 'element-plus';

	import {
		reactive
	} from 'vue';

	const breadcrumbList = reactive<string[]>([
		'全部区域',
		'光伏',
		'储能'
	])
</script>