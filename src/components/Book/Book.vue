<template>
	<div class="book"
	     v-outclick="close"
	>
		<div
			class="book__container"
			v-if="cards.length"
		>
			<Card
				v-for="card in cards"
				class="book__card"
				:book="true"
				:top-path-extra-dif="card.topPath.extraDifficulty"
				:card-name="card.name"
				:top-rewards="card.topPath.rewards"
				:zoom="100"
				:challenge-runes="card.difficulty.runes"
				:difficulty="card.difficulty.value"
				:back-img="acts[card.act].backImage"
				:act="card.act"
				:front-img="card.imageId"
				:top-path="card.topPath.name"
				:bot-path-extra-dif="card.botPath.extraDifficulty"
				:width="cardTemplates[card.type].cardSize.width"
				:height="cardTemplates[card.type].cardSize.height"
				:bot-path="card.botPath.name"
				:bot-rewards="card.botPath.rewards"
				:card="card"
			/>
		</div>
		<h1 v-else>Loading...</h1>
	</div>
</template>

<script lang="ts" setup>
	import {collection, getDocs} from "firebase/firestore";
	import {inject, onMounted, ref} from "vue";
	import Card from "@/components/Card.vue";
	import {acts} from "@/constants/acts";
	import {cardTemplates} from "@/constants/cardTemplates";
	
	const emit = defineEmits(['close']);
	
	const db = inject('db')
	const cards = ref([]);
	const close = () => emit('close');
	
	onMounted(async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "cards"));
			
			cards.value = querySnapshot.docs.map(doc => doc.data());
			console.log(cards)
		} catch(e) {
			console.log(e)
		}
	})
</script>

<style lang="scss" scoped>
	.book{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: linear-gradient(to bottom, #3a2e2e, #2c0d0d);
		border-radius: 30px;
		height: 90vh;
		width: 90vw;
		z-index: 99999;
		box-shadow: 0 0 50px 50px rgba(0, 0, 0, 0.3);
		padding: 25px;
		box-sizing: border-box;
		
		&::after, &::before{
			content: '';
			position: absolute;
			left: 0;
			height: 10%;
			width: 100%;
			z-index: 999999;
		}
		&::after{
			bottom: 24px;
			background: linear-gradient(to bottom, transparent, #2c0d0d);
		}
		&::before{
			top: 24px;
			background: linear-gradient(to top, transparent, #3a2e2e);
		}
		
		&__container{
			display: flex;
			flex-wrap: wrap;
			gap: 50px;
			overflow: auto;
			max-height: 100%;
			padding: 100px 50px;
			
			&::-webkit-scrollbar{
				width: 10px;
				background: rgb(38 18 18);
			}
			&::-webkit-scrollbar-thumb{
				border-radius: 4px;
				width: 100%;
				background: coral;
				border: 1px solid rgb(38 18 18);
			}
		}
		
		&__card{
			opacity: 0;
			animation: opacityToggle 1s 1 forwards;
		}
		
		h1{
			font-size: 72px;
			color: white;
			text-align: center;
			width: 100%;
			font-weight: 900;
			letter-spacing: 2px;
		}
	}
	@keyframes opacityToggle {
		to {
			opacity: 1;
		}
	}
</style>
