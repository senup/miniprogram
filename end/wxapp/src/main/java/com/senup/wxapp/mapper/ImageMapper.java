package com.senup.wxapp.mapper;

import com.senup.wxapp.entity.Image;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-04
 */
public interface ImageMapper extends BaseMapper<Image> {
    Image selectByArticleId(int artId);

}
