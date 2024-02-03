const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');

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
router.post('/api/login', (req, res) => {
    // 处理用户登录逻辑
    res.status(200).json({ message: 'User logged in successfully' });
});

// 获取用户信息
router.get('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    // 根据 userId 获取用户信息的逻辑
    res.status(200).json({ userId, message: 'User information retrieved successfully' });
});

// 更新用户信息
router.put('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    // 根据 userId 更新用户信息的逻辑
    res.status(200).json({ userId, message: 'User information updated successfully' });
});

// 注销（退出登录）
router.post('/api/logout', (req, res) => {
    // 处理用户注销逻辑
    res.status(200).json({ message: 'User logged out successfully' });
});

// 重置密码请求
router.post('/api/reset-password', (req, res) => {
    // 处理重置密码请求的逻辑
    res.status(200).json({ message: 'Password reset request processed successfully' });
});

// 重置密码确认
router.post('/api/confirm-reset-password', (req, res) => {
    // 处理重置密码确认逻辑
    res.status(200).json({ message: 'Password reset confirmed successfully' });
});

// 验证 Token 是否有效
router.get('/api/validate-token', (req, res) => {
    // 处理验证 Token 逻辑
    res.status(200).json({ message: 'Token validated successfully' });
});

module.exports = router;
