package com.senup.wxapp.service.impl;

import com.senup.wxapp.entity.Article;
import com.senup.wxapp.mapper.ArticleMapper;
import com.senup.wxapp.service.IArticleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-04
 */
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements IArticleService {

}
