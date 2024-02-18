<script setup>
import { useSiteStore } from "../stores/site";
import {
	BIconCheckCircleFill,
	BIconXCircleFill,
	BIconGearFill,
} from "bootstrap-icons-vue";

const siteStore = useSiteStore();
siteStore.getSites();
</script>

<template>
	<div class="container">
		<div class="row  mt-3">
			<h3>Rooms:</h3>
		</div>
		<div class="row">
			<div v-for="site in siteStore.sites" :key="site._id" class="card p-0">
				<div class="card-header">{{ site.siteName }}</div>
				<div class="card-body">
					<div class="row g-0">
						<div class="col-8">
							<h5 class="card-title">{{ site.sitePhysicalAddress }}</h5>
							<p class="card-text">
								<span style="font-size: 14pt" v-if="site.usesHomeAssistant">
									<BIconCheckCircleFill v-if="site.haConnected" />
									<BIconXCircleFill v-if="!site.haConnected" />
									Home Assistant
								</span>
							</p>
						</div>
						<div class="col-4 text-end">
							<router-link class="btn btn-primary" :to="{ path: `/site-settings/` + site._id}"><BIconGearFill/></router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
</style>