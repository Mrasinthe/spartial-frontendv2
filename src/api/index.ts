import axios, {AxiosResponse} from "axios";
import { SERVER_URL } from "../constants";
import {
    DatasetType,
    TParamType,
    BuildStatusType,
    MMTStatusInterface
} from "../types/types";


interface Option {
    reports:  string
    isRunning: string
    lastBuildAt: string
    lastBuildId: string
    config: any
}

export interface Ac {
    datasets: string[]
}

async function makeApiRequest<T>(
    url: string,
    method: 'get' | 'post' | 'put' = 'get',
    payload?: any,
    responseType: 'json' | 'blob' = 'json'
): Promise<T | null> {
    try {
        let response: AxiosResponse<T>;
        switch (method) {
            case 'post':
                response = await axios.post<T>(url, payload, { responseType });
                break;
            case 'put':
                response = await axios.put<T>(url, payload, { responseType });
                break;
            default:
                response = await axios.get<T>(url, { params: payload, responseType });
        }
        return response.data;
    } catch (error) {
        console.error(`Error in API request to ${url}:`, error);
        return null;
    }
}

export default makeApiRequest;

export const requestAllReports = async () => {
    return makeApiRequest<Option[]>(`${SERVER_URL}/api/reports`);
};
export const requestMMTStatus = async () => {
    return makeApiRequest<MMTStatusInterface>(`${SERVER_URL}/api/mmt`);
};
export const requestBuildADModel = async (
    datasets: DatasetType,
    ratio: number,
    params: TParamType
): Promise<BuildStatusType | null> => {
    const buildConfig = { datasets, "training_ratio": ratio, "training_parameters": params };
    return makeApiRequest<BuildStatusType>(`${SERVER_URL}/api/build`, 'post', { buildConfig });
};

export const requestDatasetAC = async () => {
    return makeApiRequest<Ac>(`${SERVER_URL}/api/ac/datasets`);
};

export const requestBuildStatusAC = async () => {
    const response = await makeApiRequest<any>(`${SERVER_URL}/api/ac/build`);
    return response ? response.buildStatus : null;
};

export const requestBuildACModel = async (modelType: any, dataset: any, featuresList: any, trainingRatio: any) => {
    const buildACConfig = { modelType, dataset, featuresList, trainingRatio };
    return makeApiRequest<any>(`${SERVER_URL}/api/ac/build`, 'post', { buildACConfig });
};

export const requestAllModels = async () => {
    const response = await makeApiRequest<any>(`${SERVER_URL}/api/models`);
    return response ? response.models : null;
}

export const requestDownloadModel = async (modelId: string) => {

    try {
        const response = await makeApiRequest<Blob>(`${SERVER_URL}/api/models/${modelId}/download`, 'get', null, 'blob');
        BlobDownload(response, modelId, null)

    } catch (error) {
        console.error('Error downloading the model:', error);
    }
};


export const requestUpdateModel = async (modelId: string, newModelId: string) => {
    const newId = { newModelId: newModelId };
    console.log(newId)
}

export const requestDownloadDatasets =  async (modelId: string, datasetType:string) => {
    if (!modelId) {
        console.error('Model ID is required');
        return;
    }

    try {
        const response = await makeApiRequest<Blob>(`${SERVER_URL}/api/models/${modelId}/datasets/${datasetType}/download`, 'get', null, 'blob');
        BlobDownload(response, modelId, datasetType)
    } catch (error) {
        console.error('Error downloading the model:', error);
    }
}

const BlobDownload = (response: Blob | null, modelId: any, datasetType: any) => {

    if (!response) {
        console.error('Failed to download model due to empty response');
        return;
    }
        const blob = response instanceof Blob ? response : new Blob([response]);
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;

        if(datasetType){
            const datasetFileName = `${modelId}_${datasetType.charAt(0).toUpperCase() + datasetType.slice(1)}_samples.csv`;
            link.download = datasetFileName;

        } else {
            link.download = `${modelId}.bin`;
        }

        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    }

export const requestViewModelDatasets = async (modelId: string, datasetType: string) => {
    return  await makeApiRequest<any>(`${SERVER_URL}/api/models/${modelId}/datasets/${datasetType}/view`, 'get', null);
}