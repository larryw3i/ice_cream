# ice_cream.js
## 使用 ice_cream.js 去生成测试题目 !
#### [English](../README.md) | 简体中文

#### 项目

> 去看 [ice_cream.js 格式](../format.example)  

> 去看 [ice_cream,js](../ice_cream.js)  

> 去看 [demo.html](../test/demo.html)    

#### 自己动手

```bash

git clone https://github.com/larryw3i/ice_cream.git
cd ice_cream/test/
firefox demo.html # 或者双击 demo.html 文件

```



```javascript
/** 
   * 预览测试题目.
   * @param {String} exam_text  测试题目的原文本.
   * @param {String} target 指定一个元素去放置预览内容.
   */
function preview( exam_text ,target ){}
```

```javascript
/**
  * 获取作答的答案, 它像:  [{1:'T'},{2:'F'}]
  * @returns { Array } 
  */
function get_answers(){}
```

#### 以 [LGPL v3.0](../LICENSE) 授权