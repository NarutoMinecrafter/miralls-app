import * as Device from 'expo-device';

export const getHWID = () => {
    const hwid = `${Device.manufacturer} ` +
        `${Device.modelName} ` +
        `(${Device.osName} ${Device.osVersion}) ` +
        `[${Device.osBuildId}]`;
    return hwid
};