<template>
    <div class="image-loader">
	    <div class="image-loader__wrapper">
		    <label class="image-loader__input">
			    <img
				    class="image-loader__symbol"
				    :src="loaderIcon"
			    />
			    <span class="image-loader__text">{{loaderTitle}}</span>
			    <p v-if="sizeRecommended" class="image-loader__text">{{$props.sizeRecommended}}</p>
			    <input
				    type="file"
				    accept="image/png, image/jpg, image/jpeg"
				    alt="what?"
				    @change="handleUpload"
			    />
		    </label>
	    </div>
    </div>
</template>

<script lang="ts" setup>
    /**
     * Зависимости
     */
    import {type Ref, ref, unref, watch, computed} from "vue";
    import { UploadClient } from '@uploadcare/upload-client'
    
    /**
     * Define Emits
     */
	const emit = defineEmits(['onImageParse']);
    
    /**
     * Props
     */
	const props = defineProps<{
		sizeRecommended: string;
    }>()

    /**
     * Инициализация загрузчика файлов
     */
    const client = new UploadClient({ publicKey: '10a6fd7ad4acb396dfe1' });

    /**
     * Чтение картинки и помещение картинки в переменную
     * @param target
     */
    const handleUpload = ({target}: any) => {
        const image = target.files[0];

        /**
         * Парсим картинку
         */
        if (image) {
            const reader = new FileReader();

            /**
             * Колбэк для парсинга
             * @param event
             */
            reader.onload = (event: any) => {
                /**
                 * Делаем Blob
                 */
                const blob = new Blob([event.target.result]);
                imageContainer.value = blob;

                /**
                 * Делаем урл для превью
                 */
                previewUrl.value = URL.createObjectURL(blob);
				
				emit('onImageParse', {
					previewUrl: previewUrl.value,
					imageContainer: imageContainer.value,
				})
            };

            /**
             * Колим парсинг
             */
            reader.readAsArrayBuffer(image);
        }
    };

    /**
     * Переменная для загруженной картинки
     */
    const imageContainer: Ref<any> = ref(undefined);

    /**
     * Переменная для превью
     */
    const previewUrl: Ref<any> = ref(undefined);
    
    /**
     * Свг под превью\без превью
     */
	const loaderIcon = computed(() => previewUrl.value ? 'https://ucarecdn.com/2908aae4-53b5-4798-b58f-c21797b07a97/' : 'https://ucarecdn.com/e8e68b20-7640-4abf-b79a-1d805e5f84b1/');
    
    /**
     * Тест загрузчика
     */
	const loaderTitle = computed(() => previewUrl.value ? 'Редактировать' : 'Выбрать');

    /**
     * Загруженное изображение
     */
    const uploadedImage: Ref<any> = ref(undefined);

    /**
     * Метод отправки изображения
     */
    const upload = async () => {
        const url = await client.uploadFile(unref(imageContainer));
        uploadedImage.value = url.cdnUrl;
    }
</script>

<style lang="scss">
    @import "styles/ImageLoader/component";
</style>
