const { OK, CREATED, BAD_REQUEST } = require('../../config/statusCode').statusCode;
const userServices = require('../../services/user');
const { createJwtAccessToken } = require('../../utils/jwt');

/* 회원 로그인 API */
exports.login = async (req, res, next) => {
    try{
        const user = req.body;
        const accesstoken = createJwtAccessToken(user.id);
        res.status(CREATED).json({
            message: '로그인 성공!',
            user: {
                no: req.user.no,
                id: req.user.id,
            },
            accesstoken
        });
    } catch(error){
        res.status(BAD_REQUEST).json({
            message: "로그인 실패!"
        });
    }
};

/* 회원 가입 API */
exports.register = async (req, res, next) => {
    try{
        const {id, name, password} = req.body;
        await userServices.setUser({id, name, password});
        res.status(CREATED).json({
            message: '회원가입 성공!',
        });
    } catch (error){
        res.status(BAD_REQUEST).json({
            message: "실패!"
        });
    }
};