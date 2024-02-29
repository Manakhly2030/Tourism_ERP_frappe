// Copyright (c) 2024, Technovate and contributors
// For license information, please see license.txt

frappe.ui.form.on("Tourism Customer", {
    refresh(frm) {
        // var documents = frm.doc.document;
        // console.log(documents);

    },
    validate: function (frm) {
        //check for duplicate documents
        var documents = frm.doc.document;
        var documentTypes = new Set();

        for (let i = 0; i < documents.length; i++) {
            if (documentTypes.has(documents[i].document_type)) {
                frappe.throw('Duplicate document found: ' + documents[i].document_type);
            }
            documentTypes.add(documents[i].document_type);
        }

        // full name
        frm.set_value('full_name', frm.doc.first_name + ' ' + frm.doc.last_name);
    },
    before_save: function (frm) {
        //check for document number format
        var documents = frm.doc.document;
        let passport_regex = new RegExp(/^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/);
        let aadhar_regex = new RegExp("^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$");
        let license_regex = new RegExp(/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/);

        for (let i = 0; i < documents.length; i++) {
            //Passport A21 90453
            if (documents[i].document_type == 'Passport') {
                if (documents[i].document_number.length == 0) {
                    frappe.throw("Document Number Empty for Selected 'Passport' ");
                }
                else if (passport_regex.test(documents[i].document_number) == false) {
                    frappe.throw("Document Number Format Incorrect for Selected 'Passport' ");
                }
            }
            //Aadhar-Card 5521 6680 4487
            if (documents[i].document_type == 'Aadhar-Card') {
                if (documents[i].document_number.length == 0) {
                    frappe.throw("Document Number Empty for Selected 'Aadhar-Card' ");
                }
                else if (aadhar_regex.test(documents[i].document_number) == false) {
                    frappe.throw("Document Number Format Incorrect for Selected 'Aadhar-Card' ");
                }
            }
            // License HR-0619850034761

            if (documents[i].document_type == 'License') {
                if (documents[i].document_number.length == 0) {
                    frappe.throw("Document Number Empty for Selected 'License' ");
                }
                else if (license_regex.test(documents[i].document_number) == false) {
                    frappe.throw("Document Number Format Incorrect for Selected 'License' ");
                }
            }
        }
    }
}
);
