<script setup>
import { ref, watch } from "vue";
import { useRoomStore } from "../../stores/room";
import router from "../../router/index";
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

const editRoomName = ref(false);

const roomStore = useRoomStore();

const { rooms } = storeToRefs(roomStore);

const currentRoom = ref({ roomName: "Loading" });

const newRoomName = ref("");

watch(rooms, () => {
	for (var i = 0; i < roomStore.rooms.length; i++) {
		if (roomStore.rooms[i]._id == router.currentRoute.value.params.id) {
			currentRoom.value = roomStore.rooms[i];
			newRoomName.value = currentRoom.value.roomName;
		}
	}
});

function submitNewName() {
	roomStore.updateRoom(currentRoom.value._id, { roomName: newRoomName.value });
	editRoomName.value = false;
}


roomStore.getRooms();
</script>

<template>
	<div class="container">
		<div class="row mt-3">
			<div class="col d-flex flex-row justify-content-between">
				<span v-if="!editRoomName" class="fs-2">{{
					currentRoom.roomName
				}}</span>
				<input
					type="text"
					class="form-control"
					v-if="editRoomName"
					v-model="newRoomName"
				/>
				<button
					class="btn btn-primary"
					v-if="!editRoomName"
					@click="editRoomName = true"
				>
					<BIconPencilSquare class="fs-2" />
				</button>
				<button
					v-if="editRoomName"
					class="btn btn-primary"
					@click="submitNewName()"
				>
					<BIconCheck class="fs-2" />
				</button>
				<button
					v-if="editRoomName"
					class="btn btn-danger"
					@click="
						editRoomName = false;
						newRoomName = currentRoom.roomName;
					"
				>
					<BIconX class="fs-2" />
				</button>
			</div>
		</div>
		<div class="row mt-3 mb-2">
			<hr class="hr" />
		</div>

        

	</div>
</template>

<style>
</style>