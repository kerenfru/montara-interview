export const msToDays = (ms) => {
    return Math.floor(ms / (24 * 60 * 60 * 1000));
};

export const getDatePlus14Days = (date) => {
    const result = new Date(date);
    result.setDate(result.getDate() + 14);
    return result;
};

export const getQuarantineTimeLeft = (quarantineDate) => {
    return msToDays(Math.abs(getDatePlus14Days(quarantineDate) - new Date()))
};