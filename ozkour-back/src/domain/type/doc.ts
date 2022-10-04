export type DocRepository = {
    removeTemplateText : removeTemplateText,
    addTextForEmailing : addTextForEmailing,
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
            link: string
        }]
    ]>
}

type removeTemplateText = (
    documentId: string,
) => Promise<void>

type addTextForEmailing = (
    documentId: string,
    talksByUniverse: mapUniverse
) => Promise<void>

type getSuccessMessage = (
    documentId: string,
) => {
    message: string;
    link: string;
}

    