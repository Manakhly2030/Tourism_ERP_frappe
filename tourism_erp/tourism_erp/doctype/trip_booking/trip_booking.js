// Copyright (c) 2024, Technovate and contributors
// For license information, please see license.txt

frappe.ui.form.on("Trip Booking", {
  setup: function (frm) {
    // Override Query for Room Type to filter by Hotel
    frm.set_query("room_type", "hotel_bookings", function (frm, cdt, cdn) {
      let row = frappe.get_doc(cdt, cdn);
      return {
        query: "tourism_erp.tourism_erp.doctype.trip_booking.trip_booking.get_hotel_room_types",
        filters: {
          hotel: row.hotel,
        },
      };
    });

    // Overrride Query for Hotel to filter by Trip Location
    frm.set_query("hotel", "hotel_bookings", function (frm, cdt, cdn) {
      if (frm.packages.length === 1) {
        city_filter = frm.packages[0].city;
        country_filter = frm.packages[0].country;
      } else {
        city_filter = frm.packages.map((elem) => elem.city);
        country_filter = frm.packages.map((elem) => elem.country);
      }
      return {
        query: "tourism_erp.tourism_erp.doctype.trip_booking.trip_booking.get_hotels",
        filters: {
          city: city_filter,
          country: country_filter,
        },
      };
    });
  },

  primary_customer: function (frm) {
    frappe.model.clear_table(frm.doc, "people_travelling");
    frm.add_child("people_travelling", { customer: frm.doc.primary_customer });
    frm.refresh_field("people_travelling");
  },

  validate: async function (frm) {
    // If any transport departure or arrival is outside the trip booking ask for confirmation before saving
    let confirm_transport = false;
    for (const transport of frm.doc.transports) {
      if (transport.departure < frm.doc.from_date || transport.arrival > frm.doc.to_date + 1) {
        confirm_transport = transport;
      }
    }

    if (confirm_transport) {
      await new Promise(function (resolve, reject) {
        frappe.confirm(
          `Transport: <b>${confirm_transport.type} <br>${frappe.format(
            confirm_transport.departure,
            { fieldtype: "Datetime" }
          )} -> ${frappe.format(confirm_transport.arrival, {
            fieldtype: "Datetime",
          })}</b> is not within the trip dates<br>Is it Correct?`,
          function () {
            resolve();
          },
          function () {
            reject();
          }
        );
      });
    }

    // If any hotel check in or check out is outside the trip booking ask for confirmation before saving
    let confirm_hotel = false;
    for (const hotel of frm.doc.hotel_bookings) {
      if (hotel.check_in < frm.doc.from_date || hotel.check_out > frm.doc.to_date + 1) {
        confirm_hotel = hotel;
      }
    }

    if (confirm_hotel) {
      await new Promise(function (resolve, reject) {
        frappe.confirm(
          `Hotel Booking: <b>${confirm_hotel.hotel}</b><br><b>${frappe.format(
            confirm_hotel.check_in,
            { fieldtype: "Datetime" }
          )} -> ${frappe.format(confirm_hotel.check_out, {
            fieldtype: "Datetime",
          })}</b> is not within the trip dates<br>Is it Correct?`,
          function () {
            resolve();
          },
          function () {
            reject();
          }
        );
      });
    }
  },
});
