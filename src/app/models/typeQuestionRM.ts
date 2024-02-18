export interface TypeQuestionRM {
    id?: any;
    typeQuestion:  {
        typeQuestion?: string;
        question?: string;
        answers?: [{
            id?: any,
            answer: string,
            selected?: boolean
        } ]| any
    }
}