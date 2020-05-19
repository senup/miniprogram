package com.senup.wxapp.service.impl;

import com.senup.wxapp.entity.Comment;
import com.senup.wxapp.mapper.CommentMapper;
import com.senup.wxapp.service.ICommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-16
 */
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements ICommentService {

}
