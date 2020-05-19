package com.senup.wxapp.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * @author Administrator
 */
@RestController
public class BaseController {
    // 文件保存的命名空间
    public static final String FILE_SPACE = "D:/wxapp/";

    //访问域名
    public static final String DOMAIN_PRE = "http://localhost:8888/v1/";

    //学院名称
    public static final String[] COLLEGES = {"材料科学与工程学院", "化学与环境工程学院", "计算机与信息工程学院", "教育科学学院", "经济与管理学院", "烹饪与酒店管理学院", "食品工程与生物科技学院", "数学与统计学院", "体育学院", "陶瓷与非物质文化遗产传承学院", "文学与新闻传播学院",
            "外国语学院", "物理与电子工程学院", "音乐学院", "政法学院", "潮州师范分院"};

}

