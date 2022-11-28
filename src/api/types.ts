type ResponseData<T> = {
    type: string;
    attributes: T;
};

type Source = {
    pointer: string;
    parameter: string;
};

type ResponseError = {
    title: string;
    detail?: string;
    source?: Source
}

export type {
    ResponseData,
    ResponseError
};

