package com.senup.wxapp.vo;

/**
 * @author Administrator
 */

public class UserVo {
    private String nickName;
    private Integer gender;
    private String avatarUrl;
    private String city;
    private String country;
    private String province;

    @Override
    public String toString() {
        return "UserVo{" +
                "nickName='" + nickName + '\'' +
                ", gender=" + gender +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", province='" + province + '\'' +
                '}';
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }
}
