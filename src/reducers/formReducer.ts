export type ActionWithPayload<T> = {
    type: string;
    property: keyof T;
    value: any;
};

export type ActionWithoutPayload = {
    type: string;
};

type Action<T> = ActionWithPayload<T> | ActionWithoutPayload;

const formReducer = <T>(state: T, action: Action<T>): T => {
    switch (action.type) {
    case "UPDATE_PROPERTY": {
        const $action = action as ActionWithPayload<T>;

        return {
            ...state,
            [$action.property]: $action.value
        };
    }
    default:
        return state;
    }
};

export default formReducer;