<template>
  <div :class="['modal', show ? 'is-active' : '']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Seleccionar aerodromo</p>
        <button class="delete" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <input
          class="input mb-2"
          type="text"
          placeholder="Buscar aerodromo..."
          v-model="search"
          ref="searchinput"
        />
        <div class="buttons my-0" v-for="a in filtered" :key="a.local">
          <button
            class="button is-link is-outlined is-small has-text-left is-fullwidth"
            @click="select(a.oaci !== '' ? a.oaci : a.local)"
          >
            <strong>
              {{ a.oaci !== "" ? a.oaci : a.local }}
            </strong>
            &nbsp; - {{ a.denominacion }}
          </button>
        </div>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import aerodromes from "../data/aerodromes";

const MAX_RESULTS = 20;

export default {
  props: {
    show: Boolean,
  },
  setup(props, { emit }) {
    const search = ref("");
    const searchinput = ref(null);

    const filtered = computed({
      get: () => {
        return aerodromes
          .filter(
            (x) =>
              x.oaci.toUpperCase().includes(search.value.toUpperCase()) ||
              x.local.toUpperCase().includes(search.value.toUpperCase()) ||
              x.denominacion.toUpperCase().includes(search.value.toUpperCase())
          )
          .slice(0, MAX_RESULTS);
      },
    });

    watch(
      () => props.show,
      (show, hide) => {
        if (show) setTimeout(() => searchinput.value.focus(), 100);
        if (hide) search.value = "";
      }
    );

    const close = () => {
      emit("onClose");
    };

    const select = (data) => {
      emit("onValue", data);
      close();
    };

    return { aerodromes, close, filtered, search, searchinput, select };
  },
};
</script>

<style lang="scss" scoped>
.modal-card {
  min-height: 400px;
  max-height: 400px;

  .button.has-text-left {
    justify-content: flex-start;
  }
}
</style>
