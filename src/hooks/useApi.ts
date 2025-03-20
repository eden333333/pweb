import { useState, useCallback, useContext } from "react";
import { Context } from "../context/Context"; // Import your AuthContext
import Response from '../models/Response'
import { useNavigate } from "react-router-dom";
import { refreshTokenApi } from '../api/auth'
import { RawPromise } from "../models/Response";

type apiType<V> = {
    api: (modelData: V, token: string) => RawPromise;
    modelData: V;
}
export const useApi = <V, T>() => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token, refreshToken, setToken } = useContext(Context);
    const navigate = useNavigate()

    const callServer = useCallback(async ({ api, modelData }: apiType<V>): Promise<Response<T>> => {
        setLoading(true);
        setError(null);
        const responseData: Response<T> = { status: 200, ok: true, data: undefined }
        
        const response = await api(modelData, token);


        if (response.status === 401) {
            if (refreshToken.length > 0) {
                const newToken = await refreshTokenApi(refreshToken);
                if (newToken) {
                    setToken(newToken);
                    const retryResponse = await api(modelData, token);;
                    if (retryResponse.ok) {
                        setLoading(false);
                        const data = await retryResponse.json();
                        responseData.data = data;
                        return data;
                    }
                }
            }
            //setError("Unauthorized. Please log in again.");
            setLoading(false);
            navigate('/login');

        }

        if (!response.ok) {
            setError(`Error: ${response.statusText}`);
            setLoading(false);
            responseData.ok = false;
            responseData.status = response.status;
            return responseData;
        }

        const data: T = await response.json();
        setLoading(false);
        responseData.data = data;
        return responseData;
    }, [token, refreshToken, setToken]);

    return { callServer, loading, error }
}

