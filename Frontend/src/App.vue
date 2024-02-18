<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
import navbar from "./components/nav/navbar.vue";
import { useUserStore } from "./stores/user";
import SiteBar from "./components/siteBar/SiteBar.vue";

const userStore = useUserStore();
</script>

<template>
	<div class="container p-0">
		<navbar v-if="userStore.isLoggedIn"></navbar>
		<RouterView v-slot="{ Component }">
			<transition mode="out-in">
				<component :is="Component" />
			</transition>
		</RouterView>
	</div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
