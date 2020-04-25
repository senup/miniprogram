package com.senup.miniprogram.vo;

import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author 涛哥
 * @since 2020-03-31
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="User对象", description="")
public class UserVo implements Serializable {

    private static final long serialVersionUID=1L;

    @ApiModelProperty(value = "openid 用户的唯一标识")
    private String id;

    @ApiModelProperty(value = "用户昵称")
    @TableField("nickname")
    private String nickName;

    @ApiModelProperty(value = "用户token")
    private String userToken;

    @ApiModelProperty(value = "头像链接")
    private String avatarUrl;

    @ApiModelProperty(value = "关注数")
    private Integer followCounts;

    @ApiModelProperty(value = "粉丝数")
    private Integer fansCounts;

    @ApiModelProperty(value = "用户获得的总赞数")
    private Integer receiveLikeCounts;

    @ApiModelProperty(value = "用户注册时间")
    private Date createTime;

    @ApiModelProperty(value = "用户性别")
    private Integer gender;

    @ApiModelProperty(value = "用户入学年份")
    private String grade;

    @ApiModelProperty(value = "用户个性签名")
    private String intro;

}
