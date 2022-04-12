<template>
    <header>
        <div id='header'>
            <div id='header-logo'>
                <a href="/" tabindex="1">
                    <img id="logoZenika" alt="Zenika logo" src="../assets/Logo_Horizontal_Blanc.png" >
                </a>      
            </div>  
            <div id='header-user'>
                <span>Nom Prénom</span>
                <img id="imgLogout" @keyup.enter="test" @click="test" alt="image logout" src="../assets/images/logout.png" tabindex="2">
            </div>
        </div>
    </header>
</template>

<script setup>
    function test(){
        console.log("test")
    }
</script>

<style scoped>
    #logoZenika{
        width: 100%;
    }
    #imgLogout{
        width: 10%;
        cursor: pointer;
    }
    #header{
        width:100%;
        display:flex;
        justify-content: space-between;
    }   
    #header-user{
        height:100px;
        line-height : 100px;
        width: 50%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 2%;
        gap:5%;
    }
    div#header-logo{
        width: 15%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 2%;
    }
    header{
        margin-bottom: 5%;
    }
    img{
        display: inline;
    }
    span{
        height:100px;
        line-height : 100px;
        color:white;        
        font-family: 'OpenSans-ExtraBold';
        display: inline-block;
    }
    /* a{
        border:1px solid red;  
    } */
</style>