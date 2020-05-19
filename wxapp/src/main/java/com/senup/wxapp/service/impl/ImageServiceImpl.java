package com.senup.wxapp.service.impl;

import com.senup.wxapp.entity.Image;
import com.senup.wxapp.mapper.ImageMapper;
import com.senup.wxapp.service.IImageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 涛哥
 * @since 2020-05-04
 */
@Service
public class ImageServiceImpl extends ServiceImpl<ImageMapper, Image> implements IImageService {

}
