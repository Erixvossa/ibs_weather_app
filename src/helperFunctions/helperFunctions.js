export const getDate = () => {
    const date = new Date().toDateString();
    return date;
};

export const convertTimes = num => {
    return new Date(num * 1000).toLocaleTimeString();
};