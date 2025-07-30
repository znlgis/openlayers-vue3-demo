/**
 * GeoServer服务器信息API类
 * 提供对GeoServer服务器状态、版本、系统信息等的REST API访问
 * 
 * 主要功能：
 * - 获取服务器清单信息
 * - 获取服务器状态
 * - 获取系统状态
 * - 获取版本信息
 */

import axios from "axios";

export default class About {
    
    /**
     * 获取GeoServer的清单信息
     * 包含已安装的模块、JAR包等详细信息
     * 
     * @returns {Promise<Object>} 包含清单信息的响应数据
     * @throws {Error} 当请求失败或响应状态非200时抛出错误
     * 
     * @example
     * const manifest = await aboutApi.getManifest();
     * console.log(manifest); // 清单详细信息
     */
    async getManifest() {
        try {
            // 发送GET请求获取服务器清单信息
            const response = await axios.get('/geoserver/rest/about/manifest');
            
            // 检查响应状态
            if (response.status === 200) {
                return response.data;
            } else {
                // 记录非200状态的响应
                console.err(JSON.stringify(response));
            }
        } catch (error) {
            // 记录并重新抛出错误
            console.err(error);
            throw error;
        }
    }

    /**
     * 获取GeoServer的运行状态信息
     * 包含服务器运行时的基本状态信息
     * 
     * @returns {Promise<Object>} 包含状态信息的响应数据
     * @throws {Error} 当请求失败或响应状态非200时抛出错误
     * 
     * @example
     * const status = await aboutApi.getStatus();
     * console.log(status); // 服务器状态信息
     */
    async getStatus() {
        try {
            // 发送GET请求获取服务器状态
            const response = await axios.get('/geoserver/rest/about/status');
            
            // 检查响应状态
            if (response.status === 200) {
                return response.data;
            } else {
                // 记录非200状态的响应
                console.err(JSON.stringify(response));
            }
        } catch (error) {
            // 记录并重新抛出错误
            console.err(error);
            throw error;
        }
    };

    /**
     * 获取GeoServer的系统状态信息
     * 包含更详细的系统运行状态，如内存使用、线程等
     * 
     * @returns {Promise<Object>} 包含系统状态信息的响应数据
     * @throws {Error} 当请求失败或响应状态非200时抛出错误
     * 
     * @example
     * const systemStatus = await aboutApi.getSystemStatus();
     * console.log(systemStatus); // 系统详细状态
     */
    async getSystemStatus() {
        try {
            // 发送GET请求获取系统状态
            const response = await axios.get('/geoserver/rest/about/system-status');
            
            // 检查响应状态
            if (response.status === 200) {
                return response.data;
            } else {
                // 记录非200状态的响应
                console.err(JSON.stringify(response));
            }
        } catch (error) {
            // 记录并重新抛出错误
            console.err(error);
            throw error;
        }
    };

    /**
     * 获取GeoServer的版本信息
     * 包含GeoServer版本号、构建信息等
     * 
     * @returns {Promise<Object>} 包含版本信息的响应数据
     * @throws {Error} 当请求失败或响应状态非200时抛出错误
     * 
     * @example
     * const version = await aboutApi.getVersion();
     * console.log(version); // 版本信息
     */
    async getVersion() {
        try {
            // 发送GET请求获取版本信息
            const response = await axios.get('/geoserver/rest/about/version');
            
            // 检查响应状态
            if (response.status === 200) {
                return response.data;
            } else {
                // 记录非200状态的响应
                console.err(JSON.stringify(response));
            }
        } catch (error) {
            // 记录并重新抛出错误
            console.err(error);
            throw error;
        }
    };
}