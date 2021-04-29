<template>
  <nav class="navbar level has-shadow is-fullwidth py-2">
    <div class="level-item has-text-centered">
      <div>
        <p class="title">Plan de vuelo</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <img src="./assets/logo.webp" alt="BA FLIGHT" width="88" height="45" />
    </div>
  </nav>
  <div class="container px-4">
    <FlightPlanForm class="my-4" />
  </div>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        &copy; 2021 - Escuela de vuelo
        <strong><a href="https://www.ba-flight.com/" target="_blank">BA FLIGHT</a></strong
        >.
      </p>
    </div>
  </footer>
</template>

<script>
import FlightPlanForm from "./components/FlightPlanForm.vue";

export default {
  name: "App",
  components: {
    FlightPlanForm,
  },
};
</script>
