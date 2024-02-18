<script setup>
import { ref, watch } from "vue";
import { useSiteStore } from "../stores/site";
import router from "../router/index";
import { storeToRefs } from "pinia";
import {
	BIconArrowDown,
	BIconCheck,
	BIconChevronDown,
	BIconHouse,
	BIconPencilSquare,
	BIconRouter,
	BIconX,
} from "bootstrap-icons-vue";

const editSiteName = ref(false);

const siteStore = useSiteStore();

const { sites } = storeToRefs(siteStore);

const currentSite = ref({ siteName: "Loading" });

const newSiteName = ref("");

watch(sites, () => {
	for (var i = 0; i < siteStore.sites.length; i++) {
		if (siteStore.sites[i]._id == router.currentRoute.value.params.id) {
			currentSite.value = siteStore.sites[i];
			newSiteName.value = currentSite.value.siteName;
		}
	}
});

function submitNewName() {
	siteStore.updateSite(currentSite.value._id, { siteName: newSiteName.value });
	editSiteName.value = false;
}

function saveSiteChanges(){
    siteStore.updateSite(currentSite.value._id, currentSite.value);
}

siteStore.getSites();
</script>

<template>
	<div class="container">
		<div class="row mt-3">
			<div class="col d-flex flex-row justify-content-between">
				<span v-if="!editSiteName" class="fs-2">{{
					currentSite.siteName
				}}</span>
				<input
					type="text"
					class="form-control"
					v-if="editSiteName"
					v-model="newSiteName"
				/>
				<button
					class="btn btn-primary"
					v-if="!editSiteName"
					@click="editSiteName = true"
				>
					<BIconPencilSquare class="fs-2" />
				</button>
				<button
					v-if="editSiteName"
					class="btn btn-primary"
					@click="submitNewName()"
				>
					<BIconCheck class="fs-2" />
				</button>
				<button
					v-if="editSiteName"
					class="btn btn-danger"
					@click="
						editSiteName = false;
						newSiteName = currentSite.siteName;
					"
				>
					<BIconX class="fs-2" />
				</button>
			</div>
		</div>
		<div class="row mt-3 mb-2">
			<hr class="hr" />
		</div>

		<!-- Site Settings -->

		<div class="row ms-2 mt-4">
			<div class="col mb-3 fs-5">
				<div class="mb-3">
					<label for="physicalAddress" class="form-label"
						>Physical Address</label
					>
					<input
						type="text"
						class="form-control"
						id="physicalAddress"
						aria-describedby="physicalAddressHelp"
						v-model="currentSite.sitePhysicalAddress"
					/>
				</div>
			</div>
		</div>

		<!--HOME ASSISTANT-->

		<div class="row text-center">
			<span class="fs-3">
				<BIconHouse />
				Home Assistant
			</span>
			<hr clas="hr" style="width: 75%; margin: 0 auto" />
		</div>
		<div class="row ms-2 mt-4">
			<div class="col mb-3 fs-5">
				<div class="form-check mb-3">
					<input
						type="checkbox"
						class="form-check-input"
						v-model="currentSite.usesHomeAssistant"
						id="usesHA"
					/>
					<label class="form-check-label" for="usesHA"
						>Using Home Assistant</label
					>
				</div>
				<div class="mb-3">
					<label for="haurlInput" class="form-label">Home Assistant URL</label>
					<input
						type="text"
						class="form-control"
						id="haurlInput"
						aria-describedby="haUrlHelp"
						v-model="currentSite.haUrl"
					/>
					<div id="haUrlHelp" class="form-text">
						URL used to access Home Assistant
					</div>
				</div>

				<div class="mb-3">
					<label for="haLLT" class="form-label"
						>Home Assistant Long Lived Token</label
					>
					<input
						type="password"
						class="form-control"
						id="haLLT"
						aria-describedby="haLLTHelp"
						v-model="currentSite.haLongLivedToken"
					/>
					<div id="haLLTHelp" class="form-text">
						Token used to authenticate with Home Assistant (This may be set but
						not shown)
					</div>
				</div>
			</div>
		</div>

		<!--UNIFI-->

		<div class="row text-center">
			<span class="fs-3">
				<BIconRouter />
				Unifi
			</span>
			<hr clas="hr" style="width: 75%; margin: 0 auto" />
		</div>
		<div class="row ms-2 mt-4">
			<div class="col mb-3 fs-5">
				<div class="form-check mb-3">
					<input
						type="checkbox"
						class="form-check-input"
						v-model="currentSite.usesUnifi"
						id="usesUnifi"
					/>
					<label class="form-check-label" for="usesUnifi">Using Unifi</label>
				</div>
				<div class="mb-3">
					<label for="unifiUrlInput" class="form-label">Unifi URL</label>
					<input
						type="text"
						class="form-control"
						id="unifiUrlInput"
						aria-describedby="unifiUrlHelp"
						v-model="currentSite.unifiUrl"
					/>
					<div id="unifiUrlHelp" class="form-text">
						URL used to access Unifi
					</div>
				</div>

				<div class="mb-3">
					<label for="unifiUsername" class="form-label">Unifi Username</label>
					<input
						type="text"
						class="form-control"
						id="unifiUsername"
						v-model="currentSite.unifiUsername"
					/>
				</div>
				<div class="mb-3">
					<label for="unifiPassword" class="form-label">Unifi Password</label>
					<input
						type="password"
						class="form-control"
						id="unifiPassword"
						aria-describedby="unifiPasswordHelp"
						v-model="currentSite.unifiPassword"
					/>
					<div id="unifiPasswordHelp" class="form-text">
						This may be set but not shown
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-4">
			<div class="col mb-3 fs-4 d-flex flex-row justify-content-between">
                <button class="btn btn-primary" @click="saveSiteChanges()">Save</button>
                <router-link class="btn btn-secondary" to="/sites">Cancel</router-link>
            </div>
		</div>
	</div>
</template>

<style>
</style>