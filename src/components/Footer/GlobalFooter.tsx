import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 *
 */
export default function GlobalFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="global-footer">
            <div>© {currentYear} 面试刷题平台</div>
            <div>
                <a href="https://www.baidu.com" target="_blank">
                    作者：小徐
                </a>
            </div>
        </div>
    );
}
