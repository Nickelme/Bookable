<script setup>
import { ref } from "vue";
import { useRoomStore } from "../../stores/room";
import { BIconPlusCircleFill, BIconGearFill } from "bootstrap-icons-vue";

const newRoomName = ref("");

const roomStore = useRoomStore();
roomStore.getRooms();

function createNewRoom() {
	roomStore.createNewRoom(newRoomName.value);
}
</script>

<template>
	<div class="container">
		<div
			class="modal fade"
			id="newRoomModal"
			tabindex="-1"
			aria-labelledby="newRoomModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="newRoomModalLabel">Modal title</h1>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						<div class="mb-3">
							<label for="newRoomNameInput" class="form-label">Room Name</label>
							<input
								type="text"
								class="form-control"
								id="newRoomNameInput"
								v-model="newRoomName"
							/>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-bs-dismiss="modal"
						>
							Close
						</button>
						<button
							type="button"
							class="btn btn-primary"
							data-bs-dismiss="modal"
							:class="{ disabled: newRoomName.length < 1 }"
							@click="createNewRoom()"
						>
							Create Room
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="row mt-3">
			<div class="col d-flex justify-content-between">
				<h3>Rooms:</h3>
				<button
					class="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#newRoomModal"
				>
					<BIconPlusCircleFill />
				</button>
			</div>
		</div>
		<div class="row mt-2">
			<div v-for="room in roomStore.rooms" :key="room._id" class="card p-0 mt-2">
				<div class="card-header">{{ room.roomName }}</div>
				<div class="card-body">
					<div class="row g-0">
						<div class="col-8">
							<p class="card-text"></p>
						</div>
						<div class="col-4 text-end">
							<router-link
								class="btn btn-primary"
								:to="{ path: `/room-settings/` + room._id }"
								><BIconGearFill
							/></router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
</style>