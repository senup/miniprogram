package com.senup.miniprogram.vo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.senup.miniprogram.entity.Img;
import com.senup.miniprogram.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
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
 * @since 2020-04-08
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="Post对象", description="")
public class PostVo implements Serializable {

    private static final long serialVersionUID=1L;

    @ApiModelProperty(value = "帖子id")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    //添加图片集
    private List<Img> imgs;

    //用户 信息
    private User user;

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

    @ApiModelProperty(value = "帖子类型")
    private Integer type;

    @ApiModelProperty(value = "酬金")
    private float price;

}
