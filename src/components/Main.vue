<template>
  <div>
    <h1 class="text-4xl font-bold mb-5 text-gray-100">Weather News <span class="text-4xl font-bold text-amber-300">& Events</span></h1>
    <div class="max-w-screen-sm mx-auto p-5">
      <div class="w-full">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <input
              v-model="city"
              @keyup.enter="submitForm"
              class="appearance-none
                block w-full bg-gray-200
                text-gray-700 border border-gray-200
                rounded py-3 px-4 mb-3 leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500"
              id="city"
              type="text"
              placeholder="eq: Tokyo"
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="current && current.cod == 200" class="max-w-md mx-auto p-5 overflow-hidden">
      <div class="w-full">
        <div class="flex items-center justify-between leading-tight p-2 md:p-4">
          <p class="text-white text-2xl">Today</p>
        </div>
        <div class="flex text-7xl items-center justify-between leading-tight p-2 md:p-4">
          <h2 class="font-bold mb-2 text-white">{{ current.main.temp }} <span class="text-amber-300">&deg;</span></h2>
          <img
              :src="'https://openweathermap.org/img/wn/' + current.weather[0].icon + '@2x.png'" :alt="current.weather[0].main"
          >
        </div>
        <div v-if="current.sys" class="flex text-3xl items-center justify-between leading-tight p-2 md:p-4">
          <p class="text-white">{{ current.name }}, {{ current.sys.country }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="current && current.cod == 404">
      <p class="text-white text-2xl">{{ capitalized(current.message) }}</p>
    </div>

    <div v-if="items.list" class="relative">
      <div id="carrusel" class="flex flex-row overflow-x-auto mx-6">
        <div v-for="data in items.list" :key="data.dt" class="card flex flex-col items-center shadow-lg w-2/3 bg-card-blue p-5 m-3 text-center">
          <img :src="'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png'" :alt="data.weather[0].main" class="rounded-full w-2/4 mb-6">
          <p class="text-white text-lg mb-2">{{ data.main.temp }} <span class="text-amber-300">&deg;</span></p>
          <p class="text-white text-base mb-2">{{ data.weather[0].description }}</p>
          <p class="text-white text-base mb-2">{{ dateTransform(data.dt) }}</p>
        </div>
      </div>
    </div>

    <div v-if="venues.results && current.cod == 200" class="relative">
      <div class="max-w-md mx-auto p-5 overflow-hidden">
        <h2 class="text-4xl text-white">Event list</h2>
      </div>
      <div id="carrusel" class="flex flex-row overflow-x-auto mx-6">
        <div v-for="venue in venues.results" :key="venue.fsq_id" class="card flex flex-col items-center shadow-lg w-2/3 bg-card-blue p-5 m-3 text-center">
          <img :src="venue.categories[0].icon.prefix + '88.png'" :alt="venue.categories[0].id" class="rounded-full w-2/4 mb-6">
          <p class="text-white text-lg mb-2">{{ venue.name }}</p>
          <p class="text-white text-base mb-2">{{ venue.location.formatted_address }}</p>
          <p class="text-white text-base mb-2">{{ venue.location.locality }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from "moment";

export default {
  name: 'MainComponent',
  props: {
    msg: String
  },

  data() {
    return {
      items: [],
      venues: [],
      current: null,
      city: ''
    }
  },

  mounted() {
  },

  methods: {
    submitForm() {
      this.fetchCurrent();
      this.fetchForecast();
      this.fetchVenues();
    },

    async fetchForecast() {
      try {
        const response = await axios.post(process.env.VUE_APP_ROOT_API + '/api/v1/forecast', {
          'city': this.city
        });
        this.items = response.data;
      } catch (error) {
       console.log('error', error)
      }
    },

    async fetchCurrent() {
      try {
        const response = await axios.post(process.env.VUE_APP_ROOT_API + '/api/v1/current', {
          'city': this.city
        });
        this.current = response.data;
      } catch (error) {
        console.log('error', error)
      }
    },

    async fetchVenues() {
      try {
        const response = await axios.post(process.env.VUE_APP_ROOT_API + '/api/v1/venue-search', {
          'city': this.city
        });
        this.venues = response.data;
      } catch (error) {
        console.log('error', error)
      }
    },

    dateTransform(dateTime) {
      return moment.unix(dateTime).format('MMM Do h:mm:a');
    },

    capitalized(message) {
      const capitalizedFirst = message[0].toUpperCase();
      const rest = message.slice(1);

      return capitalizedFirst + rest;
    }

  }
}
</script>

<style scoped>
.card {
  min-width: 20vw;
}
.arrow {
  top: 30%
}

#carrusel {
  scroll-behavior: smooth;
}
</style>

