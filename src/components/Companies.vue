<template>
  <Header />
  <div class="p-4">
    <div class="flex justify-end mb-4">
      <button @click="toggleDarkMode" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </div>

    <div :class="{ 'dark': isDarkMode }">

      <h2 class="text-xl font-bold mb-4">Company Valuations</h2>
      <table class="min-w-full border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <!-- Existing columns -->
            <th class="px-4 py-2 text-left border border-gray-200">Company Name</th>
            <th class="px-4 py-2 text-left border border-gray-200">Equity Capital</th>
            <th class="px-4 py-2 text-left border border-gray-200">Face Value</th>
            <th class="px-4 py-2 text-left border border-gray-200">EPS</th>
            <th class="px-4 py-2 text-left border border-gray-200">Windage Growth</th>
            <th class="px-4 py-2 text-left border border-gray-200">Windage P/E</th>
            <th class="px-4 py-2 text-left border border-gray-200">Profit from operations</th>
            <th class="px-4 py-2 text-left border border-gray-200">Tax</th>
            <th class="px-4 py-2 text-left border border-gray-200">Depreciation</th>
            <th class="px-4 py-2 text-left border border-gray-200">Net Income</th>
            <th class="px-4 py-2 text-left border border-gray-200">Amount Receivable</th>
            <th class="px-4 py-2 text-left border border-gray-200">Amount Payable</th>
            <th class="px-4 py-2 text-left border border-gray-200">CAPEX</th>
            <th class="px-4 py-2 text-left border border-gray-200">Payback Time Value</th>
            <th class="px-4 py-2 text-left border border-gray-200">Margin of Safety Value</th>
            <th class="px-4 py-2 text-left border border-gray-200">Ten Cap Value</th>
            <!-- New "Show Charts" column -->
            <th class="px-4 py-2 text-center border border-gray-200">Charts</th>
            <th class="px-4 py-2 text-center border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(company, index) in companyData" :key="index" class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-4 py-2 border border-gray-200">{{ company.companyName }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.equityCapital }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.faceValue }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.eps }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.windageGrowth }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.windagePE }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.profitFromOperations }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.tax }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.depreciation }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.netIncome }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.amountReceivable }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.amountPayable }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ company.capex }}</td>
            <td class="px-4 py-2 border border-gray-200 bg-gray-100">{{ company.paybackTime }}</td>
            <td class="px-4 py-2 border border-gray-200 bg-gray-100">{{ company.marginOfSafety }}</td>
            <td class="px-4 py-2 border border-gray-200 bg-gray-100">{{ company.tenCap }}</td>
            <td class="px-4 py-2 text-center border border-gray-200">
              <button @click="showChartModal(index)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Show Charts</button>
            </td>
            <td class="px-4 py-2 text-center border border-gray-200">
              <button @click="showModal(index)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">Update</button>
              <button @click="deleteCompany(index)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="showModalAddCompany"
        class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add New Company</button>

      <div v-if="isModalAddCompanyVisible"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-lg w-96">
          <h2 class="text-lg font-bold mb-2">Add New Company</h2>
          <input type="text" v-model="newCompanyName" class="w-full border border-gray-300 px-2 py-1 rounded mb-2"
            placeholder="Company Name" required>
          <input type="number" v-model.number="newEps" class="w-full border border-gray-300 px-2 py-1 rounded mb-2"
            placeholder="EPS" required>
          <input type="number" v-model.number="newWindageGrowth"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Windage Growth" required>
          <input type="number" v-model.number="newWindagePE"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Windage P/E" required>
          <input type="number" v-model.number="newEquityCapital"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Equity Capital" required>
          <input type="number" v-model.number="newFaceValue"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Face Value" required>
          <input type="number" v-model.number="newProfitFromOperations"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Profit from operations" required>
          <input type="number" v-model.number="newNetIncome"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Net Income" required>
          <input type="number" v-model.number="newTax" class="w-full border border-gray-300 px-2 py-1 rounded mb-2"
            placeholder="Tax" required>
          <input type="number" v-model.number="newDepreciation"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Depreciation" required>
          <input type="number" v-model.number="newAmountReceivable"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Amount Receivable" required>
          <input type="number" v-model.number="newAmountPayable"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Amount Payable" required>

          <input type="number" v-model.number="newCapex" class="w-full border border-gray-300 px-2 py-1 rounded mb-2"
            placeholder="CAPEX" required>
          <div class="flex justify-end">
            <button @click="saveNewCompany"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
            <button @click="closeModalAddCompany"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </div>
      </div>

      <div v-if="isChartModalVisible"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-lg w-96">
          <canvas ref="chartCanvas"></canvas>
          <button @click="closeChartModal"
            class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
        </div>
      </div>

      <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-lg w-96">
          <h2 class="text-lg font-bold mb-2">Update Company</h2>
          <input type="text" v-model="updateCompanyName" class="w-full border border-gray-300 px-2 py-1 rounded mb-2"
            placeholder="Company Name" required>
          <input type="number" v-model.number="updateEquityCapital"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Equity Capital" required>
          <input type="number" v-model.number="updateFaceValue"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Face Value" required>
          <input type="number" v-model.number="updateEps" class="w-full border border-gray-300 px-2 py-1 rounded mb-2"
            placeholder="EPS" required>
          <input type="number" v-model.number="updateWindageGrowth"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Windage Growth" required>
          <input type="number" v-model.number="updateWindagePE"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Windage P/E" required>
          <input type="number" v-model.number="updateProfitFromOperations"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Profit from operations" required>
          <input type="number" v-model.number="updateTax" class="w-full border border-gray-300 px-2 py-1 rounded mb-2"
            placeholder="Tax" required>
          <input type="number" v-model.number="updateDepreciation"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Depreciation" required>
          <input type="number" v-model.number="updateNetIncome"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Net Income" required>
          <input type="number" v-model.number="updateAmountReceivable"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Amount Receivable" required>
          <input type="number" v-model.number="updateAmountPayable"
            class="w-full border border-gray-300 px-2 py-1 rounded mb-2" placeholder="Amount Payable" required>
          <input type="number" v-model.number="updateCapex" class="w-full border border-gray-300 px-2 py-1 rounded mb-2"
            placeholder="CAPEX" required>
          <div class="flex justify-end">
            <button @click="saveUpdatedCompany"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
            <button @click="closeModal"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick, reactive } from 'vue';
