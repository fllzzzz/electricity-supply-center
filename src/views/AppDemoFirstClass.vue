
<style lang="scss" scoped></style>
<template>
	<RouterView
		v-slot="{Component}"
	>
		<component :is="Component"></component>
	</RouterView>
</template>
<script setup lang="ts"></script>