# Copyright (c) 2025, Kallu and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters: dict | None = None):
	columns = get_columns()
	data = get_data()
	chart = get_chart(data)

	return columns, data


def get_columns() -> list[dict]:
	
	return [
		{
			"label": _("Column 1"),
			"fieldname": "column_1",
			"fieldtype": "Data",
		},
		{
			"label": _("Column 2"),
			"fieldname": "column_2",
			"fieldtype": "Int",
		},
	]


def get_data() -> list[list]:
	# let data = []
	students = frappe.get_all("Student", ["name", "full_name"])
	# students = frappe.get_doc("Student", ["name", "full_name"])
	names = frappe.get_all("Student", pluck="name")
	print(names, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
	for student in students:
		doc = frappe.get_doc("Student", student.name)
		total_courses = len(doc.get("courses") or [])
		print(doc.full_name, student.full_name, "//////////////////////////////")
		
	


def get_chart(data):
	print(data, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")