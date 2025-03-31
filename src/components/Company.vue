<template>
  <Header/>

  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 overflow-y-auto">
    <!-- <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
      <div class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div> -->
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Add company valuation</h2>
      <p class="mt-2 text-lg/8 text-gray-600">This calculates company valuations as per Margin of Safety, Ten Cap Value and Payback time methods</p>
    </div>
    <form @submit.prevent="addCompany()" class="mx-auto mt-16 max-w-xl sm:mt-20  overflow-y-auto">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="company-name" class="block text-sm/6 font-semibold text-gray-900">Company Name</label>
          <div class="mt-2.5">
            <input v-model="companyName" type="text" name="company-name" id="company-name" autocomplete="organization" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="eps" class="block text-sm/6 font-semibold text-gray-900">Earning Per Share</label>
          <div class="mt-2.5">
            <input v-model="eps" type="number" step="0.1" name="eps" id="eps" autocomplete="number" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="windagePE" class="block text-sm/6 font-semibold text-gray-900">Windage P/E Ratio</label>
          <div class="mt-2.5">
            <input v-model="windagePE" type="number" step="0.1" name="windagePE" id="windagePE" autocomplete="number" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="windageGrowth" class="block text-sm/6 font-semibold text-gray-900">Windage Growth (Sales & Earnings)</label>
          <div class="mt-2.5">
            <input v-model="windageGrowth" type="number" step="0.1" name="windageGrowth" id="windageGrowth" autocomplete="number" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
          </div>
        </div>
      </div>

      <div class="mt-10">
        <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Company</button>
      </div>
    </form>
  </div>
</template>

<script lang="js">
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import Header from './Header.vue'
export default {
  components: {
    Header
  },
  setup(){
    const companyData = useStorage('companyData', [])
    const companyName = ref('')
    const eps = ref(0)
    const windagePE = ref(0)
    const windageGrowth = ref(0)

    const addCompany = () => {
      const newCompany = {
        companyName: companyName.value,
        eps: eps.value,
        windagePE: windagePE.value,
        windageGrowth: windageGrowth.value,
      }
      companyData.value.push(newCompany)

      console.log(companyData)
      // clear the input fields
      companyName.value = ''
      eps.value = 0
      windagePE.value = 0
      windageGrowth.value = 0
    }
    return{
      companyName,
      eps,
      windagePE,
      windageGrowth,
      addCompany,
      companyData
    }
  }
}
</script>
