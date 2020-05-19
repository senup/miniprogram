package com.senup.wxapp.service.impl;

import com.senup.wxapp.entity.User;
import com.senup.wxapp.mapper.UserMapper;
import com.senup.wxapp.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-02
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

}
