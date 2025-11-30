<template>
  <div class="subnet-calculator">
    <h1 class="calculator-title">Калькулятор подсетей</h1>
    
    <div class="calculator-form">
      <div class="input-group">
        <label for="ip-address" class="input-label">IP адрес:</label>
        <input id="ip-address" v-model="ipAddress" type="text" placeholder="192.168.1.150" :class="['input-field', { 'input-field--error': !isValid }]" @input="validateIp" @keyup.enter="calculate"/>
        <span v-if="!isValid" class="error-message">Неверный формат IP адреса</span>
      </div>

      <div class="input-group">
        <label for="subnet-mask" class="input-label">Маска подсети:</label>
        <select id="subnet-mask" v-model="selectedMask" class="select-field">
          <option v-for="mask in SUBNET_MASKS" :key="mask" :value="mask">
            {{ mask }}
          </option>
        </select>
      </div>

      <button :disabled="!isValid" @click="calculate" class="calculate-button" :class="{ 'calculate-button--disabled': !isValid }">
        Рассчитать
      </button>
    </div>

    <div v-if="result" class="result-section">
      <h2 class="result-title">Результаты расчета:</h2>
      <div class="result-grid">
        <div class="result-item">
          <span class="result-label">IP адрес:</span>
          <span class="result-value">{{ result.ipAddress }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Маска подсети:</span>
          <span class="result-value">{{ result.subnetMask }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Адрес сети:</span>
          <span class="result-value">{{ result.networkAddress }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Количество адресов:</span>
          <span class="result-value">{{ result.addressesCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SUBNET_MASKS } from '../ipMasks';
import { isIpValid, getNetworkAddress, getAddressesCount } from '../function/ipUtils';

interface CalculationResult {
  ipAddress: string;
  subnetMask: string;
  networkAddress: string;
  addressesCount: number;
}

const ipAddress = ref('192.168.1.150');
const selectedMask = ref('255.255.255.0');
const result = ref<CalculationResult | null>(null);

const isValid = computed(() => isIpValid(ipAddress.value));

const validateIp = () => {
  result.value = null;
};

const calculate = () => {
  if (!isValid.value) return;

  result.value = {
    ipAddress: ipAddress.value,
    subnetMask: selectedMask.value,
    networkAddress: getNetworkAddress(ipAddress.value, selectedMask.value),
    addressesCount: getAddressesCount(selectedMask.value)
  };
};
</script>

<style scoped>
:root {
  --primary-color: #3498db;
  --primary-hover: #2980b9;
  --error-color: #e74c3c;
  --success-color: #27ae60;
  --border-color: #bdc3c7;
  --background-color: #ecf0f1;
  --text-color: #2c3e50;
  --disabled-color: #95a5a6;
  --white: #ffffff;
}

.subnet-calculator {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.calculator-title {
  text-align: center;
  color: var(--text-color);
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.calculator-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.9rem;
}

.input-field,
.select-field {
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-field:focus,
.select-field:focus {
  outline: none;
  border-color: var(--primary-color);
}

.input-field--error {
  border-color: var(--error-color);
}

.error-message {
  color: var(--error-color);
  font-size: 0.8rem;
}

.calculate-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calculate-button:hover:not(.calculate-button--disabled) {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

.calculate-button--disabled {
  background-color: var(--disabled-color);
  cursor: not-allowed;
  transform: none;
}

.result-section {
  background-color: var(--background-color);
  padding: 1.5rem;
  border-radius: 6px;
  border-left: 4px solid var(--success-color);
}

.result-title {
  color: var(--text-color);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.result-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.result-label {
  font-weight: 600;
  color: var(--text-color);
}

.result-value {
  color: var(--success-color);
  font-family: monospace;
  font-weight: 600;
}

.result-item:last-child {
  border-bottom: none;
}
</style>