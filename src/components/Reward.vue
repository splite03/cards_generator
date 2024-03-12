<template>
	<div class="reward"
		:style="`
			background: url('https://ucarecdn.com/${challengePrizes[id].img}/') no-repeat;
			background-size: 100% 100%;
			background-position: center;
		`"
	>
	
	</div>
</template>

<script lang="ts" setup>
	import {computed, toRef} from "vue";
	import {challengePrizes} from "@/constants/challengePrizes";
	
	const props = defineProps<{
		id: number | string;
	}>();
	const id = toRef(props, 'id');
	const isRune = computed(() => {
		switch(id.value) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
				return true;
			default:
				return false;
		};
	})
</script>

<style lang="scss" scoped>
	.reward{
		height: 30px;
		min-height: 30px;
		width: 30px;
		min-width: 30px;
	}
</style>
