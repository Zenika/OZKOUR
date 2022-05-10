<script >
import Modal from '../RecapModal.vue';
  
  export default {
    components: {
      Modal,
    },
    data () {
        return {
            isModalVisible: false,
            isAddClass: false,
        };
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        addClass() {
            this.isAddClass = true;
        },
        deleteClass() {
            this.isAddClass = false;
        }
    },
  };
</script>

<template>
    <button 
        type="submit" 
        class="generate-btn"
        @click="showModal"
        v-on:click="addClass"
        :class="{'myClass': isAddClass}"
    >
        GÉNÉRER UN VISUEL
    </button>

    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      v-on:click="deleteClass"
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

    .modal--active body {
        -webkit-filter: blur(8px);
            filter: blur(8px);
            opacity: 1;
    }

    .myClass {
         -webkit-filter: blur(5px);
        filter: blur(5px)
    }
</style>