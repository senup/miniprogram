package com.senup.miniprogram.controller;
import	java.nio.file.attribute.BasicFileAttributeView;


import com.senup.miniprogram.entity.User;
import com.senup.miniprogram.service.IUserService;
import com.senup.miniprogram.utils.JSONResult;
import com.senup.miniprogram.utils.RedisOperator;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
 * @since 2020-03-31
 */
@RestController
@RequestMapping("/user")
public class UserController extends BaseController{

    @Autowired
    private IUserService userService;
    @Autowired
    private RedisOperator redis;


    @PostMapping("/updateNickName")
    public JSONResult updateNickName(User user){
        User u = new User();
        u.setId(user.getId());
        u.setNickName(user.getNickName());
        userService.updateById(u);
        return JSONResult.ok("更新成功！");
    }



    @PostMapping("/updateIntro")
    public JSONResult updateIntro(User user){
        User u = new User();
        u.setId(user.getId());
        u.setIntro(user.getIntro());
        userService.updateById(u);
        return JSONResult.ok("更新成功！");
    }



    @GetMapping("/queryUserInfo")
    public JSONResult queryUserInfo(String userId){
        User user = userService.getById(userId);
        return JSONResult.ok(user);
    }


    @PostMapping("/uploadFace")
    public JSONResult uploadFace(String userId, @RequestParam("file") MultipartFile[] files) throws Exception {
        //判断用户名不能为空
        if (StringUtils.isBlank(userId)) {
            return JSONResult.errorMsg("用户id不能为空，请重试！");
        }

        //文件保存的命名空间
//        String fileSpace = "D:/miniprogram";

        //保存到数据库的相对路径
        String uploadPathDB = "/" + userId + "/face";

        //定义输入输出流
        InputStream inputStream = null;
        FileOutputStream fileOutputStream = null;

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

        //将用户ID和图片相对路径上传到数据库
        User u = new User();
        u.setId(userId);
        u.setAvatarUrl(DOMAIN_PRE+uploadPathDB);
        userService.updateById(u);


        return JSONResult.ok(DOMAIN_PRE+uploadPathDB);

    }
}

