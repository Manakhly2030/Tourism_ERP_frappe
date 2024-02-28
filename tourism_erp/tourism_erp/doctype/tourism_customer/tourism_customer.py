# Copyright (c) 2024, Technovate and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import getdate, today, now_datetime, now
class TourismCustomer(Document):
	# def validate(self):
	@property
	def age(self):
		today = getdate()
		dob = getdate(self.dob)
		return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
	# pass