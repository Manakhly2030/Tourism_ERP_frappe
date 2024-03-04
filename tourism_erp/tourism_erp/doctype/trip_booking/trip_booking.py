# Copyright (c) 2024, Technovate and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class TripBooking(Document):
    def validate(self):
        self.validate_dates()

    def validate_dates(self):
        if self.from_date > self.to_date:
            frappe.throw("From Date cannot be greater than To Date")

        for transport in self.transports:
            if transport.departure >= transport.arrival:
                frappe.throw("Transport: Departure Date cannot be greater than Arrival Date")

        for hotel_booking in self.hotel_bookings:
            if hotel_booking.check_in >= hotel_booking.check_out:
                frappe.throw("Hotel Booking: Check In Date cannot be greater than Check Out Date")


@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def get_hotel_room_types(doctype, txt, searchfield, start, page_len, filters):
    hotel = filters.get("hotel")

    # Get a list of room types which are allowed for the hotel
    allowed_rooms = frappe.db.sql("""SELECT room_type FROM `tabRoom Type Link` WHERE parent = %s""", hotel)
    if not allowed_rooms:
        return []
    allowed_rooms = [room[0] for room in allowed_rooms]

    # Return a query for filtering room types
    return frappe.db.sql("""
                         SELECT name, room_type
                         FROM `tabRoom Type`
                         WHERE `tabRoom Type`.name IN %s AND `tabRoom Type`.name LIKE %s
                         LIMIT %s OFFSET %s
                         """,
                         (tuple(allowed_rooms), "%%%s%%" % txt, page_len, start))


@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def get_hotels(doctype, txt, searchfield, start, page_len, filters):
    city = filters.get('city')
    country = filters.get("country")

    # Convert filters to tuples
    if isinstance(city, str):
        city_filter = (city, )
        country_filter = (country, )
    else:
        city_filter = tuple(city)
        country_filter = tuple(country)

    # Return a query for filtering hotels
    if not city or not country:
        return frappe.db.sql("""
                         SELECT name, name1
                         FROM `tabAccommodation`
                         WHERE `tabAccommodation`.name1 LIKE %s
                         LIMIT %s OFFSET %s
                         """, ("%%%s%%" % txt, page_len, start))

    return frappe.db.sql("""
                         SELECT name, name1
                         FROM `tabAccommodation`
                         WHERE `tabAccommodation`.city IN %s AND `tabAccommodation`.country IN %s AND `tabAccommodation`.name1 LIKE %s
                         LIMIT %s OFFSET %s
                         """, (city_filter, country_filter, "%%%s%%" % txt, page_len, start))
