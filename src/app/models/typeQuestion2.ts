export interface TypeQuestion2 {
    id?: any;
    typeQuestion:  {
        typeQuestion?: string;
        question?: string;
        answers?: [{
            id?: any,
            answer?: string,
            selected?: boolean
        }] | any
        topics?: [{
            id?: any;
            topic?: string;
            selectedTopics?: boolean;
        }] | any
    }
}