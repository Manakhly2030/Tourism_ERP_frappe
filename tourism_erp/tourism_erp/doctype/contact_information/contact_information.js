// Copyright (c) 2024, Technovate and contributors
// For license information, please see license.txt

frappe.ui.form.on("Contact Information", {
  refresh(frm) {
    frm.fields_dict["contact_numbers"].grid.grid_rows[0].toggle_display("phone", 0);
    frm.fields_dict["contact_numbers"].grid.grid_rows[0].toggle_display("phone", 1);
  },
});

frappe.ui.form.on("Contact Phone", {
  is_primary_phone(frm, cdt, cdn) {
    const row = frappe.get_doc(cdt, cdn);
    const primary_set = row.is_primary_phone ? 0 : 1;
    if (row.is_primary_phone) {
      frm.doc.primary_contact_no = row.phone;
      frm.refresh_field("primary_contact_no");
    }
    for (const [doc_name, grid] of Object.entries(
      frm.fields_dict["contact_numbers"].grid.grid_rows_by_docname
    )) {
      if (doc_name !== row.name) {
        grid.toggle_display("is_primary_phone", primary_set);
      }
    }
    frm.refresh_field("contact_numbers");
  },
});

frappe.ui.form.on("Contact Email", {
  is_primary(frm, cdt, cdn) {
    const row = frappe.get_doc(cdt, cdn);
    const primary_set = row.is_primary ? 0 : 1;
    if (row.is_primary) {
      frm.doc.primary_email_id = row.email_id;
      frm.refresh_field("primary_email_id");
    }
    for (const [doc_name, grid] of Object.entries(
      frm.fields_dict["email_ids"].grid.grid_rows_by_docname
    )) {
      if (doc_name !== row.name) {
        grid.toggle_display("is_primary", primary_set);
      }
    }
    frm.refresh_field("email_ids");
  },
});
