package com.senup.miniprogram.controller;


import com.senup.miniprogram.entity.Img;
import com.senup.miniprogram.service.IImgService;
import com.senup.miniprogram.utils.JSONResult;
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
 *  前端控制器
 * </p>
 *
 * @author 涛哥
 * @since 2020-04-07
 */
@RestController
@RequestMapping("/img")
public class ImgController extends  BaseController{

    @Autowired
    private IImgService imgService;

    /*
    上传图片到本地并保存数据库
     */
    @PostMapping("/uploadPic")
    public JSONResult uploadPic(String userId,Integer postId,@RequestParam("file") MultipartFile[] files)throws Exception{
        //判断用户名不能为空
        if (StringUtils.isBlank(userId)) {
            return JSONResult.errorMsg("用户id不能为空，请重试！");
        }
        if(postId==null){
            return JSONResult.errorMsg("帖子id不能为空，请重试！");
        }

        //定义输入输出流
        InputStream inputStream = null;
        FileOutputStream fileOutputStream = null;

        //保存到数据库的相对路径
        String uploadPathDB = "/" + userId + "/post"+"/"+postId;

        try {
            if (files!=null && files.length>0){
                String filename = files[0].getOriginalFilename();
                if (StringUtils.isNotBlank(filename)){
                    //组装成最终路径
                    String finalFacePath = FILE_SPACE + uploadPathDB + "/" + filename;
                    //数据库的相对路径
                    uploadPathDB+=("/"+filename);
                    //将路径写入文件对象outfile
                    File outfile = new File(finalFacePath);
                    //如果没有路径文件夹，则创建
                    if (outfile.getParentFile()!=null || !outfile.getParentFile().isDirectory()){
                        outfile.getParentFile().mkdirs();
                    }
                    //将文件对象outfile写入输出流
                    fileOutputStream = new FileOutputStream(outfile);
                    //初始化输入流
                    inputStream = files[0].getInputStream();
                    //复制属性
                    IOUtils.copy(inputStream, fileOutputStream);
                }
            }else {
                return JSONResult.errorMsg("上传失败！");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return JSONResult.errorMsg("上传失败！");
        } finally {
            //关闭流
            if (fileOutputStream != null) {
                fileOutputStream.flush();
                fileOutputStream.close();
            }
        }

        Img img = new Img();
        img.setPostId(postId);
        img.setImgPath(uploadPathDB);
        imgService.save(img);
        return JSONResult.ok();
    }






}

