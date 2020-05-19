package com.senup.wxapp.controller;


import com.senup.wxapp.entity.Image;
import com.senup.wxapp.service.IImageService;
import com.senup.wxapp.utils.XTJSONResult;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-04
 */
@RestController
@RequestMapping("/v1/image")
public class ImageController extends BaseController {

    @Autowired
    private IImageService imageService;

    @PostMapping("/uploadPic")
    public XTJSONResult uploadPic(String userId, Integer artId, @RequestParam("file") MultipartFile[] files) throws Exception {
        //判断用户名不能为空
        if (StringUtils.isBlank(userId)) {
            return XTJSONResult.errorMsg("用户id不能为空，请重试！");
        }
        if (artId == null) {
            return XTJSONResult.errorMsg("帖子id不能为空，请重试！");
        }

        //定义输入输出流
        InputStream inputStream = null;
        FileOutputStream fileOutputStream = null;

        //保存到数据库的相对路径
        String uploadPathDB = "/" + userId + "/article" + "/" + artId;

        try {
            if (files != null && files.length > 0) {
                String filename = files[0].getOriginalFilename();
                String[] filenameTemp = filename.split("\\.");
                filename = filenameTemp[2] + "." + filenameTemp[3];
                if (StringUtils.isNotBlank(filename)) {
                    //组装成最终路径
                    String finalFacePath = FILE_SPACE + uploadPathDB + "/" + filename;
                    //数据库的相对路径
                    uploadPathDB += ("/" + filename);
                    //将路径写入文件对象outfile
                    File outfile = new File(finalFacePath);
                    //如果没有路径文件夹，则创建
                    if (outfile.getParentFile() != null || !outfile.getParentFile().isDirectory()) {
                        outfile.getParentFile().mkdirs();
                    }
                    //将文件对象outfile写入输出流
                    fileOutputStream = new FileOutputStream(outfile);
                    //初始化输入流
                    inputStream = files[0].getInputStream();
                    //复制属性
                    IOUtils.copy(inputStream, fileOutputStream);
                }
            } else {
                return XTJSONResult.errorMsg("上传失败！");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return XTJSONResult.errorMsg("上传失败！");
        } finally {
            //关闭流
            if (fileOutputStream != null) {
                fileOutputStream.flush();
                fileOutputStream.close();
            }
        }

        Image i = new Image();
        i.setArtId(artId);
        i.setImgPath(uploadPathDB);
        imageService.save(i);
        return XTJSONResult.ok();
    }

}

