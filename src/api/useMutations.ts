import {useState} from "react";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {ResponseData, ResponseError} from "./types";
import urls from "./url";
import useAuth from "../hooks/useAuth";

//@todo: possibly replace with react-query? - Because I am in track to recreate the same functionality that library offers.
type useMutationReturnType<T> = {
    isLoading: boolean;
    data: ResponseData<T> | null;
    errors: ResponseError[];
    submit: (payload?: T) => Promise<void>;
    isSuccess: boolean;
};

const useMutation = <T>(endpoint: string, type: string, config: AxiosRequestConfig = {}): useMutationReturnType<T> => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ResponseData<T> | null>(null);
    const [errors, setErrors] = useState<ResponseError[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const {setValueInCookie} = useAuth();

    const submit = async (payload: T = {} as T): Promise<void> => {
        setIsLoading(true);

        try {
            const response: AxiosResponse = await axios({
                url: `/api/v1/${endpoint}`,
                headers: {
                    "Content-Type": "application/json"
                },
                transformRequest: (data) => {
                    return JSON.stringify({
                        data: {
                            type,
                            attributes: {
                                ...payload
                            }
                        }
                    });
                },
                ...config
            });

            //set access token after successful login. @todo: checkout axios interceptor to perform this task
            if (endpoint === urls.SIGNON) {
                setValueInCookie("access-token", response.headers.authorization.split(" ")[1]);
                setValueInCookie("username", response.data.data.attributes.email)
            }

            setIsLoading(false);
            setData(response.data.data);
            setIsSuccess(true);
            setErrors([]);
        } catch (e: any) {
            setIsLoading(false);
            setData(null);
            setIsSuccess(false);
            setErrors(e.response.data.errors)
        }
    };

    return {
        isLoading,
        data,
        errors,
        submit,
        isSuccess
    };
};

export default useMutation;