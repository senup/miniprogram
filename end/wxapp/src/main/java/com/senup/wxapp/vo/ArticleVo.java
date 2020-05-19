package com.senup.wxapp.vo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.senup.wxapp.entity.Image;
import com.senup.wxapp.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * <p>
 * 
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-04
 */

@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="Article对象", description="")
public class ArticleVo implements Serializable {

    private static final long serialVersionUID=1L;

    @ApiModelProperty(value = "帖子id")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private User user;

    private List<Image> images;

    private List<CommentVo> comments;


    @ApiModelProperty(value = "发帖者id")
    private String userId;

    @ApiModelProperty(value = "帖子内容")
    private String content;

    @ApiModelProperty(value = "创建时间")
    private Date createTime;

    @ApiModelProperty(value = "获赞数")
    private Integer likeCount;

    @ApiModelProperty(value = "帖子状态")
    private Integer status;

    @ApiModelProperty(value = "评论数")
    private Integer commentCount;

    @ApiModelProperty(value = "帖子类型是动态还是任务")
    private Integer type;

    @ApiModelProperty(value = "赏金")
    private Float price;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Float getPrice() {
        return price;
    }

    public List<CommentVo> getComments() {
        return comments;
    }

    public void setComments(List<CommentVo> comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "ArticleVo{" +
                "id=" + id +
                ", user=" + user +
                ", images=" + images +
                ", comments=" + comments +
                ", userId='" + userId + '\'' +
                ", content='" + content + '\'' +
                ", createTime=" + createTime +
                ", likeCount=" + likeCount +
                ", status=" + status +
                ", commentCount=" + commentCount +
                ", type=" + type +
                ", price=" + price +
                '}';
    }

    public void setPrice(Float price) {
        this.price = price;
    }
}
