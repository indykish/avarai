/**
 * Copyright 2013 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/* 
 * This is modified by Megam Systems.
 */
 


VARAI.tabs = function() {
    
    
    function createTabs(options) {
        var tabs = {};
        
        var ul = $("#"+options.id)
        ul.addClass("varai-ui-tabs");
        ul.children().first().addClass("active");
        ul.children().addClass("varai-ui-tab");
        
        function onTabClick() {
            activateTab($(this));
            return false;
        }
        
        function onTabDblClick() {
            if (options.ondblclick) {
                options.ondblclick(tabs[$(this).attr('href').slice(1)]);
            }
            return false;
        }
        
        function activateTab(link) {
            if (typeof link === "string") {
                link = ul.find("a[href='#"+link+"']");
            }
            if (!link.parent().hasClass("active")) {
                ul.children().removeClass("active");
                link.parent().addClass("active");
                if (options.onchange) {
                    options.onchange(tabs[link.attr('href').slice(1)]);
                }
            }
        }
        
        function updateTabWidths() {
            var tabs = ul.find("li.varai-ui-tab");
            var width = ul.width();
            var tabCount = tabs.size();
            var tabWidth = (width-6-(tabCount*7))/tabCount;
            var pct = 100*tabWidth/width;
            tabs.css({width:pct+"%"});
        }
        
        ul.find("li.varai-ui-tab a").on("click",onTabClick).on("dblclick",onTabDblClick);
        updateTabWidths();
        
        
        function removeTab(id) {
            var li = ul.find("a[href='#"+id+"']").parent();
            if (li.hasClass("active")) {
                var tab = li.prev();
                if (tab.size() == 0) {
                    tab = li.next();
                }
                activateTab(tab.find("a"));
            }
            li.remove();
            if (options.onremove) {
                options.onremove(tabs[id]);
            }
            delete tabs[id];
            updateTabWidths();
        }
        
        return {
            addTab: function(tab) {
                tabs[tab.id] = tab;
                var li = $("<li/>",{class:"varai-ui-tab"}).appendTo(ul);
                var link = $("<a/>",{href:"#"+tab.id, class:"varai-ui-tab-label"}).appendTo(li);
                link.html(tab.label);
                
                link.on("click",onTabClick);
                link.on("dblclick",onTabDblClick);
                if (tab.closeable) {
                    var closeLink = $("<a/>",{href:"#",class:"varai-ui-tab-close"}).appendTo(li);
                    closeLink.html('<i class="icon-remove" />');
                    
                    closeLink.on("click",function(event) {
                        removeTab(tab.id);
                    });
                }
                updateTabWidths();
                if (options.onadd) {
                    options.onadd(tab);
                }
                link.attr("title",tab.label);
                if (ul.find("li.varai-ui-tab").size() == 1) {
                    activateTab(link);
                }
            },
            removeTab: removeTab,
            activateTab: activateTab,
            resize: updateTabWidths,
            count: function() {
                return ul.find("li.varai-ui-tab").size();
            },
            contains: function(id) {
                return ul.find("a[href='#"+id+"']").length > 0;
            }

        }
    }
    
    return {
        create: createTabs
    }
}();
