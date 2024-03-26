<template>
	<div class="image-generator-ai">
		<input type="text" v-model="prompt">
		<img style="height: 400px;width: 400px;" src="" alt="">
		<button @click="getImages">generate</button>
	</div>
</template>

<script setup lang="ts">
	import {ref, unref} from "vue";
	import { OpenAIClient } from 'openai-fetch';

	const openaiApiKey = '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';
	const prompt = ref('');
	
	const client = new OpenAIClient({ apiKey: openaiApiKey });
	
	const getImages = async () => {
		const options = {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${openaiApiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"prompt": unref(prompt),
				"n": 4,
				"size": "1024x1792"
			})
		}
		
		try {
			// const response = await fetch('https://api.openai.com/v1/images/generations', options);
			// const data = await response.json();
			// console.log(data);
			const response = await client.createCompletions({
				"prompt": unref(prompt),
				"n": 4,
				"size": "1024x1792"
			}, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${openaiApiKey}`,
					"Content-Type": "application/json",
				}
			});
		} catch (e) {
			console.log(e);
		}
	};
</script>

<style lang="scss" scoped>
	.image-generator-ai{
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: center;
	}
</style>
