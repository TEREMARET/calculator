<script setup lang="ts">
import { getAddressesCount, getNetworkAddress, isIpValid } from '../function/ipUtils';
import SubButton from '../components/SubButton.vue';
import UiInput from '../components/UiInput.vue';
import UiSelect from '../components/UiSelect.vue';
import { computed, ref } from 'vue';
import { maskid } from '../ipMasks';

interface CalculationResult {
    ip: string;
    mask: string;
    adr: string;
    count: number;
}

const ip = ref("");
const selectedMask = ref(maskid[0]);
const result = ref<CalculationResult | null>(null);

const isValid = computed(() => isIpValid(ip.value));

const validateIp = () => {
    result.value = null;
};

const calculate = () => {
    if (!isValid.value) return;

    result.value = {
        ip: ip.value,
        mask: selectedMask.value,
        adr: getNetworkAddress(ip.value, selectedMask.value),
        count: getAddressesCount(selectedMask.value)
    };
}
</script>

<template>
<main>
  <div class="container">
    <h1>Калькулятор подсетей</h1>
    <div class="components">
      <label for="ip">IP-адрес: </label>
      <UiInput v-model="ip" @input="validateIp"/>

      <label for="mask">Маска: </label>
      <UiSelect v-model="selectedMask" :options="maskid"/>

      <SubButton @click="calculate" :disabled="isValid"/>

      <div v-if="result" class="result">
        <h2 class="result-title">Результаты расчета:</h2>
        <div class="result-item">
          <span class="result-value"><b>IP-адрес: </b>{{ result.ip }}</span>
        </div>
        <div class="result-item">
          <span class="result-value"><b>Маска: </b>{{ result.mask }}</span>
        </div>
        <div class="result-item">
          <span class="result-value"><b>Адрес сети: </b>{{ result.adr }}</span>
        </div>
        <div class="result-item">
          <span class="result-value"><b>Количество возможных адресов: </b>{{ result.count }}</span>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<style>

main {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.components {
  display: grid;
  justify-content: center;
  gap: 10px;
}

</style>
