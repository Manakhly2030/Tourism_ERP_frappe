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
        if (frm.doc.price_per_person < 0) {
            frappe.msgprint("Price per person cannot be Negative");
            frappe.validated = false;
            return;
        }

        Description
        if (frm.doc.description && frm.doc.description.length > 1000){
            frappe.msgprint("Description is too long. Maximum 1000 characters allowed.");
            frappe.validated = false;
            return;
        }

    //     //Opening/Closing Time
    
     var openingTime = frm.doc.opening_time;
        var closingTime = frm.doc.closing_time;

        // Extract hour parts from opening and closing times
        var openingHour = parseInt(openingTime.split(':')[0], 10);
        var closingHour = parseInt(closingTime.split(':')[0], 10);

        // Check if opening hour is strictly equal to closing hour
        if (openingHour === closingHour) {
            frappe.msgprint("Opening and closing times cannot have the same hour");
            frappe.validated = false;
            return;
        }
        if (openingTime >= closingTime) {
            frappe.msgprint("Closing time must be after Opening time");
            frappe.validated = false;
            return;
        }
    
        // if (frm.doc.opening_time === frm.doc.closing_time) {
        //     frappe.msgprint("Opening and closing times cannot be the same");
        //     frappe.validated = false;
        //     return;
        // }
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
