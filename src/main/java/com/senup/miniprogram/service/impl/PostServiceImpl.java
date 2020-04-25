package com.senup.miniprogram.service.impl;

import com.senup.miniprogram.entity.Post;
import com.senup.miniprogram.mapper.PostMapper;
import com.senup.miniprogram.service.IPostService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 涛哥
 * @since 2020-04-07
 */
@Service
public class PostServiceImpl extends ServiceImpl<PostMapper, Post> implements IPostService {

}
