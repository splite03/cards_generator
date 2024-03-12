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
			:src="`https://ucarecdn.com/${runes[id].img}/`"
			alt="rune"
			:data-type="id"
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
	}>()
</script>

<style lang="scss" scoped>
	.rune-checkbox{
		$self: &;
		height: 40px;
		width: 40px;
		display: block;
		position: relative;
		cursor: pointer;
		
		input{
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
			height: 100%;
			width: 100%;
			position: absolute;
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
