### ui 组件
#### 输入过滤框组件
> 使用：
```
<sys-search-input
    form-key="ghks"
    data="departments"
    active-data="departmentsActive" 
    is-open="true"                  
    is-require="true"
    search-value="filterInput.department"
    placeholder="输入..."
></sys-search-input>
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
is-open: (attrs)
初始化时是否处于开启状态
数据类型： boolean
缺省值： false
``` 
``` 
is-require: (attrs)
是否为必选项
数据类型： boolean
缺省值： false
``` 
```
search-value: (scope)
搜索框绑定的值
数据类型: string
缺省值: ''
```
```
placeholder: (attrs)
输入框的提示文字（ IE >8 ）
数据类型：string
缺省值: ''
```
