// Copyright (c) 2024, Technovate and contributors
// For license information, please see license.txt

frappe.ui.form.on("Tourism Customer", {
	refresh(frm) {

	},
    validate: function(frm){
        //check for duplicate documents
        var documents = frm.doc.document;
        var documentTypes = new Set();
    
        for(let i=0; i<documents.length; i++){
            if(documentTypes.has(documents[i].document_type)){
                frappe.throw('Duplicate document found: ' + documents[i].document_type);
            }
            documentTypes.add(documents[i].document_type);
        }

        // full name
        frm.set_value('full_name', frm.doc.first_name + ' ' + frm.doc.last_name);

        //age
        // if (frm.doc.dob) {
        //     var today = new Date();
        //     var birthDate = new Date(frm.doc.dob);
        //     console.log(birthDate);
        //     var age = today.getFullYear() - birthDate.getFullYear();
        //     var m = today.getMonth() - birthDate.getMonth();
        //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        //         age--;
        //     }
        //     frm.set_value('age', age);
        // }
    },
    }
);
