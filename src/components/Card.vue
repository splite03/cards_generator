<template>
	<div
		class="card"
        @mousemove="onMousemove"
		@mouseout="clearDeg"
		@mouseenter="enterCard"
		@click="rotateCard"
		:data-noimg="!frontImage"
		:style="`
			transform: scale(${zoom / 100});
		`"
	>
		<div
			class="card__wrapper"
			:class="{
				'card__wrapper--faced': isFaceAnimation,
				'card__wrapper--outed': !isMouseIn || isStarting}
			"
			:style="`
				height: ${$props.height ?? 10}px;
				width: ${$props.width ?? 10}px;
				transform: rotateX(${xDeg}deg) rotateY(${isFace ? '180' : -yDeg}deg);
			`"
		>
			<div class="card__front"
			     :class="{'card__front--flipped': isFaceAnimation}"
			     :style="`
			        background: url('${frontImage}') no-repeat center/cover;
			     `"
			>
				<!-- Верхний путь -->
				<div
					class="card__path card__path--top card-path"
					:class="{'card__path--extra': topPathExtraDif}"
					ref="topPathEl"
				>
					<span class="card-header__text">
						<span
							class="card-challenge__difficulty card-challenge__difficulty--extra"
							v-if="topPathExtraDif"
						>
							+{{topPathExtraDif}}
						</span>
						<span
							:style="`
									width: calc(100% - ${$refs.topRew?.offsetWidth+43}px);
								`"
						>
							{{ topPath }}
						</span>
					</span>
					<div
						class="card-path__rewards"
						ref="topRew"
					>
						<Reward
							v-for="reward in topRewards"
							:id="reward"
						/>
					</div>
				</div>
				
				<!-- Нижний путь -->
				<div
					class="card__path card__path--bottom card-path"
			        :class="{'card__path--extra': botPathExtraDif}"
				>
					<span class="card-header__text">
						<span
							class="card-challenge__difficulty card-challenge__difficulty--extra"
							v-if="botPathExtraDif"
						>
							+{{botPathExtraDif}}
						</span>
						<span
							:style="`
									width: calc(100% - ${$refs.botRew?.offsetWidth+43}px);
								`"
						>
							{{ botPath }}
						</span>
					</span>
					<div
						class="card-path__rewards"
						ref="botRew"
					>
						<Reward
							v-for="reward in botRewards"
							:id="reward"
						/>
					</div>
				</div>
				
				<!-- Название испытания -->
				<div class="card__name card-challenge">
					<div class="card-challenge__rotated" :style="`top: ${topPathHeight + 15}px;`">
						<div class="card-challenge__difficulty">{{difficulty}}</div>
						<div class="card-challenge__gap" v-if="(challengeRunes || []).length !== 0"></div>
						<template v-for="(rune, index) in (challengeRunes || [])">
							<div
								class="card-challenge__rune"
								:style="`
									background: url('https://ucarecdn.com/${runes[rune].img}/') no-repeat center/contain;
								`"
							></div>
							<div v-if="index !== ((challengeRunes || []).length - 1)" class="card-challenge__gap"></div>
						</template>
						<span class="card-challenge__name">{{ cardName }}</span>
					</div>
				</div>
			</div>
			<ImageLoader
				v-if="!frontImage"
				class="card__image-loader"
				@onImageParse="$emit('onImageParse', $event)"
				:size-recommended="`${$props.height}x${$props.width}`"
			/>
		</div>
		<div class="card__back"
		     :class="{'card__back--flipped': isFace}"
		     :style="`
		        background: url('https://ucarecdn.com/${$props.backImg || backUrl}/') no-repeat center/cover;
		     `"
		></div>
	</div>
</template>

<script lang="ts" setup>
	/**
	 * Imports
	 */
	import {computed, ref, toRef, toRefs, watch} from "vue";
	import {acts} from "@/constants/acts";
	import ImageLoader from "@/components/ImageLoader.vue";
	import {runes} from "@/constants/runes";
	import Reward from "@/components/Reward.vue";
	
	/**
	 * Прошиваем ивент до редактора, картинку протянем в пропсы
	 */
	defineEmits(['onImageParse']);
	
	/**
	 * Constants
	 */
	const props = defineProps<{
		height: number | string;
		width: number | string;
		act: number | null;
		backImg: string | null;
		frontImg: string;
		topPath: string;
		botPath: string;
		cardName: string;
		difficulty: number;
		challengeRunes: number[];
		zoom: number;
		topPathExtraDif: number;
		botPathExtraDif: number;
		topRewards: number[];
		botRewards: number[];
	}>();
	const frontImage = toRef(props,'frontImg');
	const {act, botPath, topPath} = toRefs(props);
	const xDeg = ref(0);
	const yDeg = ref(0);
	const isMouseIn = ref(false);
	const isStarting = ref(false);
	const isFace = ref(false);
	const isFaceAnimation = ref(false);
	const backUrl = computed(() => {
		switch (act.value) {
			case 0:
			case 1:
			case 2:
				return acts[act.value].backImg;
			default:
				return '';
		}
	});
	const topPathEl = ref('topPathEl');
	const topPathHeight = computed(() => {
		if (topPath.value.length){
			return topPathEl.value?.offsetHeight;
		}
	});
	console.log(topPathHeight)
	
	/**
	 * Functions
	 */
	const onMousemove = (event) => {
		if (isStarting.value || isFaceAnimation.value || isFace.value || !frontImage.value) {
			return;
		}
		const x = event.offsetX;
		const y = event.offsetY;
		const cardHeight = event.target.offsetHeight
		const cardWidth = event.target.offsetWidth
		const xRestrictioinModule = 15;
		const yRestrictioinModule = 15;
		const halfHeight = cardHeight/2;
		const halfWidth = cardWidth/2;
		const partSizeHeight = halfHeight / yRestrictioinModule;
		const partSizeWidth = halfWidth / xRestrictioinModule;
		const calculatedDegX = (x - halfWidth) / partSizeWidth;
		const calculatedDegY = (y - halfHeight) / partSizeHeight;
		
		if (xDeg.value === 0 && yDeg.value === 0) {
			isStarting.value = true;
			
			setTimeout(() => {
				isStarting.value = false;
			}, 100)
		}
		
		yDeg.value = calculatedDegX;
		xDeg.value = calculatedDegY;
	};
	const enterCard = () => {
		isMouseIn.value = true;
	};
	const clearDeg = () => {
		isMouseIn.value = false;
		xDeg.value = 0;
		yDeg.value = 0;
	};
	const rotateCard = () => {
		if (isFaceAnimation.value || !frontImage.value) {
			return;
		}
		clearDeg();
		if(!isFace.value === false){
			isFace.value = false;
			isFaceAnimation.value = true;
			
			setTimeout(() => {
				isFaceAnimation.value = false;
				isStarting.value = false;
				isMouseIn.value = true;
			}, 500)
			
			return;
		}
		isFace.value = !isFace.value;
		isFaceAnimation.value = !isFaceAnimation.value;
		
		setTimeout(() => {
			isFaceAnimation.value = false;
			isStarting.value = false;
			isMouseIn.value = true;
		}, 500)
	}
</script>

<style lang="scss" scoped>
	@import "@/components/styles/Card/component";
</style>
