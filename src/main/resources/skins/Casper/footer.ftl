<#--

    Solo - A small and beautiful blogging system written in Java.
    Copyright (c) 2010-present, b3log.org

    Solo is licensed under Mulan PSL v2.
    You can use this software according to the terms and conditions of the Mulan PSL v2.
    You may obtain a copy of Mulan PSL v2 at:
            http://license.coscl.org.cn/MulanPSL2
    THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
    See the Mulan PSL v2 for more details.

-->
<footer class="footer">
    <div class="wrapper fn__clear">
        <div class="fn__left">
            <br>
            &copy; ${year}
            <a href="${servePath}">${blogTitle}</a>
            ${footerContent}
        </div>
        <div class="fn__right">
            <a href="${servePath}/tags.html" rel="section">
            ${allTagsLabel}
            </a>
            &nbsp;•&nbsp;
            <a href="${servePath}/archives.html">
            ${archiveLabel}
            </a>
            &nbsp;•&nbsp;
            <a rel="archive" href="${servePath}/links.html">
            ${linkLabel}
            </a>
            <br>
            ${statistic.statisticPublishedBlogArticleCount} ${articleLabel} &nbsp;
            <span data-uvstaturl="${servePath}">${statistic.statisticBlogViewCount}</span> ${viewLabel} &nbsp;
            <#if !staticSite>${onlineVisitorCnt} ${onlineVisitorLabel}</#if>
        </div>
    </div>
</footer>

<#include "../../common-template/label.ftl">
<script type="text/javascript"
        src="https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/skins/${skinDirName}/js/common.min.js?${staticResourceVersion}"
        charset="utf-8"></script>
${plugins}
