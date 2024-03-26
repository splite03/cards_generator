<template>
	<KeepAlive>
		<CardCreator
			@openBook="openBook"
			v-if="!isBookOpened"
		/>
	</KeepAlive>
	<Book
		v-if="isBookOpened"
		@close="openBook"
	/>
</template>

<script setup lang="ts">
	import CardCreator from "@/components/CardCreator.vue";
	import { initializeApp } from "firebase/app";
	import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
	// @ts-ignore
	import {firebaseConfig} from "../firebaseConfig";
	import {onMounted, provide, ref, unref} from "vue";
	import {UploadClient} from "@uploadcare/upload-client";
	import Book from "@/components/Book/Book.vue";
	import ImageGeneratorAI from "@/components/ImageGeneratorAI.vue";
	
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	
	// Initialize Cloud Firestore and get a reference to the service
	const db = getFirestore(app);
	
	/**
	 * Инициализация загрузчика файлов
	 */
	const client = new UploadClient({ publicKey: '10a6fd7ad4acb396dfe1' });
	
	/**
	 * Открыть колоду
	 */
	const isBookOpened = ref(false);
	const openBook = () => isBookOpened.value = !unref(isBookOpened);
	
	/**
	 * Provide
	 */
	provide<UploadClient>('client', client);
	provide('db', db);
</script>

<style scoped>
	@import "style/component.scss";
</style>
