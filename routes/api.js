const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');
const History = require('../models/history')

/* APIs starting with /users */
/* GET users listing. */

// registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        if (error.name==="SequelizeUniqueConstraintError"){
            res.status(409).send("duplicate registration")
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/* sample code for getting all users */
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// 用户登录
router.post('/login', async (req, res) => {
    // 处理用户登录逻辑
    try {
        const {username, password} = req.body
        const registeredUsers = await User.findAll({
            where: {
                $or:[
                    // both username or email can be used for validation
                    {username: username},
                    {email:username}
                ]
            }
        })
        for (const registeredUser of registeredUsers) {
            console.log(registeredUser)
            if (registeredUser.password===password){
                res.status(200).json({message: 'User logged in successfully'});
                return
            }else{
                res.status(401).send("Incorrect password")
            }
        }
        res.status(404).send("User not found")

    }catch (e){
        console.log(e)
        res.status(500).send("server error")
    }
});

// 获取用户信息
router.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    // 根据 userId 获取用户信息的逻辑
    res.status(200).json({ userId, message: 'User information retrieved successfully' });
});

// 更新用户信息
router.put('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    // 根据 userId 更新用户信息的逻辑
    res.status(200).json({ userId, message: 'User information updated successfully' });
});

// 注销（退出登录）
router.post('/logout', (req, res) => {
    // 处理用户注销逻辑
    res.status(200).json({ message: 'User logged out successfully' });
});

// 重置密码请求
router.post('/reset-password', (req, res) => {
    // 处理重置密码请求的逻辑
    res.status(200).json({ message: 'Password reset request processed successfully' });
});

// 重置密码确认
router.post('/confirm-reset-password', (req, res) => {
    // 处理重置密码确认逻辑
    res.status(200).json({ message: 'Password reset confirmed successfully' });
});

// 验证 Token 是否有效
router.get('/validate-token', (req, res) => {
    // 处理验证 Token 逻辑
    res.status(200).json({ message: 'Token validated successfully' });
});

router.post('/save-history', async (req, res) => {
    try{
        const body = req.body
        const newHistory = await History.create({email:body.email,
        RIC: body.RIC,
        Category: body.cat})
        res.status(201).json(newHistory)
    }catch (error){
        console.log(error)
        res.status(500).send("Internal server error")
    }
})

router.get("/history",async (req, res) => {
    try {
        const {email} = req.query
        const queriedRecords = await History.findAll({
            where: {
                email: email
            },
            order:[['createdAt']]

        })
        res.status(200).json(queriedRecords)
    }catch (e) {
        console.log(e)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;
