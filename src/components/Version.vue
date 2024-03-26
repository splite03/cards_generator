<template>
	<span class="version">
		v 0.1 (26.03.24)
	</span>
</template>

<style scoped lang="scss">
	.version {
		position: absolute;
		bottom: 20px;
		right: 40px;
		color: rgba(255, 255, 255, 0.2);
		font-size: 24px;
		cursor: pointer;
		transition: all .2s ease-in-out;
		
		&:hover{
			color: rgba(255, 255, 255, 0.4);
		}
	}
</style>