import { useDark, useStorage } from '@vueuse/core';
// import { useStorage } from '@vueuse/core';
import Header from './Header.vue';
import Chart from 'chart.js/auto'; // Import Chart.js

export default {
  components: {
    Header,
  },
  setup() {
    const companyData = useStorage('companyData', reactive([]));
    const isDarkMode = useDark({ storageKey: 'dark-mode' })

    const isUpdating = ref(false);
    const isChartModalVisible = ref(false);
    const isModalVisible = ref(false);
    const isModalAddCompanyVisible = ref(false);

    const newCompanyName = ref('');
    const newEps = ref();
    const newWindagePE = ref();
    const newWindageGrowth = ref();
    const newEquityCapital = ref();
    const newFaceValue = ref();
    const newTax = ref();
    const newProfitFromOperations = ref();
    const newDepreciation = ref();
    const newAmountReceivable = ref();
    const newAmountPayable = ref();
    const newNetIncome = ref();
    const newCapex = ref();
    const currentCompanyIndex = ref(null);
    const updateIndex = ref(-1);

    const updateCompanyName = ref('');
    const updateEps = ref();
    const updateWindagePE = ref();
    const updateWindageGrowth = ref();
    const updateEquityCapital = ref();
    const updateFaceValue = ref();
    const updateTax = ref();
    const updateProfitFromOperations = ref();
    const updateDepreciation = ref();
    const updateAmountReceivable = ref();
    const updateAmountPayable = ref();
    const updateNetIncome = ref();
    const updateCapex = ref();

    const updateCompany = (index) => {
      updateIndex.value = index;
      showModal(index);
    };

    const showModal = (index) => {
      console.log("showModal");
      isModalVisible.value = true;
      currentCompanyIndex.value = index;
      const company = companyData.value[index];
      updateCompanyName.value = company.companyName;
      updateEps.value = company.eps;
      updateWindagePE.value = company.windagePE;
      updateWindageGrowth.value = company.windageGrowth;
      updateEquityCapital.value = company.equityCapital;
      updateFaceValue.value = company.faceValue;
      updateTax.value = company.tax;
      updateProfitFromOperations.value = company.profitFromOperations;
      updateDepreciation.value = company.depreciation;
      updateAmountReceivable.value = company.amountReceivable;
      updateAmountPayable.value = company.amountPayable;
      updateNetIncome.value = company.netIncome;
      updateCapex.value = company.capex;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    const showModalAddCompany = () => {
      isModalAddCompanyVisible.value = true;
    };

    const closeModalAddCompany = () => {
      isModalAddCompanyVisible.value = false;
    };

    const saveNewCompany = () => {
      // calculate valuations
      const paybackTime = paybackTimeValue(newEquityCapital.value, newFaceValue.value, newProfitFromOperations.value, newCapex.value, newWindageGrowth.value);
      const marginOfSafety = marginOfSafetyValue(newEps.value, newWindageGrowth.value, newWindagePE.value);
      const tenCap = tenCapValue(newEquityCapital.value, newFaceValue.value, newNetIncome.value, newDepreciation.value, newAmountReceivable.value, newAmountPayable.value, newTax.value, newCapex.value);
      companyData.value.push({
        companyName: newCompanyName.value,
        eps: newEps.value,
        windagePE: newWindagePE.value,
        windageGrowth: newWindageGrowth.value,
        equityCapital: newEquityCapital.value,
        faceValue: newFaceValue.value,
        tax: newTax.value,
        profitFromOperations: newProfitFromOperations.value,
        depreciation: newDepreciation.value,
        amountReceivable: newAmountReceivable.value,
        amountPayable: newAmountPayable.value,
        netIncome: newNetIncome.value,
        capex: newCapex.value,
        paybackTime,
        marginOfSafety,
        tenCap
      });

      // reset form fields
      newCompanyName.value = '';
      newEps.value = '';
      newWindagePE.value = '';
      newWindageGrowth.value = '';
      newEquityCapital.value = '';
      newFaceValue.value = '';
      newTax.value = '';
      newProfitFromOperations.value = '';
      newDepreciation.value = '';
      newAmountReceivable.value = '';
      newAmountPayable.value = '';
      newNetIncome.value = '';
      newCapex.value = '';

      closeModalAddCompany();
    };
    const saveUpdatedCompany = () => {
      // calculate valuations
      const paybackTime = paybackTimeValue(updateEquityCapital.value, updateFaceValue.value, updateProfitFromOperations.value, updateCapex.value, updateWindageGrowth.value);
      const marginOfSafety = marginOfSafetyValue(updateEps.value, updateWindageGrowth.value, updateWindagePE.value);
      const tenCap = tenCapValue(
        updateEquityCapital.value,
        updateFaceValue.value, updateNetIncome.value,
        updateDepreciation.value,
        updateAmountReceivable.value,
        updateAmountPayable.value,
        updateTax.value,
        updateCapex.value);

      companyData.value.splice(currentCompanyIndex.value, 1, {
        companyName: updateCompanyName.value,
        eps: updateEps.value,
        windagePE: updateWindagePE.value,
        windageGrowth: updateWindageGrowth.value,
        equityCapital: updateEquityCapital.value,
        faceValue: updateFaceValue.value,
        tax: updateTax.value,
        profitFromOperations: updateProfitFromOperations.value,
        depreciation: updateDepreciation.value,
        amountReceivable: updateAmountReceivable.value,
        amountPayable: updateAmountPayable.value,
        netIncome: updateNetIncome.value,
        capex: updateCapex.value,
        paybackTime,
        marginOfSafety,
        tenCap,
      });
      closeModal();
    };

    const deleteCompany = (index) => {
      companyData.value.splice(index, 1);
    };


    const chartCanvas = ref(null);
    let chartInstance = null; // Store the chart instance

    const showChartModal = (index) => {
      isChartModalVisible.value = true;
      const company = companyData.value[index];

      nextTick(() => { // Ensure canvas is rendered before creating chart
        if (chartInstance) {
          chartInstance.destroy(); // Destroy existing chart if any
        }

        const ctx = chartCanvas.value.getContext('2d');
        chartInstance = new Chart(ctx, {
          type: 'bar', // Use bar chart
          data: {
            labels: ['Payback Time Value', 'Ten Cap Value', 'Margin of Safety Value'],
            datasets: [{
              label: company.companyName,
              data: [company.paybackTime, company.tenCap, company.marginOfSafety],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
    };

    const closeChartModal = () => {
      isChartModalVisible.value = false;
    };

    // valuation functions
    function commulativeValue(p, i, t) {
      let compoundedValue = p;
      let commulativeValue = 0;
      for (let _ = 0; _ < t; _++) {
        compoundedValue = compoundedValue + (compoundedValue * i) / 100;
        commulativeValue += compoundedValue;
      }
      return [compoundedValue, commulativeValue];
    }

    function compoundedValue(p, i, t) {
      return p * Math.pow(1 + i / 100, t);
    }

    function paybackTimeValue(
      equityCapital,
      faceValue,
      profitFromOps,
      capex,
      windageGrowth
    ) {
      let freeCashFlow = profitFromOps + capex;
      let [_, freeCashCommulativeValue] = commulativeValue(
        freeCashFlow,
        windageGrowth,
        8
      );
      let paybackTime = freeCashCommulativeValue / (equityCapital / faceValue);
      return Math.ceil(paybackTime);
    }

    function marginOfSafetyValue(eps, windageGrowth, windagePe) {
      let futureEps = compoundedValue(eps, windageGrowth, 10);
      let futurePrice = futureEps * windagePe;
      let presentPrice = futurePrice / 4;
      return Math.ceil(presentPrice / 2);
    }

    function tenCapValue(
      equityCapital,
      faceValue,
      netIncome,
      depreciation,
      accountsReceivable,
      accountsPayable,
      incomeTax,
      otherCapex
    ) {
      let tenCap = (10 *
        (netIncome +
          depreciation +
          accountsPayable +
          accountsReceivable +
          incomeTax +
          otherCapex)) /
        (equityCapital / faceValue);

      return Math.ceil(tenCap);
    }

    return {
      // data
      companyData,
      // visibility
      isUpdating,
      isModalVisible,
      isModalAddCompanyVisible,
      isChartModalVisible,
      // index
      currentCompanyIndex,
      updateIndex,
      // update data
      updateCompanyName,
      updateEps,
      updateWindagePE,
      updateWindageGrowth,
      updateEquityCapital,
      updateFaceValue,
      updateTax,
      updateProfitFromOperations,
      updateDepreciation,
      updateAmountReceivable,
      updateAmountPayable,
      updateNetIncome,
      updateCapex,
      // functions
      updateCompany,
      deleteCompany,
      saveUpdatedCompany,
      // charts
      chartCanvas,
      // new company data
      newCompanyName,
      newEps,
      newWindagePE,
      newWindageGrowth,
      newEquityCapital,
      newFaceValue,
      newTax,
      newProfitFromOperations,
      newDepreciation,
      newAmountReceivable,
      newAmountPayable,
      newNetIncome,
      newCapex,
      // functions
      showChartModal,
      closeChartModal,
      showModal,
      closeModal,
      showModalAddCompany,
      closeModalAddCompany,
      saveNewCompany,
      // dark mode
      isDarkMode,
      toggleDarkMode: () => isDarkMode.value = !isDarkMode.value
    };
  },
};

</script>

<style>
/* Ensure dark mode styles are applied */
html.dark {
  background-color: #1a202c;
  /* Dark background */
  color: #f7fafc;
  /* Light text */
}

/* Example table styles for dark mode */
.dark .bg-gray-100 {
  background-color: #2d3748;
  /* Darker background for table headers */
}

.dark .border-gray-200 {
  border-color: #4a5568;
  /* Darker border color */
}

.dark .hover\:bg-gray-50:hover {
  background-color: #4a5568;
  /* Darker hover background */
}
</style>
