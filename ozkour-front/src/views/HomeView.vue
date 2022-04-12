<template>
    <h1>Generateur de Visuel</h1>
    <div id="buttons">
        <button class='btnChoixForm'>TALK</button>
        <button class='btnChoixForm'>TRAINING</button>
    </div>
</template>

<style scoped>
    @font-face{
        font-family: 'OpenSans-ExtraBold';
        src: url('../assets/fonts/OpenSans-ExtraBold.ttf')
    }
    @font-face{
        font-family: 'Nunito-Bold';
        src: url('../assets/fonts/Nunito-Bold.ttf')
    }

    .btnChoixForm{
        background: linear-gradient(90deg, #EE2238 0%, #C21E65 100%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 30px;
        padding-top: 1%;
        padding-bottom: 1%;
        width: 20%;
        margin: 1%;
        margin-bottom: 3%;
        border-width: 0;
        color:white;
        font-family: 'OpenSans-ExtraBold';
        font-style: bold;
        font-size: 100%;
    }
    .btnChoixForm:hover{
        background: linear-gradient(90deg, #921623 0%, #94184e 100%);
    }
    h1{
        font-family: 'Nunito-Bold';
        color:white;
        font-size: 300%;
    }
    #buttons{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
    }
</style>
