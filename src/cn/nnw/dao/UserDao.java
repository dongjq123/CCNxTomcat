package cn.nnw.dao;

import cn.nnw.domain.User;

public interface UserDao {

	public abstract void add(User user);

	public abstract User find(String username, String password);

	//查找注册的用户是否在数据库中存在
	public abstract boolean find(String username);

}