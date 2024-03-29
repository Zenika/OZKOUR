export type DocRepository = {
    removeTemplateTextEmailingTalk : removeTemplateTextEmailingTalk,
    addTextForTalkEmailing : addTextForTalkEmailing,
    getSuccessMessage : getSuccessMessage
}

type mapUniverse = {
    talks : Map<string, [
        talks : [{
            speaker:string,
            title:string,
            universe:string,
            date:Date
            eventName:string,
            url: string
        }]
    ]>
}

type removeTemplateTextEmailingTalk = (
    documentId: string,
) => Promise<void>

type addTextForTalkEmailing = (
    documentId: string,
    talksByUniverse: mapUniverse
) => Promise<void>

type getSuccessMessage = (
    documentId: string,
) => {
    message: string;
    url: string;
}

    