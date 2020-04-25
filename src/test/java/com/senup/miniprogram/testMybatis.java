package com.senup.miniprogram;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.senup.miniprogram.mapper.PostMapperCustom;
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
    @Test
    public void test1(){
        IPage<PostVo> page=new Page<>(1,2);
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
}
