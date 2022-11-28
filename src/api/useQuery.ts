import {useState} from "react";
import axios, {AxiosRequestConfig} from "axios";
import { ResponseData, ResponseError } from "./types";

type useQueryReturnType<T> = {
  isLoading: boolean;
  data: ResponseData<T> | null;
  errors: ResponseError[];
  fetch: CallableFunction;
  isSuccess: boolean;
};

const useQuery = <T>(endpoint: string, type: string, config: AxiosRequestConfig = {}): useQueryReturnType<T> => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ResponseData<T> | null>(null);
    const [errors, setErrors] = useState<ResponseError[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const fetch = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await axios({
                url: "api/v1/" + endpoint,
                headers: {
                    "Content-Type": "application/json",
                    type
                },
                ...config
            });

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
        fetch,
        isSuccess
    };
};

export default useQuery;