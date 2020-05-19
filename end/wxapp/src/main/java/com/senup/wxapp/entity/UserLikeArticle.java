package com.senup.wxapp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-17
 */

@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="UserLikeArticle对象", description="")
public class UserLikeArticle implements Serializable {

    private static final long serialVersionUID=1L;

    @ApiModelProperty(value = "自增主键")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "用户id")
    private String userId;

    @ApiModelProperty(value = "喜欢的文章id")
    private Integer articleId;

    @Override
    public String toString() {
        return "UserLikeArticle{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", articleId=" + articleId +
                '}';
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
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

    public Integer getArticleId() {
        return articleId;
    }

    public void setArticleId(Integer articleId) {
        this.articleId = articleId;
    }
}
