#  <font color=#0099ff><center>分布式版本控制系统</center></font>

写项目总会面临改来改去或者多人同时做一个项目，做一些大型项目，总不能像之前一样，每次修改之后复制一份之前的包，以备还原，这个时候就要用到版本控制系统了。

目前有两大主流的版本控制系统

- 集中式版本控制系统，其代表就是SVN；
- 分布式版本控制系统，其代表就是Git；

作为一个coder，不会使用Git，那真是一件太糟糕的事情啦！

开足火力，攻下Git,合理的管理项目吧！

官方地址：[Git官网](https://git-scm.com/)



## 什么是Git

Git是一个开源的分布式版本控制系统，开发Git的哥们说，Git就是一个傻瓜式跟踪器；这估计是对Git最简单粗暴的定义了；这里就不在罗列Git的定义，发展，优缺点之类的了，网上随处可见。

既然是跟踪器，那么就是文件的修改，删除，新增都在Git上清晰可见，随时可以切换到之前的版本；

比如：<u>周一写了一天的代码，提交运行之后没什么事情，周二去忙的别的了，周三产品经理让修改来了一大堆，你提交之后，放到线上跑了一天，周五的时候产品经理告诉你，要恢复到周一的版本，如果都没有备份之前的代码，这改起来是不是头很大。</u>那么用Git就能简单，快速的恢复到之前版本；对于项目每次的改动的，利用Git来跟踪，让Git帮我们记住每次改动的地方，随时知道是谁在哪个地方改动了项目，随时跟踪项目的版本进度。

## 运行原理

简单的理解，就是在你存放项目的目录下建立一个叫.git的目录，用于存放项目的各个版本，这个叫版本库；

版本库的父目录就是一个git仓库，**注意：父目录名不要是中文，否则会有莫名其妙的问题；**

版本库里有暂存区和分支；

暂存区 就是暂时把要提交的文件放在这里。

分支可以建立多个分支，Git默认有一个master分支，也可以理解为主分支；你也可以建立一个新的分支，项目经过多次的修改后没问题，最后合并到主分支上；

这样，版本库里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

![](https://ulvoe.com/Learning/book/es6/images/git1.jpg)

## 基本方法

### 下载安装

这个就不多说了，安装有有很多自定义配置，需要了解的[请点击](https://github.com/xiezongnan/Summarize/blob/master/git/Git_Setup.md)。

### 基本信息设置

**用户名**

```
git config --global user.name "你的en名字"
```



**邮箱**

```
git config --blobal user.email "你的邮箱"
```

这里的名字和邮箱可以随便取，但是如果要把本地仓库推送至远程仓库，远程仓库就会显示你的用户名；

参数--blobal是一个全局的意思，就是在本台机器上你的所有Git仓库都会使用这个配置。当然，也可以对某个仓库进行不同的配置。



**查看配置列表**

```
git config -l
```



**查看具体配置**

```
git config <key>
```

key指具体的某一项配置，比如查看用户名：

```
git config user.name
```



### 创建仓库

```
git init
```



### 添加到暂存区

把工作区的文件添加到暂存区，就跟你去排队一样，添加暂存区就等与抽着号了，没添加到暂存区的就跟排队就像排野队一样，哎，小王来了，排队啊，来站我前面。

**添加文件**

```
git add "文件名"
```

**添加被修改文件和新增文件，但不包括删除文件**

```
git add .
```

**添加被修改和删除文件，但不包括新增文件**

```
git add -u
```

-u这个是--update的缩写

**添加所有文件**

```
git add -A
```

-A这个是--all的缩写

**查看参数**

```
git add -h 
```

*其他命令也可以使用此方法查看详细文档*

**查看官方说明**

```
git add --help
```

*其他命令也可以使用此方法查看详细文档*



### 查看工作区状态

查看工作区和暂存区有没有文件需要提交到版本库

```
git status
```

可以看到工作区还有那些文件没有被添加到暂存区；

当然也可以给一个 -s参数，这样就能直观的文件的状态简览；

```
git status -s
```

**状态码**

- A: 你本地新增的文件（服务器上没有）

- C: 文件的一个新拷贝

- D: 你本地删除的文件（服务器上还在）

- M: 文件的内容或者被修改了

- R: 文件名被修改了

- T: 文件的类型被修改了

- U: 文件没有被合并(你需要完成合并才能进行提交)

- X: 未知状态

- ？：未被git进行管理

  

### 查看修改内容

```
git diff
```



### 提交到版本库

从暂存区提交到版本库，这个时候是用status检查，工作区就是干净的；

```
git commit -m"修改说明"
```

修改说明这里只能是英文，英文不好，过段时间就忘了，我想用中文，可以这样

```
git commit -m"en:中文"
```



### 查看日志

一个项目总要经历千改万改，提交那么多次，修改增减的记不住啊，查看提交日志，就知要回到哪一次提交；

```
git log
```



### 版本回退

查看提交日志，获取版本号，然后用下面指令回到我要需要的版本

```
git reset --hard "版本号"
```

*这里的版本号指使用查看日志命令之后，输出的commit -id,这是一个很长的数字，不必要全部输入，只需输入开头几个，Git就会自动帮我们识别*

**原理**

![](https://ulvoe.com/Learning/book/es6/images/git_5.png)

**看你个例子：**

第一次提交

![](https://ulvoe.com/Learning/book/es6/images/git_1.png)

第二次提交

![](https://ulvoe.com/Learning/book/es6/images/git_2.png)

第三次提交

![](https://ulvoe.com/Learning/book/es6/images/git_3.png)

实现回退

![](https://ulvoe.com/Learning/book/es6/images/git_4.png)

这样就可以随时回退版本了；

**<font color="red">但是<font>**，如果你回退到版本一之后，在版本一上进行修改，又想回到版本三了，那么这时候查看日志就会发下版本一之后的版本都没有了；

![](https://ulvoe.com/Learning/book/es6/images/git_6.png)

额额额，那怎么搞，这不就像，我穿越到2005年亲了初恋小妹妹一下下，就回不到2019年了！！

别慌，要是真回不去了还是Git吗。

**查看命令记录**

Git帮我们记录了每次的提交，使用它查看，找到需要的的版本号。

```
git reflog
```

又回到了版本三

![](https://ulvoe.com/Learning/book/es6/images/git_7.png)

### 撤销与修改

这里有两种情况

1. 工作区已经修改的面目全非了，一片狼藉了，你想回退到修改前的版本

   **丢弃工作区修改**

   ```
   git checkout 
   ```

   ![](https://ulvoe.com/Learning/book/es6/images/git_8.png)

   面目全非和一片狼藉不见了，我们的版本三回来了。

2. 已经把这份面目全非，一片狼藉的版本添加到暂存区了

   **暂存区撤销到工作区**

   ```
   git reset HEAD	
   ```

   ![](https://ulvoe.com/Learning/book/es6/images/git_9.png)

   暂存区的文件已经被撤销到工作区，然后丢弃工作区的修改，就回退到我们的版本三；

### 删除文件

手动删除或者用下面命令

```
git rm
```

但是，手动或者命令删除文件周之后，只是工作区的文件被删除了，如果要同步到版本库使用commit提交到版本库里，这样才能保持一致。

提交到版本库之后，删错或者误删文件，丢弃工作区的修改，可以找到误删文件；

如果没有提交到版本库，删错或者误删文件，那么只能恢复最新版本，这样会丢失最近一次的修改内容；

## 分支管理
