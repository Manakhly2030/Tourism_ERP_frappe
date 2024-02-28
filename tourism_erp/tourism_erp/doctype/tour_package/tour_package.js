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
});
