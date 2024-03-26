<template>
	<div class="reward">
		<img
			class="reward__image"
			:src="`https://ucarecdn.com/${challengePrizes[id].img}/`"
			:alt="challengePrizes[id].name"
			:style="`
				max-height: ${challengePrizes[id].height ?? 30}px;
				height: ${challengePrizes[id].height ?? 30}px;
				max-width: ${challengePrizes[id].width ?? 28}px;
				width: ${challengePrizes[id].width ?? 28}px;
			`"
		>
	</div>
</template>

<script lang="ts" setup>
	import {computed, toRef} from "vue";
	import {challengePrizes} from "@/constants/challengePrizes";
	
	const props = defineProps<{
		id: number;
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
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 1px;
		overflow: hidden;
		
		img {
			object-position: center;
			object-fit: fill;
			max-height: 30px;
			max-width: 30px;
		}
	}
</style>
