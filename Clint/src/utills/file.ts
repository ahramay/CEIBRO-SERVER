export const getFileType = (file: any) => {
    return file?.name?.split?.('.')?.pop?.();
}