package com.senup.wxapp.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.senup.wxapp.entity.Article;
import com.senup.wxapp.entity.SearchRecord;
import com.senup.wxapp.entity.User;
import com.senup.wxapp.entity.UserLikeArticle;
import com.senup.wxapp.mapper.ArticleMapperCustom;
import com.senup.wxapp.mapper.CommentMapperCustom;
import com.senup.wxapp.mapper.SearchRecordMapper;
import com.senup.wxapp.service.IArticleService;
import com.senup.wxapp.service.IUserLikeArticleService;
import com.senup.wxapp.service.IUserService;
import com.senup.wxapp.utils.TimeAgoUtils;
import com.senup.wxapp.utils.XTJSONResult;
import com.senup.wxapp.vo.ArticleVo;
import com.senup.wxapp.vo.CommentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-04
 */
@RestController
@RequestMapping("/v1/article")
public class ArticleController {
    @Autowired
    private IArticleService articleService;
    @Autowired
    private ArticleMapperCustom articleMapperCustom;
    @Autowired
    private SearchRecordMapper searchRecordMapper;
    @Autowired
    private IUserService userService;
    @Autowired
    private CommentMapperCustom commentMapperCustom;
    @Autowired
    private IUserLikeArticleService userLikeArticleService;


    @PostMapping("/deleteArticle")
    public XTJSONResult deleteArticle(Integer articleId) {
        articleService.removeById(articleId);
        return XTJSONResult.ok();
    }

    @PostMapping("/userLikeArticle")
    public XTJSONResult userLikeArticle(Integer artId, String userId, String posterId) {
        //插入表中
        UserLikeArticle u = new UserLikeArticle();
        u.setArticleId(artId);
        u.setUserId(userId);
        userLikeArticleService.save(u);
        //发布者获赞数加一
        //先找到该用户 再更新
        User poster = userService.getById(posterId);
        poster.setReceiveLikeCounts(poster.getReceiveLikeCounts() + 1);
        QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
        userQueryWrapper.eq("id", posterId);
        userService.update(poster, userQueryWrapper);
        //文章获赞数加一
        Article articleTemp = articleService.getById(artId);
        articleTemp.setLikeCount(articleTemp.getLikeCount() + 1);
        QueryWrapper<Article> articleWrapper = new QueryWrapper<>();
        articleWrapper.eq("id", artId);
        articleService.update(articleTemp, articleWrapper);
        return XTJSONResult.ok();
    }

    @PostMapping("/userUnlikeArticle")
    public XTJSONResult userUnlikeArticle(Integer artId, String userId, String posterId) {
        //从表中删除
        QueryWrapper<UserLikeArticle> wrapper = new QueryWrapper<>();
        wrapper.eq("article_id", artId).eq("user_id", userId);
        userLikeArticleService.remove(wrapper);
        //发布者获赞数减一
        User poster = userService.getById(posterId);
        poster.setReceiveLikeCounts(poster.getReceiveLikeCounts() - 1);
        QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
        userQueryWrapper.eq("id", posterId);
        userService.update(poster, userQueryWrapper);
        //文章获赞数减一
        Article articleTemp = articleService.getById(artId);
        articleTemp.setLikeCount(articleTemp.getLikeCount() - 1);
        QueryWrapper<Article> articleWrapper = new QueryWrapper<>();
        articleWrapper.eq("id", artId);
        articleService.update(articleTemp, articleWrapper);
        return XTJSONResult.ok();
    }


    //返回用户帖子图片
    @GetMapping("/publisherInfo")
    public XTJSONResult publisherInfo(Integer contentId) {
        System.out.println("contentId-->" + contentId);
        ArticleVo vo = articleMapperCustom.queryPublisherInfoWithContent(contentId);
        if (vo == null) {
            return XTJSONResult.errorMsg("帖子已被删除，请重新加载~");
        }
        System.out.println(vo);
        List<CommentVo> comments = commentMapperCustom.getCommentListById(contentId);
//        时间格式化
//        for (CommentVo c:comments
//             ) {
//            String temp = TimeAgoUtils.format(c.getCreateTime());
//            c.setTimeAgo(temp);
//        }
        vo.setComments(comments);
        return XTJSONResult.ok(vo);
    }


    /* 1保存 0不保存 */
    @GetMapping("/showAll")
    public XTJSONResult getArticles(Integer page, Integer isSaveRecord, String desc,
                                    Integer typeCurrent, String userId) {

        System.out.println(desc + "&" + isSaveRecord);
        if (page == null) {
            page = 1;
        }
        if (isSaveRecord != null && isSaveRecord == 1 && desc != null && !"".equals(desc)) {
            SearchRecord record = new SearchRecord();
            record.setContent(desc);
            searchRecordMapper.insert(record);
        }
        IPage<ArticleVo> pageObject = new Page<>(page, 5);
        Page<ArticleVo> articles = articleMapperCustom.queryAllArticles2(pageObject, desc, typeCurrent, userId);
        return XTJSONResult.ok(articles);
    }

    @PostMapping("/uploadArticle")
    public XTJSONResult uploadArticle(String userId, String content) {
        Article a = new Article();
        a.setUserId(userId);
        a.setContent(content);
        a.setCreateTime(new Date());
        a.setCommentCount(0);
        a.setLikeCount(0);
        a.setType(1);
        a.setStatus(0);
        articleService.save(a);
        return XTJSONResult.ok(a.getId());
    }


    @PostMapping("/uploadTask")
    public XTJSONResult uploadTask(String userId, String content, Float price) {
        Article a = new Article();
        a.setUserId(userId);
        a.setContent(content);
        a.setCreateTime(new Date());
        a.setCommentCount(0);
        a.setPrice(price);
        a.setLikeCount(0);
        a.setType(2);
        a.setStatus(0);
        articleService.save(a);
        return XTJSONResult.ok(a.getId());
    }
}

