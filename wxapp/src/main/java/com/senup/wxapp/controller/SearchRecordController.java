package com.senup.wxapp.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.senup.wxapp.entity.SearchRecord;
import com.senup.wxapp.mapper.SearchRecordMapper;
import com.senup.wxapp.service.ISearchRecordService;
import com.senup.wxapp.utils.XTJSONResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-08
 */
@RestController
@RequestMapping("/v1/search")
public class SearchRecordController {
    @Autowired
    private ISearchRecordService searchRecordService;

    //查询热搜词：根据内容分组倒序
    @GetMapping("/hotRecords")
    public XTJSONResult hotRecords() {
        QueryWrapper<SearchRecord> wrapper = new QueryWrapper<>();
        wrapper.groupBy("content").orderByDesc("count(content)");
        List<SearchRecord> list = searchRecordService.list(wrapper);
        ArrayList<String> res = new ArrayList<>();
        for (SearchRecord l:list
             ) {
            res.add(l.getContent());
        }
        return XTJSONResult.ok(res);
    }



}

