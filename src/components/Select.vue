<template>
	<div class="select">
		<div
			class="select__wrapper"
			:class="{'select__wrapper--opened': dropdownOpened}"
		>
			<button class="select__toggle"
			        @click.stop="toggleDropdown"
			>
				<span
					class="select__selected"
				>
					{{ selectedName }}
				</span>
				<img
					class="select__triangle"
					:class="{'select__triangle--opened': dropdownOpened}"
					src="https://ucarecdn.com/a77ee644-5f48-43c6-9cb4-f620fd73761b/"
					alt="triangle"
				>
			</button>
			<div
				class="select__dropdown"
				v-outclick="closeDropdown"
				v-if="dropdownOpened"
			>
				<span
					class="select__item"
					:class="{'select__item--selected': selectedName === item.name}"
					v-for="(item, key) in items"
					@click="selectItem(item, key)"
				>
					<img
						class="select__ico"
						v-if="item.ico"
						:src="`https://ucarecdn.com/${item.ico}/`"
						alt="ico"
					>
					{{item.name || 'Err'}}
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {computed, ref, type Ref, toRefs, watch} from "vue";
	
	const props = defineProps<{
		items: {img?: string, name: string}[] | Record<number, {img?: string, name: string}>;
		selected: Ref<string>; // key
	}>();
	const {selected, items}: {
		selected: Ref<number | string | undefined>,
		items: Ref<{
			img?: string,
			name: string}[]
			| Record<number, {
				img?: string,
				name: string
			}>>
	} = toRefs(props);
	const emits = defineEmits(['select'])
	const closeDropdown = () => dropdownOpened.value = false;
	const toggleDropdown = () => dropdownOpened.value = !dropdownOpened.value;
	const opedDropdown = () => dropdownOpened.value = true;
	const dropdownOpened = ref(false);
	const selectedName = computed(() => selected.value !== null ? items.value[+selected.value!]?.name ?? 'None' : 'None');
	const selectItem = ({name}: {name: string}, key: any) => {
		emits('select', key);
		closeDropdown();
	};
</script>

<style lang="scss" scoped>
	@import "@/components/styles/Select/component";
</style>
