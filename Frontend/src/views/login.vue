<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";



	const email = ref("");
	const password = ref("");

	const userStore = useUserStore();

	function attemptLogin(){
		console.log("Attempting Login");
		userStore.attemptLogin(email.value, password.value)
	}



</script>


<template>
	<section class="vh-100 gradient-custom">
		<div class="container py-5 h-100">
			<div class="row d-flex justify-content-center align-items-center h-100">
				<div class="col-12 col-md-8 col-lg-6 col-xl-5">
					<div class="card bg-dark text-white" style="border-radius: 1rem">
						<div class="card-body p-3 text-center">
							<div class="mb-md-4 mt-md-4">
								<h2 class="fw-bold mb-2 text-uppercase">Login</h2>
								<p class="text-white-50 mb-5">
									Please enter your login and password!
								</p>

								<label class="form-label" for="typeEmailX">Email</label>
								<div class="form-outline mb-4">
									<input
										type="email"
										id="typeEmailX"
										class="form-control form-control-lg"
										v-model="email"
									/>
								</div>
								<label class="form-label" for="typePasswordX">Password</label>
								<div class="form-outline mb-4">
									<input
										type="password"
										id="typePasswordX"
										class="form-control form-control-lg"
										v-model="password"
									/>
								</div>

								<p class="small mb-5 pb-lg-2">
									<a class="text-white-50" href="#!">Forgot password?</a>
								</p>

								<button class="btn btn-outline-light btn-lg px-5" @click="attemptLogin()">
									Login
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style>

</style>