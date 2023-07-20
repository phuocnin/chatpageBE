/*const register = (req, res, next) => {
    try {
        res.send(req.body)
    } catch (err) {
        next(err);
    }
}
*/
const register = async (req, res, next) => {
    try {
        res.send(req.body);
    } catch (error) {
        next(error);
    }
};
module.exports = {
    register,
}