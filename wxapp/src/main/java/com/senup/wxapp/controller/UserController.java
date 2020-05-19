package com.senup.wxapp.controller;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.senup.wxapp.entity.Article;
import com.senup.wxapp.entity.User;
import com.senup.wxapp.mapper.UserMapper;
import com.senup.wxapp.model.WXSessionModel;
import com.senup.wxapp.service.IArticleService;
import com.senup.wxapp.service.IUserService;
import com.senup.wxapp.utils.HttpClientUtil;
import com.senup.wxapp.utils.JsonUtils;
import com.senup.wxapp.utils.XTJSONResult;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-02
 */
@RestController
@RequestMapping("/v1/user")
public class UserController extends BaseController{
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private IUserService userService;
    @Autowired
    private IArticleService articleService;

    @GetMapping("/getGroup")
    public XTJSONResult getGroup(String id) {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("id", id);
        User res = userService.getOne(wrapper);
        return XTJSONResult.ok(res);
    }

    @GetMapping("/getPersonInfo")
    public XTJSONResult getPersonInfo(String userId) {
        //判断用户名不能为空
        if (StringUtils.isBlank(userId)) {
            return XTJSONResult.errorMsg("用户id不能为空，请重试！");
        }
        User user = userService.getById(userId);
        QueryWrapper<Article> postWrapper = new QueryWrapper<>();
        postWrapper.eq("type", 1).eq("user_id",userId);
        int post = articleService.count(postWrapper);
        QueryWrapper<Article> taskWrapper = new QueryWrapper<>();
        taskWrapper.eq("type", 2).eq("user_id",userId);
        int task = articleService.count(taskWrapper);
        Map<String, Object> res = new HashMap<>();
        res.put("post",post);
        res.put("task",task);
        res.put("user",user);
        return XTJSONResult.ok(res);
    }

    @PostMapping("/changeNickName")
    public XTJSONResult changeNickName(User user){
        User u = new User();
        u.setId(user.getId());
        u.setNickName(user.getNickName());
        userService.updateById(u);
        User userInfo = userService.getById(user.getId());
        return XTJSONResult.ok(userInfo);
    }

    @PostMapping("/changeCollege")
    public XTJSONResult changeCollege(User user,Integer index){
        System.out.println(index);
        System.out.println(COLLEGES[index]);
        User u = new User();
        u.setId(user.getId());
        u.setCollege(COLLEGES[index]);
        userService.updateById(u);
        User userInfo = userService.getById(user.getId());
        return XTJSONResult.ok(userInfo);
    }

    @PostMapping("/changeGrade")
    public XTJSONResult changeGrade(User user){
        User u = new User();
        u.setId(user.getId());
        u.setGrade(user.getGrade());
        userService.updateById(u);
        User userInfo = userService.getById(user.getId());
        return XTJSONResult.ok(userInfo);
    }



    @PostMapping("/changeIntro")
    public XTJSONResult changeIntro(User user){
        User u = new User();
        u.setId(user.getId());
        u.setIntro(user.getIntro());
        userService.updateById(u);
        User userInfo = userService.getById(user.getId());
        return XTJSONResult.ok(userInfo);
    }

    @PostMapping("/changeAvatar")
    public XTJSONResult uploadFace(String userId, @RequestParam("file") MultipartFile[] files) throws Exception {
        //判断用户名不能为空
        if (StringUtils.isBlank(userId)) {
            return XTJSONResult.errorMsg("用户id不能为空，请重试！");
        }
        //保存到数据库的相对路径
        String uploadPathDB = "/" + userId + "/avatar";
        //定义输入输出流
        InputStream inputStream = null;
        FileOutputStream fileOutputStream = null;
        try {
            if (files!=null && files.length>0){
                String filename = files[0].getOriginalFilename();
                String[] filenameTemp = filename.split("\\.");
                filename=filenameTemp[2]+"."+filenameTemp[3];
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
        //将用户ID和图片相对路径上传到数据库
        User u = new User();
        u.setId(userId);
        u.setAvatarUrl(uploadPathDB);
        userService.updateById(u);
        User userInfo = userService.getById(userId);
        return XTJSONResult.ok(userInfo);
    }

    @PostMapping("/userInfo")
    public XTJSONResult getUserInfo(String nickName,String avatarUrl,Integer gender,String code) throws Exception {
        WXSessionModel model = getOpenidAndSessionKey(code);
        String openid = model.getOpenid();
        User res = userMapper.selectById(openid);
        if(res !=null){
            return XTJSONResult.ok(res);
        }else{//第一次
            User user = new User();
            user.setId(openid);
            user.setNickName(nickName);
            user.setGender(gender);
            user.setCreateTime(new Date());
            user.setFansCounts(0);
            user.setFollowCounts(0);
            user.setReceiveLikeCounts(0);
            String s = saveAvatar(avatarUrl, openid);
            user.setAvatarUrl(s);
            userMapper.insert(user);
            return XTJSONResult.ok(user);
        }
    }

    private String saveAvatar(String imgUrl,String userId)throws Exception{
        //new一个URL对象
        URL url = new URL(imgUrl);
        //打开链接
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
        //设置请求方式为"GET"
        conn.setRequestMethod("GET");
        //超时响应时间为5秒
        conn.setConnectTimeout(5 * 1000);
        //通过输入流获取图片数据
        InputStream inStream = conn.getInputStream();
        //得到图片的二进制数据，以二进制封装得到数据，具有通用性
        byte[] data = readInputStream(inStream);
        //new一个文件对象用来保存图片，默认保存当前工程根目录
        //修改成保存到本地D盘，为此需要构建文件夹路径，同时把相对路径传到数据库
        //保存到数据库的相对路径
        String uploadPathDB = "/" + userId + "/avatar/default.jpg";
        //组装成最终路径
        String finalFacePath = FILE_SPACE + uploadPathDB ;
        //将路径写入文件对象imageFile
        File imageFile = new File(finalFacePath);
        //如果没有路径文件夹，则创建
        if (imageFile.getParentFile()!=null || !imageFile.getParentFile().isDirectory()){
            imageFile.getParentFile().mkdirs();
        }
        //创建输出流
        FileOutputStream outStream = new FileOutputStream(imageFile);
        //写入数据
        outStream.write(data);
        //关闭输出流
        outStream.close();
        return uploadPathDB;
    }

    public static byte[] readInputStream(InputStream inStream) throws Exception{
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        //创建一个Buffer字符串
        byte[] buffer = new byte[1024];
        //每次读取的字符串长度，如果为-1，代表全部读取完毕
        int len = 0;
        //使用一个输入流从buffer里把数据读取出来
        while( (len=inStream.read(buffer)) != -1 ){
            //用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
            outStream.write(buffer, 0, len);
        }
        //关闭输入流
        inStream.close();
        //把outStream里的数据写入内存
        return outStream.toByteArray();
    }

    private WXSessionModel getOpenidAndSessionKey (String code){
        System.out.println("wxlogin - code: " + code);
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String, String> param = new HashMap<>();
        param.put("appid", "wx387243e4ed500de2");
        param.put("secret", "58e9c62fa95ff008c7560175fa633693");
        param.put("js_code", code);
        param.put("grant_type", "authorization_code");
        String wxResult = HttpClientUtil.doGet(url, param);
        System.out.println(wxResult);
        WXSessionModel model = JsonUtils.jsonToPojo(wxResult, WXSessionModel.class);
        return model;
    }




}

