//package com.senup.wxapp;
//
//import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
//import com.baomidou.mybatisplus.core.metadata.IPage;
//import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
//import com.senup.wxapp.entity.SearchRecord;
//import com.senup.wxapp.mapper.ArticleMapperCustom;
//import com.senup.wxapp.mapper.SearchRecordMapper;
//import com.senup.wxapp.vo.ArticleVo;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.List;
//import java.util.UUID;
//
//@SpringBootTest
//public class MyTest {
//    @Autowired
//    private ArticleMapperCustom articleMapperCustom;
//    @Autowired
//    private SearchRecordMapper searchRecordMapper;
//
//    @Test
//    public void testArticleDetails() {
//        IPage<ArticleVo> page=new Page<>(1,5);
//        Page<ArticleVo> postVoPage = articleMapperCustom.queryAllArticles(page);
//        List<ArticleVo> records = postVoPage.getRecords();
//        for (ArticleVo a:records
//             ) {
//            System.out.println(a);
//        }
//    }
//
//
//    @Test
//    public void testArticleDetails2() {
//        IPage<ArticleVo> page=new Page<>(1,5);
//        Page<ArticleVo> postVoPage = articleMapperCustom.queryAllArticles2(page,"ha",0);
//        List<ArticleVo> records = postVoPage.getRecords();
//        for (ArticleVo a:records
//        ) {
//            System.out.println(a);
//        }
//    }
//
//    @Test
//    public void test1(){
//        for (int i = 0; i < 10; i++) {
//            String s = UUID.randomUUID().toString().replace("-","");
//            System.out.println(s);
//        }
//    }
//
//
//    @Test
//    public void testSearchRecords() {
//        QueryWrapper<SearchRecord> wrapper = new QueryWrapper<>();
//        wrapper.groupBy("content").orderByDesc("count(content)");
//        List<SearchRecord> list = searchRecordMapper.selectList(wrapper);
//        for (SearchRecord s:list
//             ) {
//            System.out.println(s);
//        }
//    }
//
//
//    @Test
//    public void test2(){
////        String sb = "53285964@qq.com";
////        String str = sb.substring(0, sb.indexOf("@"));
////        System.out.println(str);
//
//        String s = new String("wx387243e4ed500de2.o6zAJs0R6lbXol-g7lISBt2w4qlo.QvGvuqmDF9Y3a16a0aed6bc6a6e37a0d3ea8ad69bd34.jpg");
//        String a []= s.split("\\.");
//        String s1 = a[2]+"."+a[3];
//        System.out.println(s1);
//
//
//    }
//
//
//
//
//
//
//
//
//}
