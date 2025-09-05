import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def course_count(student):
    try:
        count = frappe.db.count("Student Course", {"parent": student})
        print('======================================================================',count, student)
        return count
    except Exception as e:
        frappe.throw(_("Something went wrong: {0}").format(str(e)))