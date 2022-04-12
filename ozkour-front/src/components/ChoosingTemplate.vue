<template>
    <main class="flex-column">
        <h3>Choisir un visuel</h3>
        <div class="flex-start">
            <div class="templateChoice">
                <input type="radio" id="quoide9" name="template" value="quoide9" class="radio-btn">
                <label for="quoide9">QUOI DE 9</label>
            </div>
            <div>
                <input type="radio" id="emailing" name="template" value="emailing" class="radio-btn">
                <label for="emailing">E-MAILING</label>
            </div>
            <div>
                <input type="radio" id="meetup" name="template" value="meetup" class="radio-btn">
                <label for="meetup">MEET-UP</label>
            </div>
            <div>
                <input type="radio" id="slack" name="template" value="slack" class="radio-btn">
                <label for="slack">SLACK</label>
            </div>
        </div>
    </main>
</template>

<style scoped>
.flex-column {
    display: flex;
    flex-direction: column;
}
.flex-start {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    font-size: 16px;
    letter-spacing: .0.5rem;
}

.radio-btn {
    cursor: pointer;
}

label {
    padding-left: 10px;
}
</style>