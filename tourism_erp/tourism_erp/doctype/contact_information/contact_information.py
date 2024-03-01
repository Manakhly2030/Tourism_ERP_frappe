# Copyright (c) 2024, Technovate and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import validate_email_address, validate_phone_number
from frappe.model.document import Document


class ContactInformation(Document):
    def validate(self):
        self.validate_email()
        self.validate_phone()
        frappe.throw('Validation Error')

    def validate_email(self):
        for email in [email_doc.email_id for email_doc in self.get('email_ids')]:
            if not validate_email_address(email, throw=True):
                frappe.throw('Email Id is not valid')

    def validate_phone(self):
        for phone in [contact_doc.phone for contact_doc in self.get('contact_numbers')]:
            frappe.log(phone)
            if not validate_phone_number(phone, throw=True):
                frappe.throw('Phone number is not valid')
