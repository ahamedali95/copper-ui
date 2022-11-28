import useMutation from "./useMutations";
import urls from "./url";

const useSignupMutation = () => {
    const { isLoading, data, errors, fetch } = useMutation(urls.SIGNUP, "users",{ method: 'post' });

    const createUser = async (data: any) => {
        const response = await fetch(data);
        return response;
    };

    return {
        isLoading,
        data,
        errors,
        createUser
    }
};

export default useSignupMutation;