/**
 * GeoServer REST API 主入口类
 * 提供对GeoServer各种REST服务的统一访问接口
 * 
 * 功能模块：
 * - about: GeoServer服务器信息相关API
 * - layers: 图层和图层组管理相关API
 */

import About from './About.js'
import Layers from "./Layers.js";

export default class GeoServerRestApi {
    /**
     * GeoServer服务器信息API实例
     * 用于获取服务器状态、版本、清单等信息
     * @type {About}
     */
    about;
    
    /**
     * GeoServer图层管理API实例  
     * 用于获取图层列表、图层组信息等
     * @type {Layers}
     */
    layers;

    /**
     * 构造函数
     * 初始化各个API模块实例
     */
    constructor() {
        // 初始化服务器信息API模块
        this.about = new About();
        
        // 初始化图层管理API模块
        this.layers = new Layers();
    }
}