!function($) {
$.fn.completer = function(cat, data) {
data = $.extend({
source:function(typeahead, query) {
$.getJSON("/autocomplete", {
fq:"cat:" + cat,
q:query + "*"
}, function(resp) {
typeahead.process(_.map(resp.models, function(e) {
return e.name;
}));
});
},
matcher:function() {
return !0;
}
}, data), this.typeahead(data);
};
}(jQuery), function() {
!function($) {
return $.dragResize = {
version:"1.0"
}, $.fn.dragResize = function(options) {
var default_options, enable_resize, that;
return default_options = {
resize:function() {},
activeColor:"#AAA",
inactiveColor:"#DDD"
}, that = this, options = $.extend(default_options, options), enable_resize = !1, 
$(this).mousedown(function() {
return enable_resize = !0, !1;
}), $(this).mouseup(function() {
return enable_resize = !1;
}), $(this).mouseenter(function() {
return $(that).css("background-color", options.activeColor);
}), $(this).mouseleave(function() {
return $(that).css("background-color", options.inactiveColor);
}), $(window).mouseout(function(e) {
return null === e.relatedTarget ? enable_resize = !1 :void 0;
}), $(window).mousemove(function(e) {
return enable_resize === !0 ? ((e.pageY < 0 || e.pageY > document.height || e.pageX < 0 || e.pageX > document.width) && (enable_resize = !1), 
options.resize(e.pageX, e.pageY)) :void 0;
});
};
}($);
}.call(this), function() {
_.mixin({
capitalize:function(string) {
return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var AppController, HR, _ref;
return AppController = function(_super) {
function AppController() {
return AppController.__super__.constructor.apply(this, arguments);
}
return __extends(AppController, _super), AppController.prototype.initialize = function(options) {
return null == options && (options = {}), this.MODELS_DEF = {
profile:HR.ProfileModel,
network:HR.NetworksModel,
challenge:HR.ChallengeModel,
contest:HR.ContestModel,
playoff:HR.PlayoffModel,
"email-preferences":HR.EmailPreferencesModel,
submission:HR.SubmissionModel,
gameset:HR.GameSetModel,
game:HR.GameModel,
hackerprofile:HR.HackerProfileModel,
module:HR.ModuleModel,
managechallenge:HR.Manage_ChallengeModel,
managecontest:HR.Manage_ContestModel,
managetemplate:HR.Manage_TemplateModel,
testcase:HR.TestCaseModel,
challengeassociation:HR.ChallengeAssociationModel,
hackerapplication:HR.HackerApplicationModel,
hackerchallenge:HR.HackerChallengeModel,
blog:HR.BlogModel,
hackerprogress:HR.HackerProgressModel,
moduleprogress:HR.ModuleProgressModel,
trackprogress:HR.TrackProgressModel,
track:HR.TrackModel,
"administration-contest":HR.Administration_ContestModel,
"administration-challenge":HR.Administration_ChallengeModel,
"administration-company":HR.Administration_CompanyModel,
"administration-company_office":HR.Administration_CompanyOfficeModel,
"administration-company_position":HR.Administration_CompanyPositionModel,
"administration-test_case":HR.Administration_TestCaseModel,
"administration-company_hacker_shortlist":HR.Administration_CompanyHackerShortlistModel
}, this.COLLECTIONS_DEF = {
challenges:HR.ChallengesCollection,
"network-leaderboard":HR.NetworkLeaderboardCollection,
"extended-network":HR.ExtendedNetworkCollection,
leaderboard:HR.LeaderboardCollection,
submissions:HR.SubmissionsCollection,
"grouped-submissions":HR.GroupedSubmissionsCollection,
"chronological-submissions":HR.ChronologicalSubmissionsCollection,
gameset:HR.GameSetCollection,
notifications:HR.NotificationsCollection,
hackeractivity:HR.HackerActivityCollection,
hackerpost:HR.HackerPostCollection,
hackerevent:HR.HackerEventCollection,
playoffs:HR.PlayoffCollection,
contests:HR.ContestsCollection,
managechallenge:HR.ManageChallengeListCollection,
managecontest:HR.ManageContestListCollection,
testcase:HR.TestCaseCollection,
challengeassociation:HR.ChallengeAssociationCollection,
mods:HR.ModsCollection,
companies:HR.CompaniesCollection,
hackerapplications:HR.HackerApplicationsCollection,
hackerchallenges:HR.HackerChallengesCollection,
blogs:HR.BlogsCollection,
blogtemplates:HR.BlogTemplatesCollection,
secondaryemails:HR.SecondaryEmailCollection,
"hacker-clubs":HR.HackerClubCollection,
submission_hackers:HR.ManageSubmissionsHackersCollection,
contestaccess:HR.ContestAccessCollection,
"campus-rep-stats-collection":HR.CampusRepStatsCollection,
"administration-contests":HR.Administration_ContestsCollection,
"administration-challenges":HR.Administration_ChallengesCollection,
"administration-companies":HR.Administration_CompaniesCollection,
"administration-test_cases":HR.Administration_TestCasesCollection,
"administration-company-contests":HR.Administration_CompanyContestsCollection,
"administration-hackerboard":HR.Administration_HackerboardCollection,
"administration-hackerboard-submissions":HR.Administration_HackerboardSubmissionsCollection
};
}, AppController.prototype.namespace = function(contest_slug, rest) {
return null == rest && (rest = !1), contest_slug || (contest_slug = "master"), "master" !== contest_slug || rest ? "/contests/" + contest_slug + "/" :"/";
}, AppController.prototype.get_challenge_pageURL = function(contest_slug, challenge_slug) {
var challenge_bit;
return challenge_bit = "challenges/" + challenge_slug, "master" === contest_slug ? "/" + challenge_bit :"/contests/" + contest_slug + "/" + challenge_bit;
}, AppController.prototype.contest = function(options) {
return null == options && (options = {}), options.slug && options.slug !== HR.appController.get_current_contest_slug() ? HR.model("contest", {
slug:HR.appController.get_current_contest_slug()
}).cached(options) :(this.current_contest ? this.current_contest.get("slug") !== HR.appController.get_current_contest_slug() && (this.current_contest = HR.model("contest")) :this.current_contest = HR.model("contest"), 
HR.appController.get_current_contest_slug() && this.current_contest.set("slug", HR.appController.get_current_contest_slug()), 
this.current_contest.cached());
}, AppController.prototype.get_current_contest_slug = function() {
return this.landing_contest_slug = void 0 === this.landing_contest_slug ? HR.PREFETCH_DATA.metadata.landing_contest_slug :this.landing_contest_slug, 
this.landing_contest_slug;
}, AppController.prototype.get_current_contest_namespace = function() {
return this.current_contest_namespace = void 0 === this.current_contest_namespace ? HR.PREFETCH_DATA.metadata.current_contest_namespace :this.current_contest_namespace, 
this.current_contest_namespace;
}, AppController.prototype.is_using_contest_namespace = function() {
return this.using_contest_namespace = void 0 === this.using_contest_namespace ? HR.PREFETCH_DATA.metadata.using_contest_namespace :this.using_contest_namespace, 
this.using_contest_namespace;
}, AppController.prototype.get_current_contest_home_url = function() {
return "" + HR.appController.get_current_contest_namespace() + "/challenges";
}, AppController.prototype.get_current_contest_slug_url = function() {
var slug;
return slug = HR.appController.get_current_contest_slug(), "master" === slug ? "" :"/" + slug;
}, AppController.prototype.set_contest_namespace = function(contest_slug) {
return "master" === contest_slug || HR.appView.contentView instanceof HR.ChallengesView ? HR.appView.contestNavigationView.hide() :HR.appView.contestNavigationView.setContestSlug(contest_slug), 
HR.appController.get_current_contest_slug() !== contest_slug && (this.landing_contest_slug = contest_slug, 
this.current_contest_namespace = "master" === contest_slug ? "" :"/contests/" + contest_slug, 
this.using_contest_namespace = "master" !== contest_slug, this.current_contest = HR.model("contest"), 
HR.appView.navigationView.nav_buttons && HR.appView.navigationView.nav_buttons.updateLinks(), 
HR.appView.countdownTimerView) ? HR.appView.countdownTimerView.setContest(HR.contest().cached()) :void 0;
}, AppController.prototype.object = function(suffix, name, attributes, options) {
var Obj, clsName, obj, stringName;
if (stringName = name.toTitleCase() + "-" + suffix, clsName = $.camelCase(stringName), 
Obj = HR[clsName], !Obj && ("model" === suffix ? Obj = this.MODELS_DEF[name] :"collection" === suffix && (Obj = this.COLLECTIONS_DEF[name]), 
!Obj)) throw "HR." + clsName + " is not defined";
return obj = new Obj(attributes, options), obj.contest_slug = (attributes || {}).contest_slug || (options || {}).contest_slug, 
obj;
}, AppController.prototype.model = function(name, attributes, options) {
var model;
return model = HR.appController.object("model", name, attributes, options);
}, AppController.prototype.collection = function(name, attributes, options) {
return HR.appController.object("collection", name, attributes, options);
}, AppController.prototype.profile = function(options) {
return null == options && (options = {}), this._profile && _.size(options) > 0 ? this._profile.cached(options) :this._profile || (this._profile = this.model("profile").cached(options), 
this._profile.listenTo(this._profile, "reset", function(_this) {
return function() {
return HR.key_prefix = _this._profile.get("key_prefix");
};
}(this))), this._profile;
}, AppController.prototype.restURL = function(path, restPrefix) {
return restPrefix && (path = "/rest" + path), path;
}, AppController.prototype.log = Backbone.log, AppController.prototype.staticPath = function(path, base_path) {
return null == base_path && (base_path = null), path = HR.MANIFEST && HR.MANIFEST[path] ? HR.MANIFEST[path] :path, 
HR.PREFETCH_DATA && HR.PREFETCH_DATA.metadata && (base_path || (base_path = HR.PREFETCH_DATA.metadata.asset_path)), 
"" + base_path + "/" + path;
}, AppController.prototype.requires = function() {
var callback, errorCallback, number_paths, staticFiles;
return number_paths = arguments.length - 1, callback = _.last(arguments), errorCallback = null, 
"function" == typeof arguments[arguments.length - 2] && (number_paths = arguments.length - 2, 
callback = arguments[arguments.length - 2], errorCallback = _.last(arguments)), 
staticFiles = _.map(_.toArray(arguments).slice(0, number_paths), function() {
return function(path) {
return HR.appController.staticPath("" + path + ".js");
};
}(this)), require(staticFiles, callback, errorCallback);
}, AppController.prototype.templatePath = function(template) {
var base_path;
return base_path = null, window.IE_BROWSER && (base_path = "/assets"), this.staticPath("backbone/templates/" + template, base_path);
}, AppController.prototype.template = function(template_name, template_callback, view_loader) {
var each_inline_template, that, _i, _len, _ref;
if (null == template_name && (template_name = null), null == template_callback && (template_callback = null), 
null == view_loader && (view_loader = !0), void 0 === this.template_data && (this.template_data = {}, 
this.template_callbacks = {}, $('script[type="text/template"]').length > 0)) for (_ref = $('script[type="text/template"]'), 
_i = 0, _len = _ref.length; _len > _i; _i++) each_inline_template = _ref[_i], this.template_data[$(each_inline_template).attr("id")] = $(each_inline_template).html();
return null !== template_name && void 0 !== this.template_data[template_name] && "--insync--" !== this.template_data[template_name] ? (template_callback = null, 
_.template(this.template_data[template_name])) :(void 0 === this.template_callbacks[template_name] && (this.template_callbacks[template_name] = []), 
null !== template_callback && (this.template_callbacks[template_name].push(template_callback), 
template_callback = null), "--insync--" !== this.template_data[template_name] && (this.template_data[template_name] = "--insync--", 
that = this, HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading ...", !0, !1), 
$.ajax({
url:this.templatePath("" + template_name + ".html"),
success:function(data) {
return that.template_data[template_name] = data, that.template_callbacks[template_name] && (_.each(that.template_callbacks[template_name], function(callback) {
return callback.render();
}), that.template_callbacks[template_name] = []), HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, .001), 
template_callback = null;
},
error:function() {
throw HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Error Occured", !1, !0, 1), 
"Template `" + that.templatePath("" + template_name + ".html") + "` Not Found";
},
cache:!HR.development
})), view_loader = view_loader ? this.viewLoader() :"<div></div>", _.template(view_loader));
}, AppController.prototype.setData = function(key, value) {
return void 0 === this.persistant_data && (this.persistant_data = {}), void 0 === this.persistant_data[key] && this.trigger("persistant:set:" + key), 
this.trigger("persistant:change:" + key), this.persistant_data[key] = value;
}, AppController.prototype.getData = function(key) {
return this.persistant_data && this.persistant_data[key] ? this.persistant_data[key] :void 0;
}, AppController.prototype.viewLoader = function(size) {
return null == size && (size = 32), "<div class='gray'> <div style='background: url(https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_" + size + "x" + size + ".gif); height: " + size + "px; width: " + size + "px; display: inline-block;'></div> </div>";
}, AppController.prototype.setModel = function(data, key, uid, casual) {
var def_key;
if (null == uid && (uid = null), null == casual && (casual = !0), def_key = key, 
uid && (key = "" + key + "-" + uid), !this.MODELS_DEF[def_key]) throw "HR Error: Model with key `" + key + "` doesn't exist";
return this.MODELS || (this.MODELS = {}), this.MODELS[key] ? this.MODELS[key].set(data) :this.MODELS[key] = new this.MODELS_DEF[def_key](data, {
casual:casual
});
}, AppController.prototype.getModel = function(key, uid, callback, fetch, force_fetch, disableThrobber) {
var model;
return null == uid && (uid = null), null == callback && (callback = null), null == fetch && (fetch = !0), 
null == force_fetch && (force_fetch = !1), null == disableThrobber && (disableThrobber = !1), 
model = new this.MODELS_DEF[key](null, {
casual:!1
}), callback && callback(model), fetch && model.cached({
fetch:force_fetch,
disableThrobber:disableThrobber
}), model;
}, AppController.prototype.cleanModelCache = function(keyPrefix) {
var that;
return that = this, _.each(this.MODELS, function(o, key) {
return 0 === key.indexOf(keyPrefix) ? delete that.MODELS[key] :void 0;
});
}, AppController.prototype.setCollection = function(data, key, uid) {
var def_key;
if (null == uid && (uid = null), def_key = key, uid && (key = "" + key + "-" + uid), 
!this.COLLECTIONS_DEF[def_key]) throw "HR Error: Collection with key `" + key + "` doesn't exist";
return this.COLLECTIONS || (this.COLLECTIONS = {}), this.COLLECTIONS[key] || (this.COLLECTIONS[key] = new this.COLLECTIONS_DEF[def_key]()), 
this.COLLECTIONS[key].reset(data, {
silent:!1
});
}, AppController.prototype.getCollection = function(key, uid, callback, fetch, force_fetch, disableThrobber) {
var cache, collection;
return null == uid && (uid = null), null == callback && (callback = null), null == fetch && (fetch = !0), 
null == force_fetch && (force_fetch = !1), null == disableThrobber && (disableThrobber = !1), 
collection = new this.COLLECTIONS_DEF[key](null, {
casual:!force_fetch
}), callback && callback(collection), fetch && (cache = !force_fetch, collection.cached({
fetch:force_fetch,
disableThrobber:disableThrobber
})), collection;
}, AppController.prototype.cleanCollectionCache = function(keyPrefix) {
var that;
return that = this, _.each(this.COLLECTIONS, function(o, key) {
return 0 === key.indexOf(keyPrefix) ? delete that.COLLECTIONS[key] :void 0;
});
}, AppController.prototype.setTitle = function(title) {
return document.title = "" + title + " | HackerRank";
}, AppController.prototype.getTemplate = function(template_name, callback, obj) {
var data, each_inline_template, that, _i, _len, _ref;
if (null == callback && (callback = function() {}), null == obj && (obj = null), 
null === obj && (obj = this), obj && obj.cid) {
if (this.TEMPLATE_VIEWDATA || (this.TEMPLATE_VIEWDATA = {}), this.TEMPLATE_VIEWDATA["" + obj.cid + "-" + template_name]) return;
this.TEMPLATE_VIEWDATA["" + obj.cid + "-" + template_name] = !0;
}
if (void 0 === this.TEMPLATE_DATA && (this.TEMPLATE_DATA = {}, this.TEMPLATE_CALLBACKS = {}, 
$('script[type="text/template"]').length > 0)) for (_ref = $('script[type="text/template"]'), 
_i = 0, _len = _ref.length; _len > _i; _i++) each_inline_template = _ref[_i], this.TEMPLATE_DATA[$(each_inline_template).attr("id")] = _.template($(each_inline_template).html());
return void 0 !== this.TEMPLATE_DATA[template_name] ? (data = this.TEMPLATE_DATA[template_name], 
callback.call(obj, data), data) :(this.TEMPLATE_CALLBACKS[template_name] || (this.TEMPLATE_CALLBACKS[template_name] = [], 
that = this, $.ajax({
url:this.templatePath("" + template_name + ".html"),
success:function(resp) {
var template, _clbk, _results;
for (template = _.template(resp), that.TEMPLATE_DATA[template_name] = template, 
_results = []; that.TEMPLATE_CALLBACKS[template_name].length > 0; ) _clbk = that.TEMPLATE_CALLBACKS[template_name].shift(), 
_results.push(_clbk.callback.call(_clbk.obj, template));
return _results;
},
cache:!HR.development
})), this.TEMPLATE_CALLBACKS[template_name].push({
callback:callback,
obj:obj
}), null);
}, AppController.prototype.clearTemplate = function(template_name) {
return void 0 === this.TEMPLATE_DATA && (this.TEMPLATE_DATA = {}, this.TEMPLATE_CALLBACKS = {}), 
delete this.TEMPLATE_DATA[template_name], delete (this.TEMPLATE_VIEWDATA = !1), 
delete this.TEMPLATE_CALLBACKS[template_name];
}, AppController.prototype.facebook_login = function(e, callback) {
var data, h, left, top, w;
if (null == e && (e = null), null == callback && (callback = function() {}), e) {
if (e.preventDefault(), data = e.data, "disabled" === $(e.currentTarget).attr("disabled")) return;
} else data = {};
return w = 600, h = 350, left = screen.width / 2 - w / 2, top = screen.height / 2 - h / 2, 
window.login_callback = function() {
return HR.profile({
fetch:!0
}), data && data.that && data.destroy && data.that.destroy(), callback();
}, window.open("/hackers/auth/facebook?display=popup", "facebook_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
}, AppController.prototype.github_login = function(e, callback) {
var data, h, left, top, w;
if (null == e && (e = null), null == callback && (callback = function() {}), e) {
if (e.preventDefault(), data = e.data, "disabled" === $(e.currentTarget).attr("disabled")) return;
} else data = {};
return w = 960, h = 500, left = screen.width / 2 - w / 2, top = screen.height / 2 - h / 2, 
window.login_callback = function() {
return HR.profile({
fetch:!0
}), data && data.that && data.destroy && data.that.destroy(), callback();
}, window.open("/hackers/auth/github?display=popup", "facebook_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
}, AppController.prototype.facebook_share = function(url, content) {
var h, left, top, w;
return null == content && (content = ""), w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, url = "https://www.facebook.com/sharer.php?s=100&p" + encodeURIComponent("[url]") + "=" + encodeURIComponent(url) + "&p" + encodeURIComponent("[title]") + "=" + window.document.title + "&p" + encodeURIComponent("[summary]") + "=" + content, 
window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}, AppController.prototype.facebook_graph_activity = function(action, object_type, object_url) {
var params;
return params = {}, params[object_type] = object_url, window.FB.api("/me/hackerrank:" + action, "post", params, function(_this) {
return function(response) {
return _this.log(response);
};
}(this));
}, AppController.prototype.twitter_share = function(text) {
var h, left, top, url, w;
return w = 600, h = 350, left = screen.width / 2 - w / 2, top = screen.height / 2 - h / 2, 
url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}, AppController.prototype.querySlug = function(options) {
var cached_response, prefetch_response;
return null == options && (options = {}), HR.QUERY_SLUGS || (HR.QUERY_SLUGS = {}), 
(cached_response = HR.QUERY_SLUGS[options.slug]) ? (options.callback(cached_response), 
void 0) :(prefetch_response = HR.PREFETCH_DATA.slugs[options.slug], prefetch_response ? (options.callback(HR.PREFETCH_DATA.slugs[options.slug]), 
HR.QUERY_SLUGS[options.slug] = HR.PREFETCH_DATA.slugs[options.slug], void 0) :$.ajax({
url:"/rest/query_slug",
data:{
slug:options.slug
},
success:function(data) {
return HR.QUERY_SLUGS[options.slug] = data, options.callback(data);
}
}));
}, AppController.prototype.slugDetector = function(slug, callback, obj) {
var data, that;
return null == callback && (callback = function() {}), null == obj && (obj = null), 
null === obj && (obj = this), this.SLUG_DETECTOR_DATA || (this.SLUG_DETECTOR_DATA = {}, 
this.SLUG_DETECTOR_CALLBACKS = {}, HR.PREFETCH_DATA.slugs && (this.SLUG_DETECTOR_DATA = $.extend(HR.PREFETCH_DATA.slugs, this.SLUG_DETECTOR_DATA), 
_.each(HR.PREFETCH_DATA.slugs, function(data, slug) {
return this.SLUG_DETECTOR_DATA[slug].created_at = 1e3 * HR.PREFETCH_DATA.timestamp;
}, this))), void 0 !== this.SLUG_DETECTOR_DATA[slug] ? (data = this.SLUG_DETECTOR_DATA[slug], 
callback.call(obj, data), data) :(this.SLUG_DETECTOR_CALLBACKS[slug] || (this.SLUG_DETECTOR_CALLBACKS[slug] = [], 
that = this, $.ajax({
url:"/rest/query_slug",
type:"POST",
data:{
slug:slug
},
success:function(resp) {
var _clbk, _results;
for (that.SLUG_DETECTOR_DATA[slug] = resp, that.SLUG_DETECTOR_DATA[slug].created_at = new Date().getTime(), 
_results = []; that.SLUG_DETECTOR_CALLBACKS[slug].length > 0; ) _clbk = that.SLUG_DETECTOR_CALLBACKS[slug].shift(), 
_results.push(_clbk.callback.call(_clbk.obj, resp));
return _results;
}
})), this.SLUG_DETECTOR_CALLBACKS[slug].push({
callback:callback,
obj:obj
}), null);
}, AppController.prototype.loadCodeMirror = function(callback) {
return HR.requires("codemirror_basic", function() {
return function() {
return callback();
};
}(this));
}, AppController.prototype.loadCodeMirrorMode = function(lang, callback) {
return HR.appController.loadCodeMirror(function() {
var args;
return args = [], lang_mode_location_unconventional_mapping[lang] ? args = _.union(args, lang_mode_location_unconventional_mapping[lang]) :args.push("codemirror/mode/" + lang + "/" + lang), 
args.push(function() {
return function() {
return callback();
};
}(this)), args.push(function() {
return function() {
return callback();
};
}(this)), HR.requires.apply(this, args);
});
}, AppController;
}(Backbone.Model), HR = null != (_ref = window.HR) ? _ref :{}, HR.AppController = AppController;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GenericModel, HR, _ref;
return GenericModel = function(_super) {
function GenericModel() {
return GenericModel.__super__.constructor.apply(this, arguments);
}
return __extends(GenericModel, _super), GenericModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
options.casual && (this.casual = {}, this.casual.min_fetch_timelapse = 1e4, this.casual.timestamp = new Date().getTime()), 
null == this.caching && (this.caching = !0), GenericModel.__super__.initialize.call(this, attributes, options);
}, GenericModel.prototype.url = function() {
return "" + this.restURL() + "?" + this.queryParams();
}, GenericModel.prototype.queryParams = function() {
return "";
}, GenericModel.prototype.setCaching = function(caching) {
this.caching = caching;
}, GenericModel.prototype.restPrefix = !0, GenericModel.prototype.restURL = function() {
var rest, _url;
return _url = "" + this.ns(rest = !0) + this.baseURL(), "" + HR.restURL(_url, this.restPrefix);
}, GenericModel.prototype.pageURL = function() {
return "" + this.ns() + this.baseURL();
}, GenericModel.prototype.baseURL = function() {
return "/dummy";
}, GenericModel.prototype.ns = function(rest) {
return null == rest && (rest = !1), this.collection && (this.contest_slug || (this.contest_slug = this.contest_slug || this.get("contest_slug") || this.collection.contest_slug)), 
this.contest_slug || (this.contest_slug = HR.appController.get_current_contest_slug()), 
HR.namespace(this.contest_slug, rest);
}, GenericModel.prototype.hasChanged = function(attr) {
return GenericModel.__super__.hasChanged.call(this, attr);
}, GenericModel.prototype.keyPrefix = function() {
return HR.profile().get("key_prefix");
}, GenericModel.prototype.modelCrumbs = function() {
var crumbs;
return crumbs = HR.collection("bread-crumbs"), this.id && crumbs.add({
id:"" + this.constructor.name + "-" + this.id,
slug:this.get("slug") || this.get("id"),
path:this.pageURL(),
name:this.get("name") || this.get("title"),
model:this
}), crumbs;
}, GenericModel.prototype.setContestCrumb = function() {
var contest, contest_slug;
return contest_slug = this.contest_slug || this.get("contest-slug"), contest_slug ? contest = HR.model("contest", {
slug:this.contest_slug
}).cached({
success:function(_this) {
return function(model) {
return _this.crumbs.merge(model.breadCrumbs(), {
at:0
});
};
}(this)
}) :void 0;
}, GenericModel.prototype.breadCrumbs = function() {
return this.crumbs || (this.crumbs = HR.collection("bread-crumbs"), this.setContestCrumb()), 
this.crumbs.merge(this.modelCrumbs()), this.crumbs;
}, GenericModel.prototype.save = function(key, val, options) {
return this.id && this.caching && this.cacheSet(key, val, options), this.collection && this.collection.flush(), 
Backbone.Model.prototype.save.apply(this, arguments);
}, GenericModel.prototype.fetch = function() {
return void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Model.prototype.fetch.apply(this, arguments);
}, GenericModel.prototype.parse = function(resp, xhr) {
var f, parsed, set_data_fields, that, _fn, _i, _len;
if (void 0 !== xhr || resp.model) {
for (this.sync_status = !0, void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0) :this.disableThrobber = !1, 
set_data_fields = [ "total", "page", "activities", "gamedata", "status", "metadata", "errors" ], 
that = this, _fn = function(f) {
return void 0 !== resp[f] ? that[f] = resp[f] :void 0;
}, _i = 0, _len = set_data_fields.length; _len > _i; _i++) f = set_data_fields[_i], 
_fn(f);
parsed = GenericModel.__super__.parse.call(this, resp.model, xhr);
} else parsed = GenericModel.__super__.parse.call(this, resp, xhr);
return parsed;
}, GenericModel;
}(Backbone.Model), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericModel = GenericModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ABTest, HR;
return ABTest = function(_super) {
function ABTest() {
return ABTest.__super__.constructor.apply(this, arguments);
}
return __extends(ABTest, _super), ABTest.prototype.url = function() {
return "/rest/ab_testing/" + this.test;
}, ABTest.prototype.updateStatus = function(status) {
return this.set("status", status), this.save(), this;
}, ABTest;
}(Backbone.Model), HR = window.HR, HR.ABTest = ABTest;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var AnswerModel, HR;
return AnswerModel = function(_super) {
function AnswerModel() {
return AnswerModel.__super__.constructor.apply(this, arguments);
}
return __extends(AnswerModel, _super), AnswerModel.prototype.baseURL = function() {
return this.id ? "challenges/" + this.get("challenge_slug") + "/questions/" + this.get("question_id") + "/answers/" + this.id :"challenges/" + this.get("challenge_slug") + "/questions/" + this.get("question_id") + "/answers";
}, AnswerModel.prototype.getCreatedAt = function() {
return this.created_at;
}, AnswerModel;
}(window.HR.GenericModel), HR = window.HR, HR.AnswerModel = AnswerModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var BlogModel, HR;
return BlogModel = function(_super) {
function BlogModel() {
return BlogModel.__super__.constructor.apply(this, arguments);
}
return __extends(BlogModel, _super), BlogModel.prototype.url = function() {
return "/rest/blogs/" + this.get("id");
}, BlogModel;
}(window.HR.GenericModel), HR = window.HR, HR.BlogModel = BlogModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var BlogTemplateModel, HR;
return BlogTemplateModel = function(_super) {
function BlogTemplateModel() {
return BlogTemplateModel.__super__.constructor.apply(this, arguments);
}
return __extends(BlogTemplateModel, _super), BlogTemplateModel;
}(window.HR.GenericModel), HR = window.HR, HR.BlogTemplateModel = BlogTemplateModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var BreadCrumbModel, HR;
return BreadCrumbModel = function(_super) {
function BreadCrumbModel() {
return BreadCrumbModel.__super__.constructor.apply(this, arguments);
}
return __extends(BreadCrumbModel, _super), BreadCrumbModel.prototype.cacheTimeout = 300, 
BreadCrumbModel;
}(window.HR.GenericModel), HR = window.HR, HR.BreadCrumbModel = BreadCrumbModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CategoryModel, HR;
return CategoryModel = function(_super) {
function CategoryModel() {
return CategoryModel.__super__.constructor.apply(this, arguments);
}
return __extends(CategoryModel, _super), CategoryModel.prototype.children = function() {
return this._children || (this._children = HR.collection("category"), _.isArray(this.get("children")) && (this._children.set(this.get("children")), 
this._children.each(function(_this) {
return function(child) {
return child.parent = _this;
};
}(this)))), this._children;
}, CategoryModel.prototype.pageURL = function() {
return this.baseURL();
}, CategoryModel.prototype.baseURL = function() {
var path;
return path = "categories", this.parent && (path += "/" + this.parent.get("slug")), 
path += "/" + this.get("slug");
}, CategoryModel.prototype.defaultHierarchy = function() {
var children, firstChild;
return children = HR.collection("category", [ this ]), firstChild = this.children().first(), 
firstChild && children.merge(firstChild.defaultHierarchy()), children;
}, CategoryModel;
}(window.HR.GenericModel), HR = window.HR, HR.CategoryModel = CategoryModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ChallengeModel, ChallengeStats, HR;
return ChallengeModel = function(_super) {
function ChallengeModel() {
return ChallengeModel.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeModel, _super), ChallengeModel.prototype.baseURL = function() {
return "challenges/" + this.get("slug");
}, ChallengeModel.prototype.setSlug = function(slug) {
return this.set("slug", slug);
}, ChallengeModel.prototype.showLoader = !1, ChallengeModel.prototype.categories = function() {
return HR.collection("category", this.get("categories") || []);
}, ChallengeModel.prototype.getLanguageTemplates = function() {
var response, _data;
return _data = this.get("_data"), response = {
lang_head_template:{},
lang_template:{},
lang_tail_template:{}
}, _.each(_data, function(v, k) {
return k.endsWith("_template") ? response.lang_template[k.substring(0, k.length - "_template".length)] = v :k.endsWith("_template_head") ? response.lang_head_template[k.substring(0, k.length - "_template_head".length)] = v :k.endsWith("_template_tail") ? response.lang_tail_template[k.substring(0, k.length - "_template_tail".length)] = v :void 0;
}), response;
}, ChallengeModel.prototype.modelCrumbs = function() {
var crumbs, parent, track;
return crumbs = HR.collection("bread-crumbs"), track = this.get("track"), parent = null, 
this.categories().each(function(category) {
return category.parent = parent, crumbs.add({
id:"Category-" + category.id,
slug:category.get("slug"),
name:category.get("name"),
path:category.pageURL()
}), parent = category;
}), crumbs.merge(ChallengeModel.__super__.modelCrumbs.call(this)), crumbs;
}, ChallengeModel;
}(window.HR.GenericModel), ChallengeStats = function(_super) {
function ChallengeStats() {
return ChallengeStats.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeStats, _super), ChallengeStats;
}(window.HR.GenericModel), HR = window.HR, HR.ChallengeModel = ChallengeModel, HR.ChallengeStats = ChallengeStats;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ChecklistModel, HR;
return ChecklistModel = function(_super) {
function ChecklistModel() {
return ChecklistModel.__super__.constructor.apply(this, arguments);
}
return __extends(ChecklistModel, _super), ChecklistModel;
}(window.HR.GenericModel), HR = window.HR, HR.ChecklistModel = ChecklistModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CompileTestModel, HR, _ref;
return CompileTestModel = function(_super) {
function CompileTestModel() {
return CompileTestModel.__super__.constructor.apply(this, arguments);
}
return __extends(CompileTestModel, _super), CompileTestModel.prototype.url = function() {
var url;
return url = "/rest/contests/" + HR.appController.get_current_contest_slug() + "/challenges/" + this.challenge.get("slug") + "/compile_tests", 
this.get("id") && (url += "/" + this.get("id")), url;
}, CompileTestModel.prototype.setChallenge = function(challenge) {
this.challenge = challenge;
}, CompileTestModel.prototype.initialize = function() {
var that;
return that = this, this.time = 1500, this.throttledFetch = _.throttle(function() {
return that.fetch({
disable_throbber:!0,
success:function(model) {
return model.trigger("reset");
}
});
}, this.time - 50);
}, CompileTestModel.prototype.parse = function(resp, xhr) {
var that;
return resp.status ? (that = this, xhr ? (resp.status && 0 === resp.model.status && setTimeout(function() {
return that.throttledFetch();
}, this.time), CompileTestModel.__super__.parse.call(this, resp, xhr)) :CompileTestModel.__super__.parse.call(this, resp, xhr)) :CompileTestModel.__super__.parse.call(this, {
model:{
status:2,
error:resp.message
}
}, xhr);
}, CompileTestModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompileTestModel = CompileTestModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ContestAccessModel, HR;
return ContestAccessModel = function(_super) {
function ContestAccessModel() {
return ContestAccessModel.__super__.constructor.apply(this, arguments);
}
return __extends(ContestAccessModel, _super), ContestAccessModel.prototype.url = function() {
return this.id ? "/rest/contests/" + this.contest_id + "/contestaccesses/" + this.id :"/rest/contests/" + this.contest_id + "/contestaccesses/";
}, ContestAccessModel.prototype.setContestId = function(contest_id) {
this.contest_id = contest_id;
}, ContestAccessModel;
}(window.HR.GenericModel), HR = window.HR, HR.ContestAccessModel = ContestAccessModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ContestModel, HR;
return ContestModel = function(_super) {
function ContestModel() {
return ContestModel.__super__.constructor.apply(this, arguments);
}
return __extends(ContestModel, _super), ContestModel.prototype.baseURL = function() {
var identifier;
return identifier = this.get("slug") || HR.master, "master" === identifier && this.get("id") && 1 !== parseInt(this.get("id")) && (identifier = this.get("id")), 
"contests/" + identifier;
}, ContestModel.prototype.pageURL = function() {
var base;
return base = ContestModel.__super__.pageURL.call(this), "" + base + "/challenges";
}, ContestModel.prototype.ns = function() {
return "/";
}, ContestModel.prototype.getTrack = function(track_slug) {
var track;
return track = _.select(this.get("primary_tags") || [], function(tag) {
return tag.slug === track_slug;
}), _.first(track);
}, ContestModel.prototype.keyPrefix = function() {
return this.id && this.get("slug") && !this.isMaster() ? ContestModel.__super__.keyPrefix.call(this) :"";
}, ContestModel.prototype.isMaster = function() {
return this.get("slug") === HR.master;
}, ContestModel.prototype.getRemainingTime = function() {
var hours, minutes;
return hours = Math.floor(this.get("time_left") / 3600), minutes = Math.ceil((this.get("time_left") - 3600 * hours) / 60), 
[ hours, minutes ];
}, ContestModel.prototype.timerStep = function() {
var maxStep;
return maxStep = Math.min(Math.ceil(this.get("time_left") / 60), 600), Math.max(1, maxStep);
}, ContestModel.prototype.onTimer = function() {
var time_left;
return time_left = this.get("time_left") - this.getTimerStep(), time_left >= 0 ? (this.set("time_left", time_left), 
this.cacheSet()) :((this.collection || this).cachedFetch(), this.stopTimer());
}, ContestModel.prototype.nextMilestone = function() {
var time_left;
return time_left = this.get("time_left"), time_left ? (this.startTimer(), new Date($.now() + 1e3 * time_left)) :(this.stopTimer(), 
"");
}, ContestModel.prototype.modelCrumbs = function() {
var crumbs, slug;
return slug = this.get("slug") || this.slug, this.isMaster() ? crumbs = HR.collection("bread-crumbs") :(crumbs = ContestModel.__super__.modelCrumbs.call(this), 
crumbs.add({
id:"contests",
name:"Contests",
slug:"contests",
path:"/contests"
}, {
at:0
})), crumbs;
}, ContestModel.prototype.categories = function() {
var categories;
return categories = HR.collection("category", this.get("categories") || []);
}, ContestModel.prototype.currentCategories = function(category_slugs, autoFillMissing) {
var categories, currentCategories;
return null == autoFillMissing && (autoFillMissing = !1), category_slugs ? (categories = this.categories(), 
currentCategories = HR.collection("category"), _.each(category_slugs, function() {
return function(category_slug) {
var category;
return category = categories.findWhere({
slug:category_slug
}), currentCategories.add(category), category ? categories = category.children() :categories.first() && categories.first().children() ? categories = categories.first().children() :void 0;
};
}(this)), autoFillMissing && (currentCategories = currentCategories.defaultHierarchy())) :currentCategories = this.categories().defaultHierarchy(), 
currentCategories;
}, ContestModel.prototype.tracks = function() {
var tracks;
return tracks = HR.collection("track", this.get("categories") || []);
}, ContestModel.prototype.currentTracks = function(track_slugs, autoFillMissing) {
var currentTracks, tracks;
return null == autoFillMissing && (autoFillMissing = !1), track_slugs ? (tracks = this.tracks(), 
currentTracks = HR.collection("track"), _.each(track_slugs, function() {
return function(track_slug) {
var track;
return track = tracks.findWhere({
slug:track_slug
}), currentTracks.add(track), track ? tracks = track.children() :tracks.first() && tracks.first().children() ? tracks = tracks.first().children() :void 0;
};
}(this)), autoFillMissing && (currentTracks = currentTracks.defaultHierarchy())) :currentTracks = this.tracks().defaultHierarchy(), 
currentTracks;
}, ContestModel.prototype.breadCrumbs = function() {
return this.modelCrumbs();
}, ContestModel.prototype.cacheTimeout = 30, ContestModel.prototype.running = function() {
return this.started() && !this.ended();
}, ContestModel.prototype.upcoming = function() {
return !this.started();
}, ContestModel.prototype.started = function() {
return this.get("started");
}, ContestModel.prototype.ended = function() {
return this.get("ended");
}, ContestModel.prototype.setSlug = function(slug) {
return this.set("slug", slug);
}, ContestModel;
}(window.HR.GenericModel), HR = window.HR, HR.ContestModel = ContestModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardHistory, DashboardModel, DashboardProgressModel, HR, _ref;
return DashboardModel = function(_super) {
function DashboardModel() {
return DashboardModel.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardModel, _super), DashboardModel.prototype.restPrefix = !1, 
DashboardModel.prototype.baseURL = function() {
return "dashboard";
}, DashboardModel.prototype.restURL = function() {
var rest, _url;
return _url = "/rest" + this.ns(rest = !0) + this.baseURL(), "" + HR.restURL(_url, this.restPrefix);
}, DashboardModel;
}(window.HR.GenericModel), DashboardHistory = function(_super) {
function DashboardHistory() {
return DashboardHistory.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardHistory, _super), DashboardHistory;
}(window.HR.GenericModel), DashboardProgressModel = function(_super) {
function DashboardProgressModel() {
return DashboardProgressModel.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardProgressModel, _super), DashboardProgressModel.prototype.baseURL = function() {
return "dashboard/progress";
}, DashboardProgressModel.prototype.restURL = function() {
var rest, _url;
return _url = "/rest" + this.ns(rest = !0) + this.baseURL(), "" + HR.restURL(_url, this.restPrefix);
}, DashboardProgressModel.prototype.restPrefix = !1, DashboardProgressModel.prototype.tracks = function() {
return HR.collection("dashboard-progress", this.get("tracks") || []);
}, DashboardProgressModel.prototype.completion = function() {
return (this.get("completed") / this.get("total") * 100).round();
}, DashboardProgressModel.prototype.stats = function(track_id) {
var model;
return model = this.tracks().get(track_id) || this, {
category:model.get("category"),
completed:model.get("completed"),
completion:model.completion(),
total:model.get("total"),
languages:model.languagesDisplay()
};
}, DashboardProgressModel.prototype.languagesDisplay = function() {
var languages;
return languages = _.map(this.get("languages"), function() {
return function(language) {
return lang_display_mapping[language] || language;
};
}(this));
}, DashboardProgressModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardModel = DashboardModel, 
HR.DashboardHistory = DashboardHistory, HR.DashboardProgressModel = DashboardProgressModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var EmailPreferencesModel, HR;
return EmailPreferencesModel = function(_super) {
function EmailPreferencesModel() {
return EmailPreferencesModel.__super__.constructor.apply(this, arguments);
}
return __extends(EmailPreferencesModel, _super), EmailPreferencesModel.prototype.url = function() {
var username;
return username = this.username || this.get("username"), username ? "/rest/hackers/" + username + "/email_preferences" :void 0;
}, EmailPreferencesModel.prototype.setUsername = function(username) {
this.username = username;
}, EmailPreferencesModel.prototype.metaKeys = [ "metadata", "status" ], EmailPreferencesModel;
}(window.HR.GenericModel), HR = window.HR, HR.EmailPreferencesModel = EmailPreferencesModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GameModel, HR, _ref;
return GameModel = function(_super) {
function GameModel() {
return GameModel.__super__.constructor.apply(this, arguments);
}
return __extends(GameModel, _super), GameModel.prototype.url = function() {
var id;
return id = this.get("id"), this.contest_slug ? "/rest/contests/" + this.contest_slug + "/games/" + id :"/rest/contests/" + HR.appController.get_current_contest_slug() + "/games/" + id;
}, GameModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.GameModel = GameModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GameSetModel, HR, _ref;
return GameSetModel = function(_super) {
function GameSetModel() {
return GameSetModel.__super__.constructor.apply(this, arguments);
}
return __extends(GameSetModel, _super), GameSetModel.prototype.url = function() {
var i, num_players, players, tag, _i, _ref;
for (num_players = this.get("num_players"), players = [], i = _i = 1, _ref = num_players + 1; _ref >= 1 ? _ref > _i :_i > _ref; i = _ref >= 1 ? ++_i :--_i) players[i - 1] = this.get("player" + i);
return players.sort(function(a, b) {
return a - b;
}), tag = players.join("-"), this.contest_slug ? "/rest/contests/" + this.contest_slug + "/gamesets/" + tag :"/rest/contests/" + HR.appController.get_current_contest_slug() + "/gamesets/" + tag;
}, GameSetModel.prototype.parse = function(resp, xhr) {
var _models;
return xhr ? resp.model.length > 0 ? (_models = resp.model[0].games, this.set(resp.model[0])) :_models = resp.model.games :_models = resp.games, 
this.genGameCollection(_models), GameSetModel.__super__.parse.call(this, resp, xhr);
}, GameSetModel.prototype.genGameCollection = function(_models) {
return null == _models && (_models = null), null === _models && (_models = this.get("games")), 
this.game_collection = new HR.GameCollection(), _.each(_models, function(_model) {
var model;
return this.game_collection.get(_model.id) && this.game_collection.get(_model.id).get("updated_at") === _model.updated_at ? void 0 :this.game_collection.get(_model.id) ? (model = this.game_collection.get(_model.id), 
model.set(_model), model.sync_status = !0) :(model = new HR.GameModel(_model), model.sync_status = !0, 
this.game_collection.add(model));
}, this);
}, GameSetModel.prototype.getGameCollection = function() {
return this.game_collection || this.genGameCollection(), this.game_collection;
}, GameSetModel.prototype.add = function(gameModel) {
return this.game_collection || (this.game_collection = new HR.GameCollection()), 
gameModel.sync_status = !0, this.game_collection.add(gameModel);
}, GameSetModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.GameSetModel = GameSetModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerApplicationModel;
return HackerApplicationModel = function(_super) {
function HackerApplicationModel() {
return HackerApplicationModel.__super__.constructor.apply(this, arguments);
}
return __extends(HackerApplicationModel, _super), HackerApplicationModel.prototype.url = function() {
var id;
return this.id || this.get("id") ? (id = this.id ? this.id :this.get("id"), "/rest/contests/" + this.contest_slug + "/hackerapplications/" + id) :"/rest/contests/" + this.contest_slug + "/hackerapplications";
}, HackerApplicationModel.prototype.setId = function(id) {
this.id = id;
}, HackerApplicationModel;
}(window.HR.GenericModel), HR = window.HR, HR.HackerApplicationModel = HackerApplicationModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerChallengeModel;
return HackerChallengeModel = function(_super) {
function HackerChallengeModel() {
return HackerChallengeModel.__super__.constructor.apply(this, arguments);
}
return __extends(HackerChallengeModel, _super), HackerChallengeModel.prototype.url = function() {
return this.filter ? "/rest/contests/" + this.contest.id + "/hackers/" + this.hackerId + "/challenges/submissions?challenge_id=" + this.id + "&" + this.filter :"/rest/contests/" + this.contest.id + "/hackers/" + this.hackerId + "/challenges/submissions?challenge_id=" + this.id + "&key=" + this.key;
}, HackerChallengeModel.prototype.setId = function(id) {
this.id = id;
}, HackerChallengeModel.prototype.setFilterString = function(filter) {
this.filter = filter;
}, HackerChallengeModel.prototype.setHackerId = function(hackerId) {
this.hackerId = hackerId;
}, HackerChallengeModel.prototype.setKey = function(key) {
this.key = key;
}, HackerChallengeModel.prototype.setContest = function(contest) {
this.contest = contest;
}, HackerChallengeModel.prototype.parse = function(resp, xhr) {
return resp.model ? (_.each(resp.model, function() {
return function(val, key) {
return null === val || "null" === val ? resp.model[key] = "" :void 0;
};
}(this)), resp.model) :_.each(resp, function() {
return function(val, key) {
return null === val || "null" === val ? resp[key] = "" :void 0;
};
}(this)), HackerChallengeModel.__super__.parse.call(this, resp, xhr);
}, HackerChallengeModel;
}(window.HR.GenericModel), HR = window.HR, HR.HackerChallengeModel = HackerChallengeModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerLeaderboardStatsModel;
return HackerLeaderboardStatsModel = function(_super) {
function HackerLeaderboardStatsModel() {
return HackerLeaderboardStatsModel.__super__.constructor.apply(this, arguments);
}
return __extends(HackerLeaderboardStatsModel, _super), HackerLeaderboardStatsModel.prototype.url = function() {
return "/rest/contests/master/hackers/" + this.id + "/leaderboard_data";
}, HackerLeaderboardStatsModel.prototype.setId = function(id) {
this.id = id;
}, HackerLeaderboardStatsModel;
}(window.HR.GenericModel), HR = window.HR || {}, HR.HackerLeaderboardStatsModel = HackerLeaderboardStatsModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerMerge;
return HackerMerge = function(_super) {
function HackerMerge() {
return HackerMerge.__super__.constructor.apply(this, arguments);
}
return __extends(HackerMerge, _super), HackerMerge.prototype.urlRoot = "/rest/hacker_merges/", 
HackerMerge;
}(Backbone.Model), HR = window.HR, HR.HackerMerge = HackerMerge;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerProfileModel;
return HackerProfileModel = function(_super) {
function HackerProfileModel() {
return HackerProfileModel.__super__.constructor.apply(this, arguments);
}
return __extends(HackerProfileModel, _super), HackerProfileModel.prototype.url = function() {
return "/rest/contests/master/hackers/" + this.id + "/profile";
}, HackerProfileModel.prototype.idAttribute = "username", HackerProfileModel.prototype.showLoader = !1, 
HackerProfileModel.prototype.follow = function(callback) {
var that;
return that = this, $.ajax({
url:"/rest/profile/follow",
data:{
hacker:this.username()
},
type:"PUT",
success:function(data) {
return callback(data);
}
});
}, HackerProfileModel.prototype.unfollow = function(callback) {
return $.ajax({
url:"/rest/profile/unfollow",
data:{
hacker:this.username()
},
type:"PUT",
success:function(data) {
return callback(data);
}
});
}, HackerProfileModel;
}(window.HR.GenericModel), HR = window.HR || {}, HR.HackerProfileModel = HackerProfileModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerProgressModel;
return HackerProgressModel = function(_super) {
function HackerProgressModel() {
return HackerProgressModel.__super__.constructor.apply(this, arguments);
}
return __extends(HackerProgressModel, _super), HackerProgressModel.prototype.url = function() {
return this.track_id ? "/rest/contests/" + HR.appController.get_current_contest_slug() + "/mods/" + this.mod_id + "/tracks/" + this.type_id + "/progress_history" :this.mod_id ? "/rest/contests/" + HR.appController.get_current_contest_slug() + "/mods/" + this.mod_id + "/progress_history" :"/rest/contests/" + HR.appController.get_current_contest_slug() + "/progress_history";
}, HackerProgressModel.prototype.setModule = function(mod_id) {
this.mod_id = mod_id;
}, HackerProgressModel.prototype.setTrack = function(track_id) {
this.track_id = track_id;
}, HackerProgressModel.prototype.parse = function(resp, xhr) {
return HackerProgressModel.__super__.parse.call(this, resp, xhr);
}, HackerProgressModel;
}(window.HR.GenericModel), HR = window.HR, HR.HackerProgressModel = HackerProgressModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, LeaderboardModel;
return LeaderboardModel = function(_super) {
function LeaderboardModel() {
return LeaderboardModel.__super__.constructor.apply(this, arguments);
}
return __extends(LeaderboardModel, _super), LeaderboardModel;
}(window.HR.GenericModel), HR = window.HR || {}, HR.LeaderboardModel = LeaderboardModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ChallengeAssociationModel, HR;
return ChallengeAssociationModel = function(_super) {
function ChallengeAssociationModel() {
return ChallengeAssociationModel.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeAssociationModel, _super), ChallengeAssociationModel.prototype.defaults = function() {
var attr;
return attr = {
challenge:{
name:""
},
priority:0,
weight:100,
mod_id:"",
track_id:"",
dynamic:!1
};
}, ChallengeAssociationModel.prototype.save = function() {
return Backbone.Model.prototype.save.apply(this, arguments);
}, ChallengeAssociationModel.prototype.set = function(attributes, options) {
return ChallengeAssociationModel.__super__.set.call(this, attributes, options);
}, ChallengeAssociationModel.prototype.url = function() {
return this.id && !this.isNew() ? "/rest/contests/" + this.contestId + "/challengeassociations/" + this.id :this.contestId ? "/rest/contests/" + this.contestId + "/challengeassociations/" :"/rest/contests/" + this.get("contest_id") + "/challengeassociations/";
}, ChallengeAssociationModel.prototype.setId = function(id) {
this.id = id;
}, ChallengeAssociationModel;
}(window.HR.GenericModel), HR = window.HR, HR.ChallengeAssociationModel = ChallengeAssociationModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ChallengeModel;
return Manage_ChallengeModel = function(_super) {
function Manage_ChallengeModel() {
return Manage_ChallengeModel.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ChallengeModel, _super), Manage_ChallengeModel.prototype.defaults = function() {
var attr;
return attr = {
name:"",
slug:"",
preview:"",
body:"",
kind:"",
_data:{},
submit_disabled:!1
};
}, Manage_ChallengeModel.prototype.url = function() {
var id;
return this.id ? (id = this.id, "/manage/challenges/" + id + "?all=true") :"/manage/challenges";
}, Manage_ChallengeModel.prototype.setId = function(id) {
this.id = id;
}, Manage_ChallengeModel.prototype.parse = function(resp, xhr) {
return resp.model ? (_.each(resp.model, function() {
return function(val, key) {
return null === val || "null" === val ? resp.model[key] = "" :void 0;
};
}(this)), resp.model) :_.each(resp, function() {
return function(val, key) {
return null === val || "null" === val ? resp[key] = "" :void 0;
};
}(this)), Manage_ChallengeModel.__super__.parse.call(this, resp, xhr);
}, Manage_ChallengeModel;
}(window.HR.GenericModel), HR = window.HR, HR.Manage_ChallengeModel = Manage_ChallengeModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ContestModel;
return Manage_ContestModel = function(_super) {
function Manage_ContestModel() {
return Manage_ContestModel.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ContestModel, _super), Manage_ContestModel.prototype.defaults = function() {
var attr;
return attr = {
name:"",
slug:"",
description:"",
challenge_placeholder_template:"",
notification:[],
epoch_starttime:new Date().getTime(),
epoch_endtime:new Date().getTime() + 864e5,
scoring_template:"",
faq_template:"",
homepage:"",
cutoff_score:0,
starttime:"",
endtime:"",
homepage_background_color:"",
homepage_background_image:"",
tagline:"",
"public":!1,
prizes:"",
enable_olark:!1,
submit_disabled:!1,
hacker_application:!1
};
}, Manage_ContestModel.prototype.set = function(attributes, options) {
return Manage_ContestModel.__super__.set.call(this, attributes, options);
}, Manage_ContestModel.prototype.url = function() {
return this.id ? "/rest/contests/" + this.id + "?all=true" :"/rest/contests";
}, Manage_ContestModel.prototype.setId = function(id) {
return this.id = id, this;
}, Manage_ContestModel.prototype.parse = function(resp, xhr) {
var offset;
return offset = 60 * new Date().getTimezoneOffset() * 1e3, resp.model ? (resp.model.epoch_starttime && (null !== resp.model.epoch_starttime && (resp.model.epoch_starttime = 1e3 * resp.model.epoch_starttime + offset), 
null !== resp.model.epoch_endtime && (resp.model.epoch_endtime = 1e3 * resp.model.epoch_endtime + offset)), 
_.each(resp.model, function() {
return function(val, key) {
return null === val || "null" === val ? resp.model[key] = "" :void 0;
};
}(this))) :_.each(resp, function() {
return function(val, key) {
return null === val || "null" === val ? resp[key] = "" :void 0;
};
}(this)), Manage_ContestModel.__super__.parse.call(this, resp, xhr);
}, Manage_ContestModel;
}(window.HR.GenericModel), HR = window.HR, HR.Manage_ContestModel = Manage_ContestModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_NotificationModel;
return Manage_NotificationModel = function(_super) {
function Manage_NotificationModel() {
return Manage_NotificationModel.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_NotificationModel, _super), Manage_NotificationModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
_.extend(this.attributes, attributes), Manage_NotificationModel.__super__.initialize.call(this, attributes, options);
}, Manage_NotificationModel.prototype.url = "/manage/contest_broadcasts/", Manage_NotificationModel;
}(window.HR.GenericModel), HR = window.HR, HR.Manage_NotificationModel = Manage_NotificationModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_Moderator, _ref;
return Manage_Moderator = function(_super) {
function Manage_Moderator() {
return Manage_Moderator.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_Moderator, _super), Manage_Moderator.prototype.url = function() {
return this.get("id") ? "/manage/permissions/" + this.id :"/manage/permissions/?permissible_id=" + this.get("permissible_id") + "&permissible_type=" + this.get("permissible_type");
}, Manage_Moderator;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_Moderator = Manage_Moderator;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_TemplateModel;
return Manage_TemplateModel = function(_super) {
function Manage_TemplateModel() {
return Manage_TemplateModel.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_TemplateModel, _super), Manage_TemplateModel.prototype.defaults = function() {
var attr;
return attr = {
slug:"",
body:""
};
}, Manage_TemplateModel.prototype.url = function() {
var id;
return this.id ? (id = this.id, "/rest/templates/" + id) :"/rest/templates";
}, Manage_TemplateModel.prototype.setId = function(id) {
this.id = id;
}, Manage_TemplateModel.prototype.parse = function(resp, xhr) {
return resp.model ? (_.each(resp.model, function() {
return function(val, key) {
return null === val || "null" === val ? resp.model[key] = "" :void 0;
};
}(this)), resp.model) :_.each(resp, function() {
return function(val, key) {
return null === val || "null" === val ? resp[key] = "" :void 0;
};
}(this)), Manage_TemplateModel.__super__.parse.call(this, resp, xhr);
}, Manage_TemplateModel;
}(window.HR.GenericModel), HR = window.HR, HR.Manage_TemplateModel = Manage_TemplateModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, MarkdownModel;
return MarkdownModel = function(_super) {
function MarkdownModel() {
return MarkdownModel.__super__.constructor.apply(this, arguments);
}
return __extends(MarkdownModel, _super), MarkdownModel.prototype.url = function() {
return "/rest/markdown";
}, MarkdownModel;
}(window.HR.GenericModel), HR = window.HR, HR.MarkdownModel = MarkdownModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, MessageModel;
return MessageModel = function(_super) {
function MessageModel() {
return MessageModel.__super__.constructor.apply(this, arguments);
}
return __extends(MessageModel, _super), MessageModel.prototype.initialize = function() {}, 
MessageModel.prototype.url = function() {
return this.id ? "rest/messages/" + this.id :"rest/messages";
}, MessageModel;
}(window.HR.GenericModel), HR = window.HR, HR.MessageModel = MessageModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, MessageThreadModel;
return MessageThreadModel = function(_super) {
function MessageThreadModel() {
return MessageThreadModel.__super__.constructor.apply(this, arguments);
}
return __extends(MessageThreadModel, _super), MessageThreadModel.prototype.initialize = function() {}, 
MessageThreadModel.prototype.url = function() {
return this.id ? "rest/threads/" + this.id :"rest/threads";
}, MessageThreadModel.prototype.setLastMessage = function(last_message) {
this.last_message = last_message;
}, MessageThreadModel.prototype.markAsUnread = function() {
var that;
return that = this, $.ajax({
url:"/rest/threads/" + this.id + "/unread",
success:function() {
return that.set("unread_count", 1);
}
});
}, MessageThreadModel.prototype.markAsRead = function() {
var that;
return that = this, $.ajax({
url:"/rest/threads/" + this.id + "/read",
success:function() {
return that.set("unread_count", 0), HR.appView.sidebarView.updateNotificationsCount();
}
});
}, MessageThreadModel;
}(window.HR.GenericModel), HR = window.HR, HR.MessageThreadModel = MessageThreadModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NetworksModel;
return NetworksModel = function(_super) {
function NetworksModel() {
return NetworksModel.__super__.constructor.apply(this, arguments);
}
return __extends(NetworksModel, _super), NetworksModel.prototype.setUsername = function(username) {
return this.username = username;
}, NetworksModel.prototype.baseURL = function() {
var id, username;
return id = this.id || this.get("id"), username = this.username || this.get("username"), 
username ? "hackers/" + username :"hackers/me";
}, NetworksModel.prototype.cacheRefetch = !1, NetworksModel.prototype.isEmpty = function() {
var _model;
return this.sync_status === !0 ? (_model = this.toJSON(), _model.school && "" !== _model.school || _model.company && "" !== _model.company || _model.country && "" !== _model.country ? !1 :!0) :!1;
}, NetworksModel.prototype.isPartialEmpty = function() {
var _model;
return this.sync_status === !0 ? (_model = this.toJSON(), _model.school && "" !== _model.school && _model.company && "" !== _model.company && _model.country && "" !== _model.country && _model.fb_uid ? !1 :!0) :!1;
}, NetworksModel;
}(window.HR.GenericModel), HR = window.HR, HR.NetworksModel = NetworksModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NotificationModel;
return NotificationModel = function(_super) {
function NotificationModel() {
return NotificationModel.__super__.constructor.apply(this, arguments);
}
return __extends(NotificationModel, _super), NotificationModel.prototype.STATUS_CODE = {
0:"UNSEEN",
1:"UNREAD",
2:"READ",
3:"ARCHIVED",
4:"DELETED",
5:"SKIPPED"
}, NotificationModel.prototype.STATUS = {
UNSEEN:0,
UNREAD:1,
READ:2,
ARCHIVED:3,
DELETED:4,
SKIPPED:5
}, NotificationModel.prototype.STATUS_TEXT = {
UNSEEN:"unseen",
UNREAD:"unread",
READ:"read",
ARCHIVED:"archived",
DELETED:"deleted",
SKIPPED:"skipped"
}, NotificationModel.prototype.markSeen = function() {
return this.get("notification_status") === this.STATUS.UNSEEN ? (this.set("notification_status", this.STATUS.UNREAD), 
this.save(null, {
success:function() {}
})) :void 0;
}, NotificationModel.prototype.markRead = function() {
var id;
return this.get("notification_status") <= this.STATUS.UNREAD ? (this.set("notification_status", this.STATUS.READ), 
id = this.get("id"), this.save(null, {
success:function(model, resp) {
return HR.cachedNotificationsCollection && HR.cachedNotificationsCollection.remove(id), 
HR.appView.navigationView.updateNotificationsCount(resp.unread_count);
}
})) :void 0;
}, NotificationModel.prototype.url = function() {
return "/rest/contests/" + HR.appController.get_current_contest_slug() + "/notifications/" + this.get("id");
}, NotificationModel;
}(window.HR.GenericModel), HR = window.HR, HR.NotificationModel = NotificationModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, PlayoffModel;
return PlayoffModel = function(_super) {
function PlayoffModel() {
return PlayoffModel.__super__.constructor.apply(this, arguments);
}
return __extends(PlayoffModel, _super), PlayoffModel;
}(window.HR.GenericModel), HR = window.HR, HR.PlayoffModel = PlayoffModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ProfileModel;
return ProfileModel = function(_super) {
function ProfileModel() {
return ProfileModel.__super__.constructor.apply(this, arguments);
}
return __extends(ProfileModel, _super), ProfileModel.prototype.baseURL = function() {
var id, me, username;
return id = this.id || this.get("id"), username = this.username || this.get("username"), 
me = this.me || this.get("me") || !(id || username), me ? "hackers/me" :username ? "hackers/" + username :id ? "hackers/" + id :void 0;
}, ProfileModel.prototype.cacheTimeout = 300, ProfileModel.prototype.setUsername = function(username) {
this.username = username;
}, ProfileModel.prototype.setId = function(id) {
this.id = id;
}, ProfileModel.prototype.keyPrefix = function() {
return HR.key_prefix;
}, ProfileModel.prototype.isLoggedIn = function() {
return 0 !== _.size(this.toJSON()) && this.id ? !0 :!1;
}, ProfileModel.prototype.isEmpty = function() {
var _model;
return this.sync_status === !0 ? (_model = this.toJSON(), _model.school && "" !== _model.school || _model.company && "" !== _model.company || _model.country && "" !== _model.country ? !1 :!0) :!1;
}, ProfileModel.prototype.isPartialEmpty = function() {
var _model;
return this.sync_status === !0 ? (_model = this.toJSON(), _model.school && "" !== _model.school && _model.company && "" !== _model.company && _model.country && "" !== _model.country && _model.fb_uid ? !1 :!0) :!1;
}, ProfileModel.prototype.save = function() {
return Backbone.Model.prototype.save.apply(this, arguments);
}, ProfileModel;
}(window.HR.GenericModel), HR = window.HR, HR.ProfileModel = ProfileModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, QuestionModel;
return QuestionModel = function(_super) {
function QuestionModel() {
return QuestionModel.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionModel, _super), QuestionModel.prototype.initialize = function() {
return this.listenTo(this, "reset change", this.cleanTag), this.listenToOnce(this, "reset", this.setChallenge);
}, QuestionModel.prototype.cleanTag = function() {
return this.set("tags", this.get("tags") || []);
}, QuestionModel.prototype.baseURL = function() {
return this.id ? "challenges/" + this.get("challenge_slug") + "/questions/" + this.id :"challenges/" + this.get("challenge_slug") + "/questions";
}, QuestionModel.prototype.pageURL = function() {
return QuestionModel.__super__.pageURL.call(this).replace("/questions", "/forum/questions");
}, QuestionModel.prototype.setChallenge = function() {
return this.log("Setting challenge"), this.challenge = HR.model("challenge", {
slug:this.get("challenge_slug"),
contest_slug:this.contest_slug || this.get("contest_slug")
}), this.challenge.cached();
}, QuestionModel.prototype.modelCrumbs = function() {
var crumbs;
return crumbs = HR.collection("bread-crumbs"), this.challenge || this.setChallenge(), 
this.challenge.id || this.listenToOnce(this.challenge, "reset", this.breadCrumbs), 
crumbs.merge(this.challenge.modelCrumbs()), crumbs.add({
id:"" + this.challenge.get("slug") + "-forums",
slug:"" + this.challenge.get("slug") + "-forums",
name:"Discussions",
path:"" + this.challenge.pageURL() + "/forum/questions"
}), crumbs;
}, QuestionModel;
}(window.HR.GenericModel), HR = window.HR, HR.QuestionModel = QuestionModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, RecommendedChallengeModel;
return RecommendedChallengeModel = function(_super) {
function RecommendedChallengeModel() {
return RecommendedChallengeModel.__super__.constructor.apply(this, arguments);
}
return __extends(RecommendedChallengeModel, _super), RecommendedChallengeModel.prototype.initialize = function(options) {
return this.tag = options.tag || "", this.type = options.type || "";
}, RecommendedChallengeModel.prototype.url = function() {
return "/rest/challenges/recommended?tag=" + this.tag + "&type=" + this.type;
}, RecommendedChallengeModel;
}(window.HR.GenericModel), HR = window.HR, HR.RecommendedChallengeModel = RecommendedChallengeModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SecondaryEmailModel;
return SecondaryEmailModel = function(_super) {
function SecondaryEmailModel() {
return SecondaryEmailModel.__super__.constructor.apply(this, arguments);
}
return __extends(SecondaryEmailModel, _super), SecondaryEmailModel.prototype.urlRoot = "/rest/secondary_emails", 
SecondaryEmailModel.prototype.url = Backbone.Model.prototype.url, SecondaryEmailModel.prototype.idAttribute = "email64", 
SecondaryEmailModel.prototype.resend_confirmation = function(success) {
return $.ajax({
url:"" + this.url() + "/resend_confirmation",
type:"POST",
success:function(data) {
return success(data);
}
});
}, SecondaryEmailModel.prototype.make_primary = function(success) {
return $.ajax({
url:"" + this.url() + "/make_primary",
type:"PUT",
success:function(data) {
return success(data);
}
});
}, SecondaryEmailModel;
}(window.HR.GenericModel), HR = window.HR, HR.SecondaryEmailModel = SecondaryEmailModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SubmissionModel, _ref;
return SubmissionModel = function(_super) {
function SubmissionModel() {
return SubmissionModel.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionModel, _super), SubmissionModel.prototype.initialize = function() {
return this.time = 3e3, this.count = 0, this.listenToOnce(this, "reset", function(_this) {
return function() {
return _this.setChallenge();
};
}(this));
}, SubmissionModel.prototype.baseURL = function() {
var path;
return path = "", this.challenge instanceof Backbone.Model && (path += "challenges/" + (this.challenge.get("slug") || this.get("challenge_slug")) + "/"), 
path += _.isFinite(parseInt(this.get("id"), 10)) ? "submissions/" + this.id :"submissions";
}, SubmissionModel.prototype.cacheTimeout = 10, SubmissionModel.prototype.setChallenge = function(challenge) {
return this.challenge = challenge, this.challenge || (this.challenge = this.get("challenge_slug") || this.get("slug")), 
this.challenge instanceof Backbone.Model || !this.challenge ? void 0 :(this.challenge_slug = this.challenge, 
this.challenge = HR.model("challenge", {
slug:this.challenge_slug,
contest_slug:this.contest_slug || this.get("contest_slug")
}), this.challenge.cached({
success:function(_this) {
return function() {
return _this.trigger("reset");
};
}(this)
}));
}, SubmissionModel.prototype.pageURL = function() {
return "" + this.ns() + "submissions/" + this.get("kind") + "/" + this.get("id");
}, SubmissionModel.prototype.modelCrumbs = function() {
var crumbs;
return crumbs = HR.collection("bread-crumbs"), this.challenge && (this.challenge.id || this.listenToOnce(this.challenge, "reset", this.breadCrumbs), 
crumbs.merge(this.challenge.modelCrumbs())), crumbs;
}, SubmissionModel.prototype.parse = function(resp, xhr) {
var $panel, original_response, social_share, that, url, url_prefix, url_suffix, _base, _base1, _name, _name1;
return original_response = resp, xhr && resp.status === !0 || !xhr ? SubmissionModel.__super__.parse.call(this, resp, xhr) :(xhr && (resp = resp.model), 
that = this, resp && resp.id && this.checker_processed(resp) && this.score_processed(resp) && HR.QUEUED_SUBMISSIONS && HR.QUEUED_SUBMISSIONS[resp.id] && (HR.QUEUED_SUBMISSIONS[resp.id] = void 0, 
$panel = $("#submission-success-messages").find("#submission-model-" + resp.id), 
0 === $panel.length && ($("#submission-success-messages").append("<div id='submission-model-" + resp.id + "' style='display: none;' class='submission-model-panel'></div>"), 
$panel = $("#submission-success-messages").find("#submission-model-" + resp.id)), 
this.submission_success_view || (this.submission_success_view = new HR.SubmissionSuccessView({
model:resp
})), HR.QUEUED_SUBMISSIONS_VIEWS || (HR.QUEUED_SUBMISSIONS_VIEWS = {}), (_base = HR.QUEUED_SUBMISSIONS_VIEWS)[_name = resp.id] || (_base[_name] = this.submission_success_view), 
_.each(_.keys(HR.QUEUED_SUBMISSIONS_VIEWS), function(key) {
return parseInt(key) !== parseInt(resp.id) && void 0 !== HR.QUEUED_SUBMISSIONS_VIEWS[key] ? (HR.QUEUED_SUBMISSIONS_VIEWS[key].destroy(), 
HR.QUEUED_SUBMISSIONS_VIEWS[key] = void 0) :void 0;
}), this.submission_success_view.setElement($panel).render(), resp.unlocked_challenges && (url_prefix = document.location.protocol + "//" + document.location.host, 
url_suffix = "" + HR.appController.get_current_contest_slug_url(), url = url_prefix + url_suffix, 
social_share = new HR.SocialShareView({
title:"Challenge Unlock",
message:"Congratulations you have unlocked " + resp.unlocked_challenges + "!",
tweet:"I have unlocked " + resp.unlocked_challenges + " on hackerrank " + url,
url:url,
type:"unlock"
}), social_share.render())), !resp || this.checker_processed(resp) && this.score_processed(resp) || (HR.subFetchThrottle || (HR.subFetchThrottle = {}), 
(_base1 = HR.subFetchThrottle)[_name1 = resp.id] || (_base1[_name1] = _.throttle(function() {
return that.fetch({
disableThrobber:!0
});
}, this.time - 50)), setTimeout(function() {
return HR.subFetchThrottle[resp.id]();
}, this.time)), SubmissionModel.__super__.parse.call(this, original_response, xhr));
}, SubmissionModel.prototype.checker_processed = function(resp) {
return 0 === resp.status_code || 3 === resp.status_code ? !1 :!0;
}, SubmissionModel.prototype.score_processed = function(resp) {
return 0 === resp.score_processed || 2 === resp.score_processed ? !1 :!0;
}, SubmissionModel.prototype.getCurrentPage = function() {
return this.page;
}, SubmissionModel.prototype.getTotalGameData = function() {
return this.gamedata && this.gamedata.total ? this.gamedata.total :0;
}, SubmissionModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionModel = SubmissionModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TeamMemberModel;
return TeamMemberModel = function(_super) {
function TeamMemberModel() {
return TeamMemberModel.__super__.constructor.apply(this, arguments);
}
return __extends(TeamMemberModel, _super), TeamMemberModel.prototype.url = function() {
return this.get("id") ? "/rest/teams/" + this.get("team_id") + "/members/" + this.get("id") :"/rest/teams/" + this.get("team_id") + "/members";
}, TeamMemberModel;
}(window.HR.GenericModel), HR = window.HR, HR.TeamMemberModel = TeamMemberModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TeamModel;
return TeamModel = function(_super) {
function TeamModel() {
return TeamModel.__super__.constructor.apply(this, arguments);
}
return __extends(TeamModel, _super), TeamModel.prototype.url = function() {
return this.get("id") ? "/rest/teams/" + this.get("id") :!this.get("contest_id") || this.get("name") || this.get("slug") ? "/rest/teams" :"/rest/contests/" + this.get("contest_id") + "/teams";
}, TeamModel.prototype.members = function() {
return !this._members && this.sync_status && (this._members = new HR.TeamMembersCollection(), 
_.each(this.get("members"), function(member) {
return member.team_id = this.get("id"), this._members.add(new HR.TeamMemberModel(member));
}, this)), this._members || new HR.TeamMembersCollection();
}, TeamModel;
}(window.HR.GenericModel), HR = window.HR, HR.TeamModel = TeamModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TestCaseModel;
return TestCaseModel = function(_super) {
function TestCaseModel() {
return TestCaseModel.__super__.constructor.apply(this, arguments);
}
return __extends(TestCaseModel, _super), TestCaseModel.prototype.defaults = function() {
var attr;
return attr = {
input:"",
input_text:"",
output:"",
output_text:"",
score:0,
sample:!1
};
}, TestCaseModel.prototype.set = function(attributes, options) {
return TestCaseModel.__super__.set.call(this, attributes, options);
}, TestCaseModel.prototype.url = function() {
var data;
return data = "", this.data && (data = "?data="), this.id ? "/rest/challenges/" + this.challenge_id + "/testcases/" + this.id + data :"/rest/challenges/" + this.challenge_id + "/testcases/" + data;
}, TestCaseModel.prototype.setId = function(id) {
this.id = id;
}, TestCaseModel.prototype.setChallengeId = function(challenge_id) {
this.challenge_id = challenge_id;
}, TestCaseModel.prototype.getEditData = function() {
return this.data = !0;
}, TestCaseModel.prototype.parse = function(resp) {
return resp.model ? resp.model :resp;
}, TestCaseModel;
}(window.HR.GenericModel), HR = window.HR, HR.TestCaseModel = TestCaseModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TrackModel, _ref;
return TrackModel = function(_super) {
function TrackModel() {
return TrackModel.__super__.constructor.apply(this, arguments);
}
return __extends(TrackModel, _super), TrackModel.prototype.children = function() {
return this._children || (this._children = HR.collection("track"), _.isArray(this.get("children")) && (this._children.set(this.get("children")), 
this._children.each(function(_this) {
return function(child) {
return child.parent = _this;
};
}(this)))), this._children;
}, TrackModel.prototype.pageURL = function() {
return this.baseURL();
}, TrackModel.prototype.baseURL = function() {
var path;
return path = "tracks", this.parent && (path += "/" + this.parent.get("slug")), 
path += "/" + this.get("slug");
}, TrackModel.prototype.defaultHierarchy = function() {
var children, firstChild;
return children = HR.collection("track", [ this ]), firstChild = this.children().first(), 
firstChild && children.merge(firstChild.defaultHierarchy()), children;
}, TrackModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.TrackModel = TrackModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CampusRepReferralModel, HR, _ref;
return CampusRepReferralModel = function(_super) {
function CampusRepReferralModel() {
return CampusRepReferralModel.__super__.constructor.apply(this, arguments);
}
return __extends(CampusRepReferralModel, _super), CampusRepReferralModel.prototype.url = function() {
return "/rest/campus_rep_hackers";
}, CampusRepReferralModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.CampusRepReferralModel = CampusRepReferralModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeLanguageModel, HR;
return Administration_ChallengeLanguageModel = function(_super) {
function Administration_ChallengeLanguageModel() {
return Administration_ChallengeLanguageModel.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeLanguageModel, _super), Administration_ChallengeLanguageModel.prototype.url = function() {
return "/rest/administration/challenges/" + this.get("challenge_id") + "/languages";
}, Administration_ChallengeLanguageModel;
}(window.HR.GenericModel), HR = window.HR, HR.Administration_ChallengeLanguageModel = Administration_ChallengeLanguageModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeModel, HR;
return Administration_ChallengeModel = function(_super) {
function Administration_ChallengeModel() {
return Administration_ChallengeModel.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeModel, _super), Administration_ChallengeModel.prototype.url = function() {
var _url;
return _url = "/rest/administration", this.get("contest_id") ? (_url += "/contests/" + this.get("contest_id") + "/challenges", 
this.get("challenge_id") && (_url += "/" + this.get("challenge_id"))) :_url += this.get("id") ? "/challenges/" + this.get("id") :this.get("challenge_id") ? "/challenges/" + this.get("challenge_id") :"/challenges", 
_url;
}, Administration_ChallengeModel.prototype.max_limit = {
description:300
}, Administration_ChallengeModel.prototype.toggleLanguage = function(data) {
var languages;
return languages = this.get("languages"), languages = "enable" === data.state ? _.union(languages, [ data.language_key ]) :_.without(languages, data.language_key), 
this.set("languages", languages), $.ajax("" + this.url() + "/allowed_languages", {
type:"PUT",
data:{
languages:languages
}
});
}, Administration_ChallengeModel.prototype.mod_url = function(username) {
return "" + this.url() + "/moderator?username=" + username;
}, Administration_ChallengeModel.prototype.getTags = function() {
return this.get("tags") ? this.get("tags") :[];
}, Administration_ChallengeModel.prototype.get_checker_limit = function(field, lang_key) {
var checkerlimits, result;
return result = void 0, checkerlimits = this.get("checkerlimits"), checkerlimits && checkerlimits[lang_key] && ("time" === field ? result = checkerlimits[lang_key].timelimit :"mem" === field && (result = checkerlimits[lang_key].memorylimit)), 
result;
}, Administration_ChallengeModel.prototype.update_language_data = function(lang_data, lang_key) {
var checkerlimits;
return (void 0 !== lang_data.time_limit || void 0 !== lang_data.mem_limit) && (checkerlimits = this.get("checkerlimits"), 
checkerlimits || (checkerlimits = {}), lang_data = checkerlimits[lang_key], lang_data || (lang_data = {}), 
void 0 !== lang_data.time_limit && (lang_data.timelimit = parseInt(lang_data.time_limit)), 
void 0 !== lang_data.mem_limit && (lang_data.timelimit = parseInt(lang_data.mem_limit)), 
checkerlimits[lang_key] = lang_data, this.set("checkerlimits", lang_data)), void 0 !== lang_data.template_head && this.set("" + lang_key + "_template_head", lang_data.template_head), 
void 0 !== lang_data.template_body && this.set("" + lang_key + "_template", lang_data.template_body), 
void 0 !== lang_data.template_tail ? this.set("" + lang_key + "_template_tail", lang_data.template_tail) :void 0;
}, Administration_ChallengeModel;
}(window.HR.GenericModel), HR = window.HR, HR.Administration_ChallengeModel = Administration_ChallengeModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyHackerShortlistModel, HR;
return Administration_CompanyHackerShortlistModel = function(_super) {
function Administration_CompanyHackerShortlistModel() {
return Administration_CompanyHackerShortlistModel.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyHackerShortlistModel, _super), Administration_CompanyHackerShortlistModel.prototype.url = function() {
return "/rest/administration/companies/" + this.get("company_id") + "/contests/" + this.get("contest_id") + "/hackers/" + this.get("hacker_id") + "/hackerboard/shortlist";
}, Administration_CompanyHackerShortlistModel;
}(window.HR.GenericModel), HR = window.HR, HR.Administration_CompanyHackerShortlistModel = Administration_CompanyHackerShortlistModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyModel, HR;
return Administration_CompanyModel = function(_super) {
function Administration_CompanyModel() {
return Administration_CompanyModel.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyModel, _super), Administration_CompanyModel.prototype.url = function() {
var _url;
return _url = "/rest/administration", this.get("contest_id") ? (_url += "/contests/" + this.get("contest_id") + "/companies", 
this.get("company_id") && (_url += "/" + this.get("company_id"))) :_url += this.get("id") ? "/companies/" + this.get("id") :this.get("company_id") ? "/companies/" + this.get("company_id") :"/companies", 
_url;
}, Administration_CompanyModel.prototype.max_limit = {
pitch:300
}, Administration_CompanyModel;
}(window.HR.GenericModel), HR = window.HR, HR.Administration_CompanyModel = Administration_CompanyModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyOfficeModel, HR;
return Administration_CompanyOfficeModel = function(_super) {
function Administration_CompanyOfficeModel() {
return Administration_CompanyOfficeModel.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyOfficeModel, _super), Administration_CompanyOfficeModel.prototype.url = function() {
var _url;
return _url = "/rest/administration/companies/" + this.get("company_id") + "/offices", 
this.get("id") && (_url += "/" + this.get("id")), _url;
}, Administration_CompanyOfficeModel;
}(window.HR.GenericModel), HR = window.HR, HR.Administration_CompanyOfficeModel = Administration_CompanyOfficeModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyPositionModel, HR;
return Administration_CompanyPositionModel = function(_super) {
function Administration_CompanyPositionModel() {
return Administration_CompanyPositionModel.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyPositionModel, _super), Administration_CompanyPositionModel.prototype.url = function() {
var _url;
return _url = "/rest/administration/companies/" + this.get("company_id") + "/positions", 
this.get("id") && (_url += "/" + this.get("id")), _url;
}, Administration_CompanyPositionModel;
}(window.HR.GenericModel), HR = window.HR, HR.Administration_CompanyPositionModel = Administration_CompanyPositionModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ContestModel, HR;
return Administration_ContestModel = function(_super) {
function Administration_ContestModel() {
return Administration_ContestModel.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ContestModel, _super), Administration_ContestModel.prototype.url = function() {
var _url;
return _url = "/rest/administration/contests", this.get("id") && (_url += "/" + this.get("id")), 
_url;
}, Administration_ContestModel.prototype.max_limit = {
tagline:100
}, Administration_ContestModel.prototype.mod_url = function(username) {
return "" + this.url() + "/moderator?username=" + username;
}, Administration_ContestModel.prototype.challenge_url = function(slug) {
return "" + this.url() + "/challenge?slug=" + slug;
}, Administration_ContestModel.prototype.update_challenges_order_url = function() {
return "" + this.url() + "/update_challenges_order";
}, Administration_ContestModel.prototype.update_challenge_weights_url = function() {
return "" + this.url() + "/update_challenge_weights";
}, Administration_ContestModel.prototype.update_flags_url = function(ca_id) {
return "" + this.url() + "/update_flags?ca_id=" + ca_id;
}, Administration_ContestModel.prototype.association_url = function(ca_id) {
return "" + this.url() + "/association?ca_id=" + ca_id;
}, Administration_ContestModel;
}(window.HR.GenericModel), HR = window.HR, HR.Administration_ContestModel = Administration_ContestModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_TestCaseModel, HR;
return Administration_TestCaseModel = function(_super) {
function Administration_TestCaseModel() {
return Administration_TestCaseModel.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_TestCaseModel, _super), Administration_TestCaseModel.prototype.url = function() {
var _url;
return _url = "/rest/administration/challenges/" + this.get("challenge_id") + "/test_cases", 
this.get("id") && (_url += "/" + this.get("id")), _url;
}, Administration_TestCaseModel;
}(window.HR.GenericModel), HR = window.HR, HR.Administration_TestCaseModel = Administration_TestCaseModel;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GenericCollection, HR, _ref;
return GenericCollection = function(_super) {
function GenericCollection() {
return GenericCollection.__super__.constructor.apply(this, arguments);
}
return __extends(GenericCollection, _super), GenericCollection.prototype.url = function() {
return "" + this.restURL() + "?" + this.queryParams();
}, GenericCollection.prototype.queryParams = function() {
var _query;
return (!this.page || this.page < 1) && (this.page = 1), this.limit || (this.limit = 10), 
_query = this.query ? "&query=" + this.query :"", "offset=" + (this.page - 1) * this.limit + "&limit=" + this.limit + _query;
}, GenericCollection.prototype.restPrefix = !0, GenericCollection.prototype.restURL = function() {
var rest, _url;
return _url = "" + this.ns(rest = !0) + this.baseURL(), "" + HR.restURL(_url, this.restPrefix);
}, GenericCollection.prototype.pageURL = function() {
return "" + this.ns() + this.baseURL();
}, GenericCollection.prototype.getTotal = function() {
return this.total;
}, GenericCollection.prototype.getCurrentPage = function() {
return this.page;
}, GenericCollection.prototype.cacheModels = !1, GenericCollection.prototype.keyPrefix = function() {
return HR.profile().get("key_prefix");
}, GenericCollection.prototype.baseURL = function() {
return "/dummies";
}, GenericCollection.prototype.ns = function(rest) {
return null == rest && (rest = !1), HR.namespace(this.contest_slug, rest);
}, GenericCollection.prototype.collectionCrumbs = function() {
return HR.collection("bread-crumbs");
}, GenericCollection.prototype.setContestCrumb = function() {
var contest, contest_slug;
return contest_slug = this.contest_slug || this.get("contest-slug"), contest_slug ? contest = HR.model("contest", {
slug:this.contest_slug
}).cached({
success:function(_this) {
return function(model) {
return _this.crumbs.merge(model.breadCrumbs(), {
at:0
});
};
}(this)
}) :void 0;
}, GenericCollection.prototype.breadCrumbs = function() {
return this.crumbs || (this.crumbs = HR.collection("bread-crumbs"), this.setContestCrumb()), 
this.crumbs.merge(this.collectionCrumbs()), this.crumbs;
}, GenericCollection.prototype.merge = function(collection, options) {
return this.add(collection.models, options);
}, GenericCollection.prototype.parse = function(resp, xhr) {
var f, parsed, set_data_fields, that, _fn, _i, _len;
if (void 0 !== xhr || resp.models) {
for (this.sync_status = !0, set_data_fields = [ "total", "page", "activities", "round_data", "available", "ongoing_count", "slug_title", "errors", "current_hacker", "contest" ], 
that = this, _fn = function(f) {
return void 0 !== resp[f] ? that[f] = resp[f] :void 0;
}, _i = 0, _len = set_data_fields.length; _len > _i; _i++) f = set_data_fields[_i], 
_fn(f);
parsed = GenericCollection.__super__.parse.call(this, resp.models, xhr);
} else parsed = GenericCollection.__super__.parse.call(this, resp, xhr);
return parsed = _.map(parsed, function(_this) {
return function(modelData) {
var model;
return model = new _this.model(modelData), _this.cacheModels && model.cacheSet(), 
model;
};
}(this));
}, GenericCollection;
}(Backbone.Collection), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericCollection = GenericCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var AnswerCollection, HR, _ref;
return AnswerCollection = function(_super) {
function AnswerCollection() {
return AnswerCollection.__super__.constructor.apply(this, arguments);
}
return __extends(AnswerCollection, _super), AnswerCollection.prototype.model = window.HR.AnswerModel, 
AnswerCollection.prototype.setChallengeSlug = function(challenge_slug) {
return this.challenge_slug = challenge_slug;
}, AnswerCollection.prototype.getChallengeSlug = function() {
return this.challenge_slug;
}, AnswerCollection.prototype.setQuestionId = function(question_id) {
return this.question_id = question_id;
}, AnswerCollection.prototype.getQuestionId = function() {
return this.question_id;
}, AnswerCollection.prototype.baseURL = function() {
return "challenges/" + this.challenge_slug + "/questions/" + this.question_id + "/answers";
}, AnswerCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.AnswerCollection = AnswerCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var APIConsumerCollection, HR, _ref;
return APIConsumerCollection = function(_super) {
function APIConsumerCollection() {
return APIConsumerCollection.__super__.constructor.apply(this, arguments);
}
return __extends(APIConsumerCollection, _super), APIConsumerCollection.prototype.url = function() {
return "/rest/api_consumers";
}, APIConsumerCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.APIConsumerCollection = APIConsumerCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ArchivedContestsCollection, HR, _ref;
return ArchivedContestsCollection = function(_super) {
function ArchivedContestsCollection() {
return ArchivedContestsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ArchivedContestsCollection, _super), ArchivedContestsCollection.prototype.model = window.HR.ContestModel, 
ArchivedContestsCollection.prototype.metaKeys = [ "total", "page" ], ArchivedContestsCollection.prototype.initialize = function(options) {
return this.limit = 50, this.page = parseInt(options.page) || 1;
}, ArchivedContestsCollection.prototype.baseURL = function() {
return "rest/contests/archived";
}, ArchivedContestsCollection.prototype.restURL = function() {
return "" + this.baseURL();
}, ArchivedContestsCollection.prototype.parse = function(resp, xhr) {
return this.total = resp.total, ArchivedContestsCollection.__super__.parse.call(this, resp, xhr);
}, ArchivedContestsCollection.prototype.setTotal = function(total) {
this.total = total;
}, ArchivedContestsCollection.prototype.getTotal = function() {
return this.total;
}, ArchivedContestsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ArchivedContestsCollection = ArchivedContestsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var BlogTemplatesCollection, HR, _ref;
return BlogTemplatesCollection = function(_super) {
function BlogTemplatesCollection() {
return BlogTemplatesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(BlogTemplatesCollection, _super), BlogTemplatesCollection.prototype.model = window.HR.BlogTemplateModel, 
BlogTemplatesCollection.prototype.url = function() {
return "/rest/blogtemplates";
}, BlogTemplatesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.BlogTemplatesCollection = BlogTemplatesCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var BlogsCollection, HR, _ref;
return BlogsCollection = function(_super) {
function BlogsCollection() {
return BlogsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(BlogsCollection, _super), BlogsCollection.prototype.model = window.HR.BlogModel, 
BlogsCollection.prototype.initialize = function() {
return this.limit || (this.limit = 10), this.page = 1, this.total = 0;
}, BlogsCollection.prototype.baseURL = function() {
return "rest/blogs";
}, BlogsCollection.prototype.pageURL = function() {
return "blog";
}, BlogsCollection.prototype.restURL = function() {
return "" + this.baseURL();
}, BlogsCollection.prototype.getCurrentPage = function() {
return this.page;
}, BlogsCollection.prototype.setPage = function(page) {
this.page = page;
}, BlogsCollection.prototype.getTotal = function() {
return this.total;
}, BlogsCollection.prototype.parse = function(resp, xhr) {
return this.total = resp.total, BlogsCollection.__super__.parse.call(this, resp, xhr);
}, BlogsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.BlogsCollection = BlogsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var BreadCrumbsCollection, HR, _ref;
return BreadCrumbsCollection = function(_super) {
function BreadCrumbsCollection() {
return BreadCrumbsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(BreadCrumbsCollection, _super), BreadCrumbsCollection.prototype.model = window.HR.BreadCrumbModel, 
BreadCrumbsCollection.prototype.cacheTimeout = 300, BreadCrumbsCollection.prototype.baseURL = function() {
return "";
}, BreadCrumbsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.BreadCrumbsCollection = BreadCrumbsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CategoryCollection, HR, _ref;
return CategoryCollection = function(_super) {
function CategoryCollection() {
return CategoryCollection.__super__.constructor.apply(this, arguments);
}
return __extends(CategoryCollection, _super), CategoryCollection.prototype.model = window.HR.CategoryModel, 
CategoryCollection.prototype.baseURL = function() {
return "";
}, CategoryCollection.prototype.defaultHierarchy = function() {
var members;
return members = HR.collection("category"), this.first() && members.merge(this.first().defaultHierarchy()), 
members;
}, CategoryCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.CategoryCollection = CategoryCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
}, __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
jQuery(function() {
var ChallengeStatsCollection, ChallengesCollection, HR, _ref;
return ChallengesCollection = function(_super) {
function ChallengesCollection() {
return ChallengesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengesCollection, _super), ChallengesCollection.prototype.model = window.HR.ChallengeModel, 
ChallengesCollection.prototype.initialize = function(options) {
return void 0 !== options && void 0 !== options.filter && (this._filter = options.filter), 
this.filters = [], this._filter && (this.filters = this._filters.split("+")), this.limit || (this.limit = 20), 
this.page = 1, void 0 !== options && void 0 !== options.sort_by && (this.sort_by = options.sort_by), 
void 0 !== options && void 0 !== options.sort_dir && (this.sort_dir = options.sort_dir), 
ChallengesCollection.__super__.initialize.call(this, options);
}, ChallengesCollection.prototype.fetch = function(options) {
return null == options && (options = {}), this.min_fetch_timelapse = 4e4, ChallengesCollection.__super__.fetch.call(this, options);
}, ChallengesCollection.prototype.cacheModels = !1, ChallengesCollection.prototype.showLoader = !1, 
ChallengesCollection.prototype.metaKeys = [ "current_track" ], ChallengesCollection.prototype.parse = function(resp, xhr) {
return _.each(resp.models, function(model) {
return HR.appController.setModel(model, "challenge", "slug-" + model.slug);
}), this.current_track = resp.current_track, ChallengesCollection.__super__.parse.call(this, resp, xhr);
}, ChallengesCollection.prototype.addFilter = function(filter) {
return __indexOf.call(this.filters, filter) >= 0 ? void 0 :this.filters.push(filter);
}, ChallengesCollection.prototype.removeFilter = function(filter) {
var i;
return i = $.inArray(filter, this.filters), -1 !== i ? this.filters.splice(i, 1) :void 0;
}, ChallengesCollection.prototype.setFilters = function(filters) {
this.filters = filters;
}, ChallengesCollection.prototype.setSortBy = function(sort_by) {
this.sort_by = sort_by;
}, ChallengesCollection.prototype.setSortDir = function(sort_dir) {
this.sort_dir = sort_dir;
}, ChallengesCollection.prototype.setPage = function(page) {
this.page = page;
}, ChallengesCollection.prototype.setLimit = function(limit) {
this.limit = limit;
}, ChallengesCollection.prototype.setCategories = function(category_slugs) {
this.category_slugs = category_slugs;
}, ChallengesCollection.prototype.setTrackSlug = function(track_slug) {
this.track_slug = track_slug;
}, ChallengesCollection.prototype.setChapterSlug = function(chapter_slug) {
this.chapter_slug = chapter_slug;
}, ChallengesCollection.prototype.setQuery = function(query) {
return this.query = query, this.cacheModels = !1;
}, ChallengesCollection.prototype.setContest = function(contest_slug) {
this.contest_slug = contest_slug;
}, ChallengesCollection.prototype.setLoginTracking = function(login_tacking) {
this.login_tacking = login_tacking;
}, ChallengesCollection.prototype.getTotal = function() {
return this.total;
}, ChallengesCollection.prototype.getCurrentPage = function() {
return this.page;
}, ChallengesCollection.prototype.baseURL = function() {
var url;
return this.tag ? "tags/" + this.tag + "/challenges" :this.category_slugs ? url = "categories/" + this.category_slugs.join("|") + "/challenges" :this.track_slug ? url = "tracks/" + this.track_slug + "/" + this.chapter_slug + "/challenges" :"challenges";
}, ChallengesCollection.prototype.pageURL = function() {
var url;
return url = ChallengesCollection.__super__.pageURL.call(this), url = url.replace("|", "/"), 
(this.tag || this.contest_slug || this.category_slugs) && (url = url.replace("/challenges", "")), 
url;
}, ChallengesCollection.prototype.queryParams = function() {
var filter_string, query;
return query = ChallengesCollection.__super__.queryParams.call(this), this._asTrack && (query += "as_track=true"), 
this.query && (query += "&query=" + this.query), this.filters && (filter_string = this.filters.join("+"), 
query += "&filter=" + filter_string), this.sort_by && (query += "&sort_by=" + this.sort_by), 
this.sort_by && this.sort_dir && (query += "&sort_dir=" + this.sort_dir), this.login_tacking && (query += "&track_login=true"), 
query;
}, ChallengesCollection;
}(window.HR.GenericCollection), ChallengeStatsCollection = function(_super) {
function ChallengeStatsCollection() {
return ChallengeStatsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeStatsCollection, _super), ChallengeStatsCollection.prototype.model = window.HR.ChallengeStats, 
ChallengeStatsCollection.prototype.completed = function() {
return this.select(function(challenge) {
return challenge.get("completed");
});
}, ChallengeStatsCollection.prototype.completion = function() {
return (this.completed().length / this.total * 100).round();
}, ChallengeStatsCollection.prototype.stats = function() {
return {
completed:this.completed().length,
completion:this.completion(),
total:this.total,
languages:this.languagesDisplay()
};
}, ChallengeStatsCollection.prototype.languagesDisplay = function() {
var languages;
return languages = _.map(this.languages, function() {
return function(language) {
return lang_display_mapping[language] || language;
};
}(this));
}, ChallengeStatsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChallengesCollection = ChallengesCollection, 
HR.ChallengeStatsCollection = ChallengeStatsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ChecklistCollection, HR, _ref;
return ChecklistCollection = function(_super) {
function ChecklistCollection() {
return ChecklistCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ChecklistCollection, _super), ChecklistCollection.prototype.model = window.HR.ChecklistModel, 
ChecklistCollection.prototype.setChallenge = function(slug) {
this.slug = slug;
}, ChecklistCollection.prototype.url = function() {
var url, url_prefix;
return url_prefix = "/rest/contests/" + HR.appController.get_current_contest_slug() + "/", 
url = url_prefix + ("challenges/" + this.slug + "/checklist");
}, ChecklistCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChecklistCollection = ChecklistCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ChronologicalSubmissionsCollection, HR, _ref;
return ChronologicalSubmissionsCollection = function(_super) {
function ChronologicalSubmissionsCollection() {
return ChronologicalSubmissionsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ChronologicalSubmissionsCollection, _super), ChronologicalSubmissionsCollection.prototype.model = window.HR.SubmissionModel, 
ChronologicalSubmissionsCollection.prototype.baseURL = function() {
return "submissions/";
}, ChronologicalSubmissionsCollection.prototype.url = function() {
return "" + this.restURL() + "?" + this.queryParams();
}, ChronologicalSubmissionsCollection.prototype.limit = 10, ChronologicalSubmissionsCollection.prototype.cacheTimeout = 10, 
ChronologicalSubmissionsCollection.prototype.showLoader = !1, ChronologicalSubmissionsCollection.prototype.setContest = function(contest_slug) {
this.contest_slug = contest_slug;
}, ChronologicalSubmissionsCollection.prototype.setPage = function(page) {
return this.page = page;
}, ChronologicalSubmissionsCollection.prototype.getTotal = function() {
return this.total;
}, ChronologicalSubmissionsCollection.prototype.getCurrentPage = function() {
return this.page;
}, ChronologicalSubmissionsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChronologicalSubmissionsCollection = ChronologicalSubmissionsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CompaniesCollection, HR, _ref;
return CompaniesCollection = function(_super) {
function CompaniesCollection() {
return CompaniesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(CompaniesCollection, _super), CompaniesCollection.prototype.initialize = function(options) {
return this.hacker = "me", CompaniesCollection.__super__.initialize.call(this, options);
}, CompaniesCollection.prototype.setOffset = function(offset) {
this.offset = offset;
}, CompaniesCollection.prototype.getTotal = function() {
return this.total;
}, CompaniesCollection.prototype.url = function() {
var urll;
return urll = this.company_slug ? "/rest/contests/" + this.contest_slug + "/companies/" + this.company_slug :this.challenge_slug ? "/rest/contests/" + this.contest_slug + "/challenges/" + this.challenge_slug + "/companies" :"/rest/contests/" + this.contest_slug + "/companies", 
this.all && (urll += "?full=true"), urll;
}, CompaniesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompaniesCollection = CompaniesCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ContestsCollection, HR, _ref;
return ContestsCollection = function(_super) {
function ContestsCollection() {
return ContestsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ContestsCollection, _super), ContestsCollection.prototype.cacheTimeout = 30, 
ContestsCollection.prototype.model = window.HR.ContestModel, ContestsCollection.prototype.initialize = function(options) {
return null == options && (options = {}), this.limit = options.limit || 10, this.page = options.page || 1, 
this.key = options.key, this.contest_slug = options.contest_slug;
}, ContestsCollection.prototype.restURL = function() {
var url;
return url = "/rest/contests/upcoming";
}, ContestsCollection.prototype.queryParams = function() {
var query;
return query = ContestsCollection.__super__.queryParams.call(this), this.contest_slug && (query += "&contest_slug=" + this.contest_slug), 
query;
}, ContestsCollection.prototype.ordered = function() {
var cloned;
return cloned = this.clone(), cloned.each(function() {
return function(contest) {
return contest.running() ? (cloned.remove(contest), cloned.add(contest, {
at:0
})) :void 0;
};
}(this)), cloned;
}, ContestsCollection.prototype.grouped = function() {
var ordered;
return ordered = this.ordered(), [ {
key:"active",
contests:HR.collection("contests", ordered.where({
archived:!1
}))
}, {
key:"archived",
contests:HR.collection("contests", ordered.where({
archived:!0
}))
} ];
}, ContestsCollection.prototype.cacheModels = !0, ContestsCollection.prototype.showLoader = !1, 
ContestsCollection.prototype.parse = function(resp, xhr) {
return this.total = resp.total, this.page = resp.page, this.weekly = resp.weekly, 
ContestsCollection.__super__.parse.call(this, resp, xhr);
}, ContestsCollection.prototype.getTotal = function() {
return this.total;
}, ContestsCollection.prototype.setPage = function(page) {
this.page = page;
}, ContestsCollection.prototype.setTotal = function(total) {
this.total = total;
}, ContestsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ContestsCollection = ContestsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardHistoryCollection, DashboardProgressCollection, HR, _ref;
return DashboardHistoryCollection = function(_super) {
function DashboardHistoryCollection() {
return DashboardHistoryCollection.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardHistoryCollection, _super), DashboardHistoryCollection.prototype.model = window.HR.DashboardHistory, 
DashboardHistoryCollection.prototype.setHacker = function(username) {
this.username = username;
}, DashboardHistoryCollection.prototype.showLoader = !1, DashboardHistoryCollection.prototype.restPrefix = !1, 
DashboardHistoryCollection.prototype.baseURL = function() {
return "dashboard/history";
}, DashboardHistoryCollection.prototype.restURL = function() {
var rest, _url;
return _url = "/rest" + this.ns(rest = !0) + this.baseURL(), "" + HR.restURL(_url, this.restPrefix);
}, DashboardHistoryCollection.prototype.queryParams = function() {
return this.username ? "username=" + this.username :DashboardHistoryCollection.__super__.queryParams.call(this);
}, DashboardHistoryCollection;
}(window.HR.GenericCollection), DashboardProgressCollection = function(_super) {
function DashboardProgressCollection() {
return DashboardProgressCollection.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardProgressCollection, _super), DashboardProgressCollection.prototype.model = window.HR.DashboardProgressModel, 
DashboardProgressCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardHistoryCollection = DashboardHistoryCollection, 
HR.DashboardProgressCollection = DashboardProgressCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ExtendedNetworkCollection, HR, _ref;
return ExtendedNetworkCollection = function(_super) {
function ExtendedNetworkCollection() {
return ExtendedNetworkCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ExtendedNetworkCollection, _super), ExtendedNetworkCollection.prototype.model = window.HR.LeaderboardModel, 
ExtendedNetworkCollection.prototype.setLevel = function(level) {
return this.level = level;
}, ExtendedNetworkCollection.prototype.url = function() {
var url;
return url = "/rest/networks/extended", this.level && (url += "?level=" + this.level), 
url;
}, ExtendedNetworkCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ExtendedNetworkCollection = ExtendedNetworkCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var FlashesCollection, HR, _ref;
return FlashesCollection = function(_super) {
function FlashesCollection() {
return FlashesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(FlashesCollection, _super), FlashesCollection.prototype.model = window.HR.FlashModel, 
FlashesCollection.prototype.url = function() {
return "/rest/hackers/me/flashes";
}, FlashesCollection.prototype.clearFlashes = function() {
return $.get("/rest/hackers/me/clear_flashes");
}, FlashesCollection.prototype.getFlashes = function() {}, FlashesCollection.prototype.getTotal = function() {
return this.total;
}, FlashesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.FlashesCollection = FlashesCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GameCollection, HR, _ref;
return GameCollection = function(_super) {
function GameCollection() {
return GameCollection.__super__.constructor.apply(this, arguments);
}
return __extends(GameCollection, _super), GameCollection.prototype.model = window.HR.GameModel, 
GameCollection.prototype.url = function() {
return "/rest/contests/" + HR.appController.get_current_contest_slug() + "/games/?sids=" + this.sids.join();
}, GameCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.GameCollection = GameCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GameSetCollection, HR, _ref;
return GameSetCollection = function(_super) {
function GameSetCollection() {
return GameSetCollection.__super__.constructor.apply(this, arguments);
}
return __extends(GameSetCollection, _super), GameSetCollection.prototype.model = window.HR.GameSetModel, 
GameSetCollection.prototype.initialize = function() {
return this.filter = "all";
}, GameSetCollection.prototype.setPage = function(page) {
this.page = page;
}, GameSetCollection.prototype.getPage = function() {
return this.page;
}, GameSetCollection.prototype.getSid = function() {
return this.sid;
}, GameSetCollection.prototype.setSid = function(sid) {
this.sid = sid;
}, GameSetCollection.prototype.setFilter = function(filter) {
this.filter = filter;
}, GameSetCollection.prototype.getFilter = function() {
return this.filter;
}, GameSetCollection.prototype.url = function() {
return this.contest_slug ? "/rest/contests/" + this.contest_slug + "/submissions/" + this.sid + "/gamesets/?offset=" + 5 * (this.page - 1) + "&filter=" + this.filter :"/rest/contests/" + HR.appController.get_current_contest_slug() + "/submissions/" + this.sid + "/gamesets/?offset=" + 5 * (this.page - 1) + "&filter=" + this.filter;
}, GameSetCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.GameSetCollection = GameSetCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GroupedSubmissionsCollection, HR, _ref;
return GroupedSubmissionsCollection = function(_super) {
function GroupedSubmissionsCollection() {
return GroupedSubmissionsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(GroupedSubmissionsCollection, _super), GroupedSubmissionsCollection.prototype.model = window.HR.SubmissionModel, 
GroupedSubmissionsCollection.prototype.baseURL = function() {
return "submissions/";
}, GroupedSubmissionsCollection.prototype.url = function() {
return "" + this.restURL() + "grouped?" + this.queryParams();
}, GroupedSubmissionsCollection.prototype.limit = 5, GroupedSubmissionsCollection.prototype.cacheTimeout = 10, 
GroupedSubmissionsCollection.prototype.showLoader = !1, GroupedSubmissionsCollection.prototype.setContest = function(contest_slug) {
this.contest_slug = contest_slug;
}, GroupedSubmissionsCollection.prototype.setPage = function(page) {
return this.page = page;
}, GroupedSubmissionsCollection.prototype.getTotal = function() {
return this.total;
}, GroupedSubmissionsCollection.prototype.getCurrentPage = function() {
return this.page;
}, GroupedSubmissionsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.GroupedSubmissionsCollection = GroupedSubmissionsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerClubCollection, _ref;
return HackerClubCollection = function(_super) {
function HackerClubCollection() {
return HackerClubCollection.__super__.constructor.apply(this, arguments);
}
return __extends(HackerClubCollection, _super), HackerClubCollection.prototype.setSlug = function(slug) {
this.slug = slug;
}, HackerClubCollection.prototype.url = function() {
return this.slug ? "/rest/hackerclubs?slug=" + this.slug :"/rest/hackerclubs";
}, HackerClubCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackerClubCollection = HackerClubCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerApplicationsCollection, _ref;
return HackerApplicationsCollection = function(_super) {
function HackerApplicationsCollection() {
return HackerApplicationsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(HackerApplicationsCollection, _super), HackerApplicationsCollection.prototype.model = window.HR.HackerApplicationModel, 
HackerApplicationsCollection.prototype.initialize = function() {
return this.visa = "", this.role = "", this.country = "", this.key = "", this.limit = $.cookie("pagination_per_page_limit") || 5;
}, HackerApplicationsCollection.prototype.metaKeys = [ "total", "page" ], HackerApplicationsCollection.prototype.url = function() {
return "/rest/contests/" + this.contestId + "/companies/" + this.companyId + "/hackerapplications/list?offset=" + (this.page - 1) * this.getLimit() + "&limit=" + this.getLimit() + "&visa=" + this.visa + "&role=" + this.role + "&country=" + this.country + "&key=" + this.key;
}, HackerApplicationsCollection.prototype.setContestId = function(contestId) {
this.contestId = contestId;
}, HackerApplicationsCollection.prototype.setCompanyId = function(companyId) {
this.companyId = companyId;
}, HackerApplicationsCollection.prototype.setKey = function(key) {
this.key = key;
}, HackerApplicationsCollection.prototype.getCompanyId = function() {
return this.companyId;
}, HackerApplicationsCollection.prototype.setPage = function(page) {
this.page = page;
}, HackerApplicationsCollection.prototype.pageURL = function() {
return "" !== this.key ? "/contests/" + this.contestId + "/applications/" + this.key + "/" + this.getFilterString() + "/" :"/manage/" + this.contestId + "/applications/" + this.companyId + "/" + this.getFilterString() + "/";
}, HackerApplicationsCollection.prototype.setPageURL = function(pageuri) {
this.pageuri = pageuri;
}, HackerApplicationsCollection.prototype.setTotal = function(total) {
this.total = total;
}, HackerApplicationsCollection.prototype.setFilterString = function(fString) {
var filters;
return this.fString = fString, null === this.fString && (this.fString = "--"), filters = this.fString.split("-"), 
this.country = filters[0] || "", this.visa = filters[1] || "", this.role = filters[2] || "";
}, HackerApplicationsCollection.prototype.getFilterString = function() {
return "" + this.country + "-" + this.visa + "-" + this.role;
}, HackerApplicationsCollection.prototype.getTotal = function() {
return this.total;
}, HackerApplicationsCollection.prototype.getCurrentPage = function() {
return this.page || 1;
}, HackerApplicationsCollection.prototype.getLimit = function() {
return this.limit;
}, HackerApplicationsCollection.prototype.setLimit = function(limit) {
return HR.appController.cleanCollectionCache("hackerapplications"), this.limit = limit;
}, HackerApplicationsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackerApplicationsCollection = HackerApplicationsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerChallengesCollection, _ref;
return HackerChallengesCollection = function(_super) {
function HackerChallengesCollection() {
return HackerChallengesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(HackerChallengesCollection, _super), HackerChallengesCollection.prototype.model = window.HR.HackerChallengeModel, 
HackerChallengesCollection.prototype.url = function() {
return "/rest/contests/" + HR.appController.get_current_contest_slug() + "/companies/" + this.companyId + "/hackerapplications/";
}, HackerChallengesCollection.prototype.setCompanyId = function(companyId) {
this.companyId = companyId;
}, HackerChallengesCollection.prototype.getCompanyId = function() {
return this.companyId;
}, HackerChallengesCollection.prototype.parse = function(resp) {
return resp.models.challenges;
}, HackerChallengesCollection.prototype.setPage = function(page) {
this.page = page;
}, HackerChallengesCollection.prototype.setFilter = function(query) {
return this.query = query, this.page = 1;
}, HackerChallengesCollection.prototype.pageURL = function() {
return "/manage/applications/" + this.companyId + "/";
}, HackerChallengesCollection.prototype.setTotal = function(total) {
this.total = total;
}, HackerChallengesCollection.prototype.getTotal = function() {
return this.total;
}, HackerChallengesCollection.prototype.getCurrentPage = function() {
return this.page || 1;
}, HackerChallengesCollection.prototype.getLimit = function() {
return 1;
}, HackerChallengesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackerChallengesCollection = HackerChallengesCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerEventCollection, _ref;
return HackerEventCollection = function(_super) {
function HackerEventCollection() {
return HackerEventCollection.__super__.constructor.apply(this, arguments);
}
return __extends(HackerEventCollection, _super), HackerEventCollection.prototype.initialize = function(options) {
return this.hacker = "me", this.offset = 0, this.total = 0, HackerEventCollection.__super__.initialize.call(this, options);
}, HackerEventCollection.prototype.setHacker = function(hacker) {
this.hacker = hacker;
}, HackerEventCollection.prototype.showLoader = !1, HackerEventCollection.prototype.setOffset = function(offset) {
this.offset = offset;
}, HackerEventCollection.prototype.url = function() {
return "/rest/contests/master/hackers/" + this.hacker + "/events?offset=" + this.offset;
}, HackerEventCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackerEventCollection = HackerEventCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerPostCollection, _ref;
return HackerPostCollection = function(_super) {
function HackerPostCollection() {
return HackerPostCollection.__super__.constructor.apply(this, arguments);
}
return __extends(HackerPostCollection, _super), HackerPostCollection.prototype.initialize = function(options) {
return HackerPostCollection.__super__.initialize.call(this, options);
}, HackerPostCollection.prototype.setHacker = function(hacker) {
this.hacker = hacker;
}, HackerPostCollection.prototype.showLoader = !1, HackerPostCollection.prototype.setOffset = function(offset) {
this.offset = offset;
}, HackerPostCollection.prototype.url = function() {
return "/rest/contests/master/hackers/" + this.hacker + "/posts?offset=" + this.offset;
}, HackerPostCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackerPostCollection = HackerPostCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, JudgeSubmissionsCollection, _ref;
return JudgeSubmissionsCollection = function(_super) {
function JudgeSubmissionsCollection() {
return JudgeSubmissionsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(JudgeSubmissionsCollection, _super), JudgeSubmissionsCollection.prototype.model = window.HR.SubmissionModel, 
JudgeSubmissionsCollection.prototype.baseURL = function() {
return "judge_submissions/";
}, JudgeSubmissionsCollection.prototype.pageURL = function() {
return "" + this.ns() + "judge/submissions/";
}, JudgeSubmissionsCollection.prototype.url = function() {
return "" + this.restURL() + "?" + this.queryParams();
}, JudgeSubmissionsCollection.prototype.queryParams = function() {
var query;
return query = JudgeSubmissionsCollection.__super__.queryParams.apply(this, arguments), 
this.team_slug && (query += "&hacker_id=" + this.team_slug), this.challenge_slug && (query += "&challenge_id=" + this.challenge_slug), 
query;
}, JudgeSubmissionsCollection.prototype.limit = 10, JudgeSubmissionsCollection.prototype.cacheTimeout = 10, 
JudgeSubmissionsCollection.prototype.showLoader = !1, JudgeSubmissionsCollection.prototype.getTotal = function() {
return this.total;
}, JudgeSubmissionsCollection.prototype.getCurrentPage = function() {
return this.page;
}, JudgeSubmissionsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.JudgeSubmissionsCollection = JudgeSubmissionsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, LeaderboardCollection, _ref;
return LeaderboardCollection = function(_super) {
function LeaderboardCollection() {
return LeaderboardCollection.__super__.constructor.apply(this, arguments);
}
return __extends(LeaderboardCollection, _super), LeaderboardCollection.prototype.model = window.HR.LeaderboardModel, 
LeaderboardCollection.prototype.initialize = function(options) {
var profile;
return this.limit = $.cookie("pagination_per_page_limit") || 10, LeaderboardCollection.__super__.initialize.call(this, options), 
profile = HR.profile();
}, LeaderboardCollection.prototype.validFilters = [ "network", "school", "company", "country", "language" ], 
LeaderboardCollection.prototype.showLoader = !1, LeaderboardCollection.prototype.applicableFilters = function() {
return this._applicableFilters || (this._applicableFilters = _.compact(this.validFilters)), 
this.challenge || (this._applicableFilters = _.without(this._applicableFilters, "language")), 
this._applicableFilters;
}, LeaderboardCollection.prototype.disableFilter = function(filter) {
return this._applicableFilters = _.without(this.applicableFilters(), filter);
}, LeaderboardCollection.prototype.filters = {}, LeaderboardCollection.prototype.namespace = "", 
LeaderboardCollection.prototype.baseURL = function() {
var prefix;
return prefix = "", this.track && (prefix = "" + prefix + "tags/" + this.track.slug + "/"), 
this.challenge && (prefix = "" + prefix + "challenges/" + this.challenge.get("slug") + "/"), 
this.language && (prefix = "" + prefix + "language/" + this.language + "/"), "" + prefix + "leaderboard";
}, LeaderboardCollection.prototype.challengesURL = function() {
return "" + this.restURL() + "/challenges";
}, LeaderboardCollection.prototype.collectionCrumbs = function() {
var crumbs;
return crumbs = HR.collection("bread-crumbs"), this.track && crumbs.add({
id:"Track-" + this.track,
slug:this.track.slug,
name:this.track.name
}), this.challenge && crumbs.merge(this.challenge.modelCrumbs()), this.language && crumbs.add({
id:this.language,
slug:this.language,
name:lang_display_mapping[this.language]
}), crumbs;
}, LeaderboardCollection.prototype.url = function() {
var query, url;
return this.limit || (this.limit = 10), this.page || (this.page = 1), url = this.restURL(), 
query = this.queryParams(), this.filtered() && this.hasFilters() && (url += "/filter", 
query += "&" + this.getFilterString() + "&filter_kinds=" + this.filterKinds()), 
this.archived && (query += "&archived=true"), this.includePractice && (query += "&include_practice=true"), 
"" + url + "?" + query;
}, LeaderboardCollection.prototype.challenges = function(callback) {
var that;
return null == callback && (callback = null), that = this, $.getJSON(that.challengesURL(), function(response) {
return that._challenges = response, "function" == typeof callback ? callback(response) :void 0;
}), this._challenges;
}, LeaderboardCollection.prototype.metaKeys = [ "current_hacker", "total", "available", "contest_challenges" ], 
LeaderboardCollection.prototype.parse = function(resp, xhr) {
var that;
return that = this, this.current_hacker = resp.current_hacker, this.available = resp.available, 
this.contest_challenges = resp.contest_challenges, LeaderboardCollection.__super__.parse.call(this, resp, xhr);
}, LeaderboardCollection.prototype.setContestSlug = function(contest_slug) {
this.contest_slug = contest_slug;
}, LeaderboardCollection.prototype.setTrack = function(track_slug) {
var that;
return that = this, HR.model("contest").cached({
success:function(_this) {
return function(contest) {
var track;
return track = contest.getTrack(track_slug), track && (_this.track_slug = track_slug), 
_this.track = track;
};
}(this)
});
}, LeaderboardCollection.prototype.setTrackLeaderboard = function() {
return this.setKind("track");
}, LeaderboardCollection.prototype.setChallenge = function(challenge_slug) {
var that;
return that = this, this.challenge_slug = challenge_slug, this.challenge = HR.model("challenge", {
slug:challenge_slug,
contest_slug:this.contest_slug
}).cached(), this.listenToOnce(this.challenge, "reset", function() {
return that.trigger("reset");
});
}, LeaderboardCollection.prototype.setChallengeLeaderboard = function() {
return this.disableFilter("challenge"), this.namespace = "/challenges/" + this.challenge_slug, 
this.setKind("challenge");
}, LeaderboardCollection.prototype.setLanguage = function(language) {
return this.language = language;
}, LeaderboardCollection.prototype.setLanguageLeaderboard = function() {
return this.namespace += "/language/" + this.language, this.disableFilter("language"), 
this.setKind("language");
}, LeaderboardCollection.prototype.setKind = function(kind) {
return this.kind = kind, this.filters = {}, this.trigger("change");
}, LeaderboardCollection.prototype.setLimit = function(limit) {
return this.limit = limit;
}, LeaderboardCollection.prototype.setArchived = function(archived) {
this.archived = archived;
}, LeaderboardCollection.prototype.pageURL = function() {
var url;
return url = LeaderboardCollection.__super__.pageURL.call(this), this.archived && (url = "classic_leaderboard"), 
this.track && (url = url.replace("/tags/", "/tracks/")), this.filtered() ? "" + url + "/filter/" + this.getFilterString() :"" + url;
}, LeaderboardCollection.prototype.filterKinds = function() {
return _.keys(this.filters);
}, LeaderboardCollection.prototype.filtered = function() {
return !_.isEmpty(this.filters);
}, LeaderboardCollection.prototype.hasFilters = function() {
var hasFilters;
return hasFilters = !1, _.each(this.filters, function() {
return function(values) {
return values && values.length > 0 ? hasFilters = !0 :void 0;
};
}(this)), hasFilters;
}, LeaderboardCollection.prototype.setFiltersFromString = function(string) {
var subStrings, that;
return that = this, subStrings = [ string ], this.filters = {}, _.each(subStrings, function(str) {
var filter, split, subFilters;
return split = str.split("="), filter = split[0], subFilters = split[1].length > 0 ? split[1].split(":") :[], 
that.filters[filter] = subFilters;
}), this.filters;
}, LeaderboardCollection.prototype.route = function() {
return HR.router.navigate(this.pageURL(), !0), this.trigger("reset");
}, LeaderboardCollection.prototype.getFilterString = function() {
var subStrings;
return subStrings = [], _.each(this.filters, function(values, filter) {
return subStrings.push("" + filter + "=" + values.join(":"));
}), subStrings.join("&");
}, LeaderboardCollection.prototype.addFilter = function(filter, value) {
var _base;
return this.page = 1, (_base = this.filters)[filter] || (_base[filter] = []), _.include(this.filters[filter], value) || this.filters[filter].push(encodeURIComponent(value)), 
this.route();
}, LeaderboardCollection.prototype.removeFilter = function(filter, value) {
return value ? this.filters[filter] = _.without(this.filters[filter], value) :delete this.filters[filter], 
this.route();
}, LeaderboardCollection.prototype.removeFilters = function() {
return this.filters = {}, this.route();
}, LeaderboardCollection.prototype.setPage = function(page) {
return this.page = page;
}, LeaderboardCollection.prototype.getTotal = function() {
return this.total;
}, LeaderboardCollection.prototype.getCurrentPage = function() {
return this.page;
}, LeaderboardCollection.prototype.setIncludePractice = function(includePractice) {
this.includePractice = includePractice;
}, LeaderboardCollection.prototype.empty = function() {
return 0 === _.filter(_.map(this.toJSON(), function(model) {
return model.hacker;
}), function(hacker) {
return void 0 !== hacker;
}).length;
}, LeaderboardCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.LeaderboardCollection = LeaderboardCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_Moderators, _ref;
return Manage_Moderators = function(_super) {
function Manage_Moderators() {
return Manage_Moderators.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_Moderators, _super), Manage_Moderators.prototype.model = window.HR.Manage_Moderator, 
Manage_Moderators.prototype.initialize = function(options) {
return Manage_Moderators.__super__.initialize.call(this, options), options && options.permissible_id && (this.permissible_id = options.permissible_id), 
options && options.permissible_type ? this.permissible_type = options.permissible_type :void 0;
}, Manage_Moderators.prototype.url = function() {
return "/manage/permissions/?permissible_id=" + this.permissible_id + "&permissible_type=" + this.permissible_type;
}, Manage_Moderators.prototype.metaKeys = [ "permissible_type", "permissible_id" ], 
Manage_Moderators;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_Moderators = Manage_Moderators;
});
}.call(this), function() {}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ManageSubmissionsHackersCollection, _ref;
return ManageSubmissionsHackersCollection = function(_super) {
function ManageSubmissionsHackersCollection() {
return ManageSubmissionsHackersCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ManageSubmissionsHackersCollection, _super), ManageSubmissionsHackersCollection.prototype.model = window.HR.ProfileModel, 
ManageSubmissionsHackersCollection.prototype.initialize = function() {
return this.limit = 5, this.errors = "", HR.filters ? void 0 :HR.filters = {
mshc:{
challenges:[],
hackers:[],
start_date:"",
end_date:"",
status:"all"
}
};
}, ManageSubmissionsHackersCollection.prototype.url = function() {
return "/rest/contests/" + this.contestSlug + "/hackers/filter?" + this.getFilterString() + "&offset=" + (this.page - 1) * this.limit + "&limit=" + this.limit;
}, ManageSubmissionsHackersCollection.prototype.setContest = function(contestSlug) {
this.contestSlug = contestSlug;
}, ManageSubmissionsHackersCollection.prototype.parse = function(resp, xhr) {
return !resp.error && resp.challenges && (HR.filters.mshc.challenges = resp.challenges, 
HR.filters.mshc.hackers = resp.hackers, HR.filters.mshc.start_date = resp.start_date, 
HR.filters.mshc.end_date = resp.end_date, HR.filters.mshc.status = resp.status), 
this.errors = resp.error || "", ManageSubmissionsHackersCollection.__super__.parse.call(this, resp, xhr);
}, ManageSubmissionsHackersCollection.prototype.addFilter = function(kind, value) {
return "challenges" === kind ? HR.filters.mshc.challenges = _.union(HR.filters.mshc.challenges, [ value ]) :"hackers" === kind ? HR.filters.mshc.hackers = _.union(HR.filters.mshc.hackers, [ value ]) :HR.filters.mshc[kind] = value;
}, ManageSubmissionsHackersCollection.prototype.removeFilter = function(kind, value) {
return HR.filters.mshc[kind] ? HR.filters.mshc[kind] = _.without(HR.filters.mshc[kind], value) :void 0;
}, ManageSubmissionsHackersCollection.prototype.getFilterString = function() {
return "challenges=" + HR.filters.mshc.challenges.join(",") + "&hackers=" + HR.filters.mshc.hackers.join(",") + "&start_date=" + (HR.filters.mshc.start_date || "") + "&end_date=" + (HR.filters.mshc.end_date || "") + "&status=" + HR.filters.mshc.status;
}, ManageSubmissionsHackersCollection.prototype.setFilterString = function(string) {
var strings;
return strings = string.split("&"), _.each(strings, function() {
return function(string) {
var params;
return params = string.split("="), HR.filters.mshc[params[0]] = "challenges" === params[0] || "hackers" === params[0] ? params[1].split(",") :params[1];
};
}(this));
}, ManageSubmissionsHackersCollection.prototype.getFilters = function() {
return HR.filters.mshc;
}, ManageSubmissionsHackersCollection.prototype.pageURL = function() {
return "/manage/contests/" + this.contestSlug + "/all_submissions/" + this.getFilterString() + "/";
}, ManageSubmissionsHackersCollection.prototype.setLimit = function(limit) {
return HR.appController.cleanCollectionCache("hacker_submissions"), this.limit = limit, 
this.page = 1;
}, ManageSubmissionsHackersCollection.prototype.setPage = function(page) {
this.page = page;
}, ManageSubmissionsHackersCollection.prototype.setTotal = function(total) {
this.total = total;
}, ManageSubmissionsHackersCollection.prototype.getTotal = function() {
return this.total;
}, ManageSubmissionsHackersCollection.prototype.getCurrentPage = function() {
return this.page;
}, ManageSubmissionsHackersCollection.prototype.getLimit = function() {
return this.limit;
}, ManageSubmissionsHackersCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ManageSubmissionsHackersCollection = ManageSubmissionsHackersCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ChallengeAssociationCollection, HR, _ref;
return ChallengeAssociationCollection = function(_super) {
function ChallengeAssociationCollection() {
return ChallengeAssociationCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengeAssociationCollection, _super), ChallengeAssociationCollection.prototype.model = window.HR.ChallengeAssociationModel, 
ChallengeAssociationCollection.prototype.initialize = function() {
return this.query = "";
}, ChallengeAssociationCollection.prototype.url = function() {
return this.getAll ? "/rest/contests/" + this.contestId + "/challengeassociations/all" :"/rest/contests/" + this.contestId + "/challengeassociations/?filter=" + this.query;
}, ChallengeAssociationCollection.prototype.setContestId = function(contestId) {
this.contestId = contestId;
}, ChallengeAssociationCollection.prototype.getContestId = function() {
return this.contestId;
}, ChallengeAssociationCollection.prototype.setPage = function(page) {
this.page = page;
}, ChallengeAssociationCollection.prototype.setFilter = function(query) {
return this.query = query, this.page = 1;
}, ChallengeAssociationCollection.prototype.pageURL = function() {
return "/manage/contest/";
}, ChallengeAssociationCollection.prototype.setTotal = function(total) {
this.total = total;
}, ChallengeAssociationCollection.prototype.getTotal = function() {
return this.total;
}, ChallengeAssociationCollection.prototype.getCurrentPage = function() {
return this.page || 1;
}, ChallengeAssociationCollection.prototype.getLimit = function() {
return 10;
}, ChallengeAssociationCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChallengeAssociationCollection = ChallengeAssociationCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ManageChallengeListCollection, _ref;
return ManageChallengeListCollection = function(_super) {
function ManageChallengeListCollection() {
return ManageChallengeListCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ManageChallengeListCollection, _super), ManageChallengeListCollection.prototype.model = window.HR.Manage_ChallengeModel, 
ManageChallengeListCollection.prototype.initialize = function() {
return this.query = "";
}, ManageChallengeListCollection.prototype.url = function() {
var limit;
return limit = this.getLimit(), "/manage/challenges/?offset=" + (this.page - 1) * limit + "&filter=" + this.query;
}, ManageChallengeListCollection.prototype.metaKeys = [ "page", "total", "filter" ], 
ManageChallengeListCollection.prototype.setLimit = function(limit) {
return this.limit = limit;
}, ManageChallengeListCollection.prototype.setPage = function(page) {
this.page = page;
}, ManageChallengeListCollection.prototype.setFilter = function(query) {
return this.query = query, this.page = 1;
}, ManageChallengeListCollection.prototype.pageURL = function() {
return this.query.length > 0 ? "/manage/challenge/" + this.query + "/" :"/manage/challenge/";
}, ManageChallengeListCollection.prototype.setTotal = function(total) {
this.total = total;
}, ManageChallengeListCollection.prototype.getTotal = function() {
return this.total;
}, ManageChallengeListCollection.prototype.getCurrentPage = function() {
return this.page;
}, ManageChallengeListCollection.prototype.getLimit = function() {
return 10;
}, ManageChallengeListCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ManageChallengeListCollection = ManageChallengeListCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ContestAccessCollection, HR, _ref;
return ContestAccessCollection = function(_super) {
function ContestAccessCollection() {
return ContestAccessCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ContestAccessCollection, _super), ContestAccessCollection.prototype.model = window.HR.ContestAccessModel, 
ContestAccessCollection.prototype.initialize = function() {
return this.query = "";
}, ContestAccessCollection.prototype.url = function() {
return "/rest/contests/" + this.contestId + "/contestaccesses/";
}, ContestAccessCollection.prototype.setContestId = function(contestId) {
this.contestId = contestId;
}, ContestAccessCollection.prototype.getContestId = function() {
return this.contestId;
}, ContestAccessCollection.prototype.parse = function(resp, xhr) {
return ContestAccessCollection.__super__.parse.call(this, resp, xhr);
}, ContestAccessCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ContestAccessCollection = ContestAccessCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ManageContestListCollection, _ref;
return ManageContestListCollection = function(_super) {
function ManageContestListCollection() {
return ManageContestListCollection.__super__.constructor.apply(this, arguments);
}
return __extends(ManageContestListCollection, _super), ManageContestListCollection.prototype.model = window.HR.Manage_ContestModel, 
ManageContestListCollection.prototype.initialize = function() {
return this.query = "";
}, ManageContestListCollection.prototype.url = function() {
var limit;
return limit = this.getLimit(), "/rest/contests/?offset=" + (this.page - 1) * limit + "&filter=" + this.query;
}, ManageContestListCollection.prototype.metaKeys = [ "page", "total", "filter" ], 
ManageContestListCollection.prototype.setPage = function(page) {
this.page = page;
}, ManageContestListCollection.prototype.setFilter = function(query) {
return this.query = query, this.page = 1;
}, ManageContestListCollection.prototype.pageURL = function() {
return "/manage/contest/";
}, ManageContestListCollection.prototype.setTotal = function(total) {
this.total = total;
}, ManageContestListCollection.prototype.getTotal = function() {
return this.total;
}, ManageContestListCollection.prototype.getCurrentPage = function() {
return this.page;
}, ManageContestListCollection.prototype.getLimit = function() {
return 10;
}, ManageContestListCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.ManageContestListCollection = ManageContestListCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, MessagesCollection, _ref;
return MessagesCollection = function(_super) {
function MessagesCollection() {
return MessagesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(MessagesCollection, _super), MessagesCollection.prototype.model = window.HR.MessageModel, 
MessagesCollection.prototype.restPrefix = !1, MessagesCollection.prototype.restURL = function() {
return this.from ? "rest/messages?thread_id=" + this.thread_id + "&from=" + this.from :this.until ? "rest/messages?thread_id=" + this.thread_id + "&until=" + this.until :"rest/messages?thread_id=" + this.thread_id;
}, MessagesCollection.prototype.setFrom = function(from) {
this.from = from;
}, MessagesCollection.prototype.setUntil = function(until) {
this.until = until;
}, MessagesCollection.prototype.parse = function(resp, xhr) {
return this.thread = resp.thread, this.has_more = resp.has_more, MessagesCollection.__super__.parse.call(this, resp, xhr);
}, MessagesCollection.prototype.comparator = function(a, b) {
return b.get("id") - a.get("id");
}, MessagesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.MessagesCollection = MessagesCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, MessageThreadCollection, _ref;
return MessageThreadCollection = function(_super) {
function MessageThreadCollection() {
return MessageThreadCollection.__super__.constructor.apply(this, arguments);
}
return __extends(MessageThreadCollection, _super), MessageThreadCollection.prototype.model = window.HR.MessageThreadModel, 
MessageThreadCollection.prototype.restPrefix = !1, MessageThreadCollection.prototype.restURL = function() {
return "rest/threads";
}, MessageThreadCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.MessageThreadCollection = MessageThreadCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NetworkLeaderboardCollection, _ref;
return NetworkLeaderboardCollection = function(_super) {
function NetworkLeaderboardCollection() {
return NetworkLeaderboardCollection.__super__.constructor.apply(this, arguments);
}
return __extends(NetworkLeaderboardCollection, _super), NetworkLeaderboardCollection.prototype.model = window.HR.LeaderboardModel, 
NetworkLeaderboardCollection.prototype.setLevel = function(level) {
return this.level = level;
}, NetworkLeaderboardCollection.prototype.setTrack = function(track) {
return this.track = track;
}, NetworkLeaderboardCollection.prototype.setMod = function(mod) {
return this.mod = mod;
}, NetworkLeaderboardCollection.prototype.initialize = function() {
return this.profile = HR.profile();
}, NetworkLeaderboardCollection.prototype.url = function() {
return this.level ? "/rest/contests/" + HR.appController.get_current_contest_slug() + "/levels/" + this.level + "/leaderboard" :"/rest/contests/" + HR.appController.get_current_contest_slug() + "/mods/" + this.mod + "/tracks/" + this.track + "/leaderboard/";
}, NetworkLeaderboardCollection.prototype.parse = function(resp, xhr) {
var that;
return that = this, resp.models && (resp.current_hacker ? (that.current_hacker = resp.current_hacker, 
that.setRankStat(that.current_hacker)) :that.current_hacker = null, _.each(resp.models, function(model) {
return that.setRankStat(model);
})), this.available = resp.available, NetworkLeaderboardCollection.__super__.parse.call(this, resp, xhr);
}, NetworkLeaderboardCollection.prototype.setRankStat = function(model) {
return model.newrank ? model.oldrank ? model.newrank < model.oldrank ? (model.up = !0, 
model.down = !1) :(model.up = !1, model.down = !0) :(model.up = !0, model.down = !1) :(model.up = !1, 
model.down = !1);
}, NetworkLeaderboardCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.NetworkLeaderboardCollection = NetworkLeaderboardCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NotificationsCollection, _ref;
return NotificationsCollection = function(_super) {
function NotificationsCollection() {
return NotificationsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(NotificationsCollection, _super), NotificationsCollection.prototype.model = window.HR.NotificationModel, 
NotificationsCollection.prototype.initialize = function(options) {
return null == options && (options = {}), this.page = options.page || 1, this.limit = 10, 
this.total = 0, this.offset = 0;
}, NotificationsCollection.prototype.baseURL = function() {
return this.dashboard ? "notifications/dashboard" :"notifications";
}, NotificationsCollection.prototype.queryParams = function() {
return this.unread_only ? "status=unread&offset=" + this.offset + "&limit=" + this.limit :this.notif_id ? "notif_id=" + this.notif_id + "&offset=" + this.offset + "&limit=" + this.limit :NotificationsCollection.__super__.queryParams.call(this);
}, NotificationsCollection.prototype.setDashboard = function(dashboard) {
this.dashboard = dashboard;
}, NotificationsCollection.prototype.showLoader = !1, NotificationsCollection.prototype.comparator = function(item) {
return -parseInt(item.get("created_at_epoch"));
}, NotificationsCollection.prototype.parse = function(resp, xhr) {
return this.dashboard || (this.total = resp.total, this.read = resp.read, this.unread = resp.unread, 
this.has_more = resp.has_more, this.unseen = resp.unseen, resp.notif_page && (this.page = resp.notif_page), 
HR.CONTEST_DISABLED = resp.contest_disabled, HR.CHALLENGES_DISABLED = resp.challenges_disabled), 
NotificationsCollection.__super__.parse.call(this, resp, xhr);
}, NotificationsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.NotificationsCollection = NotificationsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NvNLeaderboardCollection, _ref;
return NvNLeaderboardCollection = function(_super) {
function NvNLeaderboardCollection() {
return NvNLeaderboardCollection.__super__.constructor.apply(this, arguments);
}
return __extends(NvNLeaderboardCollection, _super), NvNLeaderboardCollection.prototype.model = window.HR.LeaderboardModel, 
NvNLeaderboardCollection.prototype.page = 1, NvNLeaderboardCollection.prototype.filters = {}, 
NvNLeaderboardCollection.prototype.url = function() {
return this.kind ? "/rest/contests/" + HR.appController.get_current_contest_slug() + "/leaderboard/net_vs_net?kind=" + this.kind + "&offset=" + 10 * (this.page - 1) :"/rest/contests/" + HR.appController.get_current_contest_slug() + "/leaderboard/net_vs_net?offset=" + 10 * (this.page - 1);
}, NvNLeaderboardCollection.prototype.pageURL = function() {
return this.kind ? "" + HR.appController.get_current_contest_namespace() + "/leaderboard/nvn/kind/" + this.kind :"" + HR.appController.get_current_contest_namespace() + "/leaderboard/nvn";
}, NvNLeaderboardCollection.prototype.setKind = function(kind) {
return this.kind = kind;
}, NvNLeaderboardCollection.prototype.setPage = function(page) {
return this.page = page;
}, NvNLeaderboardCollection.prototype.getTotal = function() {
return this.total;
}, NvNLeaderboardCollection.prototype.getCurrentPage = function() {
return this.page;
}, NvNLeaderboardCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.NvNLeaderboardCollection = NvNLeaderboardCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, PlayoffCollection, _ref;
return PlayoffCollection = function(_super) {
function PlayoffCollection() {
return PlayoffCollection.__super__.constructor.apply(this, arguments);
}
return __extends(PlayoffCollection, _super), PlayoffCollection.prototype.model = window.HR.PlayoffModel, 
PlayoffCollection.prototype.setRound = function(round) {
this.round = round;
}, PlayoffCollection.prototype.setSlug = function(slug) {
this.slug = slug;
}, PlayoffCollection.prototype.url = function() {
return "/rest/contests/" + HR.appController.get_current_contest_slug() + "/challenges/" + this.slug + "/playoffs/" + this.round;
}, PlayoffCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.PlayoffCollection = PlayoffCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, PublicContestsCollection, _ref;
return PublicContestsCollection = function(_super) {
function PublicContestsCollection() {
return PublicContestsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(PublicContestsCollection, _super), PublicContestsCollection.prototype.url = function() {
return "/rest/contests/all_active_and_archived";
}, PublicContestsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.PublicContestsCollection = PublicContestsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, QuestionCollection, _ref;
return QuestionCollection = function(_super) {
function QuestionCollection() {
return QuestionCollection.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionCollection, _super), QuestionCollection.prototype.model = window.HR.QuestionModel, 
QuestionCollection.prototype.setChallengeSlug = function(challenge_slug) {
return this.challenge_slug = challenge_slug;
}, QuestionCollection.prototype.getChallengeSlug = function() {
return this.challenge_slug;
}, QuestionCollection.prototype.baseURL = function() {
return "challenges/" + this.challenge_slug + "/questions";
}, QuestionCollection.prototype.pageURL = function() {
return "" + this.ns() + "challenges/" + this.challenge_slug + "/forum/questions";
}, QuestionCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.QuestionCollection = QuestionCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, RatingHistoryCollection, _ref;
return RatingHistoryCollection = function(_super) {
function RatingHistoryCollection() {
return RatingHistoryCollection.__super__.constructor.apply(this, arguments);
}
return __extends(RatingHistoryCollection, _super), RatingHistoryCollection.prototype.model = window.HR.RatingHistory, 
RatingHistoryCollection.prototype.setHacker = function(username) {
this.username = username;
}, RatingHistoryCollection.prototype.showLoader = !1, RatingHistoryCollection.prototype.restPrefix = !1, 
RatingHistoryCollection.prototype.restURL = function() {
return "rest/hackers/" + this.username + "/rating_histories";
}, RatingHistoryCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.RatingHistoryCollection = RatingHistoryCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SecondaryEmailCollection, _ref;
return SecondaryEmailCollection = function(_super) {
function SecondaryEmailCollection() {
return SecondaryEmailCollection.__super__.constructor.apply(this, arguments);
}
return __extends(SecondaryEmailCollection, _super), SecondaryEmailCollection.prototype.model = window.HR.SecondaryEmailModel, 
SecondaryEmailCollection.prototype.url = function() {
return "/rest/secondary_emails";
}, SecondaryEmailCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.SecondaryEmailCollection = SecondaryEmailCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SubmissionsCollection, _ref;
return SubmissionsCollection = function(_super) {
function SubmissionsCollection() {
return SubmissionsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(SubmissionsCollection, _super), SubmissionsCollection.prototype.model = window.HR.SubmissionModel, 
SubmissionsCollection.prototype.baseURL = function() {
return _.isObject(this.challenge) ? "challenges/" + this.challenge_slug + "/submissions/" :"submissions/";
}, SubmissionsCollection.prototype.setContest = function(contest_slug) {
this.contest_slug = contest_slug;
}, SubmissionsCollection.prototype.setChallenge = function(challenge_slug) {
return challenge_slug ? (this.challenge_slug = challenge_slug, this.challenge = HR.model("challenge", {
slug:challenge_slug,
contest_slug:this.contest_slug
}).cached()) :void 0;
}, SubmissionsCollection.prototype.cacheTimeout = 10, SubmissionsCollection.prototype.collectionCrumbs = function() {
var crumbs;
return crumbs = SubmissionsCollection.__super__.collectionCrumbs.call(this), this.challenge && (this.challenge.id || this.listenToOnce(this.challenge, "reset", this.breadCrumbs), 
crumbs.merge(this.challenge.modelCrumbs())), crumbs;
}, SubmissionsCollection.prototype.setPage = function(page) {
return this.page = page;
}, SubmissionsCollection.prototype.getTotal = function() {
return this.total;
}, SubmissionsCollection.prototype.getCurrentPage = function() {
return this.page;
}, SubmissionsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.SubmissionsCollection = SubmissionsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TeamsCollection, _ref;
return TeamsCollection = function(_super) {
function TeamsCollection() {
return TeamsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(TeamsCollection, _super), TeamsCollection.prototype.url = function() {
return "/rest/teams";
}, TeamsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.TeamsCollection = TeamsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TeamMembersCollection, _ref;
return TeamMembersCollection = function(_super) {
function TeamMembersCollection() {
return TeamMembersCollection.__super__.constructor.apply(this, arguments);
}
return __extends(TeamMembersCollection, _super), TeamMembersCollection.prototype.url = function() {
return "/rest/teams/" + this.team_id + "/members";
}, TeamMembersCollection.prototype.setTeamId = function(team_id) {
this.team_id = team_id;
}, TeamMembersCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.TeamMembersCollection = TeamMembersCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TestCaseCollection, _ref;
return TestCaseCollection = function(_super) {
function TestCaseCollection() {
return TestCaseCollection.__super__.constructor.apply(this, arguments);
}
return __extends(TestCaseCollection, _super), TestCaseCollection.prototype.model = window.HR.TestCaseModel, 
TestCaseCollection.prototype.url = function() {
return "/rest/challenges/" + this.challenge_id + "/testcases/";
}, TestCaseCollection.prototype.setChallengeId = function(challenge_id) {
this.challenge_id = challenge_id;
}, TestCaseCollection.prototype.getChallengeId = function() {
return this.challenge_id;
}, TestCaseCollection.prototype.parse = function(resp) {
return this.total = resp.total, resp.models;
}, TestCaseCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestCaseCollection = TestCaseCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TrackCollection, _ref;
return TrackCollection = function(_super) {
function TrackCollection() {
return TrackCollection.__super__.constructor.apply(this, arguments);
}
return __extends(TrackCollection, _super), TrackCollection.prototype.model = window.HR.TrackModel, 
TrackCollection.prototype.baseURL = function() {
return "/tracks";
}, TrackCollection.prototype.defaultHierarchy = function() {
var members;
return members = HR.collection("track"), this.first() && members.merge(this.first().defaultHierarchy()), 
members;
}, TrackCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.TrackCollection = TrackCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CampusRepStatsCollection, HR, _ref;
return CampusRepStatsCollection = function(_super) {
function CampusRepStatsCollection() {
return CampusRepStatsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(CampusRepStatsCollection, _super), CampusRepStatsCollection.prototype.url = function() {
return "/rest/campus_rep_hackers";
}, CampusRepStatsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.CampusRepStatsCollection = CampusRepStatsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengesCollection, HR, _ref;
return Administration_ChallengesCollection = function(_super) {
function Administration_ChallengesCollection() {
return Administration_ChallengesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengesCollection, _super), Administration_ChallengesCollection.prototype.url = function() {
var url;
return url = "/rest/administration", this.contest_id && (url += "/contests/" + this.contest_id), 
url += "/challenges?" + this.queryParams();
}, Administration_ChallengesCollection.prototype.baseURL = function() {
var url;
return url = "administration", this.contest_id && (url += "/contests/edit/" + this.contest_id), 
url += "/challenges/", this.query && (url += "query/" + this.query + "/"), url += "page/";
}, Administration_ChallengesCollection.prototype.setContestId = function(contest_id) {
this.contest_id = contest_id;
}, Administration_ChallengesCollection.prototype.setQuery = function(query) {
this.query = query;
}, Administration_ChallengesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ChallengesCollection = Administration_ChallengesCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompaniesCollection, HR, _ref;
return Administration_CompaniesCollection = function(_super) {
function Administration_CompaniesCollection() {
return Administration_CompaniesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompaniesCollection, _super), Administration_CompaniesCollection.prototype.url = function() {
var url;
return url = "/rest/administration", this.contest_id && (url += "/contests/" + this.contest_id), 
url += "/companies?" + this.queryParams();
}, Administration_CompaniesCollection.prototype.baseURL = function() {
var url;
return url = "administration", this.contest_id && (url += "/contests/edit/" + this.contest_id), 
url += "/companies/", this.query && (url += "query/" + this.query + "/"), url += "page/";
}, Administration_CompaniesCollection.prototype.setContestId = function(contest_id) {
this.contest_id = contest_id;
}, Administration_CompaniesCollection.prototype.setQuery = function(query) {
this.query = query;
}, Administration_CompaniesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_CompaniesCollection = Administration_CompaniesCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyContestsCollection, HR, _ref;
return Administration_CompanyContestsCollection = function(_super) {
function Administration_CompanyContestsCollection() {
return Administration_CompanyContestsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyContestsCollection, _super), Administration_CompanyContestsCollection.prototype.url = function() {
var url;
return url = "/rest/administration/companies/" + this.company_id + "/contests";
}, Administration_CompanyContestsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_CompanyContestsCollection = Administration_CompanyContestsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ContestsCollection, HR, _ref;
return Administration_ContestsCollection = function(_super) {
function Administration_ContestsCollection() {
return Administration_ContestsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ContestsCollection, _super), Administration_ContestsCollection.prototype.url = function() {
return "/rest/administration/contests?" + this.queryParams();
}, Administration_ContestsCollection.prototype.baseURL = function() {
var url;
return url = "administration/contests/", this.query && (url += "query/" + this.query + "/"), 
url += "page/";
}, Administration_ContestsCollection.prototype.setQuery = function(query) {
this.query = query;
}, Administration_ContestsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ContestsCollection = Administration_ContestsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_HackerboardCollection, HR, _ref;
return Administration_HackerboardCollection = function(_super) {
function Administration_HackerboardCollection() {
return Administration_HackerboardCollection.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_HackerboardCollection, _super), Administration_HackerboardCollection.prototype.url = function() {
return "/rest/administration/companies/" + this.company_id + "/contests/" + this.contest_id + "/hackerboard?" + this.queryParams();
}, Administration_HackerboardCollection.prototype.baseURL = function() {
return "administration/companies/edit/" + this.company_id + "/applicants/" + this.contest_id + "/page/";
}, Administration_HackerboardCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_HackerboardCollection = Administration_HackerboardCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_HackerboardSubmissionsCollection, HR, _ref;
return Administration_HackerboardSubmissionsCollection = function(_super) {
function Administration_HackerboardSubmissionsCollection() {
return Administration_HackerboardSubmissionsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_HackerboardSubmissionsCollection, _super), Administration_HackerboardSubmissionsCollection.prototype.url = function() {
return "/rest/administration/companies/" + this.company_id + "/contests/" + this.contest_id + "/hackers/" + this.hacker_id + "/hackerboard/submissions";
}, Administration_HackerboardSubmissionsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_HackerboardSubmissionsCollection = Administration_HackerboardSubmissionsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_TestCasesCollection, HR, _ref;
return Administration_TestCasesCollection = function(_super) {
function Administration_TestCasesCollection() {
return Administration_TestCasesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_TestCasesCollection, _super), Administration_TestCasesCollection.prototype.url = function() {
return "/rest/administration/challenges/" + this.challenge_id + "/test_cases";
}, Administration_TestCasesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_TestCasesCollection = Administration_TestCasesCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
}, __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
jQuery(function() {
var DashboardRouter, HR, _ref;
return DashboardRouter = function(_super) {
function DashboardRouter() {
return DashboardRouter.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardRouter, _super), DashboardRouter.prototype.routes = {
"":"default_route",
"_=_":"default_route",
"blog/:id":"singlepost",
"blog/:id/":"singlepost",
"blog/page/:page":"blogindex",
"blog/":"blogindex",
blog:"blogindex",
"blog/index/":"blogindex",
"blog/index":"blogindex",
"blog/:id/edit":"edit_blog",
"blog/:id/edit/":"edit_blog",
dashboard:"dashboard",
"contests/:contest_slug/dashboard":"dashboard",
"challenges/:challenge_slug/submissions":"challengeSubmissions",
"contests/:contest_slug/challenges/:challenge_slug/submissions":"challengeSubmissions",
"challenges/:challenge_slug/submissions/":"challengeSubmissions",
"contests/:contest_slug/challenges/:challenge_slug/submissions/":"challengeSubmissions",
"challenges/:challenge_slug/submissions/:page":"challengeSubmissions",
"contests/:contest_slug/challenges/:challenge_slug/submissions/:page":"challengeSubmissions",
"challenges/:challenge_hash/forum/questions":"questions",
"contests/:contest_slug/challenges/:challenge_hash/forum/questions":"questions",
"challenges/:challenge_hash/forum/questions/page/:page":"questions",
"contests/:contest_slug/challenges/:challenge_hash/forum/questions/page/:page":"questions",
"challenges/:challenge_hash/forum/questions/ask":"askQuestion",
"contests/:contest_slug/challenges/:challenge_hash/forum/questions/ask":"askQuestion",
"challenges/:challenge_hash/forum/questions/ask/:question_id":"askQuestion",
"contests/:contest_slug/challenges/:challenge_hash/forum/questions/ask/:question_id":"askQuestion",
"challenges/:challenge_hash/forum/questions/:question_id":"questions",
"contests/:contest_slug/challenges/:challenge_hash/forum/questions/:question_id":"questions",
leaderboard:"defaultLeaderboard",
archived_leaderboard:"archivedLeaderboard",
"archived_leaderboard/:page":"archivedLeaderboard",
classic_leaderboard:"archivedLeaderboard",
"classic_leaderboard/:page":"archivedLeaderboard",
"classic_leaderboard/filter/:filterString":"archivedFilterLeaderboard",
"classic_leaderboard/filter/:filterString/:page":"archivedFilterLeaderboard",
"contests/:contest_slug/leaderboard":"defaultLeaderboard",
"leaderboard/":"defaultLeaderboard",
"contests/:contest_slug/leaderboard/":"defaultLeaderboard",
"leaderboard/:page":"defaultLeaderboard",
"contests/:contest_slug/leaderboard/:page":"defaultLeaderboard",
"leaderboard/filter/:filterString":"filterLeaderboard",
"contests/:contest_slug/leaderboard/filter/:filterString":"filterLeaderboard",
"leaderboard/filter/:filterString/:page":"filterLeaderboard",
"contests/:contest_slug/leaderboard/filter/:filterString/:page":"filterLeaderboard",
"challenges/:challenge_slug/leaderboard":"masterChallengeLeaderboard",
"challenges/:challenge_slug/leaderboard/:page":"masterChallengeLeaderboard",
"challenges/:challenge_slug/leaderboard/filter/:filterString":"masterFilterChallengeLeaderboard",
"challenges/:challenge_slug/leaderboard/filter/:filterString/:page":"masterFilterChallengeLeaderboard",
"contests/:contest_slug/challenges/:challenge_slug/leaderboard":"challengeLeaderboard",
"contests/:contest_slug/challenges/:challenge_slug/leaderboard/:page":"challengeLeaderboard",
"contests/:contest_slug/challenges/:challenge_slug/leaderboard/filter/:filterString":"filterChallengeLeaderboard",
"contests/:contest_slug/challenges/:challenge_slug/leaderboard/filter/:filterString/:page":"filterChallengeLeaderboard",
"challenges/:challenge_slug/language/:language/leaderboard":"languageLeaderboard",
"challenges/:challenge_slug/language/:language/leaderboard/:page":"languageLeaderboard",
"challenges/:challenge_slug/language/:language/leaderboard/filter/:filterString":"filterLanguageLeaderboard",
"challenges/:challenge_slug/language/:language/leaderboard/filter/:filterString/:page":"filterLanguageLeaderboard",
"contests/:contest_slug/challenges/:challenge_slug/language/:language/leaderboard":"languageLeaderboard",
"contests/:contest_slug/challenges/:challenge_slug/language/:language/leaderboard/:page":"languageLeaderboard",
"contests/:contest_slug/challenges/:challenge_slug/language/:language/leaderboard/filter/:filterString":"filterLanguageLeaderboardfilter",
"contests/:contest_slug/challenges/:challenge_slug/language/:language/leaderboard/filter/:filterString/:page":"filterLanguageLeaderboard",
categories:"categoriesRedirect",
"categories/:category":"topCategoryRedirect",
"categories/:category/:track":"categoryChallengesList",
"categories/:category/:track/sort/:sort_by":"categoryChallengesList",
"categories/:category/:track/challenges(/filter/:filter)(/sort/:sort_by)(/dir/:direction)(/page/:page)":"filteredCategoryChallengesList",
"categories/:category/:track/challenges/page/:page":"categoryChallengesList",
"categories/:category/:track/challenges/sort/:sort_by/page/:page":"categoryChallengesList",
challenges:"categoriesRedirect",
"contests/:contest_slug/challenges":"contestChallengesList",
"contests/:contest_slug/challenges/filter/:filter":"contestChallengesList",
"contests/:contest_slug/challenges/page/:page":"contestChallengesList",
"contests/:contest_slug/challenges/filter/:filter/page/:page/":"contestChallengesList",
"challenges/:challenge_hash":"challenges",
"contests/:contest_slug/challenges/:challenge_hash":"challenges",
"leaderboard/nvn":"nvnLeaderboard",
"contests/:contest_slug/leaderboard/nvn":"nvnLeaderboard",
"leaderboard/nvn/:page":"nvnLeaderboard",
"contests/:contest_slug/leaderboard/nvn/:page":"nvnLeaderboard",
"leaderboard/nvn/kind/:kind":"nvnKindLeaderboard",
"contests/:contest_slug/leaderboard/nvn/kind/:kind":"nvnKindLeaderboard",
"leaderboard/nvn/kind/:kind/:page":"nvnKindLeaderboard",
"contests/:contest_slug/leaderboard/nvn/kind/:kind/:page":"nvnKindLeaderboard",
"leaderboard/:kind/:value":"networkLeaderboard",
"contests/:contest_slug/leaderboard/:kind/:value":"networkLeaderboard",
"leaderboard/:kind/:value/:page":"networkLeaderboard",
"contests/:contest_slug/leaderboard/:kind/:value/:page":"networkLeaderboard",
submissions:"submissions",
"contests/:contest_slug/submissions":"submissions",
"contests/:contest_slug/judge/submissions":"judge_contest_submissions",
"contests/:contest_slug/judge/submissions/:page":"judge_contest_submissions",
"contests/:contest_slug/challenges/:challenge_slug/judge/submissions":"judge_submissions",
"contests/:contest_slug/challenges/:challenge_slug/judge/submissions/:page":"judge_submissions",
"contests/:contest_slug/judge/submissions/team/:team_slug":"judge_team_submissions",
"contests/:contest_slug/judge/submissions/team/:team_slug/:page":"judge_team_submissions",
"contests/:contest_slug/judge/submissions/challenge/:challenge_slug":"judge_challenge_submissions",
"contests/:contest_slug/judge/submissions/challenge/:challenge_slug/:page":"judge_challenge_submissions",
"submissions/:kind":"submissions",
"contests/:contest_slug/submissions/:kind":"submissions",
"submissions/:kind/page/:page":"submissions",
"contests/:contest_slug/submissions/:kind/page/:page":"submissions",
"submissions/:kind/:submissions_id":"submission",
"contests/:contest_slug/submissions/:kind/:submissions_id":"submission",
"submissions/:kind/:submissions_id/:_filter":"submission",
"contests/:contest_slug/submissions/:kind/:submissions_id/:_filter":"submission",
"submissions/:kind/:submissions_id/:element/:element_id":"submission",
"contests/:contest_slug/submissions/:kind/:submissions_id/:element/:element_id":"submission",
"submissions/:kind/:submissions_id/:_filter/:element/:element_id":"submission",
"contests/:contest_slug/submissions/:kind/:submissions_id/:_filter/:element/:element_id":"submission",
"playoffs/:challenge_hash/round/:round_id":"playoffs",
"contests/:contest_slug/playoffs/:challenge_hash/round/:round_id":"playoffs",
"checklist/:challenge_slug":"checklist",
"contests/:contest_slug/checklist/:challenge_slug":"checklist",
scoring:"scoring",
"contests/:contest_slug/scoring":"scoring",
"scoring/:section":"scoring",
"contests/:contest_slug/scoring/:section":"scoring",
problemsetter:"problemsetter",
"problemsetter/:section":"problemsetter",
companies:"companies",
"companies/:slug":"companies",
administration:"administration_redirect",
"administration/:resource":"administration_resource_list",
"administration/:resource/page/:page":"administration_resource_list",
"administration/:resource/query/:query":"administration_resource_list",
"administration/:resource/query/:query/page/:page":"administration_resource_list",
"administration/contests/:action":"administration_contest_edit",
"administration/contests/:action/:contest_id":"administration_contest_edit",
"administration/contests/:action/:contest_id/:tab":"administration_contest_edit",
"administration/contests/edit/:contest_id/challenges/page/:page":"administration_contest_edit_challenges",
"administration/contests/edit/:contest_id/challenges/:action":"administration_contest_challenge_edit",
"administration/contests/edit/:contest_id/challenges/:action/:challenge_id":"administration_contest_challenge_edit",
"administration/contests/edit/:contest_id/challenges/:action/:challenge_id/:tab":"administration_contest_challenge_edit",
"administration/challenges/:action":"administration_challenge_edit",
"administration/challenges/:action/:challenge_id":"administration_challenge_edit",
"administration/challenges/:action/:challenge_id/:tab":"administration_challenge_edit",
"administration/companies/:action":"administration_company_edit",
"administration/companies/:action/:company_id":"administration_company_edit",
"administration/companies/:action/:company_id/:tab":"administration_company_edit",
"administration/companies/:action/:company_id/:tab/:tab_id":"administration_company_edit",
"administration/companies/:action/:company_id/:tab/:tab_id/page/:page":"administration_company_edit",
"administration/companies/:action/:company_id/:tab/:tab_id/page/:page/hackers/:hacker_id":"administration_company_edit",
manage:"manage_home",
"manage/":"manage_home",
"manage/challenge":"manage_challenge",
"manage/challenge/":"manage_challenge",
"manage/challenge/:page":"manage_challenge",
"manage/challenge/edit/:id":"edit_challenge",
"manage/challenge/edit/:id/:tabm":"edit_challenge",
"manage/challenge/edit/:id/:tabm/":"edit_challenge",
"manage/challenge/:filter/:page":"manage_challenge_filtered",
"manage/template/edit/:id":"edit_template",
"manage/contest":"manage_contest",
"manage/contest/":"manage_contest",
"manage/contest/new":"new_contest",
"manage/contest/new/":"new_contest",
"manage/contest/:page":"manage_contest",
"manage/contest/edit/:id":"edit_contest",
"manage/contest/edit/:id/":"edit_contest",
"manage/contest/notifications/:contest_slug":"manage_notification",
"manage/contest/notifications/:contest_slug/":"manage_notification",
"manage/contest/edit/:id/:tabm":"edit_contest",
"manage/contest/edit/:id/:tabm/":"edit_contest",
"hackerclubs/:country":"hackerclubs",
apply:"hacker_application",
"apply/:slug":"hacker_application",
"contests/:contest_slug/apply":"hacker_application",
"contests/:contest_slug/apply/:challenge_slug":"hacker_application",
"challenges/:challenges_slug/apply":"hacker_application",
"challenges/:challenges_slug/apply/:slug":"hacker_application",
"contests/:contest_slug/challenges/:contest_slug/apply":"hacker_application",
"contests/:contest_slug/challenges/:contest_slug/apply/:slug":"hacker_application",
"manage/applications":"manage_applications",
"manage/applications/":"manage_applications",
"manage/applications/:company_slug":"manage_applications",
"manage/applications/:company_slug/":"manage_applications",
"manage/applications/:company_slug/:filter/:page":"manage_applications",
"manage/:contest_slug/applications":"manage_applications",
"manage/:contest_slug/applications/":"manage_applications",
"manage/:contest_slug/applications/:company_slug":"manage_applications",
"manage/:contest_slug/applications/:company_slug/":"manage_applications",
"manage/:contest_slug/applications/:company_slug/:filter/:page":"manage_applications",
"manage/contests/:contest_slug/all_submissions":"admin_submissions",
"manage/contests/:contest_slug/all_submissions/":"admin_submissions",
"manage/contests/:contest_slug/all_submissions/:page":"admin_submissions",
"manage/contests/:contest_slug/all_submissions/:filter":"admin_submissions",
"manage/contests/:contest_slug/all_submissions/:filter/":"admin_submissions",
"manage/contests/:contest_slug/all_submissions/:filter/:page":"admin_submissions",
"applications/:key":"company_applications",
"applications/:key/":"company_applications",
"applications/:key/:filter/:page":"company_applications",
"contests/:contest_slug/applications/:key":"company_applications",
"contests/:contest_slug/applications/:key/":"company_applications",
"contests/:contest_slug/applications/:key/:filter/:page":"company_applications",
"teams/create":"teams_create",
"contests/:contest_slug/teams/create":"teams_create",
"teams/:team_id/:action":"teams",
"contests/:contest_slug/teams/:team_id/:action":"teams",
"teams/:team_id":"teams",
"contests/:contest_slug/teams/:team_id":"teams",
teams:"teams",
"contests/:contest_slug/teams":"teams",
careers:"careers",
"careers/:position":"careers",
calendar:"calendar",
faq:"faq",
api:"apihome",
"api/docs":"api",
"contests/:contest_slug/faq":"faq",
"faq/:tab":"faq",
"contests/:contest_slug/faq/:tab":"faq",
environment:"environment",
"contests/:contest_slug/environment":"environment",
"environment/:tab":"environment",
"contests/:contest_slug/environment/:tab":"environment",
"contests/:contest_slug/settings":"settings",
"contests/:contest_slug/settings/:tab":"settings",
settings:"settings",
"settings/:tab":"settings",
"contests/:contest_slug/showgame/:game_id":"showgame",
notifications:"notifications",
"notifications/page/:page":"notificationsPage",
"notifications/notif_id/:id":"notificationsSingle",
"contests/:contest_slug/notifications":"notifications",
"showgame/:game_id":"showgame",
sampletemplate:"sampletemplate",
sampletemplate1:"sampletemplate1",
sampletemplate2:"sampletemplate2",
sampletemplate3:"sampletemplate3",
"sampletemplate/:template":"sample_template_generic",
"sampletemplate/recruit/:template":"sample_recruit_generic",
privacy:"privacy",
inbox:"inbox",
"inbox/":"inbox",
"inbox/thread/:thread_id":"inbox",
"inbox/thread/:thread_id/":"inbox",
contests:"contests",
"contests/":"contests",
"contests/:contest_slug":"contests",
"contests/:contest_slug/":"contests",
"contests/:contest_slug/:page":"contests",
ai:"categoriesRedirect",
algorithm:"categoriesRedirect",
golf:"categoriesRedirect",
weekly:"categoriesRedirect",
":contest_slug/leaderboard*i":"contestsLegacyRedirect",
":contest_slug/challenges*i":"contestsLegacyRedirect",
":contest_slug/submissions*i":"contestsLegacyRedirect",
":slug":"vanity",
":slug/":"vanity",
"tests/login/:unique_id":"recruit_candidate_outer",
"tests/login/:unique_id/:authkey":"recruit_candidate_outer",
"tests/:aid/page/:page":"recruit_candidate_inner",
"tests/:aid/page/:page/:qid":"recruit_candidate_inner",
"*i":"e404"
}, DashboardRouter.prototype.initialize = function() {
var that;
return HR.appView = new HR.AppView(), HR.fellowHacker = HR.fellowHacker || {}, window.mixpanel_data = {
landing:!0,
contest:"",
challenge:""
}, that = this, Backbone.history.loadUrl = function(fragmentOverride) {
var fragment, matched;
return fragment = this.fragment = this.getFragment(fragmentOverride), -1 !== fragment.indexOf("?") && (fragment = fragment.split("?")[0]), 
HR.appView.setLoadingView(), matched = _.any(this.handlers, function(handler) {
return handler.route.test(fragment) ? (handler.callback(fragment), !0) :void 0;
});
}, Backbone.history.bind("route", function() {
var fragment, title;
return that.log(arguments), HR.util.scrollToTop(), title = $("title").html(), fragment = document.location.pathname, 
"undefined" != typeof pSUPERFLY && "undefined" != typeof pSUPERFLY.virtualPage && "" !== fragment && pSUPERFLY.virtualPage(fragment, title), 
window.mixpanel_data = {}, _gaq.push([ "_trackPageview", "/" + fragment ]), this.current_fragment = fragment, 
HR.current_page = fragment, "undefined" != typeof pSUPERFLY && pSUPERFLY.virtualPage(fragment, title), 
HR.appView && HR.appView.navigationView && HR.appView.navigationView.nav_login_patch && HR.appView.navigationView.nav_login_patch.setTeamName(), 
this;
}), DashboardRouter.__super__.initialize.apply(this, arguments);
}, DashboardRouter.prototype.log = Backbone.log, DashboardRouter.prototype.route = function(route, name, callback) {
return _.isRegExp(route) || (route = this._routeToRegExp(route)), callback || (callback = this[name]), 
Backbone.history || (Backbone.history = new Backbone.History()), Backbone.history.route(route, _.bind(function(fragment) {
var args;
return route = new RegExp(route.toString().split("([?]|[?][^?]*|)").join("").slice(1, -1)), 
args = this._extractParameters(route, fragment), callback && callback.apply(this, args), 
this.trigger.apply(this, [ "route:" + name ].concat(args)), this.trigger("route", name, args), 
Backbone.history.trigger("route", this, name, args);
}, this)), this;
}, DashboardRouter.prototype._routeToRegExp = function(route) {
return route = route.replace(/[\-{}\[\]+?.,\\\^$|\#\s]/g, "\\$&").replace(/\((.*?)\)/g, "(?:$1)?").replace(/(\(\?)?:\w+/g, "([^/]+)").replace(/\*\w+/g, "(.*?)"), 
new RegExp("^" + route + "([?]|[?][^?]*|)$");
}, DashboardRouter.prototype.default_route = function() {
return HR.appController.set_contest_namespace("master"), this.navigate("/challenges", {
trigger:!0,
replace:!0
});
}, DashboardRouter.prototype.hackerclubs = function(country) {
var hacker_clubs;
return null == country && (country = ""), hacker_clubs = new HR.HackerClubCollection("hacker-club"), 
hacker_clubs.slug = country, hacker_clubs.cached(), HR.requires("compound/extra-views", function() {
var hacker_clubs_view;
return hacker_clubs_view = new HR.HackerClubsView({
collection:hacker_clubs
}), HR.appView.setContentView(hacker_clubs_view);
});
}, DashboardRouter.prototype.dashboard = function() {
return HR.requires("compound/profile-views", function() {
var dashboardView;
return dashboardView = new HR.DashboardView(), HR.appView.setContentView(dashboardView);
});
}, DashboardRouter.prototype.sample_template_generic = function(template) {
return HR.requires("compound/extra-views", function() {
var sampletemplate_view;
return sampletemplate_view = new HR.SampleTemplateView({
template:template
}), HR.appView.setContentView(sampletemplate_view);
});
}, DashboardRouter.prototype.sample_recruit_generic = function(template) {
return HR.requires("compound/extra-views", function() {
var sampletemplate_view;
return sampletemplate_view = new HR.SampleTemplateView({
template:"recruit/" + template
}), HR.appView.setContentView(sampletemplate_view);
});
}, DashboardRouter.prototype.sampletemplate = function() {
return HR.requires("compound/extra-views", function() {
var sampletemplate_view;
return sampletemplate_view = new HR.SampleTemplateView({
template:"sampletemplate"
}), HR.appView.setContentView(sampletemplate_view);
});
}, DashboardRouter.prototype.sampletemplate1 = function() {
return HR.requires("compound/extra-views", function() {
var playoff_view;
return playoff_view = new HR.SampleTemplate1View(), HR.appView.setContentView(playoff_view);
});
}, DashboardRouter.prototype.recruit_candidate_outer = function(unique_id, authkey) {
return null == unique_id && (unique_id = null), null == authkey && (authkey = null), 
window.recruit_test_mode = !0, HR.requires("compound/recruit-views", function() {
var candidate_view;
return candidate_view = new HR.RecruitCandidateLoginView({
unique_id:unique_id,
authkey:authkey
}), HR.appView.setContentView(candidate_view);
});
}, DashboardRouter.prototype.recruit_candidate_inner = function(aid, page, qid) {
return null == page && (page = "list"), null == qid && (qid = null), window.recruit_test_mode = !0, 
HR.requires("compound/recruit-views", function() {
var candidate_view;
return candidate_view = "list" === page ? new HR.RecruitCandidateListView({
aid:aid
}) :new HR.RecruitCandidateQuestionView({
aid:aid,
qid:qid,
page:page
}), HR.appView.setContentView(candidate_view);
});
}, DashboardRouter.prototype.singlepost = function(id) {
var blog, hacker;
return blog = HR.model("blog", {
id:id
}).cached(), hacker = HR.profile(), HR.requires("compound/extra-views", function() {
var singlepost_view;
return singlepost_view = new HR.SinglePostView({
model:blog,
current_hacker:hacker
}), HR.appView.setContentView(singlepost_view);
});
}, DashboardRouter.prototype.blogindex = function(page) {
var blogs, hacker;
return null == page && (page = 1), blogs = HR.collection("blogs"), blogs.setPage(page), 
blogs.cached(), hacker = HR.profile(), HR.requires("compound/extra-views", function() {
var blogindex_view;
return blogindex_view = new HR.BlogIndexView({
collection:blogs,
current_hacker:hacker
}), HR.appView.setContentView(blogindex_view);
}), HR.appController.setTitle("Blogs");
}, DashboardRouter.prototype.edit_blog = function(id) {
var blog, current_hacker, key;
return key = "id-" + id, "new" === id && (key = "id-" + id + "-" + Math.round(1e4 * Math.random() + 1e5)), 
blog = HR.model("blog", {
id:id
}).cached(), current_hacker = HR.profile(), HR.requires("compound/extra-views", function() {
var blogadmin_view;
return blogadmin_view = new HR.BlogAdminView({
model:blog,
current_hacker:current_hacker
}), HR.appView.setContentView(blogadmin_view);
}), HR.appController.setTitle("Blogs-Edit");
}, DashboardRouter.prototype.battles = function() {
var level_id;
return level_id = 3, HR.requries("compound/game-views", function() {
var battle_view;
return battle_view = new HR.BattleView({
level:level_id
}), HR.appView.setContentView(battle_view);
});
}, DashboardRouter.prototype.playoffs = function(contest_slug, challenge_slug, round_id) {
var fragment, fragments, that, _playoff_clbk;
return null == contest_slug && (contest_slug = null), null == challenge_slug && (challenge_slug = null), 
null == round_id && (round_id = null), fragment = Backbone.history.fragment, fragments = fragment.split("playoffs"), 
"" === fragments[0] ? (round_id = challenge_slug, challenge_slug = contest_slug, 
contest_slug = null) :(that = this, HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), _playoff_clbk = function(collection) {
return collection.setSlug(challenge_slug), collection.setRound(round_id);
}, HR.requires("compound/extra-views", function() {
return this.playoff_view = new HR.PlayoffsView(), this.playoff_view.setCollection(HR.collection("playoff", {
slug:challenge_slug
}).cached()), this.playoff_view.setContest(HR.model("contest").cache()), this.playoff_view.setChallenge(HR.model("challenge", {
slug:challenge_slug
}).cached()), HR.appView.setContentView(this.playoff_view);
});
}, DashboardRouter.prototype.sampletemplate2 = function() {
var sampletemplate_view;
return sampletemplate_view = new HR.SampleTemplate2View(), HR.appView.setContentView(sampletemplate_view);
}, DashboardRouter.prototype.privacy = function() {
return HR.requires("compound/extra-views", function() {
var privacy_view;
return privacy_view = new HR.PrivacyView(), HR.appView.setContentView(privacy_view);
}), window.mixpanel_data.landing = !1;
}, DashboardRouter.prototype.careers = function(position) {
return null == position && (position = null), HR.requires("compound/extra-views", function() {
var careers_view;
return null === position && (position = "product-hacker"), careers_view = new HR.CareersView({
position:position
}), HR.appView.setContentView(careers_view), HR.appController.setTitle("Careers :: HackerRank");
}), window.mixpanel_data.landing = !1;
}, DashboardRouter.prototype.challengesList = function(page, track, contest_slug, as_track, category_slugs, filter, sort_by, sort_dir) {
var activeCategory, challenges, challenges_view, contest, that, title;
return null == page && (page = 1), null == track && (track = null), null == contest_slug && (contest_slug = null), 
null == as_track && (as_track = !1), null == category_slugs && (category_slugs = null), 
null == filter && (filter = null), null == sort_by && (sort_by = null), null == sort_dir && (sort_dir = null), 
that = this, title = "Challenges", contest_slug || (contest_slug = "master"), this.log(page, track, contest_slug, as_track, category_slugs, filter), 
HR.appController.setTitle(title), contest = new HR.ContestModel({
slug:contest_slug
}), contest.fetch({
async:!1
}), challenges = HR.collection("challenges"), challenges._filter = filter, filter && challenges.setFilters(filter.split("+")), 
challenges.setSortBy(sort_by), challenges.setSortDir(sort_dir), challenges.setContest(contest_slug), 
challenges.setPage(page), challenges.setCategories(category_slugs), challenges.setLoginTracking(!0), 
challenges.limit = contest.get("challenges_per_page"), challenges.cached(), null !== category_slugs && category_slugs.length > 1 && (activeCategory = category_slugs[0]), 
challenges_view = new HR.ChallengesView({
challenges:challenges,
category_slugs:category_slugs,
activeCategory:activeCategory,
contest_slug:contest_slug,
contest:contest,
filter:filter
}), HR.appView.setContentView(challenges_view), HR.util.setTab("challenges"), null === contest_slug && (contest_slug = "master"), 
HR.appController.set_contest_namespace(contest_slug), window.mixpanel_data = {
landing:!1,
contest:contest_slug,
page_type:"challengespage"
};
}, DashboardRouter.prototype.contestChallengesList = function(contest_slug, page, filter, sort_by, sort_dir) {
return null == contest_slug && (contest_slug = null), null == page && (page = 1), 
null == filter && (filter = null), null == sort_by && (sort_by = null), null == sort_dir && (sort_dir = null), 
this.challengesList(page, null, contest_slug, !1, null, filter, sort_by, sort_dir);
}, DashboardRouter.prototype.filteredCategoryChallengesList = function(category, track, filter, sort_by, sort_dir, page) {
return null == filter && (filter = null), null == sort_by && (sort_by = null), null == sort_dir && (sort_dir = null), 
null == page && (page = 1), this.categoryChallengesList(category, track, page, filter, sort_by, sort_dir);
}, DashboardRouter.prototype.categoryChallengesList = function(category, track, page, filter, sort_by, sort_dir) {
var category_slugs;
return null == page && (page = 1), null == filter && (filter = null), null == sort_by && (sort_by = null), 
null == sort_dir && (sort_dir = null), category_slugs = [ category, track ], $.cookie("hr_categories", _.compact(category_slugs)), 
this.challengesList(page, null, null, !1, category_slugs, filter, sort_by, sort_dir);
}, DashboardRouter.prototype.topCategoryRedirect = function(category) {
var autoFillMissing, categories, category_slugs, contest;
return contest = new HR.ContestModel().cached(), category_slugs = [ category ], 
categories = contest.currentCategories(category_slugs, autoFillMissing = !0), this.navigate(categories.last().pageURL(), {
trigger:!0,
replace:!0
});
}, DashboardRouter.prototype.categoriesRedirect = function(contest_slug) {
var that;
return null == contest_slug && (contest_slug = null), that = this, new HR.ContestModel().cached({
success:function(model) {
var categories, category_slugs, contest;
return contest = model, category_slugs = $.cookie("hr_categories") || "ai", category_slugs && (category_slugs = category_slugs.split(",")), 
categories = contest.currentCategories(category_slugs), HR.router.navigate(categories.last().pageURL(), {
trigger:!0,
replace:!0
});
}
});
}, DashboardRouter.prototype.challenges = function(contest_slug, challenge_slug) {
var fragment, fragments, model, options, that;
return null == contest_slug && (contest_slug = null), null == challenge_slug && (challenge_slug = null), 
fragment = Backbone.history.fragment, fragments = fragment.split("challenges"), 
"" === fragments[0] ? (challenge_slug = contest_slug, contest_slug = null) :(that = this, 
HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), HR.util.setTab("challenge"), options = {
slug:challenge_slug,
contest_slug:contest_slug
}, model = HR.model("challenge", options).cached(), HR.requires("compound/challenge-views", function() {
var challenge_view;
return challenge_view = new HR.ChallengeView({
model:model,
activeTab:"problem"
}), HR.appView.setContentView(challenge_view);
}), null === contest_slug && (contest_slug = "master"), HR.appController.set_contest_namespace(contest_slug), 
window.mixpanel_data = {
landing:!1,
contest:contest_slug,
page_type:"challengepage",
challenge:challenge_slug
};
}, DashboardRouter.prototype.questions = function(contest_slug, challenge_slug, question_id) {
var challenge, fragment, fragments, options, page, question_model, that, _page;
return null == contest_slug && (contest_slug = null), null == challenge_slug && (challenge_slug = null), 
null == question_id && (question_id = null), fragment = Backbone.history.fragment, 
fragments = fragment.split("challenges"), "" === fragments[0] ? (question_id = challenge_slug, 
challenge_slug = contest_slug, contest_slug = null) :(that = this, HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), fragments = fragment.split("questions"), page = null, fragments.length > 1 && 0 === fragments[1].indexOf("/page") && (page = question_id, 
question_id = null), HR.util.setTab("challenge"), options = {
slug:challenge_slug,
contest_slug:contest_slug
}, challenge = HR.model("challenge", options).cached(), null !== question_id ? (question_model = new HR.QuestionModel({
challenge_slug:challenge_slug,
contest_slug:contest_slug,
id:question_id
}), HR.requires("compound/forum-views", function() {
var question_view;
return question_view = new HR.QuestionView({
challenge:challenge,
model:question_model
}), HR.requires("compound/challenge-views", function() {
var challenge_view;
return challenge_view = new HR.ChallengeView({
model:challenge,
activeTab:"forum",
customView:question_view
}), HR.appView.setContentView(challenge_view);
});
})) :HR.requires("compound/challenge-views", function() {
var challenge_view;
return challenge_view = new HR.ChallengeView({
model:challenge,
activeTab:"forum",
paramPage:page
}), HR.appView.setContentView(challenge_view);
}), null === contest_slug && (contest_slug = "master"), HR.appController.set_contest_namespace(contest_slug), 
_page = "View Post", null === question_id && (_page = "Forum Home"), window.mixpanel_data.landing = !1, 
window.mixpanel_data.contest = contest_slug, window.mixpanel_data.challenge = challenge_slug;
}, DashboardRouter.prototype.calendar = function() {
return HR.requires("compound/calendar-views", function() {
var calendar_view;
return calendar_view = new HR.CalendarView(), HR.appView.setContentView(calendar_view), 
HR.appController.setTitle("Programming Contest Calendar");
});
}, DashboardRouter.prototype.askQuestion = function(contest_slug, challenge_slug, question_id) {
var challenge, fragment, fragments, options, that;
return null == contest_slug && (contest_slug = null), null == challenge_slug && (challenge_slug = null), 
null == question_id && (question_id = null), fragment = Backbone.history.fragment, 
fragments = fragment.split("challenges"), "" === fragments[0] ? (question_id = challenge_slug, 
challenge_slug = contest_slug, contest_slug = null) :(that = this, HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), HR.util.setTab("challenge"), options = {
slug:challenge_slug,
contest_slug:contest_slug
}, challenge = HR.model("challenge", options).cached(), HR.requires("compound/forum-views", function() {
var challenge_ask_question_view;
return challenge_ask_question_view = new HR.ChallengeAskQuestionView({
challenge:challenge,
question_id:question_id
}), HR.requires("compound/challenge-views", function() {
var challenge_view;
return challenge_view = new HR.ChallengeView({
model:challenge,
activeTab:"forum",
customView:challenge_ask_question_view
}), HR.appView.setContentView(challenge_view);
});
}), null === contest_slug && (contest_slug = "master"), HR.appController.set_contest_namespace(contest_slug), 
window.mixpanel_data.landing = !1, window.mixpanel_data.contest = contest_slug, 
window.mixpanel_data.challenge = challenge_slug;
}, DashboardRouter.prototype.leaderboard = function(extra_options) {
var defaults, leaderboard, leaderboard_view, options, _contest;
return defaults = {
page:1,
filterString:null,
base_slug:null
}, options = _.extend(defaults, extra_options), options.page || (options.page = 1), 
leaderboard = HR.collection("leaderboard"), leaderboard.setPage(options.page), leaderboard.setContestSlug(options.contest_slug), 
options.challenge_slug && (leaderboard.setChallenge(options.challenge_slug), leaderboard.setChallengeLeaderboard(), 
options.language && (leaderboard.setLanguage(options.language), leaderboard.setLanguageLeaderboard())), 
options.track_slug && (leaderboard.setTrack(options.track_slug), leaderboard.setTrackLeaderboard()), 
options.filterString && leaderboard.setFiltersFromString(options.filterString), 
leaderboard.cached(), _contest = HR.model("contest"), _contest.set("slug", extra_options.contest_slug), 
_contest.cached(), leaderboard_view = new HR.LeaderboardView({
collection:leaderboard,
profile:HR.profile(),
contest:_contest
}), HR.util.setTab("leaderboard"), HR.appController.setTitle("Leaderboard"), HR.appView.setContentView(leaderboard_view), 
null === options.contest_slug && (options.contest_slug = "master"), HR.appController.set_contest_namespace(options.contest_slug), 
window.mixpanel_data.landing = !1, window.mixpanel_data.contest = options.contest_slug;
}, DashboardRouter.prototype.parseLeaderboardArgs = function(args, expected) {
var page;
return args = _.toArray(args), args.length === expected - 1 ? (page = parseInt(_.last(args), 10), 
_.isFinite(page) && page.toString() === _.last(args) ? args.unshift(null) :args.push(null)) :args.length === expected - 2 && (args.unshift(null), 
args.push(null)), args;
}, DashboardRouter.prototype.defaultLeaderboard = function(contest_slug, page) {
var args;
return null == contest_slug && (contest_slug = "master"), null == page && (page = null), 
args = this.parseLeaderboardArgs(arguments, 2), this.leaderboard({
contest_slug:args[0],
page:args[1]
});
}, DashboardRouter.prototype.archivedLeaderboard = function(page, filterString) {
var leaderboard, leaderboard_view, _contest;
return null == page && (page = 1), null == filterString && (filterString = ""), 
leaderboard = HR.collection("leaderboard"), leaderboard.setPage(page), leaderboard.setContestSlug("master"), 
leaderboard.setArchived(!0), filterString && leaderboard.setFiltersFromString(filterString), 
leaderboard.cached(), _contest = HR.model("contest"), _contest.setSlug("master"), 
_contest.cached(), leaderboard_view = new HR.LeaderboardView({
collection:leaderboard,
profile:HR.profile(),
contest:_contest,
archived:!0
}), HR.util.setTab("leaderboard"), HR.appController.setTitle("Leaderboard"), HR.appView.setContentView(leaderboard_view), 
HR.appController.set_contest_namespace("master");
}, DashboardRouter.prototype.archivedFilterLeaderboard = function(filterString, page) {
return null == page && (page = 1), this.archivedLeaderboard(page, filterString);
}, DashboardRouter.prototype.filterLeaderboard = function(contest_slug, filterString, page) {
var args;
return null == contest_slug && (contest_slug = "master"), null == filterString && (filterString = null), 
null == page && (page = null), args = this.parseLeaderboardArgs(arguments, 3), this.leaderboard({
contest_slug:args[0],
filterString:args[1],
page:args[2]
});
}, DashboardRouter.prototype.challengeLeaderboard = function(contest_slug, challenge_slug, page, filterString) {
var model, options;
return null == contest_slug && (contest_slug = "master"), null == challenge_slug && (challenge_slug = null), 
null == page && (page = null), null == filterString && (filterString = null), options = {
slug:challenge_slug,
contest_slug:contest_slug
}, model = HR.model("challenge", options).cached(), HR.requires("compound/challenge-views", function() {
var challenge_view;
return challenge_view = new HR.ChallengeView({
model:model,
activeTab:"leaderboard",
paramPage:page,
leaderboardFilter:filterString
}), HR.appView.setContentView(challenge_view);
});
}, DashboardRouter.prototype.masterChallengeLeaderboard = function(challenge_slug, page, filterString) {
var model, options;
return null == challenge_slug && (challenge_slug = null), null == page && (page = null), 
null == filterString && (filterString = null), options = {
slug:challenge_slug,
contest_slug:"master"
}, model = HR.model("challenge", options).cached(), HR.requires("compound/challenge-views", function() {
var challenge_view;
return challenge_view = new HR.ChallengeView({
model:model,
activeTab:"leaderboard",
paramPage:page,
leaderboardFilter:filterString
}), HR.appView.setContentView(challenge_view);
});
}, DashboardRouter.prototype.filterChallengeLeaderboard = function(contest_slug, challenge_slug, filterString, page) {
var args;
return null == contest_slug && (contest_slug = "master"), null == challenge_slug && (challenge_slug = null), 
null == filterString && (filterString = null), null == page && (page = null), args = this.parseLeaderboardArgs(arguments, 4), 
contest_slug = args[0], challenge_slug = args[1] || contest_slug, page = _.last(args) || 1, 
filterString = args[2], this.challengeLeaderboard(contest_slug, challenge_slug, page, filterString);
}, DashboardRouter.prototype.masterFilterChallengeLeaderboard = function(challenge_slug, filterString, page) {
var contest_slug;
return null == challenge_slug && (challenge_slug = null), null == filterString && (filterString = null), 
null == page && (page = null), contest_slug = "master", challenge_slug = challenge_slug, 
page = page, filterString = filterString, this.masterChallengeLeaderboard(challenge_slug, page, filterString);
}, DashboardRouter.prototype.languageLeaderboard = function(contest_slug, challenge_slug, language, page) {
var args;
return null == contest_slug && (contest_slug = "master"), null == challenge_slug && (challenge_slug = null), 
null == language && (language = null), null == page && (page = null), args = this.parseLeaderboardArgs(arguments, 4), 
this.leaderboard({
contest_slug:args[0],
challenge_slug:args[1],
language:args[2],
page:_.last(args)
});
}, DashboardRouter.prototype.filterLanguageLeaderboard = function(contest_slug, challenge_slug, language, filterString, page) {
var args;
return null == contest_slug && (contest_slug = "master"), null == challenge_slug && (challenge_slug = null), 
null == language && (language = null), null == filterString && (filterString = null), 
null == page && (page = null), args = this.parseLeaderboardArgs(arguments, 5), this.leaderboard({
contest_slug:args[0],
challenge_slug:args[1],
language:args[2],
filterString:args[3],
page:_.last(args)
});
}, DashboardRouter.prototype.nvnLeaderboard = function(contest_slug, page, kind, internal) {
var fragment, fragments, leaderboard, leaderboard_view, that;
return null == contest_slug && (contest_slug = null), null == page && (page = null), 
null == kind && (kind = null), null == internal && (internal = !1), internal || (fragment = Backbone.history.fragment, 
fragments = fragment.split("leaderboard/nvn"), "" === fragments[0] ? (kind = page, 
page = contest_slug, contest_slug = null) :(that = this, HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
}))), (null === page || "" === page) && (page = 1), HR.appController.setTitle("Network vs Network Leaderboard"), 
HR.util.setTab("leaderboard"), leaderboard = new HR.NvNLeaderboardCollection(), 
leaderboard.setPage(page), kind && leaderboard.setKind(kind), leaderboard_view = new HR.NvNLeaderboardView({
collection:leaderboard
}), HR.appView.setContentView(leaderboard_view), null === contest_slug && (contest_slug = "master"), 
window.mixpanel_data.landing = !1, window.mixpanel_data.contest = contest_slug;
}, DashboardRouter.prototype.nvnKindLeaderboard = function(contest_slug, kind, page) {
var fragment, fragments, that;
return null == contest_slug && (contest_slug = null), null == kind && (kind = null), 
null == page && (page = null), fragment = Backbone.history.fragment, fragments = fragment.split("leaderboard/nvn/kind"), 
"" === fragments[0] ? (page = kind, kind = contest_slug, contest_slug = null) :(that = this, 
HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), (null === page || "" === page) && (page = 1), HR.appController.setTitle("Network vs Network Leaderboard"), 
this.nvnLeaderboard(contest_slug, page, kind, !0);
}, DashboardRouter.prototype.judge_submissions = function(contest_slug, challenge_slug, team_slug, page) {
return null == contest_slug && (contest_slug = null), null == challenge_slug && (challenge_slug = null), 
null == team_slug && (team_slug = null), null == page && (page = null), HR.appController.set_contest_namespace(contest_slug), 
(null === page || "" === page || _.isNaN(parseInt(page))) && (page = 1), HR.appController.setTitle("Submissions"), 
null !== challenge_slug && HR.appController.setTitle("" + challenge_slug + " Submissions"), 
HR.util.setTab("submissions"), HR.requires("compound/submission-views", function() {
var submissions;
return submissions = HR.collection("judge-submissions"), submissions.page = page, 
submissions.contest_slug = contest_slug, submissions.challenge_slug = challenge_slug, 
submissions.team_slug = team_slug, submissions.fetch({
success:function() {
return function() {
var submissions_view;
return submissions_view = new HR.JudgeSubmissionsView({
collection:submissions,
team_slug:team_slug,
challenge_slug:challenge_slug
}), HR.appView.setContentView(submissions_view);
};
}(this)
});
}), window.mixpanel_data.landing = !1, window.mixpanel_data.contest = contest_slug, 
window.mixpanel_data.challenge = challenge_slug, window.mixpanel_data.page_type = "judge_submissions";
}, DashboardRouter.prototype.judge_contest_submissions = function(contest_slug, page) {
return null == contest_slug && (contest_slug = null), null == page && (page = null), 
this.judge_submissions(contest_slug, null, null, page);
}, DashboardRouter.prototype.judge_team_submissions = function(contest_slug, team_slug, page) {
return null == contest_slug && (contest_slug = null), null == page && (page = null), 
this.judge_submissions(contest_slug, null, team_slug, page);
}, DashboardRouter.prototype.judge_challenge_submissions = function(contest_slug, challenge_slug, page) {
return null == contest_slug && (contest_slug = null), null == page && (page = null), 
this.judge_submissions(contest_slug, challenge_slug, null, page);
}, DashboardRouter.prototype.submissions = function(contest_slug, kind, page, challenge_slug, internal) {
var fragment, fragments, module, that, _kind;
return null == contest_slug && (contest_slug = null), null == kind && (kind = null), 
null == page && (page = null), null == challenge_slug && (challenge_slug = null), 
null == internal && (internal = !1), module = !1, fragment = Backbone.history.fragment, 
fragments = fragment.split("/"), internal || ("submissions" === fragments[0] ? (challenge_slug = page, 
page = kind, kind = contest_slug, contest_slug = null) :(that = this, HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" === resp.type ? module = !1 :"module" === resp.type ? module = !0 :that.e404();
}
}))), null === kind ? (_kind = $.cookie("hr_submissions_kind"), _kind || (_kind = "all", 
$.cookie("hr_submissions_kind", _kind)), fragments.push(_kind), HR.router.navigate(fragments.join("/"), {
trigger:!0,
replace:!0
}), void 0) :($.cookie("hr_submissions_kind", kind), (null === page || "" === page || _.isNaN(parseInt(page))) && (page = 1), 
null === challenge_slug && HR.appController.setTitle("Submissions"), HR.util.setTab("submissions"), 
HR.requires("compound/submission-views", function() {
var submissions, submissions_view;
return challenge_slug ? (submissions = HR.collection("submissions"), submissions.setPage(page), 
submissions.setContest(contest_slug), submissions.setChallenge(challenge_slug), 
submissions.cached(), submissions_view = new HR.SubmissionsView({
collection:submissions
})) :__indexOf.call(fragments, "grouped") >= 0 ? (submissions = HR.collection("grouped-submissions"), 
submissions.setPage(page), submissions.setContest(contest_slug), submissions.cached(), 
submissions_view = new HR.GroupedSubmissionsView({
collection:submissions
})) :(submissions = HR.collection("chronological-submissions"), submissions.setPage(page), 
submissions.setContest(contest_slug), submissions.cached(), submissions_view = new HR.ChronologicalSubmissionsView({
collection:submissions
})), HR.appView.setContentView(submissions_view);
}), null === contest_slug && (contest_slug = "master"), HR.appController.set_contest_namespace(contest_slug), 
window.mixpanel_data.landing = !1, window.mixpanel_data.contest = contest_slug, 
window.mixpanel_data.challenge = challenge_slug, window.mixpanel_data.page_type = "submissions");
}, DashboardRouter.prototype.challengeSubmissions = function(contest_slug, challenge_slug, page) {
var fragment, fragments, model, options, that;
return null == contest_slug && (contest_slug = null), null == challenge_slug && (challenge_slug = null), 
null == page && (page = null), fragment = Backbone.history.fragment, fragments = fragment.split("challenges"), 
"" === fragments[0] ? (page = challenge_slug, challenge_slug = contest_slug, contest_slug = null) :(that = this, 
HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), (null === page || "" === page) && (page = 1), options = {
slug:challenge_slug,
contest_slug:contest_slug
}, model = HR.model("challenge", options).cached(), HR.requires("compound/challenge-views", function() {
var challenge_view;
return challenge_view = new HR.ChallengeView({
model:model,
activeTab:"submissions",
paramPage:page
}), HR.appView.setContentView(challenge_view);
}), null === contest_slug && (contest_slug = "master"), window.mixpanel_data.landing = !1, 
window.mixpanel_data.contest = contest_slug, window.mixpanel_data.challenge = challenge_slug;
}, DashboardRouter.prototype.submission = function(contest_slug, kind, submission_id, _filter, element, element_id) {
var contest, fragment, fragments, game_id, page, submission_model, that;
return null == contest_slug && (contest_slug = null), null == kind && (kind = null), 
null == submission_id && (submission_id = null), null == _filter && (_filter = null), 
null == element && (element = null), null == element_id && (element_id = null), 
fragment = Backbone.history.fragment, fragments = fragment.split("submissions"), 
"" === fragments[0] ? (element_id = element, element = _filter, _filter = submission_id, 
submission_id = kind, kind = contest_slug, contest_slug = null) :(that = this, HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), !element_id && element && (element_id = element, element = _filter, _filter = null), 
contest_slug && HR.appController.set_contest_namespace(contest_slug), contest = HR.model("contest"), 
contest_slug && contest.set("slug", contest_slug), contest.cached(), HR.appController.setTitle("Submission Details"), 
HR.util.setTab("submissions"), submission_id && kind && (element && "page" !== element ? "play" === element && (game_id = element_id, 
(HR.game && HR.game.get("id") !== game_id || !HR.game) && (HR.game = new HR.GameModel({
id:game_id
}), HR.game.fetch(), HR.requires("compound/game-views", function() {
return HR.game_view = new HR.GameView({
model:HR.game
});
})), HR.appView.setContentView(HR.game_view), HR.game_view.render()) :(page = "page" === element ? element_id :1, 
null === _filter && (_filter = "all"), submission_model = HR.model("submission", {
id:submission_id,
filter:_filter,
contest_slug:contest_slug
}).cached(), HR.requires("compound/submission-views", function() {
var gameset_collection;
return this.submission_view || (this.submission_view = new HR.SubmissionView({
contest:contest
})), this.submission_view.setSubmissionModel(submission_model), "game" === kind && (gameset_collection = HR.collection("game-set"), 
gameset_collection.setPage(page), gameset_collection.setFilter(_filter), gameset_collection.setSid(submission_id), 
gameset_collection.cached(), this.submission_view.setGameSetCollection(gameset_collection)), 
this.submission_view.gameset && this.submission_view.gameset.resetGameSetView(), 
HR.appView.setContentView(this.submission_view);
}))), null === contest_slug && (contest_slug = "master"), window.mixpanel_data.landing = !1, 
window.mixpanel_data.contest = contest_slug, window.mixpanel_data.challenge = submission_model.slug;
}, DashboardRouter.prototype.administration_redirect = function() {
return this.navigate("/administration/contests", {
trigger:!0,
replace:!0
});
}, DashboardRouter.prototype.administration_resource_list = function(resource, query, page) {
var fragment;
return null == resource && (resource = "contests"), null == query && (query = null), 
null == page && (page = 1), fragment = Backbone.history.fragment, 1 === fragment.split("query").length && fragment.split("page").length > 1 && (page = query, 
query = null), "contests" !== resource && "challenges" !== resource && "companies" !== resource ? (this.e404(), 
void 0) :this.loggedIn() ? HR.requires("compound/administration-views", function() {
var collection, _clbk, _view;
return _clbk = function(collection) {
return query && collection.setQuery(query), collection.page = page;
}, collection = HR.appController.getCollection("administration-" + resource, "page-" + page, _clbk), 
_view = new HR.Administration_ResourceListView({
collection:collection,
page:page,
resource:resource,
query:query
}), HR.appView.setContentView(_view), HR.appController.setTitle("Manage " + _.capitalize(resource)), 
HR.appController.set_contest_namespace("master");
}) :void 0;
}, DashboardRouter.prototype.administration_contest_edit_challenges = function(contest_id, page) {
return null == contest_id && (contest_id = null), null == page && (page = 1), this.administration_contest_edit("edit", contest_id, "challenges", page);
}, DashboardRouter.prototype.administration_contest_edit = function(action, contest_id, tab, page) {
return null == action && (action = null), null == contest_id && (contest_id = null), 
null == tab && (tab = null), null == page && (page = 1), "create" === action && null === contest_id && null === tab || "edit" === action && null !== contest_id && null !== tab ? this.loggedIn() ? HR.requires("compound/administration-views", function() {
var model, _clbk, _view;
return _clbk = function(model) {
return model.set("id", contest_id);
}, model = HR.appController.getModel("administration-contest", "id-" + contest_id, _clbk), 
_view = new HR.Administration_ContestEditView({
model:model,
tab:tab,
action:action,
contest_id:contest_id,
page:page
}), HR.appView.setContentView(_view), HR.appController.setTitle("Contest " + _.capitalize(action));
}) :void 0 :"edit" === action && null !== contest_id && null === tab ? this.navigate("/administration/contests/" + action + "/" + contest_id + "/overview", {
trigger:!0,
replace:!0
}) :this.e404();
}, DashboardRouter.prototype.administration_challenge_edit = function(action, challenge_id, tab) {
return null == action && (action = null), null == challenge_id && (challenge_id = null), 
null == tab && (tab = null), this.administration_contest_challenge_edit(null, action, challenge_id, tab);
}, DashboardRouter.prototype.administration_contest_challenge_edit = function(contest_id, action, challenge_id, tab) {
return null == contest_id && (contest_id = null), null == action && (action = null), 
null == challenge_id && (challenge_id = null), null == tab && (tab = null), "create" === action && null === challenge_id && null === tab || "edit" === action && null !== challenge_id && null !== tab ? this.loggedIn() ? HR.requires("compound/administration-views", function() {
var model, _clbk, _view;
return _clbk = function(model) {
return contest_id && model.set("contest_id", contest_id), model.set("challenge_id", challenge_id);
}, model = HR.appController.getModel("administration-challenge", "id-" + challenge_id, _clbk), 
_view = new HR.Administration_ChallengeEditView({
model:model,
tab:tab,
action:action,
contest_id:contest_id,
challenge_id:challenge_id
}), HR.appView.setContentView(_view), HR.appController.setTitle("Challenge " + _.capitalize(action));
}) :void 0 :"edit" === action && null !== challenge_id && null === tab ? contest_id ? this.navigate("/administration/contests/edit/" + contest_id + "/challenges/edit/" + challenge_id + "/overview", {
trigger:!0,
replace:!0
}) :this.navigate("/administration/challenges/edit/" + challenge_id + "/overview", {
trigger:!0,
replace:!0
}) :this.e404();
}, DashboardRouter.prototype.administration_company_edit = function(action, company_id, tab, tab_id, page, hacker_id) {
return null == action && (action = null), null == company_id && (company_id = null), 
null == tab && (tab = null), null == tab_id && (tab_id = null), null == page && (page = 1), 
null == hacker_id && (hacker_id = null), "create" === action && null === company_id && null === tab || "edit" === action && null !== company_id && null !== tab ? this.loggedIn() ? HR.requires("compound/administration-views", function() {
var model, _clbk, _view;
return _clbk = function(model) {
return model.set("company_id", company_id);
}, model = HR.appController.getModel("administration-company", "id-" + company_id, _clbk), 
_view = new HR.Administration_CompanyEditView({
model:model,
tab:tab,
action:action,
company_id:company_id,
tab_id:tab_id,
page:page,
hacker_id:hacker_id
}), HR.appView.setContentView(_view), HR.appController.setTitle("Challenge " + _.capitalize(action));
}) :void 0 :"edit" === action && null !== company_id && null === tab ? this.navigate("/administration/companies/edit/" + company_id + "/overview", {
trigger:!0,
replace:!0
}) :this.e404();
}, DashboardRouter.prototype.manage_home = function() {
return this.loggedIn() ? HR.requires("compound/extra-views", function() {
var _view;
return _view = new HR.Manage_HomeView(), HR.appView.setContentView(_view), HR.appController.setTitle("Management");
}) :(this.e404(), void 0);
}, DashboardRouter.prototype.manage_challenge_filtered = function(filter, page) {
var collection;
return this.loggedIn() ? (HR.appController.setTitle("Challenge List"), collection = HR.collection("manage-challenge-list"), 
collection.query = filter, collection.setPage(page), collection.fetch({
success:function() {
return function() {
return HR.requires("compound/extra-views", function() {
var challenge_list_view;
return challenge_list_view = new HR.Manage_ChallengeListView({
collection:collection
}), HR.appView.setContentView(challenge_list_view);
});
};
}(this)
})) :(this.e404(), void 0);
}, DashboardRouter.prototype.manage_challenge = function(page, filter) {
var collection;
return null == page && (page = 1), null == filter && (filter = ""), this.loggedIn() ? (HR.appController.setTitle("Challenge List"), 
collection = HR.collection("manage-challenge-list"), collection.setPage(page), collection.fetch({
success:function() {
return function() {
return HR.requires("compound/extra-views", function() {
var challenge_list_view;
return challenge_list_view = new HR.Manage_ChallengeListView({
collection:collection
}), HR.appView.setContentView(challenge_list_view);
});
};
}(this)
})) :(this.e404(), void 0);
}, DashboardRouter.prototype.edit_challenge = function(id, current_tab) {
var key, model;
return null == id && (id = null), null == current_tab && (current_tab = "basic"), 
this.loggedIn() ? (HR.appController.setTitle("Challenge Editor"), key = "id-" + id, 
"new" === id && (key = "id-" + id + "-" + Math.round(1e4 * Math.random() + 1e4)), 
model = HR.model("manage_-challenge"), "new" !== id ? (model.setId(id), model.fetch({
success:function(mdl) {
return HR.requires("compound/extra-views", function() {
var challenge_edit_view;
return challenge_edit_view = new HR.Manage_ChallengeEditView({
model:mdl,
current_tab:current_tab
}), HR.appView.setContentView(challenge_edit_view);
});
}
})) :HR.requires("compound/extra-views", function() {
var challenge_edit_view;
return challenge_edit_view = new HR.Manage_ChallengeEditView({
model:model
}), HR.appView.setContentView(challenge_edit_view);
})) :(this.e404(), void 0);
}, DashboardRouter.prototype.edit_template = function(id) {
var _templatemodel;
return null == id && (id = null), this.loggedIn() ? (HR.appController.setTitle("Template Editor"), 
_templatemodel = HR.appController.getModel("managetemplate", "id-" + id, null, !1), 
"new" !== id && _templatemodel.setId(id), HR.requires("compound/extra-views", function() {
var template_edit_view;
return template_edit_view = new HR.Manage_TemplateEditView({
model:_templatemodel
}), HR.appView.setContentView(template_edit_view);
})) :(this.e404(), void 0);
}, DashboardRouter.prototype.manage_contest = function(page) {
var collection;
return null == page && (page = 1), this.loggedIn() ? (HR.appController.setTitle("HackerRank Contests"), 
collection = HR.collection("manage-contest-list"), collection.setPage(page), collection.fetch({
success:function() {
return function() {
return HR.requires("compound/extra-views", function() {
var contest_list_view;
return contest_list_view = new HR.Manage_ContestListView({
collection:collection
}), HR.appView.setContentView(contest_list_view);
});
};
}(this)
})) :(this.e404(), void 0);
}, DashboardRouter.prototype.new_contest = function() {
return HR.requires("compound/extra-views", function() {
return function() {
var new_contest, new_contest_view;
return new_contest = new HR.Manage_ContestModel(), new_contest_view = new HR.Manage_NewContestView({
model:new_contest
}), HR.appView.setContentView(new_contest_view);
};
}(this)), this;
}, DashboardRouter.prototype.edit_contest = function(id, current_tab) {
var _contest;
return null == current_tab && (current_tab = "basic"), this.loggedIn() ? (HR.appController.setTitle("Contest Editor"), 
_contest = new HR.Manage_ContestModel().setId(id), HR.requires("compound/extra-views", "moment", function() {
var contest_edit_view;
return contest_edit_view = new HR.Manage_ContestEditView({
model:_contest,
current_tab:current_tab
}), HR.appView.setContentView(contest_edit_view);
})) :(this.e404(), void 0);
}, DashboardRouter.prototype.hacker_application = function(contest_slug, challenge_slug, company_slug) {
var collection, fragment;
return null == contest_slug && (contest_slug = null), null == challenge_slug && (challenge_slug = null), 
null == company_slug && (company_slug = null), fragment = Backbone.history.fragment, 
"" === fragment.split("contests")[0] || ("" === fragment.split("challenges")[0] ? (company_slug = challenge_slug, 
challenge_slug = contest_slug, contest_slug = null) :"" === fragment.split("apply")[0] && (company_slug = contest_slug, 
challenge_slug = null, contest_slug = null)), this.loggedIn() ? (null === contest_slug && (contest_slug = "master"), 
HR.appController.setTitle("Apply to Company"), collection = new HR.CompaniesCollection(), 
collection.contest_slug = contest_slug, collection.challenge_slug = challenge_slug, 
collection.fetch({
success:function() {
return function(collection) {
var _hacker;
return _hacker = HR.profile(), HR.requires("compound/extra-views", function() {
var _view;
return _view = new HR.ParticipantApplicationView({
companies:collection,
hacker:_hacker
}), HR.appView.setContentView(_view);
});
};
}(this)
})) :(this.e404(), void 0);
}, DashboardRouter.prototype.manage_notification = function(contest_slug) {
var contest, notification;
return null == contest_slug && (contest_slug = null), this.loggedIn() ? (contest = new HR.ContestModel({
slug:contest_slug
}), contest.fetch({
async:!1
}), notification = new HR.Manage_NotificationModel({
contest_id:contest.get("id")
}), HR.requires("compound/extra-views", function() {
var notificationview;
return notificationview = new HR.Manage_NotificationView({
model:notification,
contest:contest
}), HR.appView.setContentView(notificationview);
})) :(this.e404(), void 0);
}, DashboardRouter.prototype.manage_applications = function(contest_slug, company_slug, filter, page) {
var contest, fragment, _collection;
return null == contest_slug && (contest_slug = null), null == company_slug && (company_slug = null), 
null == filter && (filter = null), null == page && (page = null), this.loggedIn() ? (fragment = Backbone.history.fragment, 
contest = new HR.ContestModel(), contest.set("slug", contest_slug), contest.cached(), 
"" === fragment.split("manage/applications")[0] && (page = filter, filter = company_slug, 
company_slug = contest_slug, contest_slug = "master"), (null === page || "" === page) && (page = 1), 
_collection = HR.appController.getCollection("hackerapplications", "page-" + page, function(collection) {
return collection.setContestId(contest_slug), collection.setCompanyId(company_slug), 
collection.setPage(page), collection.setFilterString(filter);
}, !0, !0, !0), HR.requires("compound/extra-views", function() {
var _view;
return _view = new HR.Manage_HackerApplicationsView({
collection:_collection,
contest:contest
}), HR.appView.setContentView(_view);
})) :(this.e404(), void 0);
}, DashboardRouter.prototype.admin_submissions = function(contest_slug, filter, page) {
var fragment, _collection;
return null == contest_slug && (contest_slug = null), null == filter && (filter = null), 
null == page && (page = null), this.loggedIn() ? (fragment = Backbone.history.fragment, 
null === page && (page = 1), null === filter && (filter = ""), null === contest_slug && (contest_slug = "master"), 
_collection = HR.appController.getCollection("submission_hackers", "" + contest_slug + "-" + filter + "-page-" + page, function() {
return function(collection) {
return collection.setFilterString(filter), collection.setContest(contest_slug), 
collection.setPage(page), collection.fetch({
success:function(collection) {
return HR.requires("compound/extra-views", function() {
var _view;
return _view = new HR.Manage_HackerSubmissionsView({
collection:collection
}), HR.appView.setContentView(_view);
});
}
});
};
}(this), !1, !1)) :(this.e404(), void 0);
}, DashboardRouter.prototype.company_applications = function(contest_slug, key, filter, page) {
var contest, fragment;
return null == contest_slug && (contest_slug = null), null == key && (key = null), 
null == filter && (filter = null), null == page && (page = null), fragment = Backbone.history.fragment, 
"" === fragment.split("applications")[0] && (page = filter, filter = key, key = contest_slug, 
contest_slug = "master"), (null === page || "" === page) && (page = 1), contest = new HR.ContestModel(), 
contest.set("slug", contest_slug), contest.cached(), $.ajax({
url:"/rest/contests/" + contest_slug + "/companies/verify?key=" + key,
method:"GET",
success:function(_this) {
return function(resp) {
var company_slug, _collection;
return company_slug = resp.company, _collection = HR.appController.getCollection("hackerapplications", "page-" + page, function(collection) {
return collection.setContestId(contest_slug), collection.setCompanyId(company_slug), 
collection.setPage(page), collection.setKey(key), collection.setFilterString(filter);
}, !1, !1), _this.log(_collection), _collection.fetch({
disableThrobber:!0,
success:function() {
return HR.requires("compound/extra-views", function() {
var _view;
return _view = new HR.Manage_HackerApplicationsView({
collection:_collection,
contest:contest
}), HR.appView.setContentView(_view);
});
}
});
};
}(this),
error:function(_this) {
return function() {
return _this.e404();
};
}(this)
});
}, DashboardRouter.prototype.e404 = function() {
return HR.appController.setTitle("HTTP 404: Page Not Found"), HR.appView.setContentView(HR.E404View), 
_gaq.push([ "_trackPageview", "/404?page=" + Backbone.history.fragment ]);
}, DashboardRouter.prototype.eLogin = function() {
return HR.util.ShowLoginDialog({
success_callback:function() {
return window.location.reload();
}
}).render(), this.e404();
}, DashboardRouter.prototype.loggedIn = function() {
var profile;
return profile = HR.profile(), profile.isLoggedIn() ? !0 :(HR.appController.setTitle("HTTP 401: Authorization Required"), 
HR.appView.setContentView(HR.ELoginView), _gaq.push([ "_trackPageview", "/loginError?page=" + Backbone.history.fragment ]), 
!1);
}, DashboardRouter.prototype.settings = function(contest_slug, tab) {
var fragment, fragments, that;
return null == contest_slug && (contest_slug = null), null == tab && (tab = null), 
fragment = Backbone.history.fragment, fragments = fragment.split("settings"), "" === fragments[0] ? (tab = contest_slug, 
contest_slug = null) :(that = this, HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), HR.appController.setTitle("Settings"), HR.util.setTab("profile"), null === tab && (tab = "profile", 
HR.router.navigate("settings/" + tab, !1)), HR.model("profile").cached({
fetch:!0,
disableThrobber:!0
}), HR.requires("compound/profile-views", function() {
var settings_view;
return settings_view = new HR.SettingsView({
model:HR.profile(),
tab:tab
}), HR.appView.setContentView(settings_view);
}), null === contest_slug && (contest_slug = "master"), HR.appController.set_contest_namespace(contest_slug), 
window.mixpanel_data.landing = !1;
}, DashboardRouter.prototype.scoring = function(contest_slug, section) {
var fragment, fragments, that;
return null == contest_slug && (contest_slug = null), null == section && (section = null), 
fragment = Backbone.history.fragment, fragments = fragment.split("scoring"), "" === fragments[0] ? (section = contest_slug, 
contest_slug = null) :(that = this, HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), HR.requires("compound/extra-views", function() {
var scoring_view;
return HR.appController.setTitle("Scoring"), scoring_view = new HR.ScoringView({
section:section,
model:HR.model("contest").cached()
}), HR.appView.setContentView(scoring_view);
}), window.mixpanel_data.landing = !1;
}, DashboardRouter.prototype.apihome = function() {
return HR.requires("compound/extra-views", function() {
var api_home_view;
return HR.appController.setTitle("API"), api_home_view = new HR.APIHomeView(), HR.appView.setContentView(api_home_view);
});
}, DashboardRouter.prototype.api = function() {
return HR.requires("compound/extra-views", function() {
var api_view;
return HR.appController.setTitle("API"), api_view = new HR.APIView(), HR.appView.setContentView(api_view);
});
}, DashboardRouter.prototype.faq = function(contest_slug, tab) {
var fragment, fragments, that;
return null == contest_slug && (contest_slug = null), null == tab && (tab = ""), 
fragment = Backbone.history.fragment, fragments = fragment.split("faq"), "" === fragments[0] ? (tab = contest_slug, 
contest_slug = null) :(that = this, HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), HR.requires("compound/extra-views", function() {
var faq_view;
return HR.appController.setTitle("FAQ"), faq_view = new HR.FaqView({
tab:tab
}), HR.appView.setContentView(faq_view);
});
}, DashboardRouter.prototype.problemsetter = function(contest_slug, section) {
var fragment, fragments, that;
return null == contest_slug && (contest_slug = null), null == section && (section = null), 
fragment = Backbone.history.fragment, fragments = fragment.split("problemsetter"), 
"" === fragments[0] ? (section = contest_slug, contest_slug = null) :(that = this, 
HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), HR.requires("compound/extra-views", function() {
var problem_setter_view;
return problem_setter_view = new HR.ProblemSetterView({
section:section
}), HR.appView.setContentView(problem_setter_view);
}), window.mixpanel_data.landing = !1;
}, DashboardRouter.prototype.environment = function(contest_slug, tab) {
var fragment, fragments, that;
return null == contest_slug && (contest_slug = null), null == tab && (tab = ""), 
fragment = Backbone.history.fragment, fragments = fragment.split("environment"), 
"" === fragments[0] ? (tab = contest_slug, contest_slug = null) :(that = this, HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), HR.requires("compound/extra-views", function() {
var environment_view;
return HR.appController.setTitle("Environment"), environment_view = new HR.EnvironmentView({
tab:tab
}), HR.appView.setContentView(environment_view);
}), window.mixpanel_data.landing = !1;
}, DashboardRouter.prototype.contests = function(contest_slug, page) {
var collection, contest, contests_view;
return null == contest_slug && (contest_slug = null), null == page && (page = 1), 
collection = new HR.ContestsCollection({
key:"active",
contest_slug:contest_slug,
page:page
}), contest = null, contest_slug && "archived" !== contest_slug && (contest = new HR.ContestModel({
slug:contest_slug
}).cached()), contests_view = new HR.ContestsView({
collection:collection.cached(),
contest:contest,
profile:HR.profile(),
contest_slug:contest_slug,
page:page
}), HR.appView.setContentView(contests_view), HR.util.setTab("contests"), HR.appController.setTitle("Contests"), 
null === contest_slug && HR.appController.set_contest_namespace("master"), window.mixpanel_data.landing = !1;
}, DashboardRouter.prototype.vanity = function(slug) {
return HR.appController.slugDetector(slug, function(resp) {
var _page;
return "contest" === resp.type ? this.navigate("contests/" + slug, {
trigger:!0,
replace:!0
}) :"hacker" === resp.type ? HR.requires("compound/profile-views", function() {
var hacker_profile_view, hackermodel;
return hackermodel = HR.model("hacker-profile", {
username:slug
}).cached(), hacker_profile_view = new HR.HackerProfileView({
hacker:slug,
model:hackermodel
}), HR.appController.setTitle("Hacker Profile"), HR.appView.setContentView(hacker_profile_view), 
HR.appController.set_contest_namespace("master");
}) :this.e404(), _page = "Unknown", "hacker" === resp.type && (_page = "Hacker Profile"), 
"contest" === resp.type && (_page = "Contest Home"), window.mixpanel_data.landing = !1;
}, this);
}, DashboardRouter.prototype.checklist = function(contest_slug, challenge_slug) {
var challenge, checklist, fragment, fragments, that;
return fragment = Backbone.history.fragment, fragments = fragment.split("checklist"), 
"" === fragments[0] ? (challenge_slug = contest_slug, contest_slug = null) :(that = this, 
HR.appController.querySlug({
slug:contest_slug,
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), checklist = new HR.ChecklistCollection(), checklist.setChallenge(challenge_slug), 
checklist.fetch(), challenge = new HR.ChallengeModel(), challenge.setSlug(challenge_slug), 
challenge.fetch(), HR.requires("compound/extra-views", function() {
var checklist_view;
return checklist_view = new HR.ChecklistView({
collection:checklist,
model:challenge
}), HR.appView.setContentView(checklist_view);
});
}, DashboardRouter.prototype.showgame = function(contest_slug, game_id) {
var game_model, _arguments;
return _arguments = this.setUpContestSlug({
route:"showgame",
arguments:arguments
}), contest_slug = _arguments[0], game_id = _arguments[1], game_model = new HR.GameModel(), 
game_model.set("id", game_id), game_model.contest_slug = contest_slug, game_model.fetch({
success:function() {
return function() {
return HR.requires("compound/game-views", function() {
var showgame_view;
return showgame_view = new HR.ShowGameView({
model:game_model
}), showgame_view.contest_slug = contest_slug, HR.appView.setContentView(showgame_view);
}), null === contest_slug && (contest_slug = "master"), window.mixpanel_data.landing = !1;
};
}(this)
});
}, DashboardRouter.prototype.setUpContestSlug = function(params) {
var fragment, fragments, that, _params;
return null == params && (params = {}), _params = [], fragment = Backbone.history.fragment, 
fragments = fragment.split(params.route), "" === fragments[0] ? (_params.push(null), 
_.each(params.arguments, function(arg) {
return _params.push(arg);
}, this)) :(_params = params.arguments, that = this, HR.appController.querySlug({
slug:params.arguments[0],
callback:function(resp) {
return "contest" !== resp.type ? that.e404() :void 0;
}
})), _params;
}, DashboardRouter.prototype.notifications = function(contest_slug, page) {
var notifications_collection, _arguments;
return null == page && (page = 1), _arguments = this.setUpContestSlug({
route:"notifications",
arguments:arguments
}), contest_slug = _arguments[0], notifications_collection = new HR.NotificationsCollection({
page:page
}), notifications_collection.cached({
fetch:!0
}), _.each(notifications_collection.models, function(model) {
return model.markSeen();
}), HR.requires("compound/extra-views", function() {
var notifications_view;
return notifications_view = new HR.NotificationsView({
collection:notifications_collection
}), HR.appView.setContentView(notifications_view);
}), null === contest_slug && (contest_slug = "master"), window.mixpanel_data.landing = !1, 
HR.appController.set_contest_namespace(contest_slug);
}, DashboardRouter.prototype.notificationsPage = function(page) {
return null == page && (page = 1), this.notifications("", page);
}, DashboardRouter.prototype.notificationsSingle = function(id) {
var collection;
return collection = new HR.NotificationsCollection(), collection.notif_id = id, 
collection.cached({
fetch:!0,
success:function() {
return HR.router.navigate("/notifications/page/" + collection.page);
}
}), HR.requires("compound/extra-views", function() {
var view;
return view = new HR.NotificationsView({
collection:collection,
notif_id:id
}), HR.appView.setContentView(view);
}), HR.appController.set_contest_namespace("master");
}, DashboardRouter.prototype.contestsLegacyRedirect = function() {
return this.navigate("/contests/" + Backbone.history.fragment, !0);
}, DashboardRouter.prototype.teams = function(contest_slug, team_id, action) {
var fragment, fragments, team;
return fragment = Backbone.history.fragment, fragments = fragment.split("teams"), 
"" === fragments[0] && (action = team_id, team_id = contest_slug, contest_slug = null), 
team_id ? action ? (team = new HR.TeamModel({
id:team_id
}), HR.requires("compound/extra-views", function() {
var team_view;
return team_view = new HR.TeamView({
model:team,
action:action
}), HR.appView.setContentView(team_view);
})) :(this.navigate("" + fragment + "/view", {
trigger:!0,
replace:!0
}), void 0) :(contest_slug ? this.navigate("contests/" + contest_slug + "/settings/teams", {
trigger:!0,
replace:!0
}) :this.navigate("/settings/teams", {
trigger:!0,
replace:!0
}), void 0);
}, DashboardRouter.prototype.teams_create = function() {
return HR.requires("compound/extra-views", function() {
var team_view;
return team_view = new HR.TeamView({}), HR.appView.setContentView(team_view);
});
}, DashboardRouter.prototype.companies = function(slug) {
var companies_collection;
return null == slug && (slug = null), companies_collection = new HR.CompaniesCollection(), 
null !== slug && (companies_collection.company_slug = slug), companies_collection.contest_slug = HR.contest().get("slug"), 
companies_collection.all = !0, companies_collection.fetch({
success:function() {
return function() {
return HR.requires("compound/extra-views", function() {
var companies_view;
return companies_view = new HR.CompaniesView({
collection:companies_collection
}), HR.appView.setContentView(companies_view);
});
};
}(this)
});
}, DashboardRouter.prototype.inbox = function(thread_id) {
var collection, view;
return null == thread_id && (thread_id = null), view = HR.cachedMessageView, collection = HR.cachedMessagesCollection, 
collection && collection.length > 0 && (thread_id || (thread_id = collection.first().get("id"))), 
HR.requires("compound/extra-views", function() {
return view = new HR.MessageThreadView({
collection:collection,
active_thread_id:thread_id
}), HR.cachedMessageView = view, HR.appView.setContentView(view);
}), HR.appController.set_contest_namespace("master");
}, DashboardRouter;
}(Backbone.Router), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardRouter = DashboardRouter;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GenericView, HR, _ref;
return GenericView = function(_super) {
function GenericView() {
return GenericView.__super__.constructor.apply(this, arguments);
}
return __extends(GenericView, _super), GenericView.prototype.initialize = function(options) {
return null == options && (options = {}), this.has_template = !1, this.parent = options.parent;
}, GenericView.prototype.assign = function(selector, view) {
var selectors;
return _.isObject(selector) ? selectors = selector :(selectors = [], selectors[selector] = view), 
selectors ? (_.each(selectors, function(view, selector) {
return view.setElement(this.$(selector)).render();
}, this), this) :void 0;
}, GenericView.prototype.render = function() {
return this._render && "function" == typeof this._render ? ("function" == typeof this.prerender && this.prerender, 
"function" == typeof this.teardown && this.teardown(), "function" == typeof this._render && this._render(), 
"function" == typeof this.postrender && this.postrender()) :!this.has_template && this.template ? HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.applyTemplate();
}, this) :this.applyTemplate(), this;
}, GenericView.prototype.postrender = function() {
return this.delegateEvents(), setTimeout(function() {
return $(".js-tooltip").tooltip().click(function() {
return $(".js-tooltip").tooltip("hide");
});
}, 300);
}, GenericView.prototype.applyTemplate = function() {}, GenericView.prototype.loading = function(size, from) {
return null == size && (size = 32), null == from && (from = 0), this.rendered ? void 0 :$(this.el).html(HR.appController.viewLoader(size));
}, GenericView.prototype.teardown = function() {
var view, _i, _len, _ref;
if (void 0 !== this._subviews) for (_ref = this._subviews, _i = 0, _len = _ref.length; _len > _i; _i++) view = _ref[_i], 
view.remove();
return this._subviews = [], this.undelegateEvents(), this;
}, GenericView.prototype.destroy = function() {
return this._subviews && _.isArray(this._subviews) && _.each(this._subviews, function(subview) {
return subview && subview.destroy ? subview.destroy() :void 0;
}), this.undelegateEvents(), this.$el.removeData().unbind(), this.remove(), Backbone.View.prototype.remove.call(this);
}, GenericView.prototype.add_subview = function(view) {
return this._subviews || (this._subviews = []), this._subviews.push(view), this;
}, GenericView;
}(Backbone.View), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericView = GenericView, 
Backbone.View.prototype.log = Backbone.log;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var AppView, HR, _ref;
return AppView = function(_super) {
function AppView() {
return AppView.__super__.constructor.apply(this, arguments);
}
return __extends(AppView, _super), AppView.prototype.el = "#wrapper", AppView.prototype.initialize = function() {
var that;
return this.contentView || this.setLoadingView(), that = this, _.each(this.liveEvents, function(callback, index) {
var ev, sl, sp;
return sp = index.indexOf(" "), ev = index.substr(0, sp), sl = index.substr(sp + 1), 
$(sl).die(ev).unbind(ev).live(ev, that[callback]);
});
}, AppView.prototype.setLoadingView = function() {
var loadingView;
return loadingView = new HR.LoadingView(), this.setContentView(loadingView);
}, AppView.prototype.setContentView = function(contentView) {
return this.contentView && (this.contentView.unbind && this.contentView.unbind(), 
this.contentView.$ && this.contentView.$("*").unbind(), this.contentView.destroy ? this.contentView.destroy() :this.contentView.remove && this.contentView.remove()), 
this.contentView = contentView, this.render();
}, AppView.prototype.liveEvents = {
"click .backbone":"navigateAnchor",
"click .mkd-cheat-sheet":"mkdCheatSheet"
}, AppView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
href ? HR.router.navigate(href, !0) :void 0);
}, AppView.prototype.mkdCheatSheet = function() {
var dialog_html;
return dialog_html = "<div class='hr-dialog-body'>\n    <div class='span12 clearfix margin-large bottom'>\n        <div class='row'>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Formatting</strong></h5>\n                <p><span class='beta'>#</span> Header 1</p>\n                <p><span class='beta'>##</span> Header 2</p>\n                <p><span class='beta'>######</span> Header 6</p>\n                <br>\n                <p><span class='beta'><strong>_</strong></span> This text will be <em>italic</em> <span class='beta'><strong>_</strong></span></p>\n                <p><span class='beta'><strong>*</strong></span> This text will be <em>italic</em> <span class='beta'><strong>*</strong></span></p>\n                <p><span class='beta'><strong>__</strong></span> This text will be <strong>bold</strong> <span class='beta'><strong>__</strong></span></p>\n                <p><span class='beta'><strong>**</strong></span> This text will be <strong>bold</strong> <span class='beta'><strong>**</strong></span></p>\n            </div>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Lists</strong></h5>\n                <p><span class='beta'><strong>*</strong></span> Unordered list item</p>\n                <p><span class='beta'><strong>*</strong></span> Unordered list item</p>\n                <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span class='beta'><strong>*</strong></span> Unordered list item</p>\n                <br>\n                <p><span class='beta'><strong>1.</strong></span> Ordered list item</p>\n                <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span class='beta'><strong>*</strong></span> Unordered list item</p>\n                <p><span class='beta'><strong>2.</strong></span> Ordered list item</p>\n            </div>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Code Blocks</strong></h5>\n                <p>Normal Text</p>\n                <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>\n                <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;echo `some function`</p>\n                <br>\n                <h5 class='margin-small bottom'><strong>Inline Code</strong></h5>\n                <p>Use <span class='beta'><strong>`</strong></span>&lt;div&gt;<span class='beta'><strong>`</strong></span> tags</p>\n                <small class='beta'>Two backticks to a character</small>\n                <p><span class='beta'><strong>``</strong></span>echo `unname -a`<span class='beta'><strong>``</strong></span></p>\n                <br>\n            </div>\n        </div>\n    </div>\n    <div class='span12 clearfix margin-large top bottom'>\n        <div class='row'>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Blockquotes</strong></h5>\n                <p>Like Steve Jobs said:</p>\n                <br>\n                <p>&gt;&emsp;Here's to the crazy ones</p>\n                <p>&gt;&emsp;The misfits. The rebels.</p>\n            </div>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Images</strong></h5>\n                <p><span class='beta'><strong>!</strong></span>[first prize](/images/prize.png)</p>\n                <p><span class='beta'><strong>!</strong></span>[Alt Text](url)</p>\n            </div>\n            <div class='span4'>\n                <h5 class='margin-small bottom'><strong>Links</strong></h5>\n                <p>Checkout the next <span class='beta'><strong>[HackerRank competition!](http://hackerrank.com/contests)</strong></span></p>\n                <p><span class='beta'><strong>[</strong></span>inline text<span class='beta'><strong>](</strong></span>url<span class='beta'><strong>)</strong></span></p>\n            </div>\n        </div>\n    </div>\n</div>", 
HR.util.ShowDialog({
body:dialog_html,
title:"Markdown Cheatsheet",
width:800
}).render();
}, AppView.prototype.getSubViews = function() {
var subviews;
return null === this.contentView && this.setContentView(HR.E404View), subviews = {
content:this.contentView
};
}, AppView.prototype.showUsernamePrompt = function() {
var dialog, profile, that;
return this.showUsernamePrompt !== !0 && (profile = HR.profile(), profile.get("username_autoset") === !0) ? (that = this, 
this.showUsernamePrompt = !0, dialog = new HR.util.ShowFormDialog({
title:"Set Username",
width:650,
onDestroy:function() {
return profile.set("username_autoset", !1), profile.save();
},
fields:[ {
name:"username",
value:profile.get("username"),
type:"text",
title:"Username"
} ],
body:"<p>Please set a username. This username will be used as your identifier on HackerRank.</p>",
buttons:[ {
name:"Save",
callback:function(dialog) {
var $form, btn;
return btn = this, $form = dialog.$form(), btn.unSetFailedMsg(), profile.save("username", _.escape(dialog.$el().find("input[name=username]").val()), {
success:function(model, response) {
var error_message;
return _.size(response.model.errors) > 0 ? (profile.set("username", response.model.username), 
error_message = "", _.each(response.model.errors, function(val) {
return error_message += val;
}), btn.failed(error_message), btn.$el.removeClass("disabled")) :(dialog.destroy(), 
profile.set("username_autoset", !1), profile.save());
}
});
}
}, {
name:"Cancel",
callback:function(dialog) {
return profile.set("username_autoset", !1), profile.save(), this.setInactive(), 
dialog.destroy();
}
} ]
}), dialog.render()) :void 0;
}, AppView.prototype.render = function() {
var curent_module_name, profile, that;
return HR.candidatetestmode = Backbone.history.fragment && "tests" === Backbone.history.fragment.substr(0, 5) ? !0 :!1, 
this.verifyAccountView || (this.verifyAccountView = new HR.VerifyAccountView({
model:HR.profile()
}), this.add_subview(this.verifyAccountView)), this.verifyAccountView.setElement($(this.el).find("#verifyaccount")).render(), 
this.checkUsername || (profile = HR.profile(), profile.bind("reset", this.showUsernamePrompt, this), 
this.showUsernamePrompt(), this.checkUsername = !0), this.navigationView || (this.navigationView = new HR.NavigationView({
model:HR.profile(),
contest:HR.contest()
}), this.add_subview(this.navigationView)), 0 === this.$("#page-header").length && this.navigationView.setElement($(this.el).find("#navigation")).render(), 
this.contestNavigationView || (this.contestNavigationView = new HR.ContestNavigationView({
contest:HR.model("contest", {
slug:HR.appController.get_current_contest_slug()
}).cached()
}), this.add_subview(this.contestNavigationView)), 0 === this.$("#contest-nav").length && this.contestNavigationView.setElement($(this.el).find("#contest-navigation")).render(), 
this.sidebarView || (this.sidebarView = new HR.SidebarView(), this.add_subview(this.sidebarView)), 
0 === this.$("#sidebar").length && this.sidebarView.setElement($(this.el).find("#side-navigation")).render(), 
that = this, this.countdownTimerView || (this.countdownTimerView = new HR.CountdownTimerView({
model:HR.contest().cached()
}), this.add_subview(this.countdownTimerView)), this.countdownTimerView.setElement($(this.el).find("#countdowntimer")).render(), 
_.each(this.getSubViews(), function(subview, name) {
var _view;
return _view = _.isFunction(subview) ? new subview() :subview, $(that.el).find("#" + name).html(_view.render().el), 
_view.trigger("render");
}), $(".module-select-prompt").length > 0 && $("body").find("[data-module=" + HR.appController.get_current_module() + "]").length > 0 ? (curent_module_name = $.trim($("body").find("[data-module=" + HR.appController.get_current_module() + "]").html()), 
HR.CURRENT_MODULE_NAME = curent_module_name, $(".module-select-prompt").html("Category: " + curent_module_name + " <i class='icon-down-open-mini'></i>")) :void 0;
}, AppView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AppView = AppView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, LoadingView, _ref;
return LoadingView = function(_super) {
function LoadingView() {
return LoadingView.__super__.constructor.apply(this, arguments);
}
return __extends(LoadingView, _super), LoadingView.prototype.template = "loading", 
LoadingView.prototype.className = "loading-view", LoadingView.prototype.viewLoader = function(size) {
return null == size && (size = 32), "<div class='gray'> <div style='background: url(https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_" + size + "x" + size + ".gif); height: " + size + "px; width: " + size + "px; display: inline-block;'></div> </div>";
}, LoadingView.prototype.render = function() {
return $(this.el).html(this.viewLoader(64)), this;
}, LoadingView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.LoadingView = LoadingView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardView, HR, _ref;
return DashboardView = function(_super) {
function DashboardView() {
return DashboardView.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardView, _super), DashboardView.prototype.template = "dashboard/base", 
DashboardView.prototype.className = "dashboard-view", DashboardView.prototype.initialize = function() {
return this.hacker = HR.profile(), this.dashboard = HR.model("dashboard").cached(), 
this.listenTo(this.hacker, "reset", this.render), this.listenTo(this.dashboard, "reset", this.render), 
HR.requires("compound/highcharts", function() {});
}, DashboardView.prototype.render = function() {
return this.hacker.sync_status && this.dashboard.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.dashboard.toJSON()
})), this.historyView || (this.historyView = new HR.DashboardHistoryView({
model:HR.profile().toJSON(),
username:HR.profile().get("username")
})), this.trackView || (this.trackView = new HR.DashboardTrackView({
dashboard:this.dashboard
})), this.submissionsView || (this.submissionsView = new HR.DashboardSubmissionsView()), 
this.assign({
".dashboard_submissions":this.submissionsView,
".dashboard_tracks":this.trackView,
".dashboard_history":this.historyView
}), this) :($(this.el).html(HR.appController.viewLoader(64)), this);
}, DashboardView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardView = DashboardView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardHistoryView, HR, _ref;
return DashboardHistoryView = function(_super) {
function DashboardHistoryView() {
return DashboardHistoryView.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardHistoryView, _super), DashboardHistoryView.prototype.template = "dashboard/history", 
DashboardHistoryView.prototype.className = "dashboard-history", DashboardHistoryView.prototype.initialize = function(options) {
return null == options && (options = {}), this.history = HR.collection("dashboard-history"), 
this.history.setHacker(this.model.username), this.history.cached(), this.listenTo(this.history, "reset", this.render), 
this.listenTo(this.history, "change", this.render);
}, DashboardHistoryView.prototype.setupChange = function() {
var lastRank;
return lastRank = 0, this.maxRank = 0, this.lowestRank = null, this.history.each(function(_this) {
return function(event) {
var change, currentRank;
return currentRank = event.get("rank"), change = currentRank - lastRank, currentRank > _this.maxRank && (_this.maxRank = currentRank), 
_this.lowestRank && currentRank < _this.lowestRank && (_this.lowestRank = currentRank), 
event.set({
increase:change >= 0,
change:change,
logged_at:new Date(event.get("logged_at"))
}, {
silent:!0
}), lastRank = currentRank;
};
}(this));
}, DashboardHistoryView.prototype.renderChart = function(options) {
var defaultOptions, that;
return null == options && (options = {}), that = this, defaultOptions = {
chart:{
type:"line",
zoomType:"x",
backgroundColor:null,
height:250
},
colors:[ "#00beff", "#9bc0e3" ],
title:{
text:null
},
legend:{
enabled:!1
},
xAxis:{
title:{
text:null
},
categories:this.history.map(function(event) {
return event.get("logged_at");
}),
labels:{
enabled:!1
}
},
yAxis:{
title:{
text:null
},
labels:{
enabled:!1
},
gridLineWidth:0,
tickInterval:100
},
credits:{
enabled:!1
},
series:[ {
data:this.history.map(function(event) {
return {
y:that.maxRank - event.get("rank"),
event:event
};
}),
name:"Rank"
} ],
tooltip:{
formatter:function() {
var change, change_color, change_sign, event, html, logged_at, rank;
return event = this.point.event, rank = event.get("rank"), change = event.get("change"), 
logged_at = event.get("logged_at"), html = "<b>" + event.get("rank") + "</b>", rank !== change && (event.get("change") >= 0 ? (change_color = "red", 
change_sign = "+") :(change_color = "green", change_sign = "-"), html += ' (<span style="color:' + change_color + '">' + change_sign + " " + Math.abs(change) + "</span>)"), 
html += "<br/><i>" + logged_at.toDateString() + "</i>";
}
}
}, options = _.extend(defaultOptions, options), HR.requires("compound/highcharts", function(_this) {
return function() {
return _this.$(".history-chart").highcharts(options);
};
}(this));
}, DashboardHistoryView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
history:this.history,
model:this.model
})), this.history.sync_status ? (this.setupChange(), this.history.length > 1 && this.renderChart(), 
this) :($(this.el).html(HR.appController.viewLoader()), this);
}, DashboardHistoryView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardHistoryView = DashboardHistoryView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, RatingHistoryView, _ref;
return RatingHistoryView = function(_super) {
function RatingHistoryView() {
return RatingHistoryView.__super__.constructor.apply(this, arguments);
}
return __extends(RatingHistoryView, _super), RatingHistoryView.prototype.template = "dashboard/rating-history", 
RatingHistoryView.prototype.className = "dashboard-rating-history", RatingHistoryView.prototype.initialize = function(options) {
var that;
return null == options && (options = {}), this.rendered = !1, that = this, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render), $.ajax({
async:!1,
url:"rest/hackers/" + this.model.get("username") + "/rating_histories",
success:function(data) {
return that.data = data;
}
});
}, RatingHistoryView.prototype.renderChart = function(history, options) {
var defaultOptions, event, prev, that, _i, _len, _ref;
for (null == options && (options = {}), prev = 1500, _ref = history.events, _i = 0, 
_len = _ref.length; _len > _i; _i++) event = _ref[_i], event.rating = Math.floor(event.rating), 
event.change = event.rating - prev, prev = event.rating;
return that = this, defaultOptions = {
chart:{
type:"line",
zoomType:"x",
backgroundColor:null,
height:250,
width:600
},
colors:[ "#00beff", "#9bc0e3" ],
title:{
text:null
},
legend:{
enabled:!1
},
xAxis:{
title:{
text:null
},
labels:{
enabled:!1
}
},
yAxis:{
title:{
text:null
},
labels:{
format:"{value}"
},
gridLineWidth:0
},
credits:{
enabled:!1
},
series:[ {
data:history.events.map(function(event) {
return {
x:new Date(event.date).getTime(),
y:event.rating,
event:event
};
}),
name:"Rank"
} ],
tooltip:{
formatter:function() {
var change_color, change_sign, date, html;
return event = this.point.event, date = new Date(event.date), html = "<a href='www.hackerrank.com/contests/" + event.contest_slug + "/leaderboard'>" + event.contest_name + "</a><br/>", 
html += "<b>" + event.rating + "</b>", event.change >= 0 ? (change_color = "green", 
change_sign = "+") :(change_color = "red", change_sign = "-"), html += ' (<span style="color:' + change_color + '">' + change_sign + Math.abs(event.change) + "</span>)<br/>", 
html += "<i>" + date.toDateString() + "</i>";
}
}
}, options = _.extend(defaultOptions, options), HR.requires("compound/highcharts", function(_this) {
return function() {
return _this.$("." + history.index + "-history-chart").highcharts(options);
};
}(this));
}, RatingHistoryView.prototype.render = function() {
var history, index, rating, tracks, _i, _j, _len, _len1, _ref, _ref1;
if (this.data && this.model.sync_status) {
for (tracks = [], _ref = this.data.models, index = _i = 0, _len = _ref.length; _len > _i; index = ++_i) history = _ref[index], 
tracks.push({
id:index + 1,
text:history.category,
count:history.events.length
});
for (rating = this.model.get("current_rating"), $(this.el).html(HR.appController.template(this.template, this)({
model:tracks,
rating:rating
})), _ref1 = this.data.models, index = _j = 0, _len1 = _ref1.length; _len1 > _j; index = ++_j) history = _ref1[index], 
history.index = index + 1, this.renderChart(history);
}
return this;
}, RatingHistoryView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RatingHistoryView = RatingHistoryView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardSubmissionView, HR, _ref;
return DashboardSubmissionView = function(_super) {
function DashboardSubmissionView() {
return DashboardSubmissionView.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardSubmissionView, _super), DashboardSubmissionView.prototype.template = "dashboard/submission", 
DashboardSubmissionView.prototype.className = "dashboard-submission-view", DashboardSubmissionView.prototype.initialize = function(options) {
return this.model = options.model, this.listenTo(this.model, "reset", this.render);
}, DashboardSubmissionView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, DashboardSubmissionView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardSubmissionView = DashboardSubmissionView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardSubmissionsView, HR, _ref;
return DashboardSubmissionsView = function(_super) {
function DashboardSubmissionsView() {
return DashboardSubmissionsView.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardSubmissionsView, _super), DashboardSubmissionsView.prototype.template = "dashboard/submissions", 
DashboardSubmissionsView.prototype.className = "dashboard-submissions-view", DashboardSubmissionsView.prototype.initialize = function() {
return this.submissions = HR.collection("submissions").cached(), this.listenTo(this.submissions, "reset", this.render);
}, DashboardSubmissionsView.prototype.render = function() {
var submissions;
return $(this.el).html("<p class='block-margin'>You have not submitted a solution to any challenges yet.</p>"), 
submissions = $("<div>"), this.submissions.length && (_.each(this.submissions.slice(0, 5), function() {
return function(model) {
var submissionView;
return submissionView = new HR.DashboardSubmissionView({
model:model
}), submissions.append(submissionView.render().el);
};
}(this)), $(this.el).html(submissions)), this;
}, DashboardSubmissionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardSubmissionsView = DashboardSubmissionsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardTrackView, HR, _ref;
return DashboardTrackView = function(_super) {
function DashboardTrackView() {
return DashboardTrackView.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardTrackView, _super), DashboardTrackView.prototype.template = "dashboard/track", 
DashboardTrackView.prototype.className = "dashboard-track-view", DashboardTrackView.prototype.initialize = function(options) {
return this.dashboard = options.dashboard, this.progress = HR.model("dashboard-progress").cached(), 
this.listenTo(this.progress, "reset", this.render);
}, DashboardTrackView.prototype.events = {
"click .track-select":"trackSelect"
}, DashboardTrackView.prototype.currentName = function() {
return this.track ? this.track.get("name") :"All Tracks";
}, DashboardTrackView.prototype.trackSelect = function(e) {
var el;
return el = $(e.currentTarget), this.track_id = el.attr("data-track-id") || null, 
this.track = this.progress.tracks().get(this.track_id), this.render();
}, DashboardTrackView.prototype.stats = function() {
var stats;
return stats = this.progress.stats(this.track_id), stats.languages && (stats.languages[0] = "<strong>" + stats.languages[0] + "</strong>"), 
stats;
}, DashboardTrackView.prototype.renderChart = function(options) {
var defaultOptions, stats;
return null == options && (options = {}), stats = this.stats(), defaultOptions = {
chart:{
plotBackgroundColor:null,
plotBorderWidth:null,
plotShadow:!1,
backgroundColor:null,
height:250
},
colors:[ "#2674c6", "#ddd9d9" ],
title:{
text:null
},
tooltip:{
pointFormat:"{series.name}: <b>{point.percentage}%</b>",
percentageDecimals:1
},
plotOptions:{
pie:{
allowPointSelect:!0,
cursor:"pointer",
dataLabels:{
enabled:!1
},
innerSize:"30%",
startAngle:-90
}
},
series:[ {
type:"pie",
name:"Challenges share",
data:[ {
name:"Completed",
y:stats.completion,
sliced:!0,
selected:!0
}, {
name:"Remaining",
y:100 - stats.completion
} ]
} ]
}, options = _.extend(defaultOptions, options), HR.requires("compound/highcharts", function() {
return function() {
return $(".track-chart").highcharts(options);
};
}(this));
}, DashboardTrackView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.progress.toJSON(),
stats:this.stats(),
currentName:this.currentName()
})), this.progress.sync_status ? (this.renderChart(), this.delegateEvents(), this) :($(this.el).html(HR.appController.viewLoader()), 
this);
}, DashboardTrackView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardTrackView = DashboardTrackView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, VerifyAccountView, _ref;
return VerifyAccountView = function(_super) {
function VerifyAccountView() {
return VerifyAccountView.__super__.constructor.apply(this, arguments);
}
return __extends(VerifyAccountView, _super), VerifyAccountView.prototype.template = "dashboard/verify-account", 
VerifyAccountView.prototype.className = "verify-account-view", VerifyAccountView.prototype.events = {
"click a.send-verification":"sendVerification",
"click .close":"closeVerification"
}, VerifyAccountView.prototype.sendVerification = function() {
var fetch_loop, that;
return this.setVerificationStatus(1), that = this, fetch_loop = function() {
return that.model.fetch({
success:function(model) {
return model.get("confirmed") === !1 ? setTimeout(fetch_loop, 1500) :void 0;
}
});
}, $.ajax({
url:"/auth/send_confirmation" + HR.appController.get_current_contest_slug_url(),
success:function() {
return that.setVerificationStatus(2), fetch_loop();
}
});
}, VerifyAccountView.prototype.setVerificationStatus = function(status) {
return this.verification_sent_status = status, this.render();
}, VerifyAccountView.prototype.initialize = function() {
return this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render), 
this.verification_sent_status = 0;
}, VerifyAccountView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this, !1)({
model:this.model,
_model:this.model.toJSON(),
verification_sent_status:this.verification_sent_status
})), this.delegateEvents(), this;
}, VerifyAccountView.prototype.closeVerification = function() {
return $(this.el).css("display", "none");
}, VerifyAccountView.prototype.navigateTabs = function(e) {
return e.preventDefault(), $(e.currentTarget).parents("ul").find("li").removeClass("active"), 
$(e.currentTarget).parents("li").addClass("active");
}, VerifyAccountView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.VerifyAccountView = VerifyAccountView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NavLogoView, _ref;
return NavLogoView = function(_super) {
function NavLogoView() {
return NavLogoView.__super__.constructor.apply(this, arguments);
}
return __extends(NavLogoView, _super), NavLogoView.prototype.className = "nav-logo", 
NavLogoView.prototype.render = function() {
return this.template || (this.template = $(_.template("<a href='/' class='HackerRankLogo backbone page_header-logo'><svg width='42' height='46'><image xlink:href='/assets/brand/h_mark_sm.svg' src='/assets/brand/h_mark_sm.png' width='42' height='46' /> </svg></a>")())), 
0 === this.$("a.HackerRankLogo").length && $(this.el).append(this.template), this;
}, NavLogoView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NavLogoView = NavLogoView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NavButtonsView, _ref;
return NavButtonsView = function(_super) {
function NavButtonsView() {
return NavButtonsView.__super__.constructor.apply(this, arguments);
}
return __extends(NavButtonsView, _super), NavButtonsView.prototype.template = "nav-buttons", 
NavButtonsView.prototype.className = "nav-buttons-view", NavButtonsView.prototype.initialize = function() {
return this.profile = HR.profile(), this.listenTo(this.profile, "reset", this.render);
}, NavButtonsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
profile:this.profile,
contest:HR.contest().cached()
})), HR.tab && HR.util.setTab(HR.tab), this.$("li#tab-contests").length > 0 && (this.contests || (this.contests = HR.collection("contests").cached(), 
this.listenTo(this.contests, "reset", this.updateContestNotificationsCount)), this.updateContestNotificationsCount()), 
this.$("span.search_form").length > 0 && (this.search_view || (this.search_view = new HR.AppSearchView()), 
this.search_view.setElement(this.$("span.search_form")).render(), this.add_subview(this.search_view)), 
this;
}, NavButtonsView.prototype.updateLinks = function() {
return this.render(), this.$("#tab-challenges a.backbone").attr("href", "" + HR.appController.get_current_contest_namespace() + "/challenges"), 
this.$("#tab-submissions a.backbone").attr("href", "" + HR.appController.get_current_contest_namespace() + "/submissions"), 
this.$("#tab-leaderboard a.backbone").attr("href", "" + HR.appController.get_current_contest_namespace() + "/leaderboard"), 
this.$("li#tab-contests").length > 0 ? HR.appController.is_using_contest_namespace() ? this.$("#tab-contests").remove() :this.$("#tab-contests a.backbone").attr("href", "/contests").show() :void 0;
}, NavButtonsView.prototype.updateContestNotificationsCount = function() {
var ongoing_count;
return this.contests && this.contests.sync_status === !0 ? (ongoing_count = _.reduce(_.map(this.contests.models, function(model) {
return model.get("started") && !model.get("ended") ? 1 :0;
}), function(result, num) {
return result + num;
}, 0), ongoing_count > 0 ? this.$("#contests-badge").html(ongoing_count).fadeIn() :this.$("#contests-badge").html("").fadeOut()) :this.$("#contests-badge").html("").fadeOut();
}, NavButtonsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NavButtonsView = NavButtonsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NavLoginPatchView, _ref;
return NavLoginPatchView = function(_super) {
function NavLoginPatchView() {
return NavLoginPatchView.__super__.constructor.apply(this, arguments);
}
return __extends(NavLoginPatchView, _super), NavLoginPatchView.prototype.template = "nav-login-patch", 
NavLoginPatchView.prototype.className = "nav-login-patch-view", NavLoginPatchView.prototype.events = {
"click a.logout-button":"logoutButton",
"click a.login":"login"
}, NavLoginPatchView.prototype.initialize = function() {
return this.profile = HR.profile(), this.listenTo(this.profile, "reset", this.render), 
this.listenTo(this.profile, "change", this.render), this.contest = HR.contest().cached(), 
this.listenTo(this.contest, "reset", this.setTeamName), this.listenTo(this.contest, "sync", this.setTeamName);
}, NavLoginPatchView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
profile:this.profile,
_profile:this.profile.toJSON()
})), this;
}, NavLoginPatchView.prototype.setTeamName = function() {
var that;
return this.contest.get("team_event") && this.profile.get("id") ? (this.team = new HR.TeamModel(), 
this.team.set("contest_id", this.contest.get("id")), that = this, this.team.fetch({
success:function(model) {
var slug;
return slug = model.get("slug"), slug ? that.$(".team-name").html("(" + slug + ")").show() :that.$(".team-name").html("").hide();
}
})) :this.contest.get("team_event") ? void 0 :this.$(".team-name").html("").hide();
}, NavLoginPatchView.prototype.login = function(e) {
return e.preventDefault(), new HR.util.ShowLoginDialog({
show_sign_up_link:!0
}).render();
}, NavLoginPatchView.prototype.logoutButton = function() {
return this.logout();
}, NavLoginPatchView.prototype.logout = function() {
return $.ajax({
url:"/auth/logout",
type:"DELETE",
success:function() {
return document.location.href = "" + document.location.protocol + "//" + document.location.host;
}
});
}, NavLoginPatchView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NavLoginPatchView = NavLoginPatchView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var AppSearchView, HR, _ref;
return AppSearchView = function(_super) {
function AppSearchView() {
return AppSearchView.__super__.constructor.apply(this, arguments);
}
return __extends(AppSearchView, _super), AppSearchView.prototype.template = "dashboard/app-search", 
AppSearchView.prototype.className = "app-search-view", AppSearchView.prototype.events = {
"focus #search-text":"focusSearchBox",
"blur #search-text":"unfocusSearchBox"
}, AppSearchView.prototype.focusSearchBox = function() {
return $(".search_form").addClass("focus");
}, AppSearchView.prototype.unfocusSearchBox = function() {
return $(".search_form").removeClass("focus");
}, AppSearchView.prototype.renderHacker = function(item) {
var ns;
return ns = item.url, $("<a class='no-padding' style='background: none !important; border: none !important;'></a>").append($("<div class='search-row'> <div class='pull-left'> <img src='" + item.avatar + "' width='25' height='25' class='avatar' style='margin-top: 10px' /> </div> <div class='search-content margin-small left'> <p class=''>" + item.name + "</p> </div> </div>"));
}, AppSearchView.prototype.renderChallenge = function(item) {
var ns;
return ns = item.url, $("<a class='no-padding' style='background: none !important; border: none !important;'></a>").append($("<div class='search-row'> <div class='search-content'> <p class=''>" + item.name + "</p> </div> <span class='search-aside pull-right'> <ul class='inline inverse pull-right'> <li> <a href='" + ns + "/submissions' class='backbone no-padding'><i class='icon-list-bullet-small'></i></a> </li> <li> <a href='" + ns + "/leaderboard' class='backbone submit no-padding' data-analytics='ChallengeLeaderboard'><i class='icon-trophy'></i></a> </li> <li> <a href='" + ns + "/forum/questions' class='backbone submit no-padding' data-analytics='ViewForum'><i class='icon-comment'></i></a> </li> </ul> </span> </div>"));
}, AppSearchView.prototype.renderContest = function(item) {
var icon_class, ns, text;
return ns = item.url, "ended" === item.status ? (icon_class = "completed", text = "(archived)") :"running" === item.status ? (icon_class = "active", 
text = "(in progress)") :(icon_class = "pending", text = "(not started)"), $("<a class='no-padding' style='background: none !important; border: none !important;'></a>").append($("<div class='search-row'> <i class='status-indicator " + icon_class + " mmR'></i> <div class='search-content'> <p class=''>" + item.name + "</p> </div> <div class='contest_status pull-right'> <p>" + text + "</p> </div> </div>"));
}, AppSearchView.prototype.render = function() {
var that;
return $(this.el).html(HR.appController.template(this.template, this)), 0 === this.$("#search-text").length ? 0 :(that = this, 
this.$("#search-text").autocomplete({
minLength:2,
source:function(request, response) {
return that.$(".search-input i").removeClass("icon-search").append('<img height="20" src="/assets/ajax-view-loader.gif">'), 
$.ajax({
url:"/appsearch?contest_slug=" + HR.appController.get_current_contest_slug(),
data:{
query:request.term
},
success:function(data) {
return that.$(".search-input i").addClass("icon-search"), that.$(".search-input img").remove(), 
response(_.map(data.challenges.concat(data.contests, data.hackers), function(babe) {
var type;
return type = "hacker", babe.challenge_association_id ? type = "challenge" :babe.contest_id ? type = "contest" :babe.blog_id && (type = "blog"), 
babe.type = type, babe.name.length > 30 && (babe.name = babe.name.substring(0, 30) + "\u2026"), 
babe.value = babe.name, babe;
}));
}
});
},
select:function(event, ui) {
var url;
return url = ui.item.url, HR.router.navigate(url, !0);
}
}).data("autocomplete")._renderItem = function(ul, item) {
return "hacker" === item.type ? $("<li style='border-bottom: none'></li>").data("item.autocomplete", item).append(that.renderHacker(item)).appendTo(ul) :"contest" === item.type ? $("<li style='border-bottom: none'></li>").data("item.autocomplete", item).append(that.renderContest(item)).appendTo(ul) :$("<li style='border-bottom: none'></li>").data("item.autocomplete", item).append(that.renderChallenge(item)).appendTo(ul);
}, $(".ui-autocomplete").addClass("no-padding"), this);
}, AppSearchView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AppSearchView = AppSearchView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NavigationView, _ref;
return NavigationView = function(_super) {
function NavigationView() {
return NavigationView.__super__.constructor.apply(this, arguments);
}
return __extends(NavigationView, _super), NavigationView.prototype.template = "navigation", 
NavigationView.prototype.className = "navigation-view", NavigationView.prototype.events = {
"click .hr_nav_messages_link":"clickMessages",
"click #notify_messages div.head":"stopPropogation",
"click #notify_messages ul.hr_nav_messages_list":"stopPropogation",
"click .send_message":"sendMessage",
"click .hr_nav_notifications_link":"clickNotifications",
"click #notify_broadcasts div.head":"stopPropogation",
"click #notify_broadcasts ul.hr_nav_messages_list":"stopPropogation"
}, NavigationView.prototype.stopPropogation = function(e) {
return e.stopPropagation();
}, NavigationView.prototype.clickNotifications = function() {
var that;
return this.notification_view ? void 0 :(that = this, HR.requires("compound/extra-views", function() {
return that.notification_view = new HR.NavigationNotificationView(), that.notification_view.setElement($("#notify_broadcasts")), 
that.notification_view.render();
}));
}, NavigationView.prototype.clickMessages = function() {
var that;
return this.message_view ? void 0 :(that = this, HR.requires("compound/extra-views", function() {
return that.message_view = new HR.NavigationMessageView(), that.message_view.setElement($("#notify_messages")), 
that.message_view.render();
}));
}, NavigationView.prototype.sendMessage = function() {
var dialog;
return dialog = new HR.util.ShowMessageDialog(), dialog.render();
}, NavigationView.prototype.initialize = function(options) {
var that, throttled_update_notifs, update_notifs;
return this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render), 
this.contest = options.contest, this.profile = HR.profile(), that = this, update_notifs = function() {
return HR.cachedNotificationsCollection && HR.cachedNotificationsCollection.fetch({
success:function() {
return HR.cachedNotificationsCollection.trigger("reset");
}
}), $.ajax({
url:"/rest/contests/master/notifications/summary"
}).done(function(data) {
var tweet;
return that.log("Fetched notifications"), _.isNumber(data.unread_count) && (that.unread_notifications_count = data.unread_count, 
that.updateNotificationsCount()), data.hacko_notification && HR.profile().get("tour_done") && "" !== data.hacko_notification.message && (tweet = data.hacko_notification.tweet, 
"" === tweet && (tweet = "I just earned hackos on @hackerrank https://www.hackerrank.com"), 
this.social_share || (this.social_share = new HR.SocialShareView({
title:"Hackos Earned!",
message:data.hacko_notification.message,
tweet:data.hacko_notification.tweet,
url:"https://www.hackerrank.com",
type:"hacko"
})), this.social_share.render()), data.hacko_count && that.hacko_count !== data.hacko_count ? (that.hacko_count = data.hacko_count, 
that.updateHackoCount()) :void 0;
});
}, throttled_update_notifs = _.throttle(update_notifs, 14950), this.notifications = function(_this) {
return function(throttled) {
var notifications_url, xhr;
return null == throttled && (throttled = !1), HR.development ? void 0 :(notifications_url = that.profile.get("notifications_url")) ? (throttled ? (that.log("Fetching throttled notifications"), 
throttled_update_notifs()) :(that.log("Fetching notifications"), update_notifs()), 
window.XDomainRequest ? xhr = new XDomainRequest() :window.XMLHttpRequest ? xhr = new XMLHttpRequest() :window.ActiveXObject && (xhr = new ActiveXObject("MSXML2.XMLHTTP.3.0")), 
"http:" === location.protocol && (notifications_url = notifications_url.replace("https:", "http:")), 
xhr.open("GET", notifications_url, !0), xhr.send(), that.log("Polling for notifications: " + notifications_url), 
xhr.onload = function() {
return _this.responseText ? (that.log("Got new notifications"), _this.notifications()) :_this.throttledNotifications(throttled = !0);
}, xhr.onerror = function() {
return that.log("Error with notifications server"), _this.throttledNotifications(throttled = !0);
}) :(that.listenToOnce(that.profile, "reset", _this.notifications), void 0);
};
}(this), this.throttledNotifications = _.throttle(this.notifications, 1e4), this.notifications();
}, NavigationView.prototype.render = function() {
var that;
return this.rendered = !0, $(this.el).html(HR.appController.template(this.template, this, !1)({
model:this.model,
_model:this.model.toJSON(),
_contest:this.contest.toJSON()
})), this.$("span.nav-logo").length > 0 && (this.nav_view || (this.nav_view = new HR.NavLogoView()), 
this.nav_view.setElement(this.$("span.nav-logo")).render(), this.add_subview(this.nav_view)), 
this.$("span.nav-buttons").length > 0 && (this.nav_buttons || (this.nav_buttons = new HR.NavButtonsView()), 
this.nav_buttons.setElement(this.$("span.nav-buttons")).render(), this.add_subview(this.nav_buttons)), 
this.$("span.nav-login-patch").length > 0 && (this.nav_login_patch || (this.nav_login_patch = new HR.NavLoginPatchView()), 
this.nav_login_patch.setElement(this.$("span.nav-login-patch")).render(), this.add_subview(this.nav_login_patch)), 
that = this, this.updateNotificationsCount(), this.delegateEvents(), this;
}, NavigationView.prototype.updateNotificationsCount = function(count) {
return null == count && (count = -1), -1 !== count && (this.unread_notifications_count = count), 
this.$(".hr_notifications_count").html(""), this.unread_notifications_count > 0 ? this.$(".hr_notifications_count").html(this.unread_notifications_count) :void 0;
}, NavigationView.prototype.updateHackoCount = function() {
return $(".js-navigation-hacko-count") !== [] ? $(".js-navigation-hacko-count").html("Hackos: " + this.hacko_count) :void 0;
}, NavigationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NavigationView = NavigationView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ContestNavigationView, HR, _ref;
return ContestNavigationView = function(_super) {
function ContestNavigationView() {
return ContestNavigationView.__super__.constructor.apply(this, arguments);
}
return __extends(ContestNavigationView, _super), ContestNavigationView.prototype.template = "contest-navigation", 
ContestNavigationView.prototype.className = "contest-navigation-view", ContestNavigationView.prototype.events = {
"click #slideAwayToggle input":"toggleSlideAway"
}, ContestNavigationView.prototype.initialize = function(options) {
return this.contest = options.contest, this.listenToOnce(this.contest, "reset", this.render);
}, ContestNavigationView.prototype.toggleSlideAway = function(e) {
var visibility;
return $("body").removeClass("sidebar-visible"), $("body").removeClass("sidebar-not-visible"), 
$(".page_navigation-sidebar").removeClass("toggle-open"), visibility = e.currentTarget.checked ^ !0, 
$.cookie("hr_sidebar_visibility", Number(visibility)), this.updateSidebar(visibility);
}, ContestNavigationView.prototype.updateSidebar = function(visibility) {
return null == visibility && (visibility = null), null === visibility && (visibility = "checked" !== this.$("#contestOptionCheckbox").attr("checked")), 
visibility ? $("body").removeClass("slide-away") :$("body").addClass("slide-away");
}, ContestNavigationView.prototype.toggleSidebar = function() {
return $(".page_navigation-sidebar").toggleClass("toggle-open"), $(".page_navigation-sidebar.toggle-open").length > 0 ? ($("body").removeClass("sidebar-not-visible"), 
$("body").addClass("sidebar-visible")) :($("body").removeClass("sidebar-visible"), 
$("body").addClass("sidebar-not-visible"));
}, ContestNavigationView.prototype.setContestSlug = function(contest_slug) {
return this.show(), this.contest = HR.model("contest", {
slug:contest_slug
}).cached(), this.listenToOnce(this.contest, "reset", this.render), this.render();
}, ContestNavigationView.prototype.hide = function() {
return $(".page_navigation-sidebar").removeClass("toggle-open"), $("body").removeClass("slide-away"), 
$("body").removeClass("sidebar-visible"), $("body").removeClass("sidebar-not-visible"), 
$(this.el).hide();
}, ContestNavigationView.prototype.show = function() {
return $(this.el).show();
}, ContestNavigationView.prototype.renderDropdown = function() {
var contests, current_contest, data, that;
if (this.contest.sync_status) return data = [], that = this, current_contest = {
id:this.contest.get("id"),
text:this.contest.get("name"),
slug:this.contest.get("slug")
}, data.push(current_contest), contests = null, $(".hr_contest-list").select2({
minimumInputLength:1,
data:data,
query:function(query) {
var getResult;
return contests || (contests = HR.collection("public-contests"), contests.cached()), 
data = {
results:[]
}, getResult = function() {
return _.each(contests.models, function(item) {
return item.get("name") && item.get("name").toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ? data.results.push({
id:item.get("id"),
text:item.get("name"),
slug:item.get("slug")
}) :void 0;
}), query.callback(data);
}, contests.sync_status ? getResult() :that.listenToOnce(contests, "reset", function() {
return contests.findWhere({
id:current_contest.id
}) || contests.add(new Backbone.Model(current_contest)), getResult();
});
}
}), $(".hr_contest-list").unbind("change").bind("change", function() {
return function(e) {
var contest_slug;
return contest_slug = e.added.slug, that.$(".hr_dynamic-challenges").attr("href", "/contests/" + contest_slug + "/challenges"), 
that.$(".hr_dynamic-submissions").attr("href", "/contests/" + contest_slug + "/submissions"), 
that.$(".hr_dynamic-leaderboard").attr("href", "/contests/" + contest_slug + "/leaderboard"), 
HR.router.navigate("/contests/" + contest_slug + "/challenges", !0);
};
}(this)), $(".hr_contest-list").select2("data", current_contest);
}, ContestNavigationView.prototype.render = function() {
var that;
if (this.contest.sync_status && "master" !== this.contest.get("slug")) return $(this.el).html(HR.appController.template(this.template, this, !1)({
contest_slug:this.contest.get("slug"),
contest:this.contest
})), this.countdownTimerView = new HR.CountdownTimerView({
model:this.contest,
template:"dashboard/countdowntimer_v2"
}), this.add_subview(this.countdownTimerView), this.countdownTimerView.setElement($(this.el).find(".countdowntimer")).render(), 
this.updateSidebar(), that = this, $(".hr_sidebar-menu-link").unbind("click").bind("click", function() {
return function() {
return that.toggleSidebar();
};
}(this)), this.renderDropdown(), this;
}, ContestNavigationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ContestNavigationView = ContestNavigationView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SidebarView, _ref;
return SidebarView = function(_super) {
function SidebarView() {
return SidebarView.__super__.constructor.apply(this, arguments);
}
return __extends(SidebarView, _super), SidebarView.prototype.template = "side-navigation", 
SidebarView.prototype.className = "sidebar-view", SidebarView.prototype.initialize = function() {
return this.profile = HR.profile(), this.listenTo(this.profile, "sync", this.render), 
this.contest_indicator_class = "", this.contest_indicator_priority = 0, $(window).scroll(this.handleScroll);
}, SidebarView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this, !1)({
profile:this.profile,
contest_slug:HR.appController.get_current_contest_namespace()
})), this.updateNotificationsCount(), this.updateMessages(), this.delegateEvents(), 
this.initContestIndicator(), this.handleScroll(), this;
}, SidebarView.prototype.handleScroll = function() {
var pos;
return pos = Math.max($(window).scrollTop(), 0), pos >= 61 ? $("#sidebar").css("top", "0px") :$("#sidebar").css("top", "" + (61 - pos) + "px");
}, SidebarView.prototype.updateMessages = function() {
var notifications_url, that;
if (!HR.development) return that = this, HR.profile() && HR.profile().isLoggedIn() ? (notifications_url = "" + this.profile.get("notifications_url") + "-m", 
"http:" === location.protocol && (notifications_url = notifications_url.replace("https:", "http:")), 
$.ajax({
url:notifications_url,
success:function(data) {
var thread_id;
return data ? (thread_id = parseInt(data), that.update(thread_id), that.updateNotificationsCount(), 
that.updateMessages()) :that.updateMessages();
},
error:function() {
return setTimeout(function() {
return that.updateMessages.call(that);
}, 5e3);
}
})) :(setTimeout(function() {
return that.updateMessages.call(that);
}, 5e3), void 0);
}, SidebarView.prototype.update = function(thread_id) {
var collection, isMessageView, newCollection, newModel, view;
if (HR.cachedMessagesCollection) {
if (collection = HR.cachedMessagesCollection, newModel = new HR.MessageThreadModel(), 
newModel.set("id", thread_id), newModel.fetch({
success:function(model) {
return collection.findWhere({
id:thread_id
}) ? collection.findWhere({
id:thread_id
}).set("unread_count", model.get("unread_count")) :collection.add(model, {
at:0
});
}
}), view = HR.cachedMessageView || {}, isMessageView = HR.appView.contentView instanceof HR.MessageThreadView, 
isMessageView || (view.messages_collection = {}, view.messages_view = {}, view.thread_id = null), 
!view.messages_collection[thread_id]) return newCollection = HR.collection("messages"), 
newCollection.thread_id = thread_id, newCollection.fetch({
success:function() {
return view.rearrangeThread(thread_id), view.threads_view[thread_id].model.set("last_message", newCollection.first().toJSON());
}
});
if (newCollection = HR.collection("messages"), newCollection.thread_id = thread_id, 
newCollection.setFrom(view.messages_collection[thread_id].first().get("id")), newCollection.fetch({
success:function() {
return view.rearrangeThread(thread_id), view.threads_view[thread_id].model.set("last_message", newCollection.first().toJSON()), 
_.each(newCollection.models.reverse(), function(model) {
return view.messages_collection[thread_id].add(model, {
at:0
}), view.messages_view[thread_id].appendElement(model);
});
}
}), thread_id === parseInt(view.thread_id)) return view.readThread(thread_id);
}
}, SidebarView.prototype.updateNotificationsCount = function() {
return HR.profile() && HR.profile().isLoggedIn() ? $.ajax({
url:"/rest/threads/unread_threads",
success:function(resp) {
return resp.count ? $(".hr_messages_count").html(resp.count) :$(".hr_messages_count").html("");
}
}) :void 0;
}, SidebarView.prototype.initContestIndicator = function() {
var indicator_class, indicator_priority;
return indicator_priority = HR.PREFETCH_DATA.metadata.contest_status, indicator_class = "", 
2 === indicator_priority ? indicator_class = "completed" :3 === indicator_priority ? indicator_class = "active" :1 === indicator_priority && (indicator_class = "pending"), 
this.updateContestIndicator(indicator_class, indicator_priority);
}, SidebarView.prototype.updateContestIndicator = function(item_class, item_priority) {
return this.$(".hr_sidebar_contest_indicator").removeClass("status-indicator " + this.contest_indicator_class), 
item_priority > this.contest_indicator_priority && (this.contest_indicator_priority = item_priority, 
this.contest_indicator_class = item_class), this.contest_indicator_priority ? this.$(".hr_sidebar_contest_indicator").addClass("status-indicator " + this.contest_indicator_class) :void 0;
}, SidebarView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SidebarView = SidebarView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ContestsView, HR, _ref;
return ContestsView = function(_super) {
function ContestsView() {
return ContestsView.__super__.constructor.apply(this, arguments);
}
return __extends(ContestsView, _super), ContestsView.prototype.template = "dashboard/contests", 
ContestsView.prototype.className = "contests-view", ContestsView.prototype.initialize = function(options) {
return this.contest_slug = options.contest_slug, this.contest = options.contest, 
this.profile = options.profile, this.collection = options.collection, this.page = options.page, 
this.listenTo(this.collection, "reset", this.render), this.contest && this.listenTo(this.contest, "reset", this.render), 
this.has_template = !1, this._template = !1, this.listenTo(this, "render", this.adjustChallengeListHeight), 
this.listenTo(this.profile, "sync", this.refreshCollection);
}, ContestsView.prototype.refreshCollection = function() {
var that;
return that = this, this.collection.fetch({
success:function() {
return that.render();
}
});
}, ContestsView.prototype.events = {
"click .contest_signup":"showLogin",
"click .contest-signup":"contestSignup",
"click .contest-enter":"contestEnter",
"click .contest-contest":"contestContest",
"click div.contests-list-view a":"changeContest",
"click div.down":"showNext",
"click div.up":"showPrev"
}, ContestsView.prototype.changeContest = function(e) {
return e.preventDefault(), this.page = 1, this.challenges = null, this.contest_slug = $(e.currentTarget).attr("href").split("/")[2], 
this.contest = new HR.ContestModel({
slug:this.contest_slug
}), this.contest.cached(), this.listenTo(this.contest, "reset", this.render), HR.router.navigate($(e.currentTarget).attr("href"), !1), 
this.render(), !1;
}, ContestsView.prototype.setActive = function() {
return this.collection.sync_status && "archived" !== this.contest_slug && (!this.contest_slug || this.contest && this.contest.sync_status && this.contest.get("public")) ? (this.contest_slug || (_.each(this.collection.grouped()[0].contests.models, function(_this) {
return function(model) {
return "anki" === model.get("slug") ? _this.contest_slug = model.get("slug") :void 0;
};
}(this)), !this.contest_slug && this.collection.grouped()[0].contests.length > 0 && (this.contest_slug = this.collection.grouped()[0].contests.first().get("slug")), 
this.contest_slug && (this.contest = new HR.ContestModel({
slug:this.contest_slug
}).cached())), _.each(this.collection.models, function(_this) {
return function(model) {
return model.active = model.get("slug") === _this.contest_slug ? !0 :!1;
};
}(this)), this.challenges || (this.challenges = HR.collection("challenges"), this.challenges.setContest(this.contest_slug), 
this.challenges.setPage(this.page), this.challenges.setLoginTracking(!0), this.challenges.cached(), 
this.listenTo(this.challenges, "reset", this.render)), !0) :void 0;
}, ContestsView.prototype.adjustChallengeListHeight = function() {
var challengesList, minHeight;
return challengesList = this.$("div.challenges-list"), minHeight = Math.max(this.$(".inline-sidebar").height() || 0, challengesList.height() || 0), 
minHeight > 0 ? challengesList.css("min-height", minHeight) :void 0;
}, ContestsView.prototype.render = function() {
return this.setActive(), HR.appController.set_contest_namespace("master"), this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this.trigger("render"), this;
}, ContestsView.prototype.renderView = function() {
var background_image, button, challengesContainer, challenges_div, collection, contest_button, enter_button, message, signup_button;
return this.has_template ? ($(this.el).html(this._template({
contests:this.collection,
profile:this.profile,
contest:this.contest,
contest_slug:this.contest_slug
})), _.each(this.collection.grouped(), function(_this) {
return function(group) {
var tabsContainer;
return tabsContainer = $(), _this.collection.sync_status || "archived" !== group.key ? ("archived" === group.key && _this.collection.page > 1 && tabsContainer.push($("<div class='up m' data-offset='10'><div><a class='btn btn-text'><i class='icon-up-open-mini'></i>Load previous 10</a></div></div>").get(0)), 
_.each(group.contests.models, function(model) {
var _view;
return _view = new HR.ContestsTabView({
model:model,
that:this
}), tabsContainer.push(_view.render().el), this.add_subview(_view);
}, _this), "archived" === group.key && _this.collection.page * _this.collection.limit < _this.collection.total && tabsContainer.push($("<div class='down m' data-offset='10'><div><a class='btn btn-text'><i class='icon-down-open-mini'></i>Load next 10</a></div></div>").get(0)), 
_this.$(".contests_list-" + group.key).html(tabsContainer)) :_this.$(".contests_list-" + group.key).html(HR.appController.viewLoader(32));
};
}(this)), challenges_div = this.$("div.challenges-list"), "archived" === this.contest_slug && (collection = HR.collection("archived-contests", {
page:this.page
}).cached({
cacheSiblings:!0
}), this.archivedView = new HR.ArchivedContestsView({
collection:collection
}), this.archivedView.setElement(this.$(".archived-contests")).render()), this.contest && this.contest.sync_status ? this.contest.get("archived") || this.contest.get("started") && this.contest.get("signed_up") ? this.challenges && (this.challenges.sync_status || this.challenges.length > 0) ? (challengesContainer = $(), 
_.each(this.challenges.models, function(challenge) {
var _view;
return _view = new HR.ChallengesListView({
model:challenge,
id:parseInt(1e6 * Math.random())
}), challengesContainer.push(_view.render().el), this.add_subview(_view);
}, this), challenges_div.html(challengesContainer), HR.util.pagination(this.$(".pagination-wrapper"), this.challenges.getTotal(), "" + this.challenges.pageURL() + "/", this.challenges.getCurrentPage(), null, this.challenges.limit)) :challenges_div.html(HR.appController.viewLoader(64)) :(signup_button = "<button class='btn btn-primary btn-large contests_pane-CTAbtn contest-signup'>Register</button>", 
enter_button = "<button class='btn btn-primary btn-large contests_pane-CTAbtn contest-enter'>Solve Challenges</button>", 
contest_button = "<button class='btn btn-primary btn-large contests_pane-CTAbtn contest-contest'>View Contest</button>", 
!this.contest.get("started") && this.contest.get("signed_up") ? (message = "<p class='aside contests_pane-message'>You have registered for the contest.</p>", 
button = contest_button) :this.contest.get("started") && !this.contest.get("signed_up") ? (message = "<p class='aside contests_pane-message'>You have not registered for the contest. The contest is in progress. Please register to start solving challenges.</p>", 
button = signup_button) :this.contest.get("started") || this.contest.get("signed_up") ? this.contest.get("started") && this.contest.get("signed_up") && (message = "<p class='aside contests_pane-message'>Contest has started.</p>", 
button = enter_button) :(message = "<p class='aside contests_pane-message'>You have not registered for the contest. Please register to participate.</p>", 
button = signup_button), background_image = this.contest.get("homepage_background_image") || "/assets/hackergames/hacker-games-mountains.jpg", 
challenges_div.html('<div class=\'text-center\'>\n  <div class="contests_pane">\n      <h3 class="alpha contests_pane-title">' + this.contest.get("name") + "</h3>\n      <p>" + this.contest.get("description") + "</p>\n  </div>\n  " + message + "\n  " + button + "\n</div>")) :this) :void 0;
}, ContestsView.prototype.contestSignup = function(e) {
var current_text, that;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? (current_text = $(e.currentTarget).html(), 
$(e.currentTarget).html("Signing up..."), $(e.currentTarget).attr("disabled", "disabled"), 
that = this, $.ajax({
type:"POST",
beforeSend:function(xhr) {
return xhr.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
url:"/rest/contests/" + this.contest_slug + "/signup",
data:{
contest_crp:$.cookie("" + this.contest_slug + "_crp")
},
success:function(_this) {
return function(data) {
var profile;
return mixpanel.push([ "track", "Contest Signup", {
contest:_this.contest_slug,
username:HR.profile().get("username")
} ]), data.status ? (that.contest.fetch({
success:function() {
return that.render();
}
}), that.collection.fetch({
success:function() {
return that.render();
}
})) :(profile = HR.profile(), profile.isLoggedIn() ? alert(data.message) :new HR.util.ShowLoginDialog({
show_sign_up_link:!0,
error_message:data.message
}).render(), $(e.currentTarget).html(current_text), $(e.currentTarget).removeAttr("disabled"));
};
}(this)
})) :void 0;
}, ContestsView.prototype.contestEnter = function(e) {
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).html("Entering..."), 
$(e.currentTarget).attr("disabled", "disabled"), HR.router.navigate("/contests/" + this.contest_slug + "/challenges", {
trigger:!0,
replace:!0
})) :void 0;
}, ContestsView.prototype.contestContest = function(e) {
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
window.location = "/" + this.contest_slug) :void 0;
}, ContestsView.prototype.showLogin = function(e) {
var element, login;
return e.preventDefault(), element = $(e.target), login = HR.util.ShowLoginDialog({
contest:element.attr("data-contest"),
show_sign_up_link:!0
}), login.render();
}, ContestsView.prototype.showNext = function(e) {
return e.preventDefault(), this.collection.contest_slug = null, this.collection.page += 1, 
this.collection.sync_status = !1, this.collection.cached(), this.render();
}, ContestsView.prototype.showPrev = function(e) {
return e.preventDefault(), this.collection.contest_slug = null, this.collection.page -= 1, 
this.collection.sync_status = !1, this.collection.cached(), this.render();
}, ContestsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ContestsView = ContestsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ArchivedContestsView, HR, _ref;
return ArchivedContestsView = function(_super) {
function ArchivedContestsView() {
return ArchivedContestsView.__super__.constructor.apply(this, arguments);
}
return __extends(ArchivedContestsView, _super), ArchivedContestsView.prototype.template = "dashboard/archived-contests", 
ArchivedContestsView.prototype.className = "archived-contests-view", ArchivedContestsView.prototype.initialize = function(options) {
return this.collection = options.collection, this.listenTo(this.collection, "reset", this.render);
}, ArchivedContestsView.prototype.render = function() {
var count;
return this.collection.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
contests:this.collection
})), HR.util.pagination(this.$(".pagination-wrapper"), this.collection.total, "/contests/archived/", this.collection.page, null, count = this.collection.limit)) :$(this.el).html(HR.appController.viewLoader(64));
}, ArchivedContestsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ArchivedContestsView = ArchivedContestsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ContestsTabView, HR, _ref;
return ContestsTabView = function(_super) {
function ContestsTabView() {
return ContestsTabView.__super__.constructor.apply(this, arguments);
}
return __extends(ContestsTabView, _super), ContestsTabView.prototype.initialize = function() {
return this.listenTo(this.model, "change", this.render);
}, ContestsTabView.prototype.template = "dashboard/contests-tab", ContestsTabView.prototype.className = "contests-list-view", 
ContestsTabView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model
})), $.timeago.settings.allowFuture = !0, this.$(".timeago").timeago(), this.delegateEvents(), 
this;
}, ContestsTabView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ContestsTabView = ContestsTabView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CountdownTimerView, HR, _ref;
return CountdownTimerView = function(_super) {
function CountdownTimerView() {
return CountdownTimerView.__super__.constructor.apply(this, arguments);
}
return __extends(CountdownTimerView, _super), CountdownTimerView.prototype.template = "dashboard/countdowntimer", 
CountdownTimerView.prototype.className = "countdowntimer-view", CountdownTimerView.prototype.initialize = function(options) {
return this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render), 
options.template ? this.template = options.template :void 0;
}, CountdownTimerView.prototype.setContest = function(model) {
return this.stopListening(this.model), this.model = model, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render), this.render();
}, CountdownTimerView.prototype.render = function() {
var milestone_epoch, _clbk;
return this.model.get("epoch_starttime") || this.model.get("epoch_endttime") ? ($(this.el).html(HR.appController.template(this.template, this, !1)({
model:this.model
})), this.$el.show(), milestone_epoch = this.model.ended() ? null :this.model.started() ? this.model.get("epoch_endtime") :this.model.get("epoch_starttime"), 
this.countdown_interval && clearInterval(this.countdown_interval), "acm" === this.model.get("kind") ? (_clbk = function(_this) {
return function() {
return _this.$(".countdown").html(HR.util.getRemainingTime(milestone_epoch)), _this.$(".contest-countdown").css("border-bottom", "0px");
};
}(this), _clbk(), this.countdown_interval = setInterval(_clbk, 1e3)) :(this.$(".countdown").html($.timeago(this.model.nextMilestone())), 
this.$(".contest-countdown").css("border-bottom", "1px black dotted"), null !== milestone_epoch && 0 !== milestone_epoch && (_clbk = function() {
return HR.util.getRemainingTime(milestone_epoch);
}, this.$(".countdown").tooltip({
title:_clbk
}))), this) :(this.$el.hide(), this);
}, CountdownTimerView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CountdownTimerView = CountdownTimerView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ViewShiv, _ref;
return ViewShiv = function(_super) {
function ViewShiv() {
return ViewShiv.__super__.constructor.apply(this, arguments);
}
return __extends(ViewShiv, _super), ViewShiv.prototype.initialize = function(options) {
return null == options && (options = {}), ViewShiv.__super__.initialize.call(this, options), 
this.template = options.view, this.setElement(options.el), options.model ? (this.model.bind("change", this.render, this), 
this.model.bind("reset", this.render, this)) :void 0;
}, ViewShiv.prototype.render = function() {
return HR.appController.getTemplate(this.template, function(_this) {
return function(template) {
return _this.$el.html(template({
model:_this.model.toJSON()
}));
};
}(this), this), this;
}, ViewShiv;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ViewShiv = ViewShiv;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var BreadCrumbsView, HR, _ref;
return BreadCrumbsView = function(_super) {
function BreadCrumbsView() {
return BreadCrumbsView.__super__.constructor.apply(this, arguments);
}
return __extends(BreadCrumbsView, _super), BreadCrumbsView.prototype.template = "dashboard/bread-crumbs", 
BreadCrumbsView.prototype.className = "breadcrumbs-view", BreadCrumbsView.prototype.initialize = function() {
return this.listenTo(this.collection, "add change", this.render);
}, BreadCrumbsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection
})), this;
}, BreadCrumbsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.BreadCrumbsView = BreadCrumbsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Modal, _ref;
return Modal = function(_super) {
function Modal() {
return Modal.__super__.constructor.apply(this, arguments);
}
return __extends(Modal, _super), Modal.prototype.template = "modal2", Modal.prototype.className = "modal-view", 
Modal.prototype.defaults = {
header:"Header",
body:"Body",
footer:"Footer"
}, Modal.prototype.initialize = function(options) {
return null == options && (options = {}), Modal.__super__.initialize.call(this, options), 
options.parent && (this.parent = options.parent), 0 === $("body").find("#modal-wrap").length && $("body").append('<div id="modal-wrap"></div>'), 
$("#modal-wrap").append("<div id='modal-" + this.cid + "'></div>"), this.el = $("body #modal-wrap #modal-" + this.cid);
}, Modal.prototype.render = function() {
return HR.appController.getTemplate(this.template, function(_this) {
return function(t) {
return $(_this.el).html(t({
body:_this.body,
header:_this.header,
footer:_this.footer,
template:_this.template
})), $(_this.el).find(".modal").modal(!0).show(), _this.$el = $(_this.el), _this.delegateEvents();
};
}(this)), this;
}, Modal.prototype.remove = function() {
return $(this.el).modal("hide"), Modal.__super__.remove.apply(this, arguments);
}, Modal;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Modal = Modal;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, MultiFrameModal, _ref;
return MultiFrameModal = function(_super) {
function MultiFrameModal() {
return MultiFrameModal.__super__.constructor.apply(this, arguments);
}
return __extends(MultiFrameModal, _super), MultiFrameModal.prototype.initialize = function(options) {
return null == options && (options = {}), MultiFrameModal.__super__.initialize.call(this, options), 
this.currentFrame = 0, this.framesTemplate = options.frames, this.framesData = options.data || {};
}, MultiFrameModal.prototype.events = {
"click .js_next-frame":"nextFrame",
"click .js_prev-frame":"prevFrame",
"click label.onboarding_trackSelect":"trackSel"
}, MultiFrameModal.prototype.trackSel = function(gg) {
var keyx;
return keyx = $(gg.currentTarget).find("input").val(), "" !== keyx && ($(".onboarding_trackSelect").removeClass("active"), 
$(gg.currentTarget).addClass("active")), this;
}, MultiFrameModal.prototype.prevFrame = function() {
return this.trigger("preFrameChange", this.currentFrame, this.currentFrame - 1), 
this.currentFrame = this.currentFrame - 1, this.renderFrameChange(), this.trigger("postFrameChange", this.currentFrame + 1, this.currentFrame), 
this.log("@trigger('postFrameChange', " + this.currentFrame + ", " + (this.currentFrame + 1) + ")");
}, MultiFrameModal.prototype.nextFrame = function() {
return this.trigger("preFrameChange", this.currentFrame, this.currentFrame + 1), 
this.currentFrame = this.currentFrame + 1, this.renderFrameChange(), this.trigger("postFrameChange", this.currentFrame - 1, this.currentFrame), 
this.log("@trigger('postFrameChange', " + this.currentFrame + ", " + (this.currentFrame - 1) + ")");
}, MultiFrameModal.prototype.renderFrameChange = function() {
return this.frames[this.currentFrame] ? (this.$(".modal-header .header-msg").html(this.frames[this.currentFrame].header), 
this.$(".modal-body").html(this.frames[this.currentFrame].body), this.$(".modal-footer").html(this.frames[this.currentFrame].footer), 
this.delegateEvents(), this) :(this.$(".close").click(), void 0);
}, MultiFrameModal.prototype.render = function() {
return HR.appController.getTemplate(this.framesTemplate, function(_this) {
return function(frames) {
var fdata, frame;
return fdata = document.createElement("div"), _this.framesData.profile = HR.profile().attributes, 
$(fdata).append(frames(_this.framesData)), $(fdata).children("section"), _this.frames = _.map($(fdata).children("section"), function(frame) {
return {
header:$(frame).children("header").html(),
body:$(frame).children("article").html(),
footer:$(frame).children("footer").html()
};
}), frame = _this.frames[_this.currentFrame], _this.body = frame.body, _this.header = frame.header, 
_this.footer = frame.footer, MultiFrameModal.__super__.render.apply(_this, arguments), 
_this.delegateEvents();
};
}(this)), this;
}, MultiFrameModal;
}(window.HR.Modal), HR = null != (_ref = window.HR) ? _ref :{}, HR.MultiFrameModal = MultiFrameModal;
});
}.call(this), function() {
var __bind = function(fn, me) {
return function() {
return fn.apply(me, arguments);
};
}, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ChallengesView, HR, _ref;
return ChallengesView = function(_super) {
function ChallengesView() {
return this.renderTagInput = __bind(this.renderTagInput, this), ChallengesView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengesView, _super), ChallengesView.prototype.template = "dashboard/challenges", 
ChallengesView.prototype.className = "challenges-view", ChallengesView.prototype.rendered = !1, 
ChallengesView.prototype.initialize = function(options) {
return options.filter && (this.filter = options.filter), options.activeCategory && (this.activeCategory = options.activeCategory), 
this.contest = options.contest, this.challenges = options.challenges, this.category_slugs = options.category_slugs, 
this.profile = HR.profile(), this.is_track_view = options.is_track_view, this.getRecommendedChallenge(), 
this.listenTo(this.profile, "reset", this.loggedIn), this.listenTo(this.challenges, "reset", this.render), 
this.getRecentHackers();
}, ChallengesView.prototype.events = {
"click #clear-filters":"clearFilters",
"click #submit-filters":"submitFilters",
"click .challenges_tracks-toggle":"toggleTrack",
"click #filters-toggle":"toggleFilterWidget",
"change .filter-checkbox input":"toggleFilter",
"change input[type=hidden]":"setFilters",
"click .close":"toggleFilterWidget",
"click .hacker-wrap":"sendMessage"
}, ChallengesView.prototype.sendMessage = function(e) {
var dialog;
return e.preventDefault(), this.profile.isLoggedIn() ? (dialog = new HR.util.ShowMessageDialog({
username:$(e.currentTarget).attr("data-username")
}), dialog.render()) :void 0;
}, ChallengesView.prototype.submitFilters = function(e) {
var baseURL;
return e.preventDefault(), baseURL = "" + this.challenges.pageURL() + "/challenges", 
this.challenges.filters.length > 0 && (baseURL += "/filter/" + this.challenges.filters.join("+")), 
this.challenges.sort_by && (baseURL += "/sort/" + this.challenges.sort_by, "desc" !== this.challenges.sort_dir && (baseURL += "/dir/desc")), 
baseURL += "/page/" + this.challenges.getCurrentPage(), baseURL !== document.location.pathname ? (this.$("#tag-list").select2("destroy"), 
HR.router.navigate(baseURL, {
trigger:!0
})) :void 0;
}, ChallengesView.prototype.clearFilters = function(e) {
var url;
return e.preventDefault(), url = "" + this.challenges.pageURL() + "/challenges", 
url !== document.location.pathname ? (this.$("#tag-list").select2("destroy"), HR.router.navigate(url, {
trigger:!0
})) :void 0;
}, ChallengesView.prototype.setFilters = function() {
var filters;
return filters = [], $.each(this.$("input[type=checkbox]"), function(index, elem) {
return $(elem).is(":checked") ? filters.push($(elem).val()) :void 0;
}), this.$("#tag-list").val() && filters.push.apply(filters, this.$("#tag-list").val().split("+")), 
this.challenges.setFilters(filters);
}, ChallengesView.prototype.toggleFilter = function(e) {
var ex, target;
return ex = $(e.target.parentElement), ex.toggleClass("active"), ex.find("i").toggleClass("filter"), 
target = $(e.target), this.setFilters(), this;
}, ChallengesView.prototype.toggleFilterWidget = function() {
return this.$("#challenges-filters").slideToggle(), this.$("#filters-toggle").toggleClass("active"), 
this.$("#filters-toggle").hasClass("active") ? this.$("#filters-toggle").html("Hide Filters&nbsp;&nbsp;<i class='icon-up-open-mini'></i>") :this.$("#filters-toggle").html("Show Filters&nbsp;&nbsp;<i class='icon-down-open-mini'></i>"), 
this;
}, ChallengesView.prototype.renderTagInput = function() {
var that;
return that = this, $(this.el).find("#tag-list").select2({
multiple:!0,
minimumInputLength:1,
allowClear:!0,
width:"600px",
placeholder:"Add a tag...",
separator:"+",
ajax:{
url:"/rest/tags/autocomplete",
dataType:"json",
data:function(term) {
return {
q:term
};
},
results:function(data) {
var elem;
return data = function() {
var _i, _len, _results;
for (_results = [], _i = 0, _len = data.length; _len > _i; _i++) elem = data[_i], 
_results.push({
id:elem.slug,
text:elem.name
});
return _results;
}(), {
results:data
};
}
},
initSelection:function(element, callback) {
var tags;
return tags = that.filter.split("+"), $.each([ "complete", "incomplete", "sponsored" ], function(index, elem) {
var elemindex;
return elemindex = $.inArray(elem, tags), elemindex >= 0 ? tags.splice(elemindex, 1) :void 0;
}), tags.length > 0 ? (tags = tags.join("+"), $.ajax("/rest/tags/" + tags).done(function(data) {
var elem;
return data = function() {
var _i, _len, _ref, _results;
for (_ref = data.model, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) elem = _ref[_i], 
_results.push({
id:elem.slug,
text:elem.name
});
return _results;
}(), callback(data);
})) :void 0;
}
}), this;
}, ChallengesView.prototype.activeTag = function() {
return this.category_slugs && this.category_slugs[1] ? this.category_slugs[1] :"";
}, ChallengesView.prototype.toggleTrack = function(e) {
return this.activeCategory = $(e.target).attr("data-slug"), this.$(e.target).is("i") && (e.target = e.target.parentNode), 
this.$(e.target).hasClass("active") ? (this.$(e.target.nextElementSibling).collapse("hide"), 
this.$(e.target).removeClass("active"), this.$(e.target).find("i").removeClass("icon-down-open").addClass("icon-right-open")) :(this.$(e.target.nextElementSibling).collapse("show"), 
_.chain(this.$(".accordion-body")).filter(function() {
return function(elm) {
return $(elm).attr("id") !== $(e.target.nextElementSibling).attr("id");
};
}(this)).map(function(_this) {
return function(elm) {
return _this.$(elm.previousElementSibling).removeClass("active"), $(elm.previousElementSibling).find("i").removeClass("icon-down-open").addClass("icon-right-open"), 
elm;
};
}(this)).filter(function() {
return function(elm) {
return $(elm).hasClass("in");
};
}(this)).each(function() {
return function(elm) {
return $(elm).collapse("hide");
};
}(this)), this.$(e.target).addClass("active"), this.$(e.target).find("i").removeClass("icon-right-open").addClass("icon-down-open")), 
e.stopPropagation(), e.preventDefault(), this;
}, ChallengesView.prototype.currentCategories = function() {
return this.is_track_view ? this.contest.currentTracks(this.category_slugs) :this.contest.currentCategories(this.category_slugs);
}, ChallengesView.prototype.categories = function() {
var categories, category, that, _currentLevel;
return this.contest.get("has_tracks") ? (categories = this.is_track_view ? this.contest.tracks() :this.contest.categories(), 
that = this, category = [], _currentLevel = categories, this.currentCategories().each(function(category) {
var _category;
return _category = _currentLevel.get(category), _category.active = !0, _currentLevel = _category.children();
}), categories) :[];
}, ChallengesView.prototype.adjustChallengeListHeight = function() {
var challengesList, minHeight;
return challengesList = this.$("div.challenges-list"), minHeight = Math.max(this.$(".inline-sidebar").height() || 0, challengesList.height() || 0), 
minHeight > 0 ? challengesList.css("min-height", minHeight) :void 0;
}, ChallengesView.prototype.trackIndex = function() {
var startIndex;
return startIndex = 0, function() {
return startIndex += 1;
};
}, ChallengesView.prototype.getSortLink = function(sort_field) {
var baseURL;
return baseURL = "" + this.challenges.pageURL() + "/challenges", this.challenges.filters.length > 0 && (baseURL += "/filter/" + this.challenges.filters.join("+")), 
baseURL += "/sort/" + sort_field, this.challenges.sort_by === sort_field && "desc" !== this.challenges.sort_dir && (baseURL += "/dir/desc"), 
baseURL += "/page/" + this.challenges.getCurrentPage();
}, ChallengesView.prototype.getRecommendedChallenge = function() {
return HR.profile().isLoggedIn() ? (this.recommended_challenge = new HR.RecommendedChallengeModel({
tag:this.activeCategory,
type:HR.profile().isLoggedIn() ? "" :"easiest"
}), this.listenTo(this.recommended_challenge, "reset", this.render), this.recommended_challenge.cached(), 
this.render()) :void 0;
}, ChallengesView.prototype.loggedIn = function() {
var that, tracks_collection;
return HR.PREFETCH_DATA.profile = HR.profile().toJSON(), that = this, tracks_collection = new HR.TrackCollection(), 
tracks_collection.fetch({
success:function() {
return _.each(tracks_collection.models, function(model) {
return HR.PREFETCH_DATA.tracks[model.get("slug")] = model.toJSON();
}), that.getRecommendedChallenge();
}
});
}, ChallengesView.prototype.getRecentHackers = function() {
var that;
if ("master" !== this.contest.get("slug")) return that = this, $.ajax({
url:"" + this.contest.restURL() + "/recent_hackers",
success:function(data) {
return that.recent_hackers = data, that.render();
}
});
}, ChallengesView.prototype.render = function() {
var challengesContainer, listView, select2filters, tags, url;
return HR.profile().isLoggedIn() && !HR.PREFETCH_DATA.profile.id && this.loggedIn(), 
this.filter ? (tags = this.filter.split("+"), $.each([ "complete", "incomplete", "sponsored" ], function(index, elem) {
var elemindex;
return elemindex = $.inArray(elem, tags), elemindex >= 0 ? tags.splice(elemindex, 1) :void 0;
}), select2filters = tags.join("+")) :select2filters = "", void 0 === this.activeCategory && (this.activeCategory = "shortcuts"), 
$(this.el).html(HR.appController.template(this.template, this)({
categories:this.categories(),
profile:this.profile.toJSON(),
track:this.contest.getTrack(this.tag),
activeCategory:this.activeCategory,
current_track:HR.PREFETCH_DATA.tracks[this.activeCategory] || {
hacker_progress:{}
},
getTrackIndex:this.trackIndex(),
currentCategories:this.currentCategories(),
contest:this.contest.toJSON(),
remaining_time:this.contest.getRemainingTime(),
recommended_challenge:this.recommended_challenge,
filter:this.filter,
filters:this.challenges.filters,
select2filters:select2filters,
activeTag:this.activeTag(),
is_track_view:this.is_track_view,
recent_hackers:this.recent_hackers
})), this.$("span.search_form").length > 0 && (this.search_view || (this.search_view = new HR.AppSearchView(), 
this.add_subview(this.search_view)), this.search_view.setElement(this.$("span.search_form")).render()), 
$(this.el).find(".sort-title > a").attr("href", this.getSortLink("name")), $(this.el).find(".sort-date > a").attr("href", this.getSortLink("created_at")), 
"name" === this.challenges.sort_by ? "desc" === this.challenges.sort_dir ? $(this.el).find(".sort-title").find("i.icon-down-dir").addClass("active") :$(this.el).find(".sort-title").find("i.icon-up-dir").addClass("active") :"created_at" === this.challenges.sort_by && ("desc" === this.challenges.sort_dir ? $(this.el).find(".sort-date").find("i.icon-down-dir").addClass("active") :$(this.el).find(".sort-date").find("i.icon-up-dir").addClass("active")), 
listView = "all" === this.activeTag() ? HR.ChallengesSortedListView :HR.ChallengesListView, 
this.challenges.sync_status ? (challengesContainer = $(), this.challenges.models.length > 0 ? _.each(this.challenges.models, function(challenge) {
var _view;
return _view = new listView({
model:challenge,
id:parseInt(1e6 * Math.random()),
contest:this.contest
}), challengesContainer.push(_view.render().el), this.add_subview(_view);
}, this) :challengesContainer = $.inArray("recommended", this.category_slugs) >= 0 ? $("<p class='aside padding'>We're currently collecting data and will be rolling out recommended challenges for you soon!</p>") :$("<p class='aside padding'>No matching challenges found.</p>"), 
this.$("div.challenges-list").append(challengesContainer), url = "" + this.challenges.pageURL() + "/challenges", 
this.challenges.filters.length > 0 && (url += "/filter/" + this.challenges.filters.join("+")), 
this.challenges.sort_by && (url += "/sort/" + this.challenges.sort_by), this.challenges.sort_dir && (url += "/dir/" + this.challenges.sort_dir), 
HR.util.pagination(this.$(".pagination-wrapper"), this.challenges.getTotal(), "" + url + "/page/", this.challenges.getCurrentPage(), null, this.challenges.limit), 
this.challenges.models.length <= 0 && this.$(".pagination-wrapper").hide()) :$(this.el).find("div.challenges-list").html(HR.appController.viewLoader(64)), 
$(this.el).find("#tag-list") ? this.renderTagInput() :setTimeout(this.renderTagInput(), 500), 
this.trigger("render"), this;
}, ChallengesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChallengesView = ChallengesView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ChallengesSortedListView, HR, _ref;
return ChallengesSortedListView = function(_super) {
function ChallengesSortedListView() {
return ChallengesSortedListView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengesSortedListView, _super), ChallengesSortedListView.prototype.initialize = function(options) {
var that;
return this.contest = options.contest, this.id = options.id, this.elapsed_time = 0, 
that = this;
}, ChallengesSortedListView.prototype.template = "dashboard/challenges-sorted-list", 
ChallengesSortedListView.prototype.className = "challenges-list-view", ChallengesSortedListView.prototype.baseURL = function() {
return this.model.pageURL();
}, ChallengesSortedListView.prototype.render = function() {
var that, width_percent, _model;
return that = this, _model = this.model.toJSON(), _model && ($(this.el).html(HR.appController.template(this.template, this)({
model:_model,
id:this.id,
extraHackersLimit:10,
baseURL:this.baseURL(),
contest:this.contest ? this.contest.toJSON() :null
})), width_percent = 100 * _model.solved_count / _model.total_count, width_percent ? this.$(".progress .bar").css({
width:"" + width_percent + "%"
}) :this.$(".progress").hide(), this.delegateEvents(), _model.has_started && _model.has_ended || (this.interval && clearInterval(this.interval), 
this.interval = setInterval(function() {
return that.update_time();
}, 1e3))), this;
}, ChallengesSortedListView.prototype.update_time = function() {
var html_content;
return this.elapsed_time = this.elapsed_time + 1, html_content = this.time_to_html(this.model.attributes.countdown_time - this.elapsed_time), 
this.$("#js-challenge-starttime-countdown-" + this.id).html(html_content).parent().show(), 
$("#js-challenge-starttime-countdown-" + this.id).html() ? void 0 :clearInterval(this.interval);
}, ChallengesSortedListView.prototype.time_to_html = function(time) {
var days, hours, minutes, seconds;
return time = parseInt(time), seconds = time % 60, time /= 60, time = parseInt(time), 
minutes = time % 60, time /= 60, time = parseInt(time), hours = time % 24, time /= 24, 
time = parseInt(time), days = time, days > 0 ? "" + days + " days, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds" :hours > 0 ? "" + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds" :minutes > 0 ? "" + minutes + " minutes and " + seconds + " seconds" :seconds > 0 ? "" + seconds + " seconds" :(this.model.attributes.has_started = !0, 
clearInterval(this.interval), this.render(), "0 seconds");
}, ChallengesSortedListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChallengesSortedListView = ChallengesSortedListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ChallengesListView, HR, _ref;
return ChallengesListView = function(_super) {
function ChallengesListView() {
return ChallengesListView.__super__.constructor.apply(this, arguments);
}
return __extends(ChallengesListView, _super), ChallengesListView.prototype.initialize = function(options) {
var that;
return this.contest = options.contest, this.id = options.id, this.elapsed_time = 0, 
that = this;
}, ChallengesListView.prototype.template = "dashboard/challenges-list", ChallengesListView.prototype.className = "challenges-list-view", 
ChallengesListView.prototype.events = {
"click a":"triggerLinkClick"
}, ChallengesListView.prototype.triggerLinkClick = function(e) {
return this.trigger("linkClicked", e.target);
}, ChallengesListView.prototype.baseURL = function() {
return this.model.pageURL();
}, ChallengesListView.prototype.render = function() {
var that, width_percent, _model;
return that = this, _model = this.model.toJSON(), _model && ($(this.el).html(HR.appController.template(this.template, this)({
model:_model,
id:this.id,
extraHackersLimit:10,
baseURL:this.baseURL(),
contest:this.contest ? this.contest.toJSON() :null,
throbber:HR.appController.viewLoader()
})), width_percent = _model.total_count && _model.solved_count ? 100 * _model.solved_count / _model.total_count :null, 
width_percent ? this.$(".progress .bar").css({
width:"" + width_percent + "%"
}) :this.$(".progress").hide(), this.delegateEvents(), _model.has_started && _model.has_ended || (this._interval && clearInterval(this._interval), 
this._interval = setInterval(function(_this) {
return function() {
return _this.update_time();
};
}(this), 1e3))), this;
}, ChallengesListView.prototype.update_time = function() {
var html_content;
return this.elapsed_time = this.elapsed_time + 1, html_content = this.time_to_html(this.model.attributes.countdown_time - this.elapsed_time), 
this.$("#js-challenge-starttime-countdown-" + this.id).html(html_content).parent().show(), 
this.$(".js-start_timer").html(html_content), this.$("#js-challenge-starttime-countdown-" + this.id).html() || this.$(".js-start_timer").html() ? void 0 :clearInterval(this._interval);
}, ChallengesListView.prototype.time_to_html = function(time) {
var days, hours, minutes, seconds;
return time = parseInt(time), seconds = time % 60, time /= 60, time = parseInt(time), 
minutes = time % 60, time /= 60, time = parseInt(time), hours = time % 24, time /= 24, 
time = parseInt(time), days = time, days > 0 ? "" + days + " days, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds" :hours > 0 ? "" + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds" :minutes > 0 ? "" + minutes + " minutes and " + seconds + " seconds" :seconds > 0 ? "" + seconds + " seconds" :(this.model.attributes.has_started || setTimeout(function(_this) {
return function() {
return _this.model.fetch({
success:function() {
return _this.render();
}
});
};
}(this), 1500), this.model.attributes.has_started = !0, clearInterval(this._interval), 
this.render(), "0 seconds");
}, ChallengesListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChallengesListView = ChallengesListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, OnboardingChallengesListView, _ref;
return OnboardingChallengesListView = function(_super) {
function OnboardingChallengesListView() {
return OnboardingChallengesListView.__super__.constructor.apply(this, arguments);
}
return __extends(OnboardingChallengesListView, _super), OnboardingChallengesListView.prototype.template = "onboarding-challenges-list", 
OnboardingChallengesListView.prototype.events = {
"click a":"triggerLinkClick"
}, OnboardingChallengesListView.prototype.triggerLinkClick = function(e) {
return this.trigger("linkClicked", e.target);
}, OnboardingChallengesListView;
}(window.HR.ChallengesListView), HR = null != (_ref = window.HR) ? _ref :{}, HR.OnboardingChallengesListView = OnboardingChallengesListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CodeCompileTestView, HR;
return CodeCompileTestView = function(_super) {
function CodeCompileTestView() {
return CodeCompileTestView.__super__.constructor.apply(this, arguments);
}
return __extends(CodeCompileTestView, _super), CodeCompileTestView.prototype.template = "code-compile-test", 
CodeCompileTestView.prototype.className = "code-compile-test-view", CodeCompileTestView.prototype.initialize = function(options) {
return this.model.bind("change", this.render, this), this.model.bind("reset", this.render, this), 
this.parent = options.parent;
}, CodeCompileTestView.prototype.render = function() {
var has_compile_block, has_runtime_block;
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.model.get("status") > 0 && (has_compile_block = this.$(".compile-time").length > 0, 
has_runtime_block = this.$(".run-time").length > 0, has_compile_block && !has_runtime_block && (this.$(".compile-time").addClass("remove-border"), 
this.$(".compile-time").addClass("full-width"), this.$(".compile-time .rotate").remove()), 
has_runtime_block && !has_compile_block && (this.$(".run-time").addClass("full-width"), 
this.$(".run-time .rotate").remove())), this;
}, CodeCompileTestView;
}(window.HR.GenericView), HR = window.HR || {}, HR.CodeCompileTestView = CodeCompileTestView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GameCompileTestView, HR;
return GameCompileTestView = function(_super) {
function GameCompileTestView() {
return GameCompileTestView.__super__.constructor.apply(this, arguments);
}
return __extends(GameCompileTestView, _super), GameCompileTestView.prototype.template = "game-compile-test", 
GameCompileTestView.prototype.className = "game-compile-test-view", GameCompileTestView.prototype.initialize = function(options) {
return this.model.bind("change", this.render, this), this.model.bind("reset", this.render, this), 
this.parent = options.parent;
}, GameCompileTestView.prototype.render = function() {
var that;
return this.game_collection || (this.game_collection = new HR.GameCollection(), 
that = this, HR.requires("compound/game-views", function() {
var game_container_view;
return game_container_view = new HR.GameContainerView({
collection:that.game_collection
}), game_container_view.setElement(that.el).render(), that.add_subview(game_container_view);
})), this.model.get("actors") && _.each(this.model.get("actors"), function(actor) {
var game;
return this.game_collection.get(actor) ? void 0 :(game = new HR.GameModel({
id:actor,
codechecker_handle:this.model.get("codechecker_handle")
}), this.game_collection.add(game));
}, this), _.each(this.model.get("games"), function(_game) {
var game;
return game = this.game_collection.get(_game.id), game.set(_game);
}, this), this;
}, GameCompileTestView;
}(window.HR.GenericView), HR = window.HR || {}, HR.GameCompileTestView = GameCompileTestView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, LeaderboardView, _ref;
return LeaderboardView = function(_super) {
function LeaderboardView() {
return LeaderboardView.__super__.constructor.apply(this, arguments);
}
return __extends(LeaderboardView, _super), LeaderboardView.prototype.template = "leaderboard", 
LeaderboardView.prototype.className = "leaderboard-view container", LeaderboardView.prototype.events = {
"focus .filter-input":"filterInputFocus",
"click .close":"removeFilter"
}, LeaderboardView.prototype.initialize = function(options) {
return null == options && (options = {}), this.profile = options.profile, this.contest = options.contest, 
this.listenToOnce(this.profile, "reset", this.render), this.listenToOnce(this.contest, "reset", this.render), 
this.listenTo(this.collection, "reset", this.render), this.challenge = options.challenge, 
this.archived = options.archived, this.subViews || (this.subViews = []), this.filters = [], 
this.filterKinds = [ "school", "company", "country" ], this.challenge ? this.filterKinds.push("language") :void 0;
}, LeaderboardView.prototype.languageTooltip = function(leader) {
var languages;
return languages = _.compact(_.map(leader.languages, function(lang) {
return lang_display_mapping[lang];
})), _.isEmpty(languages) ? "" :void 0;
}, LeaderboardView.prototype.processBlank = function() {
var blankDiv;
return blankDiv = this.$(".blank-reason"), this.collection.length > 0 ? (blankDiv.parent().hide(), 
!1) :(_.isBoolean(this.collection.sync_status) ? this.collection.available ? blankDiv.html("Sorry, we require a few more submissions before we generate the leaderboard.") :blankDiv.html("We are currently generating the leaderboard, please bear with us.") :blankDiv.html(HR.appController.viewLoader(64)), 
this.$("#blank-reason-container").show(), this.$("#leaders").hide(), !0);
}, LeaderboardView.prototype.show_code = function() {
var current_hacker;
return this.challenge ? this.challenge.get("public_solutions") ? 1 !== this.contest.get("id") ? this.contest.get("ended") ? !0 :!1 :(current_hacker = this.collection.current_hacker, 
current_hacker && current_hacker.score === this.challenge.get("max_score") && this.challenge.get("can_solve") ? !0 :!1) :!1 :!1;
}, LeaderboardView.prototype.removeFilter = function() {
return this.collection.removeFilters(), this.$(".filters").show(), this.$(".tag-group").hide(), 
this.$(".filter-input").val("");
}, LeaderboardView.prototype.addFilter = function(filter, value) {
var element;
return this.collection.filters = {}, this.collection.addFilter(filter, value), element = this.$(".tag"), 
element.attr("data-filter", filter, value);
}, LeaderboardView.prototype.filterInputFocus = function(e) {
var that;
return that = this, $(e.currentTarget).live("keyup", function(e) {
return that.filterInputKeyup(e);
});
}, LeaderboardView.prototype.filterInputKeyup = function(e) {
var filter, input, value;
return input = $(e.currentTarget), 13 === e.keyCode ? (filter = input.attr("data-filter"), 
value = input.val().replace(/</g, "").replace(/>/g, ""), value.length > 0 && this.addFilter(filter, value), 
input.val("")) :void 0;
}, LeaderboardView.prototype.renderFilters = function() {
var activeFilter, data, filter, index, that, value, _i, _j, _len, _len1, _ref, _ref1, _results, _typeaheadOnselect;
for (that = this, data = [], index = 0, _ref = this.filterKinds, _i = 0, _len = _ref.length; _len > _i; _i++) filter = _ref[_i], 
data.push({
id:index,
text:filter
}), index += 1;
for (this.$("#filter-kind").select2({
data:data,
minimumInputLength:0,
width:150,
placeholder:"Select filter"
}), this.$("#filter-kind").on("change", function(e) {
return filter = e.added.text, that.$(".filter-input").hide(), that.$("#filter-input-" + filter).show();
}), _typeaheadOnselect = function() {
return that.filterInputKeyup({
currentTarget:this.$element,
keyCode:13
});
}, this.$("#filter-input-school").completer("school", {
onselect:_typeaheadOnselect
}), this.$("#filter-input-company").completer("company", {
onselect:_typeaheadOnselect
}), this.$("#filter-input-country").completer("country", {
onselect:_typeaheadOnselect
}), this.$("#filter-input-language").typeahead({
source:_.keys(lang_display_mapping),
onselect:_typeaheadOnselect
}), activeFilter = this.collection.filters, _ref1 = this.filterKinds, _results = [], 
_j = 0, _len1 = _ref1.length; _len1 > _j; _j++) filter = _ref1[_j], activeFilter[filter] ? (value = activeFilter[filter][0], 
this.$("#filter-input-" + filter).show(), this.$("#filter-input-" + filter).val(value), 
_results.push(this.$("#filter-kind").select2("data", {
text:filter
}))) :_results.push(void 0);
return _results;
}, LeaderboardView.prototype.getValue = function(filter) {
return null == filter && (filter = {}), filter.kind && filter.value && filter.value.length > 0 ? "" + filter.kind + " = " + filter.value :"";
}, LeaderboardView.prototype.render = function() {
var activeFilter, bread_crumbs_view, current_username, div, filter, freeze_time_minutes, has_current_leader, leadersContainer, that, _i, _len, _ref, _view;
for (freeze_time_minutes = 0, this.contest.get("leaderboard_freeze_time") && (freeze_time_minutes = (new Date(this.contest.get("endtime")) - new Date(this.contest.get("leaderboard_freeze_time"))) / 6e4), 
activeFilter = {}, _ref = this.filterKinds, _i = 0, _len = _ref.length; _len > _i; _i++) filter = _ref[_i], 
this.collection.filters[filter] && (activeFilter.kind = filter, activeFilter.value = this.collection.filters[filter][0]);
return $(this.el).html(HR.appController.template(this.template, this)({
contest:this.contest.toJSON(),
archived:this.archived,
challenge:this.challenge ? this.challenge.toJSON() :null,
collection:this.collection,
activeFilter:activeFilter,
value:this.getValue(activeFilter),
filters:this.filterKinds,
showPractice:this.collection.includePractice,
challengePageURL:HR.appController.get_challenge_pageURL(this.contest.get("slug"), this.collection.challenge_slug),
show_code:this.show_code(),
freeze_time_minutes:freeze_time_minutes,
that:this
})), this.getValue(activeFilter).length > 0 && (this.$(".filters").hide(), this.$(".tag-group").show()), 
bread_crumbs_view = HR.util.renderBreadCrumbs(this.$("div.breadcrumbs"), this.collection.breadCrumbs()), 
this.add_subview(bread_crumbs_view), this.renderFilters(), this.processBlank() ? this :(this.$("#blank-reason-container").hide(), 
this.$("#leaders").show(), that = this, this.collection.sync_status && (has_current_leader = !1, 
current_username = this.profile.get("username"), leadersContainer = $(), _.each(this.collection.models, function(model, index) {
var _view;
return model.is_current = model.get("hacker") === current_username, model.is_current && (has_current_leader = !0), 
_view = new HR.LeaderboardListView({
show_code:this.show_code(),
contest:this.contest.toJSON(),
archived:that.archived,
index:index,
leader:model.toJSON(),
challenge:this.collection.challenge_slug,
is_current_hacker:model.is_current,
that:this
}), this.subViews.push(_view), leadersContainer.push(_view.render().el), this.add_subview(_view);
}, this), $(this.el).find("div#leaders").append(leadersContainer), current_username && this.collection.current_hacker && this.collection.current_hacker.rank && !has_current_leader && (_view = new HR.LeaderboardListView({
show_code:this.show_code(),
contest:this.contest.toJSON(),
archived:that.archived,
index:0,
leader:this.collection.current_hacker,
challenge:this.collection.challenge_slug,
is_current_hacker:!0,
that:this
}), this.subViews.push(_view), div = $(this.el).find("div#leader-self"), div.append(_view.render().el), 
this.add_subview(_view), div.show()), "acm" === this.contest.get("kind") || "ieee" === this.contest.get("kind") ? HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), "" + this.collection.pageURL() + "/", this.collection.getCurrentPage(), this.collection, this.collection.limit, 10, "backbone", !1) :HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), "" + this.collection.pageURL() + "/", this.collection.getCurrentPage(), this.collection, this.collection.limit)), 
this);
}, LeaderboardView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.LeaderboardView = LeaderboardView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, LeaderboardListView, _ref;
return LeaderboardListView = function(_super) {
function LeaderboardListView() {
return LeaderboardListView.__super__.constructor.apply(this, arguments);
}
return __extends(LeaderboardListView, _super), LeaderboardListView.prototype.initialize = function(options) {
var _base;
return this.options = options, this.contest = options.contest, this.leader = options.leader, 
(_base = this.leader).download_link || (_base.download_link = "/rest/contests/" + this.contest.slug + "/challenges/" + this.options.challenge + "/hackers/" + this.leader.hacker + "/download_solution");
}, LeaderboardListView.prototype.template = "leaderboard-list", LeaderboardListView.prototype.className = "leaderboard-list-view", 
LeaderboardListView.prototype.languageLink = function(language) {
return "" + HR.appController.get_current_contest_namespace() + "/challenges/" + this.collection.challenge_slug + "/language/" + language + "/leaderboard";
}, LeaderboardListView.prototype.languages = function() {
var languages;
return languages = _.compact(_.map(this.leader.languages, function(lang) {
return lang_display_mapping[lang];
}));
}, LeaderboardListView.prototype.challenges = function() {
return _.map(this.leader.challenges, function(challenge) {
return challenge.name;
});
}, LeaderboardListView.prototype.timeTooltip = function() {
var tooltip, username;
return this.leader.submitted_at ? (username = this.options.is_current_hacker ? "You" :this.leader.hacker || "N/A", 
tooltip = "" + _.escape(username) + " last submitted " + this.leader.submitted_at + " ago", 
this.leader.penalty > 0 && (tooltip += " and penalized by " + this.leader.penalty_display), 
tooltip) :null;
}, LeaderboardListView.prototype.scoreTooltip = function() {
var challenges, count, sliceLimit, tooltip;
return challenges = this.challenges(), sliceLimit = 3, tooltip = "", count = challenges.length, 
challenges = challenges.slice(0, sliceLimit), count > 1 ? (tooltip += "Scored by summing up individual scores for " + challenges.join(", "), 
count > challenges.length && (tooltip += " and " + (count - challenges.length) + " more")) :tooltip += "Scored based on the score for " + challenges.join(", "), 
tooltip;
}, LeaderboardListView.prototype.formatTime = function(seconds) {
return seconds = parseInt(Math.ceil(seconds)), "" + parseInt(seconds / 60) + ":" + parseInt(seconds % 60 / 10) + seconds % 60 % 10;
}, LeaderboardListView.prototype.format = function() {
var challenge, _i, _len, _ref, _results;
if (this.leader.challenges) {
for (_ref = this.leader.challenges, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) challenge = _ref[_i], 
challenge.time_taken_formatted = this.formatTime(challenge.time_taken), _results.push(challenge.tooltip = "" + challenge.submissions + " - attempts<br/>Solved at - " + challenge.time_taken_formatted + "<br/>Penalty time - " + Math.ceil(challenge.penalty / 60));
return _results;
}
}, LeaderboardListView.prototype.scoreDetail = function() {
var challenge, index, text, _i, _len, _ref;
if (this.leader.challenges) {
for (text = "", _ref = this.leader.challenges, index = _i = 0, _len = _ref.length; _len > _i; index = ++_i) challenge = _ref[index], 
text += "" + String.fromCharCode(65 + index) + ": " + challenge.time_taken_formatted + " + " + challenge.penalty / 60, 
text += "<br/>";
return text;
}
}, LeaderboardListView.prototype.isPublishedChallenge = function() {
return null === this.leader.submission_id ? !1 :!0;
}, LeaderboardListView.prototype.render = function() {
var context;
return "acm" === this.contest.leaderboard_format && this.format(), context = _.extend(this.options, {
timeTooltip:this.timeTooltip(),
scoreTooltip:this.scoreTooltip(),
isPublishedChallenge:this.isPublishedChallenge()
}), "acm" === this.contest.leaderboard_format && (context = _.extend(context, {
score_detail:this.scoreDetail()
})), $(this.el).html(HR.appController.template(this.template, this)(context)), this.delegateEvents(), 
this;
}, LeaderboardListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.LeaderboardListView = LeaderboardListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ModalView, _ref;
return ModalView = function(_super) {
function ModalView() {
return ModalView.__super__.constructor.apply(this, arguments);
}
return __extends(ModalView, _super), ModalView.prototype.template = "modal", ModalView.prototype.className = "modal-view", 
ModalView.prototype.initialize = function(options) {
return null == options && (options = {}), this.id = Math.round(1e14 * Math.random()), 
options.parent ? this.parent = options.parent :void 0;
}, ModalView.prototype.getEl = function() {
return this.el;
}, ModalView.prototype.getThis = function() {
return this;
}, ModalView.prototype.render = function() {
var that, _data;
return 0 === $("body").find("#modal-wrap").length && $("body").append('<div id="modal-wrap"></div>'), 
0 === $("#modal-wrap").find("#modal-" + this.id).length && $("#modal-wrap").append("<div id='modal-" + this.id + "'></div>"), 
this.el = $("body #modal-wrap #modal-" + this.id), $(this.el).html(HR.appController.template(this.template, this)), 
this.data && (_data = _.isFunction(this.data) ? this.data() :this.data, _data.className && $(this.el).find(".modal").addClass(_data.className), 
_data.header && ("text" === _data.header.type ? $(this.el).find(".header-msg").html(_data.header.value) :"template" === _data.header.type && $(this.el).find(".header-msg").html(HR.appController.template(_data.header.value, this)({
data:_.isFunction(_data.header.data) ? _data.header.data.call(this) :_data.header.data
}))), _data.body && ("text" === _data.body.type ? $(this.el).find(".modal-body").html(_data.body.value) :"template" === _data.body.type && $(this.el).find(".modal-body").html(HR.appController.template(_data.body.value, this)({
data:_.isFunction(_data.body.data) ? _data.body.data.call(this) :_data.body.data
}))), _data.footer ? "text" === _data.footer.type ? $(this.el).find(".modal-footer").html(_data.footer.value) :"template" === _data.footer.type && $(this.el).find(".modal-footer").html(HR.appController.template(_data.footer.value, this)({
data:_.isFunction(data.footer.data) ? data.footer.data.call(this) :data.footer.data
})) :$(this.el).find(".modal-footer").remove()), this.liveEvents && (that = this, 
_.each(this.liveEvents, function(callback, index) {
var ev, eventConfig, sl, sp;
return sp = index.indexOf(" "), ev = index.substr(0, sp), sl = index.substr(sp + 1), 
eventConfig = {
that:that
}, $(sl).die(ev).unbind(ev).live(ev, eventConfig, that[callback]);
})), that = this, setTimeout(function() {
return $(that.el).find(".modal").length > 0 && 0 === $(that.el).find(".modal").find(".gray").length && "none" === $(that.el).find(".modal").css("display") ? $(that.el).find(".modal").modal("show") :void 0;
}), this.delegateEvents(), this;
}, ModalView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ModalView = ModalView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SocialShareView, _ref;
return SocialShareView = function(_super) {
function SocialShareView() {
return SocialShareView.__super__.constructor.apply(this, arguments);
}
return __extends(SocialShareView, _super), SocialShareView.prototype.template = "social-share", 
SocialShareView.prototype.className = "social-share-view", SocialShareView.prototype.initialize = function(options) {
return this.title = options.title, this.message = options.message, this.tweet = options.tweet, 
this.url = options.url, this.type = options.type;
}, SocialShareView.prototype.render = function() {
var dialog_options, url, url_prefix, url_suffix;
return url_prefix = document.location.protocol + "//" + document.location.host, 
url_suffix = "" + HR.appController.get_current_contest_slug_url(), url = url_prefix + url_suffix, 
dialog_options = {
title:this.title,
body:"<center><p> " + this.message + " </p> <p> Share your success with your friends</p> <p class='block-center'><a class='fb-share' style='cursor:pointer;'><img src='/assets/fb-share.png'></a>&nbsp;&nbsp;&nbsp;<a class='tweet' style='cursor:pointer;'><img src='/assets/tweet-filler.png'></a> </p> <p><small><a class='js-disable-notifications'> Don't show these notifications anymore </a></small></p></center>",
events:{
"click a.fb-share":function(_this) {
return function(e) {
return e.preventDefault(), HR.appController.facebook_share(_this.url, _this.tweet);
};
}(this),
"click a.tweet":function(_this) {
return function(e) {
return e.preventDefault(), HR.appController.twitter_share(_this.tweet);
};
}(this),
"click a.js-disable-notifications":function(_this) {
return function() {
return $.cookie("socialshare-" + _this.type, "disabled"), _this.dialog.destroy();
};
}(this)
}
}, "disabled" !== $.cookie("socialshare-" + this.type) ? (this.dialog = new HR.util.ShowDialog(dialog_options), 
this.dialog.render()) :void 0;
}, SocialShareView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SocialShareView = SocialShareView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var E404View, HR, _ref;
return E404View = function(_super) {
function E404View() {
return E404View.__super__.constructor.apply(this, arguments);
}
return __extends(E404View, _super), E404View.prototype.template = "dashboard/e404", 
E404View.prototype.className = "e404-view", E404View.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)()), this;
}, E404View;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.E404View = E404View;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ELoginView, HR, _ref;
return ELoginView = function(_super) {
function ELoginView() {
return ELoginView.__super__.constructor.apply(this, arguments);
}
return __extends(ELoginView, _super), ELoginView.prototype.render = function() {
return this.dialog || (this.dialog = new HR.util.ShowLoginDialog({
show_sign_up_link:!0,
error_message:"Please sign up or log in to view this page",
success_callback:function() {
return $("body").html("Loggin you in...").addClass("m").css("margin-top", "10%"), 
window.location.reload();
}
})), this.dialog.render(), this;
}, ELoginView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ELoginView = ELoginView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ABTestingView, HR, _ref;
return ABTestingView = function(_super) {
function ABTestingView() {
return ABTestingView.__super__.constructor.apply(this, arguments);
}
return __extends(ABTestingView, _super), ABTestingView.prototype.events = {
"click a[data-ab-testing-status]":"updateStatus"
}, ABTestingView.prototype.initialize = function(options) {
return null == options && (options = {}), ABTestingView.__super__.initialize.apply(this, arguments), 
this.model || (this.model = new HR.ABTest(), options.test && (this.model.test = options.test)), 
options.variants && (this.variants = options.variants), this;
}, ABTestingView.prototype.updateStatus = function(e) {
return this.model.updateStatus($(e.currentTarget).attr("data-ab-testing-status")), 
this;
}, ABTestingView.prototype.render = function() {
return this._has_rendered ? (this.el && (this.variant.el = this.el), this.variant.render(), 
this.el && (this.$el = $(this.el)), this.delegateEvents()) :this.model.fetch({
success:function(_this) {
return function() {
return _this.variant = _.result(_this.variants, _this.model.get("variant")), _this.variant ? (_.isFunction(_this.variant) && (_this.variant = new _this.variant()), 
_this.el && (_this.variant.el = _this.el), _this.variant.render(), _this.el && (_this.$el = $(_this.el)), 
_this.delegateEvents(), _this._has_rendered = !0) :void 0;
};
}(this)
}), this;
}, ABTestingView;
}(Backbone.View), HR = null != (_ref = window.HR) ? _ref :{}, HR.ABTestingView = ABTestingView;
});
}.call(this), $(".dropdown-toggle").dropdown(), $(".level-nav-wrap ul li a").click(function(e) {
e.preventDefault(), $(".level-nav-wrap ul li a").addClass("selected").not(this).removeClass("selected");
}), $(".level-nav-wrap ul li").mouseenter(function() {
$(this).children(".level-dropdown").show().removeClass("hide").find(".slide").slideDown(200).removeClass("hide");
}), $(".level-nav-wrap ul li").mouseleave(function() {
$(this).children(".level-dropdown").find(".slide").slideUp(200).addClass("hide"), 
$(this).children(".level-dropdown").delay(100).slideUp(100);
}), $("[rel=tooltip]").live("mouseenter", function() {
$(this).tooltip("show");
}), $("[rel=tooltip]").live("mouseleave", function() {
$(".tooltip").fadeOut();
}), $("[rel=tooltip]").live("click", function() {
$(".tooltip").hide();
}), $(".collapse").collapse({
toggle:!0
}), $(".toggle-plus").click(function() {
$(this).toggleClass("active");
}), $(".expand .expand-init").click(function(e) {
e.preventDefault(), $(this).parent(".expand").find(".expand-wrap").slideDown(200).addClass("block").css("height: auto");
}), $(function() {
$("#selected-language").live("click", function(e) {
e.preventDefault();
});
}), $(function() {
setWrapperHeight = function() {
$("#wrapper").css("min-height", $("body").height() - $("footer").height() - 64);
}, setWrapperHeight(), $(window).resize(setWrapperHeight);
}), $("a").live("click", function(e) {
source = $(e.srcElement), source.is("a") && e.srcElement.hostname && e.srcElement.hostname != window.location.hostname && source.attr("target", "_blank");
}), $(function() {
$("body").on("click.popover.data-api", '[data-toggle="popover"]', function(e) {
e.preventDefault(), $(this).popover({
trigger:"hover"
}).popover("toggle");
});
});