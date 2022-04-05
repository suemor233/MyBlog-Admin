import {AxiosResponse} from "axios";

export interface IAxios extends AxiosResponse{
    data: any;
    message: string;
    statusCode: number;
    success: boolean
}
