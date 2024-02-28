# Copyright (c) 2024, Technovate and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class TripBooking(Document):
    pass


@frappe.whitelist()
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
