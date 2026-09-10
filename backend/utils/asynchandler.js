export const asyncHandler = (asyncFunc) => {
    return async (req, res, next) => {
        // try {
        //     await asyncFunc(req, res, next);
        // } catch (error) {
        //     next(error);
        // }
        Promise.resolve(asyncFunc(req, res, next)).catch(next);
    }
};