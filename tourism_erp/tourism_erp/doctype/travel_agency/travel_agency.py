# Copyright (c) 2024, Technovate and contributors
# For license information, please see license.txt

import frappe
# from frappe.model.document import Document


# class TravelAgency(Document):
# 	pass

from frappe.model.document import Document
from frappe import _

class TravelAgency(Document):
    def validate(self):
        if self.agency_website:
            import re
            if not re.match(r".+\.com$", self.agency_website):
                frappe.throw(_("Enter a valid URL"))
