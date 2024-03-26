<template>
	<label class="rune-checkbox">
		<input
			type="checkbox"
			:checked="$props.checked"
			id="123"
			@change="$emit('toggle', id)"
			:disabled
		>
		<img
			:src="`https://ucarecdn.com/${items[id].img}/`"
			alt="rune"
			:data-type="id"
		>
		<input
			v-if="allowedCount"
			class="rune-checkbox__count"
			type="number"
			max="10"
			min="0"
		>
	</label>
</template>

<script lang="ts" setup>
	import {runes} from "@/constants/runes";
	
	defineEmits(['toggle'])
	defineProps<{
		checked: boolean;
		id: number;
		disabled: boolean;
		items: any[];
		allowedCount: boolean;
	}>()
</script>

<style lang="scss" scoped>
	.rune-checkbox{
		$self: &;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		gap: 5px;
		position: relative;
		cursor: pointer;
		
		&__count{
			height: 25px;
			width: 25px;
			text-align: center;
			top: -5px;
			left: 50%;
		}
		
		input[type="checkbox"]{
			display: none;
			position: absolute;
			z-index: 1;
			
			&:checked{
				~ img {
					filter: brightness(1.2);
					
					&[data-type="0"]{
						box-shadow: 0 0 5px 3px #ff5b00;
					}
					&[data-type="1"]{
						box-shadow: 0 0 5px 3px red;
					}
					&[data-type="2"]{
						box-shadow: 0 0 5px 3px #00bbff;
					}
					&[data-type="3"]{
						box-shadow: 0 0 5px 3px #5efb8b;
					}
					&[data-type="4"]{
						box-shadow: 0 0 5px 3px #ba00ff;
					}
					&[data-type="5"]{
						box-shadow: 0 0 5px 3px #949494;
					}
				}
			}
			&:disabled{
				~ img {
					filter: brightness(.7);
					cursor: default;
					opacity: .5;
				}
			}
		}
		img{
			height: 40px;
			object-fit: contain;
			top: 0;
			left: 0;
			filter: brightness(.7);
			transition: all .15s ease-in-out;
			border-radius: 5px;
			
			&:hover{
				filter: brightness(1);
			}
		}
	}
</style>
