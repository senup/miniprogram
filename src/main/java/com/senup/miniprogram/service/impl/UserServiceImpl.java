package com.senup.miniprogram.service.impl;

import com.senup.miniprogram.entity.User;
import com.senup.miniprogram.mapper.UserMapper;
import com.senup.miniprogram.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 涛哥
 * @since 2020-03-31
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

}
