import Username from "./Username";
import {FC} from "react";
import DeleteAccount from "./DeleteAccount";

type Setting = {
    id: number;
    content: string;
    Component: FC;
};

const settings: Setting[] = [
    {
        id: 1,
        content: 'Update Username',
        Component: Username
    },
    {
        id: 2,
        content: 'Delete Account',
        Component: DeleteAccount
    }
];

export type {
    Setting
}

export {
    settings
}