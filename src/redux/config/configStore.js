import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {},
  devTools: process.env.BASE_URL !== 'production', // 개발 환경에서만 Redux DevTools를 활성화
})

export default store
