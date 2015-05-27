define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["console"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"b-web-console hide\">\n	<div class=\"b-web-console__output\"></div>\n\n	<div class=\"b-web-console__input-wrapper\">\n		<input type=\"text\" class=\"b-web-console__input\" />\n	</div>\n</div>";
},"useData":true});

this["JST"]["settings"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});

return this["JST"];

});