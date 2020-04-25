package com.senup.miniprogram.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.senup.miniprogram.vo.PostVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 涛哥
 * @since 2020-04-07
 */
public interface PostMapperCustom extends BaseMapper<PostVo> {
//    List<PostVo> queryPostDetail();

    Page<PostVo> queryPostDetail(IPage<PostVo> pagination);
}
