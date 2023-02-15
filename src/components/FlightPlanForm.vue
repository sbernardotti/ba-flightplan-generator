<template>
  <div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label for="date" class="label">Date (*)</label>
          <div class="control">
            <input class="input" type="date" id="date" v-model="date" />
          </div>
        </div>
        <div class="field">
          <label for="aircraftId" class="label">Aircraft ID (*)</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select id="aircraftId" v-model="aircraftId">
                <option v-for="a in aircraft" :key="a.id" :value="a.id">
                  {{ a.id }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="flightRules" class="label">Flight rules (*)</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select id="flightRules" v-model="selectedFlightRules">
                <option v-for="fr in flightRules" :key="fr.id" :value="fr.id">
                  {{ `${fr.id} - ${fr.description}` }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="flightType" class="label">Flight type (*)</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select id="flightType" v-model="selectedFlightType">
                <option v-for="ft in flightTypes" :key="ft.id" :value="ft.id">
                  {{ `${ft.id} - ${ft.description}` }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label for="number" class="label">Number</label>
          <div class="control">
            <input class="input" type="text" id="number" v-model="number" />
          </div>
        </div>
        <div class="field">
          <label for="type" class="label">Type of aircraft (*)</label>
          <div class="control">
            <input class="input" type="text" id="type" v-model="aircraftType" />
          </div>
        </div>
        <div class="field">
          <label for="turbulenceCat" class="label">Wake turbulence category (*)</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select id="turbulenceCat" v-model="selectedWakeTurbulenceCat">
                <option v-for="wt in wakeTurbulenceCats" :key="wt.id" :value="wt.id">
                  {{ `${wt.id} - ${wt.description}` }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="equipment" class="label">Equipment (*)</label>
          <div class="control">
            <input class="input" type="text" id="equipment" v-maska="'A / A'" v-model="equipment" />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label for="depAerodrome" class="label">Departure aerodrome (*)</label>
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" id="depAerodrome" v-model="depAerodrome" />
            </div>
            <div class="control">
              <button class="button is-outlined" @click="aerodromeModal = 'dep'">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="field is-narrow">
          <label for="time" class="label">Time (*)</label>
          <div class="control">
            <input class="input" type="text" id="time" v-maska="'####'" v-model="time" />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field is-narrow">
          <label for="cruisingSpeed" class="label">Cruising speed (*)</label>
          <div class="field has-addons">
            <p class="control">
              <span class="select">
                <select v-model="cruisingSpeedType">
                  <option value="K">K</option>
                  <option value="N">N</option>
                  <option value="M">M</option>
                </select>
              </span>
            </p>
            <p class="control is-expanded">
              <input
                class="input"
                type="text"
                id="cruisingSpeed"
                v-maska="'####'"
                v-model="cruisingSpeed"
              />
            </p>
          </div>
        </div>
        <div class="field is-narrow">
          <label for="cruisingLevel" class="label">Level (*)</label>
          <div class="field has-addons">
            <p class="control">
              <span class="select">
                <select v-model="cruisingLevelType">
                  <option value="A">A</option>
                  <option value="M">M</option>
                  <option value="S">S</option>
                  <option value="F">F</option>
                </select>
              </span>
            </p>
            <p class="control is-expanded">
              <input
                class="input"
                type="text"
                id="cruisingLevel"
                v-maska="'####'"
                v-model="cruisingLevel"
              />
            </p>
          </div>
        </div>
        <div class="field">
          <label for="route" class="label">Route (*)</label>
          <div class="control">
            <input class="input" type="text" id="route" v-model="route" />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label for="arrAerodrome" class="label">Destination aerodrome (*)</label>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input class="input" type="text" id="arrAerodrome" v-model="arrAerodrome" />
            </div>
            <div class="control">
              <button class="button is-outlined" @click="aerodromeModal = 'arr'">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="totalFlightTime" class="label">Total EET (*)</label>
          <div class="control is-expanded">
            <input
              class="input"
              type="text"
              id="totalFlightTime"
              v-maska="'####'"
              v-model="totalFlightTime"
            />
          </div>
        </div>
        <div class="field">
          <label for="altnAerodrome" class="label">Alternative aerodrome (*)</label>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input class="input" type="text" id="altnAerodrome" v-model="altnAerodrome" />
            </div>
            <div class="control">
              <button class="button is-outlined" @click="aerodromeModal = 'altn'">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="secondAltnAerodrome" class="label">2nd alternative aerodrome</label>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                id="secondAltnAerodrome"
                v-model="secondAltnAerodrome"
              />
            </div>
            <div class="control">
              <button class="button is-outlined" @click="aerodromeModal = 'secaltn'">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label for="otherInformation" class="label">Other information</label>
          <div class="control">
            <textarea class="textarea" id="otherInformation" v-model="otherInformation"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label for="endurance" class="label">Endurance (*)</label>
          <div class="control">
            <input class="input" type="text" id="endurance" v-maska="'####'" v-model="endurance" />
          </div>
        </div>
        <div class="field">
          <label for="personsOnBoard" class="label">Persons on board (*)</label>
          <div class="control">
            <input
              class="input"
              type="number"
              id="personsOnBoard"
              min="1"
              v-model="personsOnBoard"
            />
          </div>
        </div>
        <div class="field">
          <label for="emergencyRadio" class="label">Emergency radio</label>
          <div class="control">
            <div class="buttons">
              <button
                :class="['button', emergencyEquipment.uhfRadio ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('uhfRadio')"
              >
                UHF
              </button>
              <button
                :class="['button', emergencyEquipment.vhfRadio ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('vhfRadio')"
              >
                VHF
              </button>
              <button
                :class="['button', emergencyEquipment.eltRadio ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('eltRadio')"
              >
                ELT
              </button>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="survivalEquipment" class="label">Survival equipment</label>
          <div class="control">
            <div class="buttons">
              <button
                :class="['button', emergencyEquipment.polar ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('polar')"
              >
                POLAR
              </button>
              <button
                :class="['button', emergencyEquipment.desert ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('desert')"
              >
                DESERT
              </button>
              <button
                :class="['button', emergencyEquipment.maritime ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('maritime')"
              >
                MARITIME
              </button>
              <button
                :class="['button', emergencyEquipment.jungle ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('jungle')"
              >
                JUNGLE
              </button>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="jackets" class="label">Jackets</label>
          <div class="control">
            <div class="buttons">
              <button
                :class="['button', emergencyEquipment.lightJackets ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('lightJackets')"
              >
                LIGHT
              </button>
              <button
                :class="['button', emergencyEquipment.fluoresJackets ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('fluoresJackets')"
              >
                FLUORES
              </button>
              <button
                :class="['button', emergencyEquipment.uhfJackets ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('uhfJackets')"
              >
                UHF
              </button>
              <button
                :class="['button', emergencyEquipment.vhfJackets ? 'is-success' : '']"
                @click="toggleEmergencyEquipment('vhfJackets')"
              >
                VHF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field is-narrow">
          <label for="numberOfDinghies" class="label">Number of dinghies</label>
          <div class="control">
            <input
              class="input"
              type="number"
              id="numberOfDinghies"
              min="0"
              v-model="numberOfDinghies"
            />
          </div>
        </div>
        <div class="field is-narrow">
          <label for="dinghiesCapacity" class="label">Capacity</label>
          <div class="control">
            <input
              class="input"
              type="number"
              id="dinghiesCapacity"
              min="0"
              v-model="dinghiesCapacity"
              :disabled="numberOfDinghies < 1"
            />
          </div>
        </div>
        <div class="field">
          <label for="dinghiesCover" class="label">Cover color</label>
          <div class="control">
            <input
              class="input"
              type="text"
              id="dinghiesCover"
              v-model="dinghiesCover"
              :disabled="numberOfDinghies < 1"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label for="aircraftColor" class="label">Aircraft colour and marks (*)</label>
          <div class="control">
            <input class="input" type="text" id="aircraftColor" v-model="aircraftColor" />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label for="remarks" class="label">Remarks</label>
          <div class="control">
            <input class="input" type="text" id="remarks" v-model="remarks" />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label for="pilotInCommand" class="label">Pilot in command (*)</label>
          <div class="control">
            <input class="input" type="text" id="pilotInCommand" v-model="pilotInCommand" />
          </div>
        </div>
        <div class="field is-narrow">
          <label class="label">Signature (*)</label>
          <div class="control">
            <signature-pad
              :width="250"
              :height="100"
              @input="onInput"
              ref="signaturePadRef"
              class="pad-border"
            >
            </signature-pad>
            <button class="button is-small mt-2" @click="clearSignature()">
              <i class="fas fa-undo"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <p><strong>*</strong> campo obligatorio.</p>
    <hr />
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button class="button is-primary" @click="generateFlightPlan()">
          Generar plan de vuelo
        </button>
      </div>
    </div>
    <aerodrome-select
      :show="aerodromeModal !== ''"
      @onClose="aerodromeModal = ''"
      @onValue="selectAerodrome"
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import moment from "moment";
import SignaturePad from "vue3-signature-pad";
import AerodromeSelect from "./AerodromeSelect";
import aircraft from "../data/aircraft";
import flightRules from "../data/flightRules";
import flightTypes from "../data/flightTypes";
import generatePdf from "../service/generatePdf";
import wakeTurbulenceCats from "../data/wakeTurbulenceCats";

export default {
  components: { AerodromeSelect, SignaturePad },
  setup() {
    const aerodromeModal = ref("");
    const aircraftColor = ref("");
    const aircraftId = ref("");
    const aircraftType = ref("");
    const altnAerodrome = ref("SADP");
    const arrAerodrome = ref("SADM");
    const cruisingLevel = ref("");
    const cruisingLevelType = ref("A");
    const cruisingSpeed = ref("");
    const cruisingSpeedType = ref("N");
    const date = ref(moment().format("YYYY-MM-DD"));
    const depAerodrome = ref("SADM");
    const dinghiesCapacity = ref("");
    const dinghiesCover = ref("");
    const emergencyEquipment = ref({
      uhfRadio: false,
      vhfRadio: false,
      eltRadio: true,
      polar: false,
      desert: false,
      maritime: false,
      jungle: false,
      lightJackets: false,
      fluoresJackets: false,
      uhfJackets: false,
      vhfJackets: false,
    });
    const endurance = ref("");
    const equipment = ref("S / C");
    const number = ref("");
    const numberOfDinghies = ref(0);
    const remarks = ref("");
    const route = ref("");
    const selectedFlightRules = ref("V");
    const selectedFlightType = ref("G");
    const selectedWakeTurbulenceCat = ref("L");
    const time = ref("");
    const totalFlightTime = ref("");
    const secondAltnAerodrome = ref("");
    const signature = ref("");
    const signaturePadRef = ref("");
    const otherInformation = ref("");
    const personsOnBoard = ref("1");
    const pilotInCommand = ref("");

    watch(aircraftId, (current) => {
      const currentAircraft = aircraft.find((a) => a.id === current);
      aircraftType.value = currentAircraft.type;
      aircraftColor.value = currentAircraft.color;
    });

    const generateFlightPlan = () => {
      generatePdf(
        date.value,
        aircraftId.value,
        selectedFlightRules.value,
        selectedFlightType.value,
        number.value,
        aircraftType.value,
        selectedWakeTurbulenceCat.value,
        equipment.value,
        depAerodrome.value,
        time.value,
        cruisingSpeed.value,
        cruisingSpeedType.value,
        cruisingLevel.value,
        cruisingLevelType.value,
        route.value,
        arrAerodrome.value,
        totalFlightTime.value,
        altnAerodrome.value,
        secondAltnAerodrome.value,
        otherInformation.value,
        endurance.value,
        personsOnBoard.value,
        emergencyEquipment.value,
        numberOfDinghies.value,
        dinghiesCapacity.value,
        dinghiesCover.value,
        aircraftColor.value,
        remarks.value,
        pilotInCommand.value,
        signature.value
      );
    };

    const onInput = (data) => {
      signature.value = data;
    };

    const clearSignature = () => {
      signaturePadRef.value.clearSignature();
    };

    const selectAerodrome = (aerodrome) => {
      switch (aerodromeModal.value) {
        case "altn":
          altnAerodrome.value = aerodrome;
          break;
        case "arr":
          arrAerodrome.value = aerodrome;
          break;
        case "dep":
          depAerodrome.value = aerodrome;
          break;
        case "secaltn":
          secondAltnAerodrome.value = aerodrome;
          break;
      }
    };

    const toggleEmergencyEquipment = (equipment) => {
      emergencyEquipment.value[equipment] = !emergencyEquipment.value[equipment];
    };

    return {
      aerodromeModal,
      aircraft,
      aircraftColor,
      aircraftId,
      aircraftType,
      altnAerodrome,
      arrAerodrome,
      clearSignature,
      cruisingLevel,
      cruisingLevelType,
      cruisingSpeed,
      cruisingSpeedType,
      date,
      depAerodrome,
      dinghiesCapacity,
      dinghiesCover,
      emergencyEquipment,
      endurance,
      equipment,
      flightRules,
      flightTypes,
      generateFlightPlan,
      number,
      numberOfDinghies,
      remarks,
      route,
      secondAltnAerodrome,
      selectAerodrome,
      selectedFlightRules,
      selectedFlightType,
      selectedWakeTurbulenceCat,
      time,
      toggleEmergencyEquipment,
      totalFlightTime,
      onInput,
      otherInformation,
      personsOnBoard,
      pilotInCommand,
      wakeTurbulenceCats,
    };
  },
};
</script>

<style lang="scss" scoped>
.field {
  text-transform: uppercase;

  input {
    text-transform: uppercase;
  }
}

.pad-border {
  border: 2px solid #c0c0c0;
}
</style>
