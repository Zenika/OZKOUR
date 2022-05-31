<script setup>
const { useTalkStore }=require("@/stores/talks");
const { watch, ref }=require("@vue/runtime-core");

const talk = useTalkStore()

const selected = ref('')

  const visuals = [
    {
      id : "quoide9",
      label : "QUOI DE 9",
      value : "Quoi de 9",
      frequency : "week" 
    },
    {
      id : "emailing",
      label : "E-MAILING",
      value : "E-mailing",
      frequency : "month"
    },
    {
      id : "meetup",
      label : "MEET-UP",
      value : "Meet-up",
      frequency : "month"
    },
    {
      id : "slack",
      label : "SLACK",
      value : "Slack",
      frequency : "month"
    },
  ]
  
  talk.pickedTemplate(visuals[0].value,visuals[0].frequency);

  watch(selected, async (newSelect) => {
    let n = 0
    while(visuals[n].value !== newSelect){
      n++;
    }
    talk.pickedTemplate(newSelect,visuals[n].frequency);
  })

</script>

<template>
    <div action="#">
      <fieldset>
        <legend>Choisir un visuel</legend>
        <div class="templateChoice">
          <div v-for="visual in visuals" v-bind:key="visual">
            <input
              type="radio"
              :id="visual.id"
              name="template"
              :value="visual.value"
              :checked="visual.id == 'quoide9'"
              class="radio-btn"
              v-model="selected"
            />
            <label :for="visual.id" >{{visual.label}}</label>
          </div>
        </div>
      </fieldset>
    </div>
</template>

<style scoped>
  fieldset {
    border: none;
  }
  legend {
    background-color: #FFFFFF;
    border-radius: 10px;
    color: #1E1E1E;
    font-size: 18px;
    font-weight: 800;
    padding: 10px 20px;
    margin-bottom: 10px;
  }
  .templateChoice {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    font-size: 16px;
    letter-spacing: .0.5rem;
    padding-left: 5px;
  }
  .templateType {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .radio-btn {
    cursor: pointer;
    accent-color: #BF1D67;
  }
  /* label {
    padding-left: 10px;
  } */
  .blurClass {
    -webkit-filter: blur(5px);
    filter: blur(5px);
  }
</style>
