// Copyright (c) 2024, Technovate and contributors
// For license information, please see license.txt

frappe.ui.form.on("Activity", {
	refresh(frm) {
    }, 
       // Duration
        validate: function (frm){
        if (frm.doc.duration <= 0) {
            frappe.msgprint("Duration must be set");
            frappe.validated = false;
            return;
        }

        // Price per person validation
        if (frm.doc.price_per_person <= 0) {
            frappe.msgprint("Price per person cannot be Zero");
            frappe.validated = false;
            return;
        }

        //Description
        if (frm.doc.description && frm.doc.description.length > 1000){
            frappe.msgprint("Description is too long. Maximum 1000 characters allowed.");
            frappe.validated = false;
            return;
        }

        //Opening/Closing Time
        if (frm.doc.opening_time >= frm.doc.closing_time) {
            frappe.msgprint("Closing time must be after opening time");
            frappe.validated = false;
            return;
        }
    },

    before_save: function(frm) {
        // Activity Name validation
        var activityName = frm.doc.activity_name;
        if (!activityName) {
            frappe.msgprint("Activity Name is required");
            frappe.validated = false;
            return false;
        }

        // Check for special characters
        var regex = /^[a-zA-Z0-9\s]+$/;
        if (!regex.test(activityName)) {
            frappe.msgprint("Activity Name should only contain letters, numbers, and spaces");
            frappe.validated = false;
            return false;
        }
},
});
