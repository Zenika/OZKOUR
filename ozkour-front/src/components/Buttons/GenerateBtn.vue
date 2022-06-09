<script >
import { useTalkStore } from '@/stores/talks';
import Modal from '../RecapModal.vue';

export default {
  components: {
    Modal,
  },
  setup() {
    const talk = useTalkStore();
    return{
      talk
    }
  },
  data () {
    return {
      isModalVisible: false,
      isAddClass: false,
    };
  },
  methods: {
    showModal() {
      this.talk.blur();
    },
    closeModal() {
      this.talk.clarify()
    },
  },
};
</script>

<template>
  <button 
    type="submit" 
    class="generate-btn"
    :class="{'blurClass': talk.blured}"
    @click="showModal"
  >
    GÉNÉRER UN VISUEL
  </button>

  <Modal
    v-show="talk.blured"
    @close="closeModal"
  />
    
  <Modal
    v-show="talk.blured"
    @close="closeModal"
  />
</template>

<style scoped>
    .generate-btn{
        width: 15%;
        background: linear-gradient(90deg, #EE2238 0%, #C21E65 100%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        color: #FFFFFF;
        font-size: 18px;
        font-weight: 800;
        border: none;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 30px;
        padding: 15px;
        cursor: pointer;
    }
    .generate-btn:hover {
        background: linear-gradient(90deg, #921623 0%, #94184e 100%);
    }

    .antiBlur{
        -webkit-filter: blur(0px);
        filter: blur(0px);
    }

    .modal--active body {
        -webkit-filter: blur(8px);
            filter: blur(8px);
            opacity: 1;
    }

    .blurClass {
         -webkit-filter: blur(5px);
        filter: blur(5px)
    }
</style>