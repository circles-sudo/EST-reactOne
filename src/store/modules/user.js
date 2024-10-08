// 和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit"
import request from "@/utils/request"

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: ''
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    }
  }
})

  // 异步方法 完成登录获取token
  const fetchLogin = (loginForm)=>{
    return async(dispatch) =>{
      // 1.发送异步请求 
      const res = await request.post('/authorizations',loginForm)
      // 2. 提交同步action进行token的存入   将拿到的数据存进数据状态里面的token
      dispatch(setToken(res.data.token))
    }
  }

// 解构出actionCreater
const { setToken } = userStore.actions

// 获取reducer 函数
const userReducer = userStore.reducer

export { fetchLogin, setToken }

export default userReducer  