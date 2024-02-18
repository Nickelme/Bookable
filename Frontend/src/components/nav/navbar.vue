<script setup>
import { useUserStore } from "../../stores/user";
import { useSiteStore } from "../../stores/site";

import { BIconList } from "bootstrap-icons-vue";

const userStore = useUserStore();
const siteStore = useSiteStore();
</script>

<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Bookable</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarText"
				aria-controls="navbarText"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link class="nav-link active" aria-current="page" to="/">Dashboard</router-link>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Rooms</a>
					</li>
				</ul>
				<ul class="navbar-nav">
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
                            Sites
						</a>
						<ul class="dropdown-menu" style="left: -40px">
							<li>
								<a
									class="dropdown-item"
									v-for="site in siteStore.sites"
									:key="site._id"
									:class="{'active': siteStore.activeSite == site._id}"
									>{{ site.siteName }}</a
								>
							</li>
							<li><hr class="dropdown-divider" /></li>
							<li><router-link class="dropdown-item" to="/sites">Manage Sites</router-link></li>
						</ul>
					</li>
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{{ userStore.userInfo.firstName }}
						</a>
						<ul class="dropdown-menu" style="left: -120px">
							<li><a class="dropdown-item" href="#">Profile</a></li>
							<li><hr class="dropdown-divider" /></li>
							<li><a class="dropdown-item" @click="userStore.logout()">Logout</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<style>
</style>