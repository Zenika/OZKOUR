export type Drive = {
    getIdOfTalkFileByYear : getIdOfTalkFileByYear,
    copyDocument : copyDocument
}

enum folder {
    "emailing"
}


type getIdOfTalkFileByYear = (
    year: string,
) => Promise<string>

type copyDocument = (
    folder: folder,
    name:string
) => Promise<string>

    