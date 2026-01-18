document.addEventListener("DOMContentLoaded", function () {
var navItems = document.querySelectorAll(".nav-item");
var sections = document.querySelectorAll(".section");
navItems.forEach(function (btn) {
btn.addEventListener("click", function () {
var targetId = btn.getAttribute("data-target");
navItems.forEach(function (b) {
b.classList.remove("active");
});
sections.forEach(function (sec) {
sec.classList.remove("active");
});
btn.classList.add("active");
var targetSection = document.getElementById(targetId);
if (targetSection) {
targetSection.classList.add("active");
}
});
});
initCalendar();
initLostAndFound();
initClassroom();
initStudyHelper();
});
function getWeekdayLabel(dateStr) {
var date = new Date(dateStr);
if (Number.isNaN(date.getTime())) {
return "";
}
var weekday = date.getDay();
var map = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
return map[weekday] || "";
}
function formatDateDisplay(dateStr) {
if (!dateStr) {
return "";
}
var parts = dateStr.split("-");
if (parts.length !== 3) {
return dateStr;
}
return parts[1] + "月" + parts[2] + "日";
}
function getTodayISO() {
var d = new Date();
var y = d.getFullYear();
var m = String(d.getMonth() + 1).padStart(2, "0");
var day = String(d.getDate()).padStart(2, "0");
return y + "-" + m + "-" + day;
}
function initCalendar() {
var data = [
{ date: "2026-02-20", title: "春季学期注册报到与选课确认", category: "教学" },
{ date: "2026-02-24", title: "春季学期开学上课", category: "教学" },
{ date: "2026-04-05", title: "清明节放假一天", category: "假期" },
{ date: "2026-05-01", title: "劳动节放假三天", category: "假期" },
{ date: "2026-05-20", title: "本科生课程退改选截止", category: "教学" },
{ date: "2026-06-10", title: "期末考试周开始", category: "考试" },
{ date: "2026-06-24", title: "本学期正式结课", category: "教学" },
{ date: "2026-06-30", title: "毕业典礼暨学位授予仪式", category: "活动" },
{ date: "2026-07-01", title: "暑假开始", category: "假期" },
{ date: "2026-09-01", title: "秋季学期新生报到", category: "活动" }
];
var listEl = document.getElementById("calendarList");
var monthInput = document.getElementById("calendarMonth");
var categorySelect = document.getElementById("calendarCategory");
var resetBtn = document.getElementById("calendarReset");
function render() {
if (!listEl) {
return;
}
var monthValue = monthInput && monthInput.value ? monthInput.value : "";
var categoryValue = categorySelect ? categorySelect.value : "all";
var filtered = data.slice();
if (monthValue) {
filtered = filtered.filter(function (item) {
return item.date.slice(0, 7) === monthValue;
});
}
if (categoryValue && categoryValue !== "all") {
filtered = filtered.filter(function (item) {
return item.category === categoryValue;
});
}
listEl.innerHTML = "";
if (!filtered.length) {
var empty = document.createElement("div");
empty.className = "empty-hint";
empty.textContent = "暂无符合条件的校历事件，可以尝试更换筛选条件。";
listEl.appendChild(empty);
return;
}
filtered.sort(function (a, b) {
if (a.date < b.date) {
return -1;
}
if (a.date > b.date) {
return 1;
}
return 0;
});
filtered.forEach(function (item) {
var card = document.createElement("div");
card.className = "calendar-item";
var header = document.createElement("div");
header.className = "calendar-item-header";
var dateEl = document.createElement("div");
dateEl.className = "calendar-date";
dateEl.textContent = formatDateDisplay(item.date);
var weekEl = document.createElement("div");
weekEl.className = "calendar-week";
weekEl.textContent = getWeekdayLabel(item.date);
header.appendChild(dateEl);
header.appendChild(weekEl);
var titleEl = document.createElement("div");
titleEl.className = "calendar-title";
titleEl.textContent = item.title;
var metaEl = document.createElement("div");
metaEl.className = "calendar-meta";
metaEl.textContent = "类型：" + item.category + " ｜ 日期：" + item.date;
card.appendChild(header);
card.appendChild(titleEl);
card.appendChild(metaEl);
listEl.appendChild(card);
});
}
if (monthInput) {
monthInput.addEventListener("change", render);
}
if (categorySelect) {
categorySelect.addEventListener("change", render);
}
if (resetBtn) {
resetBtn.addEventListener("click", function () {
if (monthInput) {
monthInput.value = "";
}
if (categorySelect) {
categorySelect.value = "all";
}
render();
});
}
render();
}
function initLostAndFound() {
var records = [
{
name: "校园卡",
place: "图书馆三层自习区",
desc: "蓝色卡套，内有校园卡与一张公交卡",
date: getTodayISO(),
contact: "图书馆总服务台"
},
{
name: "银色保温杯",
place: "一教 302 教室",
desc: "银色杯身，贴有一只小熊贴纸",
date: getTodayISO(),
contact: "微信：cup_finder"
},
{
name: "黑色雨伞",
place: "二教东侧走廊",
desc: "黑色折叠伞，伞柄有磨损痕迹",
date: getTodayISO(),
contact: "电话：188-0000-0000"
}
];
var listEl = document.getElementById("lostList");
var form = document.getElementById("lostForm");
var nameInput = document.getElementById("lostName");
var placeInput = document.getElementById("lostPlace");
var descInput = document.getElementById("lostDesc");
var dateInput = document.getElementById("lostDate");
var contactInput = document.getElementById("lostContact");
var hintEl = document.getElementById("lostHint");
function renderList() {
if (!listEl) {
return;
}
listEl.innerHTML = "";
if (!records.length) {
var empty = document.createElement("div");
empty.className = "empty-hint";
empty.textContent = "暂无失物招领信息。可以使用右侧表单发布一条新的记录。";
listEl.appendChild(empty);
return;
}
records.forEach(function (item) {
var card = document.createElement("div");
card.className = "lost-card";
var titleEl = document.createElement("div");
titleEl.className = "lost-title";
titleEl.textContent = item.name;
var metaEl = document.createElement("div");
metaEl.className = "lost-meta";
var placeSpan = document.createElement("span");
placeSpan.innerHTML = "<strong>地点</strong>" + " " + item.place;
var dateSpan = document.createElement("span");
dateSpan.innerHTML = "<strong>时间</strong>" + " " + (item.date || "");
var contactSpan = document.createElement("span");
contactSpan.innerHTML = "<strong>联系方式</strong>" + " " + (item.contact || "");
metaEl.appendChild(placeSpan);
metaEl.appendChild(dateSpan);
metaEl.appendChild(contactSpan);
var descEl = document.createElement("div");
descEl.className = "lost-desc";
descEl.textContent = item.desc || "";
card.appendChild(titleEl);
card.appendChild(metaEl);
card.appendChild(descEl);
listEl.appendChild(card);
});
}
function setHint(message, isError) {
if (!hintEl) {
return;
}
hintEl.textContent = message;
if (!message) {
hintEl.style.color = "";
return;
}
hintEl.style.color = isError ? "#dc2626" : "#059669";
}
if (form) {
form.addEventListener("submit", function (e) {
e.preventDefault();
var name = nameInput ? nameInput.value.trim() : "";
var place = placeInput ? placeInput.value.trim() : "";
var desc = descInput ? descInput.value.trim() : "";
var dateValue = dateInput ? dateInput.value : "";
var contact = contactInput ? contactInput.value.trim() : "";
if (!name || !place || !contact) {
setHint("请至少填写物品名称、地点和联系方式。", true);
return;
}
var record = {
name: name,
place: place,
desc: desc,
date: dateValue || getTodayISO(),
contact: contact
};
records.unshift(record);
renderList();
if (nameInput) {
nameInput.value = "";
}
if (placeInput) {
placeInput.value = "";
}
if (descInput) {
descInput.value = "";
}
if (dateInput) {
dateInput.value = "";
}
if (contactInput) {
contactInput.value = "";
}
setHint("发布成功，信息仅保存在本页面浏览器中。", false);
});
}
renderList();
}
function getCurrentTimeSlot() {
var now = new Date();
var hour = now.getHours();
if (hour < 12) {
return "上午";
}
if (hour < 18) {
return "下午";
}
return "晚上";
}
function getTodayLabel() {
var now = new Date();
var weekday = now.getDay();
var labels = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
return labels[weekday] || "周一";
}
function initClassroom() {
var data = [
{ building: "一教", room: "101", day: "周一", time: "上午", capacity: 80, type: "多媒体教室", usage: "有课" },
{ building: "一教", room: "101", day: "周一", time: "下午", capacity: 80, type: "多媒体教室", usage: "空闲" },
{ building: "一教", room: "203", day: "周二", time: "上午", capacity: 60, type: "普通教室", usage: "空闲" },
{ building: "一教", room: "305", day: "周三", time: "晚上", capacity: 40, type: "讨论教室", usage: "空闲" },
{ building: "二教", room: "201", day: "周一", time: "上午", capacity: 120, type: "阶梯教室", usage: "有课" },
{ building: "二教", room: "204", day: "周一", time: "下午", capacity: 120, type: "阶梯教室", usage: "空闲" },
{ building: "二教", room: "402", day: "周二", time: "下午", capacity: 90, type: "多媒体教室", usage: "空闲" },
{ building: "三教", room: "105", day: "周三", time: "上午", capacity: 60, type: "普通教室", usage: "空闲" },
{ building: "三教", room: "210", day: "周四", time: "下午", capacity: 60, type: "普通教室", usage: "有课" },
{ building: "三教", room: "310", day: "周五", time: "晚上", capacity: 80, type: "多媒体教室", usage: "空闲" },
{ building: "图书馆", room: "自习 A 区", day: "周一", time: "晚上", capacity: 150, type: "自习区", usage: "空闲" },
{ building: "图书馆", room: "自习 B 区", day: "周二", time: "晚上", capacity: 120, type: "自习区", usage: "空闲" }
];
var buildingSelect = document.getElementById("classroomBuilding");
var daySelect = document.getElementById("classroomDay");
var timeSelect = document.getElementById("classroomTime");
var searchBtn = document.getElementById("classroomSearch");
var resultEl = document.getElementById("classroomResult");
function search() {
if (!resultEl) {
return;
}
var buildingValue = buildingSelect ? buildingSelect.value : "all";
var dayValue = daySelect ? daySelect.value : "今天";
var timeValue = timeSelect ? timeSelect.value : "当前";
var dayLabel = dayValue === "今天" ? getTodayLabel() : dayValue;
var timeLabel = timeValue === "当前" ? getCurrentTimeSlot() : timeValue;
var filtered = data.filter(function (item) {
var buildingMatch = buildingValue === "all" || item.building === buildingValue;
var dayMatch = item.day === dayLabel;
var timeMatch = item.time === timeLabel;
return buildingMatch && dayMatch && timeMatch && item.usage === "空闲";
});
resultEl.innerHTML = "";
if (!filtered.length) {
var empty = document.createElement("div");
empty.className = "empty-hint";
empty.textContent = "当前条件下暂无空闲教室，可以尝试更换教学楼或时间段。";
resultEl.appendChild(empty);
return;
}
filtered.sort(function (a, b) {
if (a.building === b.building) {
return a.room.localeCompare(b.room, "zh-CN");
}
return a.building.localeCompare(b.building, "zh-CN");
});
filtered.forEach(function (item, index) {
var card = document.createElement("div");
card.className = "classroom-card";
var titleEl = document.createElement("div");
titleEl.className = "classroom-title";
titleEl.textContent = item.building + " " + item.room;
var metaEl = document.createElement("div");
metaEl.className = "classroom-meta";
var capacitySpan = document.createElement("span");
capacitySpan.textContent = "容量约 " + item.capacity + " 人";
var typeSpan = document.createElement("span");
typeSpan.textContent = item.type;
metaEl.appendChild(capacitySpan);
metaEl.appendChild(typeSpan);
var badge = document.createElement("span");
var isQuiet = item.building === "图书馆" || item.type === "自习区";
var isHot = index < 2 && !isQuiet;
if (isQuiet) {
badge.className = "badge badge-quiet";
badge.textContent = "安静推荐";
} else if (isHot) {
badge.className = "badge badge-hot";
badge.textContent = "热门空教室";
} else {
badge.className = "badge";
badge.textContent = "适合自习";
}
card.appendChild(titleEl);
card.appendChild(metaEl);
card.appendChild(badge);
resultEl.appendChild(card);
});
}
if (searchBtn) {
searchBtn.addEventListener("click", search);
}
if (buildingSelect) {
buildingSelect.addEventListener("change", search);
}
if (daySelect) {
daySelect.addEventListener("change", search);
}
if (timeSelect) {
timeSelect.addEventListener("change", search);
}
search();
}
function initStudyHelper() {
var targetInput = document.getElementById("studyTarget");
var doneInput = document.getElementById("studyDone");
var updateBtn = document.getElementById("studyUpdate");
var progressInner = document.getElementById("studyProgressInner");
var progressText = document.getElementById("studyProgressText");
var suggestionEl = document.getElementById("studySuggestion");
function updateProgress() {
if (!targetInput || !doneInput || !progressInner || !progressText || !suggestionEl) {
return;
}
var target = parseFloat(targetInput.value);
var done = parseFloat(doneInput.value);
if (!target || target <= 0) {
progressInner.style.width = "0%";
progressText.textContent = "进度 0%";
suggestionEl.textContent = "先为今天设定一个合适的学习目标，从一小步开始。";
return;
}
if (!done || done < 0) {
done = 0;
}
var ratio = done / target;
if (ratio < 0) {
ratio = 0;
}
var percent = Math.round(Math.min(ratio, 1.5) * 100);
var widthPercent = Math.max(0, Math.min(ratio, 1)) * 100;
progressInner.style.width = widthPercent + "%";
progressText.textContent = "进度 " + percent + "%";
if (ratio < 0.3) {
suggestionEl.textContent = "刚刚起步，可以先完成一小节网课或一份作业。";
} else if (ratio < 0.7) {
suggestionEl.textContent = "进度不错，适当休息一下再继续保持专注。";
} else if (ratio < 1) {
suggestionEl.textContent = "已经接近今日目标，可以冲刺一波把任务收尾。";
} else {
suggestionEl.textContent = "已完成或超额完成今日学习目标，可以奖励自己一会儿放松。";
}
}
if (updateBtn) {
updateBtn.addEventListener("click", updateProgress);
}
}
