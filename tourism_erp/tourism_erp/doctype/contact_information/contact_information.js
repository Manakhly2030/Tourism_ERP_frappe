// Copyright (c) 2024, Technovate and contributors
// For license information, please see license.txt

frappe.ui.form.on("Contact Information", {
  refresh(frm) {},
});

frappe.ui.form.on("Contact Phone", {
  is_primary_phone(frm, cdt, cdn) {
    remove_other_primary(frm, "contact_numbers", "is_primary_phone", cdn);
  },
});

frappe.ui.form.on("Contact Email", {
  is_primary(frm, cdt, cdn) {
    remove_other_primary(frm, "email_ids", "is_primary", cdn);
  },
});

// Remove primary check box from all other rows
const remove_other_primary = function (frm, table_name, field_name, cdn) {
  for (const row of frm.doc[table_name]) {
    if (row.name !== cdn) {
      row[field_name] = 0;
    }
  }
  frm.refresh_field(table_name);
};

// Set is primary check box to read only for all other rows if one is set to primary
// const set_primary_read_only = function (frm, table_name, field_name) {
//   let primary_set = 0;
//   let primary_doc = null;
//   for (const row of frm.doc[table_name]) {
//     if (row[field_name] === 1) {
//       primary_set = 1;
//       primary_doc = row.name;
//     }
//   }
//   for (const [doc_name, grid] of Object.entries(
//     frm.fields_dict[table_name].grid.grid_rows_by_docname
//   )) {
//     console.log(doc_name, primary_doc, grid);
//     if (doc_name === primary_doc) {
//       grid.set_field_property(field_name, "read_only", 0);
//     } else {
//       grid.set_field_property(field_name, "read_only", primary_set);
//     }
//   }
//   frm.refresh_field(table_name);
// };
