package cn.geoffwo.order.service;

import cn.geoffwo.order.mapper.OrderMapper;
import cn.geoffwo.order.pojo.Order;
import cn.geoffwo.order.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private RestTemplate restTemplate;

    public Order queryOrderById(Long orderId) {
        // 1.查询订单
        Order order = orderMapper.findById(orderId);

        //2.利用RestTemplate发起http请求，查询用户
        //2.1 url路径
//        String url = "http://localhost:8081/user/"+order.getUserId();
        String url = "http://user-service/user/"+order.getUserId();
        //2.2 发送http请求，实现调用
        //getForObject get请求
        // 第一个参数，指定请求路径，
        // [第二个参数]指定返回类型（默认json）
        User user = restTemplate.getForObject(url, User.class);

        // 使用RestTemplate发送POST请求，并期望返回一个User对象
        // [第二个参数] 是 请求体 RequestBody
//        User createdUser = restTemplate.postForObject(url, user, User.class);

        order.setUser(user);
        // 4.返回
        return order;
    }
}
