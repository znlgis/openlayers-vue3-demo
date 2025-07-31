/**
 * Vite构建配置文件
 * 配置Vue3开发环境和GeoServer代理设置
 */

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import base64 from 'base-64'

// GeoServer认证配置
const AUTH = {user: "admin", pass: "geoserver"};
// 将认证信息编码为Base64格式
const AUTH_BASE64 = base64.encode(`${AUTH.user}:${AUTH.pass}`);

export default defineConfig({
    // 配置Vue插件
    plugins: [vue()],
    
    // 开发服务器配置
    server: {
        // 配置代理，将/geoserver路径代理到本地GeoServer实例
        proxy: {
            "/geoserver": {
                // 目标GeoServer服务器地址
                target: "http://127.0.0.1:8765/geoserver",
                
                // 设置请求头，包含认证信息
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Basic ${AUTH_BASE64}`,
                },
                
                // 改变源地址
                changeOrigin: true,
                
                // 重写路径，移除/geoserver前缀
                rewrite: (path) => path.replace(/^\/geoserver/, ""),
            },
        },
    },
})
