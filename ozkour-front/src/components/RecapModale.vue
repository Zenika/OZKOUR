<script>
import ValidateBtn from '../components/Buttons/ValidateBtn.vue'

export default {
  components: {
    ValidateBtn,
  },
}

</script>

<template>
    <div class="popUp-bg">
        <div class="popUp-header">
            <button type="button" class="close" @click="$emit('close')"> X </button>
            <h2>Récapitulatif</h2>
        </div>

        <div class="validate">
            <ValidateBtn />
        </div>

    </div>
</template>

<style scoped>
    .popUp-bg {
        width: 30%;;
        top: 30%;
        bottom: auto;
        background: #F2F2F2;
        position: absolute;
        z-index: 20;
        transform: 'translate(-50%, -50%)';
        border-radius: 20px;
    }

    .popUp-header{
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(90deg, #EE2238 0%, #C21E65 100%);
        border-radius: 20px 20px 0px 0px;
    }

    .close {
        position: relative;
        right: 80px;
        justify-self: flex-end;
        align-self: flex-start;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding-top: 10px;
        background: transparent;
    }

    .validate {
        display: flex;
        justify-content: center;
        padding: 20px 0px;
    }

</style>