(function() {
$.ajaxSetup({
cache:!1
}), $(document).ready(function() {
var HR, contest, profile, tour, tour1, _makeTopLevel;
return HR = window.HR, HR.appController = new HR.AppController(), HR.master = "master", 
$.timeago.settings.allowFuture = !0, require.config({
waitSeconds:60
}), _makeTopLevel = function(source, attributes) {
return _.each(attributes, function(attribute) {
return HR[attribute] = source[attribute];
});
}, _makeTopLevel(HR.appController, [ "namespace", "requires", "routeNamespace", "restURL", "model", "collection", "profile", "contest" ]), 
_makeTopLevel(HR.appController, [ "logger" ]), HR.PREFETCH_DATA.messages && (HR.cachedMessagesCollection = new HR.collection("message-thread"), 
_.each(HR.PREFETCH_DATA.messages, function(message) {
var model;
return model = new HR.MessageThreadModel(message), HR.cachedMessagesCollection.add(model);
})), profile = new HR.ProfileModel(), contest = new HR.ContestModel(), _.extend(HR.GenericModel.prototype, HR.CacheMixin), 
_.extend(HR.GenericCollection.prototype, HR.CacheMixin), HR.key_prefix = HR.PREFETCH_DATA.profile.key_prefix, 
profile.cacheSet(_.extend(HR.PREFETCH_DATA.profile, {
me:!0
})), contest.cacheSet(HR.PREFETCH_DATA.contest), void 0 === profile.get("id") || profile.get("tour_done") || (tour1 = function() {
var tour;
return tour = new HR.MultiFrameModal({
frames:"onboarding",
data:{
version:1
}
}), tour.on("preFrameChange", function(frame_from, frame_to) {
var fav;
return 0 === frame_from && 1 === frame_to && (fav = $("input:radio[name=favorite]:checked").val(), 
"undefined" != typeof mixpanel && "undefined" != typeof mixpanel.push && mixpanel.push([ "track", "OnboardingSelect", {
category:fav
} ]), fav) ? (profile.set("favorite_category", fav), profile.save()) :void 0;
}), tour.on("postFrameChange", function(frame_from) {
var category_mapping, fav;
return 0 === frame_from ? (fav = profile.get("favorite_category"), category_mapping = {
codegolf:"/categories/miscellaneous/normal-languages",
ml:"/categories/ai/machine-learning",
algorithms:"/categories/algorithms",
fp:"/categories/fp/intro",
games:"/categories/ai/richman-games"
}, HR.router.navigate(category_mapping[fav], !0)) :void 0;
}), profile.set("tour_done", !0), profile.save(), tour;
}, window.tourABTest = new HR.ABTest(), window.tourABTest.set("variant", "onboardingv1"), 
tour = new HR.ABTestingView({
model:window.tourABTest,
variants:{
onboardingv1:tour1
}
}), tour.el = null, tour.render()), HR.router = new HR.DashboardRouter(), Backbone.history.start({
pushState:!0
});
});
}).call(this);