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
								:selected="card.type"
								@select="selectTemplateKey"
							/>
						</div>
						<div class="card-creator__act">
							<h2 class="card-creator-type-card__title">Для какого акта:</h2>
							<Select
								:items="acts"
								:selected="card.act"
								@select="selectAct"
							/>
						</div>
						<div class="card-creator__name-card">
							<h2 class="card-creator-type-card__title">Название</h2>
							<Input
								min="0"
								max="30"
								v-model:text="card.name"
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
							<div class="card-creator__path-row">
								<Input
								min="0"
								max="30"
								v-model:text="card.topPath.name"
							/>
							<input
								text="number"
								type="number"
								class="card-creator-difficulty__points"
								min="0"
								max="5"
								v-model="card.topPath.extraDifficulty"
							>
							<input
								type="checkbox"
								class="card-creator__checkbox"
								:checked="card.topPath.isDark"
								@change="toggleDark('top')"
							>
							</div>
						</div>
						<div class="card-creator__name-card">
							<h2 class="card-creator-type-card__title">Награды</h2>
							<div class="card-creator__rewards card-creator__rewards--top">
								<RuneCheckbox
									v-for="(prize, id) in challengePrizes"
									:items="challengePrizes"
									:id="id"
									:allowedCount="!!prize.count && card.topPath.rewards.find((e) => e === +id)"
									:checked="card.topPath.rewards.find((e) => e == id)"
									@toggle="prizeToggleTop(id)"
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
							<div class="card-creator__path-row">
								<Input
								v-model:text="card.botPath.name"
								min="0"
								max="30"
							/>
							<input
								type="number"
								class="card-creator-difficulty__points"
								min="0"
								max="5"
								v-model="card.botPath.extraDifficulty"
							>
							<input
								type="checkbox"
								class="card-creator__checkbox"
								:checked="card.botPath.isDark"
								@change="toggleDark('bot')"
							>
							</div>
						</div>
						<div class="card-creator__name-card">
							<h2 class="card-creator-type-card__title">Награды</h2>
							<div class="card-creator__rewards card-creator__rewards--top">
								<RuneCheckbox
									v-for="(prize, id) in challengePrizes"
									:items="challengePrizes"
									:id="id"
									:allowedCount="!!prize.count && card.botPath.rewards.find((e) => e === +id)"
									:checked="card.botPath.rewards.find((e) => e == id)"
									@toggle="prizeToggleBot(id)"
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
							class="card-creator-difficulty__points card-creator-difficulty__points--mr"
							v-model="card.difficulty.value"
							min="0"
							minlength="0"
							max="20"
							maxlength="20"
						>
						<RuneCheckbox
							v-for="(rune, id) in runes"
							:id="id"
							:items="runes"
							:checked="card.difficulty.runes.includes(+id)"
							@toggle="runeToggle(+id)"
							:disabled="!card.difficulty.runes.includes(+id) && card.difficulty.runes.length === 2"
						/>
					</div>
				</div>
				
			</div>
			
			<!-- Зона превью -->
			<div class="card-creator__preview">
				<Card
					class="card-creator__preview-card"
					v-if="selectedTemplateItem"
					:width="selectedTemplateItem.cardSize.width"
					:height="selectedTemplateItem.cardSize.height"
					:backImg="selectedTemplateItem.backImg"
					:act="card.act"
					:frontImg="card.imageUrl"
					@onImageParse="onImageParse"
					:topPath="card.topPath.name"
					:botPath="card.botPath.name"
					:difficulty="card.difficulty.value"
					:cardName="card.name"
					:challengeRunes="card.difficulty.runes"
					:zoom
					:topPathExtraDif="card.topPath.extraDifficulty"
					:botPathExtraDif="card.botPath.extraDifficulty"
					:topRewards="card.topPath.rewards"
					:botRewards="card.botPath.rewards"
					:card
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
				<button
					class="card-creator__apply"
					@click="postData"
				>
					Создать
				</button>
				<button
					class="card-creator__book-open"
					@click="$emit('openBook')"
				>
					Открыть книгу карт
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import Select from '@/components/Select.vue';
	import Card from "@/components/Card.vue";
	import {cardTemplates} from "@/constants/cardTemplates";
	import {acts} from "@/constants/acts";
	import {computed, type ComputedRef, inject, type Ref, ref, unref, watch} from "vue";
	import ImageLoader from "@/components/ImageLoader.vue";
	import Input from "@/components/Input.vue";
	import RuneCheckbox from "@/components/RuneCheckbox.vue";
	import {runes} from "@/constants/runes";
	import {challengePrizes} from "@/constants/challengePrizes";
	import type {UploadClient} from "@uploadcare/upload-client";
	import {addDoc, collection} from "firebase/firestore";
	import type {Card as CardType} from '$types/card.t';
	
	defineEmits(['openBook'])
	
	/**
	 * Injects
	 */
	const client = inject<UploadClient>('client');
	const db = inject('db');
	
	/**
	 * Card Options
	 */
	const card: Ref<CardType> = ref({
		type: 0,
		act: 0,
		name: '',
		topPath: {
			name: '',
			extraDifficulty: 0,
			rewards: [],
			isDark: false,
		},
		botPath: {
			name: '',
			extraDifficulty: 0,
			rewards: [],
			isDark: false,
		},
		difficulty: {
			value: 0,
			runes: [],
		},
		imageUrl: null,
		imageBlob: null,
		imageId: null,
	});
	
	watch(card, () => console.log('CARD: ', unref(card)), {immediate: true, deep: true})
	
	/**
	 * Выбранный шаблон
	 */
	const selectedTemplateKey: Ref<null | number> = ref(6);
	const selectTemplateKey = (key: string) => {
		if (+key !== 6) {
			return;
		}
		card.value.type = +key
	};
	
	/**
	 * Выбранный акт
	 */
	const selectedActKey: Ref<null | number> = ref(0);
	const selectAct = (key: string) => card.value.act = +key;
	
	/**
	 * объект выбранного шаблона
	 */
	const selectedTemplateItem = computed(() => selectedTemplateKey.value !== null ? cardTemplates[selectedTemplateKey.value] : null);
	
	/**
	 * Type Statements
	 */
	const isOrigin: ComputedRef<boolean> = computed(() => unref(selectedTemplateKey) === 0);
	const isMotivation: ComputedRef<boolean> = computed(() => unref(selectedTemplateKey) === 0);
	const isDestiny: ComputedRef<boolean> = computed(() => unref(selectedTemplateKey) === 0);
	const isHero: ComputedRef<boolean> = computed(() => unref(selectedTemplateKey) === 0);
	const isAntiHero: ComputedRef<boolean> = computed(() => unref(selectedTemplateKey) === 0);
	const isTrait: ComputedRef<boolean> = computed(() => unref(selectedTemplateKey) === 0);
	const isChallenge: ComputedRef<boolean> = computed(() => unref(selectedTemplateKey) === 0);
	const isVillain: ComputedRef<boolean> = computed(() => unref(selectedTemplateKey) === 0);
	const isEvil: ComputedRef<boolean> = computed(() => unref(selectedTemplateKey) === 0);
	const isAlly: ComputedRef<boolean> = computed(() => unref(selectedTemplateKey) === 0);
	
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
		if (card.value.difficulty.runes.includes(+id as never)) {
			card.value.difficulty.runes = card.value.difficulty.runes.filter(e => e !== +id);
		} else {
			card.value.difficulty.runes.push(+id as never);
		}
	}
	
	/**
	 * Prizes Challenge
	 */
	const topPrizesContainer = ref([]);
	const botPrizesContainer = ref([]);
	
	watch([topPrizesContainer, botPrizesContainer], () => console.log(unref(topPrizesContainer), unref(botPrizesContainer)), {immediate: true, deep: true,})
	
	/**
	 * Add/Remove prizes
	 */
	const prizeToggleTop = (id: number) => {
		if (card.value.topPath.rewards.find((e: any) => e.id == id)) {
			card.value.topPath.rewards = [...unref(card).topPath.rewards.filter((e: any) => e.id !== id)];
		} else {
			card.value.topPath.rewards.push({
				id: id,
				count: null
			} as never);
		}
	}
	const prizeToggleBot = (id: number) => {
		console.log(unref(topPrizesContainer))
		if (card.value.botPath.rewards.find((e: any) => e.id == id)) {
			card.value.botPath.rewards = [...unref(card).botPath.rewards.filter((e: any) => e.id !== id)];
		} else {
			card.value.botPath.rewards.push({
				id: id,
				count: null
			} as never);
		}
	}
	
	const toggleDark = (direction: string) => {
		switch (direction) {
			case 'top':
				card.value.topPath.isDark = !card.value.topPath.isDark;
				break;
			case 'bot':
				card.value.botPath.isDark = !card.value.botPath.isDark;
				break;
			default:
				return;
		}
	};
	
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
		card.value.imageUrl = payload.previewUrl;
		card.value.imageBlob = payload.imageContainer;
	};
	
	/**
	 * Upload and get image
	 */
	const upload = async () => {
		try {
			console.log('uploading...')
			const url = await client!.uploadFile(unref(card).imageBlob!);
			card.value.imageId = url.uuid as any;
		} catch(e) {
			console.log(e); //todo popup
		}
		
	}
	
	/**
	 * Post Data To DB
	 */
	const postData = async () => {
		await upload();
		
		try {
			const docRef = await addDoc(collection(db, "cards"), JSON.parse(JSON.stringify((unref(card)))));
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};
	
	watch(selectedTemplateItem, () => console.log(selectedTemplateItem))
</script>

<style lang="scss" scoped>
	@import "@/components/styles/CardCreator/component";
</style>
