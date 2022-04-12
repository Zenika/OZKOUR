<template>
    <div class="eventDetails">
        <div class="details">
            <p>DATE</p>
            <ul>
                <li>15/04/2021</li>
            </ul>
        </div>
        <div class="details">
            <p>UNIVERS</p>
            <ul>
                <li>GREEN IT</li>
            </ul>
        </div>
        <div class="details">
            <p>TYPE</p>
            <ul>
                <li>Webinar</li>
            </ul>
        </div>
        <div class="details">
            <p>NOM DE L'EVENEMENT</p>
            <ul>
                <li>FCC AfterLab</li>
            </ul>
        </div>
        <div class="details">
            <p>TITRE DU TALK</p>
            <ul>
                <li>Sustainable IT: towards a new culture</li>
            </ul>
        </div>
        <div class="details">
            <p>SPEAKER</p>
            <ul>
                <li>Adrien Nortain</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.eventDetails {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

ul {
    list-style: none;
    padding: 0;
}

.details {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>