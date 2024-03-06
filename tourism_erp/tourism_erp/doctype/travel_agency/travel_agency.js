// Copyright (c) 2024, Technovate and contributors
// For license information, please see license.txt

frappe.ui.form.on("Travel Agency", {
	refresh(frm) {

	},


    validate: function(frm){

        if (!frm.doc.address) {
            frappe.msgprint("Please enter address.");
            frappe.validated = false;
            return;
        }

        if (!frm.doc.license_number) {
            frappe.msgprint("Please enter license number.");
            frappe.validated = false;
            return;
        }
        
        
        var licenseNumberPattern = /^[A-Z0-9]+$/;
        if (!licenseNumberPattern.test(frm.doc.license_number)) {
            frappe.msgprint("Please enter a valid license number.");
            frappe.validated = false;
            return;
        }

        if(!frm.doc.agency_website){
            frappe.msgprint("Please enter Agency Website")
            frappe.validated = false;
            return;
        } 
        if (!frm.doc.agency_website.match(/^(http|https):\/\/[^ "]+$/)) {
            frappe.msgprint(__("Please enter a valid website URL."));
            frappe.validated = false;
            return;
        }
        //select contact-info before contact no or email
        if (!frm.doc.contact_information) {
            frappe.msgprint(__("Please enter contact information first."));
            frappe.validated = false;
            return;
        }

        
        if (!frm.doc.contact_no) {
            frappe.msgprint(__("Please enter contact number."));
            frappe.validated = false;
            return;
        }

        
        if (!frm.doc.email) {
            frappe.msgprint(__("Please enter email."));
            frappe.validated = false;
            return;
        }

        },

        
        
    
});
