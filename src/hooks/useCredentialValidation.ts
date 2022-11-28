import { useState } from "react";
import { SchemaOf } from "yup";

import { Credential } from "../pages/authentication/types";
import useAuth from "./useAuth";

type useCredentialValidationProps = {
    userSubmit: (val: any) => Promise<unknown>;
    validationSchema: SchemaOf<{ username: string, password: string}> | SchemaOf<{ username: string }>
};

const useCredentialValidation = ({ userSubmit, validationSchema }: useCredentialValidationProps) => {
    const  { getValueInCookie } = useAuth();
    const [username, setUsername] = useState<string>(getValueInCookie("username") ?? "");
    const [password, setPassword] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<Credential>({} as Credential);

    const handleSubmit = async (): Promise<void> => {
        try {
            await validationSchema.validate({ username, password }, { abortEarly: false, strict: true });
            setValidationErrors({} as Credential);
            userSubmit({ email: username, password });
        } catch (err) {
            const errors = (err as any).inner.reduce((acc: Credential, value: { path: string, message: string }): Credential => {
                return { ...acc, [value.path]: value.message };
            }, {});
            setValidationErrors(errors);
        }
    };

    return {
        username,
        password,
        setUsername,
        setPassword,
        validationErrors,
        onSubmit: handleSubmit
    }

};

export default useCredentialValidation;