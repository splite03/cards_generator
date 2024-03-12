<template>
	<input
		class="custom-input"
		type="text"
		:min="$props.min"
		:max="$props.max"
		:minlength="$props.min"
		:maxlength="$props.max"
		:value="$props.text"
		@input="$emit('update:text', $event.target.value)"
	/>
</template>

<script lang="ts" setup>
	import {computed, type Ref, toRef} from "vue";
	
	const emit = defineEmits(['update:text']);
	const props = defineProps<{
		max: number | string;
		min: number | string;
		text: any;
	}>();
</script>

<style lang="scss" scoped>
	.custom-input{
		height: 30px;
		max-width: 220px;
		border-radius: 5px;
		border: 2px solid black;
		padding: 0 10px;
		font-weight: 900;
		font-size: 16px;
		
		&:focus{
			outline: none;
			border-color: #ff8a6f;
		}
	}
</style>
