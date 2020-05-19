//package com.senup.wxapp;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.InputStream;
//import java.io.OutputStream;
//import java.net.URL;
//import java.net.URLConnection;
//
//
//public class DownloadImage {
//
//    /**
//     * @param args
//     * @throws Exception
//     */
//    public static void main(String[] args) throws Exception {
//        // TODO Auto-generated method stub
//        download("http://avatar.csdn.net/1/3/B/1_li1325169021.jpg", "1_li1325169021.jpg", "d:\\image\\");
//    }
//
//    public static void download(String urlString, String filename, String savePath) throws Exception {
//        // 构造URL
//        URL url = new URL(urlString);
//        // 打开连接
//        URLConnection con = url.openConnection();
//        //设置请求超时为5s
//        con.setConnectTimeout(5 * 1000);
//        // 输入流
//        InputStream is = con.getInputStream();
//
//        // 1K的数据缓冲
//        byte[] bs = new byte[1024];
//        // 读取到的数据长度
//        int len;
//        // 输出的文件流
//        File sf = new File(savePath);
//        if (!sf.exists()) {
//            sf.mkdirs();
//        }
//        // 获取图片的扩展名
//        String extensionName = filename.substring(filename.lastIndexOf(".") + 1);
//        // 新的图片文件名 = 编号 +"."图片扩展名
//        String newFileName = goods.getProductId() + "." + extensionName;
//        OutputStream os = new FileOutputStream(sf.getPath() + "\\" + filename);
//        // 开始读取
//        while ((len = is.read(bs)) != -1) {
//            os.write(bs, 0, len);
//        }
//        // 完毕，关闭所有链接
//        os.close();
//        is.close();
//    }
//
//}