// // Copyright(c) 2024, Technovate and contributors
// // For license information, please see license.txt

// frappe.ui.form.on("Document", {
//     refresh(frm) {

//     },
//     // expires: function (frm) {
//     //     frappe.throw('Document has expired');
//     //     if (frm.doc.expires == 1) {
//     //         frm.set_df_property('expires_on', 'hidden', false);
//     //     }
//     // },

//     expires_on: function (frm, cdt, cdn) {
//         let doc = locals[cdt][cdn];
//         if (doc.expires_on < frappe.datetime.nowdate()) {
//             frappe.msgprint('Document has expired');
//         }
//     }

// });
