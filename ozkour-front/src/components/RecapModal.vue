<script>
import PrimaryBtn from "@/components/Buttons/PrimaryBtn.vue";
import {ref} from 'vue'

export default {
  components:{
    PrimaryBtn
  },
  props: {
    talks : {
      type : Array,
      required : true
    },
    dates : {
      type : Object,
      required : true
    },
    template : {
      type : String,
      required : true
    }
  },
  emits:['close', 'submit'],
  setup(){

    const loading = ref(false)
    function load(){
      loading.value = !loading.value
    }
    return {
      loading,
      load
    }
  }
};
</script>

<template>
  <div class="popUp-bg">
    <div class="popUp-header">
      <button
        type="button"
        class="close-btn"
        @click="$emit('close')"
      >
        X
      </button>
      <h2>Récapitulatif</h2>
    </div>

    <div class="recap">
      <div class="recap-details">
        <div class="icon-bg">
          <img
            src="../assets/images/gallery.png"
            alt="calendar"
            class="icon"
          >
        </div>
        <p data-test="template-detail">
          <b>Visuel : </b>{{ template }}
        </p>
      </div>
      <div class="recap-details">
        <div class="icon-bg">
          <img
            src="../assets/images/calendar.png"
            alt="calendar"
            class="icon"
          >
        </div>
        <p data-test="date-detail">
          <b>Dates : </b>{{ dates.start }} au {{ dates.end }}
        </p>
      </div>
      <div>
        <div class="recap-details">
          <div class="icon-bg">
            <img
              src="../assets/images/microphone.png"
              alt="calendar"
              class="icon"
            >
          </div>
          <p><b>Liste des talks : </b></p>
        </div>
        <ul class="events">
          <li
            v-for="talk in talks"
            :key="talk"
            data-test="talk-title"
          >
            {{ talk.talkTitle }}
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="loading"
      class="loading-container"
    >
      <div class="loading">
        <div class="spinner">
          <div class="head" />
        </div> 
      </div>
    </div>
    
    
    <div class="validate">
      <PrimaryBtn
        :disabled="loading"
        @click="load(), $emit('submit')"
      >
        Valider
      </PrimaryBtn>
    </div>
  </div>
</template>

<style scoped>
.popUp-bg {
  width: 35%;
  top: 30%;
  bottom: auto;
  background: #f2f2f2;
  position: absolute;
  z-index: 20;
  transform: "translate(-50%, -50%)";
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.popUp-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #ee2238 0%, #c21e65 100%);
  border-radius: 20px 20px 0px 0px;
}

.close-btn {
  position: absolute;
  left: 5%;
  align-self: flex-start;
  border: none;
  color: white;
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  padding-top: 10px;
  background: transparent;
}

.recap {
  /* width: 100%; */
  color: black;
  padding: 0px 20px;
}

.icon-bg {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: linear-gradient(90deg, #ee2238 0%, #c21e65 100%);
  padding: 2px;
}

.icon {
  width: 20px;
}

.recap-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.events {
  margin: 0px;
  padding-left: 60px;
}

.validate {
  display: flex;
  justify-content: center;
  padding: 30px 0px;
}

.loading-container {
  display:grid;
  justify-content:center;
  position:fixed;
  left:48.5%;
  top:50%;
}

.loading {
  border-radius:50%;
  width:2.5em;
  height:2.5em;
  transform-origin:center;
  animation: rotate 1s linear infinite;
}

.spinner {
  width: 7em;
  height: 7em;
  left: -2.8em;
  top: -2.8em;
  border-top: 1em solid #C21E65;
  position:relative;
  border-right: 1em solid transparent;
  border-radius: 50%;
}

.head {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin-left: 5.9em;
  margin-top: -0.05em;
  background: linear-gradient(-25deg, #EE2238 0%, #C21E65 100%);
}

@keyframes rotate{
  to{
    transform:rotate(360deg);
  }
}
</style>
