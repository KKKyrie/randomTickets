# 佛系买票

### 简要说明
符合常规小程序的项目结构。  
其中，```util/```文件夹为工具函数，包含了**随机生成座位序号**和**根据座位序号查询具体位置**的算法。
  
### 解决方案
基于**JavaScript对象是天然的hash结构**这一特性，将已选择的座位序号作为```key```, ```true```作为```value```存入一对象中，下次在进行随机操作时检测到新生成序号作为```key```时在该对象中的```value```是否为```true```即可。  

#### 其他方案
##### 数组存储
可以实现，但会增大空间复杂度以及查重时的时间复杂度。  
##### Map存储
用生成座位的一对坐标形如```[x,y]```作 Map 中每一项的```key```，```boolean```值作```value```进行存储。看似合理，深究发现，```javascript```中的```Map```，
当用对象作为```key```时，会以**内存地址是否相同**作为判别```key```相同的依据，所以在给定的场景下，```Map```并不适用于作存储容器。  
  
### 数据存储方案
借助小程序```setStorageSync/getStorageSync```的本地数据持久化存储方案，将已购买的票（已预定的座位）保存在Storage中。  
  
##### Todo
- 本地数据清空功能