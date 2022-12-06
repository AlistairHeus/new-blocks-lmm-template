import { axiosIns } from "./axios";


export const postRequest = async(value) =>{
    const data =  await axiosIns.post(value)
    return data;
}

export const putRequest = async(value, config) =>{
    const data =  await axiosIns.put(value, config)
    return data;
}

export const LoginRequest = async(endPoint, value) =>{
    const data =  await axiosIns.put(endPoint, value)
    return data;
}


export const getRequest = async(endPoint,config) =>{
    const data = await axiosIns.get(`${endPoint}`, config)
    return data;
}


export const deleteRequest = async(endPoint, id,config) =>{
    const data = await axiosIns.delete(`${endPoint}${id}`,config)
    return data;
}