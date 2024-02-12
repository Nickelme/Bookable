<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
import navbar from "./components/nav/navbar.vue";
import { useUserStore } from "./stores/user";


const userStore = useUserStore();
</script>

<template>
	<div>
		<navbar v-if="userStore.isLoggedIn"></navbar>
		<div class="container">
			<RouterView v-slot="{ Component }">
				<transition name="slide-fade" mode="out-in">
					<component :is="Component" @progressChanged="progressChanged" />
				</transition>
			</RouterView>
		</div>
	</div>
</template>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
</style>
