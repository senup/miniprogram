package com.senup.miniprogram.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.senup.miniprogram.mapper.PostMapperCustom;
import com.senup.miniprogram.service.IPostServiceCustom;
import com.senup.miniprogram.vo.PostVo;
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
public class PostServiceCustom extends ServiceImpl<PostMapperCustom, PostVo> implements IPostServiceCustom {

    public Page<PostVo> testpage(Page<PostVo> page, QueryWrapper<PostVo> wrapper) {
        return page.setRecords(baseMapper.testpage(page, wrapper));
    }


}
