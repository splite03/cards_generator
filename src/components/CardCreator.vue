<template>
	<div class="card-creator">
		<div class="card-creator__wrapper">
			
			<!-- Зона редактора -->
			<div class="card-creator__editor">
				
				<!--Зона типа и акта -->
				<div>
					<h1 class="card-creator-type-card__title">Тип</h1>
					<div class="card-creator__type-card card-creator-type-card">
						<div class="card-creator__type">
							<h2 class="card-creator-type-card__title">Тип создаваемой карты:</h2>
							<Select
								:items="cardTemplates"
								:selected="selectedTemplateKey"
								@select="selectTemplateKey"
							/>
						</div>
						<div class="card-creator__act">
							<h2 class="card-creator-type-card__title">Для какого акта:</h2>
							<Select
								:items="acts"
								:selected="selectedActKey"
								@select="selectAct"
							/>
						</div>
						<div class="card-creator__name-card">
							<h2 class="card-creator-type-card__title">Название</h2>
							<Input
								min="0"
								max="30"
								v-model:text="cardName"
							/>
						</div>
					</div>
				</div>
				
				<!-- Зона Путей -->
				<div>
					<h1 class="card-creator-type-card__title">Верхний путь</h1>
					<div class="card-creator__texts">
						<div class="card-creator__name-card">
							<h2 class="card-creator-type-card__title">Название и доп сложность</h2>
							<Input
								min="0"
								max="30"
								v-model:text="topPathValue"
							/>
							<input
								type="number"
								class="card-creator-difficulty__points"
								min="0"
								max="5"
								v-model="topPathExtraDif"
							>
						</div>
						<div class="card-creator__name-card">
							<h2 class="card-creator-type-card__title">Награды</h2>
							<div class="card-creator__rewards card-creator__rewards--top">
								<RuneCheckbox
									v-for="(rune, id) in runes"
									:id="id"
									:checked="topPrizesContainer.includes(+id)"
									@toggle="prizeToggleTop(`${id}`)"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<h1 class="card-creator-type-card__title">Нижний путь</h1>
					<div class="card-creator__texts">
						<div class="card-creator__name-card">
							<h2 class="card-creator-type-card__title">Нижний путь</h2>
							<Input
								v-model:text="botPathValue"
								min="0"
								max="30"
							/>
							<input
								type="number"
								class="card-creator-difficulty__points"
								min="0"
								max="5"
								v-model="botPathExtraDif"
							>
						</div>
						<div class="card-creator__name-card">
							<h2 class="card-creator-type-card__title">Награды</h2>
							<div class="card-creator__rewards card-creator__rewards--top">
								<RuneCheckbox
									v-for="(rune, id) in runes"
									:id="id"
									:checked="botPrizesContainer.includes(+id)"
									@toggle="prizeToggleBot(`${id}`)"
								/>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Зона сложности -->
				<div
					class="card-creator__difficulty card-creator-difficulty"
				>
					<h1 class="card-creator-type-card__title">Сложность и руны</h1>
					<div class="card-creator-difficulty__runes">
						<input
							type="number"
							class="card-creator-difficulty__points"
							v-model="difficulty"
							min="0"
							minlength="0"
							max="20"
							maxlength="20"
						>
						<RuneCheckbox
							v-for="(rune, id) in runes"
							:id="id"
							:checked="runesContainer.includes(+id)"
							@toggle="runeToggle(+id)"
							:disabled="!runesContainer.includes(+id) && runesContainer.length === 2"
						/>
					</div>
				</div>
				
			</div>
			
			<!-- Зона превью -->
			<div class="card-creator__preview">
				<Card
					v-if="selectedTemplateItem"
					:width="selectedTemplateItem.cardSize.width"
					:height="selectedTemplateItem.cardSize.height"
					:backImg="selectedTemplateItem.backImg"
					:act="selectedActKey"
					:frontImg="imageUrlLocal"
					@onImageParse="onImageParse"
					:topPath="topPathValue"
					:botPath="botPathValue"
					:difficulty
					:cardName
					:challengeRunes="runesContainer"
					:zoom
					:topPathExtraDif
					:botPathExtraDif
					:topRewards="topPrizesContainer"
					:botRewards="botPrizesContainer"
					@wheel="zoomWheel"
				/>
				<button
					class="card-creator__clear-image"
					@click="clearImage"
					v-if="imageUrlLocal"
				>
					Изменить
				</button>
				<div class="card-creator__zoom">
					<input
						type="range"
						name="zoom"
						id="zoom"
						min="100"
						max="150"
						step="5"
						v-model="zoom"
						@wheel="zoomWheel"
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import Select from '@/components/Select.vue';
	import Card from "@/components/Card.vue";
	import {cardTemplates} from "@/constants/cardTemplates";
	import {acts} from "@/constants/acts";
	import {computed, type Ref, ref, watch} from "vue";
	import ImageLoader from "@/components/ImageLoader.vue";
	import Input from "@/components/Input.vue";
	import RuneCheckbox from "@/components/RuneCheckbox.vue";
	import {runes} from "@/constants/runes";
	
	/**
	 * Выбранный шаблон
	 */
	const selectedTemplateKey: Ref<null | number> = ref(6);
	const selectTemplateKey = (key: string) => {
		if (+key !== 6) {
			return;
		}
		selectedTemplateKey.value = +key
	};
	
	/**
	 * Выбранный акт
	 */
	const selectedActKey: Ref<null | number> = ref(0);
	const selectAct = (key: string) => selectedActKey.value = +key;
	
	/**
	 * объект выбранного шаблона
	 */
	const selectedTemplateItem = computed(() => selectedTemplateKey.value !== null ? cardTemplates[selectedTemplateKey.value] : null)
	
	/**
	 * Подгруженная и распаршенная картинка
	 */
	const imageUrlLocal: Ref<string> = ref('');
	const imageBlob: Ref<null | Blob> = ref(null);
	
	/**
	 * Path Value
	 */
	const topPathValue = ref('');
	const botPathValue = ref('');
	const cardName = ref('');
	
	/**
	 * Runes
	 */
	const runesContainer = ref([]);
	
	/**
	 * Rune select
	 */
	const runeToggle = (id: string) => {
		if (runesContainer.value.includes(+id as never)) {
			runesContainer.value = runesContainer.value.filter(e => e !== +id);
		} else {
			runesContainer.value.push(+id as never);
			runesContainer.value.sort((a, b) => a - b);
		}
	}
	
	/**
	 * Prizes Challenge
	 */
	const topPrizesContainer = ref([]);
	const botPrizesContainer = ref([]);
	
	/**
	 * Add/Remove prizes
	 */
	const prizeToggleTop = (id: string) => {
		if (topPrizesContainer.value.includes(+id as never)) {
			topPrizesContainer.value = topPrizesContainer.value.filter(e => e !== +id);
		} else {
			topPrizesContainer.value.push(+id as never);
			topPrizesContainer.value.sort((a, b) => a - b);
		}
	}
	const prizeToggleBot = (id: string) => {
		if (botPrizesContainer.value.includes(+id as never)) {
			botPrizesContainer.value = botPrizesContainer.value.filter(e => e !== +id);
		} else {
			botPrizesContainer.value.push(+id as never);
			botPrizesContainer.value.sort((a, b) => a - b);
		}
	}
	
	/**
	 * Difficulty
	 */
	const difficulty = ref(0);
	const topPathExtraDif = ref(0);
	const botPathExtraDif = ref(0);
	
	/**
	 * Zoom
	 */
	const zoom = ref(100);
	const zoomWheel = (ev) => {
		if (ev.deltaY === -100) {
			if (zoom.value < 150) {
				zoom.value += 5;
			}
		} else {
			if (zoom.value > 100) {
				zoom.value -= 5;
			}
		}
	}
	
	/**
	 * Стейты типов
	 */
	const isChallenge = computed(() => selectedTemplateKey.value === 6);
	
	/**
	 * Очистка картинки
	 */
	const clearImage = () => {
		imageUrlLocal.value = '';
		imageBlob.value = null;
	}
	
	/**
	 * При парсе картинки
	 * @param payload
	 */
	const onImageParse = (payload: {previewUrl: string, imageContainer: Blob}) => {
		imageUrlLocal.value = payload.previewUrl;
		imageBlob.value = payload.imageContainer;
	};
	
	watch(selectedTemplateItem, () => console.log(selectedTemplateItem))
</script>

<style lang="scss" scoped>
	@import "@/components/styles/CardCreator/component";
</style>
