export const sendResponse = (res, msg, data) => {
  return res.status(200).json({
    success: true,
    message: msg,
    data: data,
  });
};
