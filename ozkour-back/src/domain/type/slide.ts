export type SlideRepository = {
    getIdSlideTemplate : getIdSlideTemplate ,
    copySlide : copySlide,
    deleteTemplateInfo : deleteTemplateInfo,
    fillSlideWithData : fillSlideWithData,
    getSuccessMessage : getSuccessMessage
}

type organizedTalk = {
    talks : Map<string, [
        {
            eventName:string,
            eventType:string,
            talks : [{
                speaker:string,
                title:string,
                universe:string
            }]
        }
    ]>
}

type getIdSlideTemplate = () => Promise<string>

type copySlide = (
    slideId: string,
) => Promise<string>

type deleteTemplateInfo = (
    slideId: string,
) => Promise<void>

type fillSlideWithData = (
    slideId: string,
    organizedTalks: organizedTalk,
) => Promise<any>

type getSuccessMessage = (
) => {
    message: string;
    link: string;
}

type deleteLastSlide = (
) => Promise<void>
    