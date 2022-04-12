<template>
    <div class="flex-column">
        <div class="date">
            <label for="start">Date de début</label>
            <input type="date" id="start" name="talk-start" value="2022-04-11" min="2022-01-01" max="2023-12-01">
        </div>

        <div class="date">
            <label for="end">Date de fin</label>
            <input type="date" id="end" name="talk-end" value="2022-04-12" min="2022-01-01" max="2023-12-01">
        </div>

        <button type="button" class="next-week-btn">Semaine prochaine</button>
    </div>
</template>

<style scoped>
.flex-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.date {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

label, #start, #end {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    padding-bottom: 5px;
    font-weight: 400;
}

#start, #end {
    width: 80%;
    background: rgba(242, 242, 242, 0.4);
    color: #FFFFFF;
    letter-spacing: .1rem;
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    padding: 10px;
    cursor: text;
}

.next-week-btn {
    background: #F2F2F2;
    font-weight: 400;
    font-size: 16px;
    border: 3px solid #FFFFFF;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
}

</style>