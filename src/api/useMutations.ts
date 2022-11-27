import {useState} from "react";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {ResponseData, ResponseError} from "./types";
import urls from "./url";
import useAuth from "../hooks/useAuth";

type useMutationReturnType<T> = {
    isLoading: boolean;
    data: ResponseData<T> | null;
    errors: ResponseError[];
    fetch: CallableFunction
};

const useMutation = <T>(endpoint: string, type: string, config: AxiosRequestConfig = {}): useMutationReturnType<T> => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ResponseData<T> | null>(null);
    const [errors, setErrors] = useState<ResponseError[]>([]);
    const {setAccessToken, setValueInCookie} = useAuth();

    const fetch = async (payload: T): Promise<void> => {
        setIsLoading(true);

        try {
            const response: AxiosResponse = await axios({
                url: `/api/v1/${endpoint}`,
                headers: {
                    "Content-Type": 'application/json'
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

            if (endpoint === urls.SIGNON) {
                setAccessToken(response.headers.authorization.split(" ")[1]);
                setValueInCookie("doesUserProfileExist", response.data.data.attributes.doesUserProfileExist);
            }

            setIsLoading(false);
            setData(response.data.data);
            setErrors([]);
        } catch (e: any) {
            setIsLoading(false);
            setData(null);
            setErrors(e.response.data.errors)
        }
    };

    return {
        isLoading,
        data,
        errors,
        fetch
    };
};

export default useMutation;