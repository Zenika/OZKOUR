<template>
    <header>
        <div id='header'>
            <a href="/" ><img id="logoZenika" alt="Zenika logo" src="../assets/Logo_Horizontal_Blanc.png"></a>
            
            <div id='header-user'>
                <span>Nom Prénom</span>
            
                <img id="imgLogout" alt="image logout" src="../assets/images/logout.png">
            </div>
            
            
        </div>
    </header>
</template>

<style scoped>
    #logoZenika{
        width: 15%;
        margin: 2%;
        float: left;
    }
    #imgLogout{
        width: 10%;
        margin: 2%;
        right:0px;
    }
    #header{
        text-align: right;
        width:100%;
        display:flex;
        justify-content: space-around;
    }   
    #header-user{
        height:100px;
        line-height : 100px;
        width: 50%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
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
    table{
        text-align: right;
        width:auto;
        display: inline;
    }
    td{
        text-align: right;
    }
</style>