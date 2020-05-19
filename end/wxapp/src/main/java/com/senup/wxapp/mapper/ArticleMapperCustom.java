package com.senup.wxapp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.senup.wxapp.vo.ArticleVo;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-04
 */
public interface ArticleMapperCustom extends BaseMapper<ArticleVo> {
    ArticleVo queryPublisherInfoWithContent(@Param("contentId") Integer contentId);
    Page<ArticleVo> queryAllArticles(IPage<ArticleVo> pagination);
    Page<ArticleVo> queryAllArticles2(IPage<ArticleVo> pagination,@Param("content") String content,@Param("type")Integer type,
                                      @Param("userId") String userId);
}
