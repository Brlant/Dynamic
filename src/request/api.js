import {http} from "./http";
export const getCcs3dScenesElementAllInfo = (params)=>{
    return http({
        url:'/ccsScenesElement/getCcs3dScenesElementAllInfo',
        method:"GET",
        params:params
    })
}




