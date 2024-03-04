# Copyright (c) 2024, Technovate and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import validate_email_address, validate_phone_number
from frappe.model.document import Document


class ContactInformation(Document):
    def before_save(self):
        self.primary_contact_no = self.get_primary_contact()
        self.primary_email_id = self.get_primary_email_id()

    def validate(self):
        self.validate_phone()
        self.validate_email()
        self.validate_fax()

    def validate_phone(self):
        for phone in [contact_doc.phone for contact_doc in self.get('contact_numbers')]:
            frappe.log(phone)
            if not validate_phone_number(phone):
                frappe.throw('Phone number is not valid')

        primary_count = 0
        for phone_doc in self.get('contact_numbers'):
            if phone_doc.is_primary_phone:
                primary_count += 1
        if primary_count > 1:
            frappe.throw('Only one contact number can be primary')

    def validate_email(self):
        for email in [email_doc.email_id for email_doc in self.get('email_ids')]:
            if not validate_email_address(email):
                frappe.throw('Email Id is not valid')

        primary_count = 0
        for email_doc in self.get('email_ids'):
            if email_doc.is_primary:
                primary_count += 1
        if primary_count > 1:
            frappe.throw('Only one email id can be primary')

    def validate_fax(self):
        if self.fax_number:
            if not validate_phone_number(self.fax_number):
                frappe.throw('Fax number is not valid')

    def get_primary_contact(self):
        for contact_doc in self.get('contact_numbers'):
            if contact_doc.is_primary_phone:
                return contact_doc.phone
        return None

    def get_primary_email_id(self):
        for email_doc in self.get('email_ids'):
            if email_doc.is_primary:
                return email_doc.email_id
        return None
