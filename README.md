# fed-cli
通用脚手架工具

## Usage

### 安装
``` npm i cofe-cli -g ```

### 初始化项目

``` fed init project-name ```

会被提示选择一种项目模版，选择后会在执行命令当前目录 生成一个新项目

### 模版库

现有模版库有 vue单页项目， vue多页项目，react单页项目， react多页项目

#### 定制自己的模版

如果目前现有模版苦无法满足你的需求，可以自己定义模版，脚手架依然通用

##### 配置脚手架

``` fed config tempalte-name template-git-url ```

##### 自定义模版规则

1. 模版语言
2. 非 npm 项目，请自行安装相关包和启动项目

### help

``` fed / fed -h ```

## 开发运行

``` npm link ```


