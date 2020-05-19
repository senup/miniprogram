package com.senup.wxapp.controller;


import com.senup.wxapp.entity.Report;
import com.senup.wxapp.service.IReportService;
import com.senup.wxapp.utils.XTJSONResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-19
 */
@RestController
@RequestMapping("/v1/report")
public class ReportController {
    @Autowired
    private IReportService reportService;

    @PostMapping("/reportArticle")
    public XTJSONResult reportArticle( Report report){
        System.out.println(report);
        report.setCreateTime(new Date());
        report.setStatus(0);
        reportService.save(report);
        return XTJSONResult.ok("举报成功~");
    }

}

