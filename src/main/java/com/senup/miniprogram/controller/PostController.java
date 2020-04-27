package com.senup.miniprogram.controller;


import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.senup.miniprogram.entity.Post;
import com.senup.miniprogram.mapper.PostMapperCustom;
import com.senup.miniprogram.service.IPostService;
import com.senup.miniprogram.utils.JSONResult;
import com.senup.miniprogram.vo.PostVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 涛哥
 * @since 2020-04-07
 */
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private IPostService postService;
    @Autowired
    private PostMapperCustom postMapperCustom;

    @PostMapping("/doPost")
    public JSONResult doPost(String userId,String content){
        if(StringUtils.isBlank(userId)||StringUtils.isBlank(content)){
            return  JSONResult.errorMsg("用户id不能为空~");
        }
        Post post = new Post();
        post.setFromId(userId);
        post.setContent(content);
        post.setCreateTime(new Date());
        post.setLikeCount(0);
        post.setCommentCount(0);
        post.setStatus(0);
        postService.save(post);
        return JSONResult.ok(post.getId());
    }
//    Integer page,Integer size)

    @GetMapping("/postDetail")
    public JSONResult postDetail(){
        IPage<PostVo> page=new Page<>(1,10);
        Page<PostVo> postVoPage = postMapperCustom.queryPostDetail(page);
        List<PostVo> records = postVoPage.getRecords();
        return JSONResult.ok(records);
    }
}

