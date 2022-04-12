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

        <button>Semaine prochaine</button>
    </div>
</template>

<style scoped>
.flex-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.date {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

</style>