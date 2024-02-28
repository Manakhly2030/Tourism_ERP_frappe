// Copyright (c) 2024, Technovate and contributors
// For license information, please see license.txt

frappe.ui.form.on("Trip Booking", {
  primary_customer: function (frm) {
    frappe.model.clear_table(frm.doc, "people_travelling");
    frm.add_child("people_travelling", { customer: frm.doc.primary_customer });
    frm.refresh_field("people_travelling");
  },

  setup: function (frm) {
    frm.set_query("room_type", "hotel_bookings", function (doc, cdt, cdn) {
      let row = frappe.get_doc(cdt, cdn);
      return {
        query: "tourism_erp.tourism_erp.doctype.trip_booking.trip_booking.get_hotel_room_types",
        filters: {
          hotel: row.hotel,
        },
      };
    });
  },
});
