!function(a,b){"use strict";var c=function(){var a=this;a.handleFormSubmit()};c.prototype.handleFormSubmit=function(){b("#form-github-add").on("submit",function(c){c.preventDefault();var d=b("#repo").val(),e=d.substring(d.lastIndexOf("/")+1,d.length);a.location.href="https://github.com/customelements/customelements.io/issues/new?title=Add new component - "+e+"&body="+d})},window.GithubIssue=c}(window,jQuery),function(a,b,c){"use strict";var d=function(a){this.modules=a,this.setRepositories()};d.prototype.setRepositories=function(){var a=this;a.repositories=c.sortBy(a.modules,function(b){return b.name=a.removeSuffix(b.name),b.name})},d.prototype.removeSuffix=function(a){for(var b=["-custom-element","-element","-web-component"],c=0;c<b.length;c++)a=a.replace(b[c],"");return a},d.prototype.sortByStars=function(a){return c.sortBy(a,function(a){return a.stars}).reverse()},d.prototype.parse=function(a){var d=this,e=d.sortByStars(a);return c.template(b("#all-template").html(),{modules:e})},d.prototype.append=function(){var a=this;b("#all").append(a.parse(a.repositories))},a.Repositories=d}(window,jQuery,_),function(a,b,c){"use strict";var d=function(){this.modules=this.getFeaturedRepos(),this.setFeatured()};d.prototype.getFeatured=function(){var a=function(){var a=null;return b.ajax({async:!1,global:!1,url:"/data/featured.json",dataType:"json",success:function(b){a=b}}),a}();return a},d.prototype.getFeaturedRepos=function(){var a=this,d=function(){var d=[];return c.each(a.getFeatured(),function(a){b.ajax({async:!1,global:!1,url:"https://api.github.com/repos/"+a.repository,dataType:"json",success:function(a){d.push(a)}})}),d}();return d},d.prototype.setFeatured=function(){var a=this,d=c.sortBy(a.modules,function(a){return a.stargazers_count}).reverse().splice(0,3);a.popularModules=c.template(b("#featured-elements-template").html(),{modules:d})},d.prototype.append=function(){b("#loading-featured-elements").remove(),b("#featured-elements-popular").append(this.popularModules)},a.Featured=d}(window,jQuery,_),function(a,b){"use strict";var c=30,d=function(){this.pageTitle=b("title").text(),this.searchInput=b(".search"),this.loadMoreButton=b(".button.load-more"),this.bindInput(),this.bindLoadMore(),this.createList(),this.parseQueryString()};d.prototype.createList=function(){var a=this;a.list=new List("all",{valueNames:["name","desc","stars","forks","author"],page:c})},d.prototype.loadMore=function(){var a=this,b=a.list.page;a.list.show(1,b+c)},d.prototype.bindInput=function(){var a=this;history.replaceState&&a.searchInput.on("input",function(b){var c,d=b.target.value;""!==d?(c="?q="+d,a.loadMoreButton.hide()):(c=".",a.loadMoreButton.show()),history.replaceState(a.pageTitle,a.pageTitle,c)})},d.prototype.bindLoadMore=function(){var a=this;a.loadMoreButton.on("click",function(b){b.preventDefault(),a.hasNextPage()||a.loadMoreButton.hide(),a.loadMore()})},d.prototype.hasNextPage=function(){var a=this;return a.list.page<=a.list.items.length-c},d.prototype.parseQueryString=function(){var b=this,c=a.location.search.substring(1);if(""!==c){var d=b.generateQueryParams(c.split("&"));b.loadMoreButton.hide(),b.searchInput.val(d.q),b.list.search(d.q)}},d.prototype.generateQueryParams=function(a){var b={};for(var c in a){var d=a[c].split("=");if(d.length>1){var e=decodeURIComponent(d[0].replace(/\+/g," ")),f=decodeURIComponent(d[1].replace(/\+/g," "));b[e]=f}}return b},window.Search=d}(window,jQuery,_),function(a,b,c){"use strict";var d=function(a){this.modules=a,this.initialize()};d.prototype.initialize=function(){this.setPopular(),this.setLatests()},d.prototype.setPopular=function(){var a=this,d=c.sortBy(a.modules,function(a){return a.stars}).reverse().splice(0,3);a.popularModules=c.template(b("#most-popular-template").html(),{modules:d})},d.prototype.setLatests=function(){var a=this,d=c.sortBy(a.modules,function(a){return a.created}).reverse().splice(0,3);a.latestModules=c.template(b("#latest-elements-template").html(),{modules:d})},d.prototype.append=function(){b("#most-popular").append(this.popularModules),b("#latest-popular").append(this.latestModules)},a.Stats=d}(window,jQuery,_),function(a,b){"use strict";b(function(){b("#loading").remove(),new Stats(window.customElements).append(),new Repositories(window.customElements).append(),(new Featured).append(),new Search,new GithubIssue})}(window,jQuery);