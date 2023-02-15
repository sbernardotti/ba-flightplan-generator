<template>
  <navbar />
  <div class="container mt-4">
    <div class="box">
      <h1 class="title">Plan de vuelo</h1>
    </div>
    <div class="box">
      <flight-plan-form />
    </div>
  </div>
  <footer-component />
</template>

<script>
import FlightPlanForm from "./components/FlightPlanForm.vue";
import FooterComponent from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    FlightPlanForm,
    FooterComponent,
    Navbar,
  },
};
</script>
