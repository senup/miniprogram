package com.senup.miniprogram.controller;

import com.senup.miniprogram.entity.User;
import com.senup.miniprogram.model.WXSessionModel;
import com.senup.miniprogram.service.IUserService;
import com.senup.miniprogram.utils.HttpClientUtil;
import com.senup.miniprogram.utils.JSONResult;
import com.senup.miniprogram.utils.JsonUtils;
import com.senup.miniprogram.utils.RedisOperator;
import com.senup.miniprogram.vo.UserVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;



@RestController
public class WXLoginController {
	
	@Autowired
	private RedisOperator redis;
	@Autowired
	private IUserService userService;
	

	@PostMapping("/wxLogin")
	public JSONResult wxLogin(String nickName,Integer gender,String avatarUrl, String code) {
		

		//授权
		String url = "https://api.weixin.qq.com/sns/jscode2session";
		Map<String, String> param = new HashMap<>();
		param.put("appid", "wx387243e4ed500de2");
		param.put("secret", "a6d13029a88bc88776eec50c037f7b35");
		param.put("js_code", code);
		param.put("grant_type", "authorization_code");
		String wxResult = HttpClientUtil.doGet(url, param);
		//得到openid&sessionKey
		WXSessionModel model = JsonUtils.jsonToPojo(wxResult, WXSessionModel.class);
		User isExist = userService.getById(model.getOpenid());
		if(isExist==null ){//未注册
			//初始化
			User u = new User();
			u.setId(model.getOpenid());
			u.setNickName(nickName);
			u.setGender(gender);
			u.setAvatarUrl(avatarUrl);
			u.setFansCounts(0);
			u.setFollowCounts(0);
			u.setReceiveLikeCounts(0);
			u.setCreateTime(new Date());
			userService.save(u);
			UserVo userVo1 = setUserRedisSessionToken(u, model);
			return JSONResult.ok(userVo1);
		}else {//已注册
			UserVo userVo2 = setUserRedisSessionToken(isExist, model);
			return JSONResult.ok(userVo2);
		}
	}


	public UserVo setUserRedisSessionToken(User user,WXSessionModel wxSessionModel){
		// 存入session到redis
		redis.set("user-redis-session:" + wxSessionModel.getOpenid(),
				wxSessionModel.getSession_key(),
				1000 * 60 * 30);
		UserVo userVo = new UserVo();
		userVo.setUserToken(wxSessionModel.getSession_key());
		BeanUtils.copyProperties(user,userVo);
		return userVo;
	}


	@PostMapping("/logout")
	public JSONResult logout(String userId) {
		redis.del("user-redis-session:"+userId);
		return JSONResult.ok("注销成功~");
	}
}

