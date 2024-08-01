import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:4000/',
    withCredentials: true,
});


type Method = "get" | "delete" | "post" | "put"
type ResponseType = "text" | "json" | "formData" | "blob" | "arrayBuffer"

export interface HttpRequestOptions extends Omit<RequestInit, "body"> {
    url: string
    method: Method
    data?: any
    responseType?: ResponseType
    params?: any
}


export async function apiRequest<T>(options: HttpRequestOptions): Promise<T> {
    return axiosInstance
        .request({
            url: options.url,
            method: options.method,
            data: options?.data,
            params: options.params,
            headers: options.headers as any,
            ...(options.signal && { signal: options.signal })
        }).then((response) => {
            const { data } = response;

            console.log(
                "AXIOS Response:",
                "\n URL:",
                options.url,
                "\n METHOD:",
                options.method,
                "\n PARAMS:",
                options.params,
                "\n REQUEST DATA:",
                options.data,
                "\n RESPONSE DATA:",
                data
            );


            return data 
        })
        .catch((error: AxiosError) => {
            console.warn(error)
        })
}
