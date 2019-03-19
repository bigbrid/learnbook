# <font color=#0099ff><center>wamp搭建局域网web服务器</center></font>

## 下载wamp

下载wamp，next安装就好；

## 测试wamp

以管理员身份运行

wamp的图标会依次变色，红色——橙色——绿色，绿色为运行正常，其他颜色表示运行失败。

运行正常之后浏览器输入127.0.0.1进入服务器主页，主页正常即代表安装成功。

## 更改配置

打开安装目录

bin\apache\apache2.4.27\conf 

找到    httpd.conf  编辑器打开，搜索 Directory  下添加 **允许所有访问请求**  `Require all granted  `

更改如图：[了解参数详情](https://www.cnblogs.com/leoyu/p/apache24_use_require_for_access_control_by_ip_and_useragent.html)

```
<Directory />
    AllowOverride none  
    #Require all denied  
    Require all granted  
</Directory>
```

```
<Directory "${INSTALL_DIR}/www/">
    #
    # Possible values for the Options directive are "None", "All",
    # or any combination of:
    #   Indexes Includes FollowSymLinks SymLinksifOwnerMatch ExecCGI MultiViews
    #
    # Note that "MultiViews" must be named *explicitly* --- "Options All"
    # doesn't give it to you.
    #
    # The Options directive is both complicated and important.  Please see
    # http://httpd.apache.org/docs/2.4/mod/core.html#options
    # for more information.
    #
    Options +Indexes +FollowSymLinks +Multiviews

    #
    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    #   AllowOverride FileInfo AuthConfig Limit
    #
    AllowOverride all

    #
    # Controls who can get stuff from this server.
    #

#   onlineoffline tag - don't remove
    Require local
    Require all granted     
</Directory>
```



进入安装目录  bin\apache\apache2.4.27\conf \extra

找到  httpd-vhosts.conf 编辑器打开

```
<VirtualHost *:80>  //监听端口
  ServerName localhost  //这不用解释了
  ServerAlias 172.16.0.14   /电脑的IP
  DocumentRoot "${INSTALL_DIR}/www/7jing"   //网站根目录
  <Directory "${INSTALL_DIR}/www/7jing/">    //网站根目录
    Options +Indexes +Includes +FollowSymLinks +MultiViews
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

获取本机的ip

cmd > ipconfig 





