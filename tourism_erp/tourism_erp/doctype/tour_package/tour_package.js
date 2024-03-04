// Copyright (c) 2024, Technovate and contributors
// For license information, please see license.txt

let filter_activity = function (frm) {
  filters = {};
  if (frm.doc.city) filters.city = frm.doc.city;
  if (frm.doc.state) filters.state = frm.doc.state;
  if (frm.doc.country) filters.country = frm.doc.country;

  frm.set_query("activity", "activities", function () {
    return {
      filters: filters,
    };
  });
};

frappe.ui.form.on("Tour Package", {
  city(frm) {
    filter_activity(frm);
  },
  state(frm) {
    filter_activity(frm);
  },
  country(frm) {
    filter_activity(frm);
  },


  validate: function(frm){
    if (!frm.doc.duration || frm.doc.duration === 0) {
      frappe.msgprint("Duration must be set and cannot be zero");
      frappe.validated = false;
      return;
  }
    //Price
    if (frm.doc.price <= 0 ){
      frappe.msgprint("Price cannot be 0");
      frappe.validated = false
      return;
    }
    // Description
    if (frm.doc.description && frm.doc.description.length > 1000) {
      frappe.msgprint("Description is too long. Maximum 1000 characters allowed.");
      frappe.validated = false;
      return;
  }
    //Activity selected
    var activities = frm.doc.activities;
    if (!activities || activities.length === 0) {
      frappe.msgprint("At least one activity must be selected");
      frappe.validated = false;
      return;
    } else {
        var hasActivitySelected = false;
          for (var i = 0; i < activities.length; i++) {
              if (activities[i].activity) {
                  hasActivitySelected = true;
                  break;
              }
          }
          if (!hasActivitySelected) {
              frappe.msgprint("At least one activity must be selected");
              frappe.validated = false;
              return;
          }
      }
  },
});
