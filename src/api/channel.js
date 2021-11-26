// 频道
import request from '@/utils/request.js'

// 获取用户频道列表
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
