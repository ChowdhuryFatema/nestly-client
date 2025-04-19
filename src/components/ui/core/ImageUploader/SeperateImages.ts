export const separateImages = (imagesFiles: File[] | string[] | []) => {
    const previousImageUrls = imagesFiles.filter((item) => typeof item === 'string');
    const newImageFiles = imagesFiles.filter((item) => item instanceof File);

    return { previousImageUrls, newImageFiles };
};