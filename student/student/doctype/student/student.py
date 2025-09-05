# Copyright (c) 2025, Kallu and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Student(Document):
	def after_insert(self):
		frappe.msgprint(f"Welcome {self.full_name}")
