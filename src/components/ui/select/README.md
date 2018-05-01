### ui 组件
#### 下拉框组件
> 使用：
```
<sys-select
    form-key="ghlb"
    data="level"
    is-require="true"
    active-data="levelActive"
></sys-select>
```    
> 参数说明：
```    
form-key: (attrs)
控件标识，用于和 keyup.directive 配合, 需唯一
数据类型： 字符串
缺省值： ''
```

```    
data: (scope)
双向绑定数据列表
数据类型：数组
缺省值： []
```    
``` 
active-data: (scope)
双向绑定选中数据
数据类型：object
缺省值： {}
``` 
``` 
is-require: (attrs)
是否为必选项
数据类型： boolean
缺省值： false
``` 
