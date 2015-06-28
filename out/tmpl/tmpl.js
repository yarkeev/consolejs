define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["console"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"b-web-console\">\n	<div class=\"b-web-console__output\"></div>\n\n	<div class=\"b-web-console__input-wrapper\">\n		<input type=\"text\" class=\"b-web-console__input\" />\n	</div>\n\n	<i class=\"b-web-console__settings-icon\"></i>\n\n	<div class=\"b-web-console__resize\"></div>\n</div>";
},"useData":true});

this["JST"]["settings"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"b-web-console__settings-fade\">\n	<div class=\"b-web-console__settings\">\n		<div class=\"b-web-console__settings__header\">\n			Settings\n			<i class=\"b-web-console__settings__close\"></i>\n		</div>\n\n		<div class=\"b-web-console__settings__content\">\n			<dl class=\"b-web-console__settings__item\">\n				<dt class=\"b-web-console__settings__item__title\">Toggle</dt>\n				<dd class=\"b-web-console__settings__item__value\">\n					<input type=\"text\" value=\""
    + alias3(((helper = (helper = helpers.toggleHotkey || (depth0 != null ? depth0.toggleHotkey : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"toggleHotkey","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"type shortcut\" class=\"b-web-console__settings__toggle-input\"/>\n				</dd>\n			</dl>\n\n			<dl class=\"b-web-console__settings__item\">\n				<dt class=\"b-web-console__settings__item__title\">Limit file size (in lines)</dt>\n				<dd class=\"b-web-console__settings__item__value\">\n					<input type=\"text\" value=\""
    + alias3(((helper = (helper = helpers.limitFileSize || (depth0 != null ? depth0.limitFileSize : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"limitFileSize","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"limit\" class=\"b-web-console__settings__limit-file-size\"/>\n				</dd>\n			</dl>\n		</div>\n	</div>\n</div>";
},"useData":true});

return this["JST"];

});