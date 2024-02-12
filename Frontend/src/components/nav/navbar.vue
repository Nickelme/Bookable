<script setup>
import { useUserStore } from "../../stores/user";
import { useSiteStore } from "../../stores/site";

const userStore = useUserStore();
const siteStore = useSiteStore();
</script>

<template>
	<nav class="navbar navbar-expand-md navbar-dark bg-primary">
		<div class="container-fluid">
			<div
				class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"
			>
				<ul class="navbar-nav me-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">Home</a>
					</li>
				</ul>
			</div>
			<div class="mx-auto order-0">
				<a class="navbar-brand mx-auto" href="#">Bookable</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target=".dual-collapse2"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
			</div>
			<div class="navbar-collapse collapse w-100 order-3 me-5 dual-collapse2">
				<ul class="navbar-nav ms-auto">
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							id="navbarScrollingDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Sites
						</a>
						<ul
							class="dropdown-menu dropdown-menu-right"
							aria-labelledby="navbarScrollingDropdown"
						>
							<li v-for="site in siteStore.sites" v-bind:key="site._id">
								<a
									class="dropdown-item"
									:class="{ active: site._id == siteStore.activeSite }"
									href="#"
									>{{ site.siteName }}</a
								>
							</li>
							<li>
								<hr class="dropdown-divider" />
							</li>
							<li><a class="dropdown-item" href="#">Manage Sites</a></li>
						</ul>
					</li>
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							id="navbarScrollingDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{{ userStore.userInfo.firstName }}
						</a>
						<ul
							class="dropdown-menu dropdown-menu-right"
							aria-labelledby="navbarScrollingDropdown"
						>
							<li><a class="dropdown-item" href="#">Item</a></li>
							<li><a class="dropdown-item" href="#">Item</a></li>
							<li>
								<hr class="dropdown-divider" />
							</li>
							<li>
								<a class="dropdown-item" href="#" @click="userStore.logout()"
									>Logout</a
								>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<style>
</style>