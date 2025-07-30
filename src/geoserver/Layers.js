/**
 * GeoServer图层管理API类
 * 提供对GeoServer图层和图层组的REST API访问
 * 
 * 主要功能：
 * - 获取图层列表
 * - 获取图层组列表  
 * - 获取特定图层组详细信息
 */

import axios from "axios";

export default class Layers {
    
    /**
     * 获取GeoServer中的所有图层
     * 
     * @returns {Promise<Object>} 包含图层列表的响应数据
     * @throws {Error} 当请求失败或响应状态非200时抛出错误
     * 
     * @example
     * const layers = await layersApi.getLayers();
     * console.log(layers.layers.layer); // 图层数组
     */
    async getLayers() {
        try {
            // 发送GET请求获取图层列表
            const response = await axios.get('/geoserver/rest/layers');
            
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
     * 获取GeoServer中的所有图层组
     * 
     * @returns {Promise<Object>} 包含图层组列表的响应数据
     * @throws {Error} 当请求失败或响应状态非200时抛出错误
     * 
     * @example
     * const groups = await layersApi.getLayerGroups();
     * console.log(groups.layerGroups.layerGroup); // 图层组数组
     */
    async getLayerGroups() {
        try {
            // 发送GET请求获取图层组列表
            const response = await axios.get(`/geoserver/rest/layergroups`);
            
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
     * 获取指定图层组的详细信息
     * 
     * @param {string} layerGroupName - 图层组名称
     * @returns {Promise<Object>} 包含图层组详细信息的响应数据
     * @throws {Error} 当请求失败或响应状态非200时抛出错误
     * 
     * @example
     * const groupDetails = await layersApi.getLayerGroup('my-layer-group');
     * console.log(groupDetails.layerGroup.publishables.published); // 图层组内的已发布图层
     */
    async getLayerGroup(layerGroupName) {
        try {
            // 发送GET请求获取特定图层组的详细信息
            const response = await axios.get(`/geoserver/rest/layergroups/${layerGroupName}`);
            
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