package com.senup.wxapp.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.senup.wxapp.entity.Article;
import com.senup.wxapp.entity.Comment;
import com.senup.wxapp.mapper.CommentMapperCustom;
import com.senup.wxapp.service.IArticleService;
import com.senup.wxapp.service.ICommentService;
import com.senup.wxapp.utils.XTJSONResult;
import com.senup.wxapp.vo.CommentVo;
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
 * @since 2020-05-16
 */
@RestController
@RequestMapping("/v1/comment")
public class CommentController {
    @Autowired
    private ICommentService commentService;
    @Autowired
    private IArticleService articleService;



    @PostMapping("/deleteComment")
    public XTJSONResult deleteComment(Integer commentId) {

        //找到文章
        Comment c = commentService.getById(commentId);

        QueryWrapper<Article> wrapper = new QueryWrapper<>();
        wrapper.eq("id", c.getArtId());
        Article a = articleService.getOne(wrapper);
        a.setCommentCount(a.getCommentCount()-1);
        QueryWrapper<Article> w = new QueryWrapper<>();
        w.eq("id", c.getArtId());
        articleService.update(a,w);

        commentService.removeById(commentId);
        return XTJSONResult.ok();
    }


    @PostMapping("/postNewComment")
    public XTJSONResult postNewComment(String commentMsg,Integer contentId,String userId){
        System.out.println("contentId============>"+contentId);
        if (StringUtils.isBlank(commentMsg) || StringUtils.isEmpty(commentMsg)) {
            return XTJSONResult.errorMsg("评论内容为空~");
        }
        if (StringUtils.isBlank(userId) || StringUtils.isEmpty(userId)) {
            return XTJSONResult.errorMsg("用户id为空~");
        }
        if (contentId == null) {
            return XTJSONResult.errorMsg("帖子id为空~");
        }
        Comment comment = new Comment();
        comment.setCommentMsg(commentMsg);
        comment.setArtId(contentId);
        comment.setUserId(userId);
        comment.setLikeCounts(0);
        comment.setCreateTime(new Date());
        commentService.save(comment);
        System.out.println(comment);
        Article articleTemp = articleService.getById(contentId);
        articleTemp.setCommentCount(articleTemp.getCommentCount()+1);
        QueryWrapper<Article> articleQueryWrapper = new QueryWrapper<>();
        articleQueryWrapper.eq("id",contentId);
        articleService.update(articleTemp, articleQueryWrapper);
        //
        return XTJSONResult.ok();
    }



}

