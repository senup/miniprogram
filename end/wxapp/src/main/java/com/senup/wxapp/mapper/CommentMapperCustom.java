package com.senup.wxapp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.senup.wxapp.entity.Comment;
import com.senup.wxapp.vo.CommentVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-16
 */
public interface CommentMapperCustom extends BaseMapper<CommentVo> {
    List<CommentVo> getCommentListById(@Param("artId")Integer artId);
}
