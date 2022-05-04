<template>
    <form action="#">
        <fieldset>
            <legend>Choisir un visuel</legend>
            <div class="templateChoice">
                <div>
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
        </fieldset>
    </form>
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

    .radio-btn {
        cursor: pointer;
        accent-color: #BF1D67;
    }

    label {
        padding-left: 10px;
    }
</style>