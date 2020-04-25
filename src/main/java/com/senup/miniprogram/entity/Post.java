package com.senup.miniprogram.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import java.io.Serializable;
import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author 涛哥
 * @since 2020-04-07
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="Post对象", description="")
public class Post implements Serializable {

    private static final long serialVersionUID=1L;

    @ApiModelProperty(value = "帖子id")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "发帖者id")
    private String fromId;

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


}
