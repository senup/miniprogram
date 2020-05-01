package com.senup.miniprogram.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.senup.miniprogram.mapper.PostMapperCustom;
import com.senup.miniprogram.service.IPostServiceCustom;
import com.senup.miniprogram.utils.PagedResult;
import com.senup.miniprogram.vo.PostVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Autowired
    private PostMapperCustom postMapperCustom;
    public Page<PostVo> testpage(Page<PostVo> page, QueryWrapper<PostVo> wrapper) {
        return page.setRecords(baseMapper.testpage(page, wrapper));
    }

    @Override
    public PagedResult getAllPosts(Integer page, Integer size) {
        PageHelper.startPage(page,size);
        List<PostVo> postVos = postMapperCustom.queryAllPosts();
        PageInfo<PostVo> pageList=new PageInfo<> (postVos);

        PagedResult pagedResult = new PagedResult();
        pagedResult.setPage(page);
        pagedResult.setTotal(pageList.getPages());
        pagedResult.setRows(postVos);
        pagedResult.setRecords(pageList.getTotal());

        return pagedResult;
    }


}
