export const response = async (res, returnResponse) => {

    let { status, statusCode, message, data, count, error, token, staticPath, totalRecords } = returnResponse;

    if (statusCode === 500) {
        return res.status(500).json({
            status,
            message
        });
    }
  
    return res.status(statusCode).json({
        status,
        message,
        count,
        totalRecords,
        ...(staticPath && { staticPath }),
        data,
        ...(token && { token })
    });
};