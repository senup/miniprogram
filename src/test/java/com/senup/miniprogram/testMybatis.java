package com.senup.miniprogram;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.senup.miniprogram.mapper.PostMapperCustom;
import com.senup.miniprogram.service.impl.PostServiceCustom;
import com.senup.miniprogram.utils.PagedResult;
import com.senup.miniprogram.vo.PostVo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
@RunWith(SpringRunner.class)
@SpringBootTest
public class testMybatis {
    @Autowired
    private PostMapperCustom postMapperCustom;
    @Autowired
    private PostServiceCustom postServiceCustom;
    @Test
    public void test1(){
        IPage<PostVo> page=new Page<>(2,5);
        Page<PostVo> postVoPage = postMapperCustom.queryPostDetail(page);
        System.out.println("hasNext="+postVoPage.hasNext());
        System.out.println("hasPrevious="+postVoPage.hasPrevious());
        System.out.println("getTotal="+postVoPage.getTotal());
        System.out.println("getCurrent="+postVoPage.getCurrent());
        System.out.println("getSize="+postVoPage.getSize());
//        System.out.println(postVoPage.getOrders());
        System.out.println("getPages="+postVoPage.getPages());
//        System.out.println(postVoPage.getClass());
        List<PostVo> records = postVoPage.getRecords();
        for (PostVo v:records) {
            System.out.println(v.toString());
            
        }
    }


    @Test
    public void test2(){
        QueryWrapper wrapper = Wrappers.<PostVo>query();
        Page<PostVo> page = postServiceCustom.testpage(new Page<>(1,10), wrapper);
//        System.out.println("hasNext="+page.hasNext());
//        System.out.println("hasPrevious="+page.hasPrevious());
//        System.out.println("getTotal="+page.getTotal());
//        System.out.println("getCurrent="+page.getCurrent());
//        System.out.println("getSize="+page.getSize());
        List<PostVo> records = page.getRecords();
        for (PostVo v:records) {
            System.out.println(v.toString());

        }
    }


    @Test
    public void test3(){
        PagedResult posts = postServiceCustom.getAllPosts(1, 5);
        System.out.println(posts.toString());
        System.out.println(posts.getRows());
    }
}
